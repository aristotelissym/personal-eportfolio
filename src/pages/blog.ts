import '../main';
import { posts, type Post } from '../data/posts';
import { html, mount } from '../lib/html';
import { slot } from '../lib/slot';
import { tagList } from '../lib/tags';

const pad = (n: number) => String(n).padStart(2, '0');

// A post is a field note: N-01 is the oldest, so number from the end of the newest-first list.
const note = (post: Post, i: number) => html`
  <article class="as-reveal as-sheet as-sheet--hover">
    <div class="as-sheet__strip as-label"><span>Note N-${pad(posts.length - i)}</span><span>${post.readMinutes} min</span></div>
    <div class="as-sheet__body">
      <h2 class="as-sheet__title"><a href="${post.url}" style="color:inherit;text-decoration:none">${post.title}</a></h2>
      <p>${post.excerpt}</p>
      ${tagList(post.tags, 'Topics')}
    </div>
    <div class="as-sheet__foot as-anno"><time datetime="${post.date}">${post.date}</time><a href="${post.url}">Read ↗</a></div>
  </article>
`;

// Keep the grid three sheets wide while the notes grow.
const slots = Array.from({ length: Math.max(0, 3 - posts.length) }, (_, i) => {
  const n = posts.length + i + 1;
  return slot(n === 1 ? 'Note N-01: title, date, one-line excerpt.' : `Note N-${pad(n)}`);
});

mount('#post-grid', html`${posts.map(note)}${slots}`);
