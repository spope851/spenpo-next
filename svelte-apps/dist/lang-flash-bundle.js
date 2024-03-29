!(function (t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
    ? define(e)
    : ((t =
        "undefined" != typeof globalThis ? globalThis : t || self).LanguageFlash =
        e())
})(this, function () {
  "use strict"
  function t() {}
  function e(t) {
    return t()
  }
  function n() {
    return Object.create(null)
  }
  function o(t) {
    t.forEach(e)
  }
  function a(t) {
    return "function" == typeof t
  }
  function l(t, e) {
    return t != t
      ? e == e
      : t !== e || (t && "object" == typeof t) || "function" == typeof t
  }
  function r(t) {
    return null == t ? "" : t
  }
  function i(t, e) {
    t.appendChild(e)
  }
  function c(t, e, n) {
    t.insertBefore(e, n || null)
  }
  function u(t) {
    t.parentNode && t.parentNode.removeChild(t)
  }
  function s(t) {
    return document.createElement(t)
  }
  function f(t) {
    return document.createTextNode(t)
  }
  function d() {
    return f(" ")
  }
  function p(t, e, n, o) {
    return t.addEventListener(e, n, o), () => t.removeEventListener(e, n, o)
  }
  function m(t, e, n) {
    null == n
      ? t.removeAttribute(e)
      : t.getAttribute(e) !== n && t.setAttribute(e, n)
  }
  function _(t, e) {
    ;(e = "" + e), t.wholeText !== e && (t.data = e)
  }
  function h(t, e, n, o) {
    null === n
      ? t.style.removeProperty(e)
      : t.style.setProperty(e, n, o ? "important" : "")
  }
  function v(t, e) {
    for (let n = 0; n < t.options.length; n += 1) {
      const o = t.options[n]
      if (o.__value === e) return void (o.selected = !0)
    }
    t.selectedIndex = -1
  }
  let g
  function $(t) {
    g = t
  }
  function b() {
    if (!g) throw new Error("Function called outside component initialization")
    return g
  }
  const x = [],
    k = [],
    y = [],
    C = [],
    E = Promise.resolve()
  let O = !1
  function T(t) {
    y.push(t)
  }
  const w = new Set()
  let D = 0
  function N() {
    if (0 !== D) return
    const t = g
    do {
      try {
        for (; D < x.length; ) {
          const t = x[D]
          D++, $(t), R(t.$$)
        }
      } catch (t) {
        throw ((x.length = 0), (D = 0), t)
      }
      for ($(null), x.length = 0, D = 0; k.length; ) k.pop()()
      for (let t = 0; t < y.length; t += 1) {
        const e = y[t]
        w.has(e) || (w.add(e), e())
      }
      y.length = 0
    } while (x.length)
    for (; C.length; ) C.pop()()
    ;(O = !1), w.clear(), $(t)
  }
  function R(t) {
    if (null !== t.fragment) {
      t.update(), o(t.before_update)
      const e = t.dirty
      ;(t.dirty = [-1]),
        t.fragment && t.fragment.p(t.ctx, e),
        t.after_update.forEach(T)
    }
  }
  const j = new Set()
  let I
  function A(t, e) {
    t && t.i && (j.delete(t), t.i(e))
  }
  function S(t, e, n, o) {
    if (t && t.o) {
      if (j.has(t)) return
      j.add(t),
        I.c.push(() => {
          j.delete(t), o && (n && t.d(1), o())
        }),
        t.o(e)
    } else o && o()
  }
  function U(t, e) {
    const n = (e.token = {})
    function a(t, a, l, r) {
      if (e.token !== n) return
      e.resolved = r
      let i = e.ctx
      void 0 !== l && ((i = i.slice()), (i[l] = r))
      const c = t && (e.current = t)(i)
      let u = !1
      e.block &&
        (e.blocks
          ? e.blocks.forEach((t, n) => {
              n !== a &&
                t &&
                ((I = { r: 0, c: [], p: I }),
                S(t, 1, 1, () => {
                  e.blocks[n] === t && (e.blocks[n] = null)
                }),
                I.r || o(I.c),
                (I = I.p))
            })
          : e.block.d(1),
        c.c(),
        A(c, 1),
        c.m(e.mount(), e.anchor),
        (u = !0)),
        (e.block = c),
        e.blocks && (e.blocks[a] = c),
        u && N()
    }
    if (
      !(l = t) ||
      ("object" != typeof l && "function" != typeof l) ||
      "function" != typeof l.then
    ) {
      if (e.current !== e.then) return a(e.then, 1, e.value, t), !0
      e.resolved = t
    } else {
      const n = b()
      if (
        (t.then(
          (t) => {
            $(n), a(e.then, 1, e.value, t), $(null)
          },
          (t) => {
            if (($(n), a(e.catch, 2, e.error, t), $(null), !e.hasCatch)) throw t
          }
        ),
        e.current !== e.pending)
      )
        return a(e.pending, 0), !0
    }
    var l
  }
  function F(t) {
    t && t.c()
  }
  function M(t, n, l, r) {
    const { fragment: i, after_update: c } = t.$$
    i && i.m(n, l),
      r ||
        T(() => {
          const n = t.$$.on_mount.map(e).filter(a)
          t.$$.on_destroy ? t.$$.on_destroy.push(...n) : o(n), (t.$$.on_mount = [])
        }),
      c.forEach(T)
  }
  function L(t, e) {
    const n = t.$$
    null !== n.fragment &&
      (o(n.on_destroy),
      n.fragment && n.fragment.d(e),
      (n.on_destroy = n.fragment = null),
      (n.ctx = []))
  }
  function P(t, e) {
    ;-1 === t.$$.dirty[0] &&
      (x.push(t), O || ((O = !0), E.then(N)), t.$$.dirty.fill(0)),
      (t.$$.dirty[(e / 31) | 0] |= 1 << e % 31)
  }
  function W(e, a, l, r, i, c, s, f = [-1]) {
    const d = g
    $(e)
    const p = (e.$$ = {
      fragment: null,
      ctx: [],
      props: c,
      update: t,
      not_equal: i,
      bound: n(),
      on_mount: [],
      on_destroy: [],
      on_disconnect: [],
      before_update: [],
      after_update: [],
      context: new Map(a?.context || (d ? d.$$?.context : [])),
      callbacks: n(),
      dirty: f,
      skip_bound: !1,
      root: a.target || d.$$?.root,
    })
    s && s(p?.root)
    let m = !1
    if (
      ((p.ctx = l
        ? l(e, a.props || {}, (t, n, ...o) => {
            const a = o.length ? o[0] : n
            return (
              p.ctx &&
                i(p.ctx[t], (p.ctx[t] = a)) &&
                (!p.skip_bound && p.bound[t] && p.bound[t](a), m && P(e, t)),
              n
            )
          })
        : []),
      p.update(),
      (m = !0),
      o(p.before_update),
      (p.fragment = !!r && r(p.ctx)),
      a.target)
    ) {
      if (a.hydrate) {
        const t = (function (t) {
          return Array.from(t.childNodes)
        })(a.target)
        p.fragment && p.fragment.l(t), t.forEach(u)
      } else p.fragment && p.fragment.c()
      a.intro && A(e.$$.fragment), M(e, a.target, a.anchor, a.customElement), N()
    }
    $(d)
  }
  class q {
    $destroy() {
      L(this, 1), (this.$destroy = t)
    }
    $on(e, n) {
      if (!a(n)) return t
      const o = this.$$.callbacks[e] || (this.$$.callbacks[e] = [])
      return (
        o.push(n),
        () => {
          const t = o.indexOf(n)
          ;-1 !== t && o.splice(t, 1)
        }
      )
    }
    $set(t) {
      var e
      this.$$set &&
        ((e = t), 0 !== Object.keys(e).length) &&
        ((this.$$.skip_bound = !0), this.$$set(t), (this.$$.skip_bound = !1))
    }
  }
  function z(t) {
    let e
    return {
      c() {
        ;(e = s("h1")),
          (e.textContent = "💪"),
          h(e, "margin", "0px"),
          m(e, "class", "animate__animated animate__fadeOutUp svelte-g1k2p5")
      },
      m(t, n) {
        c(t, e, n)
      },
      d(t) {
        t && u(e)
      },
    }
  }
  function B(e) {
    let n, o
    return {
      c() {
        ;(n = s("h4")),
          (o = f("-1")),
          m(n, "class", "animate__animated animate__fadeOutUp"),
          m(n, "style", `color: ${V}; margin: 0px;`)
      },
      m(t, e) {
        c(t, n, e), i(n, o)
      },
      p: t,
      d(t) {
        t && u(n)
      },
    }
  }
  function G(e) {
    let n, o
    return {
      c() {
        ;(n = s("h4")),
          (o = f("+1")),
          m(n, "class", "animate__animated animate__fadeOutUp"),
          m(n, "style", `color: ${K}; margin: 0px;`)
      },
      m(t, e) {
        c(t, n, e), i(n, o)
      },
      p: t,
      d(t) {
        t && u(n)
      },
    }
  }
  function H(e) {
    let n, o, a
    return {
      c() {
        ;(n = s("button")),
          (n.textContent = "DEFINITION"),
          m(n, "class", "animate__animated animate__fadeInUp svelte-g1k2p5"),
          h(n, "align-self", "center")
      },
      m(t, l) {
        c(t, n, l), o || ((a = p(n, "click", e[22])), (o = !0))
      },
      p: t,
      d(t) {
        t && u(n), (o = !1), a()
      },
    }
  }
  function Y(t) {
    let e,
      n,
      a,
      l,
      r,
      v,
      g,
      $,
      b,
      x,
      k = t[10][t[12]].meaning + ""
    return {
      c() {
        ;(e = s("h3")),
          (n = f(k)),
          (a = d()),
          (l = s("button")),
          (r = f("CORRECT")),
          (v = d()),
          (g = s("button")),
          ($ = f("INCORRECT")),
          m(e, "class", "animate__animated animate__fadeIn"),
          h(e, "margin", "0px 20px"),
          h(e, "align-self", "center"),
          m(l, "class", "animate__animated animate__fadeInUp svelte-g1k2p5"),
          m(
            l,
            "style",
            `\n          border-color: ${K};\n          background-color: ${Q};\n          color: #000;\n          align-self: center;\n        `
          ),
          m(g, "class", "animate__animated animate__fadeInUp svelte-g1k2p5"),
          m(
            g,
            "style",
            `\n          border-color: ${V};\n          background-color: ${X};\n          color: #000;\n          align-self: center;\n        `
          )
      },
      m(o, u) {
        c(o, e, u),
          i(e, n),
          c(o, a, u),
          c(o, l, u),
          i(l, r),
          c(o, v, u),
          c(o, g, u),
          i(g, $),
          b || ((x = [p(l, "click", t[20]), p(g, "click", t[21])]), (b = !0))
      },
      p(t, e) {
        5120 & e && k !== (k = t[10][t[12]].meaning + "") && _(n, k)
      },
      d(t) {
        t && u(e), t && u(a), t && u(l), t && u(v), t && u(g), (b = !1), o(x)
      },
    }
  }
  function J(e) {
    let n,
      a,
      l,
      g,
      $,
      b,
      x,
      k,
      y,
      C,
      E,
      O,
      T,
      w,
      D,
      N,
      R,
      j,
      I,
      A,
      S,
      U,
      F,
      M,
      L,
      P,
      W,
      q,
      J,
      K,
      Q,
      V,
      X,
      Z,
      tt,
      et,
      nt,
      ot,
      at,
      lt,
      rt,
      it,
      ct,
      ut,
      st,
      ft,
      dt,
      pt,
      mt,
      _t,
      ht,
      vt,
      gt,
      $t,
      bt,
      xt,
      kt,
      yt,
      Ct = e[4] + 1 + "",
      Et = e[10][e[12]][e[2]] + "",
      Ot = e[9][e[3]] + "",
      Tt = e[5] && z()
    function wt(t, e) {
      return t[7] ? G : t[8] ? B : void 0
    }
    let Dt = wt(e),
      Nt = Dt && Dt(e)
    function Rt(t, e) {
      return t[6] ? Y : t[8] || t[7] ? void 0 : H
    }
    let jt = Rt(e),
      It = jt && jt(e)
    return {
      c() {
        ;(n = s("head")),
          (n.innerHTML =
            '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>'),
          (a = d()),
          (l = s("main")),
          (g = s("div")),
          ($ = s("div")),
          (b = s("h3")),
          (x = f("ROUND: ")),
          (k = f(Ct)),
          (y = d()),
          (C = s("h6")),
          (E = f(e[11])),
          (O = f(" WORDS LEFT TO MASTER")),
          (T = d()),
          (w = s("h3")),
          (D = f("STUDYING \n      ")),
          (N = s("select")),
          (R = s("option")),
          (R.textContent = "3"),
          (j = s("option")),
          (j.textContent = "10"),
          (I = s("option")),
          (I.textContent = "25"),
          (A = s("option")),
          (A.textContent = "50"),
          (S = s("option")),
          (S.textContent = "75"),
          (U = s("option")),
          (U.textContent = "100"),
          (F = f("\n      WORDS PER ROUND")),
          (M = d()),
          (L = s("h3")),
          (P = f("NEED SCORE OF\n      ")),
          (W = s("select")),
          (q = s("option")),
          (q.textContent = "1"),
          (J = s("option")),
          (J.textContent = "2"),
          (K = s("option")),
          (K.textContent = "3"),
          (Q = s("option")),
          (Q.textContent = "4"),
          (V = s("option")),
          (V.textContent = "5"),
          (X = s("option")),
          (X.textContent = "6"),
          (Z = f("\n      TO MASTER A WORD")),
          (tt = d()),
          (et = s("h3")),
          (nt = f("MODE:\n      ")),
          (ot = s("select")),
          (at = s("option")),
          (at.textContent = "pinyin"),
          (lt = s("option")),
          (lt.textContent = "traditional"),
          (rt = s("option")),
          (rt.textContent = "simplified"),
          (it = d()),
          (ct = s("div")),
          (ut = s("h1")),
          (st = f(Et)),
          (dt = d()),
          Tt && Tt.c(),
          (pt = d()),
          (mt = s("h2")),
          (_t = f("SCORE: ")),
          (ht = s("span")),
          (vt = f(Ot)),
          (gt = d()),
          ($t = s("span")),
          Nt && Nt.c(),
          (bt = d()),
          (xt = s("div")),
          It && It.c(),
          h(C, "margin", "0px"),
          h($, "display", "flex"),
          h($, "justify-content", "space-between"),
          h($, "width", "100%"),
          h($, "align-items", "baseline"),
          (R.__value = 3),
          (R.value = R.__value),
          (j.__value = 10),
          (j.value = j.__value),
          (I.__value = 25),
          (I.value = I.__value),
          (A.__value = 50),
          (A.value = A.__value),
          (S.__value = 75),
          (S.value = S.__value),
          (U.__value = 100),
          (U.value = U.__value),
          (q.__value = 1),
          (q.value = q.__value),
          (J.__value = 2),
          (J.value = J.__value),
          (K.__value = 3),
          (K.value = K.__value),
          (Q.__value = 4),
          (Q.value = Q.__value),
          (V.__value = 5),
          (V.value = V.__value),
          (X.__value = 6),
          (X.value = X.__value),
          (at.__value = "pinyin"),
          (at.value = at.__value),
          (lt.__value = "traditional"),
          (lt.value = lt.__value),
          (rt.__value = "simplified"),
          (rt.value = rt.__value),
          m(g, "id", "info"),
          m(g, "class", "svelte-g1k2p5"),
          h(ut, "grid-column-start", "2"),
          h(ut, "margin-bottom", "0px"),
          m(ut, "class", (ft = r(e[5] ? "mastered" : "") + " svelte-g1k2p5")),
          m(ht, "id", "score-number"),
          m(mt, "id", "current-score"),
          m(mt, "class", "svelte-g1k2p5"),
          m($t, "id", "point-marker"),
          m($t, "class", "svelte-g1k2p5"),
          m(ct, "id", "word"),
          m(ct, "class", "svelte-g1k2p5"),
          m(xt, "id", "answer"),
          h(xt, "min-height", "200px"),
          h(xt, "display", "flex"),
          h(xt, "flex-direction", "column"),
          h(xt, "justify-content", "space-evenly"),
          m(l, "class", "svelte-g1k2p5")
      },
      m(t, o) {
        c(t, n, o),
          c(t, a, o),
          c(t, l, o),
          i(l, g),
          i(g, $),
          i($, b),
          i(b, x),
          i(b, k),
          i($, y),
          i($, C),
          i(C, E),
          i(C, O),
          i(g, T),
          i(g, w),
          i(w, D),
          i(w, N),
          i(N, R),
          i(N, j),
          i(N, I),
          i(N, A),
          i(N, S),
          i(N, U),
          v(N, e[1]),
          i(w, F),
          i(g, M),
          i(g, L),
          i(L, P),
          i(L, W),
          i(W, q),
          i(W, J),
          i(W, K),
          i(W, Q),
          i(W, V),
          i(W, X),
          v(W, e[0]),
          i(L, Z),
          i(g, tt),
          i(g, et),
          i(et, nt),
          i(et, ot),
          i(ot, at),
          i(ot, lt),
          i(ot, rt),
          v(ot, e[2]),
          i(l, it),
          i(l, ct),
          i(ct, ut),
          i(ut, st),
          i(ct, dt),
          Tt && Tt.m(ct, null),
          i(ct, pt),
          i(ct, mt),
          i(mt, _t),
          i(mt, ht),
          i(ht, vt),
          i(ct, gt),
          i(ct, $t),
          Nt && Nt.m($t, null),
          i(l, bt),
          i(l, xt),
          It && It.m(xt, null),
          kt ||
            ((yt = [
              p(N, "change", e[17]),
              p(W, "change", e[18]),
              p(ot, "change", e[19]),
            ]),
            (kt = !0))
      },
      p(t, [e]) {
        16 & e && Ct !== (Ct = t[4] + 1 + "") && _(k, Ct),
          2048 & e && _(E, t[11]),
          2 & e && v(N, t[1]),
          1 & e && v(W, t[0]),
          4 & e && v(ot, t[2]),
          5124 & e && Et !== (Et = t[10][t[12]][t[2]] + "") && _(st, Et),
          32 & e &&
            ft !== (ft = r(t[5] ? "mastered" : "") + " svelte-g1k2p5") &&
            m(ut, "class", ft),
          t[5]
            ? Tt || ((Tt = z()), Tt.c(), Tt.m(ct, pt))
            : Tt && (Tt.d(1), (Tt = null)),
          520 & e && Ot !== (Ot = t[9][t[3]] + "") && _(vt, Ot),
          Dt === (Dt = wt(t)) && Nt
            ? Nt.p(t, e)
            : (Nt && Nt.d(1), (Nt = Dt && Dt(t)), Nt && (Nt.c(), Nt.m($t, null))),
          jt === (jt = Rt(t)) && It
            ? It.p(t, e)
            : (It && It.d(1), (It = jt && jt(t)), It && (It.c(), It.m(xt, null)))
      },
      i: t,
      o: t,
      d(t) {
        t && u(n),
          t && u(a),
          t && u(l),
          Tt && Tt.d(),
          Nt && Nt.d(),
          It && It.d(),
          (kt = !1),
          o(yt)
      },
    }
  }
  const K = "#4CAF50",
    Q = "#99ee99",
    V = "#FF5252",
    X = "#ee9999"
  function Z(t, e, n) {
    let {
        vocabData: o = [
          {
            pinyin: "...loading",
            traditional: "...loading",
            simplified: "...loading",
            meaning: "...loading",
          },
        ],
      } = e,
      a = 2,
      l = 3,
      r = "pinyin",
      i = 0,
      c = 0,
      u = !1,
      s = !1,
      f = !1,
      d = !1,
      p = [...Array(o.length)].map((t) => 0),
      m = o.slice(0, l),
      _ = l,
      h = i
    const v = (t) => {
        n(1, (l = t)), n(10, (m = o.slice(0, t))), n(11, (_ = t))
      },
      g = (t) => {
        n(0, (a = t)), n(10, (m = o.slice(0, t))), n(11, (_ = t))
      },
      $ = (t) => {
        t
          ? (n(6, (s = !1)),
            n(7, (f = !0)),
            n(9, (p[i] += 1), p),
            p[i] === a && n(5, (u = !0)))
          : (n(6, (s = !1)),
            n(8, (d = !0)),
            n(9, (p[i] = Math.max(0, p[i] - 1)), p)),
          n(9, p),
          setTimeout(() => {
            const t = m.map((t) => o.indexOf(t)),
              e = t.filter((t) => p[t] < a)
            if (e.length > 0) {
              n(11, (_ = e.length)),
                n(3, (i = i + 1 > l * (c + 1) - 1 ? l * c : i + 1)),
                n(
                  12,
                  (h = ((t) => {
                    let e = h + 1 > l - 1 ? 0 : h + 1
                    for (; p[t[e]] === a; ) e + 1 > l - 1 ? (e = 0) : (e += 1)
                    return e
                  })(t))
                )
              const r = o.find((t) => t === m[h])
              r && n(3, (i = o.indexOf(r)))
            } else
              n(4, (c += 1)),
                n(10, (m = o.slice(c * l, (c + 1) * l))),
                n(3, (i = c * l)),
                n(12, (h = 0)),
                n(11, (_ = l))
            n(5, (u = !1)), n(7, (f = !1)), n(8, (d = !1))
          }, 300)
      }
    return (
      (t.$$set = (t) => {
        "vocabData" in t && n(16, (o = t.vocabData))
      }),
      [
        a,
        l,
        r,
        i,
        c,
        u,
        s,
        f,
        d,
        p,
        m,
        _,
        h,
        v,
        g,
        $,
        o,
        (t) => v(Number(t.currentTarget.value)),
        (t) => g(Number(t.currentTarget.value)),
        (t) => {
          n(2, (r = t.currentTarget.value))
        },
        () => $(!0),
        () => $(!1),
        () => n(6, (s = !0)),
      ]
    )
  }
  class tt extends q {
    constructor(t) {
      super(), W(this, t, Z, J, l, { vocabData: 16 })
    }
  }
  function et(e) {
    let n,
      o,
      a = e[2].message + ""
    return {
      c() {
        ;(n = s("p")), (o = f(a)), h(n, "color", "red")
      },
      m(t, e) {
        c(t, n, e), i(n, o)
      },
      p: t,
      i: t,
      o: t,
      d(t) {
        t && u(n)
      },
    }
  }
  function nt(e) {
    let n, o
    return (
      (n = new tt({ props: { vocabData: e[1] } })),
      {
        c() {
          F(n.$$.fragment)
        },
        m(t, e) {
          M(n, t, e), (o = !0)
        },
        p: t,
        i(t) {
          o || (A(n.$$.fragment, t), (o = !0))
        },
        o(t) {
          S(n.$$.fragment, t), (o = !1)
        },
        d(t) {
          L(n, t)
        },
      }
    )
  }
  function ot(e) {
    let n, o
    return (
      (n = new tt({})),
      {
        c() {
          F(n.$$.fragment)
        },
        m(t, e) {
          M(n, t, e), (o = !0)
        },
        p: t,
        i(t) {
          o || (A(n.$$.fragment, t), (o = !0))
        },
        o(t) {
          S(n.$$.fragment, t), (o = !1)
        },
        d(t) {
          L(n, t)
        },
      }
    )
  }
  function at(t) {
    let e,
      n,
      o = {
        ctx: t,
        current: null,
        token: null,
        hasCatch: !0,
        pending: ot,
        then: nt,
        catch: et,
        value: 1,
        error: 2,
        blocks: [, , ,],
      }
    return (
      U(t[0], o),
      {
        c() {
          ;(e = f("")), o.block.c()
        },
        m(t, a) {
          c(t, e, a),
            o.block.m(t, (o.anchor = a)),
            (o.mount = () => e.parentNode),
            (o.anchor = e),
            (n = !0)
        },
        p(e, [n]) {
          !(function (t, e, n) {
            const o = e.slice(),
              { resolved: a } = t
            t.current === t.then && (o[t.value] = a),
              t.current === t.catch && (o[t.error] = a),
              t.block.p(o, n)
          })(o, (t = e), n)
        },
        i(t) {
          n || (A(o.block), (n = !0))
        },
        o(t) {
          for (let t = 0; t < 3; t += 1) {
            S(o.blocks[t])
          }
          n = !1
        },
        d(t) {
          t && u(e), o.block.d(t), (o.token = null), (o = null)
        },
      }
    )
  }
  function lt(t) {
    return [fetch("/api/getMandarin").then((t) => t.json())]
  }
  return class extends q {
    constructor(t) {
      super(), W(this, t, lt, at, l, {})
    }
  }
})
//# sourceMappingURL=lang-flash-bundle.js.map
