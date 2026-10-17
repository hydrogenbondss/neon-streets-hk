# Project status — 2026-10-17

## Parked safely

- GitHub repository: private
- Repository: https://github.com/hydrogenbondss/neon-streets-hk
- No deployment has been created.
- No changes have been made to other repositories.
- The Higgsfield scene remains in its own project.

## Verified

- The private GitHub repository exists under `hydrogenbondss`.
- The Higgsfield 3D Jutsu scene is at revision 3.
- The current GLB export is approximately 4.97 MB.
- A structural audit found 14 building masses, 267 facade windows, 8 sign text objects, 23 taxi parts, 6 pedestrian torso objects, 6 streetlight poles and 11 lights (all supported light types after the repair).
- The integration draft and preview page have been prepared.

## Not yet verified

- The original game HTML baseline is committed as `index.html`.
- The GLB is not committed to the repository yet.
- The GLB has not been loaded into the original game.
- No combined browser playtest has verified driving, collisions, deliveries, wanted level, police or performance.
- Final visual quality remains subject to the preview and in-game review.

## Resume order

1. Export/download the latest GLB and place it at `assets/hk-kowloon-street.glb`.
2. Integrate the GLB loader into `index.html` on a separate, reviewable change.
3. Run the game over HTTP and verify console output, asset loading, movement, collisions and gameplay loop.
4. Fix any verified defects, then review one more time before considering expansion.

This is a parked work-in-progress. Do not deploy without explicit approval.
