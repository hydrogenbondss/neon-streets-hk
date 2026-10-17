# Roadmap

## P0 — Preserve and integrate the current baseline
- [x] Create a private GitHub repository
- [x] Commit the original single-file Three.js prototype
- [x] Commit the Higgsfield integration handoff and standalone preview
- [x] Build the first Kowloon environment in Higgsfield 3D Jutsu
- [ ] Add the actual GLB file under `assets/`
- [ ] Integrate GLTFLoader into `index.html`
- [ ] Verify street/player scale and ground alignment in a browser
- [ ] Verify collision, driving, delivery, wanted-level, minimap and HUD behavior
- [ ] Fix any confirmed console errors or performance bottlenecks

## P1 — One polished Kowloon street
- [ ] Replace placeholder taxi with a suitable game-ready HK taxi model
- [ ] Replace box pedestrians with rigged animated characters
- [ ] Improve shop signage, storefront detail and traffic
- [ ] Tune materials, shadows and practical lighting based on a real in-game screenshot

## P2 — Expand only after the vertical slice passes
- [ ] Design a connected street grid and district boundary
- [ ] Reuse a modular Hong Kong asset kit
- [ ] Add district-specific architecture and missions
- [ ] Add mobile input only after the PC/browser baseline is stable

## Release gate

No public release until the GLB loads without fatal console errors and a manual playtest confirms the main game loop. No deployment is part of the current parked phase.
