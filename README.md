# LUDUS

An interactive way to understand Standard Reserve.

An unofficial educational project.

An unofficial, seven-scene educational story by Torvian. Follow fictional participant Alex from a Charter to Branch expansion and withdrawal. Simple Mode is the default; Protocol Mode changes terminology without resetting the current scene or its action state.

The `Challenge` route adds a frontend-only ten-question run. It uses the same verified protocol content, asks eight scenario questions and two concept checks, and keeps the scoring model deliberately simple: accuracy first, with completion time shown separately.

## Run locally

Requires Node.js 22.13 or later and npm.

```sh
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000/). No environment variables, secrets, wallet, RPC endpoint, database, or account configuration are needed by the app.

## Check and build

```sh
npm run lint
npm run typecheck
npm run build
npm audit
```

To serve the production build locally:

```sh
npm start
```

Open [localhost:3000](http://localhost:3000/). Run `npm run build` before `npm start`.

## Implementation

Next.js 16 App Router, React 19, TypeScript, and Tailwind CSS. Native CSS provides the short, replayable causal animations. Existing Base UI / Shadcn primitives provide radio controls, source drawers, and the final dialog. The story and Open Graph image are generated statically. There is no custom application backend or external data fetching.

The starter's component catalog is retained; only imported components enter the app bundle. Generated UI primitives and the unused generated mobile hook are excluded from authored-code linting, while TypeScript checks the project. Application code is linted with the accessibility and React rules enabled.

## Content and sources

- `data/protocol.ts`: claims, both wording modes, source URLs, confirmation summaries, status labels, and deliberately excluded parameters.
- `types/protocol.ts`: content types.
- `CONTENT_MAP.md`: source review and scope decisions.
- `components/story/`: story shell, navigation, diagrams, mode toggle, and source drawer.
- `app/globals.css`: shared design tokens, responsive layouts, and reduced-motion rules.
- `QA.md`: test coverage, source verification, fixes, and limitations.

The factual baseline is the official [Whitepaper V0.1](https://www.standardreserve.xyz/whitepaper/), with the [official overview](https://www.standardreserve.xyz/app/about/) and [mint status](https://www.standardreserve.xyz/app/mint/) as supporting sources. Reviewed September 9, 2026. No secondary crypto blogs underpin the content.

The official mint was not live at review. Redacted launch settings are deliberately not supplied. Token symbols carry no quantity or timing meaning, and no market performance is predicted. Recheck official sources before updating factual copy or a later public release.

## Challenge rules

- Each run has 10 questions with three answer choices and one correct answer.
- `Pass` moves the current question to the end of the run once. A passed question returns after the unanswered sequence and cannot be passed again.
- Answer feedback explains the mechanism, names Alex's contextual reaction, and links to the supporting official source.
- Results show correct answers and completion time. Review answers, replay with a new question and answer order, or return to Learn.
- An optional X handle is trimmed, normalized with a leading `@`, limited to 15 username characters, and stored only when it contains letters, numbers, or underscores. Unsupported characters show an inline error instead of being silently removed. It is an unverified display value on the result card.
- `Share on X` uses a normal intent URL with the score and the current public `/challenge` URL. No X API or login is involved.
- The challenge is frontend-only. There is no account, leaderboard, server persistence, wallet, or backend.

## Public-launch metadata

The page has a title, description, mobile viewport, independent favicon, and a static 1200×630 social image. The title, description, and image identify this as an unofficial educational project.

On Vercel, canonical, Open Graph, and Twitter URLs use the automatically supplied `VERCEL_PROJECT_PRODUCTION_URL`. Production pages allow indexing; Vercel preview deployments use `noindex`. No manually configured environment variable is required. Local runs omit the canonical and use localhost for image URLs. If adding a custom domain later, select it as the production domain and redeploy so the static metadata is regenerated. See [Vercel system environment variables](https://vercel.com/docs/environment-variables/system-environment-variables).

## Publish to GitHub

The local repository is initialized but has no commit or remote. Install Git and the GitHub CLI if needed. Check authentication with `gh auth status`; run `gh auth login` if necessary. Then, from PowerShell:

```powershell
cd "C:\Users\ACER\Documents\ChatGPT\standard-reserve-explained"
git add .
git diff --cached --stat
git commit -m "Prepare Standard Reserve educational story for launch"
git branch -M main
gh repo create standard-reserve-explained --public --source=. --remote=origin --push
```

This creates a public repository in the authenticated GitHub account. The repository name must be available. See [GitHub CLI repository creation](https://cli.github.com/manual/gh_repo_create).

## Deploy to Vercel

1. Sign in to Vercel and choose **Add New → Project**.
2. Connect the GitHub account and import `standard-reserve-explained`.
3. Confirm the framework preset is **Next.js**. `vercel.json` explicitly selects it.
4. Keep the root directory at `./`. Select **Node.js 22.x**, install command `npm ci`, and build command `npm run build`. Leave the output directory at the framework default.
5. Use `main` as the production branch. No application environment variables are required.
6. Click **Deploy**. Once it completes, open the production URL in a private browser window to confirm public access. Check the story, Sources, favicon, and social image at `/opengraph-image`.

See [Vercel's Next.js deployment documentation](https://vercel.com/docs/frameworks/full-stack/nextjs). No deployment or GitHub publication was performed during this launch-preparation pass.

## Security and repository hygiene

Installed dependencies were updated to patched versions; `npm audit` reports zero vulnerabilities at review. The `sharp` override pins a version with a patched transitive libheif dependency. Keep `package-lock.json` committed and use `npm ci` for reproducible installs.

The app contains no authentication flow, analytics, wallet integration, or application secrets. `.gitignore` excludes local environment files, dependencies, generated builds, caches, and local hosting configuration. The earlier `.openai` registration is local-only, ignored, and unused by Next.js or Vercel. No Standard Reserve artwork or logo is used; the favicon repeats this project's own typographic mark.

Unofficial educational tool. Not affiliated with or endorsed by Standard Reserve. Built by Torvian.
