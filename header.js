// Header variable
let appHeader = `
<nav class="navbar is-transparent"
style="margin-left: 50px; margin-right: 50px; padding-top: 4px; padding-bottom: 4px;">
<div class="navbar-brand">
  <a class="navbar-item" href="./index.html" style="font-size: larger; font-weight: 500;">
    <i class="fa-solid fa-terminal" style="margin-right: 8px;"></i>
    Aristotelis.
  </a>
</div>

<div id="navbar-menu" class="navbar-menu">
  <div class="navbar-end">
   <a class="navbar-item" href="./whoami.html">
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
    </a>
  </div>
</div>
</nav>
`;

// Assign Template to Element.
document.getElementById("app-header").innerHTML = appHeader;