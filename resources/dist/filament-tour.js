// node_modules/driver.js/dist/driver.js.mjs
var z = {};
var J;
function F(e = {}) {
  z = {
    animate: true,
    allowClose: true,
    overlayClickBehavior: "close",
    overlayOpacity: 0.7,
    smoothScroll: false,
    disableActiveInteraction: false,
    showProgress: false,
    stagePadding: 10,
    stageRadius: 5,
    popoverOffset: 10,
    showButtons: ["next", "previous", "close"],
    disableButtons: [],
    overlayColor: "#000",
    ...e
  };
}
function s(e) {
  return e ? z[e] : z;
}
function le(e) {
  J = e;
}
function _() {
  return J;
}
var I = {};
function N(e, o) {
  I[e] = o;
}
function L(e) {
  var o;
  (o = I[e]) == null || o.call(I);
}
function de() {
  I = {};
}
function O(e, o, t, i) {
  return (e /= i / 2) < 1 ? t / 2 * e * e + o : -t / 2 * (--e * (e - 2) - 1) + o;
}
function U(e) {
  const o = 'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])';
  return e.flatMap((t) => {
    const i = t.matches(o), d = Array.from(t.querySelectorAll(o));
    return [...i ? [t] : [], ...d];
  }).filter((t) => getComputedStyle(t).pointerEvents !== "none" && ve(t));
}
function ee(e) {
  if (!e || ue(e))
    return;
  const o = s("smoothScroll"), t = e.offsetHeight > window.innerHeight;
  e.scrollIntoView({
    // Removing the smooth scrolling for elements which exist inside the scrollable parent
    // This was causing the highlight to not properly render
    behavior: !o || pe(e) ? "auto" : "smooth",
    inline: "center",
    block: t ? "start" : "center"
  });
}
function pe(e) {
  if (!e || !e.parentElement)
    return;
  const o = e.parentElement;
  return o.scrollHeight > o.clientHeight;
}
function ue(e) {
  const o = e.getBoundingClientRect();
  return o.top >= 0 && o.left >= 0 && o.bottom <= (window.innerHeight || document.documentElement.clientHeight) && o.right <= (window.innerWidth || document.documentElement.clientWidth);
}
function ve(e) {
  return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
}
var D = {};
function k(e, o) {
  D[e] = o;
}
function l(e) {
  return e ? D[e] : D;
}
function X() {
  D = {};
}
function fe(e, o, t, i) {
  let d = l("__activeStagePosition");
  const n = d || t.getBoundingClientRect(), f = i.getBoundingClientRect(), w = O(e, n.x, f.x - n.x, o), r = O(e, n.y, f.y - n.y, o), v = O(e, n.width, f.width - n.width, o), g = O(e, n.height, f.height - n.height, o);
  d = {
    x: w,
    y: r,
    width: v,
    height: g
  }, oe(d), k("__activeStagePosition", d);
}
function te(e) {
  if (!e)
    return;
  const o = e.getBoundingClientRect(), t = {
    x: o.x,
    y: o.y,
    width: o.width,
    height: o.height
  };
  k("__activeStagePosition", t), oe(t);
}
function he() {
  const e = l("__activeStagePosition"), o = l("__overlaySvg");
  if (!e)
    return;
  if (!o) {
    console.warn("No stage svg found.");
    return;
  }
  const t = window.innerWidth, i = window.innerHeight;
  o.setAttribute("viewBox", `0 0 ${t} ${i}`);
}
function ge(e) {
  const o = we(e);
  document.body.appendChild(o), re(o, (t) => {
    t.target.tagName === "path" && L("overlayClick");
  }), k("__overlaySvg", o);
}
function oe(e) {
  const o = l("__overlaySvg");
  if (!o) {
    ge(e);
    return;
  }
  const t = o.firstElementChild;
  if ((t == null ? void 0 : t.tagName) !== "path")
    throw new Error("no path element found in stage svg");
  t.setAttribute("d", ie(e));
}
function we(e) {
  const o = window.innerWidth, t = window.innerHeight, i = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  i.classList.add("driver-overlay", "driver-overlay-animated"), i.setAttribute("viewBox", `0 0 ${o} ${t}`), i.setAttribute("xmlSpace", "preserve"), i.setAttribute("xmlnsXlink", "http://www.w3.org/1999/xlink"), i.setAttribute("version", "1.1"), i.setAttribute("preserveAspectRatio", "xMinYMin slice"), i.style.fillRule = "evenodd", i.style.clipRule = "evenodd", i.style.strokeLinejoin = "round", i.style.strokeMiterlimit = "2", i.style.zIndex = "10000", i.style.position = "fixed", i.style.top = "0", i.style.left = "0", i.style.width = "100%", i.style.height = "100%";
  const d = document.createElementNS("http://www.w3.org/2000/svg", "path");
  return d.setAttribute("d", ie(e)), d.style.fill = s("overlayColor") || "rgb(0,0,0)", d.style.opacity = `${s("overlayOpacity")}`, d.style.pointerEvents = "auto", d.style.cursor = "auto", i.appendChild(d), i;
}
function ie(e) {
  const o = window.innerWidth, t = window.innerHeight, i = s("stagePadding") || 0, d = s("stageRadius") || 0, n = e.width + i * 2, f = e.height + i * 2, w = Math.min(d, n / 2, f / 2), r = Math.floor(Math.max(w, 0)), v = e.x - i + r, g = e.y - i, y = n - r * 2, a = f - r * 2;
  return `M${o},0L0,0L0,${t}L${o},${t}L${o},0Z
    M${v},${g} h${y} a${r},${r} 0 0 1 ${r},${r} v${a} a${r},${r} 0 0 1 -${r},${r} h-${y} a${r},${r} 0 0 1 -${r},-${r} v-${a} a${r},${r} 0 0 1 ${r},-${r} z`;
}
function me() {
  const e = l("__overlaySvg");
  e && e.remove();
}
function ye() {
  const e = document.getElementById("driver-dummy-element");
  if (e)
    return e;
  let o = document.createElement("div");
  return o.id = "driver-dummy-element", o.style.width = "0", o.style.height = "0", o.style.pointerEvents = "none", o.style.opacity = "0", o.style.position = "fixed", o.style.top = "50%", o.style.left = "50%", document.body.appendChild(o), o;
}
function j(e) {
  const { element: o } = e;
  let t = typeof o == "function" ? o() : typeof o == "string" ? document.querySelector(o) : o;
  t || (t = ye()), be(t, e);
}
function xe() {
  const e = l("__activeElement"), o = l("__activeStep");
  e && (te(e), he(), ae(e, o));
}
function be(e, o) {
  var C;
  const i = Date.now(), d = l("__activeStep"), n = l("__activeElement") || e, f = !n || n === e, w = e.id === "driver-dummy-element", r = n.id === "driver-dummy-element", v = s("animate"), g = o.onHighlightStarted || s("onHighlightStarted"), y = (o == null ? void 0 : o.onHighlighted) || s("onHighlighted"), a = (d == null ? void 0 : d.onDeselected) || s("onDeselected"), p = s(), c = l();
  !f && a && a(r ? void 0 : n, d, {
    config: p,
    state: c,
    driver: _()
  }), g && g(w ? void 0 : e, o, {
    config: p,
    state: c,
    driver: _()
  });
  const u = !f && v;
  let h = false;
  _e(), k("previousStep", d), k("previousElement", n), k("activeStep", o), k("activeElement", e);
  const m = () => {
    if (l("__transitionCallback") !== m)
      return;
    const b = Date.now() - i, E = 400 - b <= 400 / 2;
    o.popover && E && !h && u && (Q(e, o), h = true), s("animate") && b < 400 ? fe(b, 400, n, e) : (te(e), y && y(w ? void 0 : e, o, {
      config: s(),
      state: l(),
      driver: _()
    }), k("__transitionCallback", void 0), k("__previousStep", d), k("__previousElement", n), k("__activeStep", o), k("__activeElement", e)), window.requestAnimationFrame(m);
  };
  k("__transitionCallback", m), window.requestAnimationFrame(m), ee(e), !u && o.popover && Q(e, o), n.classList.remove("driver-active-element", "driver-no-interaction"), n.removeAttribute("aria-haspopup"), n.removeAttribute("aria-expanded"), n.removeAttribute("aria-controls"), ((C = o.disableActiveInteraction) != null ? C : s("disableActiveInteraction")) && e.classList.add("driver-no-interaction"), e.classList.add("driver-active-element"), e.setAttribute("aria-haspopup", "dialog"), e.setAttribute("aria-expanded", "true"), e.setAttribute("aria-controls", "driver-popover-content");
}
function Ce() {
  var e;
  (e = document.getElementById("driver-dummy-element")) == null || e.remove(), document.querySelectorAll(".driver-active-element").forEach((o) => {
    o.classList.remove("driver-active-element", "driver-no-interaction"), o.removeAttribute("aria-haspopup"), o.removeAttribute("aria-expanded"), o.removeAttribute("aria-controls");
  });
}
function M() {
  const e = l("__resizeTimeout");
  e && window.cancelAnimationFrame(e), k("__resizeTimeout", window.requestAnimationFrame(xe));
}
function Pe(e) {
  var r;
  if (!l("isInitialized") || !(e.key === "Tab" || e.keyCode === 9))
    return;
  const i = l("__activeElement"), d = (r = l("popover")) == null ? void 0 : r.wrapper, n = U([
    ...d ? [d] : [],
    ...i ? [i] : []
  ]), f = n[0], w = n[n.length - 1];
  if (e.preventDefault(), e.shiftKey) {
    const v = n[n.indexOf(document.activeElement) - 1] || w;
    v == null || v.focus();
  } else {
    const v = n[n.indexOf(document.activeElement) + 1] || f;
    v == null || v.focus();
  }
}
function ne(e) {
  var t;
  ((t = s("allowKeyboardControl")) == null || t) && (e.key === "Escape" ? L("escapePress") : e.key === "ArrowRight" ? L("arrowRightPress") : e.key === "ArrowLeft" && L("arrowLeftPress"));
}
function re(e, o, t) {
  const i = (n, f) => {
    const w = n.target;
    e.contains(w) && ((!t || t(w)) && (n.preventDefault(), n.stopPropagation(), n.stopImmediatePropagation()), f == null || f(n));
  };
  document.addEventListener("pointerdown", i, true), document.addEventListener("mousedown", i, true), document.addEventListener("pointerup", i, true), document.addEventListener("mouseup", i, true), document.addEventListener(
    "click",
    (n) => {
      i(n, o);
    },
    true
  );
}
function ke() {
  window.addEventListener("keyup", ne, false), window.addEventListener("keydown", Pe, false), window.addEventListener("resize", M), window.addEventListener("scroll", M);
}
function Se() {
  window.removeEventListener("keyup", ne), window.removeEventListener("resize", M), window.removeEventListener("scroll", M);
}
function _e() {
  const e = l("popover");
  e && (e.wrapper.style.display = "none");
}
function Q(e, o) {
  var b, P;
  let t = l("popover");
  t && document.body.removeChild(t.wrapper), t = Le(), document.body.appendChild(t.wrapper);
  const {
    title: i,
    description: d,
    showButtons: n,
    disableButtons: f,
    showProgress: w,
    nextBtnText: r = s("nextBtnText") || "Next &rarr;",
    prevBtnText: v = s("prevBtnText") || "&larr; Previous",
    progressText: g = s("progressText") || "{current} of {total}"
  } = o.popover || {};
  t.nextButton.innerHTML = r, t.previousButton.innerHTML = v, t.progress.innerHTML = g, i ? (t.title.innerHTML = i, t.title.style.display = "block") : t.title.style.display = "none", d ? (t.description.innerHTML = d, t.description.style.display = "block") : t.description.style.display = "none";
  const y = n || s("showButtons"), a = w || s("showProgress") || false, p = (y == null ? void 0 : y.includes("next")) || (y == null ? void 0 : y.includes("previous")) || a;
  t.closeButton.style.display = y.includes("close") ? "block" : "none", p ? (t.footer.style.display = "flex", t.progress.style.display = a ? "block" : "none", t.nextButton.style.display = y.includes("next") ? "block" : "none", t.previousButton.style.display = y.includes("previous") ? "block" : "none") : t.footer.style.display = "none";
  const c = f || s("disableButtons") || [];
  c != null && c.includes("next") && (t.nextButton.disabled = true, t.nextButton.classList.add("driver-popover-btn-disabled")), c != null && c.includes("previous") && (t.previousButton.disabled = true, t.previousButton.classList.add("driver-popover-btn-disabled")), c != null && c.includes("close") && (t.closeButton.disabled = true, t.closeButton.classList.add("driver-popover-btn-disabled"));
  const u = t.wrapper;
  u.style.display = "block", u.style.left = "", u.style.top = "", u.style.bottom = "", u.style.right = "", u.id = "driver-popover-content", u.setAttribute("role", "dialog"), u.setAttribute("aria-labelledby", "driver-popover-title"), u.setAttribute("aria-describedby", "driver-popover-description");
  const h = t.arrow;
  h.className = "driver-popover-arrow";
  const m = ((b = o.popover) == null ? void 0 : b.popoverClass) || s("popoverClass") || "";
  u.className = `driver-popover ${m}`.trim(), re(
    t.wrapper,
    (E) => {
      var B, R, W;
      const T = E.target, A = ((B = o.popover) == null ? void 0 : B.onNextClick) || s("onNextClick"), H = ((R = o.popover) == null ? void 0 : R.onPrevClick) || s("onPrevClick"), $ = ((W = o.popover) == null ? void 0 : W.onCloseClick) || s("onCloseClick");
      if (T.closest(".driver-popover-next-btn"))
        return A ? A(e, o, {
          config: s(),
          state: l(),
          driver: _()
        }) : L("nextClick");
      if (T.closest(".driver-popover-prev-btn"))
        return H ? H(e, o, {
          config: s(),
          state: l(),
          driver: _()
        }) : L("prevClick");
      if (T.closest(".driver-popover-close-btn"))
        return $ ? $(e, o, {
          config: s(),
          state: l(),
          driver: _()
        }) : L("closeClick");
    },
    (E) => !(t != null && t.description.contains(E)) && !(t != null && t.title.contains(E)) && typeof E.className == "string" && E.className.includes("driver-popover")
  ), k("popover", t);
  const x = ((P = o.popover) == null ? void 0 : P.onPopoverRender) || s("onPopoverRender");
  x && x(t, {
    config: s(),
    state: l(),
    driver: _()
  }), ae(e, o), ee(u);
  const C = e.classList.contains("driver-dummy-element"), S = U([u, ...C ? [] : [e]]);
  S.length > 0 && S[0].focus();
}
function se() {
  const e = l("popover");
  if (!(e != null && e.wrapper))
    return;
  const o = e.wrapper.getBoundingClientRect(), t = s("stagePadding") || 0, i = s("popoverOffset") || 0;
  return {
    width: o.width + t + i,
    height: o.height + t + i,
    realWidth: o.width,
    realHeight: o.height
  };
}
function Z(e, o) {
  const { elementDimensions: t, popoverDimensions: i, popoverPadding: d, popoverArrowDimensions: n } = o;
  return e === "start" ? Math.max(
    Math.min(
      t.top - d,
      window.innerHeight - i.realHeight - n.width
    ),
    n.width
  ) : e === "end" ? Math.max(
    Math.min(
      t.top - (i == null ? void 0 : i.realHeight) + t.height + d,
      window.innerHeight - (i == null ? void 0 : i.realHeight) - n.width
    ),
    n.width
  ) : e === "center" ? Math.max(
    Math.min(
      t.top + t.height / 2 - (i == null ? void 0 : i.realHeight) / 2,
      window.innerHeight - (i == null ? void 0 : i.realHeight) - n.width
    ),
    n.width
  ) : 0;
}
function G(e, o) {
  const { elementDimensions: t, popoverDimensions: i, popoverPadding: d, popoverArrowDimensions: n } = o;
  return e === "start" ? Math.max(
    Math.min(
      t.left - d,
      window.innerWidth - i.realWidth - n.width
    ),
    n.width
  ) : e === "end" ? Math.max(
    Math.min(
      t.left - (i == null ? void 0 : i.realWidth) + t.width + d,
      window.innerWidth - (i == null ? void 0 : i.realWidth) - n.width
    ),
    n.width
  ) : e === "center" ? Math.max(
    Math.min(
      t.left + t.width / 2 - (i == null ? void 0 : i.realWidth) / 2,
      window.innerWidth - (i == null ? void 0 : i.realWidth) - n.width
    ),
    n.width
  ) : 0;
}
function ae(e, o) {
  const t = l("popover");
  if (!t)
    return;
  const { align: i = "start", side: d = "left" } = (o == null ? void 0 : o.popover) || {}, n = i, f = e.id === "driver-dummy-element" ? "over" : d, w = s("stagePadding") || 0, r = se(), v = t.arrow.getBoundingClientRect(), g = e.getBoundingClientRect(), y = g.top - r.height;
  let a = y >= 0;
  const p = window.innerHeight - (g.bottom + r.height);
  let c = p >= 0;
  const u = g.left - r.width;
  let h = u >= 0;
  const m = window.innerWidth - (g.right + r.width);
  let x = m >= 0;
  const C = !a && !c && !h && !x;
  let S = f;
  if (f === "top" && a ? x = h = c = false : f === "bottom" && c ? x = h = a = false : f === "left" && h ? x = a = c = false : f === "right" && x && (h = a = c = false), f === "over") {
    const b = window.innerWidth / 2 - r.realWidth / 2, P = window.innerHeight / 2 - r.realHeight / 2;
    t.wrapper.style.left = `${b}px`, t.wrapper.style.right = "auto", t.wrapper.style.top = `${P}px`, t.wrapper.style.bottom = "auto";
  } else if (C) {
    const b = window.innerWidth / 2 - (r == null ? void 0 : r.realWidth) / 2, P = 10;
    t.wrapper.style.left = `${b}px`, t.wrapper.style.right = "auto", t.wrapper.style.bottom = `${P}px`, t.wrapper.style.top = "auto";
  } else if (h) {
    const b = Math.min(
      u,
      window.innerWidth - (r == null ? void 0 : r.realWidth) - v.width
    ), P = Z(n, {
      elementDimensions: g,
      popoverDimensions: r,
      popoverPadding: w,
      popoverArrowDimensions: v
    });
    t.wrapper.style.left = `${b}px`, t.wrapper.style.top = `${P}px`, t.wrapper.style.bottom = "auto", t.wrapper.style.right = "auto", S = "left";
  } else if (x) {
    const b = Math.min(
      m,
      window.innerWidth - (r == null ? void 0 : r.realWidth) - v.width
    ), P = Z(n, {
      elementDimensions: g,
      popoverDimensions: r,
      popoverPadding: w,
      popoverArrowDimensions: v
    });
    t.wrapper.style.right = `${b}px`, t.wrapper.style.top = `${P}px`, t.wrapper.style.bottom = "auto", t.wrapper.style.left = "auto", S = "right";
  } else if (a) {
    const b = Math.min(
      y,
      window.innerHeight - r.realHeight - v.width
    );
    let P = G(n, {
      elementDimensions: g,
      popoverDimensions: r,
      popoverPadding: w,
      popoverArrowDimensions: v
    });
    t.wrapper.style.top = `${b}px`, t.wrapper.style.left = `${P}px`, t.wrapper.style.bottom = "auto", t.wrapper.style.right = "auto", S = "top";
  } else if (c) {
    const b = Math.min(
      p,
      window.innerHeight - (r == null ? void 0 : r.realHeight) - v.width
    );
    let P = G(n, {
      elementDimensions: g,
      popoverDimensions: r,
      popoverPadding: w,
      popoverArrowDimensions: v
    });
    t.wrapper.style.left = `${P}px`, t.wrapper.style.bottom = `${b}px`, t.wrapper.style.top = "auto", t.wrapper.style.right = "auto", S = "bottom";
  }
  C ? t.arrow.classList.add("driver-popover-arrow-none") : Ee(n, S, e);
}
function Ee(e, o, t) {
  const i = l("popover");
  if (!i)
    return;
  const d = t.getBoundingClientRect(), n = se(), f = i.arrow, w = n.width, r = window.innerWidth, v = d.width, g = d.left, y = n.height, a = window.innerHeight, p = d.top, c = d.height;
  f.className = "driver-popover-arrow";
  let u = o, h = e;
  if (o === "top" ? (g + v <= 0 ? (u = "right", h = "end") : g + v - w <= 0 && (u = "top", h = "start"), g >= r ? (u = "left", h = "end") : g + w >= r && (u = "top", h = "end")) : o === "bottom" ? (g + v <= 0 ? (u = "right", h = "start") : g + v - w <= 0 && (u = "bottom", h = "start"), g >= r ? (u = "left", h = "start") : g + w >= r && (u = "bottom", h = "end")) : o === "left" ? (p + c <= 0 ? (u = "bottom", h = "end") : p + c - y <= 0 && (u = "left", h = "start"), p >= a ? (u = "top", h = "end") : p + y >= a && (u = "left", h = "end")) : o === "right" && (p + c <= 0 ? (u = "bottom", h = "start") : p + c - y <= 0 && (u = "right", h = "start"), p >= a ? (u = "top", h = "start") : p + y >= a && (u = "right", h = "end")), !u)
    f.classList.add("driver-popover-arrow-none");
  else {
    f.classList.add(`driver-popover-arrow-side-${u}`), f.classList.add(`driver-popover-arrow-align-${h}`);
    const m = t.getBoundingClientRect(), x = f.getBoundingClientRect(), C = s("stagePadding") || 0, S = m.left - C < window.innerWidth && m.right + C > 0 && m.top - C < window.innerHeight && m.bottom + C > 0;
    o === "bottom" && S && (x.x > m.x && x.x + x.width < m.x + m.width ? i.wrapper.style.transform = "translateY(0)" : (f.classList.remove(`driver-popover-arrow-align-${h}`), f.classList.add("driver-popover-arrow-none"), i.wrapper.style.transform = `translateY(-${C / 2}px)`));
  }
}
function Le() {
  const e = document.createElement("div");
  e.classList.add("driver-popover");
  const o = document.createElement("div");
  o.classList.add("driver-popover-arrow");
  const t = document.createElement("header");
  t.id = "driver-popover-title", t.classList.add("driver-popover-title"), t.style.display = "none", t.innerText = "Popover Title";
  const i = document.createElement("div");
  i.id = "driver-popover-description", i.classList.add("driver-popover-description"), i.style.display = "none", i.innerText = "Popover description is here";
  const d = document.createElement("button");
  d.type = "button", d.classList.add("driver-popover-close-btn"), d.setAttribute("aria-label", "Close"), d.innerHTML = "&times;";
  const n = document.createElement("footer");
  n.classList.add("driver-popover-footer");
  const f = document.createElement("span");
  f.classList.add("driver-popover-progress-text"), f.innerText = "";
  const w = document.createElement("span");
  w.classList.add("driver-popover-navigation-btns");
  const r = document.createElement("button");
  r.type = "button", r.classList.add("driver-popover-prev-btn"), r.innerHTML = "&larr; Previous";
  const v = document.createElement("button");
  return v.type = "button", v.classList.add("driver-popover-next-btn"), v.innerHTML = "Next &rarr;", w.appendChild(r), w.appendChild(v), n.appendChild(f), n.appendChild(w), e.appendChild(d), e.appendChild(o), e.appendChild(t), e.appendChild(i), e.appendChild(n), {
    wrapper: e,
    arrow: o,
    title: t,
    description: i,
    footer: n,
    previousButton: r,
    nextButton: v,
    closeButton: d,
    footerButtons: w,
    progress: f
  };
}
function Te() {
  var o;
  const e = l("popover");
  e && ((o = e.wrapper.parentElement) == null || o.removeChild(e.wrapper));
}
function Ae(e = {}) {
  F(e);
  function o() {
    s("allowClose") && g();
  }
  function t() {
    const a = s("overlayClickBehavior");
    if (s("allowClose") && a === "close") {
      g();
      return;
    }
    a === "nextStep" && i();
  }
  function i() {
    const a = l("activeIndex"), p = s("steps") || [];
    if (typeof a == "undefined")
      return;
    const c = a + 1;
    p[c] ? v(c) : g();
  }
  function d() {
    const a = l("activeIndex"), p = s("steps") || [];
    if (typeof a == "undefined")
      return;
    const c = a - 1;
    p[c] ? v(c) : g();
  }
  function n(a) {
    (s("steps") || [])[a] ? v(a) : g();
  }
  function f() {
    var x;
    if (l("__transitionCallback"))
      return;
    const p = l("activeIndex"), c = l("__activeStep"), u = l("__activeElement");
    if (typeof p == "undefined" || typeof c == "undefined" || typeof l("activeIndex") == "undefined")
      return;
    const m = ((x = c.popover) == null ? void 0 : x.onPrevClick) || s("onPrevClick");
    if (m)
      return m(u, c, {
        config: s(),
        state: l(),
        driver: _()
      });
    d();
  }
  function w() {
    var m;
    if (l("__transitionCallback"))
      return;
    const p = l("activeIndex"), c = l("__activeStep"), u = l("__activeElement");
    if (typeof p == "undefined" || typeof c == "undefined")
      return;
    const h = ((m = c.popover) == null ? void 0 : m.onNextClick) || s("onNextClick");
    if (h)
      return h(u, c, {
        config: s(),
        state: l(),
        driver: _()
      });
    i();
  }
  function r() {
    l("isInitialized") || (k("isInitialized", true), document.body.classList.add("driver-active", s("animate") ? "driver-fade" : "driver-simple"), ke(), N("overlayClick", t), N("escapePress", o), N("arrowLeftPress", f), N("arrowRightPress", w));
  }
  function v(a = 0) {
    var $, B, R, W, V, q, K, Y;
    const p = s("steps");
    if (!p) {
      console.error("No steps to drive through"), g();
      return;
    }
    if (!p[a]) {
      g();
      return;
    }
    k("__activeOnDestroyed", document.activeElement), k("activeIndex", a);
    const c = p[a], u = p[a + 1], h = p[a - 1], m = (($ = c.popover) == null ? void 0 : $.doneBtnText) || s("doneBtnText") || "Done", x = s("allowClose"), C = typeof ((B = c.popover) == null ? void 0 : B.showProgress) != "undefined" ? (R = c.popover) == null ? void 0 : R.showProgress : s("showProgress"), b = (((W = c.popover) == null ? void 0 : W.progressText) || s("progressText") || "{{current}} of {{total}}").replace("{{current}}", `${a + 1}`).replace("{{total}}", `${p.length}`), P = ((V = c.popover) == null ? void 0 : V.showButtons) || s("showButtons"), E = [
      "next",
      "previous",
      ...x ? ["close"] : []
    ].filter((ce) => !(P != null && P.length) || P.includes(ce)), T = ((q = c.popover) == null ? void 0 : q.onNextClick) || s("onNextClick"), A = ((K = c.popover) == null ? void 0 : K.onPrevClick) || s("onPrevClick"), H = ((Y = c.popover) == null ? void 0 : Y.onCloseClick) || s("onCloseClick");
    j({
      ...c,
      popover: {
        showButtons: E,
        nextBtnText: u ? void 0 : m,
        disableButtons: [...h ? [] : ["previous"]],
        showProgress: C,
        progressText: b,
        onNextClick: T || (() => {
          u ? v(a + 1) : g();
        }),
        onPrevClick: A || (() => {
          v(a - 1);
        }),
        onCloseClick: H || (() => {
          g();
        }),
        ...(c == null ? void 0 : c.popover) || {}
      }
    });
  }
  function g(a = true) {
    const p = l("__activeElement"), c = l("__activeStep"), u = l("__activeOnDestroyed"), h = s("onDestroyStarted");
    if (a && h) {
      const C = !p || (p == null ? void 0 : p.id) === "driver-dummy-element";
      h(C ? void 0 : p, c, {
        config: s(),
        state: l(),
        driver: _()
      });
      return;
    }
    const m = (c == null ? void 0 : c.onDeselected) || s("onDeselected"), x = s("onDestroyed");
    if (document.body.classList.remove("driver-active", "driver-fade", "driver-simple"), Se(), Te(), Ce(), me(), de(), X(), p && c) {
      const C = p.id === "driver-dummy-element";
      m && m(C ? void 0 : p, c, {
        config: s(),
        state: l(),
        driver: _()
      }), x && x(C ? void 0 : p, c, {
        config: s(),
        state: l(),
        driver: _()
      });
    }
    u && u.focus();
  }
  const y = {
    isActive: () => l("isInitialized") || false,
    refresh: M,
    drive: (a = 0) => {
      r(), v(a);
    },
    setConfig: F,
    setSteps: (a) => {
      X(), F({
        ...s(),
        steps: a
      });
    },
    getConfig: s,
    getState: l,
    getActiveIndex: () => l("activeIndex"),
    isFirstStep: () => l("activeIndex") === 0,
    isLastStep: () => {
      const a = s("steps") || [], p = l("activeIndex");
      return p !== void 0 && p === a.length - 1;
    },
    getActiveStep: () => l("activeStep"),
    getActiveElement: () => l("activeElement"),
    getPreviousElement: () => l("previousElement"),
    getPreviousStep: () => l("previousStep"),
    moveNext: i,
    movePrevious: d,
    moveTo: n,
    hasNextStep: () => {
      const a = s("steps") || [], p = l("activeIndex");
      return p !== void 0 && !!a[p + 1];
    },
    hasPreviousStep: () => {
      const a = s("steps") || [], p = l("activeIndex");
      return p !== void 0 && !!a[p - 1];
    },
    highlight: (a) => {
      r(), j({
        ...a,
        popover: a.popover ? {
          showButtons: [],
          showProgress: false,
          progressText: "",
          ...a.popover
        } : void 0
      });
    },
    destroy: () => {
      g(false);
    }
  };
  return le(y), y;
}

