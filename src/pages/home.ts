import '../main';
import { interests, workStyle } from '../data/skills';
import { html, mount } from '../lib/html';

const lists: Record<string, { items: string[]; tagClass: string }> = {
  interests: { items: interests, tagClass: 'as-tag as-tag--patched' },
  'work-style': { items: workStyle, tagClass: 'as-tag as-tag--plain' },
};

for (const [id, { items, tagClass }] of Object.entries(lists)) {
  mount(`#${id}`, html`${items.map((item) => html`<li class="${tagClass}">${item}</li>`)}`);
  const count = document.querySelector(`[data-count="${id}"]`);
  if (count) count.textContent = String(items.length);
}
