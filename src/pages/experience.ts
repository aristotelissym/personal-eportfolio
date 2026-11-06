import '../main';
import { certifications, degrees, languages } from '../data/education';
import { earlierRoles, roles, type Role } from '../data/experience';
import { skillGroups, workStyle } from '../data/skills';
import { shortHash } from '../lib/hash';
import { html, mount } from '../lib/html';

const commit = (role: Role) => {
  const current = role.end === null;
  return html`
    <li class="commit${current ? ' commit--head' : ''}">
      <p class="commit__meta">
        <span class="commit__hash">commit ${shortHash(role.company + role.title + role.start)}</span>
        ${current ? html`<span class="commit__ref">(HEAD -&gt; current)</span>` : null}
        <span><i class="fa-regular fa-calendar" aria-hidden="true"></i> ${role.start} – ${role.end ?? 'Present'}</span>
        <span><i class="fa-solid fa-location-dot" aria-hidden="true"></i> ${role.location}</span>
      </p>
      <article class="card commit__card">
        <div class="commit__head">
          <div>
            <h3 class="commit__title">${role.title}</h3>
            <p class="commit__company">@ ${role.company}</p>
          </div>
          ${current ? html`<span class="status status--active">● Current</span>` : null}
        </div>
        <ul class="commit__highlights">
          ${role.highlights.map((h) => html`<li>${h}</li>`)}
        </ul>
        ${role.tech.length > 0
          ? html`<ul class="tag-list" aria-label="Tools">
              ${role.tech.map((t) => html`<li class="tag">${t}</li>`)}
            </ul>`
          : null}
      </article>
    </li>
  `;
};

mount('#timeline', html`${roles.map(commit)}`);
mount('#timeline-earlier', html`${earlierRoles.map(commit)}`);

mount(
  '#skills-grid',
  html`${skillGroups.map(
    (group) => html`
      <section class="card skill-group">
        <h3 class="skill-group__title"><i class="${group.icon}" aria-hidden="true"></i> ${group.title}</h3>
        <ul class="tag-list">
          ${group.items.map((item) => html`<li class="tag tag--accent">${item}</li>`)}
        </ul>
      </section>
    `,
  )}`,
);

mount('#work-style', html`${workStyle.map((item) => html`<li class="tag">${item}</li>`)}`);

mount(
  '#certifications',
  html`${certifications.map(
    (cert) => html`
      <article class="card cert">
        <i class="cert__icon ${cert.icon}" aria-hidden="true"></i>
        <h3 class="cert__name">${cert.name}</h3>
        <p class="cert__meta">${cert.issuer} · ${cert.date}</p>
        ${cert.credentialUrl
          ? html`<a class="cert__link" href="${cert.credentialUrl}" target="_blank" rel="noopener">Verify ↗</a>`
          : null}
      </article>
    `,
  )}`,
);

mount(
  '#education',
  html`
    <article class="card">
      <h3 class="card__title card__title--flush">
        <i class="fa-solid fa-graduation-cap accent" aria-hidden="true"></i> Education
      </h3>
      <ul class="facts">
        ${degrees.map(
          (d) => html`<li>
            <div>
              <b>${d.degree}</b>
              <span class="muted">${d.school}${d.detail ? ` · ${d.detail}` : ''}</span>
            </div>
            ${d.ongoing
              ? html`<span class="status status--active">● Ongoing</span>`
              : html`<span class="facts__aside">${d.period ?? ''}</span>`}
          </li>`,
        )}
      </ul>
    </article>
    <article class="card">
      <h3 class="card__title card__title--flush"><i class="fa-solid fa-language accent" aria-hidden="true"></i> Languages</h3>
      <ul class="facts">
        ${languages.map((lang) => html`<li><b>${lang.name}</b><span class="facts__aside">${lang.level}</span></li>`)}
      </ul>
    </article>
  `,
);
