import '../main';
import { firstPostSlot, nextPostSlot, posts, type Post } from '../data/posts';
import { html, mount } from '../lib/html';
import { slot } from '../lib/slot';

const postCard = (post: Post) => html`
  <article class="card project">
    <div class="project__body">
      <p class="project__kind"><time datetime="${post.date}">${post.date}</time> · ${post.readMinutes} min read</p>
      <h2 class="project__name"><a class="card__link" href="${post.url}">${post.title}</a></h2>
      <p class="card__text">${post.excerpt}</p>
      <ul class="tag-list" aria-label="Topics">
        ${post.tags.map((t) => html`<li class="tag">${t}</li>`)}
      </ul>
    </div>
  </article>
`;

// Keep the grid at least three cards wide while the blog grows.
const visibleSlots = Array.from({ length: Math.max(0, 3 - posts.length) }, (_, i) =>
  i === 0 && posts.length === 0 ? firstPostSlot : nextPostSlot,
);

mount('#post-grid', html`${posts.map(postCard)}${visibleSlots.map((s) => slot(s.action, s.hint))}`);
