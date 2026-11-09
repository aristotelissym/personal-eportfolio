import { html } from './html';

/** Hazard-taped edit slot: holds space for content not written yet. */
export const slot = (text: string) => html`
  <div class="as-reveal as-slot">
    <div class="as-slot__tape"></div>
    <div class="as-slot__body"><span class="as-label"><b>Work in progress</b></span>${text}</div>
  </div>
`;
