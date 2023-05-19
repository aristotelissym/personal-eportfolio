// Header variable
let appHeader = `
<nav class="navbar is-transparent"
style="margin-left: 50px; margin-right: 50px; padding-top: 4px; padding-bottom: 4px;">
<div class="navbar-brand">
  <a class="navbar-item" href="./index.html" style="font-size: larger; font-weight: 600;">
    <i class="fa-solid fa-terminal" style="margin-right: 8px;"></i>
    Aristotelis.
  </a>
  <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbar-menu-header">
    <span aria-hidden="true"></span>
    <span aria-hidden="true"></span>
    <span aria-hidden="true"></span>
  </a>
</div>

<div class="navbar-menu" id="navbar-menu-header">
  <div class="navbar-end">
  <!-- <a class="navbar-item" href="./whoami.html">
     $ whoami
    </a>
    <a class="navbar-item" href="./projects.html">
      Projects
    </a>
    <a class="navbar-item" href="./blog.html">
      Blog
    </a>
    <a class="navbar-item" href="./contact.html">
      <button class="button is-rounded" style="background-color: hsl(246, 75%, 52%); color: antiquewhite;">
        Let's Chat
      </button>
    </a> -->
  </div>
</div>
</nav>

`;

// Assign Template to Element.
document.getElementById("app-header").innerHTML = appHeader;