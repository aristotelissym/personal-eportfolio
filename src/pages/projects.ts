import '../main';
import { projectSlots, projects, type Project, type RepositoryHost } from '../data/projects';
import { html, mount } from '../lib/html';
import { slot } from '../lib/slot';

const ALL = '*';
const tags = [ALL, ...new Set(projects.flatMap((p) => p.tags))].sort((a, b) =>
  a === ALL ? -1 : b === ALL ? 1 : a.localeCompare(b),
);
let activeTag = ALL;

const REPO_LINK: Record<RepositoryHost | 'other', { icon: string; label: string }> = {
  github: { icon: 'fa-brands fa-github', label: 'GitHub' },
  gitlab: { icon: 'fa-brands fa-gitlab', label: 'GitLab' },
  other: { icon: 'fa-solid fa-code-branch', label: 'Source' },
};

const repoLink = (repo: NonNullable<Project['repository']>) => {
  const { icon, label } = REPO_LINK[repo.host ?? 'other'];
  return html`<a href="${repo.url}" target="_blank" rel="noopener"><i class="${icon}" aria-hidden="true"></i> ${label} ↗</a>`;
};

const projectCard = (p: Project) => html`
  <article class="card project">
    ${p.image
      ? html`<img class="project__image" src="${import.meta.env.BASE_URL}${p.image}" alt="Screenshot of ${p.title}" loading="lazy" />`
      : null}
    <div class="project__body">
      <p class="project__kind">${p.kind}</p>
      <h2 class="project__name">${p.title}</h2>
      <p class="card__text">${p.summary}</p>
      <ul class="tag-list" aria-label="Tools">
        ${p.tags.map((t) => html`<li class="tag">${t}</li>`)}
      </ul>
      <div class="project__foot">
        <span class="project__period">${p.period}</span>
        <span class="project__links">
          ${p.repository ? repoLink(p.repository) : null}
          ${p.liveUrl ? html`<a href="${p.liveUrl}" target="_blank" rel="noopener">Live ↗</a>` : null}
          ${p.caseStudyUrl ? html`<a href="${p.caseStudyUrl}">Case study →</a>` : null}
          ${!p.repository && !p.liveUrl && !p.caseStudyUrl ? html`<span class="muted">Case study soon</span>` : null}
        </span>
      </div>
    </div>
  </article>
`;

function render(): void {
  mount(
    '#project-filters',
    html`${tags.map(
      (tag) => html`<button type="button" class="chip" data-tag="${tag}" aria-pressed="${String(tag === activeTag)}">
        ${tag === ALL ? 'all' : tag}
      </button>`,
    )}`,
  );

  const visible = activeTag === ALL ? projects : projects.filter((p) => p.tags.includes(activeTag));
  mount(
    '#project-grid',
    html`${visible.map(projectCard)}${activeTag === ALL ? projectSlots.map((s) => slot(s.action, s.hint)) : null}`,
  );

  const count = document.getElementById('project-count');
  if (count) {
    count.textContent = `${visible.length} ${visible.length === 1 ? 'project' : 'projects'}${activeTag === ALL ? '' : ` tagged ${activeTag}`}`;
  }
}

document.getElementById('project-filters')?.addEventListener('click', (event) => {
  const chip = (event.target as HTMLElement).closest<HTMLButtonElement>('.chip');
  const tag = chip?.dataset.tag;
  if (!tag || tag === activeTag) return;
  activeTag = tag;
  render();
  document.querySelector<HTMLButtonElement>(`.chip[data-tag="${CSS.escape(tag)}"]`)?.focus();
});

render();
