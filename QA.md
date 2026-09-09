# Verification record

Reviewed September 9, 2026. The approved visual direction was retained. The product is an educational story, not a numeric simulator.

## Functional and responsive verification

- Started the story and visited all seven scenes with Next, then returned through all six Previous transitions. Previous is disabled at Scene 1.
- Clicked all seven direct chapter controls. Tested Simple and Protocol Mode on every scene; headings, descriptions, chapter labels, and diagram terminology change consistently.
- Completed and replayed accumulation, expansion, and closure. Mode changes preserve the current action state. Scene navigation intentionally starts that chapter's illustration again.
- Confirmed expansion reaches two Branches, spent symbols finish at opacity zero, and the new Branch appears. Closure leaves one active Branch and one permanently closed Branch, with a net realization path to the wallet.
- Tested Low, Medium, and High pressure. The qualitative fee explanation changes while the fee split stays 50/50. Protocol Mode preserves the selected pressure.
- Opened the final connected map after all chapters had been visited and closed it again. The final button sends readers to unseen chapters if necessary.
- Opened all 16 contextual Source drawers, plus the complete Sources drawer. Verified that claim/topic text and source URLs render.
- Checked 56 responsive states: seven scenes, two modes, and 1440×1000, 1280×800, 390×844, and 430×932 viewports. No horizontal page overflow or clipped story controls were detected.
- Additionally checked completed accumulation, expansion, and closure at both mobile sizes. No diagram overflow was detected. Mobile chapters wrap into two columns; neither the page nor the chapter controls require horizontal scrolling.
- Visually reviewed desktop introduction and fee scene, mobile final scene and closure, and the mobile source drawer. The drawer scrolls independently and fits the screen.
- Repeated the seven-scene walkthrough, both modes, all 16 contextual drawers, action replays, fee choices, previous navigation, final map, and all 56 responsive states against the native Next.js production server. No responsive failures were detected.
- No browser console errors or warnings were present in the final production QA session.

## Accessibility

- Keyboard arrow navigation moves between scenes when the story is focused. Arrow keys in the mode group change its selection without navigating the story.
- Clear focus outlines are present. Source and map dialogs trap focus, support Escape, and return focus to their opener after the exit transition.
- Semantic radio groups, buttons, navigation landmarks, headings, figure descriptions, source link names, and live status outputs are used.
- Reduced-motion CSS removes substantive animation duration and delay. Interaction results are driven by state, so they do not depend on animation completion callbacks. A separate operating-system reduced-motion setting was not emulated.
- Closed-Branch status text now stays opaque; only its icon fades. This fixes low contrast caused by fading the whole component.
- Removed duplicate accessible names from the two mode choices.

## Source destinations

Every distinct destination below was opened directly in the browser. All resolve to official Standard Reserve content; all eight whitepaper fragment targets exist with the corresponding section heading.

| Official URL                                         | What was confirmed                                                                   |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------ |
| https://www.standardreserve.xyz/whitepaper/#charters | Charter participation and lifecycle                                                  |
| https://www.standardreserve.xyz/whitepaper/#branches | First Branch, expansion licenses, burn, and visibly redacted settings                |
| https://www.standardreserve.xyz/whitepaper/#entities | Relative issuance share and relationships                                            |
| https://www.standardreserve.xyz/whitepaper/#currency | Internal ledger accrual and withdrawal minting                                       |
| https://www.standardreserve.xyz/whitepaper/#auctions | Dutch auctions and license payment                                                   |
| https://www.standardreserve.xyz/whitepaper/#exits    | Proportional retirement, seven-day pressure, fee rate lock, and 50/50 fee allocation |
| https://www.standardreserve.xyz/whitepaper/#net-flow | Net ETH flow and two completed epochs                                                |
| https://www.standardreserve.xyz/whitepaper/#policy   | Issuance policy and redacted parameters                                              |
| https://www.standardreserve.xyz/app/about/           | Internal STANDARD can be used for expansion licenses                                 |
| https://www.standardreserve.xyz/app/mint/            | Mint is not live at review                                                           |

## Corrections made during verification

