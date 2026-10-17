# Neon Streets HK

A Hong Kong-inspired third-person open-world driving game prototype built with Three.js.

**Status:** parked / pre-integration. This repository is private and is not deployed. Keep work here while other projects take priority.

## Current prototype

The initial prototype was supplied as a single HTML file using Three.js 0.160.0 and includes:
- Third-person walking and sprinting
- Enter / exit cars and basic driving
- Cash and delivery markers
- Wanted level and police pursuit
- Health, HUD and minimap
- Procedurally generated city blocks, neon signs, civilian vehicles and pedestrians

The original single-file prototype is committed at `index.html` as the baseline. It is intentionally preserved before GLB integration.

## Environment work

A separate Higgsfield 3D Jutsu scene has been created and structurally checked:

- **Project:** [Neon Streets HK — Kowloon Street Blockout](https://higgsfield.ai/3d-jutsu/5a037714-3249-4aae-ae31-17075ee48cf4)
- **Scene revision:** 3
- **GLB export:** approximately 5 MB
- **Environment contents:** 14 building masses, 267 facade windows, shop signs, balcony and AC details, road markings, six streetlights, a red taxi prop, and six pedestrian placeholders.

The exported GLB is not checked into this repository yet. Export/download the latest GLB from the Higgsfield project, then save it as `assets/hk-kowloon-street.glb`.

## Repository contents

- `src/hk-street-integration-snippet.js` — loader/integration draft for GLTFLoader; not yet merged into the original game.
- `docs/INTEGRATION-GUIDE.md` — integration steps and known caveats.
- `docs/CURSOR-PROMPT.txt` — handoff prompt for the next code integration pass.
- `prototype/street-preview.html` — standalone asset preview, pending the GLB file.
- `assets/hk-kowloon-street.glb` — expected asset path; the file is not currently committed.

## Next milestone

1. Commit the original playable HTML as the baseline.
2. Add the latest GLB asset.
3. Integrate the GLB into the existing Three.js module without removing working gameplay.
4. Test browser loading, collision, movement and console output.
5. Improve the street based on actual in-game review before expanding the map.

## Development principles

- Keep the first milestone to one compelling, playable Kowloon street.
- Preserve working gameplay unless a change has been tested.
- Do not deploy or expand scope without explicit approval.
- Distinguish structural checks from actual in-browser gameplay verification.
