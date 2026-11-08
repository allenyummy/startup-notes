(function () {
  "use strict";

  var REPO = "https://github.com/allenyummy/startup-youtube-notes/blob/main/";
  var app = document.getElementById("app");
  var data = null;
  var state = { q: "", lang: "all", tag: "" };
  var homeScroll = 0;

  /* ---------- theme ---------- */
  var root = document.documentElement;
  try {
    var saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") root.setAttribute("data-theme", saved);
  } catch (e) {}
  document.getElementById("theme-toggle").addEventListener("click", function () {
    var cur = root.getAttribute("data-theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    var next = cur === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
  });

  /* ---------- helpers ---------- */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function md(text) {
    var html = window.marked ? marked.parse(text || "", { gfm: true }) : "<pre>" + esc(text) + "</pre>";
    html = window.DOMPurify ? DOMPurify.sanitize(html) : html;
    return html.replace(/<table>/g, '<div class="table-wrap"><table>').replace(/<\/table>/g, "</table></div>");
  }
  function inline(text) {
    return md(text).replace(/^<p>|<\/p>\s*$/g, "");
  }
  function plain(text) {
    return String(text || "").replace(/\*\*|__|`|\[|\]\([^)]*\)/g, "");
  }
  function langLabel(l) { return l === "en" ? "EN" : "中文"; }
  function thumb(n) { return n.videoId ? "https://i.ytimg.com/vi/" + n.videoId + "/hqdefault.jpg" : ""; }
  function noteHref(n) { return "#/n/" + encodeURIComponent(n.id); }
  function parseMinutes(d) {
    var p = String(d || "").split(":").map(Number);
    if (p.some(isNaN)) return 0;
    return p.length === 3 ? p[0] * 60 + p[1] + p[2] / 60 : p.length === 2 ? p[0] + p[1] / 60 : 0;
  }
  function tagChips(tags) {
    return '<div class="tags">' + tags.map(function (t) { return '<span class="tag">#' + esc(t) + "</span>"; }).join("") + "</div>";
  }

  /* ---------- home ---------- */
  function filtered() {
    var q = state.q.trim().toLowerCase();
    return data.notes.filter(function (n) {
      if (state.lang !== "all" && n.lang !== state.lang) return false;
      if (state.tag && n.tags.indexOf(state.tag) === -1) return false;
      if (!q) return true;
      var hay = [n.title, n.channel, n.summary, n.tags.join(" "), n.body].join(" ").toLowerCase();
      return q.split(/\s+/).every(function (w) { return hay.indexOf(w) !== -1; });
    });
  }

  function cardHTML(n) {
    var img = thumb(n);
    return '<a class="card" href="' + noteHref(n) + '">' +
      '<div class="thumb">' + (img ? '<img loading="lazy" src="' + img + '" alt="">' : "") +
      '<span class="lang ' + n.lang + '">' + langLabel(n.lang) + "</span>" +
      (n.duration ? '<span class="dur">' + esc(n.duration) + "</span>" : "") + "</div>" +
      '<div class="card-body"><h3>' + esc(n.title) + "</h3>" +
      '<p class="channel">' + esc(n.channel) + "</p>" +
      '<p class="summary">' + esc(plain(n.summary)) + "</p>" +
      tagChips(n.tags.slice(0, 4)) + "</div></a>";
  }

  function renderGrid() {
    var list = filtered();
    var grid = document.getElementById("grid");
    grid.innerHTML = list.length ? list.map(cardHTML).join("") : "";
    document.getElementById("empty").hidden = list.length > 0;
    document.querySelectorAll("[data-lang]").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-lang") === state.lang));
    });
    document.querySelectorAll("[data-tag]").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-tag") === state.tag));
    });
  }

  function renderHome() {
    document.title = "創業影片筆記｜Startup YouTube Notes";
    var notes = data.notes;
    var en = notes.filter(function (n) { return n.lang === "en"; }).length;
    var hours = notes.reduce(function (s, n) { return s + parseMinutes(n.duration); }, 0) / 60;

    var counts = {};
    notes.forEach(function (n) { n.tags.forEach(function (t) { counts[t] = (counts[t] || 0) + 1; }); });
    var topTags = Object.keys(counts).sort(function (a, b) { return counts[b] - counts[a] || a.localeCompare(b); }).slice(0, 14);

    app.innerHTML =
      '<section class="hero">' +
        '<p class="eyebrow">Startup YouTube Notes</p>' +
        "<h1>把好的創業影片，<br><em>濃縮成可以帶走的筆記。</em></h1>" +
        '<p class="lead">收集 YouTube 上中英文的創業主題影片，整理成重點筆記：點子、驗證、團隊、募資與創業心態。</p>' +
        '<div class="stats">' +
          '<span class="stat"><b>' + notes.length + "</b> 支影片</span>" +
          '<span class="stat"><b>' + en + "</b> 英文 · <b>" + (notes.length - en) + "</b> 中文</span>" +
          '<span class="stat">約 <b>' + hours.toFixed(1) + "</b> 小時內容</span>" +
        "</div>" +
        '<div class="toolbar">' +
          '<label class="search"><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="2"/><path d="M20 20l-3.5-3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>' +
            '<input id="q" type="search" placeholder="搜尋標題、講者、關鍵字…（例如：募資、MVP、cofounder）" value="' + esc(state.q) + '" aria-label="搜尋筆記"></label>' +
          '<div class="chips" role="group" aria-label="語言">' +
            '<button class="chip" data-lang="all">全部</button>' +
            '<button class="chip" data-lang="en">English<span class="n">' + en + "</span></button>" +
            '<button class="chip" data-lang="zh">中文<span class="n">' + (notes.length - en) + "</span></button>" +
          "</div>" +
          '<div class="chips" role="group" aria-label="標籤"><span class="chips-label">主題</span>' +
            topTags.map(function (t) {
              return '<button class="chip" data-tag="' + esc(t) + '">#' + esc(t) + '<span class="n">' + counts[t] + "</span></button>";
            }).join("") +
          "</div>" +
        "</div>" +
      "</section>" +
      '<div class="grid" id="grid"></div>' +
      '<p class="empty" id="empty" hidden>找不到符合的筆記，換個關鍵字試試。</p>' +
      (data.themes ? '<section class="section themes"><h2>跨影片共同主題</h2><p class="sub">不同講者、不同語言，反覆出現的幾個核心觀念。</p>' + md(data.themes) + "</section>" : "") +
      (data.backlog ? '<section class="section backlog"><h2>待整理清單</h2><p class="sub">之後準備整理的候選影片。</p>' + md(data.backlog) + "</section>" : "");

    var q = document.getElementById("q");
    q.addEventListener("input", function () { state.q = q.value; renderGrid(); });
    app.querySelectorAll("[data-lang]").forEach(function (b) {
      b.addEventListener("click", function () { state.lang = b.getAttribute("data-lang"); renderGrid(); });
    });
    app.querySelectorAll("[data-tag]").forEach(function (b) {
      b.addEventListener("click", function () {
        var t = b.getAttribute("data-tag");
        state.tag = state.tag === t ? "" : t;
        renderGrid();
      });
    });
    renderGrid();
    window.scrollTo(0, homeScroll);
  }

  /* ---------- detail ---------- */
  function renderNote(id) {
    var idx = -1;
    data.notes.some(function (n, i) { if (n.id === id) { idx = i; return true; } return false; });
    if (idx === -1) { location.hash = "#/"; return; }
    var n = data.notes[idx];
    var prev = data.notes[idx - 1], next = data.notes[idx + 1];
    document.title = n.title + "｜創業影片筆記";

    app.innerHTML =
      '<article class="detail">' +
        '<a class="back" href="#/">← 回到所有筆記</a>' +
        '<div><span class="lang ' + n.lang + '">' + langLabel(n.lang) + "</span></div>" +
        "<h1>" + esc(n.title) + "</h1>" +
        '<div class="meta">' +
          (n.channel ? "<span>" + esc(n.channel) + "</span>" : "") +
          (n.duration ? '<span class="sep">•</span><span>' + esc(n.duration) + "</span>" : "") +
          (n.url ? '<span class="sep">•</span><a href="' + esc(n.url) + '" target="_blank" rel="noopener">在 YouTube 觀看 ↗</a>' : "") +
          '<span class="sep">•</span><a href="' + REPO + encodeURI(n.source) + '" target="_blank" rel="noopener">Markdown 原稿 ↗</a>' +
        "</div>" +
        tagChips(n.tags) +
        (n.videoId ? '<div class="player" id="player"><button type="button" aria-label="播放影片"><img src="' + thumb(n) + '" alt=""><span class="play"><svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><path d="M8 5v14l11-7z" fill="#fff"/></svg></span></button></div>' : "") +
        (n.summary ? '<div class="callout"><span class="label">一句話重點</span>' + inline(n.summary) + "</div>" : "") +
        '<div class="prose">' + md(n.body) + "</div>" +
        '<nav class="pager">' +
          (prev ? '<a class="prev" href="' + noteHref(prev) + '"><small>← 上一篇</small>' + esc(prev.title) + "</a>" : "<span></span>") +
          (next ? '<a class="next" href="' + noteHref(next) + '"><small>下一篇 →</small>' + esc(next.title) + "</a>" : "") +
        "</nav>" +
      "</article>";

    var player = document.getElementById("player");
    if (player) {
      player.querySelector("button").addEventListener("click", function () {
        player.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + n.videoId +
          '?autoplay=1&rel=0" title="' + esc(n.title) + '" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
      });
    }
    window.scrollTo(0, 0);
  }

  /* ---------- router ---------- */
  var onHome = false;
  function route() {
    var h = location.hash || "#/";
    var m = h.match(/^#\/n\/(.+)$/);
    if (m) {
      if (onHome) homeScroll = window.scrollY;
      onHome = false;
      renderNote(decodeURIComponent(m[1]));
    } else {
      onHome = true;
      renderHome();
    }
  }

  fetch("notes.json", { cache: "no-cache" })
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(function (d) { data = d; window.addEventListener("hashchange", route); route(); })
    .catch(function () { app.innerHTML = '<p class="loading">載入筆記失敗，請重新整理頁面。</p>'; });
})();
