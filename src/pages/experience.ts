import '../main';
import { certifications, degrees, languages } from '../data/education';
import { earlierRoles, roles, type Role } from '../data/experience';
import { skillGroups } from '../data/skills';
import { html, mount } from '../lib/html';
import { icon, tag, tagList } from '../lib/tags';

const pad = (n: number) => String(n).padStart(2, '0');

const stage = (role: Role) => {
  const current = role.end === null;
  return html`
    <li class="as-reveal as-xp${current ? ' as-xp--current' : ''}">
      <div class="as-xp__top">
        <div>
          <h3 class="as-xp__role">${role.title}</h3>
          <p class="as-xp__org">${role.company}</p>
        </div>
        <div class="as-xp__when">
          ${current ? html`<span class="as-lamp">Running</span>` : null}
          <span class="as-anno">${role.start} – ${role.end ?? 'Present'} · ${role.location}</span>
        </div>
      </div>
      <ul class="as-xp__list">
        ${role.highlights.map((h) => html`<li>${h}</li>`)}
      </ul>
      ${tagList(role.tech, 'Tools')}
    </li>
  `;
};

mount('#timeline', html`${roles.map(stage)}`);
mount('#timeline-earlier', html`${earlierRoles.map(stage)}`);

mount(
  '#rack',
  html`
    <div class="as-rack__label as-label"><span>Rack A — toolbox</span><span>${skillGroups.length}U</span></div>
    ${skillGroups.map(
      (group, i) => html`
        <div class="as-reveal as-unit">
          <span class="as-unit__u as-label" style="--u:${i + 1}"
            >U${pad(i + 1)}<span class="as-leds" aria-hidden="true"><i></i><i></i><i></i></span
          ></span>
          <h3 class="as-unit__name">${icon(group.icon, 'md')}${group.title}</h3>
          <ul class="as-tags" aria-label="${group.title} tools">
            ${group.items.map((item) => tag(item, group.patched?.includes(item) ?? false))}
          </ul>
        </div>
      `,
    )}
  `,
);

mount(
  '#certifications',
  html`${certifications.map(
    (cert) => html`
      <article class="as-reveal as-sheet as-plate">
        <span class="as-plate__mono" aria-hidden="true">${cert.monogram}</span>
        <div>
          <h3 class="as-plate__title">${cert.name}</h3>
          <p class="as-plate__by">${cert.issuer} · ${cert.date}</p>
          ${cert.credentialUrl
            ? html`<a class="as-plate__link" href="${cert.credentialUrl}" target="_blank" rel="noopener">Verify ↗</a>`
            : null}
        </div>
      </article>
    `,
  )}`,
);

const factsSheet = (title: string, count: number, items: ReturnType<typeof html>[]) => html`
  <div class="as-reveal as-sheet">
    <div class="as-sheet__strip as-label"><h3 class="as-label" style="margin:0">${title}</h3><span>${count}</span></div>
    <div class="as-sheet__body" style="padding-top:8px;padding-bottom:8px"><ul class="as-facts">${items}</ul></div>
  </div>
`;

mount(
  '#education',
  html`
    ${factsSheet(
      'Education',
      degrees.length,
      degrees.map(
        (d) => html`<li>
          <div><b>${d.degree}</b><small>${d.school}${d.detail ? ` · ${d.detail}` : ''}</small></div>
          ${d.ongoing ? html`<span class="as-lamp">Ongoing</span>` : html`<span class="as-anno">${d.period ?? ''}</span>`}
        </li>`,
      ),
    )}
    ${factsSheet(
      'Languages',
      languages.length,
      languages.map((lang) => html`<li><b>${lang.name}</b><span class="as-anno">${lang.level}</span></li>`),
    )}
  `,
);
