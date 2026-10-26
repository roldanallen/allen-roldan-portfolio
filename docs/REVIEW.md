# Preview review — 26 October 2026

This is a local preview, not a published website. Allen has not approved publication.

## Verified

- TypeScript validation and Vite production build pass.
- Locked dependency install succeeds (`--offline --frozen-lockfile`).
- Local HTTP preview returns 200.
- Desktop hero and three-project gallery visually inspected; screenshots in ignored `qa/`.
- Phone hero inspected at 390px; navigation opens, closes, and follows section links.
- 320px workflow dialog inspected; no horizontal overflow in page or dialog.
- Desktop page width fits the viewport.
- CRM: lead detail opens, stage changes, sample scheduling updates appointment count from one to two, stage filtering updates columns.
- Workflow: manual step, play, pause, and all six steps to completion verified.
- Data: cleanup changes eight rows to six with zero duplicate emails; CRM filter shows two records.
- CSV download inspected on disk: header plus six normalized fictional contacts, all using example.com.
- Escape dismisses the dialog and restores focus to the originating project button.
- No browser console errors or warnings in the tested interaction session.
- Upwork URL remains empty and the CTA links to Projects; no broken contact link.

## Implemented, with verification limits

- Reduced-motion handling exists in CSS, MotionConfig, and reveal/hero logic. The available browser interface did not offer reduced-motion emulation, so OS-preference behavior has not been exercised in-browser.
- Native modal dialog provides focus containment. Escape and focus restoration tested; exhaustive screen-reader and keyboard audits not performed.
- Breakpoint checks are browser viewport tests, not tests on physical phones or every browser engine.
- Image slot has a monogram fallback and fixed layout. No professional portrait has been provided.
- Deployment template is outside the workflow folder. No deployment or hosted-site verification has occurred.
- GitHub connection remains pending; no remote repository has been created or uploaded.

## Allen's review

1. Review the hero, white/blue/iris design, typography, and spacing.
2. Read the service descriptions and professional positioning.
3. Open each project and exercise its controls.
4. Review the phone layout and animation pace.
5. Request revisions or approve the design. Publishing remains a separate approval.

## Later inputs

- Connect GitHub for creation of the private `allen-roldan-portfolio` repository.
- Add an approved Upwork profile URL and portrait when available.
- Confirm hosting eligibility and public deployment only after design approval.
