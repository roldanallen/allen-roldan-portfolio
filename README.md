# Allen Roldan — Portfolio

A responsive, white-dominant portfolio for **Allen Roldan**, CRM & Operations Virtual Assistant | AI Automation Specialist.

**Status: local design preview. Publication requires Allen's approval.** No deployment runs on push. No live CRM, AI model, email, booking system, or external API is connected.

## Run locally

Use Node.js 22 or newer and pnpm (the generated lockfile uses pnpm 11).

```sh
pnpm install
pnpm dev
```

If pnpm asks to approve dependency builds, run `pnpm approve-builds` and approve **esbuild**, then rerun the install. Alternatively run `node node_modules/esbuild/install.js` to install esbuild's platform binary explicitly.

```sh
pnpm build
pnpm preview
```

`pnpm build` runs TypeScript validation and generates the static website in `dist/`. The dev server binds to local loopback. Preview URLs are local to your computer.

## Project structure

```text
src/
  App.tsx            Page sections, navigation, project dialog, motion primitives
  ProfilePhoto.tsx   Replaceable portrait with monogram fallback
  Demos.tsx          Local CRM, workflow, data-cleanup demos and card previews
  content.ts        Typed profile and project content
  main.tsx          React entry point and reduced-motion configuration
  styles.css        Design tokens, components, breakpoints, reduced-motion styles
public/
  favicon.svg
docs/
  REVIEW.md          Review checklist and verification record
  github-pages.yml  Inactive, manually triggered deployment template
```

## Personalization

Edit `src/content.ts`:

- `profile.name` and `profile.title` hold the professional identity.
- `profile.upworkUrl` stays empty until an approved profile URL is available. Only HTTPS `upwork.com/freelancers/...` URLs are accepted; otherwise the closing CTA links to Projects.
- `profile.photo` stays empty for the intentional AR monogram. Add a portrait to `public/profile.jpg` and set `photo: './profile.jpg'`. The dedicated component preserves its reserved layout and falls back to the monogram if the image fails.
- Update page title and SEO description in `index.html` when changing positioning.

The site intentionally has no personal email, telephone, external booking link, contact form, or fabricated testimonials.

## Demonstrations

All three projects are visibly marked **Concept Demonstration — Simulated Data**.

1. **CRM:** filter fictional leads, inspect a record, change stages, and schedule a fictional slot. Metrics update from local state. This is not a live GoHighLevel interface.
2. **Workflow:** play, pause, step, reset, and inspect six nodes. Categorization is a fixed illustrative result; no AI inference or notification occurs.
3. **Data:** normalize and deduplicate eight fictional rows into six unique contacts, filter categories, inspect charts, and export sanitized CSV. Export always contains the complete clean dataset, regardless of the current table filter.

Demo state resets when its project dialog closes. This is deliberate: no visitor data is collected or persisted.

## Replacing a concept with verified work

`Project` in `src/content.ts` separates content from presentation and includes status, technologies, cover, problem, solution, implementation details, demo key, evidence assets, outcomes, and external links. Add the new demo to the component registry/selection in `App.tsx` and its thumbnail in `Demos.tsx` when introducing a new demo type.

Use only substantiated outcomes and permission-cleared screenshots. Change status to `Personal Project`, `Verified Implementation`, or `Client Project` only when appropriate. Adapt the project card's simulation label and case-study presentation when replacing simulated work; those labels intentionally remain explicit for the current three demonstrations. Never infer client results from demo metrics. GoHighLevel remains under developing skills until real evidence supports changing it.

## Private GitHub repository

Suggested name: `allen-roldan-portfolio`. GitHub authentication is needed before a remote repository can be created. Keep it private initially. Do not commit `node_modules`, `.pnpm-store`, `dist`, secrets, or personal client records.

With an authenticated GitHub CLI, the initial remote can be created with:

```sh
gh repo create allen-roldan-portfolio --private --source=. --remote=origin --push
```

Run this only after preparing the local commit and confirming the intended GitHub account.

## GitHub Pages — after design approval

The project uses relative Vite asset URLs and hash anchors, so it supports a repository subpath without server-side routing.

The deployment template is stored under `docs/`, outside `.github/workflows/`, and therefore cannot deploy anything yet. After Allen approves publication:

1. Confirm hosting eligibility. GitHub Pages from a private personal repository requires GitHub Pro; eligible organization plans also support private repositories. The website itself can still be public. [GitHub's official guidance](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site).
2. If the account is not eligible, choose another static host that supports private source, or separately approve making the repository public. Do not change visibility automatically.
3. Copy `docs/github-pages.yml` to `.github/workflows/deploy.yml` and commit it.
4. In the repository's Pages settings, choose GitHub Actions as the source.
5. Manually run **Publish approved portfolio** from Actions. It is intentionally not triggered by pushes.
6. Verify the resulting public URL on desktop and mobile before adding it to Upwork.

Review policy text and hosting eligibility again when publishing; they can change. No hosting service is configured or activated by this local project.
