# Neon Streets HK — environment integration handoff

## What exists

A Higgsfield 3D Jutsu scene named **Neon Streets HK — Kowloon Street Blockout** was created and advanced to revision 3. It contains a compact night-time Kowloon-inspired street environment: 14 building masses, 267 façade window elements, projecting shop signs, balconies, AC units, six streetlights, a red taxi prop, six pedestrian placeholders, road markings and a zebra crossing. The latest GLB export was structurally checked; scene data is about 5 MB.

Project: https://higgsfield.ai/3d-jutsu/5a037714-3249-4aae-ae31-17075ee48cf4

The GLB file is not included in this repository yet because the export endpoint produces short-lived signed downloads. Export/download the latest GLB from the project, then save it at:

`assets/hk-kowloon-street.glb`

## Integrate into the existing HTML

1. Update the existing import map to add the addon mapping:

```html
<script type="importmap">
{"imports": {
  "three": "https://unpkg.com/three@0.160.0/build/three.module.js",
  "three/addons/": "https://unpkg.com/three@0.160.0/examples/jsm/"
}}
</script>
```

2. Add this import beside the existing Three.js import:

```js
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
```

3. Copy `src/hk-street-integration-snippet.js` into the same existing `<script type="module">`. Do not load it as a separate script because it references the existing module's `scene`, `cityGroup`, `colliders`, `renderer`, `moon`, `THREE`, and `toast` variables.

4. Near the bottom of that module, after all world generation has run and `cityGroup`, `colliders`, `renderer`, and `moon` exist, call:

```js
enableHKStreetShadows();
mountHKStreet();
```

5. Serve the folder over HTTP/HTTPS rather than opening the HTML through `file://`, because ES modules and GLB loading may be blocked by browser file-origin rules.

## Important limitations / next fixes

- The GLB is a static street scene, not yet a gameplay-ready full city. Its taxi and pedestrians are props/placeholders; they are not connected to the car and pedestrian AI systems.
- The loader hides overlapping procedural building meshes and removes old collision rectangles from the street footprint; it then adds collisions for imported building masses.
- The game uses a large ground plane at y=0, so the loader raises the GLB root by 0.07 units to prevent the road surface from being visually covered. Check the imported alignment in the browser; a small vertical adjustment may be needed.
- Repeated static meshes are batched into `THREE.InstancedMesh` groups to reduce draw calls, while `TAXI` and `PED` objects are kept separate. Verify visual placement and shadow quality in the actual game.
- A structural audit found 14 building masses, 267 window objects, eight sign text objects, 23 taxi parts, six pedestrian torso groups, six streetlight poles and 11 point lights. This validates scene contents, not final visual quality; the render image could not be independently inspected in the current runtime.
- Keep the original procedural world as a fallback if the GLB fails to load.

## Acceptance gate

Do not call integration complete until a real browser run confirms: (1) the GLB loads, (2) the game still starts, (3) on-foot movement and collision work, (4) car enter/exit and driving work, (5) delivery and wanted-level systems still work, and (6) there are no fatal console errors.
