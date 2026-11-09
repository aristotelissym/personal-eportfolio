# Personal e-Portfolio

Personal portfolio of **Aristotelis Symeonidis**, DevOps engineer. The design is **the as-built record**: the site reads
like a set of engineering drawings (sheets, title blocks, dimension lines, a server rack), in two themes, Blueprint
(dark) and Drafting paper (light).
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
index.html            Cover sheet (hero, terminal, title block), 01 whoami, sheet index
experience.html       02 experience pipeline, 03 toolbox rack, 04 certificates & education
projects.html         05 selected work: drawing sheets from projects.json, filterable by tool
blog.html             06 field notes (posts from src/data/posts.ts)
public/               Copied as-is (favicon, cv/ PDF)
src/
  partials/           head/header/contact/footer, inlined into every page at build time
                      via `<!-- @include name -->` (see vite.config.ts)
  data/               Content as typed data: experience, skills, education, projects, posts
  pages/              One entry script per page
  lib/                html`` escaping template, cable tags + tool icons, hazard-tape slot
  main.ts             Shared behaviour: theme toggle, mobile menu, active link, dates
  styles/             _tokens (design-system tokens, both themes), _base,
                      _components + _icons (ported from the design system's bundle.css), _site
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
    "revision": "B",
    "repository": "https://gitlab.com/aristotelissym/homelab",
    "liveUrl": "https://example.com"
  }
  ```

  `kind`, `title`, `summary`, `tags` and `period` are required. Sheets are numbered `DWG P-01`, `P-02`… in file
  order; `revision` is the letter in the foot (default `A`). The repository link reads "GitHub ↗" or "GitLab ↗"
  based on the URL; for self-hosted GitLab add `"repositoryHost": "gitlab"`. Optional: `liveUrl`, `caseStudyUrl`,
  `image` (path under `public/`). With no links, the foot says "Case study soon". `slots` is a list of one-line
  hazard-taped "work in progress" placeholders.
- **Tool icons:** known tools (AWS, Kubernetes, Terraform…) get the design system's own line icon; the map is in
  `src/lib/tags.ts`. AWS, Azure, GCP and OTC show as patched (blue) cable tags.
- **Roles, skills, certifications:** edit the `.ts` files in `src/data/`. The pages render from them.
- **Home page copy:** edit `index.html` directly.
- **CV:** replace `public/cv/Aristotelis-Symeonidis-CV.pdf`.
- **Theme colours / fonts:** `src/styles/_tokens.scss` (dark and light palettes).

### Content guidelines

Content, voice and visuals follow the "Aristotelis Symeonidis" design system on claude.ai
(https://claude.ai/artifact/GEukhT7owmYgVn1Ho7x9DG): first person, facts over adjectives (no invented metrics),
prose in sentence case and drawing furniture in uppercase mono, `↗` on external links, no emoji, and work projects
described by role and outcome only (no internal names or figures). Sections are sheets numbered `/ 07`; a new section
means bumping that total everywhere. The title-block revision (`Rev`) is stamped with the build's `YYYY.MM`.

### Edit slots still to fill

Hazard-taped `.as-slot` frames hold space for content not written yet. Replace them, never fill with lorem ipsum:

- Home: headshot (square, 480 × 480) and extended bio in `index.html`.
- Projects: `slots` in `src/data/projects.json`; add case-study links via `caseStudyUrl`.
- Blog: add posts to `src/data/posts.ts`; slots disappear as the grid fills.
- Certifications: add `credentialUrl` to show a "Verify ↗" link.

## Deployment

`.github/workflows/deploy.yml` builds and publishes `dist/` on every push to `main`.
One-time setup: **GitHub → Settings → Pages → Build and deployment → Source: GitHub Actions**.