// resources/js/css-selector.js
var lastMouseX = 0;
var lastMouseY = 0;
var active = false;
var hasNavigator = window.navigator.clipboard;
var isInElement = false;
var selected = null;
var cursor = document.querySelector("#circle-cursor");
function initCssSelector() {
  Livewire.on("filament-tour::change-css-selector-status", function({ enabled }) {
    if (enabled) {
      let release = function(event) {
        if (event.key !== "Escape")
          return;
        active = false;
        selected = null;
        cursor.style.display = "none";
      };
      document.onmousemove = handleMouseMove;
      document.onkeyup = release;
      document.onmouseover = enterCursor;
      document.onmouseleave = leaveCursor;
      document.addEventListener("keydown", function(event) {
        if (event.ctrlKey && event.code === "Space" && !active) {
          if (!hasNavigator) {
            new FilamentNotification().title("Filament Tour - CSS Selector").body("Your browser does not support the Clipboard API !<br>Don't forget to be in <b>https://</b> protocol").danger().send();
          } else {
            active = true;
            moveCursor(lastMouseX, lastMouseY);
            cursor.style.display = "block";
            new FilamentNotification().title("Filament Tour - CSS Selector").body("Activated !<br>Press Ctrl + C to copy the CSS Selector of the selected element !").success().send();
          }
        }
        if (event.ctrlKey && event.code === "KeyC" && active) {
          navigator.clipboard.writeText(getOptimizedSelector(selected) ?? "Nothing selected !");
          active = false;
          selected = null;
          cursor.style.display = "none";
          new FilamentNotification().title("Filament Tour - CSS Selector").body(`CSS Selector copied to clipboard !`).success().send();
        }
      });
    }
  });
}
function escapeCssSelector(str) {
  return str.replace(/([!"#$%&'()*+,./:;<=>?@[\]^`{|}~])/g, "\\$1");
}
function getOptimizedSelector(el) {
  let fullSelector = getCssSelector(el);
  return optimizeSelector(fullSelector);
}
function optimizeSelector(selector) {
  let parts = selector.split(" > ");
  for (let i = parts.length - 2; i >= 0; i--) {
    let testSelector = parts.slice(i).join(" > ");
    if (document.querySelectorAll(testSelector).length === 1) {
      return testSelector;
    }
  }
  return selector;
}
function getCssSelector(el) {
  if (!el) {
    return "";
  }
  if (el.id) {
    return "#" + escapeCssSelector(el.id);
  }
  if (el === document.body) {
    return "body";
  }
  let tag = el.tagName.toLowerCase();
  let validClasses = el.className.split(/\s+/).filter((cls) => cls && !cls.startsWith("--"));
  let classes = validClasses.length ? "." + validClasses.map(escapeCssSelector).join(".") : "";
  let selectorWithoutNthOfType = tag + classes;
  try {
    let siblingsWithSameSelector = Array.from(el.parentNode.querySelectorAll(selectorWithoutNthOfType));
    if (siblingsWithSameSelector.length === 1 && siblingsWithSameSelector[0] === el) {
      return getCssSelector(el.parentNode) + " > " + selectorWithoutNthOfType;
    }
    let siblings = Array.from(el.parentNode.children);
    let sameTagAndClassSiblings = siblings.filter((sib) => sib.tagName === el.tagName && sib.className === el.className);
    if (sameTagAndClassSiblings.length > 1) {
      let index = sameTagAndClassSiblings.indexOf(el) + 1;
      return getCssSelector(el.parentNode) + " > " + tag + classes + ":nth-of-type(" + index + ")";
    } else {
      return getCssSelector(el.parentNode) + " > " + tag + classes;
    }
  } catch (e) {
  }
}
function handleMouseMove(event) {
  lastMouseX = event.clientX;
  lastMouseY = event.clientY;
  moveCursor(event.clientX, event.clientY);
}
function moveCursor(pX, pY) {
  if (!active)
    return;
  let diff = 10;
  if (!isInElement) {
    cursor.style.left = pX - diff + "px";
    cursor.style.top = pY - diff + "px";
    cursor.style.width = "20px";
    cursor.style.height = "20px";
    cursor.style.borderRadius = "50%";
  }
}
function enterCursor(event) {
  event.stopPropagation();
  if (!active)
    return;
  isInElement = true;
  let elem = event.target;
  while (elem.lastElementChild) {
    elem = elem.lastElementChild;
  }
  if (elem) {
    let eX = elem.offsetParent ? elem.offsetLeft + elem.offsetParent.offsetLeft : elem.offsetLeft;
    let eY = elem.offsetParent ? elem.offsetTop + elem.offsetParent.offsetTop : elem.offsetTop;
    let eW = elem.offsetWidth;
    let eH = elem.offsetHeight;
    let diff = 6;
    selected = elem;
    cursor.style.left = eX - diff + "px";
    cursor.style.top = eY - diff + "px";
    cursor.style.width = eW + diff * 2 - 1 + "px";
    cursor.style.height = eH + diff * 2 - 1 + "px";
    cursor.style.borderRadius = "5px";
  }
}
function leaveCursor(event) {
  if (!active)
    return;
  isInElement = false;
}

// resources/js/index.js
document.addEventListener("livewire:initialized", async function() {
  initCssSelector();
  let pluginData;
  let tours = [];
  let highlights = [];
  function waitForElement(selector, callback) {
    if (document.querySelector(selector)) {
      callback(document.querySelector(selector));
      return;
    }
    const observer = new MutationObserver(function(mutations) {
      if (document.querySelector(selector)) {
        callback(document.querySelector(selector));
        observer.disconnect();
      }
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
  function parseId(params) {
    if (Array.isArray(params)) {
      return params[0];
    } else if (typeof params === "object") {
      return params.id;
    }
    return params;
  }
  Livewire.dispatch("filament-tour::load-elements", { request: window.location });
  Livewire.on("filament-tour::loaded-elements", function(data) {
    pluginData = data;
    pluginData.tours.forEach((tour) => {
      tours.push(tour);
      if (!localStorage.getItem("tours")) {
        localStorage.setItem("tours", "[]");
      }
    });
    selectTour(tours);
    pluginData.highlights.forEach((highlight) => {
      if (highlight.route === window.location.pathname) {
        waitForElement(highlight.parent, function(selector) {
          selector.parentNode.style.position = "relative";
          let tempDiv = document.createElement("div");
          tempDiv.innerHTML = highlight.button;
          tempDiv.firstChild.classList.add(highlight.position);
          selector.parentNode.insertBefore(tempDiv.firstChild, selector);
        });
        highlights.push(highlight);
      }
    });
  });
  function selectTour(tours2, startIndex = 0) {
    for (let i = startIndex; i < tours2.length; i++) {
      let tour = tours2[i];
      let conditionAlwaysShow = tour.alwaysShow;
      let conditionRoutesIgnored = tour.routesIgnored;
      let conditionRouteMatches = tour.route === window.location.pathname;
      let conditionVisibleOnce = !pluginData.only_visible_once || pluginData.only_visible_once && !localStorage.getItem("tours").includes(tour.id);
      if (conditionAlwaysShow && conditionRoutesIgnored || conditionAlwaysShow && !conditionRoutesIgnored && conditionRouteMatches || conditionRoutesIgnored && conditionVisibleOnce || conditionRouteMatches && conditionVisibleOnce) {
        openTour(tour);
        break;
      }
    }
  }
  Livewire.on("filament-tour::open-highlight", function(params) {
    const id = parseId(params);
    console.log(highlights);
    let highlight = highlights.find((element) => element.id === id);
    if (highlight) {
      Ae({
        overlayColor: localStorage.theme === "light" ? highlight.colors.light : highlight.colors.dark,
        onPopoverRender: (popover, { config, state }) => {
          popover.title.innerHTML = "";
          popover.title.innerHTML = state.activeStep.popover.title;
          if (!state.activeStep.popover.description) {
            popover.title.firstChild.style.justifyContent = "center";
          }
          let contentClasses = "dark:text-white fi-section rounded-xl bg-white shadow-sm ring-1 ring-gray-950/5 dark:bg-gray-900 dark:ring-white/10 mb-4";
          popover.footer.parentElement.classList.add(...contentClasses.split(" "));
        }
      }).highlight(highlight);
    } else {
      console.error(`Highlight with id '${id}' not found`);
    }
  });
  Livewire.on("filament-tour::open-tour", function(params) {
    const id = parseId(params);
    let tour = tours.find((element) => element.id === `tour_${id}`);
    if (tour) {
      openTour(tour);
    } else {
      console.error(`Tour with id '${id}' not found`);
    }
  });
  function openTour(tour) {
    let steps = JSON.parse(tour.steps);
    if (steps.length > 0) {
      const driverObj = Ae({
        allowClose: true,
        disableActiveInteraction: true,
        overlayColor: localStorage.theme === "light" ? tour.colors.light : tour.colors.dark,
        onDeselected: (element, step, { config, state }) => {
        },
        onCloseClick: (element, step, { config, state }) => {
          if (state.activeStep && (!state.activeStep.uncloseable || tour.uncloseable))
            driverObj.destroy();
          if (!localStorage.getItem("tours").includes(tour.id)) {
            localStorage.setItem("tours", JSON.stringify([...JSON.parse(localStorage.getItem("tours")), tour.id]));
          }
        },
        onDestroyStarted: (element, step, { config, state }) => {
          if (state.activeStep && !state.activeStep.uncloseable && !tour.uncloseable) {
            driverObj.destroy();
          }
        },
        onDestroyed: (element, step, { config, state }) => {
        },
        onNextClick: (element, step, { config, state }) => {
          if (tours.length > 1 && driverObj.isLastStep()) {
            let index = tours.findIndex((objet) => objet.id === tour.id);
            if (index !== -1 && index < tours.length - 1) {
              let nextTourIndex = index + 1;
              selectTour(tours, nextTourIndex);
            }
          }
          if (driverObj.isLastStep()) {
            if (!localStorage.getItem("tours").includes(tour.id)) {
              localStorage.setItem("tours", JSON.stringify([...JSON.parse(localStorage.getItem("tours")), tour.id]));
            }
            driverObj.destroy();
          }
          if (step.events) {
            if (step.events.notifyOnNext) {
              new FilamentNotification().title(step.events.notifyOnNext.title).body(step.events.notifyOnNext.body).icon(step.events.notifyOnNext.icon).iconColor(step.events.notifyOnNext.iconColor).color(step.events.notifyOnNext.color).duration(step.events.notifyOnNext.duration).send();
            }
            if (step.events.dispatchOnNext) {
              Livewire.dispatch(step.events.dispatchOnNext.name, step.events.dispatchOnNext.params);
            }
            if (step.events.clickOnNext) {
              document.querySelector(step.events.clickOnNext).click();
            }
            if (step.events.redirectOnNext) {
              window.open(step.events.redirectOnNext.url, step.events.redirectOnNext.newTab ? "_blank" : "_self");
            }
          }
          driverObj.moveNext();
        },
        onPopoverRender: (popover, { config, state }) => {
          if (state.activeStep.uncloseable || tour.uncloseable)
            document.querySelector(".driver-popover-close-btn").remove();
          popover.title.innerHTML = "";
          popover.title.innerHTML = state.activeStep.popover.title;
          if (!state.activeStep.popover.description) {
            popover.title.firstChild.style.justifyContent = "center";
          }
          let contentClasses = "dark:text-white fi-section rounded-xl bg-white shadow-sm ring-1 ring-gray-950/5 dark:bg-gray-900 dark:ring-white/10 mb-4";
          popover.footer.parentElement.classList.add(...contentClasses.split(" "));
          popover.footer.innerHTML = "";
          popover.footer.classList.add("flex", "mt-3");
          popover.footer.style.justifyContent = "space-evenly";
          popover.footer.classList.remove("driver-popover-footer");
          const nextButton = document.createElement("button");
          let nextClasses = "fi-btn fi-btn-size-md relative grid-flow-col items-center justify-center font-semibold outline-none transition duration-75 focus:ring-2 disabled:pointer-events-none disabled:opacity-70 rounded-lg fi-btn-color-primary gap-1.5 px-3 py-2 text-sm inline-grid shadow-sm bg-custom-600 text-white hover:bg-custom-500 dark:bg-custom-500 dark:hover:bg-custom-400 focus:ring-custom-500/50 dark:focus:ring-custom-400/50 fi-ac-btn-action";
          nextButton.classList.add(...nextClasses.split(" "), "driver-popover-next-btn");
          nextButton.innerText = driverObj.isLastStep() ? tour.doneButtonLabel : tour.nextButtonLabel;
          nextButton.style.setProperty("--c-400", "var(--primary-400");
          nextButton.style.setProperty("--c-500", "var(--primary-500");
          nextButton.style.setProperty("--c-600", "var(--primary-600");
          const prevButton = document.createElement("button");
          let prevClasses = "fi-btn fi-btn-size-md relative grid-flow-col items-center justify-center font-semibold outline-none transition duration-75 focus:ring-2 disabled:pointer-events-none disabled:opacity-70 rounded-lg fi-btn-color-gray gap-1.5 px-3 py-2 text-sm inline-grid shadow-sm bg-white text-gray-950 hover:bg-gray-50 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 ring-1 ring-gray-950/10 dark:ring-white/20 fi-ac-btn-action";
          prevButton.classList.add(...prevClasses.split(" "), "driver-popover-prev-btn");
          prevButton.innerText = tour.previousButtonLabel;
          if (!driverObj.isFirstStep()) {
            popover.footer.appendChild(prevButton);
          }
          popover.footer.appendChild(nextButton);
        },
        steps
      });
      driverObj.drive();
    }
  }
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vbm9kZV9tb2R1bGVzL2RyaXZlci5qcy9kaXN0L2RyaXZlci5qcy5tanMiLCAiLi4vanMvY3NzLXNlbGVjdG9yLmpzIiwgIi4uL2pzL2luZGV4LmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJsZXQgeiA9IHt9LCBKO1xuZnVuY3Rpb24gRihlID0ge30pIHtcbiAgeiA9IHtcbiAgICBhbmltYXRlOiAhMCxcbiAgICBhbGxvd0Nsb3NlOiAhMCxcbiAgICBvdmVybGF5Q2xpY2tCZWhhdmlvcjogXCJjbG9zZVwiLFxuICAgIG92ZXJsYXlPcGFjaXR5OiAwLjcsXG4gICAgc21vb3RoU2Nyb2xsOiAhMSxcbiAgICBkaXNhYmxlQWN0aXZlSW50ZXJhY3Rpb246ICExLFxuICAgIHNob3dQcm9ncmVzczogITEsXG4gICAgc3RhZ2VQYWRkaW5nOiAxMCxcbiAgICBzdGFnZVJhZGl1czogNSxcbiAgICBwb3BvdmVyT2Zmc2V0OiAxMCxcbiAgICBzaG93QnV0dG9uczogW1wibmV4dFwiLCBcInByZXZpb3VzXCIsIFwiY2xvc2VcIl0sXG4gICAgZGlzYWJsZUJ1dHRvbnM6IFtdLFxuICAgIG92ZXJsYXlDb2xvcjogXCIjMDAwXCIsXG4gICAgLi4uZVxuICB9O1xufVxuZnVuY3Rpb24gcyhlKSB7XG4gIHJldHVybiBlID8geltlXSA6IHo7XG59XG5mdW5jdGlvbiBsZShlKSB7XG4gIEogPSBlO1xufVxuZnVuY3Rpb24gXygpIHtcbiAgcmV0dXJuIEo7XG59XG5sZXQgSSA9IHt9O1xuZnVuY3Rpb24gTihlLCBvKSB7XG4gIElbZV0gPSBvO1xufVxuZnVuY3Rpb24gTChlKSB7XG4gIHZhciBvO1xuICAobyA9IElbZV0pID09IG51bGwgfHwgby5jYWxsKEkpO1xufVxuZnVuY3Rpb24gZGUoKSB7XG4gIEkgPSB7fTtcbn1cbmZ1bmN0aW9uIE8oZSwgbywgdCwgaSkge1xuICByZXR1cm4gKGUgLz0gaSAvIDIpIDwgMSA/IHQgLyAyICogZSAqIGUgKyBvIDogLXQgLyAyICogKC0tZSAqIChlIC0gMikgLSAxKSArIG87XG59XG5mdW5jdGlvbiBVKGUpIHtcbiAgY29uc3QgbyA9ICdhW2hyZWZdOm5vdChbZGlzYWJsZWRdKSwgYnV0dG9uOm5vdChbZGlzYWJsZWRdKSwgdGV4dGFyZWE6bm90KFtkaXNhYmxlZF0pLCBpbnB1dFt0eXBlPVwidGV4dFwiXTpub3QoW2Rpc2FibGVkXSksIGlucHV0W3R5cGU9XCJyYWRpb1wiXTpub3QoW2Rpc2FibGVkXSksIGlucHV0W3R5cGU9XCJjaGVja2JveFwiXTpub3QoW2Rpc2FibGVkXSksIHNlbGVjdDpub3QoW2Rpc2FibGVkXSknO1xuICByZXR1cm4gZS5mbGF0TWFwKCh0KSA9PiB7XG4gICAgY29uc3QgaSA9IHQubWF0Y2hlcyhvKSwgZCA9IEFycmF5LmZyb20odC5xdWVyeVNlbGVjdG9yQWxsKG8pKTtcbiAgICByZXR1cm4gWy4uLmkgPyBbdF0gOiBbXSwgLi4uZF07XG4gIH0pLmZpbHRlcigodCkgPT4gZ2V0Q29tcHV0ZWRTdHlsZSh0KS5wb2ludGVyRXZlbnRzICE9PSBcIm5vbmVcIiAmJiB2ZSh0KSk7XG59XG5mdW5jdGlvbiBlZShlKSB7XG4gIGlmICghZSB8fCB1ZShlKSlcbiAgICByZXR1cm47XG4gIGNvbnN0IG8gPSBzKFwic21vb3RoU2Nyb2xsXCIpLCB0ID0gZS5vZmZzZXRIZWlnaHQgPiB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gIGUuc2Nyb2xsSW50b1ZpZXcoe1xuICAgIC8vIFJlbW92aW5nIHRoZSBzbW9vdGggc2Nyb2xsaW5nIGZvciBlbGVtZW50cyB3aGljaCBleGlzdCBpbnNpZGUgdGhlIHNjcm9sbGFibGUgcGFyZW50XG4gICAgLy8gVGhpcyB3YXMgY2F1c2luZyB0aGUgaGlnaGxpZ2h0IHRvIG5vdCBwcm9wZXJseSByZW5kZXJcbiAgICBiZWhhdmlvcjogIW8gfHwgcGUoZSkgPyBcImF1dG9cIiA6IFwic21vb3RoXCIsXG4gICAgaW5saW5lOiBcImNlbnRlclwiLFxuICAgIGJsb2NrOiB0ID8gXCJzdGFydFwiIDogXCJjZW50ZXJcIlxuICB9KTtcbn1cbmZ1bmN0aW9uIHBlKGUpIHtcbiAgaWYgKCFlIHx8ICFlLnBhcmVudEVsZW1lbnQpXG4gICAgcmV0dXJuO1xuICBjb25zdCBvID0gZS5wYXJlbnRFbGVtZW50O1xuICByZXR1cm4gby5zY3JvbGxIZWlnaHQgPiBvLmNsaWVudEhlaWdodDtcbn1cbmZ1bmN0aW9uIHVlKGUpIHtcbiAgY29uc3QgbyA9IGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gIHJldHVybiBvLnRvcCA+PSAwICYmIG8ubGVmdCA+PSAwICYmIG8uYm90dG9tIDw9ICh3aW5kb3cuaW5uZXJIZWlnaHQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCkgJiYgby5yaWdodCA8PSAod2luZG93LmlubmVyV2lkdGggfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoKTtcbn1cbmZ1bmN0aW9uIHZlKGUpIHtcbiAgcmV0dXJuICEhKGUub2Zmc2V0V2lkdGggfHwgZS5vZmZzZXRIZWlnaHQgfHwgZS5nZXRDbGllbnRSZWN0cygpLmxlbmd0aCk7XG59XG5sZXQgRCA9IHt9O1xuZnVuY3Rpb24gayhlLCBvKSB7XG4gIERbZV0gPSBvO1xufVxuZnVuY3Rpb24gbChlKSB7XG4gIHJldHVybiBlID8gRFtlXSA6IEQ7XG59XG5mdW5jdGlvbiBYKCkge1xuICBEID0ge307XG59XG5mdW5jdGlvbiBmZShlLCBvLCB0LCBpKSB7XG4gIGxldCBkID0gbChcIl9fYWN0aXZlU3RhZ2VQb3NpdGlvblwiKTtcbiAgY29uc3QgbiA9IGQgfHwgdC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSwgZiA9IGkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksIHcgPSBPKGUsIG4ueCwgZi54IC0gbi54LCBvKSwgciA9IE8oZSwgbi55LCBmLnkgLSBuLnksIG8pLCB2ID0gTyhlLCBuLndpZHRoLCBmLndpZHRoIC0gbi53aWR0aCwgbyksIGcgPSBPKGUsIG4uaGVpZ2h0LCBmLmhlaWdodCAtIG4uaGVpZ2h0LCBvKTtcbiAgZCA9IHtcbiAgICB4OiB3LFxuICAgIHk6IHIsXG4gICAgd2lkdGg6IHYsXG4gICAgaGVpZ2h0OiBnXG4gIH0sIG9lKGQpLCBrKFwiX19hY3RpdmVTdGFnZVBvc2l0aW9uXCIsIGQpO1xufVxuZnVuY3Rpb24gdGUoZSkge1xuICBpZiAoIWUpXG4gICAgcmV0dXJuO1xuICBjb25zdCBvID0gZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSwgdCA9IHtcbiAgICB4OiBvLngsXG4gICAgeTogby55LFxuICAgIHdpZHRoOiBvLndpZHRoLFxuICAgIGhlaWdodDogby5oZWlnaHRcbiAgfTtcbiAgayhcIl9fYWN0aXZlU3RhZ2VQb3NpdGlvblwiLCB0KSwgb2UodCk7XG59XG5mdW5jdGlvbiBoZSgpIHtcbiAgY29uc3QgZSA9IGwoXCJfX2FjdGl2ZVN0YWdlUG9zaXRpb25cIiksIG8gPSBsKFwiX19vdmVybGF5U3ZnXCIpO1xuICBpZiAoIWUpXG4gICAgcmV0dXJuO1xuICBpZiAoIW8pIHtcbiAgICBjb25zb2xlLndhcm4oXCJObyBzdGFnZSBzdmcgZm91bmQuXCIpO1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zdCB0ID0gd2luZG93LmlubmVyV2lkdGgsIGkgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gIG8uc2V0QXR0cmlidXRlKFwidmlld0JveFwiLCBgMCAwICR7dH0gJHtpfWApO1xufVxuZnVuY3Rpb24gZ2UoZSkge1xuICBjb25zdCBvID0gd2UoZSk7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobyksIHJlKG8sICh0KSA9PiB7XG4gICAgdC50YXJnZXQudGFnTmFtZSA9PT0gXCJwYXRoXCIgJiYgTChcIm92ZXJsYXlDbGlja1wiKTtcbiAgfSksIGsoXCJfX292ZXJsYXlTdmdcIiwgbyk7XG59XG5mdW5jdGlvbiBvZShlKSB7XG4gIGNvbnN0IG8gPSBsKFwiX19vdmVybGF5U3ZnXCIpO1xuICBpZiAoIW8pIHtcbiAgICBnZShlKTtcbiAgICByZXR1cm47XG4gIH1cbiAgY29uc3QgdCA9IG8uZmlyc3RFbGVtZW50Q2hpbGQ7XG4gIGlmICgodCA9PSBudWxsID8gdm9pZCAwIDogdC50YWdOYW1lKSAhPT0gXCJwYXRoXCIpXG4gICAgdGhyb3cgbmV3IEVycm9yKFwibm8gcGF0aCBlbGVtZW50IGZvdW5kIGluIHN0YWdlIHN2Z1wiKTtcbiAgdC5zZXRBdHRyaWJ1dGUoXCJkXCIsIGllKGUpKTtcbn1cbmZ1bmN0aW9uIHdlKGUpIHtcbiAgY29uc3QgbyA9IHdpbmRvdy5pbm5lcldpZHRoLCB0ID0gd2luZG93LmlubmVySGVpZ2h0LCBpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgXCJzdmdcIik7XG4gIGkuY2xhc3NMaXN0LmFkZChcImRyaXZlci1vdmVybGF5XCIsIFwiZHJpdmVyLW92ZXJsYXktYW5pbWF0ZWRcIiksIGkuc2V0QXR0cmlidXRlKFwidmlld0JveFwiLCBgMCAwICR7b30gJHt0fWApLCBpLnNldEF0dHJpYnV0ZShcInhtbFNwYWNlXCIsIFwicHJlc2VydmVcIiksIGkuc2V0QXR0cmlidXRlKFwieG1sbnNYbGlua1wiLCBcImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiksIGkuc2V0QXR0cmlidXRlKFwidmVyc2lvblwiLCBcIjEuMVwiKSwgaS5zZXRBdHRyaWJ1dGUoXCJwcmVzZXJ2ZUFzcGVjdFJhdGlvXCIsIFwieE1pbllNaW4gc2xpY2VcIiksIGkuc3R5bGUuZmlsbFJ1bGUgPSBcImV2ZW5vZGRcIiwgaS5zdHlsZS5jbGlwUnVsZSA9IFwiZXZlbm9kZFwiLCBpLnN0eWxlLnN0cm9rZUxpbmVqb2luID0gXCJyb3VuZFwiLCBpLnN0eWxlLnN0cm9rZU1pdGVybGltaXQgPSBcIjJcIiwgaS5zdHlsZS56SW5kZXggPSBcIjEwMDAwXCIsIGkuc3R5bGUucG9zaXRpb24gPSBcImZpeGVkXCIsIGkuc3R5bGUudG9wID0gXCIwXCIsIGkuc3R5bGUubGVmdCA9IFwiMFwiLCBpLnN0eWxlLndpZHRoID0gXCIxMDAlXCIsIGkuc3R5bGUuaGVpZ2h0ID0gXCIxMDAlXCI7XG4gIGNvbnN0IGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcInBhdGhcIik7XG4gIHJldHVybiBkLnNldEF0dHJpYnV0ZShcImRcIiwgaWUoZSkpLCBkLnN0eWxlLmZpbGwgPSBzKFwib3ZlcmxheUNvbG9yXCIpIHx8IFwicmdiKDAsMCwwKVwiLCBkLnN0eWxlLm9wYWNpdHkgPSBgJHtzKFwib3ZlcmxheU9wYWNpdHlcIil9YCwgZC5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJhdXRvXCIsIGQuc3R5bGUuY3Vyc29yID0gXCJhdXRvXCIsIGkuYXBwZW5kQ2hpbGQoZCksIGk7XG59XG5mdW5jdGlvbiBpZShlKSB7XG4gIGNvbnN0IG8gPSB3aW5kb3cuaW5uZXJXaWR0aCwgdCA9IHdpbmRvdy5pbm5lckhlaWdodCwgaSA9IHMoXCJzdGFnZVBhZGRpbmdcIikgfHwgMCwgZCA9IHMoXCJzdGFnZVJhZGl1c1wiKSB8fCAwLCBuID0gZS53aWR0aCArIGkgKiAyLCBmID0gZS5oZWlnaHQgKyBpICogMiwgdyA9IE1hdGgubWluKGQsIG4gLyAyLCBmIC8gMiksIHIgPSBNYXRoLmZsb29yKE1hdGgubWF4KHcsIDApKSwgdiA9IGUueCAtIGkgKyByLCBnID0gZS55IC0gaSwgeSA9IG4gLSByICogMiwgYSA9IGYgLSByICogMjtcbiAgcmV0dXJuIGBNJHtvfSwwTDAsMEwwLCR7dH1MJHtvfSwke3R9TCR7b30sMFpcbiAgICBNJHt2fSwke2d9IGgke3l9IGEke3J9LCR7cn0gMCAwIDEgJHtyfSwke3J9IHYke2F9IGEke3J9LCR7cn0gMCAwIDEgLSR7cn0sJHtyfSBoLSR7eX0gYSR7cn0sJHtyfSAwIDAgMSAtJHtyfSwtJHtyfSB2LSR7YX0gYSR7cn0sJHtyfSAwIDAgMSAke3J9LC0ke3J9IHpgO1xufVxuZnVuY3Rpb24gbWUoKSB7XG4gIGNvbnN0IGUgPSBsKFwiX19vdmVybGF5U3ZnXCIpO1xuICBlICYmIGUucmVtb3ZlKCk7XG59XG5mdW5jdGlvbiB5ZSgpIHtcbiAgY29uc3QgZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZHJpdmVyLWR1bW15LWVsZW1lbnRcIik7XG4gIGlmIChlKVxuICAgIHJldHVybiBlO1xuICBsZXQgbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHJldHVybiBvLmlkID0gXCJkcml2ZXItZHVtbXktZWxlbWVudFwiLCBvLnN0eWxlLndpZHRoID0gXCIwXCIsIG8uc3R5bGUuaGVpZ2h0ID0gXCIwXCIsIG8uc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiLCBvLnN0eWxlLm9wYWNpdHkgPSBcIjBcIiwgby5zdHlsZS5wb3NpdGlvbiA9IFwiZml4ZWRcIiwgby5zdHlsZS50b3AgPSBcIjUwJVwiLCBvLnN0eWxlLmxlZnQgPSBcIjUwJVwiLCBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG8pLCBvO1xufVxuZnVuY3Rpb24gaihlKSB7XG4gIGNvbnN0IHsgZWxlbWVudDogbyB9ID0gZTtcbiAgbGV0IHQgPSB0eXBlb2YgbyA9PSBcImZ1bmN0aW9uXCIgPyBvKCkgOiB0eXBlb2YgbyA9PSBcInN0cmluZ1wiID8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihvKSA6IG87XG4gIHQgfHwgKHQgPSB5ZSgpKSwgYmUodCwgZSk7XG59XG5mdW5jdGlvbiB4ZSgpIHtcbiAgY29uc3QgZSA9IGwoXCJfX2FjdGl2ZUVsZW1lbnRcIiksIG8gPSBsKFwiX19hY3RpdmVTdGVwXCIpO1xuICBlICYmICh0ZShlKSwgaGUoKSwgYWUoZSwgbykpO1xufVxuZnVuY3Rpb24gYmUoZSwgbykge1xuICB2YXIgQztcbiAgY29uc3QgaSA9IERhdGUubm93KCksIGQgPSBsKFwiX19hY3RpdmVTdGVwXCIpLCBuID0gbChcIl9fYWN0aXZlRWxlbWVudFwiKSB8fCBlLCBmID0gIW4gfHwgbiA9PT0gZSwgdyA9IGUuaWQgPT09IFwiZHJpdmVyLWR1bW15LWVsZW1lbnRcIiwgciA9IG4uaWQgPT09IFwiZHJpdmVyLWR1bW15LWVsZW1lbnRcIiwgdiA9IHMoXCJhbmltYXRlXCIpLCBnID0gby5vbkhpZ2hsaWdodFN0YXJ0ZWQgfHwgcyhcIm9uSGlnaGxpZ2h0U3RhcnRlZFwiKSwgeSA9IChvID09IG51bGwgPyB2b2lkIDAgOiBvLm9uSGlnaGxpZ2h0ZWQpIHx8IHMoXCJvbkhpZ2hsaWdodGVkXCIpLCBhID0gKGQgPT0gbnVsbCA/IHZvaWQgMCA6IGQub25EZXNlbGVjdGVkKSB8fCBzKFwib25EZXNlbGVjdGVkXCIpLCBwID0gcygpLCBjID0gbCgpO1xuICAhZiAmJiBhICYmIGEociA/IHZvaWQgMCA6IG4sIGQsIHtcbiAgICBjb25maWc6IHAsXG4gICAgc3RhdGU6IGMsXG4gICAgZHJpdmVyOiBfKClcbiAgfSksIGcgJiYgZyh3ID8gdm9pZCAwIDogZSwgbywge1xuICAgIGNvbmZpZzogcCxcbiAgICBzdGF0ZTogYyxcbiAgICBkcml2ZXI6IF8oKVxuICB9KTtcbiAgY29uc3QgdSA9ICFmICYmIHY7XG4gIGxldCBoID0gITE7XG4gIF9lKCksIGsoXCJwcmV2aW91c1N0ZXBcIiwgZCksIGsoXCJwcmV2aW91c0VsZW1lbnRcIiwgbiksIGsoXCJhY3RpdmVTdGVwXCIsIG8pLCBrKFwiYWN0aXZlRWxlbWVudFwiLCBlKTtcbiAgY29uc3QgbSA9ICgpID0+IHtcbiAgICBpZiAobChcIl9fdHJhbnNpdGlvbkNhbGxiYWNrXCIpICE9PSBtKVxuICAgICAgcmV0dXJuO1xuICAgIGNvbnN0IGIgPSBEYXRlLm5vdygpIC0gaSwgRSA9IDQwMCAtIGIgPD0gNDAwIC8gMjtcbiAgICBvLnBvcG92ZXIgJiYgRSAmJiAhaCAmJiB1ICYmIChRKGUsIG8pLCBoID0gITApLCBzKFwiYW5pbWF0ZVwiKSAmJiBiIDwgNDAwID8gZmUoYiwgNDAwLCBuLCBlKSA6ICh0ZShlKSwgeSAmJiB5KHcgPyB2b2lkIDAgOiBlLCBvLCB7XG4gICAgICBjb25maWc6IHMoKSxcbiAgICAgIHN0YXRlOiBsKCksXG4gICAgICBkcml2ZXI6IF8oKVxuICAgIH0pLCBrKFwiX190cmFuc2l0aW9uQ2FsbGJhY2tcIiwgdm9pZCAwKSwgayhcIl9fcHJldmlvdXNTdGVwXCIsIGQpLCBrKFwiX19wcmV2aW91c0VsZW1lbnRcIiwgbiksIGsoXCJfX2FjdGl2ZVN0ZXBcIiwgbyksIGsoXCJfX2FjdGl2ZUVsZW1lbnRcIiwgZSkpLCB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKG0pO1xuICB9O1xuICBrKFwiX190cmFuc2l0aW9uQ2FsbGJhY2tcIiwgbSksIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUobSksIGVlKGUpLCAhdSAmJiBvLnBvcG92ZXIgJiYgUShlLCBvKSwgbi5jbGFzc0xpc3QucmVtb3ZlKFwiZHJpdmVyLWFjdGl2ZS1lbGVtZW50XCIsIFwiZHJpdmVyLW5vLWludGVyYWN0aW9uXCIpLCBuLnJlbW92ZUF0dHJpYnV0ZShcImFyaWEtaGFzcG9wdXBcIiksIG4ucmVtb3ZlQXR0cmlidXRlKFwiYXJpYS1leHBhbmRlZFwiKSwgbi5yZW1vdmVBdHRyaWJ1dGUoXCJhcmlhLWNvbnRyb2xzXCIpLCAoKEMgPSBvLmRpc2FibGVBY3RpdmVJbnRlcmFjdGlvbikgIT0gbnVsbCA/IEMgOiBzKFwiZGlzYWJsZUFjdGl2ZUludGVyYWN0aW9uXCIpKSAmJiBlLmNsYXNzTGlzdC5hZGQoXCJkcml2ZXItbm8taW50ZXJhY3Rpb25cIiksIGUuY2xhc3NMaXN0LmFkZChcImRyaXZlci1hY3RpdmUtZWxlbWVudFwiKSwgZS5zZXRBdHRyaWJ1dGUoXCJhcmlhLWhhc3BvcHVwXCIsIFwiZGlhbG9nXCIpLCBlLnNldEF0dHJpYnV0ZShcImFyaWEtZXhwYW5kZWRcIiwgXCJ0cnVlXCIpLCBlLnNldEF0dHJpYnV0ZShcImFyaWEtY29udHJvbHNcIiwgXCJkcml2ZXItcG9wb3Zlci1jb250ZW50XCIpO1xufVxuZnVuY3Rpb24gQ2UoKSB7XG4gIHZhciBlO1xuICAoZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZHJpdmVyLWR1bW15LWVsZW1lbnRcIikpID09IG51bGwgfHwgZS5yZW1vdmUoKSwgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5kcml2ZXItYWN0aXZlLWVsZW1lbnRcIikuZm9yRWFjaCgobykgPT4ge1xuICAgIG8uY2xhc3NMaXN0LnJlbW92ZShcImRyaXZlci1hY3RpdmUtZWxlbWVudFwiLCBcImRyaXZlci1uby1pbnRlcmFjdGlvblwiKSwgby5yZW1vdmVBdHRyaWJ1dGUoXCJhcmlhLWhhc3BvcHVwXCIpLCBvLnJlbW92ZUF0dHJpYnV0ZShcImFyaWEtZXhwYW5kZWRcIiksIG8ucmVtb3ZlQXR0cmlidXRlKFwiYXJpYS1jb250cm9sc1wiKTtcbiAgfSk7XG59XG5mdW5jdGlvbiBNKCkge1xuICBjb25zdCBlID0gbChcIl9fcmVzaXplVGltZW91dFwiKTtcbiAgZSAmJiB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUoZSksIGsoXCJfX3Jlc2l6ZVRpbWVvdXRcIiwgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh4ZSkpO1xufVxuZnVuY3Rpb24gUGUoZSkge1xuICB2YXIgcjtcbiAgaWYgKCFsKFwiaXNJbml0aWFsaXplZFwiKSB8fCAhKGUua2V5ID09PSBcIlRhYlwiIHx8IGUua2V5Q29kZSA9PT0gOSkpXG4gICAgcmV0dXJuO1xuICBjb25zdCBpID0gbChcIl9fYWN0aXZlRWxlbWVudFwiKSwgZCA9IChyID0gbChcInBvcG92ZXJcIikpID09IG51bGwgPyB2b2lkIDAgOiByLndyYXBwZXIsIG4gPSBVKFtcbiAgICAuLi5kID8gW2RdIDogW10sXG4gICAgLi4uaSA/IFtpXSA6IFtdXG4gIF0pLCBmID0gblswXSwgdyA9IG5bbi5sZW5ndGggLSAxXTtcbiAgaWYgKGUucHJldmVudERlZmF1bHQoKSwgZS5zaGlmdEtleSkge1xuICAgIGNvbnN0IHYgPSBuW24uaW5kZXhPZihkb2N1bWVudC5hY3RpdmVFbGVtZW50KSAtIDFdIHx8IHc7XG4gICAgdiA9PSBudWxsIHx8IHYuZm9jdXMoKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCB2ID0gbltuLmluZGV4T2YoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkgKyAxXSB8fCBmO1xuICAgIHYgPT0gbnVsbCB8fCB2LmZvY3VzKCk7XG4gIH1cbn1cbmZ1bmN0aW9uIG5lKGUpIHtcbiAgdmFyIHQ7XG4gICgodCA9IHMoXCJhbGxvd0tleWJvYXJkQ29udHJvbFwiKSkgPT0gbnVsbCB8fCB0KSAmJiAoZS5rZXkgPT09IFwiRXNjYXBlXCIgPyBMKFwiZXNjYXBlUHJlc3NcIikgOiBlLmtleSA9PT0gXCJBcnJvd1JpZ2h0XCIgPyBMKFwiYXJyb3dSaWdodFByZXNzXCIpIDogZS5rZXkgPT09IFwiQXJyb3dMZWZ0XCIgJiYgTChcImFycm93TGVmdFByZXNzXCIpKTtcbn1cbmZ1bmN0aW9uIHJlKGUsIG8sIHQpIHtcbiAgY29uc3QgaSA9IChuLCBmKSA9PiB7XG4gICAgY29uc3QgdyA9IG4udGFyZ2V0O1xuICAgIGUuY29udGFpbnModykgJiYgKCghdCB8fCB0KHcpKSAmJiAobi5wcmV2ZW50RGVmYXVsdCgpLCBuLnN0b3BQcm9wYWdhdGlvbigpLCBuLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpKSwgZiA9PSBudWxsIHx8IGYobikpO1xuICB9O1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwicG9pbnRlcmRvd25cIiwgaSwgITApLCBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGksICEwKSwgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJ1cFwiLCBpLCAhMCksIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIGksICEwKSwgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICBcImNsaWNrXCIsXG4gICAgKG4pID0+IHtcbiAgICAgIGkobiwgbyk7XG4gICAgfSxcbiAgICAhMFxuICApO1xufVxuZnVuY3Rpb24ga2UoKSB7XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgbmUsICExKSwgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIFBlLCAhMSksIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIE0pLCB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBNKTtcbn1cbmZ1bmN0aW9uIFNlKCkge1xuICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIG5lKSwgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgTSksIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIE0pO1xufVxuZnVuY3Rpb24gX2UoKSB7XG4gIGNvbnN0IGUgPSBsKFwicG9wb3ZlclwiKTtcbiAgZSAmJiAoZS53cmFwcGVyLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIik7XG59XG5mdW5jdGlvbiBRKGUsIG8pIHtcbiAgdmFyIGIsIFA7XG4gIGxldCB0ID0gbChcInBvcG92ZXJcIik7XG4gIHQgJiYgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh0LndyYXBwZXIpLCB0ID0gTGUoKSwgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0LndyYXBwZXIpO1xuICBjb25zdCB7XG4gICAgdGl0bGU6IGksXG4gICAgZGVzY3JpcHRpb246IGQsXG4gICAgc2hvd0J1dHRvbnM6IG4sXG4gICAgZGlzYWJsZUJ1dHRvbnM6IGYsXG4gICAgc2hvd1Byb2dyZXNzOiB3LFxuICAgIG5leHRCdG5UZXh0OiByID0gcyhcIm5leHRCdG5UZXh0XCIpIHx8IFwiTmV4dCAmcmFycjtcIixcbiAgICBwcmV2QnRuVGV4dDogdiA9IHMoXCJwcmV2QnRuVGV4dFwiKSB8fCBcIiZsYXJyOyBQcmV2aW91c1wiLFxuICAgIHByb2dyZXNzVGV4dDogZyA9IHMoXCJwcm9ncmVzc1RleHRcIikgfHwgXCJ7Y3VycmVudH0gb2Yge3RvdGFsfVwiXG4gIH0gPSBvLnBvcG92ZXIgfHwge307XG4gIHQubmV4dEJ1dHRvbi5pbm5lckhUTUwgPSByLCB0LnByZXZpb3VzQnV0dG9uLmlubmVySFRNTCA9IHYsIHQucHJvZ3Jlc3MuaW5uZXJIVE1MID0gZywgaSA/ICh0LnRpdGxlLmlubmVySFRNTCA9IGksIHQudGl0bGUuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIikgOiB0LnRpdGxlLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIiwgZCA/ICh0LmRlc2NyaXB0aW9uLmlubmVySFRNTCA9IGQsIHQuZGVzY3JpcHRpb24uc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIikgOiB0LmRlc2NyaXB0aW9uLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgY29uc3QgeSA9IG4gfHwgcyhcInNob3dCdXR0b25zXCIpLCBhID0gdyB8fCBzKFwic2hvd1Byb2dyZXNzXCIpIHx8ICExLCBwID0gKHkgPT0gbnVsbCA/IHZvaWQgMCA6IHkuaW5jbHVkZXMoXCJuZXh0XCIpKSB8fCAoeSA9PSBudWxsID8gdm9pZCAwIDogeS5pbmNsdWRlcyhcInByZXZpb3VzXCIpKSB8fCBhO1xuICB0LmNsb3NlQnV0dG9uLnN0eWxlLmRpc3BsYXkgPSB5LmluY2x1ZGVzKFwiY2xvc2VcIikgPyBcImJsb2NrXCIgOiBcIm5vbmVcIiwgcCA/ICh0LmZvb3Rlci5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCIsIHQucHJvZ3Jlc3Muc3R5bGUuZGlzcGxheSA9IGEgPyBcImJsb2NrXCIgOiBcIm5vbmVcIiwgdC5uZXh0QnV0dG9uLnN0eWxlLmRpc3BsYXkgPSB5LmluY2x1ZGVzKFwibmV4dFwiKSA/IFwiYmxvY2tcIiA6IFwibm9uZVwiLCB0LnByZXZpb3VzQnV0dG9uLnN0eWxlLmRpc3BsYXkgPSB5LmluY2x1ZGVzKFwicHJldmlvdXNcIikgPyBcImJsb2NrXCIgOiBcIm5vbmVcIikgOiB0LmZvb3Rlci5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gIGNvbnN0IGMgPSBmIHx8IHMoXCJkaXNhYmxlQnV0dG9uc1wiKSB8fCBbXTtcbiAgYyAhPSBudWxsICYmIGMuaW5jbHVkZXMoXCJuZXh0XCIpICYmICh0Lm5leHRCdXR0b24uZGlzYWJsZWQgPSAhMCwgdC5uZXh0QnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJkcml2ZXItcG9wb3Zlci1idG4tZGlzYWJsZWRcIikpLCBjICE9IG51bGwgJiYgYy5pbmNsdWRlcyhcInByZXZpb3VzXCIpICYmICh0LnByZXZpb3VzQnV0dG9uLmRpc2FibGVkID0gITAsIHQucHJldmlvdXNCdXR0b24uY2xhc3NMaXN0LmFkZChcImRyaXZlci1wb3BvdmVyLWJ0bi1kaXNhYmxlZFwiKSksIGMgIT0gbnVsbCAmJiBjLmluY2x1ZGVzKFwiY2xvc2VcIikgJiYgKHQuY2xvc2VCdXR0b24uZGlzYWJsZWQgPSAhMCwgdC5jbG9zZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiZHJpdmVyLXBvcG92ZXItYnRuLWRpc2FibGVkXCIpKTtcbiAgY29uc3QgdSA9IHQud3JhcHBlcjtcbiAgdS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiLCB1LnN0eWxlLmxlZnQgPSBcIlwiLCB1LnN0eWxlLnRvcCA9IFwiXCIsIHUuc3R5bGUuYm90dG9tID0gXCJcIiwgdS5zdHlsZS5yaWdodCA9IFwiXCIsIHUuaWQgPSBcImRyaXZlci1wb3BvdmVyLWNvbnRlbnRcIiwgdS5zZXRBdHRyaWJ1dGUoXCJyb2xlXCIsIFwiZGlhbG9nXCIpLCB1LnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxsZWRieVwiLCBcImRyaXZlci1wb3BvdmVyLXRpdGxlXCIpLCB1LnNldEF0dHJpYnV0ZShcImFyaWEtZGVzY3JpYmVkYnlcIiwgXCJkcml2ZXItcG9wb3Zlci1kZXNjcmlwdGlvblwiKTtcbiAgY29uc3QgaCA9IHQuYXJyb3c7XG4gIGguY2xhc3NOYW1lID0gXCJkcml2ZXItcG9wb3Zlci1hcnJvd1wiO1xuICBjb25zdCBtID0gKChiID0gby5wb3BvdmVyKSA9PSBudWxsID8gdm9pZCAwIDogYi5wb3BvdmVyQ2xhc3MpIHx8IHMoXCJwb3BvdmVyQ2xhc3NcIikgfHwgXCJcIjtcbiAgdS5jbGFzc05hbWUgPSBgZHJpdmVyLXBvcG92ZXIgJHttfWAudHJpbSgpLCByZShcbiAgICB0LndyYXBwZXIsXG4gICAgKEUpID0+IHtcbiAgICAgIHZhciBCLCBSLCBXO1xuICAgICAgY29uc3QgVCA9IEUudGFyZ2V0LCBBID0gKChCID0gby5wb3BvdmVyKSA9PSBudWxsID8gdm9pZCAwIDogQi5vbk5leHRDbGljaykgfHwgcyhcIm9uTmV4dENsaWNrXCIpLCBIID0gKChSID0gby5wb3BvdmVyKSA9PSBudWxsID8gdm9pZCAwIDogUi5vblByZXZDbGljaykgfHwgcyhcIm9uUHJldkNsaWNrXCIpLCAkID0gKChXID0gby5wb3BvdmVyKSA9PSBudWxsID8gdm9pZCAwIDogVy5vbkNsb3NlQ2xpY2spIHx8IHMoXCJvbkNsb3NlQ2xpY2tcIik7XG4gICAgICBpZiAoVC5jbG9zZXN0KFwiLmRyaXZlci1wb3BvdmVyLW5leHQtYnRuXCIpKVxuICAgICAgICByZXR1cm4gQSA/IEEoZSwgbywge1xuICAgICAgICAgIGNvbmZpZzogcygpLFxuICAgICAgICAgIHN0YXRlOiBsKCksXG4gICAgICAgICAgZHJpdmVyOiBfKClcbiAgICAgICAgfSkgOiBMKFwibmV4dENsaWNrXCIpO1xuICAgICAgaWYgKFQuY2xvc2VzdChcIi5kcml2ZXItcG9wb3Zlci1wcmV2LWJ0blwiKSlcbiAgICAgICAgcmV0dXJuIEggPyBIKGUsIG8sIHtcbiAgICAgICAgICBjb25maWc6IHMoKSxcbiAgICAgICAgICBzdGF0ZTogbCgpLFxuICAgICAgICAgIGRyaXZlcjogXygpXG4gICAgICAgIH0pIDogTChcInByZXZDbGlja1wiKTtcbiAgICAgIGlmIChULmNsb3Nlc3QoXCIuZHJpdmVyLXBvcG92ZXItY2xvc2UtYnRuXCIpKVxuICAgICAgICByZXR1cm4gJCA/ICQoZSwgbywge1xuICAgICAgICAgIGNvbmZpZzogcygpLFxuICAgICAgICAgIHN0YXRlOiBsKCksXG4gICAgICAgICAgZHJpdmVyOiBfKClcbiAgICAgICAgfSkgOiBMKFwiY2xvc2VDbGlja1wiKTtcbiAgICB9LFxuICAgIChFKSA9PiAhKHQgIT0gbnVsbCAmJiB0LmRlc2NyaXB0aW9uLmNvbnRhaW5zKEUpKSAmJiAhKHQgIT0gbnVsbCAmJiB0LnRpdGxlLmNvbnRhaW5zKEUpKSAmJiB0eXBlb2YgRS5jbGFzc05hbWUgPT0gXCJzdHJpbmdcIiAmJiBFLmNsYXNzTmFtZS5pbmNsdWRlcyhcImRyaXZlci1wb3BvdmVyXCIpXG4gICksIGsoXCJwb3BvdmVyXCIsIHQpO1xuICBjb25zdCB4ID0gKChQID0gby5wb3BvdmVyKSA9PSBudWxsID8gdm9pZCAwIDogUC5vblBvcG92ZXJSZW5kZXIpIHx8IHMoXCJvblBvcG92ZXJSZW5kZXJcIik7XG4gIHggJiYgeCh0LCB7XG4gICAgY29uZmlnOiBzKCksXG4gICAgc3RhdGU6IGwoKSxcbiAgICBkcml2ZXI6IF8oKVxuICB9KSwgYWUoZSwgbyksIGVlKHUpO1xuICBjb25zdCBDID0gZS5jbGFzc0xpc3QuY29udGFpbnMoXCJkcml2ZXItZHVtbXktZWxlbWVudFwiKSwgUyA9IFUoW3UsIC4uLkMgPyBbXSA6IFtlXV0pO1xuICBTLmxlbmd0aCA+IDAgJiYgU1swXS5mb2N1cygpO1xufVxuZnVuY3Rpb24gc2UoKSB7XG4gIGNvbnN0IGUgPSBsKFwicG9wb3ZlclwiKTtcbiAgaWYgKCEoZSAhPSBudWxsICYmIGUud3JhcHBlcikpXG4gICAgcmV0dXJuO1xuICBjb25zdCBvID0gZS53cmFwcGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLCB0ID0gcyhcInN0YWdlUGFkZGluZ1wiKSB8fCAwLCBpID0gcyhcInBvcG92ZXJPZmZzZXRcIikgfHwgMDtcbiAgcmV0dXJuIHtcbiAgICB3aWR0aDogby53aWR0aCArIHQgKyBpLFxuICAgIGhlaWdodDogby5oZWlnaHQgKyB0ICsgaSxcbiAgICByZWFsV2lkdGg6IG8ud2lkdGgsXG4gICAgcmVhbEhlaWdodDogby5oZWlnaHRcbiAgfTtcbn1cbmZ1bmN0aW9uIFooZSwgbykge1xuICBjb25zdCB7IGVsZW1lbnREaW1lbnNpb25zOiB0LCBwb3BvdmVyRGltZW5zaW9uczogaSwgcG9wb3ZlclBhZGRpbmc6IGQsIHBvcG92ZXJBcnJvd0RpbWVuc2lvbnM6IG4gfSA9IG87XG4gIHJldHVybiBlID09PSBcInN0YXJ0XCIgPyBNYXRoLm1heChcbiAgICBNYXRoLm1pbihcbiAgICAgIHQudG9wIC0gZCxcbiAgICAgIHdpbmRvdy5pbm5lckhlaWdodCAtIGkucmVhbEhlaWdodCAtIG4ud2lkdGhcbiAgICApLFxuICAgIG4ud2lkdGhcbiAgKSA6IGUgPT09IFwiZW5kXCIgPyBNYXRoLm1heChcbiAgICBNYXRoLm1pbihcbiAgICAgIHQudG9wIC0gKGkgPT0gbnVsbCA/IHZvaWQgMCA6IGkucmVhbEhlaWdodCkgKyB0LmhlaWdodCArIGQsXG4gICAgICB3aW5kb3cuaW5uZXJIZWlnaHQgLSAoaSA9PSBudWxsID8gdm9pZCAwIDogaS5yZWFsSGVpZ2h0KSAtIG4ud2lkdGhcbiAgICApLFxuICAgIG4ud2lkdGhcbiAgKSA6IGUgPT09IFwiY2VudGVyXCIgPyBNYXRoLm1heChcbiAgICBNYXRoLm1pbihcbiAgICAgIHQudG9wICsgdC5oZWlnaHQgLyAyIC0gKGkgPT0gbnVsbCA/IHZvaWQgMCA6IGkucmVhbEhlaWdodCkgLyAyLFxuICAgICAgd2luZG93LmlubmVySGVpZ2h0IC0gKGkgPT0gbnVsbCA/IHZvaWQgMCA6IGkucmVhbEhlaWdodCkgLSBuLndpZHRoXG4gICAgKSxcbiAgICBuLndpZHRoXG4gICkgOiAwO1xufVxuZnVuY3Rpb24gRyhlLCBvKSB7XG4gIGNvbnN0IHsgZWxlbWVudERpbWVuc2lvbnM6IHQsIHBvcG92ZXJEaW1lbnNpb25zOiBpLCBwb3BvdmVyUGFkZGluZzogZCwgcG9wb3ZlckFycm93RGltZW5zaW9uczogbiB9ID0gbztcbiAgcmV0dXJuIGUgPT09IFwic3RhcnRcIiA/IE1hdGgubWF4KFxuICAgIE1hdGgubWluKFxuICAgICAgdC5sZWZ0IC0gZCxcbiAgICAgIHdpbmRvdy5pbm5lcldpZHRoIC0gaS5yZWFsV2lkdGggLSBuLndpZHRoXG4gICAgKSxcbiAgICBuLndpZHRoXG4gICkgOiBlID09PSBcImVuZFwiID8gTWF0aC5tYXgoXG4gICAgTWF0aC5taW4oXG4gICAgICB0LmxlZnQgLSAoaSA9PSBudWxsID8gdm9pZCAwIDogaS5yZWFsV2lkdGgpICsgdC53aWR0aCArIGQsXG4gICAgICB3aW5kb3cuaW5uZXJXaWR0aCAtIChpID09IG51bGwgPyB2b2lkIDAgOiBpLnJlYWxXaWR0aCkgLSBuLndpZHRoXG4gICAgKSxcbiAgICBuLndpZHRoXG4gICkgOiBlID09PSBcImNlbnRlclwiID8gTWF0aC5tYXgoXG4gICAgTWF0aC5taW4oXG4gICAgICB0LmxlZnQgKyB0LndpZHRoIC8gMiAtIChpID09IG51bGwgPyB2b2lkIDAgOiBpLnJlYWxXaWR0aCkgLyAyLFxuICAgICAgd2luZG93LmlubmVyV2lkdGggLSAoaSA9PSBudWxsID8gdm9pZCAwIDogaS5yZWFsV2lkdGgpIC0gbi53aWR0aFxuICAgICksXG4gICAgbi53aWR0aFxuICApIDogMDtcbn1cbmZ1bmN0aW9uIGFlKGUsIG8pIHtcbiAgY29uc3QgdCA9IGwoXCJwb3BvdmVyXCIpO1xuICBpZiAoIXQpXG4gICAgcmV0dXJuO1xuICBjb25zdCB7IGFsaWduOiBpID0gXCJzdGFydFwiLCBzaWRlOiBkID0gXCJsZWZ0XCIgfSA9IChvID09IG51bGwgPyB2b2lkIDAgOiBvLnBvcG92ZXIpIHx8IHt9LCBuID0gaSwgZiA9IGUuaWQgPT09IFwiZHJpdmVyLWR1bW15LWVsZW1lbnRcIiA/IFwib3ZlclwiIDogZCwgdyA9IHMoXCJzdGFnZVBhZGRpbmdcIikgfHwgMCwgciA9IHNlKCksIHYgPSB0LmFycm93LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLCBnID0gZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSwgeSA9IGcudG9wIC0gci5oZWlnaHQ7XG4gIGxldCBhID0geSA+PSAwO1xuICBjb25zdCBwID0gd2luZG93LmlubmVySGVpZ2h0IC0gKGcuYm90dG9tICsgci5oZWlnaHQpO1xuICBsZXQgYyA9IHAgPj0gMDtcbiAgY29uc3QgdSA9IGcubGVmdCAtIHIud2lkdGg7XG4gIGxldCBoID0gdSA+PSAwO1xuICBjb25zdCBtID0gd2luZG93LmlubmVyV2lkdGggLSAoZy5yaWdodCArIHIud2lkdGgpO1xuICBsZXQgeCA9IG0gPj0gMDtcbiAgY29uc3QgQyA9ICFhICYmICFjICYmICFoICYmICF4O1xuICBsZXQgUyA9IGY7XG4gIGlmIChmID09PSBcInRvcFwiICYmIGEgPyB4ID0gaCA9IGMgPSAhMSA6IGYgPT09IFwiYm90dG9tXCIgJiYgYyA/IHggPSBoID0gYSA9ICExIDogZiA9PT0gXCJsZWZ0XCIgJiYgaCA/IHggPSBhID0gYyA9ICExIDogZiA9PT0gXCJyaWdodFwiICYmIHggJiYgKGggPSBhID0gYyA9ICExKSwgZiA9PT0gXCJvdmVyXCIpIHtcbiAgICBjb25zdCBiID0gd2luZG93LmlubmVyV2lkdGggLyAyIC0gci5yZWFsV2lkdGggLyAyLCBQID0gd2luZG93LmlubmVySGVpZ2h0IC8gMiAtIHIucmVhbEhlaWdodCAvIDI7XG4gICAgdC53cmFwcGVyLnN0eWxlLmxlZnQgPSBgJHtifXB4YCwgdC53cmFwcGVyLnN0eWxlLnJpZ2h0ID0gXCJhdXRvXCIsIHQud3JhcHBlci5zdHlsZS50b3AgPSBgJHtQfXB4YCwgdC53cmFwcGVyLnN0eWxlLmJvdHRvbSA9IFwiYXV0b1wiO1xuICB9IGVsc2UgaWYgKEMpIHtcbiAgICBjb25zdCBiID0gd2luZG93LmlubmVyV2lkdGggLyAyIC0gKHIgPT0gbnVsbCA/IHZvaWQgMCA6IHIucmVhbFdpZHRoKSAvIDIsIFAgPSAxMDtcbiAgICB0LndyYXBwZXIuc3R5bGUubGVmdCA9IGAke2J9cHhgLCB0LndyYXBwZXIuc3R5bGUucmlnaHQgPSBcImF1dG9cIiwgdC53cmFwcGVyLnN0eWxlLmJvdHRvbSA9IGAke1B9cHhgLCB0LndyYXBwZXIuc3R5bGUudG9wID0gXCJhdXRvXCI7XG4gIH0gZWxzZSBpZiAoaCkge1xuICAgIGNvbnN0IGIgPSBNYXRoLm1pbihcbiAgICAgIHUsXG4gICAgICB3aW5kb3cuaW5uZXJXaWR0aCAtIChyID09IG51bGwgPyB2b2lkIDAgOiByLnJlYWxXaWR0aCkgLSB2LndpZHRoXG4gICAgKSwgUCA9IFoobiwge1xuICAgICAgZWxlbWVudERpbWVuc2lvbnM6IGcsXG4gICAgICBwb3BvdmVyRGltZW5zaW9uczogcixcbiAgICAgIHBvcG92ZXJQYWRkaW5nOiB3LFxuICAgICAgcG9wb3ZlckFycm93RGltZW5zaW9uczogdlxuICAgIH0pO1xuICAgIHQud3JhcHBlci5zdHlsZS5sZWZ0ID0gYCR7Yn1weGAsIHQud3JhcHBlci5zdHlsZS50b3AgPSBgJHtQfXB4YCwgdC53cmFwcGVyLnN0eWxlLmJvdHRvbSA9IFwiYXV0b1wiLCB0LndyYXBwZXIuc3R5bGUucmlnaHQgPSBcImF1dG9cIiwgUyA9IFwibGVmdFwiO1xuICB9IGVsc2UgaWYgKHgpIHtcbiAgICBjb25zdCBiID0gTWF0aC5taW4oXG4gICAgICBtLFxuICAgICAgd2luZG93LmlubmVyV2lkdGggLSAociA9PSBudWxsID8gdm9pZCAwIDogci5yZWFsV2lkdGgpIC0gdi53aWR0aFxuICAgICksIFAgPSBaKG4sIHtcbiAgICAgIGVsZW1lbnREaW1lbnNpb25zOiBnLFxuICAgICAgcG9wb3ZlckRpbWVuc2lvbnM6IHIsXG4gICAgICBwb3BvdmVyUGFkZGluZzogdyxcbiAgICAgIHBvcG92ZXJBcnJvd0RpbWVuc2lvbnM6IHZcbiAgICB9KTtcbiAgICB0LndyYXBwZXIuc3R5bGUucmlnaHQgPSBgJHtifXB4YCwgdC53cmFwcGVyLnN0eWxlLnRvcCA9IGAke1B9cHhgLCB0LndyYXBwZXIuc3R5bGUuYm90dG9tID0gXCJhdXRvXCIsIHQud3JhcHBlci5zdHlsZS5sZWZ0ID0gXCJhdXRvXCIsIFMgPSBcInJpZ2h0XCI7XG4gIH0gZWxzZSBpZiAoYSkge1xuICAgIGNvbnN0IGIgPSBNYXRoLm1pbihcbiAgICAgIHksXG4gICAgICB3aW5kb3cuaW5uZXJIZWlnaHQgLSByLnJlYWxIZWlnaHQgLSB2LndpZHRoXG4gICAgKTtcbiAgICBsZXQgUCA9IEcobiwge1xuICAgICAgZWxlbWVudERpbWVuc2lvbnM6IGcsXG4gICAgICBwb3BvdmVyRGltZW5zaW9uczogcixcbiAgICAgIHBvcG92ZXJQYWRkaW5nOiB3LFxuICAgICAgcG9wb3ZlckFycm93RGltZW5zaW9uczogdlxuICAgIH0pO1xuICAgIHQud3JhcHBlci5zdHlsZS50b3AgPSBgJHtifXB4YCwgdC53cmFwcGVyLnN0eWxlLmxlZnQgPSBgJHtQfXB4YCwgdC53cmFwcGVyLnN0eWxlLmJvdHRvbSA9IFwiYXV0b1wiLCB0LndyYXBwZXIuc3R5bGUucmlnaHQgPSBcImF1dG9cIiwgUyA9IFwidG9wXCI7XG4gIH0gZWxzZSBpZiAoYykge1xuICAgIGNvbnN0IGIgPSBNYXRoLm1pbihcbiAgICAgIHAsXG4gICAgICB3aW5kb3cuaW5uZXJIZWlnaHQgLSAociA9PSBudWxsID8gdm9pZCAwIDogci5yZWFsSGVpZ2h0KSAtIHYud2lkdGhcbiAgICApO1xuICAgIGxldCBQID0gRyhuLCB7XG4gICAgICBlbGVtZW50RGltZW5zaW9uczogZyxcbiAgICAgIHBvcG92ZXJEaW1lbnNpb25zOiByLFxuICAgICAgcG9wb3ZlclBhZGRpbmc6IHcsXG4gICAgICBwb3BvdmVyQXJyb3dEaW1lbnNpb25zOiB2XG4gICAgfSk7XG4gICAgdC53cmFwcGVyLnN0eWxlLmxlZnQgPSBgJHtQfXB4YCwgdC53cmFwcGVyLnN0eWxlLmJvdHRvbSA9IGAke2J9cHhgLCB0LndyYXBwZXIuc3R5bGUudG9wID0gXCJhdXRvXCIsIHQud3JhcHBlci5zdHlsZS5yaWdodCA9IFwiYXV0b1wiLCBTID0gXCJib3R0b21cIjtcbiAgfVxuICBDID8gdC5hcnJvdy5jbGFzc0xpc3QuYWRkKFwiZHJpdmVyLXBvcG92ZXItYXJyb3ctbm9uZVwiKSA6IEVlKG4sIFMsIGUpO1xufVxuZnVuY3Rpb24gRWUoZSwgbywgdCkge1xuICBjb25zdCBpID0gbChcInBvcG92ZXJcIik7XG4gIGlmICghaSlcbiAgICByZXR1cm47XG4gIGNvbnN0IGQgPSB0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLCBuID0gc2UoKSwgZiA9IGkuYXJyb3csIHcgPSBuLndpZHRoLCByID0gd2luZG93LmlubmVyV2lkdGgsIHYgPSBkLndpZHRoLCBnID0gZC5sZWZ0LCB5ID0gbi5oZWlnaHQsIGEgPSB3aW5kb3cuaW5uZXJIZWlnaHQsIHAgPSBkLnRvcCwgYyA9IGQuaGVpZ2h0O1xuICBmLmNsYXNzTmFtZSA9IFwiZHJpdmVyLXBvcG92ZXItYXJyb3dcIjtcbiAgbGV0IHUgPSBvLCBoID0gZTtcbiAgaWYgKG8gPT09IFwidG9wXCIgPyAoZyArIHYgPD0gMCA/ICh1ID0gXCJyaWdodFwiLCBoID0gXCJlbmRcIikgOiBnICsgdiAtIHcgPD0gMCAmJiAodSA9IFwidG9wXCIsIGggPSBcInN0YXJ0XCIpLCBnID49IHIgPyAodSA9IFwibGVmdFwiLCBoID0gXCJlbmRcIikgOiBnICsgdyA+PSByICYmICh1ID0gXCJ0b3BcIiwgaCA9IFwiZW5kXCIpKSA6IG8gPT09IFwiYm90dG9tXCIgPyAoZyArIHYgPD0gMCA/ICh1ID0gXCJyaWdodFwiLCBoID0gXCJzdGFydFwiKSA6IGcgKyB2IC0gdyA8PSAwICYmICh1ID0gXCJib3R0b21cIiwgaCA9IFwic3RhcnRcIiksIGcgPj0gciA/ICh1ID0gXCJsZWZ0XCIsIGggPSBcInN0YXJ0XCIpIDogZyArIHcgPj0gciAmJiAodSA9IFwiYm90dG9tXCIsIGggPSBcImVuZFwiKSkgOiBvID09PSBcImxlZnRcIiA/IChwICsgYyA8PSAwID8gKHUgPSBcImJvdHRvbVwiLCBoID0gXCJlbmRcIikgOiBwICsgYyAtIHkgPD0gMCAmJiAodSA9IFwibGVmdFwiLCBoID0gXCJzdGFydFwiKSwgcCA+PSBhID8gKHUgPSBcInRvcFwiLCBoID0gXCJlbmRcIikgOiBwICsgeSA+PSBhICYmICh1ID0gXCJsZWZ0XCIsIGggPSBcImVuZFwiKSkgOiBvID09PSBcInJpZ2h0XCIgJiYgKHAgKyBjIDw9IDAgPyAodSA9IFwiYm90dG9tXCIsIGggPSBcInN0YXJ0XCIpIDogcCArIGMgLSB5IDw9IDAgJiYgKHUgPSBcInJpZ2h0XCIsIGggPSBcInN0YXJ0XCIpLCBwID49IGEgPyAodSA9IFwidG9wXCIsIGggPSBcInN0YXJ0XCIpIDogcCArIHkgPj0gYSAmJiAodSA9IFwicmlnaHRcIiwgaCA9IFwiZW5kXCIpKSwgIXUpXG4gICAgZi5jbGFzc0xpc3QuYWRkKFwiZHJpdmVyLXBvcG92ZXItYXJyb3ctbm9uZVwiKTtcbiAgZWxzZSB7XG4gICAgZi5jbGFzc0xpc3QuYWRkKGBkcml2ZXItcG9wb3Zlci1hcnJvdy1zaWRlLSR7dX1gKSwgZi5jbGFzc0xpc3QuYWRkKGBkcml2ZXItcG9wb3Zlci1hcnJvdy1hbGlnbi0ke2h9YCk7XG4gICAgY29uc3QgbSA9IHQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksIHggPSBmLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLCBDID0gcyhcInN0YWdlUGFkZGluZ1wiKSB8fCAwLCBTID0gbS5sZWZ0IC0gQyA8IHdpbmRvdy5pbm5lcldpZHRoICYmIG0ucmlnaHQgKyBDID4gMCAmJiBtLnRvcCAtIEMgPCB3aW5kb3cuaW5uZXJIZWlnaHQgJiYgbS5ib3R0b20gKyBDID4gMDtcbiAgICBvID09PSBcImJvdHRvbVwiICYmIFMgJiYgKHgueCA+IG0ueCAmJiB4LnggKyB4LndpZHRoIDwgbS54ICsgbS53aWR0aCA/IGkud3JhcHBlci5zdHlsZS50cmFuc2Zvcm0gPSBcInRyYW5zbGF0ZVkoMClcIiA6IChmLmNsYXNzTGlzdC5yZW1vdmUoYGRyaXZlci1wb3BvdmVyLWFycm93LWFsaWduLSR7aH1gKSwgZi5jbGFzc0xpc3QuYWRkKFwiZHJpdmVyLXBvcG92ZXItYXJyb3ctbm9uZVwiKSwgaS53cmFwcGVyLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVZKC0ke0MgLyAyfXB4KWApKTtcbiAgfVxufVxuZnVuY3Rpb24gTGUoKSB7XG4gIGNvbnN0IGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBlLmNsYXNzTGlzdC5hZGQoXCJkcml2ZXItcG9wb3ZlclwiKTtcbiAgY29uc3QgbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIG8uY2xhc3NMaXN0LmFkZChcImRyaXZlci1wb3BvdmVyLWFycm93XCIpO1xuICBjb25zdCB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImhlYWRlclwiKTtcbiAgdC5pZCA9IFwiZHJpdmVyLXBvcG92ZXItdGl0bGVcIiwgdC5jbGFzc0xpc3QuYWRkKFwiZHJpdmVyLXBvcG92ZXItdGl0bGVcIiksIHQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiLCB0LmlubmVyVGV4dCA9IFwiUG9wb3ZlciBUaXRsZVwiO1xuICBjb25zdCBpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgaS5pZCA9IFwiZHJpdmVyLXBvcG92ZXItZGVzY3JpcHRpb25cIiwgaS5jbGFzc0xpc3QuYWRkKFwiZHJpdmVyLXBvcG92ZXItZGVzY3JpcHRpb25cIiksIGkuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiLCBpLmlubmVyVGV4dCA9IFwiUG9wb3ZlciBkZXNjcmlwdGlvbiBpcyBoZXJlXCI7XG4gIGNvbnN0IGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICBkLnR5cGUgPSBcImJ1dHRvblwiLCBkLmNsYXNzTGlzdC5hZGQoXCJkcml2ZXItcG9wb3Zlci1jbG9zZS1idG5cIiksIGQuc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCBcIkNsb3NlXCIpLCBkLmlubmVySFRNTCA9IFwiJnRpbWVzO1wiO1xuICBjb25zdCBuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvb3RlclwiKTtcbiAgbi5jbGFzc0xpc3QuYWRkKFwiZHJpdmVyLXBvcG92ZXItZm9vdGVyXCIpO1xuICBjb25zdCBmID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gIGYuY2xhc3NMaXN0LmFkZChcImRyaXZlci1wb3BvdmVyLXByb2dyZXNzLXRleHRcIiksIGYuaW5uZXJUZXh0ID0gXCJcIjtcbiAgY29uc3QgdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICB3LmNsYXNzTGlzdC5hZGQoXCJkcml2ZXItcG9wb3Zlci1uYXZpZ2F0aW9uLWJ0bnNcIik7XG4gIGNvbnN0IHIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICByLnR5cGUgPSBcImJ1dHRvblwiLCByLmNsYXNzTGlzdC5hZGQoXCJkcml2ZXItcG9wb3Zlci1wcmV2LWJ0blwiKSwgci5pbm5lckhUTUwgPSBcIiZsYXJyOyBQcmV2aW91c1wiO1xuICBjb25zdCB2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgcmV0dXJuIHYudHlwZSA9IFwiYnV0dG9uXCIsIHYuY2xhc3NMaXN0LmFkZChcImRyaXZlci1wb3BvdmVyLW5leHQtYnRuXCIpLCB2LmlubmVySFRNTCA9IFwiTmV4dCAmcmFycjtcIiwgdy5hcHBlbmRDaGlsZChyKSwgdy5hcHBlbmRDaGlsZCh2KSwgbi5hcHBlbmRDaGlsZChmKSwgbi5hcHBlbmRDaGlsZCh3KSwgZS5hcHBlbmRDaGlsZChkKSwgZS5hcHBlbmRDaGlsZChvKSwgZS5hcHBlbmRDaGlsZCh0KSwgZS5hcHBlbmRDaGlsZChpKSwgZS5hcHBlbmRDaGlsZChuKSwge1xuICAgIHdyYXBwZXI6IGUsXG4gICAgYXJyb3c6IG8sXG4gICAgdGl0bGU6IHQsXG4gICAgZGVzY3JpcHRpb246IGksXG4gICAgZm9vdGVyOiBuLFxuICAgIHByZXZpb3VzQnV0dG9uOiByLFxuICAgIG5leHRCdXR0b246IHYsXG4gICAgY2xvc2VCdXR0b246IGQsXG4gICAgZm9vdGVyQnV0dG9uczogdyxcbiAgICBwcm9ncmVzczogZlxuICB9O1xufVxuZnVuY3Rpb24gVGUoKSB7XG4gIHZhciBvO1xuICBjb25zdCBlID0gbChcInBvcG92ZXJcIik7XG4gIGUgJiYgKChvID0gZS53cmFwcGVyLnBhcmVudEVsZW1lbnQpID09IG51bGwgfHwgby5yZW1vdmVDaGlsZChlLndyYXBwZXIpKTtcbn1cbmZ1bmN0aW9uIEFlKGUgPSB7fSkge1xuICBGKGUpO1xuICBmdW5jdGlvbiBvKCkge1xuICAgIHMoXCJhbGxvd0Nsb3NlXCIpICYmIGcoKTtcbiAgfVxuICBmdW5jdGlvbiB0KCkge1xuICAgIGNvbnN0IGEgPSBzKFwib3ZlcmxheUNsaWNrQmVoYXZpb3JcIik7XG4gICAgaWYgKHMoXCJhbGxvd0Nsb3NlXCIpICYmIGEgPT09IFwiY2xvc2VcIikge1xuICAgICAgZygpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBhID09PSBcIm5leHRTdGVwXCIgJiYgaSgpO1xuICB9XG4gIGZ1bmN0aW9uIGkoKSB7XG4gICAgY29uc3QgYSA9IGwoXCJhY3RpdmVJbmRleFwiKSwgcCA9IHMoXCJzdGVwc1wiKSB8fCBbXTtcbiAgICBpZiAodHlwZW9mIGEgPT0gXCJ1bmRlZmluZWRcIilcbiAgICAgIHJldHVybjtcbiAgICBjb25zdCBjID0gYSArIDE7XG4gICAgcFtjXSA/IHYoYykgOiBnKCk7XG4gIH1cbiAgZnVuY3Rpb24gZCgpIHtcbiAgICBjb25zdCBhID0gbChcImFjdGl2ZUluZGV4XCIpLCBwID0gcyhcInN0ZXBzXCIpIHx8IFtdO1xuICAgIGlmICh0eXBlb2YgYSA9PSBcInVuZGVmaW5lZFwiKVxuICAgICAgcmV0dXJuO1xuICAgIGNvbnN0IGMgPSBhIC0gMTtcbiAgICBwW2NdID8gdihjKSA6IGcoKTtcbiAgfVxuICBmdW5jdGlvbiBuKGEpIHtcbiAgICAocyhcInN0ZXBzXCIpIHx8IFtdKVthXSA/IHYoYSkgOiBnKCk7XG4gIH1cbiAgZnVuY3Rpb24gZigpIHtcbiAgICB2YXIgeDtcbiAgICBpZiAobChcIl9fdHJhbnNpdGlvbkNhbGxiYWNrXCIpKVxuICAgICAgcmV0dXJuO1xuICAgIGNvbnN0IHAgPSBsKFwiYWN0aXZlSW5kZXhcIiksIGMgPSBsKFwiX19hY3RpdmVTdGVwXCIpLCB1ID0gbChcIl9fYWN0aXZlRWxlbWVudFwiKTtcbiAgICBpZiAodHlwZW9mIHAgPT0gXCJ1bmRlZmluZWRcIiB8fCB0eXBlb2YgYyA9PSBcInVuZGVmaW5lZFwiIHx8IHR5cGVvZiBsKFwiYWN0aXZlSW5kZXhcIikgPT0gXCJ1bmRlZmluZWRcIilcbiAgICAgIHJldHVybjtcbiAgICBjb25zdCBtID0gKCh4ID0gYy5wb3BvdmVyKSA9PSBudWxsID8gdm9pZCAwIDogeC5vblByZXZDbGljaykgfHwgcyhcIm9uUHJldkNsaWNrXCIpO1xuICAgIGlmIChtKVxuICAgICAgcmV0dXJuIG0odSwgYywge1xuICAgICAgICBjb25maWc6IHMoKSxcbiAgICAgICAgc3RhdGU6IGwoKSxcbiAgICAgICAgZHJpdmVyOiBfKClcbiAgICAgIH0pO1xuICAgIGQoKTtcbiAgfVxuICBmdW5jdGlvbiB3KCkge1xuICAgIHZhciBtO1xuICAgIGlmIChsKFwiX190cmFuc2l0aW9uQ2FsbGJhY2tcIikpXG4gICAgICByZXR1cm47XG4gICAgY29uc3QgcCA9IGwoXCJhY3RpdmVJbmRleFwiKSwgYyA9IGwoXCJfX2FjdGl2ZVN0ZXBcIiksIHUgPSBsKFwiX19hY3RpdmVFbGVtZW50XCIpO1xuICAgIGlmICh0eXBlb2YgcCA9PSBcInVuZGVmaW5lZFwiIHx8IHR5cGVvZiBjID09IFwidW5kZWZpbmVkXCIpXG4gICAgICByZXR1cm47XG4gICAgY29uc3QgaCA9ICgobSA9IGMucG9wb3ZlcikgPT0gbnVsbCA/IHZvaWQgMCA6IG0ub25OZXh0Q2xpY2spIHx8IHMoXCJvbk5leHRDbGlja1wiKTtcbiAgICBpZiAoaClcbiAgICAgIHJldHVybiBoKHUsIGMsIHtcbiAgICAgICAgY29uZmlnOiBzKCksXG4gICAgICAgIHN0YXRlOiBsKCksXG4gICAgICAgIGRyaXZlcjogXygpXG4gICAgICB9KTtcbiAgICBpKCk7XG4gIH1cbiAgZnVuY3Rpb24gcigpIHtcbiAgICBsKFwiaXNJbml0aWFsaXplZFwiKSB8fCAoayhcImlzSW5pdGlhbGl6ZWRcIiwgITApLCBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoXCJkcml2ZXItYWN0aXZlXCIsIHMoXCJhbmltYXRlXCIpID8gXCJkcml2ZXItZmFkZVwiIDogXCJkcml2ZXItc2ltcGxlXCIpLCBrZSgpLCBOKFwib3ZlcmxheUNsaWNrXCIsIHQpLCBOKFwiZXNjYXBlUHJlc3NcIiwgbyksIE4oXCJhcnJvd0xlZnRQcmVzc1wiLCBmKSwgTihcImFycm93UmlnaHRQcmVzc1wiLCB3KSk7XG4gIH1cbiAgZnVuY3Rpb24gdihhID0gMCkge1xuICAgIHZhciAkLCBCLCBSLCBXLCBWLCBxLCBLLCBZO1xuICAgIGNvbnN0IHAgPSBzKFwic3RlcHNcIik7XG4gICAgaWYgKCFwKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiTm8gc3RlcHMgdG8gZHJpdmUgdGhyb3VnaFwiKSwgZygpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIXBbYV0pIHtcbiAgICAgIGcoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgayhcIl9fYWN0aXZlT25EZXN0cm95ZWRcIiwgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCksIGsoXCJhY3RpdmVJbmRleFwiLCBhKTtcbiAgICBjb25zdCBjID0gcFthXSwgdSA9IHBbYSArIDFdLCBoID0gcFthIC0gMV0sIG0gPSAoKCQgPSBjLnBvcG92ZXIpID09IG51bGwgPyB2b2lkIDAgOiAkLmRvbmVCdG5UZXh0KSB8fCBzKFwiZG9uZUJ0blRleHRcIikgfHwgXCJEb25lXCIsIHggPSBzKFwiYWxsb3dDbG9zZVwiKSwgQyA9IHR5cGVvZiAoKEIgPSBjLnBvcG92ZXIpID09IG51bGwgPyB2b2lkIDAgOiBCLnNob3dQcm9ncmVzcykgIT0gXCJ1bmRlZmluZWRcIiA/IChSID0gYy5wb3BvdmVyKSA9PSBudWxsID8gdm9pZCAwIDogUi5zaG93UHJvZ3Jlc3MgOiBzKFwic2hvd1Byb2dyZXNzXCIpLCBiID0gKCgoVyA9IGMucG9wb3ZlcikgPT0gbnVsbCA/IHZvaWQgMCA6IFcucHJvZ3Jlc3NUZXh0KSB8fCBzKFwicHJvZ3Jlc3NUZXh0XCIpIHx8IFwie3tjdXJyZW50fX0gb2Yge3t0b3RhbH19XCIpLnJlcGxhY2UoXCJ7e2N1cnJlbnR9fVwiLCBgJHthICsgMX1gKS5yZXBsYWNlKFwie3t0b3RhbH19XCIsIGAke3AubGVuZ3RofWApLCBQID0gKChWID0gYy5wb3BvdmVyKSA9PSBudWxsID8gdm9pZCAwIDogVi5zaG93QnV0dG9ucykgfHwgcyhcInNob3dCdXR0b25zXCIpLCBFID0gW1xuICAgICAgXCJuZXh0XCIsXG4gICAgICBcInByZXZpb3VzXCIsXG4gICAgICAuLi54ID8gW1wiY2xvc2VcIl0gOiBbXVxuICAgIF0uZmlsdGVyKChjZSkgPT4gIShQICE9IG51bGwgJiYgUC5sZW5ndGgpIHx8IFAuaW5jbHVkZXMoY2UpKSwgVCA9ICgocSA9IGMucG9wb3ZlcikgPT0gbnVsbCA/IHZvaWQgMCA6IHEub25OZXh0Q2xpY2spIHx8IHMoXCJvbk5leHRDbGlja1wiKSwgQSA9ICgoSyA9IGMucG9wb3ZlcikgPT0gbnVsbCA/IHZvaWQgMCA6IEsub25QcmV2Q2xpY2spIHx8IHMoXCJvblByZXZDbGlja1wiKSwgSCA9ICgoWSA9IGMucG9wb3ZlcikgPT0gbnVsbCA/IHZvaWQgMCA6IFkub25DbG9zZUNsaWNrKSB8fCBzKFwib25DbG9zZUNsaWNrXCIpO1xuICAgIGooe1xuICAgICAgLi4uYyxcbiAgICAgIHBvcG92ZXI6IHtcbiAgICAgICAgc2hvd0J1dHRvbnM6IEUsXG4gICAgICAgIG5leHRCdG5UZXh0OiB1ID8gdm9pZCAwIDogbSxcbiAgICAgICAgZGlzYWJsZUJ1dHRvbnM6IFsuLi5oID8gW10gOiBbXCJwcmV2aW91c1wiXV0sXG4gICAgICAgIHNob3dQcm9ncmVzczogQyxcbiAgICAgICAgcHJvZ3Jlc3NUZXh0OiBiLFxuICAgICAgICBvbk5leHRDbGljazogVCB8fCAoKCkgPT4ge1xuICAgICAgICAgIHUgPyB2KGEgKyAxKSA6IGcoKTtcbiAgICAgICAgfSksXG4gICAgICAgIG9uUHJldkNsaWNrOiBBIHx8ICgoKSA9PiB7XG4gICAgICAgICAgdihhIC0gMSk7XG4gICAgICAgIH0pLFxuICAgICAgICBvbkNsb3NlQ2xpY2s6IEggfHwgKCgpID0+IHtcbiAgICAgICAgICBnKCk7XG4gICAgICAgIH0pLFxuICAgICAgICAuLi4oYyA9PSBudWxsID8gdm9pZCAwIDogYy5wb3BvdmVyKSB8fCB7fVxuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIGZ1bmN0aW9uIGcoYSA9ICEwKSB7XG4gICAgY29uc3QgcCA9IGwoXCJfX2FjdGl2ZUVsZW1lbnRcIiksIGMgPSBsKFwiX19hY3RpdmVTdGVwXCIpLCB1ID0gbChcIl9fYWN0aXZlT25EZXN0cm95ZWRcIiksIGggPSBzKFwib25EZXN0cm95U3RhcnRlZFwiKTtcbiAgICBpZiAoYSAmJiBoKSB7XG4gICAgICBjb25zdCBDID0gIXAgfHwgKHAgPT0gbnVsbCA/IHZvaWQgMCA6IHAuaWQpID09PSBcImRyaXZlci1kdW1teS1lbGVtZW50XCI7XG4gICAgICBoKEMgPyB2b2lkIDAgOiBwLCBjLCB7XG4gICAgICAgIGNvbmZpZzogcygpLFxuICAgICAgICBzdGF0ZTogbCgpLFxuICAgICAgICBkcml2ZXI6IF8oKVxuICAgICAgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IG0gPSAoYyA9PSBudWxsID8gdm9pZCAwIDogYy5vbkRlc2VsZWN0ZWQpIHx8IHMoXCJvbkRlc2VsZWN0ZWRcIiksIHggPSBzKFwib25EZXN0cm95ZWRcIik7XG4gICAgaWYgKGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZShcImRyaXZlci1hY3RpdmVcIiwgXCJkcml2ZXItZmFkZVwiLCBcImRyaXZlci1zaW1wbGVcIiksIFNlKCksIFRlKCksIENlKCksIG1lKCksIGRlKCksIFgoKSwgcCAmJiBjKSB7XG4gICAgICBjb25zdCBDID0gcC5pZCA9PT0gXCJkcml2ZXItZHVtbXktZWxlbWVudFwiO1xuICAgICAgbSAmJiBtKEMgPyB2b2lkIDAgOiBwLCBjLCB7XG4gICAgICAgIGNvbmZpZzogcygpLFxuICAgICAgICBzdGF0ZTogbCgpLFxuICAgICAgICBkcml2ZXI6IF8oKVxuICAgICAgfSksIHggJiYgeChDID8gdm9pZCAwIDogcCwgYywge1xuICAgICAgICBjb25maWc6IHMoKSxcbiAgICAgICAgc3RhdGU6IGwoKSxcbiAgICAgICAgZHJpdmVyOiBfKClcbiAgICAgIH0pO1xuICAgIH1cbiAgICB1ICYmIHUuZm9jdXMoKTtcbiAgfVxuICBjb25zdCB5ID0ge1xuICAgIGlzQWN0aXZlOiAoKSA9PiBsKFwiaXNJbml0aWFsaXplZFwiKSB8fCAhMSxcbiAgICByZWZyZXNoOiBNLFxuICAgIGRyaXZlOiAoYSA9IDApID0+IHtcbiAgICAgIHIoKSwgdihhKTtcbiAgICB9LFxuICAgIHNldENvbmZpZzogRixcbiAgICBzZXRTdGVwczogKGEpID0+IHtcbiAgICAgIFgoKSwgRih7XG4gICAgICAgIC4uLnMoKSxcbiAgICAgICAgc3RlcHM6IGFcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgZ2V0Q29uZmlnOiBzLFxuICAgIGdldFN0YXRlOiBsLFxuICAgIGdldEFjdGl2ZUluZGV4OiAoKSA9PiBsKFwiYWN0aXZlSW5kZXhcIiksXG4gICAgaXNGaXJzdFN0ZXA6ICgpID0+IGwoXCJhY3RpdmVJbmRleFwiKSA9PT0gMCxcbiAgICBpc0xhc3RTdGVwOiAoKSA9PiB7XG4gICAgICBjb25zdCBhID0gcyhcInN0ZXBzXCIpIHx8IFtdLCBwID0gbChcImFjdGl2ZUluZGV4XCIpO1xuICAgICAgcmV0dXJuIHAgIT09IHZvaWQgMCAmJiBwID09PSBhLmxlbmd0aCAtIDE7XG4gICAgfSxcbiAgICBnZXRBY3RpdmVTdGVwOiAoKSA9PiBsKFwiYWN0aXZlU3RlcFwiKSxcbiAgICBnZXRBY3RpdmVFbGVtZW50OiAoKSA9PiBsKFwiYWN0aXZlRWxlbWVudFwiKSxcbiAgICBnZXRQcmV2aW91c0VsZW1lbnQ6ICgpID0+IGwoXCJwcmV2aW91c0VsZW1lbnRcIiksXG4gICAgZ2V0UHJldmlvdXNTdGVwOiAoKSA9PiBsKFwicHJldmlvdXNTdGVwXCIpLFxuICAgIG1vdmVOZXh0OiBpLFxuICAgIG1vdmVQcmV2aW91czogZCxcbiAgICBtb3ZlVG86IG4sXG4gICAgaGFzTmV4dFN0ZXA6ICgpID0+IHtcbiAgICAgIGNvbnN0IGEgPSBzKFwic3RlcHNcIikgfHwgW10sIHAgPSBsKFwiYWN0aXZlSW5kZXhcIik7XG4gICAgICByZXR1cm4gcCAhPT0gdm9pZCAwICYmICEhYVtwICsgMV07XG4gICAgfSxcbiAgICBoYXNQcmV2aW91c1N0ZXA6ICgpID0+IHtcbiAgICAgIGNvbnN0IGEgPSBzKFwic3RlcHNcIikgfHwgW10sIHAgPSBsKFwiYWN0aXZlSW5kZXhcIik7XG4gICAgICByZXR1cm4gcCAhPT0gdm9pZCAwICYmICEhYVtwIC0gMV07XG4gICAgfSxcbiAgICBoaWdobGlnaHQ6IChhKSA9PiB7XG4gICAgICByKCksIGooe1xuICAgICAgICAuLi5hLFxuICAgICAgICBwb3BvdmVyOiBhLnBvcG92ZXIgPyB7XG4gICAgICAgICAgc2hvd0J1dHRvbnM6IFtdLFxuICAgICAgICAgIHNob3dQcm9ncmVzczogITEsXG4gICAgICAgICAgcHJvZ3Jlc3NUZXh0OiBcIlwiLFxuICAgICAgICAgIC4uLmEucG9wb3ZlclxuICAgICAgICB9IDogdm9pZCAwXG4gICAgICB9KTtcbiAgICB9LFxuICAgIGRlc3Ryb3k6ICgpID0+IHtcbiAgICAgIGcoITEpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxlKHkpLCB5O1xufVxuZXhwb3J0IHtcbiAgQWUgYXMgZHJpdmVyXG59O1xuIiwgImxldCBsYXN0TW91c2VYID0gMDtcbmxldCBsYXN0TW91c2VZID0gMDtcbmxldCBhY3RpdmUgPSBmYWxzZTtcbmxldCBoYXNOYXZpZ2F0b3IgPSB3aW5kb3cubmF2aWdhdG9yLmNsaXBib2FyZDtcbmxldCBpc0luRWxlbWVudCA9IGZhbHNlO1xubGV0IHNlbGVjdGVkID0gbnVsbDtcblxubGV0IGN1cnNvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjaXJjbGUtY3Vyc29yJyk7XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0Q3NzU2VsZWN0b3IoKSB7XG4gICAgTGl2ZXdpcmUub24oJ2ZpbGFtZW50LXRvdXI6OmNoYW5nZS1jc3Mtc2VsZWN0b3Itc3RhdHVzJywgZnVuY3Rpb24gKHtlbmFibGVkfSkge1xuXG4gICAgICAgIGlmIChlbmFibGVkKSB7XG5cbiAgICAgICAgICAgIGRvY3VtZW50Lm9ubW91c2Vtb3ZlID0gaGFuZGxlTW91c2VNb3ZlO1xuICAgICAgICAgICAgZG9jdW1lbnQub25rZXl1cCA9IHJlbGVhc2U7XG5cbiAgICAgICAgICAgIGRvY3VtZW50Lm9ubW91c2VvdmVyID0gZW50ZXJDdXJzb3I7XG4gICAgICAgICAgICBkb2N1bWVudC5vbm1vdXNlbGVhdmUgPSBsZWF2ZUN1cnNvcjtcblxuICAgICAgICAgICAgZnVuY3Rpb24gcmVsZWFzZShldmVudCkge1xuICAgICAgICAgICAgICAgIGlmIChldmVudC5rZXkgIT09ICdFc2NhcGUnKSByZXR1cm47XG4gICAgICAgICAgICAgICAgYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQgPSBudWxsO1xuICAgICAgICAgICAgICAgIGN1cnNvci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZnVuY3Rpb24gKGV2ZW50KSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQuY3RybEtleSAmJiBldmVudC5jb2RlID09PSAnU3BhY2UnICYmICFhY3RpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFoYXNOYXZpZ2F0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBGaWxhbWVudE5vdGlmaWNhdGlvbigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRpdGxlKCdGaWxhbWVudCBUb3VyIC0gQ1NTIFNlbGVjdG9yJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYm9keShcIllvdXIgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IHRoZSBDbGlwYm9hcmQgQVBJICE8YnI+RG9uJ3QgZm9yZ2V0IHRvIGJlIGluIDxiPmh0dHBzOi8vPC9iPiBwcm90b2NvbFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kYW5nZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zZW5kKCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgbW92ZUN1cnNvcihsYXN0TW91c2VYLCBsYXN0TW91c2VZKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnNvci5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcblxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEZpbGFtZW50Tm90aWZpY2F0aW9uKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGl0bGUoJ0ZpbGFtZW50IFRvdXIgLSBDU1MgU2VsZWN0b3InKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5ib2R5KCdBY3RpdmF0ZWQgITxicj5QcmVzcyBDdHJsICsgQyB0byBjb3B5IHRoZSBDU1MgU2VsZWN0b3Igb2YgdGhlIHNlbGVjdGVkIGVsZW1lbnQgIScpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN1Y2Nlc3MoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zZW5kKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQuY3RybEtleSAmJiBldmVudC5jb2RlID09PSAnS2V5QycgJiYgYWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgICAgIG5hdmlnYXRvci5jbGlwYm9hcmQud3JpdGVUZXh0KGdldE9wdGltaXplZFNlbGVjdG9yKHNlbGVjdGVkKSA/PyAnTm90aGluZyBzZWxlY3RlZCAhJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgY3Vyc29yLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cbiAgICAgICAgICAgICAgICAgICAgbmV3IEZpbGFtZW50Tm90aWZpY2F0aW9uKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aXRsZSgnRmlsYW1lbnQgVG91ciAtIENTUyBTZWxlY3RvcicpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYm9keShgQ1NTIFNlbGVjdG9yIGNvcGllZCB0byBjbGlwYm9hcmQgIWApXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3VjY2VzcygpXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2VuZCgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGVzY2FwZUNzc1NlbGVjdG9yKHN0cikge1xuICAgIHJldHVybiBzdHIucmVwbGFjZSgvKFshXCIjJCUmJygpKissLi86Ozw9Pj9AW1xcXV5ge3x9fl0pL2csICdcXFxcJDEnKTtcbn1cblxuZnVuY3Rpb24gZ2V0T3B0aW1pemVkU2VsZWN0b3IoZWwpIHtcbiAgICBsZXQgZnVsbFNlbGVjdG9yID0gZ2V0Q3NzU2VsZWN0b3IoZWwpO1xuXG4gICAgcmV0dXJuIG9wdGltaXplU2VsZWN0b3IoZnVsbFNlbGVjdG9yKTtcbn1cblxuZnVuY3Rpb24gb3B0aW1pemVTZWxlY3RvcihzZWxlY3Rvcikge1xuICAgIGxldCBwYXJ0cyA9IHNlbGVjdG9yLnNwbGl0KCcgPiAnKTtcblxuICAgIGZvciAobGV0IGkgPSBwYXJ0cy5sZW5ndGggLSAyOyBpID49IDA7IGktLSkge1xuICAgICAgICBsZXQgdGVzdFNlbGVjdG9yID0gcGFydHMuc2xpY2UoaSkuam9pbignID4gJyk7XG4gICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHRlc3RTZWxlY3RvcikubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gdGVzdFNlbGVjdG9yO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGVjdG9yO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q3NzU2VsZWN0b3IoZWwpIHtcbiAgICBpZiAoIWVsKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICBpZiAoZWwuaWQpIHtcbiAgICAgICAgcmV0dXJuICcjJyArIGVzY2FwZUNzc1NlbGVjdG9yKGVsLmlkKTtcbiAgICB9XG5cbiAgICBpZiAoZWwgPT09IGRvY3VtZW50LmJvZHkpIHtcbiAgICAgICAgcmV0dXJuICdib2R5JztcbiAgICB9XG5cbiAgICBsZXQgdGFnID0gZWwudGFnTmFtZS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgbGV0IHZhbGlkQ2xhc3NlcyA9IGVsLmNsYXNzTmFtZS5zcGxpdCgvXFxzKy8pLmZpbHRlcihjbHMgPT4gY2xzICYmICFjbHMuc3RhcnRzV2l0aCgnLS0nKSk7XG4gICAgbGV0IGNsYXNzZXMgPSB2YWxpZENsYXNzZXMubGVuZ3RoID8gJy4nICsgdmFsaWRDbGFzc2VzLm1hcChlc2NhcGVDc3NTZWxlY3Rvcikuam9pbignLicpIDogJyc7XG5cbiAgICBsZXQgc2VsZWN0b3JXaXRob3V0TnRoT2ZUeXBlID0gdGFnICsgY2xhc3NlcztcblxuICAgIHRyeSB7XG4gICAgICAgIGxldCBzaWJsaW5nc1dpdGhTYW1lU2VsZWN0b3IgPSBBcnJheS5mcm9tKGVsLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcldpdGhvdXROdGhPZlR5cGUpKTtcbiAgICAgICAgaWYgKHNpYmxpbmdzV2l0aFNhbWVTZWxlY3Rvci5sZW5ndGggPT09IDEgJiYgc2libGluZ3NXaXRoU2FtZVNlbGVjdG9yWzBdID09PSBlbCkge1xuICAgICAgICAgICAgcmV0dXJuIGdldENzc1NlbGVjdG9yKGVsLnBhcmVudE5vZGUpICsgJyA+ICcgKyBzZWxlY3RvcldpdGhvdXROdGhPZlR5cGU7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgc2libGluZ3MgPSBBcnJheS5mcm9tKGVsLnBhcmVudE5vZGUuY2hpbGRyZW4pO1xuICAgICAgICBsZXQgc2FtZVRhZ0FuZENsYXNzU2libGluZ3MgPSBzaWJsaW5ncy5maWx0ZXIoc2liID0+IHNpYi50YWdOYW1lID09PSBlbC50YWdOYW1lICYmIHNpYi5jbGFzc05hbWUgPT09IGVsLmNsYXNzTmFtZSk7XG4gICAgICAgIGlmIChzYW1lVGFnQW5kQ2xhc3NTaWJsaW5ncy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICBsZXQgaW5kZXggPSBzYW1lVGFnQW5kQ2xhc3NTaWJsaW5ncy5pbmRleE9mKGVsKSArIDE7XG4gICAgICAgICAgICByZXR1cm4gZ2V0Q3NzU2VsZWN0b3IoZWwucGFyZW50Tm9kZSkgKyAnID4gJyArIHRhZyArIGNsYXNzZXMgKyAnOm50aC1vZi10eXBlKCcgKyBpbmRleCArICcpJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBnZXRDc3NTZWxlY3RvcihlbC5wYXJlbnROb2RlKSArICcgPiAnICsgdGFnICsgY2xhc3NlcztcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcblxuICAgIH1cblxufVxuXG5mdW5jdGlvbiBoYW5kbGVNb3VzZU1vdmUoZXZlbnQpIHtcbiAgICBsYXN0TW91c2VYID0gZXZlbnQuY2xpZW50WDtcbiAgICBsYXN0TW91c2VZID0gZXZlbnQuY2xpZW50WTtcblxuICAgIG1vdmVDdXJzb3IoZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSk7XG59XG5cbmZ1bmN0aW9uIG1vdmVDdXJzb3IocFgsIHBZKSB7XG4gICAgaWYgKCFhY3RpdmUpIHJldHVybjtcblxuICAgIGxldCBkaWZmID0gMTA7XG4gICAgaWYgKCFpc0luRWxlbWVudCkge1xuICAgICAgICBjdXJzb3Iuc3R5bGUubGVmdCA9IChwWCAtIGRpZmYpICsgJ3B4JztcbiAgICAgICAgY3Vyc29yLnN0eWxlLnRvcCA9IChwWSAtIGRpZmYpICsgJ3B4JztcbiAgICAgICAgY3Vyc29yLnN0eWxlLndpZHRoID0gJzIwcHgnO1xuICAgICAgICBjdXJzb3Iuc3R5bGUuaGVpZ2h0ID0gJzIwcHgnO1xuICAgICAgICBjdXJzb3Iuc3R5bGUuYm9yZGVyUmFkaXVzID0gXCI1MCVcIjtcbiAgICB9XG59XG5cblxuZnVuY3Rpb24gZW50ZXJDdXJzb3IoZXZlbnQpIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgIGlmICghYWN0aXZlKSByZXR1cm47XG5cbiAgICBpc0luRWxlbWVudCA9IHRydWU7XG5cbiAgICBsZXQgZWxlbSA9IGV2ZW50LnRhcmdldDtcblxuICAgIHdoaWxlIChlbGVtLmxhc3RFbGVtZW50Q2hpbGQpIHtcbiAgICAgICAgZWxlbSA9IGVsZW0ubGFzdEVsZW1lbnRDaGlsZDtcbiAgICB9XG5cbiAgICBpZiAoZWxlbSkge1xuICAgICAgICBsZXQgZVggPSBlbGVtLm9mZnNldFBhcmVudCA/IGVsZW0ub2Zmc2V0TGVmdCArIGVsZW0ub2Zmc2V0UGFyZW50Lm9mZnNldExlZnQgOiBlbGVtLm9mZnNldExlZnRcbiAgICAgICAgbGV0IGVZID0gZWxlbS5vZmZzZXRQYXJlbnQgPyBlbGVtLm9mZnNldFRvcCArIGVsZW0ub2Zmc2V0UGFyZW50Lm9mZnNldFRvcCA6IGVsZW0ub2Zmc2V0VG9wO1xuICAgICAgICBsZXQgZVcgPSBlbGVtLm9mZnNldFdpZHRoO1xuICAgICAgICBsZXQgZUggPSBlbGVtLm9mZnNldEhlaWdodDtcbiAgICAgICAgbGV0IGRpZmYgPSA2O1xuICAgICAgICBzZWxlY3RlZCA9IGVsZW07XG4gICAgICAgIGN1cnNvci5zdHlsZS5sZWZ0ID0gZVggLSBkaWZmICsgJ3B4JztcbiAgICAgICAgY3Vyc29yLnN0eWxlLnRvcCA9IGVZIC0gZGlmZiArICdweCc7XG4gICAgICAgIGN1cnNvci5zdHlsZS53aWR0aCA9IChlVyArIGRpZmYgKiAyIC0gMSkgKyAncHgnO1xuICAgICAgICBjdXJzb3Iuc3R5bGUuaGVpZ2h0ID0gKGVIICsgZGlmZiAqIDIgLSAxKSArICdweCc7XG4gICAgICAgIGN1cnNvci5zdHlsZS5ib3JkZXJSYWRpdXMgPSBcIjVweFwiO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gbGVhdmVDdXJzb3IoZXZlbnQpIHtcbiAgICBpZiAoIWFjdGl2ZSkgcmV0dXJuO1xuXG4gICAgaXNJbkVsZW1lbnQgPSBmYWxzZTtcbn1cbiIsICJpbXBvcnQge2RyaXZlcn0gZnJvbSBcImRyaXZlci5qc1wiO1xuaW1wb3J0IHtpbml0Q3NzU2VsZWN0b3J9IGZyb20gJy4vY3NzLXNlbGVjdG9yLmpzJztcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbGl2ZXdpcmU6aW5pdGlhbGl6ZWQnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG5cbiAgICBpbml0Q3NzU2VsZWN0b3IoKTtcblxuICAgIGxldCBwbHVnaW5EYXRhO1xuXG4gICAgbGV0IHRvdXJzID0gW107XG4gICAgbGV0IGhpZ2hsaWdodHMgPSBbXTtcblxuICAgIGZ1bmN0aW9uIHdhaXRGb3JFbGVtZW50KHNlbGVjdG9yLCBjYWxsYmFjaykge1xuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcikpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24gKG11dGF0aW9ucykge1xuICAgICAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcikpO1xuICAgICAgICAgICAgICAgIG9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5ib2R5LCB7XG4gICAgICAgICAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgICAgICAgICBzdWJ0cmVlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlSWQocGFyYW1zKSB7XG5cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocGFyYW1zKSkge1xuICAgICAgICAgICAgcmV0dXJuIHBhcmFtc1swXTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgcGFyYW1zID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgcmV0dXJuIHBhcmFtcy5pZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwYXJhbXM7XG4gICAgfVxuXG4gICAgTGl2ZXdpcmUuZGlzcGF0Y2goJ2ZpbGFtZW50LXRvdXI6OmxvYWQtZWxlbWVudHMnLCB7cmVxdWVzdDogd2luZG93LmxvY2F0aW9ufSlcblxuICAgIExpdmV3aXJlLm9uKCdmaWxhbWVudC10b3VyOjpsb2FkZWQtZWxlbWVudHMnLCBmdW5jdGlvbiAoZGF0YSkge1xuXG4gICAgICAgIHBsdWdpbkRhdGEgPSBkYXRhO1xuXG4gICAgICAgIHBsdWdpbkRhdGEudG91cnMuZm9yRWFjaCgodG91cikgPT4ge1xuICAgICAgICAgICAgdG91cnMucHVzaCh0b3VyKTtcblxuICAgICAgICAgICAgaWYgKCFsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG91cnMnKSkge1xuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b3VycycsIFwiW11cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNlbGVjdFRvdXIodG91cnMpO1xuXG4gICAgICAgIHBsdWdpbkRhdGEuaGlnaGxpZ2h0cy5mb3JFYWNoKChoaWdobGlnaHQpID0+IHtcblxuICAgICAgICAgICAgaWYgKGhpZ2hsaWdodC5yb3V0ZSA9PT0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lKSB7XG5cbiAgICAgICAgICAgICAgICAvL1RPRE8gQWRkIGEgbW9yZSBwcmVjaXNlL2VmZmljaWVudCBzZWxlY3RvclxuXG4gICAgICAgICAgICAgICAgd2FpdEZvckVsZW1lbnQoaGlnaGxpZ2h0LnBhcmVudCwgZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yLnBhcmVudE5vZGUuc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBEaXYuaW5uZXJIVE1MID0gaGlnaGxpZ2h0LmJ1dHRvbjtcblxuICAgICAgICAgICAgICAgICAgICB0ZW1wRGl2LmZpcnN0Q2hpbGQuY2xhc3NMaXN0LmFkZChoaWdobGlnaHQucG9zaXRpb24pO1xuXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRlbXBEaXYuZmlyc3RDaGlsZCwgc2VsZWN0b3IpXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBoaWdobGlnaHRzLnB1c2goaGlnaGxpZ2h0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBzZWxlY3RUb3VyKHRvdXJzLCBzdGFydEluZGV4ID0gMCkge1xuICAgICAgICBmb3IgKGxldCBpID0gc3RhcnRJbmRleDsgaSA8IHRvdXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgdG91ciA9IHRvdXJzW2ldO1xuICAgICAgICAgICAgbGV0IGNvbmRpdGlvbkFsd2F5c1Nob3cgPSB0b3VyLmFsd2F5c1Nob3c7XG4gICAgICAgICAgICBsZXQgY29uZGl0aW9uUm91dGVzSWdub3JlZCA9IHRvdXIucm91dGVzSWdub3JlZDtcbiAgICAgICAgICAgIGxldCBjb25kaXRpb25Sb3V0ZU1hdGNoZXMgPSB0b3VyLnJvdXRlID09PSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG4gICAgICAgICAgICBsZXQgY29uZGl0aW9uVmlzaWJsZU9uY2UgPSAhcGx1Z2luRGF0YS5vbmx5X3Zpc2libGVfb25jZSB8fFxuICAgICAgICAgICAgICAgIChwbHVnaW5EYXRhLm9ubHlfdmlzaWJsZV9vbmNlICYmICFsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG91cnMnKS5pbmNsdWRlcyh0b3VyLmlkKSk7XG5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAoY29uZGl0aW9uQWx3YXlzU2hvdyAmJiBjb25kaXRpb25Sb3V0ZXNJZ25vcmVkKSB8fFxuICAgICAgICAgICAgICAgIChjb25kaXRpb25BbHdheXNTaG93ICYmICFjb25kaXRpb25Sb3V0ZXNJZ25vcmVkICYmIGNvbmRpdGlvblJvdXRlTWF0Y2hlcykgfHxcbiAgICAgICAgICAgICAgICAoY29uZGl0aW9uUm91dGVzSWdub3JlZCAmJiBjb25kaXRpb25WaXNpYmxlT25jZSkgfHxcbiAgICAgICAgICAgICAgICAoY29uZGl0aW9uUm91dGVNYXRjaGVzICYmIGNvbmRpdGlvblZpc2libGVPbmNlKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgb3BlblRvdXIodG91cik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIExpdmV3aXJlLm9uKCdmaWxhbWVudC10b3VyOjpvcGVuLWhpZ2hsaWdodCcsIGZ1bmN0aW9uIChwYXJhbXMpIHtcblxuICAgICAgICBjb25zdCBpZCA9IHBhcnNlSWQocGFyYW1zKTtcblxuICAgICAgICBjb25zb2xlLmxvZyhoaWdobGlnaHRzKVxuXG4gICAgICAgIGxldCBoaWdobGlnaHQgPSBoaWdobGlnaHRzLmZpbmQoZWxlbWVudCA9PiBlbGVtZW50LmlkID09PSBpZCk7XG5cbiAgICAgICAgaWYgKGhpZ2hsaWdodCkge1xuICAgICAgICAgICAgZHJpdmVyKHtcbiAgICAgICAgICAgICAgICBvdmVybGF5Q29sb3I6IGxvY2FsU3RvcmFnZS50aGVtZSA9PT0gJ2xpZ2h0JyA/IGhpZ2hsaWdodC5jb2xvcnMubGlnaHQgOiBoaWdobGlnaHQuY29sb3JzLmRhcmssXG5cbiAgICAgICAgICAgICAgICBvblBvcG92ZXJSZW5kZXI6IChwb3BvdmVyLCB7Y29uZmlnLCBzdGF0ZX0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcG9wb3Zlci50aXRsZS5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICBwb3BvdmVyLnRpdGxlLmlubmVySFRNTCA9IHN0YXRlLmFjdGl2ZVN0ZXAucG9wb3Zlci50aXRsZTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIXN0YXRlLmFjdGl2ZVN0ZXAucG9wb3Zlci5kZXNjcmlwdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9wb3Zlci50aXRsZS5maXJzdENoaWxkLnN0eWxlLmp1c3RpZnlDb250ZW50ID0gJ2NlbnRlcic7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBsZXQgY29udGVudENsYXNzZXMgPSBcImRhcms6dGV4dC13aGl0ZSBmaS1zZWN0aW9uIHJvdW5kZWQteGwgYmctd2hpdGUgc2hhZG93LXNtIHJpbmctMSByaW5nLWdyYXktOTUwLzUgZGFyazpiZy1ncmF5LTkwMCBkYXJrOnJpbmctd2hpdGUvMTAgbWItNFwiO1xuXG4gICAgICAgICAgICAgICAgICAgIHBvcG92ZXIuZm9vdGVyLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCguLi5jb250ZW50Q2xhc3Nlcy5zcGxpdChcIiBcIikpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KS5oaWdobGlnaHQoaGlnaGxpZ2h0KTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgSGlnaGxpZ2h0IHdpdGggaWQgJyR7aWR9JyBub3QgZm91bmRgKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgTGl2ZXdpcmUub24oJ2ZpbGFtZW50LXRvdXI6Om9wZW4tdG91cicsIGZ1bmN0aW9uIChwYXJhbXMpIHtcblxuICAgICAgICBjb25zdCBpZCA9IHBhcnNlSWQocGFyYW1zKTtcblxuICAgICAgICBsZXQgdG91ciA9IHRvdXJzLmZpbmQoZWxlbWVudCA9PiBlbGVtZW50LmlkID09PSBgdG91cl8ke2lkfWApO1xuXG4gICAgICAgIGlmICh0b3VyKSB7XG4gICAgICAgICAgICBvcGVuVG91cih0b3VyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYFRvdXIgd2l0aCBpZCAnJHtpZH0nIG5vdCBmb3VuZGApO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBvcGVuVG91cih0b3VyKSB7XG5cbiAgICAgICAgbGV0IHN0ZXBzID0gSlNPTi5wYXJzZSh0b3VyLnN0ZXBzKTtcblxuICAgICAgICBpZiAoc3RlcHMubGVuZ3RoID4gMCkge1xuXG4gICAgICAgICAgICBjb25zdCBkcml2ZXJPYmogPSBkcml2ZXIoe1xuICAgICAgICAgICAgICAgIGFsbG93Q2xvc2U6IHRydWUsXG4gICAgICAgICAgICAgICAgZGlzYWJsZUFjdGl2ZUludGVyYWN0aW9uOiB0cnVlLFxuICAgICAgICAgICAgICAgIG92ZXJsYXlDb2xvcjogbG9jYWxTdG9yYWdlLnRoZW1lID09PSAnbGlnaHQnID8gdG91ci5jb2xvcnMubGlnaHQgOiB0b3VyLmNvbG9ycy5kYXJrLFxuICAgICAgICAgICAgICAgIG9uRGVzZWxlY3RlZDogKChlbGVtZW50LCBzdGVwLCB7Y29uZmlnLCBzdGF0ZX0pID0+IHtcblxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIG9uQ2xvc2VDbGljazogKChlbGVtZW50LCBzdGVwLCB7Y29uZmlnLCBzdGF0ZX0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXRlLmFjdGl2ZVN0ZXAgJiYgKCFzdGF0ZS5hY3RpdmVTdGVwLnVuY2xvc2VhYmxlIHx8IHRvdXIudW5jbG9zZWFibGUpKVxuICAgICAgICAgICAgICAgICAgICAgICAgZHJpdmVyT2JqLmRlc3Ryb3koKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIWxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b3VycycpLmluY2x1ZGVzKHRvdXIuaWQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG91cnMnLCBKU09OLnN0cmluZ2lmeShbLi4uSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG91cnMnKSksIHRvdXIuaWRdKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBvbkRlc3Ryb3lTdGFydGVkOiAoKGVsZW1lbnQsIHN0ZXAsIHtjb25maWcsIHN0YXRlfSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdGUuYWN0aXZlU3RlcCAmJiAhc3RhdGUuYWN0aXZlU3RlcC51bmNsb3NlYWJsZSAmJiAhdG91ci51bmNsb3NlYWJsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZHJpdmVyT2JqLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIG9uRGVzdHJveWVkOiAoKGVsZW1lbnQsIHN0ZXAsIHtjb25maWcsIHN0YXRlfSkgPT4ge1xuXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgb25OZXh0Q2xpY2s6ICgoZWxlbWVudCwgc3RlcCwge2NvbmZpZywgc3RhdGV9KSA9PiB7XG5cblxuICAgICAgICAgICAgICAgICAgICBpZiAodG91cnMubGVuZ3RoID4gMSAmJiBkcml2ZXJPYmouaXNMYXN0U3RlcCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSB0b3Vycy5maW5kSW5kZXgob2JqZXQgPT4gb2JqZXQuaWQgPT09IHRvdXIuaWQpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggIT09IC0xICYmIGluZGV4IDwgdG91cnMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZXh0VG91ckluZGV4ID0gaW5kZXggKyAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdFRvdXIodG91cnMsIG5leHRUb3VySW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgICAgICBpZiAoZHJpdmVyT2JqLmlzTGFzdFN0ZXAoKSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b3VycycpLmluY2x1ZGVzKHRvdXIuaWQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3RvdXJzJywgSlNPTi5zdHJpbmdpZnkoWy4uLkpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RvdXJzJykpLCB0b3VyLmlkXSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBkcml2ZXJPYmouZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RlcC5ldmVudHMpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0ZXAuZXZlbnRzLm5vdGlmeU9uTmV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBGaWxhbWVudE5vdGlmaWNhdGlvbigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aXRsZShzdGVwLmV2ZW50cy5ub3RpZnlPbk5leHQudGl0bGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5ib2R5KHN0ZXAuZXZlbnRzLm5vdGlmeU9uTmV4dC5ib2R5KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaWNvbihzdGVwLmV2ZW50cy5ub3RpZnlPbk5leHQuaWNvbilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmljb25Db2xvcihzdGVwLmV2ZW50cy5ub3RpZnlPbk5leHQuaWNvbkNvbG9yKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY29sb3Ioc3RlcC5ldmVudHMubm90aWZ5T25OZXh0LmNvbG9yKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZHVyYXRpb24oc3RlcC5ldmVudHMubm90aWZ5T25OZXh0LmR1cmF0aW9uKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2VuZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RlcC5ldmVudHMuZGlzcGF0Y2hPbk5leHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBMaXZld2lyZS5kaXNwYXRjaChzdGVwLmV2ZW50cy5kaXNwYXRjaE9uTmV4dC5uYW1lLCBzdGVwLmV2ZW50cy5kaXNwYXRjaE9uTmV4dC5wYXJhbXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RlcC5ldmVudHMuY2xpY2tPbk5leHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHN0ZXAuZXZlbnRzLmNsaWNrT25OZXh0KS5jbGljaygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RlcC5ldmVudHMucmVkaXJlY3RPbk5leHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cub3BlbihzdGVwLmV2ZW50cy5yZWRpcmVjdE9uTmV4dC51cmwsIHN0ZXAuZXZlbnRzLnJlZGlyZWN0T25OZXh0Lm5ld1RhYiA/ICdfYmxhbmsnIDogJ19zZWxmJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgICAgIGRyaXZlck9iai5tb3ZlTmV4dCgpO1xuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIG9uUG9wb3ZlclJlbmRlcjogKHBvcG92ZXIsIHtjb25maWcsIHN0YXRlfSkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGF0ZS5hY3RpdmVTdGVwLnVuY2xvc2VhYmxlIHx8IHRvdXIudW5jbG9zZWFibGUpXG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRyaXZlci1wb3BvdmVyLWNsb3NlLWJ0blwiKS5yZW1vdmUoKTtcblxuICAgICAgICAgICAgICAgICAgICBwb3BvdmVyLnRpdGxlLmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgIHBvcG92ZXIudGl0bGUuaW5uZXJIVE1MID0gc3RhdGUuYWN0aXZlU3RlcC5wb3BvdmVyLnRpdGxlO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICghc3RhdGUuYWN0aXZlU3RlcC5wb3BvdmVyLmRlc2NyaXB0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwb3BvdmVyLnRpdGxlLmZpcnN0Q2hpbGQuc3R5bGUuanVzdGlmeUNvbnRlbnQgPSAnY2VudGVyJztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGxldCBjb250ZW50Q2xhc3NlcyA9IFwiZGFyazp0ZXh0LXdoaXRlIGZpLXNlY3Rpb24gcm91bmRlZC14bCBiZy13aGl0ZSBzaGFkb3ctc20gcmluZy0xIHJpbmctZ3JheS05NTAvNSBkYXJrOmJnLWdyYXktOTAwIGRhcms6cmluZy13aGl0ZS8xMCBtYi00XCI7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gcG9wb3Zlci5kZXNjcmlwdGlvbi5pbnNlcnRBZGphY2VudEhUTUwoXCJiZWZvcmVlbmRcIiwgc3RhdGUuYWN0aXZlU3RlcC5wb3BvdmVyLmZvcm0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHBvcG92ZXIuZm9vdGVyLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCguLi5jb250ZW50Q2xhc3Nlcy5zcGxpdChcIiBcIikpO1xuXG4gICAgICAgICAgICAgICAgICAgIHBvcG92ZXIuZm9vdGVyLmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgIHBvcG92ZXIuZm9vdGVyLmNsYXNzTGlzdC5hZGQoJ2ZsZXgnLCAnbXQtMycpO1xuICAgICAgICAgICAgICAgICAgICBwb3BvdmVyLmZvb3Rlci5zdHlsZS5qdXN0aWZ5Q29udGVudCA9ICdzcGFjZS1ldmVubHknO1xuXG4gICAgICAgICAgICAgICAgICAgIHBvcG92ZXIuZm9vdGVyLmNsYXNzTGlzdC5yZW1vdmUoXCJkcml2ZXItcG9wb3Zlci1mb290ZXJcIik7XG5cblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXh0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5leHRDbGFzc2VzID0gXCJmaS1idG4gZmktYnRuLXNpemUtbWQgcmVsYXRpdmUgZ3JpZC1mbG93LWNvbCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZm9udC1zZW1pYm9sZCBvdXRsaW5lLW5vbmUgdHJhbnNpdGlvbiBkdXJhdGlvbi03NSBmb2N1czpyaW5nLTIgZGlzYWJsZWQ6cG9pbnRlci1ldmVudHMtbm9uZSBkaXNhYmxlZDpvcGFjaXR5LTcwIHJvdW5kZWQtbGcgZmktYnRuLWNvbG9yLXByaW1hcnkgZ2FwLTEuNSBweC0zIHB5LTIgdGV4dC1zbSBpbmxpbmUtZ3JpZCBzaGFkb3ctc20gYmctY3VzdG9tLTYwMCB0ZXh0LXdoaXRlIGhvdmVyOmJnLWN1c3RvbS01MDAgZGFyazpiZy1jdXN0b20tNTAwIGRhcms6aG92ZXI6YmctY3VzdG9tLTQwMCBmb2N1czpyaW5nLWN1c3RvbS01MDAvNTAgZGFyazpmb2N1czpyaW5nLWN1c3RvbS00MDAvNTAgZmktYWMtYnRuLWFjdGlvblwiO1xuXG4gICAgICAgICAgICAgICAgICAgIG5leHRCdXR0b24uY2xhc3NMaXN0LmFkZCguLi5uZXh0Q2xhc3Nlcy5zcGxpdChcIiBcIiksICdkcml2ZXItcG9wb3Zlci1uZXh0LWJ0bicpO1xuICAgICAgICAgICAgICAgICAgICBuZXh0QnV0dG9uLmlubmVyVGV4dCA9IGRyaXZlck9iai5pc0xhc3RTdGVwKCkgPyB0b3VyLmRvbmVCdXR0b25MYWJlbCA6IHRvdXIubmV4dEJ1dHRvbkxhYmVsO1xuXG4gICAgICAgICAgICAgICAgICAgIG5leHRCdXR0b24uc3R5bGUuc2V0UHJvcGVydHkoJy0tYy00MDAnLCAndmFyKC0tcHJpbWFyeS00MDAnKTtcbiAgICAgICAgICAgICAgICAgICAgbmV4dEJ1dHRvbi5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1jLTUwMCcsICd2YXIoLS1wcmltYXJ5LTUwMCcpO1xuICAgICAgICAgICAgICAgICAgICBuZXh0QnV0dG9uLnN0eWxlLnNldFByb3BlcnR5KCctLWMtNjAwJywgJ3ZhcigtLXByaW1hcnktNjAwJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJldkJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwcmV2Q2xhc3NlcyA9IFwiZmktYnRuIGZpLWJ0bi1zaXplLW1kIHJlbGF0aXZlIGdyaWQtZmxvdy1jb2wgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGZvbnQtc2VtaWJvbGQgb3V0bGluZS1ub25lIHRyYW5zaXRpb24gZHVyYXRpb24tNzUgZm9jdXM6cmluZy0yIGRpc2FibGVkOnBvaW50ZXItZXZlbnRzLW5vbmUgZGlzYWJsZWQ6b3BhY2l0eS03MCByb3VuZGVkLWxnIGZpLWJ0bi1jb2xvci1ncmF5IGdhcC0xLjUgcHgtMyBweS0yIHRleHQtc20gaW5saW5lLWdyaWQgc2hhZG93LXNtIGJnLXdoaXRlIHRleHQtZ3JheS05NTAgaG92ZXI6YmctZ3JheS01MCBkYXJrOmJnLXdoaXRlLzUgZGFyazp0ZXh0LXdoaXRlIGRhcms6aG92ZXI6Ymctd2hpdGUvMTAgcmluZy0xIHJpbmctZ3JheS05NTAvMTAgZGFyazpyaW5nLXdoaXRlLzIwIGZpLWFjLWJ0bi1hY3Rpb25cIjtcbiAgICAgICAgICAgICAgICAgICAgcHJldkJ1dHRvbi5jbGFzc0xpc3QuYWRkKC4uLnByZXZDbGFzc2VzLnNwbGl0KFwiIFwiKSwgJ2RyaXZlci1wb3BvdmVyLXByZXYtYnRuJyk7XG4gICAgICAgICAgICAgICAgICAgIHByZXZCdXR0b24uaW5uZXJUZXh0ID0gdG91ci5wcmV2aW91c0J1dHRvbkxhYmVsO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICghZHJpdmVyT2JqLmlzRmlyc3RTdGVwKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvcG92ZXIuZm9vdGVyLmFwcGVuZENoaWxkKHByZXZCdXR0b24pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHBvcG92ZXIuZm9vdGVyLmFwcGVuZENoaWxkKG5leHRCdXR0b24pO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc3RlcHM6IHN0ZXBzLFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGRyaXZlck9i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QUFDQSxTQUFTLEdBQUcsR0FBRyxHQUFHLEdBQUc7QUFDbkIsUUFBTSxJQUFJLEVBQUUsU0FBUztBQUNyQixNQUFJLENBQUM7QUFDSDtBQUNGLFFBQU0sSUFBSSxFQUFFLHNCQUFzQixHQUFHLElBQUksR0FBRyxHQUFHLElBQUksRUFBRSxPQUFPLElBQUksRUFBRSxPQUFPLElBQUksT0FBTyxZQUFZLElBQUksRUFBRSxPQUFPLElBQUksRUFBRSxNQUFNLElBQUksRUFBRSxRQUFRLElBQUksT0FBTyxhQUFhLElBQUksRUFBRSxLQUFLLElBQUksRUFBRTtBQUNoTCxJQUFFLFlBQVk7QUFDZCxNQUFJLElBQUksR0FBRyxJQUFJO0FBQ2YsTUFBSSxNQUFNLFNBQVMsSUFBSSxLQUFLLEtBQUssSUFBSSxTQUFTLElBQUksU0FBUyxJQUFJLElBQUksS0FBSyxNQUFNLElBQUksT0FBTyxJQUFJLFVBQVUsS0FBSyxLQUFLLElBQUksUUFBUSxJQUFJLFNBQVMsSUFBSSxLQUFLLE1BQU0sSUFBSSxPQUFPLElBQUksVUFBVSxNQUFNLFlBQVksSUFBSSxLQUFLLEtBQUssSUFBSSxTQUFTLElBQUksV0FBVyxJQUFJLElBQUksS0FBSyxNQUFNLElBQUksVUFBVSxJQUFJLFVBQVUsS0FBSyxLQUFLLElBQUksUUFBUSxJQUFJLFdBQVcsSUFBSSxLQUFLLE1BQU0sSUFBSSxVQUFVLElBQUksVUFBVSxNQUFNLFVBQVUsSUFBSSxLQUFLLEtBQUssSUFBSSxVQUFVLElBQUksU0FBUyxJQUFJLElBQUksS0FBSyxNQUFNLElBQUksUUFBUSxJQUFJLFVBQVUsS0FBSyxLQUFLLElBQUksT0FBTyxJQUFJLFNBQVMsSUFBSSxLQUFLLE1BQU0sSUFBSSxRQUFRLElBQUksVUFBVSxNQUFNLFlBQVksSUFBSSxLQUFLLEtBQUssSUFBSSxVQUFVLElBQUksV0FBVyxJQUFJLElBQUksS0FBSyxNQUFNLElBQUksU0FBUyxJQUFJLFVBQVUsS0FBSyxLQUFLLElBQUksT0FBTyxJQUFJLFdBQVcsSUFBSSxLQUFLLE1BQU0sSUFBSSxTQUFTLElBQUks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
