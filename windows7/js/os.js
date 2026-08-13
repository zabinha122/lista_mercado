(function () {
  "use strict";

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => [...(root || document).querySelectorAll(sel)];

  const ICONS = {
    computer: `<svg viewBox="0 0 48 48"><rect x="6" y="8" width="36" height="24" rx="2" fill="#cfd8dc" stroke="#546e7a"/><rect x="9" y="11" width="30" height="18" fill="#1565c0"/><rect x="18" y="32" width="12" height="4" fill="#90a4ae"/><rect x="12" y="36" width="24" height="3" rx="1" fill="#78909c"/></svg>`,
    bin: `<svg viewBox="0 0 48 48"><path d="M16 14h16l-2 26H18z" fill="#90a4ae" stroke="#546e7a"/><rect x="14" y="10" width="20" height="5" rx="1" fill="#b0bec5"/><rect x="22" y="6" width="4" height="5" fill="#90a4ae"/></svg>`,
    folder: `<svg viewBox="0 0 48 48"><path d="M8 16h12l4 4h16v18H8z" fill="#ffc107" stroke="#f9a825"/><path d="M8 16V12h10l3 4" fill="#ffd54f"/></svg>`,
    ie: `<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="16" fill="#29b6f6"/><ellipse cx="24" cy="24" rx="20" ry="8" fill="none" stroke="#fff" stroke-width="3"/><text x="24" y="30" text-anchor="middle" font-size="18" fill="#fff" font-family="Georgia" font-style="italic">e</text></svg>`,
    note: `<svg viewBox="0 0 48 48"><rect x="10" y="6" width="28" height="36" rx="2" fill="#fffde7" stroke="#c0ca33"/><path d="M16 16h16M16 22h16M16 28h10" stroke="#9e9d24" stroke-width="2"/></svg>`,
    calc: `<svg viewBox="0 0 48 48"><rect x="12" y="6" width="24" height="36" rx="3" fill="#37474f"/><rect x="15" y="10" width="18" height="8" fill="#cfd8dc"/><g fill="#90caf9"><rect x="16" y="22" width="5" height="5"/><rect x="22" y="22" width="5" height="5"/><rect x="28" y="22" width="5" height="5"/></g></svg>`,
    paint: `<svg viewBox="0 0 48 48"><rect x="8" y="10" width="32" height="22" rx="2" fill="#fff" stroke="#90a4ae"/><circle cx="16" cy="20" r="4" fill="#ef5350"/><circle cx="24" cy="18" r="4" fill="#42a5f5"/><circle cx="20" cy="26" r="4" fill="#66bb6a"/><path d="M30 32 l6 8 h-8z" fill="#8d6e63"/></svg>`,
    cmd: `<svg viewBox="0 0 48 48"><rect x="6" y="10" width="36" height="28" rx="2" fill="#111"/><path d="M12 20 l6 4 -6 4" fill="none" stroke="#c0c0c0" stroke-width="2"/><path d="M22 28 h10" stroke="#c0c0c0" stroke-width="2"/></svg>`,
    control: `<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="8" fill="#90a4ae"/><g fill="#78909c"><rect x="22" y="6" width="4" height="10" rx="1"/><rect x="22" y="32" width="4" height="10" rx="1"/><rect x="6" y="22" width="10" height="4" rx="1"/><rect x="32" y="22" width="10" height="4" rx="1"/></g></svg>`,
    help: `<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="16" fill="#42a5f5"/><text x="24" y="31" text-anchor="middle" font-size="22" fill="#fff" font-family="Segoe UI">?</text></svg>`,
    sticky: `<svg viewBox="0 0 48 48"><rect x="10" y="10" width="28" height="28" fill="#fff59d" stroke="#fbc02d"/><path d="M30 10 v8 h8" fill="#ffe082"/></svg>`,
    market: `<svg viewBox="0 0 48 48"><rect x="8" y="14" width="32" height="24" rx="3" fill="#2d6a4f"/><text x="24" y="31" text-anchor="middle" font-size="11" fill="#fff">🛒</text></svg>`,
  };

  const DESKTOP_ICONS = [
    { id: "computer", label: "Computador", app: "computer" },
    { id: "bin", label: "Lixeira", app: "bin" },
    { id: "folder", label: "Documentos", app: "explorer", path: "Documentos" },
    { id: "ie", label: "Internet Explorer", app: "ie" },
    { id: "market", label: "ListaMercado", app: "market" },
    { id: "note", label: "Bloco de notas", app: "notepad" },
  ];

  const START_APPS = [
    { icon: "ie", label: "Internet Explorer", app: "ie" },
    { icon: "note", label: "Bloco de notas", app: "notepad" },
    { icon: "paint", label: "Paint", app: "paint" },
    { icon: "calc", label: "Calculadora", app: "calc" },
    { icon: "cmd", label: "Prompt de Comando", app: "cmd" },
    { icon: "sticky", label: "Notas Autoadesivas", app: "sticky" },
    { icon: "market", label: "ListaMercado", app: "market" },
    { icon: "control", label: "Painel de Controle", app: "control" },
    { icon: "help", label: "Central de Ajuda", app: "help" },
  ];

  const PINS = [
    { icon: "ie", app: "ie", title: "Internet Explorer" },
    { icon: "folder", app: "explorer", title: "Windows Explorer" },
    { icon: "market", app: "market", title: "ListaMercado" },
  ];

  let zTop = 20;
  let winSeq = 1;
  const windows = new Map();

  function playClick() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sine";
      o.frequency.value = 880;
      g.gain.value = 0.03;
      o.connect(g);
      g.connect(ctx.destination);
      o.start();
      o.stop(ctx.currentTime + 0.04);
    } catch (_) { /* ignore */ }
  }

  function iconSvg(name) {
    return ICONS[name] || ICONS.folder;
  }

  /* ---------- Boot / Login ---------- */
  function startSequence() {
    setTimeout(() => {
      $("#boot").classList.add("hidden");
      $("#login").classList.remove("hidden");
    }, 3200);
  }

  $("#btnLogin").addEventListener("click", () => {
    playClick();
    $("#login").classList.add("hidden");
    $("#desktop").classList.remove("hidden");
    openApp("welcome");
  });

  $("#btnLoginPower").addEventListener("click", () => {
    location.reload();
  });

  /* ---------- Clock ---------- */
  function pad(n) { return String(n).padStart(2, "0"); }

  function tickClock() {
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes();
    const s = now.getSeconds();
    $("#trayClock").innerHTML = `${pad(h)}:${pad(m)}<br>${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()}`;
    $("#trayClock").title = now.toLocaleString("pt-BR");
    const gadgetDate = $("#gadgetDate");
    if (gadgetDate) gadgetDate.textContent = now.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" });
    const degH = ((h % 12) + m / 60) * 30;
    const degM = (m + s / 60) * 6;
    const degS = s * 6;
    const hh = $("#handH");
    const mm = $("#handM");
    const ss = $("#handS");
    if (hh) hh.style.transform = `rotate(${degH}deg)`;
    if (mm) mm.style.transform = `rotate(${degM}deg)`;
    if (ss) ss.style.transform = `rotate(${degS}deg)`;
  }
  setInterval(tickClock, 1000);
  tickClock();

  /* ---------- Desktop icons ---------- */
  function renderDesktopIcons() {
    const nav = $("#desktopIcons");
    nav.innerHTML = DESKTOP_ICONS.map((ic) => `
      <button type="button" class="desk-icon" data-app="${ic.app}" data-path="${ic.path || ""}">
        <span class="desk-icon__img">${iconSvg(ic.icon || ic.id)}</span>
        ${ic.label}
      </button>
    `).join("");
    nav.addEventListener("dblclick", (e) => {
      const btn = e.target.closest(".desk-icon");
      if (!btn) return;
      openApp(btn.dataset.app, { path: btn.dataset.path });
    });
    nav.addEventListener("click", (e) => {
      const btn = e.target.closest(".desk-icon");
      $$(".desk-icon").forEach((el) => el.classList.toggle("is-selected", el === btn));
    });
  }

  function renderPins() {
    $("#taskPins").innerHTML = PINS.map((p) => `
      <button type="button" class="task-btn" data-app="${p.app}" title="${p.title}">
        <span class="tb-ico">${iconSvg(p.icon)}</span>
      </button>
    `).join("");
    $("#taskPins").addEventListener("click", (e) => {
      const btn = e.target.closest(".task-btn");
      if (btn) openApp(btn.dataset.app);
    });
  }

  function renderStartApps() {
    $("#startApps").innerHTML = START_APPS.map((a) => `
      <li><button type="button" data-app="${a.app}"><span class="tb-ico" style="width:22px;height:22px;display:inline-grid">${iconSvg(a.icon)}</span>${a.label}</button></li>
    `).join("");
  }

  /* ---------- Start menu ---------- */
  const startMenu = $("#startMenu");
  const btnStart = $("#btnStart");

  function toggleStart(force) {
    const open = force === undefined ? startMenu.classList.contains("hidden") : force;
    startMenu.classList.toggle("hidden", !open);
    btnStart.classList.toggle("is-open", open);
    if (open) $("#startSearch").focus();
  }

  btnStart.addEventListener("click", (e) => {
    e.stopPropagation();
    playClick();
    toggleStart();
  });

  document.addEventListener("click", (e) => {
    if (!startMenu.contains(e.target) && e.target !== btnStart && !btnStart.contains(e.target)) {
      toggleStart(false);
    }
    const ctx = $("#ctx");
    if (!ctx.contains(e.target)) ctx.classList.add("hidden");
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Meta" || (e.key === "Escape" && !startMenu.classList.contains("hidden"))) {
      if (e.key === "Meta") {
        e.preventDefault();
        toggleStart();
      } else toggleStart(false);
    }
  });

  startMenu.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-app]");
    if (!btn) return;
    toggleStart(false);
    openApp(btn.dataset.app, { path: btn.dataset.path });
  });

  $("#btnShutdown").addEventListener("click", () => {
    $("#desktop").classList.add("hidden");
    $("#login").classList.remove("hidden");
    windows.forEach((w) => w.el.remove());
    windows.clear();
    renderTaskButtons();
  });

  $("#startSearch").addEventListener("input", (e) => {
    const q = e.target.value.toLowerCase();
    $$("#startApps button").forEach((b) => {
      b.parentElement.style.display = b.textContent.toLowerCase().includes(q) ? "" : "none";
    });
  });

  /* ---------- Window manager ---------- */
  function focusWin(id) {
    windows.forEach((w, wid) => {
      w.el.classList.toggle("is-focused", wid === id);
      if (wid === id) {
        w.el.classList.remove("is-min");
        w.el.style.zIndex = ++zTop;
        w.minimized = false;
      }
    });
    renderTaskButtons();
  }

  function closeWin(id) {
    const w = windows.get(id);
    if (!w) return;
    w.el.remove();
    windows.delete(id);
    renderTaskButtons();
  }

  function minimizeWin(id) {
    const w = windows.get(id);
    if (!w) return;
    w.minimized = true;
    w.el.classList.add("is-min");
    w.el.classList.remove("is-focused");
    renderTaskButtons();
  }

  function maximizeWin(id) {
    const w = windows.get(id);
    if (!w) return;
    w.maximized = !w.maximized;
    w.el.classList.toggle("is-max", w.maximized);
  }

  function renderTaskButtons() {
    const wrap = $("#taskWindows");
    wrap.innerHTML = "";
    windows.forEach((w, id) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "task-btn is-open" + (w.el.classList.contains("is-focused") && !w.minimized ? " is-active" : "");
      btn.title = w.title;
      btn.innerHTML = `<span class="tb-ico">${iconSvg(w.icon)}</span>`;
      btn.addEventListener("click", () => {
        if (w.minimized) {
          w.minimized = false;
          w.el.classList.remove("is-min");
          focusWin(id);
        } else if (w.el.classList.contains("is-focused")) {
          minimizeWin(id);
        } else {
          focusWin(id);
        }
      });
      wrap.appendChild(btn);
    });
  }

  function makeDraggable(el, handle, id) {
    let sx, sy, ox, oy, dragging = false;
    handle.addEventListener("mousedown", (e) => {
      if (e.target.closest(".window__ctrls")) return;
      const w = windows.get(id);
      if (w && w.maximized) return;
      dragging = true;
      sx = e.clientX; sy = e.clientY;
      ox = el.offsetLeft; oy = el.offsetTop;
      focusWin(id);
      e.preventDefault();
    });
    document.addEventListener("mousemove", (e) => {
      if (!dragging) return;
      el.style.left = ox + e.clientX - sx + "px";
      el.style.top = Math.max(0, oy + e.clientY - sy) + "px";
    });
    document.addEventListener("mouseup", () => { dragging = false; });
    handle.addEventListener("dblclick", () => maximizeWin(id));
  }

  function createWindow({ title, icon, body, width, height, x, y, status }) {
    const id = "w" + (winSeq++);
    const el = document.createElement("article");
    el.className = "window is-focused";
    el.style.width = (width || 640) + "px";
    el.style.height = (height || 420) + "px";
    el.style.left = (x ?? 80 + (windows.size % 6) * 28) + "px";
    el.style.top = (y ?? 48 + (windows.size % 6) * 24) + "px";
    el.style.zIndex = ++zTop;
    el.innerHTML = `
      <header class="window__chrome">
        <span class="window__icon">${iconSvg(icon)}</span>
        <span class="window__title">${title}</span>
        <div class="window__ctrls">
          <button type="button" class="win-min" title="Minimizar">–</button>
          <button type="button" class="win-max" title="Maximizar">☐</button>
          <button type="button" class="win-close" title="Fechar">✕</button>
        </div>
      </header>
      <div class="window__body">${body}</div>
      ${status ? `<footer class="window__status">${status}</footer>` : ""}
    `;
    $("#windowLayer").appendChild(el);
    windows.forEach((w) => w.el.classList.remove("is-focused"));
    windows.set(id, { el, title, icon, minimized: false, maximized: false });
    makeDraggable(el, el.querySelector(".window__chrome"), id);
    el.addEventListener("mousedown", () => focusWin(id));
    el.querySelector(".win-close").addEventListener("click", () => closeWin(id));
    el.querySelector(".win-min").addEventListener("click", () => minimizeWin(id));
    el.querySelector(".win-max").addEventListener("click", () => maximizeWin(id));
    el.querySelector(".window__body").addEventListener("click", (e) => {
      const nav = e.target.closest("[data-app]");
      if (nav && nav.dataset.app) openApp(nav.dataset.app, { path: nav.dataset.path });
    });
    renderTaskButtons();
    return { id, el };
  }

  /* ---------- Apps ---------- */
  function explorerBody(path) {
    const items = {
      Computador: [
        ["C:", "Disco Local (C:)", "folder"],
        ["D:", "DVD RW Drive", "folder"],
        ["Rede", "Rede", "computer"],
      ],
      Documentos: [
        ["Receitas.docx", "Receitas", "note"],
        ["Lista.txt", "Lista de compras", "note"],
        ["Fotos", "Férias", "folder"],
      ],
      Imagens: [["harmony.png", "Papel de parede", "folder"], ["Família", "Família", "folder"]],
      Músicas: [["Playlist", "Favoritas", "folder"]],
      Lixeira: [],
      Usuário: [
        ["Documentos", "Documentos", "folder"],
        ["Imagens", "Imagens", "folder"],
        ["Músicas", "Músicas", "folder"],
        ["Área de trabalho", "Área de trabalho", "folder"],
      ],
    };
    const list = items[path] || items.Documentos;
    const files = list.map(([id, label, ic]) => `
      <button type="button" class="file-tile" data-open="${id}">
        <span class="desk-icon__img">${iconSvg(ic)}</span>
        <span>${label}</span>
      </button>
    `).join("") || `<p style="grid-column:1/-1;padding:24px;color:#666">Esta pasta está vazia.</p>`;
    return `
      <div class="explorer">
        <div class="explorer__toolbar">
          <button type="button">◀</button><button type="button">▶</button>
          <input class="explorer__addr" value="Bibliotecas \\ ${path}" readonly>
          <input placeholder="Pesquisar ${path}" style="width:140px;height:24px;border:1px solid #9ab;padding:0 6px">
        </div>
        <div class="explorer__main">
          <aside class="explorer__tree">
            <button type="button" data-app="explorer" data-path="Usuário">👤 Usuário</button>
            <button type="button" data-app="explorer" data-path="Documentos">📄 Documentos</button>
            <button type="button" data-app="explorer" data-path="Imagens">🖼 Imagens</button>
            <button type="button" data-app="explorer" data-path="Músicas">🎵 Músicas</button>
            <button type="button" data-app="computer">💻 Computador</button>
            <button type="button" data-app="bin">🗑 Lixeira</button>
          </aside>
          <div class="explorer__grid">${files}</div>
        </div>
      </div>
    `;
  }

  function openApp(app, opts = {}) {
    playClick();
    if (app === "explorer" || app === "computer" || app === "bin" || app === "devices") {
      const path = app === "computer" ? "Computador" : app === "bin" ? "Lixeira" : app === "devices" ? "Dispositivos" : (opts.path || "Documentos");
      const title = app === "bin" ? "Lixeira" : path;
      createWindow({
        title,
        icon: app === "bin" ? "bin" : app === "computer" ? "computer" : "folder",
        width: 720, height: 460,
        body: explorerBody(path),
        status: `${path} · Windows Explorer`,
      });
      return;
    }
    if (app === "notepad") {
      createWindow({
        title: "Sem título - Bloco de notas",
        icon: "note", width: 520, height: 360,
        body: `<textarea class="notepad" placeholder="Digite aqui..."></textarea>`,
      });
      return;
    }
    if (app === "calc") {
      const w = createWindow({
        title: "Calculadora", icon: "calc", width: 300, height: 360,
        body: `<div class="calc"><input id="calcDisplay" value="0" readonly><div class="calc-grid">
          ${["7","8","9","/","4","5","6","*","1","2","3","-","0",".","=","+","C"].map((k) => `<button data-k="${k}">${k}</button>`).join("")}
        </div></div>`,
      });
      let expr = "";
      w.el.addEventListener("click", (e) => {
        const k = e.target.dataset.k;
        if (!k) return;
        const out = w.el.querySelector("#calcDisplay");
        if (k === "C") { expr = ""; out.value = "0"; return; }
        if (k === "=") {
          try { expr = String(Function('"use strict"; return (' + expr + ")")()); } catch { expr = "Erro"; }
          out.value = expr; return;
        }
        expr += k;
        out.value = expr;
      });
      return;
    }
    if (app === "paint") {
      const w = createWindow({
        title: "Sem título - Paint", icon: "paint", width: 680, height: 460,
        body: `<div class="paint-wrap"><div class="paint-tools">
          <label>Cor <input type="color" id="paintColor" value="#1565c0"></label>
          <label>Tamanho <input type="range" id="paintSize" min="1" max="24" value="4"></label>
          <button type="button" id="paintClear">Limpar</button>
        </div><canvas id="paintCanvas"></canvas></div>`,
      });
      const canvas = w.el.querySelector("#paintCanvas");
      const ctx = canvas.getContext("2d");
      function fit() {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight || 320;
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      setTimeout(fit, 50);
      let drawing = false;
      canvas.addEventListener("mousedown", (e) => { drawing = true; ctx.beginPath(); ctx.moveTo(e.offsetX, e.offsetY); });
      canvas.addEventListener("mousemove", (e) => {
        if (!drawing) return;
        ctx.strokeStyle = w.el.querySelector("#paintColor").value;
        ctx.lineWidth = w.el.querySelector("#paintSize").value;
        ctx.lineCap = "round";
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
      });
      canvas.addEventListener("mouseup", () => { drawing = false; });
      w.el.querySelector("#paintClear").addEventListener("click", fit);
      return;
    }
    if (app === "ie") {
      createWindow({
        title: "Windows Internet Explorer",
        icon: "ie", width: 860, height: 540,
        body: `<div class="ie-bar">
          <button type="button">◀</button><button type="button">▶</button>
          <input value="http://www.bing.com/" readonly>
          <button type="button">Ir</button>
        </div>
        <iframe class="ie-frame" src="ie-home.html" title="Internet Explorer"></iframe>`,
      });
      return;
    }
    if (app === "market") {
      createWindow({
        title: "ListaMercado - Internet Explorer",
        icon: "market", width: 900, height: 560,
        body: `<div class="ie-bar"><input value="https://zabinha122.github.io/lista_mercado/" readonly></div>
          <iframe class="ie-frame" src="../index.html" title="ListaMercado"></iframe>`,
      });
      return;
    }
    if (app === "cmd") {
      const w = createWindow({
        title: "Administrador: Prompt de Comando",
        icon: "cmd", width: 640, height: 360,
        body: `<div class="cmd" id="cmdOut">Microsoft Windows [versão 6.1.7601]<br>Copyright (c) 2009 Microsoft Corporation. Todos os direitos reservados.<br><br>C:\\Users\\Usuario&gt; <input id="cmdIn" spellcheck="false"></div>`,
      });
      const input = w.el.querySelector("#cmdIn");
      const out = w.el.querySelector("#cmdOut");
      setTimeout(() => input.focus(), 100);
      input.addEventListener("keydown", (e) => {
        if (e.key !== "Enter") return;
        const cmd = input.value.trim();
        let res = "";
        if (cmd === "help") res = "Comandos: help, dir, ver, cls, date, echo";
        else if (cmd === "dir") res = "Documentos  Imagens  Músicas  ListaMercado";
        else if (cmd === "ver") res = "Microsoft Windows [versão 6.1.7601]";
        else if (cmd === "date") res = new Date().toString();
        else if (cmd === "cls") { out.innerHTML = `C:\\Users\\Usuario&gt; <input id="cmdIn" spellcheck="false">`; bindCmd(w); return; }
        else if (cmd.startsWith("echo ")) res = cmd.slice(5);
        else if (cmd) res = `"${cmd}" não é reconhecido como comando interno ou externo.`;
        out.innerHTML = out.innerHTML.replace(/<input.*>/, "") + cmd + "<br>" + res + "<br><br>C:\\Users\\Usuario&gt; <input id=\"cmdIn\" spellcheck=\"false\">";
        bindCmd(w);
      });
      function bindCmd(win) {
        const i = win.el.querySelector("#cmdIn");
        i.focus();
        i.addEventListener("keydown", input.eventListener || (() => {}));
        i.onkeydown = input.onkeydown;
      }
      return;
    }
    if (app === "sticky") {
      createWindow({
        title: "Nota autoadesiva", icon: "sticky", width: 240, height: 200,
        body: `<textarea placeholder="Digite uma nota...">Comprar feijão e cuscuz 🌽</textarea>`,
      });
      return;
    }
    if (app === "control") {
      createWindow({
        title: "Painel de Controle", icon: "control", width: 680, height: 420,
        body: `<div class="control"><h3>Ajustar configurações do computador</h3>
          <div class="control-grid">
            <div class="control-tile">🖥<br>Personalização<br><small>Aero Glass · Harmony</small></div>
            <div class="control-tile">🔊<br>Som</div>
            <div class="control-tile">🌐<br>Rede e Internet</div>
            <div class="control-tile">🕐<br>Data e Hora</div>
            <div class="control-tile">🖱<br>Mouse</div>
            <div class="control-tile">🔐<br>Contas de usuário</div>
          </div>
          <p style="margin-top:16px;color:#555">Tema: Windows 7 Aero · Frutiger Aero</p>
        </div>`,
      });
      return;
    }
    if (app === "help") {
      createWindow({
        title: "Ajuda e Suporte do Windows", icon: "help", width: 560, height: 380,
        body: `<div class="help"><h3>Como posso ajudá-lo?</h3>
          <p>Este é um desktop Windows 7 Aero (Frutiger Aero) no navegador.</p>
          <ul>
            <li>Clique em <strong>Iniciar</strong> (bandeira) para abrir programas</li>
            <li>Dê dois cliques nos ícones da área de trabalho</li>
            <li>Arraste as janelas pela barra de título</li>
            <li>Use minimizar, maximizar e fechar</li>
          </ul>
        </div>`,
      });
      return;
    }
    if (app === "welcome") {
      createWindow({
        title: "Bem-vindo ao Windows 7", icon: "help", width: 520, height: 360, x: 220, y: 80,
        body: `<div class="welcome">
          <div class="hero"></div>
          <h2>Bem-vindo</h2>
          <p>O Windows 7 está pronto. Explore o tema Aero Glass — transparência, brilho e o papel de parede Harmony.</p>
          <p><small>Simulação Frutiger Aero · ListaMercado</small></p>
        </div>`,
      });
    }
  }

  $("#btnShowDesktop").addEventListener("click", () => {
    const anyVisible = [...windows.values()].some((w) => !w.minimized);
    windows.forEach((w, id) => {
      if (anyVisible) minimizeWin(id);
      else {
        w.minimized = false;
        w.el.classList.remove("is-min");
      }
    });
    renderTaskButtons();
  });

  /* Context menu */
  $("#desktop").addEventListener("contextmenu", (e) => {
    if (e.target.closest(".window, .start-menu, .taskbar")) return;
    e.preventDefault();
    const ctx = $("#ctx");
    ctx.innerHTML = `<li data-act="refresh">Atualizar</li><li data-act="gadgets">Gadgets</li><li class="sep"></li><li data-act="personalize">Personalizar</li><li data-act="res">Resolução de tela</li>`;
    ctx.style.left = e.clientX + "px";
    ctx.style.top = e.clientY + "px";
    ctx.classList.remove("hidden");
  });
  $("#ctx").addEventListener("click", (e) => {
    const act = e.target.dataset.act;
    $("#ctx").classList.add("hidden");
    if (act === "personalize" || act === "res") openApp("control");
  });

  renderDesktopIcons();
  renderPins();
  renderStartApps();
  startSequence();
})();
