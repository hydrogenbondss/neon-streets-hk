/*
 * Neon Streets HK — Higgsfield GLB integration snippet
 *
 * Paste this into the EXISTING <script type="module"> in the game HTML.
 * Required import at the top of that module:
 *   import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
 * Required import-map entry:
 *   "three/addons/": "https://unpkg.com/three@0.160.0/examples/jsm/"
 *
 * Place the exported scene file at: ./assets/hk-kowloon-street.glb
 * Call mountHKStreet(); once after cityGroup, colliders and scene exist.
 *
 * NOTE: This is an integration draft, not yet merged into the game's HTML.
 */

async function mountHKStreet() {
  const loader = new GLTFLoader();
  const streetPath = './assets/hk-kowloon-street.glb';
  toast('Loading Kowloon street…', 120);

  try {
    const gltf = await loader.loadAsync(streetPath);
    const root = gltf.scene;
    root.name = 'HK_KOWLOON_STREET';

    // The global ground plane sits at y=0. Lift the imported road slightly so its
    // top surface and road markings render above it. Confirm this offset in-game.
    root.position.set(0, 0.07, 0);
    scene.add(root);
    root.updateMatrixWorld(true);

    // Hide procedural buildings that intersect the imported street footprint.
    const footprint = new THREE.Box3(
      new THREE.Vector3(-23, -5, -50),
      new THREE.Vector3(23, 220, 32)
    );
    cityGroup.updateMatrixWorld(true);
    for (const object of cityGroup.children) {
      const bounds = new THREE.Box3().setFromObject(object);
      if (bounds.intersectsBox(footprint)) object.visible = false;
    }

    // Remove procedural collision boxes in the replaced footprint.
    for (let i = colliders.length - 1; i >= 0; i--) {
      const b = colliders[i];
      if (b.x0 < footprint.max.x && b.x1 > footprint.min.x &&
          b.z0 < footprint.max.z && b.z1 > footprint.min.z) {
        colliders.splice(i, 1);
      }
    }

    // Register the imported building masses as collision rectangles before instancing.
    let importedBuildingColliders = 0;
    root.traverse(object => {
      if (!object.isMesh || !/^BLDG_.*_MASS/.test(object.name)) return;
      const bounds = new THREE.Box3().setFromObject(object);
      colliders.push({
        x0: bounds.min.x, x1: bounds.max.x,
        z0: bounds.min.z, z1: bounds.max.z
      });
      importedBuildingColliders++;
    });

    // Enable shadow reception/casting on the imported scene.
    root.traverse(object => {
      if (!object.isMesh) return;
      object.castShadow = true;
      object.receiveShadow = true;
      if (object.material) {
        const materials = Array.isArray(object.material) ? object.material : [object.material];
        for (const material of materials) {
          if (material.map) material.map.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 8);
          material.needsUpdate = true;
        }
      }
    });

    // Instance repeated static objects to reduce draw calls. Keep the taxi and pedestrian
    // parts separable for later gameplay integration.
    root.updateMatrixWorld(true);
    const batches = new Map();
    root.traverse(object => {
      if (!object.isMesh || object.isSkinnedMesh || object.isInstancedMesh || !object.geometry) return;
      if (object.name.startsWith('TAXI_') || object.name.startsWith('PED_')) return;
      if (Array.isArray(object.material) || !object.material) return;
      const key = object.geometry.uuid + '|' + object.material.uuid;
      if (!batches.has(key)) batches.set(key, []);
      batches.get(key).push(object);
    });

    let instancedSources = 0;
    for (const objects of batches.values()) {
      if (objects.length < 4) continue;
      const first = objects[0];
      const instances = new THREE.InstancedMesh(first.geometry, first.material, objects.length);
      instances.name = 'HK_INSTANCED_' + instancedSources;
      const inverseRoot = root.matrixWorld.clone().invert();
      objects.forEach((object, index) => {
        const localMatrix = inverseRoot.clone().multiply(object.matrixWorld);
        instances.setMatrixAt(index, localMatrix);
        object.visible = false;
      });
      instances.instanceMatrix.needsUpdate = true;
      instances.castShadow = true;
      instances.receiveShadow = true;
      root.add(instances);
      instancedSources += objects.length;
    }

    toast('Kowloon street loaded', 180);
    console.info('[Neon Streets HK] GLB loaded', {
      path: streetPath,
      importedBuildingColliders,
      instancedSources,
      topLevelChildren: root.children.length
    });
  } catch (error) {
    console.error('[Neon Streets HK] Could not load the Hong Kong street GLB:', error);
    toast('Street asset missing — check ./assets/hk-kowloon-street.glb', 240);
  }
}

// Optional visual quality improvements. Apply after renderer and moon are created.
function enableHKStreetShadows() {
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  moon.castShadow = true;
  moon.shadow.mapSize.set(2048, 2048);
  moon.shadow.camera.left = -70;
  moon.shadow.camera.right = 70;
  moon.shadow.camera.top = 80;
  moon.shadow.camera.bottom = -80;
  moon.shadow.camera.near = 0.5;
  moon.shadow.camera.far = 260;
  moon.shadow.bias = -0.00025;
}
