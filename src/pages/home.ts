import '../main';
import { certifications } from '../data/education';
import { interests, workStyle } from '../data/skills';
import { html, mount } from '../lib/html';
import { typewriter } from '../lib/typewriter';

mount('#interests', html`${interests.map((item) => html`<li class="tag tag--accent">${item}</li>`)}`);
mount('#work-style', html`${workStyle.map((item) => html`<li class="tag">${item}</li>`)}`);

const certCount = document.querySelector<HTMLElement>('[data-cert-count]');
if (certCount) certCount.textContent = String(certifications.length);

const terminal = document.querySelector<HTMLElement>('[data-typewriter]');
if (terminal) void typewriter(terminal);
