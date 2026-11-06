export interface Post {
  /** ISO date, YYYY-MM-DD. */
  date: string;
  readMinutes: number;
  /** Say what the reader learns, e.g. "Migrating a VM fleet to AWS without downtime". */
  title: string;
  excerpt: string;
  tags: string[];
  url: string;
}

/** Newest first. Until there are three, empty slots keep the grid full. */
export const posts: Post[] = [];

export const firstPostSlot = { action: '+ First post', hint: 'Title, date, one-line excerpt.' };
export const nextPostSlot = { action: '+ Post', hint: 'Infrastructure, automation or an incident lesson.' };
