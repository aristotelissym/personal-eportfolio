# Personal e-Portfolio

Personal portfolio of **Aristotelis Symeonidis**: Solution Engineer, cloud & DevOps.
A static, multi-page site built with plain **HTML + TypeScript + SCSS**, bundled by [Vite](https://vite.dev) and deployed to GitHub Pages.

Live: https://aristotelissym.github.io/personal-eportfolio/

## Getting started

```sh
npm install
npm run dev        # dev server at http://localhost:5173/personal-eportfolio/
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build locally
```

## Structure

```
index.html            Home: hero + terminal, 01 whoami
experience.html       02 experience timeline, 03 toolbox, 04 certificates & education
projects.html         05 selected work (filterable)
blog.html             06 notes from the pipeline (posts from src/data/posts.ts)
public/               Copied as-is (favicon, cv/ PDF)
src/
  partials/           head/header/contact/footer, inlined into every page at build time
                      via `<!-- @include name -->` (see vite.config.ts)
  data/               Content as typed data: experience, skills, education, projects, posts
  pages/              One entry script per page
  lib/                html`` escaping template, typewriter effect, helpers
  main.ts             Shared behaviour: theme toggle, mobile nav, active link
  styles/             _tokens (colours, fonts, breakpoints), _base, _layout, _components
```

### Editing content

- **Projects:** edit `src/data/projects.json` (fields documented in `projects.schema.json`, which editors use for
  autocomplete). Example entry:

  ```json
  {
    "kind": "Side project",
    "title": "Homelab cluster",
    "summary": "A three-node k3s cluster with GitOps deployments.",
    "tags": ["Kubernetes", "Flux"],
    "period": "2026 –",
    "repository": "https://gitlab.com/aristotelissym/homelab",
    "liveUrl": "https://example.com"
  }
  ```

  `kind`, `title`, `summary`, `tags` and `period` are required. The repository link shows a GitHub or GitLab icon
  based on the URL; for self-hosted GitLab add `"repositoryHost": "gitlab"`. Optional: `liveUrl`, `caseStudyUrl`,
  `image` (path under `public/`). With no links, the card says "Case study soon". `slots` holds the dashed
  "+ Add project" placeholders.
- **Roles, skills, certifications:** edit the `.ts` files in `src/data/`. The pages render from them.
- **Home page copy:** edit `index.html` directly.
- **CV:** replace `public/cv/Aristotelis-Symeonidis-CV.pdf`.
- **Theme colours / fonts:** `src/styles/_tokens.scss` (dark and light palettes).

### Content guidelines

Content and voice follow the "Aristotelis Symeonidis" design system on claude.ai:
first person, facts over adjectives (no invented metrics), sentence case, `Mon YYYY – Present` dates,
`↗` on external links, and work projects described by role and outcome only (no internal names or figures).

### Edit slots still to fill

Dashed `.slot` frames hold space for content not written yet. Replace them, never fill with lorem ipsum:

- Home: `+ Add photo` (square headshot, 480 × 480) and `+ Extend bio` in `index.html`.
- Projects: `projectSlots` in `src/data/projects.ts`; add case-study links via `caseStudy`.
- Blog: add posts to `src/data/posts.ts`; slots disappear as the grid fills.
- Certifications: add `credentialUrl` to show a "Verify ↗" link.

## Deployment

`.github/workflows/deploy.yml` builds and publishes `dist/` on every push to `main`.
One-time setup: **GitHub → Settings → Pages → Build and deployment → Source: GitHub Actions**.
