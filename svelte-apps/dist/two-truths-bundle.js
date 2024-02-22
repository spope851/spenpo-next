!(function (t, e) {
  'object' == typeof exports && 'undefined' != typeof module
    ? (module.exports = e())
    : 'function' == typeof define && define.amd
    ? define(e)
    : ((t = 'undefined' != typeof globalThis ? globalThis : t || self).TwoTruths =
        e())
})(this, function () {
  'use strict'
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
  function r(t) {
    return 'function' == typeof t
  }
  function i(t, e) {
    return t != t
      ? e == e
      : t !== e || (t && 'object' == typeof t) || 'function' == typeof t
  }
  function s(t, e) {
    t.appendChild(e)
  }
  function l(t, e, n) {
    t.insertBefore(e, n || null)
  }
  function c(t) {
    t.parentNode && t.parentNode.removeChild(t)
  }
  function a(t) {
    return document.createElement(t)
  }
  function u(t) {
    return document.createTextNode(t)
  }
  function d() {
    return u(' ')
  }
  function f(t, e, n, o) {
    return t.addEventListener(e, n, o), () => t.removeEventListener(e, n, o)
  }
  function m(t, e, n) {
    null == n
      ? t.removeAttribute(e)
      : t.getAttribute(e) !== n && t.setAttribute(e, n)
  }
  function p(t, e, n, o) {
    null === n
      ? t.style.removeProperty(e)
      : t.style.setProperty(e, n, o ? 'important' : '')
  }
  let h
  function g(t) {
    h = t
  }
  const $ = [],
    _ = [],
    y = [],
    x = [],
    v = Promise.resolve()
  let b = !1
  function w(t) {
    y.push(t)
  }
  const k = new Set()
  let T = 0
  function E() {
    if (0 !== T) return
    const t = h
    do {
      try {
        for (; T < $.length; ) {
          const t = $[T]
          T++, g(t), L(t.$$)
        }
      } catch (t) {
        throw (($.length = 0), (T = 0), t)
      }
      for (g(null), $.length = 0, T = 0; _.length; ) _.pop()()
      for (let t = 0; t < y.length; t += 1) {
        const e = y[t]
        k.has(e) || (k.add(e), e())
      }
      y.length = 0
    } while ($.length)
    for (; x.length; ) x.pop()()
    ;(b = !1), k.clear(), g(t)
  }
  function L(t) {
    if (null !== t.fragment) {
      t.update(), o(t.before_update)
      const e = t.dirty
      ;(t.dirty = [-1]),
        t.fragment && t.fragment.p(t.ctx, e),
        t.after_update.forEach(w)
    }
  }
  const j = new Set()
  function I(t, e) {
    t && t.i && (j.delete(t), t.i(e))
  }
  function z(t, n, i, s) {
    const { fragment: l, after_update: c } = t.$$
    l && l.m(n, i),
      s ||
        w(() => {
          const n = t.$$.on_mount.map(e).filter(r)
          t.$$.on_destroy ? t.$$.on_destroy.push(...n) : o(n), (t.$$.on_mount = [])
        }),
      c.forEach(w)
  }
  function A(t, e) {
    const n = t.$$
    null !== n.fragment &&
      (o(n.on_destroy),
      n.fragment && n.fragment.d(e),
      (n.on_destroy = n.fragment = null),
      (n.ctx = []))
  }
  function B(t, e) {
    ;-1 === t.$$.dirty[0] &&
      ($.push(t), b || ((b = !0), v.then(E)), t.$$.dirty.fill(0)),
      (t.$$.dirty[(e / 31) | 0] |= 1 << e % 31)
  }
  function N(e, r, i, s, l, a, u, d = [-1]) {
    const f = h
    g(e)
    const m = (e.$$ = {
      fragment: null,
      ctx: [],
      props: a,
      update: t,
      not_equal: l,
      bound: n(),
      on_mount: [],
      on_destroy: [],
      on_disconnect: [],
      before_update: [],
      after_update: [],
      context: new Map(r?.context || (f ? f.$$?.context : [])),
      callbacks: n(),
      dirty: d,
      skip_bound: !1,
      root: r.target || f.$$?.root,
    })
    u && u(m?.root)
    let p = !1
    if (
      ((m.ctx = i
        ? i(e, r.props || {}, (t, n, ...o) => {
            const r = o.length ? o[0] : n
            return (
              m.ctx &&
                l(m.ctx[t], (m.ctx[t] = r)) &&
                (!m.skip_bound && m.bound[t] && m.bound[t](r), p && B(e, t)),
              n
            )
          })
        : []),
      m.update(),
      (p = !0),
      o(m.before_update),
      (m.fragment = !!s && s(m.ctx)),
      r.target)
    ) {
      if (r.hydrate) {
        const t = (function (t) {
          return Array.from(t.childNodes)
        })(r.target)
        m.fragment && m.fragment.l(t), t.forEach(c)
      } else m.fragment && m.fragment.c()
      r.intro && I(e.$$.fragment), z(e, r.target, r.anchor, r.customElement), E()
    }
    g(f)
  }
  class C {
    $destroy() {
      A(this, 1), (this.$destroy = t)
    }
    $on(e, n) {
      if (!r(n)) return t
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
  function M(t, e, n) {
    const o = t.slice()
    return (o[9] = e[n]), (o[11] = n), o
  }
  function F(e) {
    let n, o, r, i, d
    return {
      c() {
        ;(n = a('div')),
          (o = u('game over! ')),
          (r = a('button')),
          (r.innerHTML =
            '<svg width="24px" fill="#ff3e00" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m3.508 6.726c1.765-2.836 4.911-4.726 8.495-4.726 5.518 0 9.997 4.48 9.997 9.997 0 5.519-4.479 9.999-9.997 9.999-5.245 0-9.553-4.048-9.966-9.188-.024-.302.189-.811.749-.811.391 0 .715.3.747.69.351 4.369 4.012 7.809 8.47 7.809 4.69 0 8.497-3.808 8.497-8.499 0-4.689-3.807-8.497-8.497-8.497-3.037 0-5.704 1.597-7.206 3.995l1.991.005c.414 0 .75.336.75.75s-.336.75-.75.75h-4.033c-.414 0-.75-.336-.75-.75v-4.049c0-.414.336-.75.75-.75s.75.335.75.75z" fill-rule="nonzero"></path></svg>'),
          p(r, 'padding', '10px'),
          p(r, 'margin', '10px'),
          m(r, 'id', 'replay'),
          m(r, 'class', 'svelte-1syxrlx'),
          m(n, 'class', 'animate__animated animate__zoomInDown'),
          p(n, 'display', 'flex'),
          p(n, 'align-items', 'center')
      },
      m(t, c) {
        l(t, n, c), s(n, o), s(n, r), i || ((d = f(r, 'click', e[3])), (i = !0))
      },
      p: t,
      d(t) {
        t && c(n), (i = !1), d()
      },
    }
  }
  function H(t) {
    let e,
      n,
      o,
      r,
      i,
      d,
      p = t[9].sentence + ''
    function h() {
      return t[8](t[9], t[11])
    }
    return {
      c() {
        ;(e = a('button')),
          (n = u(p)),
          m(e, 'id', `truth${t[11]}`),
          m(e, 'class', 'animate__animated animate__fadeIn svelte-1syxrlx'),
          m(
            e,
            'style',
            (o = `margin: 10px; border-color: ${t[5](
              t[0][t[11]]
            )}; background-color: ${t[4](t[0][t[11]])};`)
          ),
          (e.disabled = r = 2 === t[1] || t[0].includes(2))
      },
      m(t, o) {
        l(t, e, o), s(e, n), i || ((d = f(e, 'click', h)), (i = !0))
      },
      p(i, s) {
        ;(t = i),
          4 & s &&
            p !== (p = t[9].sentence + '') &&
            (function (t, e) {
              ;(e = '' + e), t.wholeText !== e && (t.data = e)
            })(n, p),
          1 & s &&
            o !==
              (o = `margin: 10px; border-color: ${t[5](
                t[0][t[11]]
              )}; background-color: ${t[4](t[0][t[11]])};`) &&
            m(e, 'style', o),
          3 & s && r !== (r = 2 === t[1] || t[0].includes(2)) && (e.disabled = r)
      },
      d(t) {
        t && c(e), (i = !1), d()
      },
    }
  }
  function O(t) {
    let e
    function n(t) {
      return t[0][t[11]] < 2 ? H : F
    }
    let o = n(t),
      r = o(t)
    return {
      c() {
        r.c(), (e = u(''))
      },
      m(t, n) {
        r.m(t, n), l(t, e, n)
      },
      p(t, i) {
        o === (o = n(t)) && r
          ? r.p(t, i)
          : (r.d(1), (r = o(t)), r && (r.c(), r.m(e.parentNode, e)))
      },
      d(t) {
        r.d(t), t && c(e)
      },
    }
  }
  function P(e) {
    let n, o, r, i, d
    return {
      c() {
        ;(n = a('div')),
          (o = u('you win! ')),
          (r = a('button')),
          (r.innerHTML =
            '<svg width="24px" fill="#ff3e00" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m3.508 6.726c1.765-2.836 4.911-4.726 8.495-4.726 5.518 0 9.997 4.48 9.997 9.997 0 5.519-4.479 9.999-9.997 9.999-5.245 0-9.553-4.048-9.966-9.188-.024-.302.189-.811.749-.811.391 0 .715.3.747.69.351 4.369 4.012 7.809 8.47 7.809 4.69 0 8.497-3.808 8.497-8.499 0-4.689-3.807-8.497-8.497-8.497-3.037 0-5.704 1.597-7.206 3.995l1.991.005c.414 0 .75.336.75.75s-.336.75-.75.75h-4.033c-.414 0-.75-.336-.75-.75v-4.049c0-.414.336-.75.75-.75s.75.335.75.75z" fill-rule="nonzero"></path></svg>'),
          p(r, 'padding', '10px'),
          p(r, 'margin', '10px'),
          m(r, 'id', 'replay'),
          m(r, 'class', 'svelte-1syxrlx'),
          m(n, 'class', 'animate__animated animate__zoomInDown'),
          p(n, 'display', 'flex'),
          p(n, 'align-items', 'center')
      },
      m(t, c) {
        l(t, n, c), s(n, o), s(n, r), i || ((d = f(r, 'click', e[3])), (i = !0))
      },
      p: t,
      d(t) {
        t && c(n), (i = !1), d()
      },
    }
  }
  function D(e) {
    let n,
      o,
      r,
      i,
      u,
      f,
      p,
      h = e[2],
      g = []
    for (let t = 0; t < h.length; t += 1) g[t] = O(M(e, h, t))
    let $ = 2 === e[1] && P(e)
    return {
      c() {
        ;(n = a('head')),
          (n.innerHTML =
            '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>'),
          (o = d()),
          (r = a('main')),
          (i = a('div')),
          (u = a('h2')),
          (u.textContent = 'Guess which two are true!'),
          (f = d())
        for (let t = 0; t < g.length; t += 1) g[t].c()
        ;(p = d()),
          $ && $.c(),
          m(i, 'id', 'game'),
          m(i, 'class', 'animate__animated svelte-1syxrlx'),
          m(r, 'class', 'svelte-1syxrlx')
      },
      m(t, e) {
        l(t, n, e), l(t, o, e), l(t, r, e), s(r, i), s(i, u), s(i, f)
        for (let t = 0; t < g.length; t += 1) g[t].m(i, null)
        s(i, p), $ && $.m(i, null)
      },
      p(t, [e]) {
        if (127 & e) {
          let n
          for (h = t[2], n = 0; n < h.length; n += 1) {
            const o = M(t, h, n)
            g[n] ? g[n].p(o, e) : ((g[n] = O(o)), g[n].c(), g[n].m(i, p))
          }
          for (; n < g.length; n += 1) g[n].d(1)
          g.length = h.length
        }
        2 === t[1]
          ? $
            ? $.p(t, e)
            : (($ = P(t)), $.c(), $.m(i, null))
          : $ && ($.d(1), ($ = null))
      },
      i: t,
      o: t,
      d(t) {
        t && c(n),
          t && c(o),
          t && c(r),
          (function (t, e) {
            for (let n = 0; n < t.length; n += 1) t[n] && t[n].d(e)
          })(g, t),
          $ && $.d()
      },
    }
  }
  function S(t, e, n) {
    let o = [0, 0, 0],
      r = 0,
      i = [{ id: 0, sentence: '...loading', is_true: '1' }],
      { getTruths: s } = e
    const l = async () => {
      n(2, (i = (await s()) || i)),
        n(0, (o = [0, 0, 0])),
        n(1, (r = 0)),
        [0, 1, 2].forEach((t) => {
          const e = document.getElementById(`truth${t}`)
          e &&
            (e.classList.remove('animate__pulse'),
            e.classList.remove('animate__hinge'),
            e.classList.add('animate__fadeIn'))
        })
    }
    l()
    const c = (t) => (1 === t ? '#99ee99' : 2 === t ? '#ee9999' : void 0),
      a = (t) => (1 === t ? '#4CAF50' : 2 === t ? '#FF5252' : void 0),
      u = (t, e) => {
        const i = document.getElementById(`truth${e}`)
        '1' === t
          ? (n(1, r++, r),
            n(0, (o[e] = 1), o),
            i &&
              (i.classList.remove('animate__fadeIn'),
              i.classList.add('animate__pulse')))
          : (i &&
              (i.classList.add('animate__hinge'),
              i.setAttribute(
                'style',
                `border-color: ${a(2)}; background-color: ${c(2)};`
              )),
            setTimeout(() => {
              n(0, (o[e] = 2), o)
            }, 2e3))
      }
    return (
      (t.$$set = (t) => {
        'getTruths' in t && n(7, (s = t.getTruths))
      }),
      [o, r, i, l, c, a, u, s, (t, e) => u(t.is_true, e)]
    )
  }
  class q extends C {
    constructor(t) {
      super(), N(this, t, S, D, i, { getTruths: 7 })
    }
  }
  function G(e) {
    let n, o
    return (
      (n = new q({ props: { getTruths: e[0] } })),
      {
        c() {
          var t
          ;(t = n.$$.fragment) && t.c()
        },
        m(t, e) {
          z(n, t, e), (o = !0)
        },
        p: t,
        i(t) {
          o || (I(n.$$.fragment, t), (o = !0))
        },
        o(t) {
          !(function (t, e, n, o) {
            if (t && t.o) {
              if (j.has(t)) return
              j.add(t),
                (void 0).c.push(() => {
                  j.delete(t), o && (n && t.d(1), o())
                }),
                t.o(e)
            } else o && o()
          })(n.$$.fragment, t),
            (o = !1)
        },
        d(t) {
          A(n, t)
        },
      }
    )
  }
  function J() {
    return [
      async () =>
        await fetch('/api/getTruths', {
          cache: 'no-store',
        }).then((t) => t.json()),
    ]
  }
  return class extends C {
    constructor(t) {
      super(), N(this, t, J, G, i, {})
    }
  }
})
//# sourceMappingURL=two-truths-bundle.js.map
