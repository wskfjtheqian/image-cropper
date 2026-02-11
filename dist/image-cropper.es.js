var O = /* @__PURE__ */ ((l) => (l[l.SIZE = 0] = "SIZE", l[l.RATIO = 1] = "RATIO", l))(O || {});
class f {
  // [x, y, width, height]
  constructor(t, e, i, s) {
    this.angle = 0, this.width = t, this.height = e, this.path = s, this.viewBox = i;
  }
  clone(t) {
    const e = new f(this.width, this.height, this.viewBox, this.path);
    return e.setAngle(t ?? this.angle), e;
  }
  setAngle(t) {
    this.angle = t;
  }
  setViewBox(t, e, i, s) {
    this.viewBox = [t, e, i, s];
  }
  draw(t, e, i, s = "#000", o, r = 1) {
    if (!this.path || this.path.length === 0) return;
    t.save(), t.lineJoin = "round", t.lineCap = "round";
    let n = 0, h = 0, d = this.width, c = this.height;
    this.viewBox && ([n, h, d, c] = this.viewBox);
    const m = e / d, g = i / c, w = Math.min(m, g);
    t.translate(e / 2, i / 2), t.rotate(this.angle * Math.PI / 180), t.scale(w, w), t.translate(-d / 2 - n + 0.5 / w, -c / 2 - h + 0.5 / w);
    const L = new Path2D();
    for (const k of this.path)
      L.addPath(new Path2D(k));
    t.strokeStyle = s, t.lineWidth = Math.max(1, r / w), t.stroke(L), o && (t.fillStyle = o, t.fill(L)), t.restore();
  }
}
const H = new f(
  24,
  24,
  [0, 0, 24, 24],
  ["M13.6,12c0,0.9-0.7,1.6-1.6,1.6s-1.6-0.7-1.6-1.6s0.7-1.6,1.6-1.6S13.6,11.1,13.6,12z M21,10.4v3.3h-2.1c-0.6,2.6-2.7,4.7-5.3,5.3V21h-3.3v-2.1c-2.6-0.6-4.7-2.7-5.3-5.3H3v-3.3h2.1c0.6-2.6,2.7-4.7,5.3-5.3V3h3.3v2.1c2.6,0.6,4.7,2.7,5.3,5.3H21z M16.7,12c0-2.6-2.1-4.7-4.7-4.7S7.3,9.4,7.3,12s2.1,4.7,4.7,4.7S16.7,14.6,16.7,12z"]
), S = new f(
  24,
  24,
  [0, 0, 24, 24],
  ["M0,4.96h24V11H0V4.96z"]
  // 一个简单矩形
), M = new f(
  24,
  24,
  [0, 0, 24, 24],
  ["M12.91,4.96 L0,4.96 L0,11 L12.91,11 L12.91,24 L18.95,24 L18.95,11 L18.95,4.96 Z"]
), p = new f(
  24,
  24,
  [0, 0, 24, 24],
  ["M13.7,12L13.7,12l0-7.3H17L12,0.1L6.9,4.7h3.3v14.5H6.8l5.1,4.7l5.1-4.7h-3.3V12z"]
), W = new f(
  24,
  24,
  [0, 0, 24, 24],
  ["M20.8,18.3L20.8,18.3l-0.3,0c0,0,0,0,0,0c0-8.2-6.6-14.8-14.8-14.8c0,0-0.1,0-0.1,0V0.2L0.1,5.7l5.5,5.5V7.6c0,0,0.1,0,0.1,0c5.9,0,10.7,4.8,10.7,10.7c0,0,0,0,0,0h-0.3l-0.1,0h-3.1l5.5,5.5l5.5-5.5H20.8z"]
), x = new f(
  24,
  24,
  [0, 0, 24, 24],
  ["M19.3,17.1v-3.3h-5.5v5.5h3.3l-5.2,4.7l-5.1-4.7h3.3v-5.5H4.6v3.3L-0.1,12l4.7-5.2v3.4h5.5V4.7H6.8L12-0.1l5.1,4.7h-3.3v5.5h5.5V6.8L24,12L19.3,17.1z"]
), I = new f(
  24,
  24,
  [0, 0, 24, 24],
  ["M24,13.9H13.9V24h-4V13.9H-0.1v-4H10v-10h4v10H24V13.9z"]
), D = new f(
  24,
  24,
  [0, 0, 24, 24],
  ["M18.8,5.4c-0.4,0-0.7,0.1-1,0.4c-0.3,0.3-0.4,0.6-0.4,1v5.6c0,0.3-0.2,0.4-0.4,0.4c-0.1,0-0.2,0-0.3-0.1c-0.1-0.1-0.1-0.2-0.1-0.3V3.1c0-0.4-0.1-0.7-0.4-1c-0.3-0.3-0.6-0.4-1-0.4c-0.4,0-0.7,0.1-1,0.4c-0.3,0.3-0.4,0.6-0.4,1v8c0,0.1,0,0.2-0.1,0.3c-0.1,0.1-0.2,0.1-0.3,0.1s-0.2,0-0.3-0.1c-0.1-0.1-0.1-0.2-0.1-0.3V1.9c0-0.4-0.1-0.7-0.4-1c-0.3-0.3-0.6-0.4-1-0.4c-0.4,0-0.7,0.1-1,0.4c-0.3,0.3-0.4,0.6-0.4,1v9.3c0,0.3-0.2,0.4-0.4,0.4c-0.1,0-0.2,0-0.3-0.1c-0.1-0.1-0.1-0.2-0.1-0.3v-8c0-0.4-0.1-0.7-0.4-1s-0.6-0.4-1-0.4s-0.7,0.1-1,0.4c-0.3,0.3-0.4,0.6-0.4,1v9.7c0,0.4-0.1,0.7-0.2,0.9c-0.1,0.2-0.2,0.3-0.4,0.4c-0.2,0-0.4,0-0.5-0.1c-0.2-0.1-0.4-0.4-0.6-0.7l-2-3.4C2.7,9.5,2.4,9.3,2.1,9.2c-0.3-0.1-0.7,0-1,0.1c-0.3,0.2-0.5,0.5-0.6,0.9c-0.1,0.4-0.1,0.8,0.1,1.1s0.2,0.3,0.2,0.3l0.5,1.1L3.8,18c0.6,1.2,1.2,2.2,1.8,3c0.5,0.6,1,1.1,1.5,1.5c0.3,0.3,0.7,0.4,1,0.6c0.2,0.1,0.3,0.1,0.4,0.1h6.1c0.9,0,1.8-0.3,2.5-1c0.6-0.5,1.1-1.2,1.5-2.1c1-2.1,1.6-4.8,1.6-8.2V6.8c0-0.4-0.1-0.7-0.4-1C19.6,5.6,19.2,5.4,18.8,5.4L18.8,5.4z"]
);
class u {
  constructor(t, e) {
    this.x = t, this.y = e;
  }
}
class B {
  constructor(t, e, i) {
    this.x = t, this.y = e, this.z = i;
  }
}
class a {
  constructor(t, e, i, s) {
    this.left = t, this.top = e, this.right = i, this.bottom = s;
  }
  static fromSize(t, e, i, s) {
    return new a(t, e, t + i, e + s);
  }
  static fromCenter(t, e, i) {
    return new a(t.x - e / 2, t.y - i / 2, t.x + e / 2, t.y + i / 2);
  }
  get width() {
    return this.right - this.left;
  }
  get height() {
    return this.bottom - this.top;
  }
  get center() {
    return new u(this.left + (this.right - this.left) / 2, this.top + (this.bottom - this.top) / 2);
  }
  clone() {
    return new a(this.left, this.top, this.right, this.bottom);
  }
  toString() {
    return `rect[${this.left.toFixed(2)}, ${this.top.toFixed(2)}, ${this.right.toFixed(2)}, ${this.bottom.toFixed(2)}],size[${this.width.toFixed(2)}, ${this.height.toFixed(2)}],center[${this.center.x.toFixed(2)}, ${this.center.y.toFixed(2)}]`;
  }
}
function T(l, t, e) {
  const { scaleX: i, scaleY: s, rotation: o, translateX: r, translateY: n } = t, h = Math.cos(o), d = Math.sin(o), c = l.center;
  return [
    { x: l.left, y: l.top },
    { x: l.right, y: l.top },
    { x: l.left, y: l.bottom },
    { x: l.right, y: l.bottom }
  ].map((g) => {
    const w = g.x - r - c.x, L = g.y - n - c.y, k = w * h + L * d, z = -w * d + L * h, E = k / i + c.x, P = z / s + c.y;
    return {
      x: E - e.x,
      y: P - e.y
    };
  });
}
class b {
  constructor(t, e, i) {
    this.layoutList = [], this.rect = new a(0, 0, 0, 0), this.parent = null, this.config = {
      backgroundBoxSize: 10,
      backgroundBoxColor0: "#fff",
      backgroundBoxColor1: "#ddd",
      guidelineWidth: 1,
      guidelineColor1: "#ffffff60",
      guidelineColor2: "#00000060",
      guidelineDsah: 4,
      borderWidth: 1.5,
      borderColor1: "#000000",
      borderColor2: "#ffffff",
      pointRadius: 12,
      cursorStrokeLineWidth: 2,
      cursorStrokeColor: "#ffffff",
      cursorColor: "#000000",
      cursorSize: 18
    }, this.parent = t, this.cursor = e, Y(this.config, i);
  }
  setRect(t) {
    this.rect = t;
  }
  getRect() {
    return this.rect;
  }
  getRoot() {
    let t = this.parent;
    for (; t?.parent; )
      t = t.parent;
    return t;
  }
  checkPointInRect(t) {
    return t.x >= this.rect.left && t.x <= this.rect.right && t.y >= this.rect.top && t.y <= this.rect.bottom;
  }
  start(t) {
    for (let e = this.layoutList.length - 1; e >= 0; e--)
      if (this.layoutList[e].start(t))
        return !0;
    return !1;
  }
  move(t) {
    for (let e = this.layoutList.length - 1; e >= 0; e--)
      if (this.layoutList[e].move(t))
        return !0;
    return !1;
  }
  end(t) {
    for (let e = this.layoutList.length - 1; e >= 0; e--)
      if (this.layoutList[e].end(t))
        return !0;
    return !1;
  }
  wheel(t) {
    for (let e = this.layoutList.length - 1; e >= 0; e--)
      if (this.layoutList[e].wheel(t))
        return !0;
    return !1;
  }
  over() {
    this.getRoot()?.setCursor(this.cursor);
  }
  out() {
  }
  checkOverOut(t) {
    for (let e = this.layoutList.length - 1; e >= 0; e--)
      if (this.layoutList[e].checkOverOut(t))
        return !0;
    return this.checkPointInRect(t) ? (this.getRoot()?.setOverLayout(this, t), !0) : !1;
  }
  draw(t) {
    for (const e of this.layoutList)
      t.save(), e.draw(t), t.restore();
  }
  remove() {
    this.parent && this.parent.layoutList.splice(this.parent.layoutList.indexOf(this), 1);
  }
}
class V extends b {
  constructor(t, e) {
    super(t, I.clone(), e), this.mousePoint = new u(0, 0), this.selectRect = new a(0, 0, 0, 0), this.onStartSelect = null, this.onMoveSelect = null, this.onEndSelect = null;
  }
  setOnStartSelect(t) {
    this.onStartSelect = t;
  }
  setOnMoveSelect(t) {
    this.onMoveSelect = t;
  }
  setOnEndSelect(t) {
    this.onEndSelect = t;
  }
  start(t) {
    return this.mousePoint = t, this.selectRect = new a(t.x, t.y, t.x, t.y), this.onStartSelect?.call(this, this.selectRect), !0;
  }
  move(t) {
    const e = this.selectRect.clone();
    if (e.right += t.x - this.mousePoint.x, e.bottom += t.y - this.mousePoint.y, this.config?.outWidth && this.config?.outHeight) {
      const i = Math.min(e.width / this.config?.outWidth, e.height / this.config?.outHeight);
      e.right = e.left + this.config?.outWidth * i, e.bottom = e.top + this.config?.outHeight * i;
    }
    return this.selectRect = e, this.mousePoint = t, this.onMoveSelect?.call(this, this.selectRect), !0;
  }
  end() {
    return this.onEndSelect?.call(this, this.selectRect), !0;
  }
  draw(t) {
    const { left: e, top: i, right: s, bottom: o } = this.rect, r = s - e, n = o - i;
    for (let h = 0; h < n; h += this.config.backgroundBoxSize) {
      let d = Math.floor(h / this.config.backgroundBoxSize) % 2 ? this.config.backgroundBoxColor0 : this.config.backgroundBoxColor1;
      for (let c = 0; c < r; c += this.config.backgroundBoxSize)
        t.fillStyle = d = d === this.config.backgroundBoxColor1 ? this.config.backgroundBoxColor0 : this.config.backgroundBoxColor1, t.fillRect(c, h, this.config.backgroundBoxSize, this.config.backgroundBoxSize);
    }
  }
}
class X extends b {
  constructor(t, e) {
    super(t, null, e), this.scale = 1, this.angle = 0, this.clipRect = new a(0, 0, 0, 0), this.offset = new u(0, 0);
  }
  initScale(t) {
    this.image && (this.scale = Math.max(t.width / this.image.width, t.height / this.image.height));
  }
  reset() {
    this.angle = 0, this.offset = new u(0, 0), this.config.defaultClipRect ? this.scale = Math.max(this.clipRect.width / this.image.width, this.clipRect.height / this.image.height) : (this.clipRect = new a(this.rect.left, this.rect.top, this.rect.right, this.rect.bottom), this.scale = Math.min(this.rect.width / this.image.width, this.rect.height / this.image.height));
  }
  setRect(t) {
    super.setRect(t), this.clipRect = new a(t.left, t.top, t.right, t.bottom);
  }
  setClipRect(t) {
    const e = new u(
      this.clipRect.left + this.clipRect.width / 2 - (t.left + t.width / 2),
      this.clipRect.top + this.clipRect.height / 2 - (t.top + t.height / 2)
    );
    this.moveImage(e), this.clipRect = t;
  }
  checkOverOut(t) {
    return !1;
  }
  setImage(t) {
    this.image = t, this.rect.width / t.width, this.rect.height / t.height;
  }
  setRotate(t) {
    this.angle -= t;
  }
  start() {
    return !1;
  }
  move() {
    return !1;
  }
  end() {
    return !1;
  }
  wheel(t) {
    return t.y < 0 ? this.scale *= 1 + 0.1 : this.scale *= 1 - 0.1, this.scale = Math.max(0.1, Math.min(5, this.scale)), !0;
  }
  moveImage(t) {
    const e = Math.cos(-this.angle * Math.PI / 180), i = Math.sin(-this.angle * Math.PI / 180), s = t.x * e - t.y * i, o = t.x * i + t.y * e;
    this.offset.x += s / this.scale, this.offset.y += o / this.scale;
  }
  draw(t) {
    if (!this.image)
      return;
    const e = new u(this.clipRect.left + this.clipRect.width / 2, this.clipRect.top + this.clipRect.height / 2);
    t.translate(e.x, e.y), t.scale(this.scale, this.scale), t.rotate(this.angle * Math.PI / 180), t.translate(this.offset.x, this.offset.y), t.drawImage(this.image, -this.image.width / 2, -this.image.height / 2);
  }
  getOutSize() {
    let t = 1;
    return this.config.outType == 0 && (this.config?.outWidth && this.config?.outHeight ? t = Math.min(this.config?.outWidth / this.clipRect.width, this.config?.outHeight / this.clipRect.height) : this.config?.outWidth ? t = this.config?.outWidth / this.clipRect.width : this.config?.outHeight && (t = this.config?.outHeight / this.clipRect.height)), {
      width: this.clipRect.width * t,
      height: this.clipRect.height * t,
      scale: t
    };
  }
  getClipCanvas() {
    const t = document.createElement("canvas"), e = t.getContext("2d");
    if (!e)
      throw new Error("no canvas context");
    const { width: i, height: s, scale: o } = this.getOutSize();
    return t.width = i, t.height = s, e.translate(t.width / 2, t.height / 2), e.scale(this.scale * o, this.scale * o), e.rotate(this.angle * Math.PI / 180), e.translate(this.offset.x, this.offset.y), e.drawImage(
      this.image,
      -this.image.width / 2,
      -this.image.height / 2,
      this.image.width,
      this.image.height
    ), t;
  }
  toBlob(t, e) {
    return this.image ? new Promise((i, s) => {
      try {
        this.getClipCanvas().toBlob((o) => {
          i(o);
        }, t ?? "image/png", e);
      } catch (o) {
        s(o);
      }
    }) : Promise.reject(new Error("image not loaded"));
  }
  toDataUrl(t, e) {
    return this.image ? new Promise((i, s) => {
      try {
        i(this.getClipCanvas().toDataURL(t ?? "image/png", e));
      } catch (o) {
        s(o);
      }
    }) : Promise.reject(new Error("image not loaded"));
  }
  onEndSelect() {
    const t = a.fromCenter(this.rect.center, this.image.width, this.image.height), e = t.center;
    new u(this.offset.x + e.x, this.offset.y + e.y), T(
      this.clipRect,
      {
        rotation: -this.angle * Math.PI / 180,
        scaleX: this.scale,
        scaleY: this.scale,
        translateX: 0,
        translateY: 0
      },
      t.center
    ).forEach((s) => {
      F(s, this.image.width, this.image.height);
    });
  }
}
function Y(l, ...t) {
  if (l == null)
    throw new TypeError("Cannot convert undefined or null to object");
  const e = Object(l);
  return t.forEach((i) => {
    if (i != null)
      for (const s in i)
        i.hasOwnProperty(s) && i[s] !== void 0 && (e[s] = i[s]);
  }), e;
}
function F(l, t, e, i = { x: 0, y: 0 }, s = 1e-10) {
  const o = t / 2, r = e / 2, n = l.x - i.x, h = l.y - i.y;
  return n >= -o - s && n <= o + s && h >= -r - s && h <= r + s;
}
class A extends b {
  constructor(t, e, i) {
    super(t, e, i), this.layoutList = [], this.isChecked = !1, this.mousePoint = new u(0, 0), this.onMoveLayout = null, this.onEndMoveLayout = null, this.onEndSelect = null, this.center = new j(this, H, 0, D.clone(), i), this.topLeft = new y(this, M, -90, p.clone(-45), i), this.topCenter = new y(this, S, 0, p.clone(), i), this.topRight = new y(this, M, 0, p.clone(45), i), this.centerLeft = new y(this, S, -90, p.clone(90), i), this.centerRight = new y(this, S, 90, p.clone(90), i), this.bottomLeft = new y(this, M, 180, p.clone(45), i), this.bottomCenter = new y(this, S, 180, p.clone(), i), this.bottomRight = new y(this, M, 90, p.clone(-45), i), this.center.setOnMoveLayout(this.onMoveCenter.bind(this)), this.topLeft.setOnMoveLayout(this.onMoveTopLeft.bind(this)), this.topCenter.setOnMoveLayout(this.onMoveTopCenter.bind(this)), this.topRight.setOnMoveLayout(this.onMoveTopRight.bind(this)), this.centerLeft.setOnMoveLayout(this.onMoveCenterLeft.bind(this)), this.centerRight.setOnMoveLayout(this.onMoveCenterRight.bind(this)), this.bottomLeft.setOnMoveLayout(this.onMoveBottomLeft.bind(this)), this.bottomCenter.setOnMoveLayout(this.onMoveBottomCenter.bind(this)), this.bottomRight.setOnMoveLayout(this.onMoveBottomRight.bind(this)), this.center.setOnEndLayout(this.onEndLayout.bind(this)), this.topLeft.setOnEndLayout(this.onEndLayout.bind(this)), this.topCenter.setOnEndLayout(this.onEndLayout.bind(this)), this.topRight.setOnEndLayout(this.onEndLayout.bind(this)), this.centerLeft.setOnEndLayout(this.onEndLayout.bind(this)), this.centerRight.setOnEndLayout(this.onEndLayout.bind(this)), this.bottomLeft.setOnEndLayout(this.onEndLayout.bind(this)), this.bottomCenter.setOnEndLayout(this.onEndLayout.bind(this)), this.bottomRight.setOnEndLayout(this.onEndLayout.bind(this)), this.layoutList = [
      this.topLeft,
      this.topCenter,
      this.topRight,
      this.centerLeft,
      this.centerRight,
      this.bottomLeft,
      this.bottomCenter,
      this.bottomRight,
      this.center
    ];
  }
  onEndLayout() {
    this.onEndSelect?.call(this, this.rect);
  }
  setOnMoveLayout(t) {
    this.onMoveLayout = t;
  }
  setOnEndMoveLayout(t) {
    this.onEndMoveLayout = t;
  }
  setOnEndSelect(t) {
    this.onEndSelect = t;
  }
  onMoveCenter(t) {
    const e = this.rect.clone();
    e.left += t.x, e.top += t.y, e.right += t.x, e.bottom += t.y, this.rect = e, this.setRect(this.rect);
  }
  onMoveTopLeft(t) {
    const e = this.rect.clone();
    if (e.left += t.x, e.top += t.y, e.left >= e.right - 20 && (e.left = e.right - 20), e.top >= e.bottom - 20 && (e.top = e.bottom - 20), this.config?.outWidth && this.config?.outHeight) {
      const i = this.config?.outWidth > this.config?.outHeight ? e.width / this.config?.outWidth : e.height / this.config?.outHeight, s = this.config?.outWidth * i, o = this.config?.outHeight * i;
      e.left += e.width - s, e.top += e.height - o;
    }
    this.rect = e, this.setRect(this.rect);
  }
  onMoveTopCenter(t) {
    const e = this.rect.clone();
    if (e.top += t.y, e.top >= e.bottom - 20 && (e.top = e.bottom - 20), this.config?.outWidth && this.config?.outHeight) {
      const i = e.height / this.config?.outHeight, s = this.config?.outWidth * i;
      e.left += (e.width - s) / 2, e.right = e.left + s, e.bottom = e.top + this.config?.outHeight * i;
    }
    this.rect = e, this.setRect(this.rect);
  }
  onMoveTopRight(t) {
    const e = this.rect.clone();
    if (e.right += t.x, e.top += t.y, e.right <= e.left + 20 && (e.right = e.left + 20), e.top >= e.bottom - 20 && (e.top = e.bottom - 20), this.config?.outWidth && this.config?.outHeight) {
      const i = this.config?.outWidth > this.config?.outHeight ? e.width / this.config?.outWidth : e.height / this.config?.outHeight;
      e.right = e.left + this.config?.outWidth * i, e.top += e.height - this.config?.outHeight * i;
    }
    this.rect = e, this.setRect(this.rect);
  }
  onMoveCenterLeft(t) {
    const e = this.rect.clone();
    if (e.left += t.x, e.left >= e.right - 20 && (e.left = e.right - 20), this.config?.outWidth && this.config?.outHeight) {
      const i = e.width / this.config?.outWidth, s = this.config?.outHeight * i;
      e.top += (e.height - s) / 2, e.bottom = e.top + s, e.right = e.left + this.config?.outWidth * i;
    }
    this.rect = e, this.setRect(this.rect);
  }
  onMoveCenterRight(t) {
    const e = this.rect.clone();
    if (e.right += t.x, e.right <= e.left + 20 && (e.right = e.left + 20), this.config?.outWidth && this.config?.outHeight) {
      const i = e.width / this.config?.outWidth, s = this.config?.outHeight * i;
      e.top += (e.height - s) / 2, e.bottom = e.top + s, e.right = e.left + this.config?.outWidth * i;
    }
    this.rect = e, this.setRect(this.rect);
  }
  onMoveBottomLeft(t) {
    const e = this.rect.clone();
    if (e.left += t.x, e.bottom += t.y, e.left >= e.right - 20 && (e.left = e.right - 20), e.bottom <= e.top + 20 && (e.bottom = e.top + 20), this.config?.outWidth && this.config?.outHeight) {
      const i = this.config?.outWidth > this.config?.outHeight ? e.width / this.config?.outWidth : e.height / this.config?.outHeight;
      e.left += e.width - this.config?.outWidth * i, e.bottom = e.top + this.config?.outHeight * i;
    }
    this.rect = e, this.setRect(this.rect);
  }
  onMoveBottomCenter(t) {
    const e = this.rect.clone();
    if (e.bottom += t.y, e.bottom <= e.top + 20 && (e.bottom = e.top + 20), this.config?.outWidth && this.config?.outHeight) {
      const i = e.height / this.config?.outHeight, s = this.config?.outWidth * i;
      e.left += (e.width - s) / 2, e.right = e.left + s, e.bottom = e.top + this.config?.outHeight * i;
    }
    this.rect = e, this.setRect(this.rect);
  }
  onMoveBottomRight(t) {
    const e = this.rect.clone();
    if (e.right += t.x, e.bottom += t.y, e.right <= e.left + 20 && (e.right = e.left + 20), e.bottom <= e.top + 20 && (e.bottom = e.top + 20), this.config?.outWidth && this.config?.outHeight) {
      const i = this.config?.outWidth > this.config?.outHeight ? e.width / this.config?.outWidth : e.height / this.config?.outHeight;
      e.right = e.left + this.config?.outWidth * i, e.bottom = e.top + this.config?.outHeight * i;
    }
    this.rect = e, this.setRect(this.rect);
  }
  start(t) {
    return super.start(t) ? !0 : this.checkPointInRect(t) ? (this.isChecked = !0, this.mousePoint = t, !0) : !1;
  }
  move(t) {
    return this.isChecked && (this.onMoveLayout?.call(this, new u(t.x - this.mousePoint.x, t.y - this.mousePoint.y)), this.mousePoint = t), super.move(t);
  }
  end(t) {
    return this.isChecked && (this.onEndMoveLayout?.call(this, new u(t.x - this.mousePoint.x, t.y - this.mousePoint.y)), this.mousePoint = t, this.isChecked = !1), super.end(t);
  }
  setRect(t) {
    super.setRect(t);
    const { left: e, top: i, right: s, bottom: o } = t, r = s - e, n = o - i, h = this.config.pointRadius * 2;
    this.center.setRect(a.fromSize(e + r / 2, i + n / 2, h, h)), this.topLeft.setRect(a.fromSize(e, i, h, h)), this.topCenter.setRect(a.fromSize(e + r / 2, i, h, h)), this.topRight.setRect(a.fromSize(s, i, h, h)), this.centerLeft.setRect(a.fromSize(e, i + n / 2, h, h)), this.centerRight.setRect(a.fromSize(s, i + n / 2, h, h)), this.bottomLeft.setRect(a.fromSize(e, o, h, h)), this.bottomCenter.setRect(a.fromSize(e + r / 2, o, h, h)), this.bottomRight.setRect(a.fromSize(s, o, h, h));
  }
  drawEllipse(t, e, i, s, o) {
    const r = 0.5522848, n = s / 2 * r, h = o / 2 * r, d = e + s, c = i + o, m = e + s / 2, g = i + o / 2;
    t.moveTo(e, g), t.bezierCurveTo(e, g - h, m - n, i, m, i), t.bezierCurveTo(m + n, i, d, g - h, d, g), t.bezierCurveTo(d, g + h, m + n, c, m, c), t.bezierCurveTo(m - n, c, e, g + h, e, g);
  }
  drawMask(t) {
    this.config.circle ? this.drawEllipse(t, this.rect.left, this.rect.top, this.rect.width, this.rect.height) : t.roundRect(this.rect.left, this.rect.top, this.rect.width, this.rect.height, this.config.circleRadius ?? 0);
  }
  drawLine(t, e, i) {
    t.save(), t.beginPath(), t.moveTo(e.x, e.y), t.lineTo(i.x, i.y), t.closePath(), t.setLineDash([this.config.guidelineDsah, this.config.guidelineDsah]), t.lineWidth = this.config.guidelineWidth, t.strokeStyle = this.config.guidelineColor1, t.lineDashOffset = 0, t.stroke(), t.strokeStyle = this.config.guidelineColor2, t.lineDashOffset = this.config.guidelineDsah, t.stroke(), t.restore();
  }
  draw(t) {
    const { left: e, top: i, right: s, bottom: o } = this.rect;
    let r = s - e, n = o - i;
    t.lineWidth = this.config.borderWidth, t.beginPath(), t.rect(e - 1, i - 1, r + 2, n + 2), t.closePath(), t.strokeStyle = this.config.borderColor2, t.stroke(), t.beginPath(), this.config.circle ? this.drawEllipse(t, e, i, r, n) : t.roundRect(e, i, r, n, this.config.circleRadius ?? 0), t.closePath(), t.strokeStyle = this.config.borderColor1, t.stroke(), r = r / 3, n = n / 3, this.drawLine(t, new u(e, i + n), new u(s, i + n)), this.drawLine(t, new u(e, i + n * 2), new u(s, i + n * 2)), this.drawLine(t, new u(e + r, i), new u(e + r, o)), this.drawLine(t, new u(e + r * 2, i), new u(e + r * 2, o)), super.draw(t);
  }
  endSelect() {
    if (this.rect.width < 20 || this.rect.height < 20) {
      const e = this.rect.center, i = new a(e.x - 10, e.y - 10, e.x + 10, e.y + 10);
      new C(this.rect, i, 200, () => {
        this.onEndLayout();
      }).run();
      const { left: s, top: o, right: r, bottom: n } = i, h = r - s, d = n - o, c = this.config.pointRadius * 2;
      this.center.endSelect(a.fromSize(s + h / 2, o + d / 2, c, c)), this.topLeft.endSelect(a.fromSize(s, o, c, c)), this.topCenter.endSelect(a.fromSize(s + h / 2, o, c, c)), this.topRight.endSelect(a.fromSize(r, o, c, c)), this.centerLeft.endSelect(a.fromSize(s, o + d / 2, c, c)), this.centerRight.endSelect(a.fromSize(r, o + d / 2, c, c)), this.bottomLeft.endSelect(a.fromSize(s, n, c, c)), this.bottomCenter.endSelect(a.fromSize(s + h / 2, n, c, c)), this.bottomRight.endSelect(a.fromSize(r, n, c, c));
    }
  }
}
class y extends b {
  constructor(t, e, i, s, o) {
    super(t, s, o), this.isChecked = !1, this.mousePoint = new u(0, 0), this.onMoveLayout = null, this.onEndLayout = null, this.icon = e.clone(), this.icon.setAngle(i);
  }
  setOnMoveLayout(t) {
    this.onMoveLayout = t;
  }
  setOnEndLayout(t) {
    this.onEndLayout = t;
  }
  setRect(t) {
    super.setRect(new a(
      t.left - this.config.pointRadius,
      t.top - this.config.pointRadius,
      t.right - this.config.pointRadius,
      t.bottom - this.config.pointRadius
    ));
  }
  start(t) {
    return this.checkPointInRect(t) ? (this.isChecked = !0, this.mousePoint = t, !0) : !1;
  }
  move(t) {
    return this.isChecked && (this.onMoveLayout?.call(this, new u(t.x - this.mousePoint.x, t.y - this.mousePoint.y)), this.mousePoint = t), !1;
  }
  end(t) {
    return this.isChecked && (this.onEndLayout?.call(this, new u(t.x - this.mousePoint.x, t.y - this.mousePoint.y)), this.mousePoint = t, this.isChecked = !1), !1;
  }
  draw(t) {
    t.save(), t.translate(this.rect.left, this.rect.top), this.icon.draw(
      t,
      this.rect.width,
      this.rect.height,
      this.config.borderColor1,
      this.config.borderColor2,
      this.config.borderWidth
    ), t.restore();
  }
  endSelect(t) {
    const e = new a(
      t.left - this.config.pointRadius,
      t.top - this.config.pointRadius,
      t.right - this.config.pointRadius,
      t.bottom - this.config.pointRadius
    );
    new C(this.rect, e, 200).run();
  }
}
class j extends y {
  draw(t) {
    t.save(), t.translate(this.rect.left, this.rect.top), this.icon.draw(
      t,
      this.rect.width,
      this.rect.height,
      this.config.borderColor2,
      this.config.borderColor1,
      this.config.borderWidth
    ), t.restore();
  }
}
class $ extends b {
  constructor(t, e, i) {
    super(t, e, i), this.maskColor = "#88888888", this.isSelect = !0, this.isChecked = !1, this.mousePoint = new u(0, 0), this.onRotateLayout = null, this.onEndRotateLayout = null, this.handle = new A(this, x, i), this.layoutList.push(this.handle);
  }
  setOnRotateLayout(t) {
    this.onRotateLayout = t;
  }
  setOnEndRotateLayout(t) {
    this.onEndRotateLayout = t;
  }
  setOnEndSelect(t) {
    this.handle.setOnEndSelect(t);
  }
  start(t) {
    return this.isSelect ? !1 : (super.start(t) || this.checkPointInRect(t) && (this.isChecked = !0, this.mousePoint = t), !0);
  }
  move(t) {
    if (this.isSelect)
      return !1;
    const e = this.handle.getRect(), i = new u(e.left + e.width / 2, e.top + e.height / 2);
    let s = t.x - i.x, o = t.y - i.y, r = 0 - i.x, n = 0 - i.y, h = (Math.atan2(o, s) - Math.atan2(n, r)) * (180 / Math.PI);
    return this.cursor?.setAngle(-100 + h), this.isChecked ? (s = t.x - i.x, o = t.y - i.y, r = this.mousePoint.x - i.x, n = this.mousePoint.y - i.y, h = (Math.atan2(n, r) - Math.atan2(o, s)) * (180 / Math.PI), this.onRotateLayout?.call(this, h), this.mousePoint = t, !0) : (super.move(t), !0);
  }
  end(t) {
    return this.isSelect ? !1 : (this.isChecked = !1, this.onEndRotateLayout?.call(this), super.end(t), !0);
  }
  setHandleRect(t) {
    if (t.left > t.right) {
      const e = t.left;
      t.left = t.right, t.right = e;
    }
    if (t.top > t.bottom) {
      const e = t.top;
      t.top = t.bottom, t.bottom = e;
    }
    this.handle.setRect(t);
  }
  endSelect(t) {
    if (t.left > t.right) {
      const e = t.left;
      t.left = t.right, t.right = e;
    }
    if (t.top > t.bottom) {
      const e = t.top;
      t.top = t.bottom, t.bottom = e;
    }
    this.handle.setRect(t), this.isSelect = !1, this.handle.endSelect();
  }
  setOnMoveLayout(t) {
    this.handle.setOnMoveLayout(t);
  }
  setOnEndMoveLayout(t) {
    this.handle.setOnEndMoveLayout(t);
  }
  draw(t) {
    const { left: e, top: i, right: s, bottom: o } = this.rect, r = s - e, n = o - i;
    t.save(), t.beginPath(), t.rect(e, i, r, n), this.handle.drawMask(t), t.closePath(), t.fillStyle = this.maskColor, t.fill("evenodd"), t.restore(), super.draw(t);
  }
  getClipRect() {
    return this.handle.getRect();
  }
}
class N extends b {
  constructor(t, e) {
    super(null, null, e), this.overLayout = null, this.layoutList = [], this.mouseOver = !1, this.dirty = !0, this.time = 0, this.background = new V(this, e);
    const { width: i, height: s } = t.getBoundingClientRect();
    t.style.cursor = "none", t.width = i, t.height = s, this.canvas = t, this.canvas2D = t.getContext("2d"), this.setRect(new a(0, 0, this.canvas.width, this.canvas.height)), this.initBackground(), this.initClipRect(e?.defaultClipRect), t.addEventListener("mousedown", this.onMouseDown.bind(this)), t.addEventListener("mousemove", this.onMouseMove.bind(this)), t.addEventListener("mouseup", this.onMouseUp.bind(this)), t.addEventListener("wheel", this.onMouseWheel.bind(this)), t.addEventListener("mouseover", this.onMouseOver.bind(this)), t.addEventListener("mouseout", this.onMouseOut.bind(this)), t.addEventListener("touchstart", this.onTouchStart.bind(this)), t.addEventListener("touchmove", this.onTouchMove.bind(this)), t.addEventListener("touchend", this.onTouchEnd.bind(this)), requestAnimationFrame(this.drawLoop.bind(this)), this.markDirty();
  }
  setCursor(t) {
    this.drawCursor = t;
  }
  start(t) {
    return super.start(this.mousePoint = t), this.markDirty(), !0;
  }
  move(t) {
    return this.checkOverOut(t), super.move(this.mousePoint = t), this.markDirty(), !0;
  }
  end(t) {
    return super.end(this.mousePoint = t), this.markDirty(), !0;
  }
  onTouchStart(t) {
    t.preventDefault(), t.touches.length !== 0 && this.start(new u(t.touches[0].clientX, t.touches[0].clientY));
  }
  onTouchMove(t) {
    t.preventDefault(), t.touches.length !== 0 && this.move(new u(t.touches[0].clientX, t.touches[0].clientY));
  }
  onTouchEnd(t) {
    t.preventDefault(), this.end(new u(t.changedTouches[0].clientX, t.changedTouches[0].clientY));
  }
  onMouseDown(t) {
    t.preventDefault(), this.start(this.mousePoint = new u(t.offsetX, t.offsetY));
  }
  onMouseMove(t) {
    t.preventDefault(), this.move(new u(t.offsetX, t.offsetY));
  }
  onMouseUp(t) {
    t.preventDefault(), this.end(new u(t.offsetX, t.offsetY));
  }
  onMouseOver(t) {
    this.move(new u(t.offsetX, t.offsetY)), this.mouseOver = !0, this.markDirty();
  }
  onMouseOut(t) {
    this.mouseOver = !1, this.markDirty();
  }
  onMouseWheel(t) {
    t.preventDefault(), this.wheel(new B(t.deltaX, t.deltaY, t.deltaZ)), this.markDirty();
  }
  setImage(t) {
    if (this.image = new X(this, this.config), this.image.setRect(this.rect.clone()), this.image.setImage(t), this.mask) {
      const e = this.mask.getClipRect().clone();
      this.image?.setClipRect(e), this.image.initScale(e);
    }
    this.layoutList.splice(1, 0, this.image), this.markDirty();
  }
  setOverLayout(t) {
    this.overLayout != t && (this.overLayout?.out(), this.overLayout = t, this.overLayout.over());
  }
  toDataUrl(t, e) {
    return this.image ? this.mask ? this.image.toDataUrl(t, e) : Promise.reject("No mask") : Promise.reject("No image");
  }
  toBlob(t, e) {
    return this.image ? this.mask ? this.image.toBlob(t, e) : Promise.reject("No mask") : Promise.reject("No image");
  }
  initBackground() {
    this.background.setRect(this.rect), this.layoutList.push(this.background), this.background.setOnStartSelect((t) => {
      this.mask || this.createMask(t.clone());
    }), this.background.setOnMoveSelect((t) => {
      this.mask?.setHandleRect(t.clone());
    }), this.background.setOnEndSelect((t) => {
      this.mask?.endSelect(t.clone()), this.image?.setClipRect(t.clone());
    });
  }
  reset() {
    this.mask?.remove(), this.mask = void 0, this.initClipRect(this.config?.defaultClipRect), this.image?.reset(), this.markDirty();
  }
  initClipRect(t) {
    if (t) {
      const e = new a(
        t.left,
        t.top,
        this.rect.right - t.right,
        this.rect.bottom - t.bottom
      );
      if (this.config?.outWidth && this.config?.outHeight) {
        const i = Math.min(e.width / this.config?.outWidth, e.height / this.config?.outHeight), s = this.config?.outWidth * i, o = this.config?.outHeight * i;
        e.left = (this.rect.width - s) / 2, e.top = (this.rect.height - o) / 2, e.right = e.left + s, e.bottom = e.top + o;
      } else if (this.config?.outWidth) {
        const i = e.width / this.config?.outWidth, s = this.config?.outWidth * i;
        e.left = (this.rect.width - s) / 2, e.right = e.left + s;
      } else if (this.config?.outHeight) {
        const i = e.height / this.config?.outHeight, s = this.config?.outHeight * i;
        e.top = (this.rect.height - s) / 2, e.bottom = e.top + s;
      }
      this.image?.setClipRect(e.clone()), this.createMask(e), this.mask?.endSelect(e);
    }
  }
  createMask(t) {
    this.mask = new $(this, W, this.config), this.mask.setOnMoveLayout((e) => {
      this.image?.moveImage(e);
    }), this.mask.setOnEndMoveLayout((e) => {
      this.image?.moveImage(e), this.image?.onEndSelect();
    }), this.mask.setOnRotateLayout((e) => {
      this.image?.setRotate(e);
    }), this.mask.setOnEndRotateLayout(() => {
      this.image?.onEndSelect();
    }), this.mask.setOnEndSelect((e) => {
      this.image?.setClipRect(e.clone()), this.image?.onEndSelect();
    }), this.mask.setRect(this.rect), this.mask.setHandleRect(t), this.layoutList.push(this.mask);
  }
  draw(t) {
    super.draw(t), this.mousePoint && this.drawCursor && this.mouseOver && (t.save(), t.translate(this.mousePoint.x - this.config.cursorSize / 2, this.mousePoint.y - this.config.cursorSize / 2), this.drawCursor.draw(
      t,
      this.config.cursorSize,
      this.config.cursorSize,
      this.config.cursorStrokeColor,
      this.config.cursorColor,
      this.config.cursorStrokeLineWidth
    ), t.restore());
  }
  markDirty() {
    this.dirty = !0;
  }
  drawLoop(t) {
    this.dirty && (this.draw(this.canvas2D), this.dirty = !1), this.dirty = R.getInstance().update(t - this.time), this.time = t, requestAnimationFrame(this.drawLoop.bind(this));
  }
}
const v = class v {
  constructor() {
    this.animations = [];
  }
  static getInstance() {
    return v.instance ?? (v.instance = new v());
  }
  add(t) {
    this.animations.push(t);
  }
  remove(t) {
    const e = this.animations.indexOf(t);
    e >= 0 && this.animations.splice(e, 1);
  }
  update(t) {
    for (let e = 0; e < this.animations.length; e++) {
      const i = this.animations[e];
      i.update(t) || this.remove(i);
    }
    return this.animations.length > 0;
  }
};
v.instance = null;
let R = v;
class U {
  constructor(t, e, i, s = null) {
    this.target = {}, this.form = {}, this.to = {}, this.onEnd = null, this.isFinished = !1;
    for (const o in e)
      this.form[o] = t[o];
    this.target = t, this.to = e, this.duration = i, this.elapsedTime = 0, this.onEnd = s;
  }
  updateValue(t) {
    if (this.isFinished)
      return this.onEnd?.call(this), !1;
    for (const e in this.to) {
      const i = this.form[e], s = this.to[e];
      i != null && s != null && (this.target[e] = i + (s - i) * t);
    }
    return t >= 1 && (this.isFinished = !0), !0;
  }
  cancel() {
    R.getInstance().remove(this), this.onEnd?.call(this);
  }
  run() {
    R.getInstance().add(this);
  }
}
class C extends U {
  update(t) {
    this.elapsedTime += t;
    const e = this.duration <= 0 ? 1 : this.elapsedTime / this.duration;
    return this.updateValue(e);
  }
}
export {
  U as Animation,
  R as AnimationManager,
  V as BackgroundLayout,
  j as CenterLayout,
  B as Delta,
  A as HandleLayout,
  N as ImageCropper,
  X as ImageLayout,
  b as Layout,
  C as LinearAnimation,
  $ as MaskLayout,
  O as OutType,
  u as Point,
  y as PointLayout,
  a as Rect,
  f as Svg,
  N as default,
  T as inverseTransform
};
