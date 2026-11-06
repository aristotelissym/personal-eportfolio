import { html } from './html';

/** Dashed placeholder that holds space for content still to be written. */
export const slot = (action: string, hint = '', extraClass = '') =>
  html`<div class="slot${extraClass ? ` ${extraClass}` : ''}"><b>${action}</b>${hint ? html`<span>${hint}</span>` : null}</div>`;
