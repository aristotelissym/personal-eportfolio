import '../main';
import { projectSlots, projects, type Project, type RepositoryHost } from '../data/projects';
import { html, mount } from '../lib/html';
import { slot } from '../lib/slot';
import { icon, tagList } from '../lib/tags';

const ALL = '*';
const tags = [ALL, ...new Set(projects.flatMap((p) => p.tags))].sort((a, b) =>
  a === ALL ? -1 : b === ALL ? 1 : a.localeCompare(b),
);
let activeTag = ALL;

const REPO_LABEL: Record<RepositoryHost | 'other', string> = { github: 'GitHub', gitlab: 'GitLab', other: 'Source' };

const pad = (n: number) => String(n).padStart(2, '0');

// Drawing numbers follow the order in projects.json, so they stay stable while filtering.
const sheet = (p: Project) => {
  const links = [
    p.repository
      ? html`<a href="${p.repository.url}" target="_blank" rel="noopener">${REPO_LABEL[p.repository.host ?? 'other']} ↗</a>`
      : null,
    p.liveUrl ? html`<a href="${p.liveUrl}" target="_blank" rel="noopener">Live ↗</a>` : null,
    p.caseStudyUrl ? html`<a href="${p.caseStudyUrl}">Case study →</a>` : null,
  ].filter(Boolean);

  return html`
    <article class="as-reveal as-sheet as-sheet--hover">
      <div class="as-sheet__strip as-label"><span>DWG P-${pad(projects.indexOf(p) + 1)}</span><span>${p.kind}</span></div>
      ${p.image
        ? html`<figure class="as-sheet__figure">
            <img src="${import.meta.env.BASE_URL}${p.image}" alt="Screenshot of ${p.title}" loading="lazy" />
          </figure>`
        : null}
      <div class="as-sheet__body">
        <h2 class="as-sheet__title">${p.title}</h2>
        <p>${p.summary}</p>
        ${tagList(p.tags, 'Tools')}
      </div>
      <div class="as-sheet__foot as-anno">
        <span>Rev ${p.revision} · ${p.period}</span>
        ${links.length > 0 ? html`<span class="as-sheet__links">${links}</span>` : html`<span>Case study soon</span>`}
      </div>
    </article>
  `;
};

function render(): void {
  mount(
    '#project-filters',
    html`${tags.map(
      (t) => html`<button type="button" class="as-tag" data-tag="${t}" aria-pressed="${String(t === activeTag)}">
        ${t === ALL ? 'All' : html`${icon(t)}${t}`}
      </button>`,
    )}`,
  );

  const visible = activeTag === ALL ? projects : projects.filter((p) => p.tags.includes(activeTag));
  mount('#project-grid', html`${visible.map(sheet)}${activeTag === ALL ? projectSlots.map(slot) : null}`);

  const count = document.getElementById('project-count');
  if (count) {
    const n = `${pad(visible.length)} ${visible.length === 1 ? 'sheet' : 'sheets'}`;
    count.textContent = activeTag === ALL ? n : `${n} · ${activeTag}`;
  }
}

document.getElementById('project-filters')?.addEventListener('click', (event) => {
  const button = (event.target as HTMLElement).closest<HTMLButtonElement>('button[data-tag]');
  const t = button?.dataset.tag;
  if (!t || t === activeTag) return;
  activeTag = t;
  render();
  document.querySelector<HTMLButtonElement>(`button[data-tag="${CSS.escape(t)}"]`)?.focus();
});

render();
