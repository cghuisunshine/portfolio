(function () {
  "use strict";

  function qs(sel, root) {
    return (root || document).querySelector(sel);
  }

  function qsa(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function formatDate(iso) {
    if (!iso) return "Draft";
    var d = new Date(iso);
    if (isNaN(d.getTime())) return "Draft";
    return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  }

  function setActiveNav() {
    var path = (location.pathname || "").split("/").pop() || "index.html";
    qsa(".nav a").forEach(function (a) {
      var href = (a.getAttribute("href") || "").split("/").pop();
      if (!href) return;
      var isIndex = href === "index.html" && (path === "" || path === "index.html");
      var isMatch = href === path || isIndex;
      if (isMatch) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
  }

  function setYear() {
    var el = qs("[data-year]");
    if (!el) return;
    el.textContent = String(new Date().getFullYear());
  }

  function renderProjects(target, projects) {
    if (!target) return;
    target.innerHTML = projects
      .map(function (p) {
        var tags = (p.keywords || [])
          .map(function (k) {
            return '<span class="tag">' + escapeHtml(k) + "</span>";
          })
          .join("");

        return (
          '<article class="card reveal">' +
          '  <div class="media">' +
          '    <img src="' + escapeHtml(p.image) + '" alt="' + escapeHtml(p.title) + '" loading="lazy">' +
          "  </div>" +
          '  <div style="margin-top:12px">' +
          '    <h3 style="margin:0 0 6px">' + escapeHtml(p.title) + "</h3>" +
          '    <p class="muted" style="margin:0 0 10px;font-size:13px">' + escapeHtml(p.description) + "</p>" +
          '    <div class="tags" style="margin:0 0 14px">' + tags + "</div>" +
          '    <div class="actions" style="margin:0">' +
          '      <a class="btn btn-outline" href="' + escapeHtml(p.link) + '" target="_blank" rel="noreferrer">Open</a>' +
          '      <a class="btn btn-primary" href="project.html?id=' + encodeURIComponent(p.id) + '">Details</a>' +
          "    </div>" +
          "  </div>" +
          "</article>"
        );
      })
      .join("");
  }

  function renderPosts(target, posts) {
    if (!target) return;
    target.innerHTML = posts
      .map(function (post) {
        return (
          '<article class="card reveal">' +
          '  <h3 style="margin:0 0 6px;font-size:16px">' +
          '    <a href="post.html?slug=' + encodeURIComponent(post.slug) + '">' +
          escapeHtml(post.title) +
          "</a>" +
          "  </h3>" +
          '  <p class="muted" style="margin:0 0 10px;font-size:12px;letter-spacing:0.12em;text-transform:uppercase">' +
          escapeHtml(formatDate(post.createdAt)) +
          "</p>" +
          '  <p class="muted" style="margin:0;font-size:13px">' + escapeHtml(post.excerpt || "") + "</p>" +
          "</article>"
        );
      })
      .join("");
  }

  function getParam(name) {
    var params = new URLSearchParams(location.search || "");
    return params.get(name);
  }

  function initIndex() {
    var demo = window.DEMO;
    if (!demo) return;
    var grid = qs("[data-project-grid]");
    renderProjects(grid, demo.projects.slice(0, 3));
  }

  function initProjects() {
    var demo = window.DEMO;
    if (!demo) return;
    renderProjects(qs("[data-project-grid]"), demo.projects);
  }

  function initProject() {
    var demo = window.DEMO;
    if (!demo) return;
    var id = getParam("id");
    var project = null;
    for (var i = 0; i < demo.projects.length; i++) {
      if (demo.projects[i].id === id) {
        project = demo.projects[i];
        break;
      }
    }
    if (!project) {
      qs("[data-project]").innerHTML =
        '<div class="card">Project not found. <a href="projects.html">Back to projects</a>.</div>';
      return;
    }

    var container = qs("[data-project]");
    container.innerHTML =
      '<section class="hero">' +
      '  <div class="reveal">' +
      '    <div class="kicker">Project</div>' +
      '    <h1>' + escapeHtml(project.title) + "</h1>" +
      '    <p class="subtitle">' + escapeHtml(project.description) + "</p>" +
      '    <div class="tags">' +
      (project.keywords || [])
        .map(function (k) { return '<span class="tag">' + escapeHtml(k) + "</span>"; })
        .join("") +
      "</div>" +
      '    <div class="actions">' +
      '      <a class="btn btn-outline" href="projects.html">Back</a>' +
      '      <a class="btn btn-primary" href="' + escapeHtml(project.link) + '" target="_blank" rel="noreferrer">Open</a>' +
      "    </div>" +
      "  </div>" +
      '  <aside class="card card-muted reveal delay-1">' +
      '    <div class="media" style="aspect-ratio: 16/10">' +
      '      <img src="' + escapeHtml(project.image) + '" alt="' + escapeHtml(project.title) + '">' +
      "    </div>" +
      '    <div class="divider-dashed muted" style="font-size:12px">Demo case study page</div>' +
      "  </aside>" +
      "</section>" +
      '<section class="section">' +
      "  <h2>Overview</h2>" +
      '  <p class="section-subtitle">What this project is and why it matters (demo copy).</p>' +
      '  <div class="grid grid-2">' +
      '    <div class="card reveal">' +
      "      <h3>Problem</h3>" +
      '      <p class="muted" style="margin:0;font-size:13px">A clear statement of the user need and constraints.</p>' +
      "    </div>" +
      '    <div class="card reveal delay-1">' +
      "      <h3>Solution</h3>" +
      '      <p class="muted" style="margin:0;font-size:13px">' + escapeHtml(project.details || "") + "</p>" +
      "    </div>" +
      "  </div>" +
      "</section>";
  }

  function initBlog() {
    var demo = window.DEMO;
    if (!demo) return;
    renderPosts(qs("[data-posts]"), demo.posts);
  }

  function initPost() {
    var demo = window.DEMO;
    if (!demo) return;
    var slug = getParam("slug");
    var post = null;
    for (var i = 0; i < demo.posts.length; i++) {
      if (demo.posts[i].slug === slug) {
        post = demo.posts[i];
        break;
      }
    }
    var container = qs("[data-post]");
    if (!post) {
      container.innerHTML =
        '<div class="card">Post not found. <a href="blog.html">Back to blog</a>.</div>';
      return;
    }

    var blocks = String(post.content || "")
      .split(/\n{2,}/)
      .map(function (s) { return s.trim(); })
      .filter(function (s) { return s.length > 0; });

    container.innerHTML =
      '<section class="section">' +
      '  <p class="kicker">Blog</p>' +
      '  <h1 style="font-size:clamp(26px,3vw,34px);margin:0 0 8px;font-weight:800">' + escapeHtml(post.title) + "</h1>" +
      '  <p class="muted" style="margin:0 0 22px;font-size:12px;text-transform:uppercase;letter-spacing:0.14em">Published ' +
      escapeHtml(formatDate(post.createdAt)) +
      "</p>" +
      '  <div class="card reveal">' +
      blocks
        .map(function (para) {
          return '<p style="margin:0 0 12px">' + escapeHtml(para) + "</p>";
        })
        .join("") +
      "  </div>" +
      '  <div class="actions" style="margin-top:16px">' +
      '    <a class="btn btn-outline" href="blog.html">Back to all posts</a>' +
      "  </div>" +
      "</section>";
  }

  function initContact() {
    var demo = window.DEMO;
    if (!demo) return;
    var emailLink = qs("[data-email-link]");
    if (emailLink) {
      emailLink.setAttribute("href", "mailto:" + demo.person.email);
      emailLink.textContent = demo.person.email;
    }

    var form = qs("form[data-demo-form]");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var note = qs("[data-form-note]");
      if (note) {
        note.textContent = "Thanks! This is a demo form on GitHub Pages. Use the email link below to get in touch.";
      }
    });
  }

  function init() {
    setActiveNav();
    setYear();

    var page = document.body ? document.body.getAttribute("data-page") : "";
    if (page === "index") initIndex();
    if (page === "projects") initProjects();
    if (page === "project") initProject();
    if (page === "blog") initBlog();
    if (page === "post") initPost();
    if (page === "contact") initContact();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
