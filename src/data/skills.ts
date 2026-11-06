export interface SkillGroup {
  title: string;
  icon: string;
  items: string[];
}

/** Grouped by layer of the stack. */
export const skillGroups: SkillGroup[] = [
  { title: 'Cloud', icon: 'fa-solid fa-cloud', items: ['AWS', 'Azure', 'GCP', 'OTC'] },
  { title: 'Containers & orchestration', icon: 'fa-brands fa-docker', items: ['Kubernetes', 'Docker', 'Rancher', 'Helm'] },
  { title: 'Infrastructure as code', icon: 'fa-solid fa-layer-group', items: ['Terraform', 'Scalr', 'Ansible', 'YAML'] },
  { title: 'CI/CD', icon: 'fa-solid fa-infinity', items: ['GitLab CI/CD'] },
  {
    title: 'Programming',
    icon: 'fa-solid fa-code',
    items: ['Bash', 'Python', 'TypeScript', 'JavaScript', 'Angular', 'NestJS'],
  },
  { title: 'Systems', icon: 'fa-solid fa-server', items: ['Linux administration', 'Incident management'] },
];

export const interests: string[] = ['System architecture', 'Cloud computing', 'DevOps', 'IoT'];

export const workStyle: string[] = [
  'Ownership',
  'Root cause analysis',
  'Decision-making',
  'Cross-functional teams',
  'Collaboration',
  'Time management',
];