- Linked the undisclosed expansion-settings note to `#branches`, which actually contains the redacted table.
- Clarified that no numeric expansion cost is assigned; the wording no longer risks implying that expansion is free.
- Clarified re-entry after full closure: a new Charter is needed. A retained Charter instead needs another expansion license to grow.
- Removed a heading that could imply guaranteed greater future accrual. It now describes additional capacity.
- Completed Simple/Protocol terminology swaps in the action captions. No economic parameters were added.
- Preserved internal accumulation, the proportional one-of-two closure example, the fee-only 50/50 split, and the distinction between design intent and crisis evidence.
- Corrected closed-state text contrast, prevented the diagram caption from colliding with its serial, and supplied an independent project favicon.
- Updated vulnerable starter dependencies and the transitive `sharp` dependency. The resulting installation reports zero vulnerabilities.
- Replaced the Sites-specific Vinext/Workers runtime with native Next.js for the requested GitHub/Vercel launch. Added the Next.js Vercel preset and Tailwind PostCSS configuration; removed the superseded Vite configuration and runtime dependencies. The story components and approved design remain intact.
- Added static social-preview artwork and public metadata. Vercel's production-domain system variable supplies the canonical and social image origin; preview deployments are marked `noindex`. Local runs have no fabricated production canonical.
- Wrapped the mobile chapter navigation to remove its horizontal scroll requirement.

## Release commands and metadata checks

| Command                             | Result                                                           |
| ----------------------------------- | ---------------------------------------------------------------- |
| `npm run lint`                      | PASS: no authored-code warnings or errors                        |
| `npm run typecheck`                 | PASS: generated route types and project TypeScript check         |
| `npm run build`                     | PASS: native Next.js production build and static page generation |
| `npm audit`                         | PASS: zero vulnerabilities                                       |
| `git diff --check`                  | PASS: no whitespace errors                                       |
| `npm start -- --hostname 127.0.0.1` | PASS: production preview served on port 3000                     |

HTTP checks returned 200 for `/`, `/favicon.svg`, and `/opengraph-image`. The social image is a valid 1200×630 PNG and was visually reviewed. Rendered HTML contains the title, description, viewport, robots, Open Graph, Twitter, and favicon tags. The local build intentionally omits the production canonical. Production-domain behavior was reviewed against Vercel's documented system variables; an actual hosted URL is not yet available.

The repository has no commits or remote yet. A scan of publishable source found no credential or private-key patterns. Ignore checks cover `.env.local`, `.openai/hosting.json`, `.next/BUILD_ID`, `.vercel/project.json`, local Wrangler artifacts, build output, and TypeScript build metadata. No GitHub push or deployment was performed.

## Production scope and remaining limitations

The app has no embedded secrets, wallet connection, blockchain RPC, database, analytics, or custom backend. Framework development tools are limited to development mode. Metadata identifies the unofficial educational project; the disclaimer and Torvian credit remain visible.

The official protocol is prelaunch at review, so the website explains published design rather than demonstrated live-market behavior. Redacted parameters remain omitted. Browser QA used the available Chromium-based in-app browser; Safari, Firefox, physical devices, and a dedicated screen reader were not separately tested. Reduced-motion rules were inspected, but an operating-system reduced-motion preference was not separately emulated. The deployed domain, production canonical, and social-platform cache behavior must be checked after the user's first Vercel deployment.

## Files modified or created during completion

- `.gitignore`, `.oxlintrc.json`
- `app/page.tsx`, `app/globals.css`, `app/layout.tsx`, `app/opengraph-image.tsx`
- `components/story/ModeToggle.tsx`, `components/story/StoryShell.tsx`, `components/story/Visuals.tsx`, `components/story/StoryNavigation.tsx`, `components/story/SourceDrawer.tsx`
- `data/protocol.ts`, `types/protocol.ts`, `CONTENT_MAP.md`
- `package.json`, `package-lock.json`, `next.config.ts`, `postcss.config.mjs`, `tsconfig.json`, `vercel.json`
- `public/favicon.svg`, `README.md`, `QA.md`
- Removed `vite.config.ts`; the local `.openai` configuration is ignored and unused by the public build.

The baseline app and component files were created earlier in this task. Generated UI primitives were retained unchanged.
