/* Shared rendering for all three pages. Content lives in content.js. */
(function () {
  "use strict";

  var SITE = window.SITE;
  var PROJECTS = window.PROJECTS || [];

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  // Turn a Vimeo / YouTube / direct mp4 link into something playable.
  function embed(url, opts) {
    if (!url) return null;
    opts = opts || {};
    var auto = opts.loop ? "&autoplay=1&muted=1&loop=1&background=1" : "";
    var m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    if (m) return { kind: "iframe", src: "https://player.vimeo.com/video/" + m[1] + "?dnt=1" + auto };
    m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{6,})/);
    if (m) {
      var yl = opts.loop ? "&autoplay=1&mute=1&loop=1&playlist=" + m[1] : "";
      return { kind: "iframe", src: "https://www.youtube-nocookie.com/embed/" + m[1] + "?rel=0" + yl };
    }
    if (/\.(mp4|webm)(\?|$)/i.test(url)) return { kind: "video", src: url };
    return null;
  }

  // A film frame: real player if a link exists, otherwise a labelled placeholder.
  function screen(url, label, opts) {
    var e = embed(url, opts);
    var glow = '<div class="glow" aria-hidden="true"></div>';
    if (!e) return '<div class="screen">' + glow + '<div class="ph">' + esc(label) + '</div></div>';
    if (e.kind === "video") {
      return '<div class="screen"><video src="' + esc(e.src) + '" controls ' + (opts && opts.loop ? "autoplay muted loop playsinline" : "playsinline") + '></video></div>';
    }
    return '<div class="screen"><iframe src="' + esc(e.src) + '" title="' + esc(label) + '" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>';
  }

  function slugOf(p) { return p.slug; }
  function projectUrl(p) { return "project.html?p=" + encodeURIComponent(slugOf(p)); }
  function rolesText(p) {
    var r = [];
    if (p.roles.indexOf("directed") > -1) r.push("Directed");
    if (p.roles.indexOf("edited") > -1) r.push("Edited");
    return r.join(" · ");
  }

  // Social icon links (Instagram, YouTube, LinkedIn). Any left blank in content.js are skipped.
  var ICONS = {
    instagram: '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"></rect><circle cx="12" cy="12" r="4.2"></circle><circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none"></circle></svg>',
    youtube: '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2.5" y="5" width="19" height="14" rx="4"></rect><path d="M10 9.2v5.6l4.8-2.8z" fill="currentColor" stroke="none"></path></svg>',
    linkedin: '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="3"></rect><path d="M8 10.5v6M8 7.6v.1M11.5 16.5v-6M11.5 13c0-1.6 1-2.6 2.4-2.6s2.1.9 2.1 2.6v3.5"></path></svg>'
  };
  function socials() {
    return [["instagram", "Instagram"], ["youtube", "YouTube"], ["linkedin", "LinkedIn"]]
      .filter(function (s) { return SITE[s[0]]; })
      .map(function (s) {
        return '<a class="social" href="' + esc(SITE[s[0]]) + '" target="_blank" rel="noopener" aria-label="' + s[1] + '">' + ICONS[s[0]] + "</a>";
      }).join("");
  }

  // Fill in the shared header/footer details.
  function fillSite() {
    document.querySelectorAll("[data-site=name]").forEach(function (el) { el.textContent = SITE.name; });
    document.querySelectorAll("[data-site=email]").forEach(function (el) {
      el.textContent = SITE.email;
      if (el.tagName === "A") el.setAttribute("href", "mailto:" + SITE.email);
    });
    document.querySelectorAll("[data-site=cv]").forEach(function (el) { el.setAttribute("href", SITE.cv); });
    document.querySelectorAll("[data-site=linkedin]").forEach(function (el) { el.setAttribute("href", SITE.linkedin); });
    document.querySelectorAll("[data-site=location]").forEach(function (el) { el.textContent = SITE.location; });
    document.querySelectorAll("[data-socials]").forEach(function (el) { el.innerHTML = socials(); });
    document.querySelectorAll("[data-site=availability]").forEach(function (el) { el.textContent = SITE.availability; });
  }

  /* ---------- HOME ---------- */
  function initHome() {
    var stage = document.getElementById("stage");
    var caption = document.getElementById("caption");
    var chapters = document.getElementById("chapters");
    var list = document.getElementById("programme-list");
    var count = document.getElementById("count");
    var filterBox = document.getElementById("filters");
    if (!stage) return;

    var current = 0;
    var filter = "all";

    function showStage(i) {
      current = i;
      var p = PROJECTS[i];
      stage.innerHTML =
        '<div class="stage-wrap-inner" style="position:absolute;inset:0">' +
        screen(p.video, p.title + " — film", { loop: !p.video }).replace('class="screen"', 'class="screen" style="position:absolute;inset:0;max-height:none;min-height:0;aspect-ratio:auto;border-radius:0"') +
        '</div>' +
        '<div class="stage-top"><span><span class="dot"></span> Now showing</span><span>' + String(i + 1).padStart(2, "0") + " / " + String(PROJECTS.length).padStart(2, "0") + "</span></div>" +
        '<div class="stage-caption"><div><span class="mono" style="color:var(--soft)">' + esc(p.client) + " — " + esc(p.kind) + '</span><h2 class="stage-title">' + esc(p.title) + '</h2></div>' +
        '<div style="display:flex;flex-direction:column;gap:14px;align-items:flex-start"><span class="mono" style="color:var(--text)">' + esc(p.roleLine) + '</span><a class="pill" href="' + projectUrl(p) + '" style="background:var(--lime)">Open the film →</a></div></div>';
      var btns = chapters.querySelectorAll("button");
      btns.forEach(function (b, k) { b.setAttribute("aria-pressed", k === i ? "true" : "false"); });
    }

    function renderChapters() {
      chapters.innerHTML = PROJECTS.map(function (p, i) {
        return '<button class="chapter" type="button" aria-pressed="false" data-i="' + i + '"><span>' + String(i + 1).padStart(2, "0") + '</span><span class="t">' + esc(p.title) + "</span></button>";
      }).join("");
      chapters.addEventListener("click", function (ev) {
        var b = ev.target.closest("button[data-i]");
        if (b) showStage(Number(b.getAttribute("data-i")));
      });
    }

    function renderList() {
      var shown = PROJECTS.filter(function (p) { return filter === "all" || p.roles.indexOf(filter) > -1; });
      count.textContent = shown.length + " films";
      list.innerHTML = shown.map(function (p, i) {
        return '<a class="row" href="' + projectUrl(p) + '"><span class="n">' + String(PROJECTS.indexOf(p) + 1).padStart(2, "0") + '</span><span class="row-title">' + esc(p.title) + '</span><span class="meta">' + esc(p.client) + " · " + esc(p.kind) + '</span><span class="roles">' + esc(rolesText(p)) + "</span></a>";
      }).join("");
    }

    filterBox.addEventListener("click", function (ev) {
      var b = ev.target.closest("button[data-f]");
      if (!b) return;
      filter = b.getAttribute("data-f");
      filterBox.querySelectorAll("button").forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
      renderList();
    });

    renderChapters();
    renderList();
    showStage(0);
  }

  /* ---------- PROJECT ---------- */
  function initProject() {
    var root = document.getElementById("project");
    if (!root) return;
    var slug = new URLSearchParams(window.location.search).get("p");
    var idx = -1;
    PROJECTS.forEach(function (p, i) { if (p.slug === slug) idx = i; });
    if (idx < 0) {
      root.innerHTML = '<div class="empty"><p class="serif" style="font-size:48px;margin:0 0 24px">Project not found.</p><a class="btn" href="index.html">Back to the work</a></div>';
      return;
    }
    var p = PROJECTS[idx];
    var next = PROJECTS[(idx + 1) % PROJECTS.length];
    var track = (new URLSearchParams(window.location.search).get("track") === "editor") ? "editor" : "director";

    document.title = p.title + " — " + SITE.name;

    var chapters = p.chapters || [];
    if (!chapters.length) {
      chapters = [
        { tc: "00:00", title: "The brief", media: ["Brief / deck page"], director: "[Director note for this chapter.]", editor: "[Editor note for this chapter.]" },
        { tc: "00:30", title: "The cut", media: ["Edit timeline", "Before / after grade"], director: "[Director note.]", editor: "[Editor note.]" },
        { tc: "01:00", title: "The result", media: ["Final frame", "Cutdown"], director: "[Director note.]", editor: "[Editor note.]" }
      ];
    }

    function render() {
      var isDir = track === "director";
      root.innerHTML =
        '<section class="title-card"><span class="mono" style="color:var(--violet)">' + esc(p.client) + " — " + esc(p.kind) + " · " + esc(p.year) + '</span>' +
        '<h1>' + esc(p.title) + '</h1><p>' + esc(p.logline) + '</p>' +
        '<span class="mono" style="color:var(--text)">' + esc(p.roleLine) + " · " + esc(p.runtime) + "</span></section>" +
        '<section class="wrap">' + screen(p.video, p.title + " — final film", {}) + "</section>" +
        '<section class="commentary"><div class="commentary-head"><div><h2>How it was made, <em>twice.</em></h2>' +
        '<p>Same film, same pictures, two commentary tracks. Switch to hear it from the director\'s chair or from the edit suite.</p></div>' +
        '<div class="track" role="group" aria-label="Commentary track">' +
        '<button type="button" data-t="director" aria-pressed="' + isDir + '">Director track</button>' +
        '<button type="button" data-t="editor" aria-pressed="' + !isDir + '">Editor track</button></div></div>' +
        chapters.map(function (c, i) {
          var note = isDir ? c.director : c.editor;
          return '<article class="chap"><div class="chap-side"><span class="tc">' + esc(c.tc) + '</span><h3>' + esc(c.title) + '</h3><span class="mono muted">Chapter ' + String(i + 1).padStart(2, "0") + '</span></div>' +
            '<div class="chap-main"><div class="frames">' + (c.media || []).map(function (m) { return '<div class="ph-box">[ ' + esc(m) + " ]</div>"; }).join("") + '</div>' +
            '<div class="note"><span class="speaker">' + (isDir ? "Director" : "Editor") + '</span><p>' + esc(note) + "</p></div></div></article>";
        }).join("") +
        "</section>" +
        '<section class="credits"><h2 class="mono" style="margin:0;color:var(--violet);font-weight:500">Credits</h2><dl>' +
        p.credits.map(function (c) { return "<div><dt>" + esc(c[0]) + "</dt><dd>" + esc(c[1]) + "</dd></div>"; }).join("") +
        "</dl></section>" +
        '<a class="next" href="' + projectUrl(next) + '"><span class="glow" aria-hidden="true"></span><span class="next-in"><span class="mono">Up next</span><span class="big">' + esc(next.title) + " →</span></span></a>";

      root.querySelectorAll("button[data-t]").forEach(function (b) {
        b.addEventListener("click", function () {
          track = b.getAttribute("data-t");
          var url = new URL(window.location.href);
          url.searchParams.set("track", track);
          history.replaceState(null, "", url);
          render();
        });
      });
    }
    render();
  }

  /* ---------- ABOUT ---------- */
  function initAbout() {
    var root = document.getElementById("about-roll");
    if (!root) return;
    root.innerHTML =
      '<h2>My role on a typical project</h2>' +
      SITE.roll.map(function (r) {
        var isMe = r[1].indexOf("With") !== 0;
        return '<div class="roll-row"><span class="j">' + esc(r[0]) + '</span><span class="n' + (isMe ? "" : " other") + '">' + esc(r[1]) + "</span></div>";
      }).join("");

    var exp = document.getElementById("about-exp");
    if (exp) {
      exp.innerHTML = "<h2>Experience</h2>" + SITE.experience.map(function (e) {
        return '<div class="job"><span class="o">' + esc(e.org) + '</span><span class="y">' + esc(e.role) + " · " + esc(e.years) + "</span></div>";
      }).join("");
    }
    var tools = document.getElementById("about-tools");
    if (tools) {
      tools.innerHTML = "<h2>Kit &amp; software</h2><div class=\"tools\">" + SITE.tools.map(function (t) { return "<span>" + esc(t) + "</span>"; }).join("") + "</div>";
    }
    var portrait = document.getElementById("portrait");
    if (portrait && SITE.portrait) {
      portrait.innerHTML = '<img src="' + esc(SITE.portrait) + '" alt="' + esc(SITE.name) + '">';
    } else if (portrait) {
      portrait.innerHTML = '<span class="ph" style="position:relative">[ Portrait — on set ]</span>';
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    fillSite();
    initHome();
    initProject();
    initAbout();
  });
})();
