import { html } from './html';

/**
 * Tool name → icon from the design system's own set (src/styles/_icons.scss).
 * Tools without an entry render as a plain cable tag; never show an icon without its name.
 */
const ICONS: Record<string, string> = {
  Cloud: 'cloud',
  AWS: 'aws',
  Azure: 'azure',
  GCP: 'gcp',
  OTC: 'otc',
  Kubernetes: 'kubernetes',
  Docker: 'docker',
  Rancher: 'rancher',
  Helm: 'helm',
  Terraform: 'terraform',
  Scalr: 'scalr',
  Ansible: 'ansible',
  YAML: 'yaml',
  'GitLab CI/CD': 'gitlab-ci',
  Bash: 'bash',
  Python: 'python',
  JavaScript: 'javascript',
  TypeScript: 'typescript',
  Angular: 'angular',
  NestJS: 'nestjs',
  Linux: 'linux',
  'Linux administration': 'linux',
  'Incident management': 'incident',
};

/** Platforms get the "patched" cable tag. */
export const PLATFORMS = new Set(['AWS', 'Azure', 'GCP', 'OTC']);

export const icon = (name: string, size: '' | 'md' | 'lg' = '') => {
  const id = ICONS[name];
  return id ? html`<i class="as-ico${size ? ` as-ico--${size}` : ''} as-ico--${id}" aria-hidden="true"></i>` : null;
};

export const tag = (name: string, patched = PLATFORMS.has(name)) =>
  html`<li class="as-tag${patched ? ' as-tag--patched' : ''}">${icon(name)}${name}</li>`;

export const tagList = (names: readonly string[], label: string, patched?: (name: string) => boolean) =>
  names.length > 0
    ? html`<ul class="as-tags" aria-label="${label}">${names.map((n) => tag(n, patched ? patched(n) : undefined))}</ul>`
    : null;
