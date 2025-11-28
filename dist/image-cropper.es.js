class g {
  // [x, y, width, height]
  constructor(t, e, i, s) {
    this.angle = 0, this.width = t, this.height = e, this.path = s, this.viewBox = i;
  }
  clone(t) {
    const e = new g(this.width, this.height, this.viewBox, this.path);
    return e.setAngle(t ?? this.angle), e;
  }
  setAngle(t) {
    this.angle = t;
  }
  setViewBox(t, e, i, s) {
    this.viewBox = [t, e, i, s];
  }
  draw(t, e, i, s = "#000", h, c = 1) {
    if (!this.path || this.path.length === 0) return;
    t.save(), t.lineJoin = "round", t.lineCap = "round";
    let n = 0, o = 0, u = this.width, l = this.height;
    this.viewBox && ([n, o, u, l] = this.viewBox);
    const w = e / u, f = i / l, v = Math.min(w, f);
    t.translate(e / 2, i / 2), t.rotate(this.angle * Math.PI / 180), t.scale(v, v), t.translate(-u / 2 - n + 0.5 / v, -l / 2 - o + 0.5 / v);
    const R = new Path2D();
    for (const M of this.path)
      R.addPath(new Path2D(M));
    t.strokeStyle = s, t.lineWidth = Math.max(1, c / v), t.stroke(R), h && (t.fillStyle = h, t.fill(R)), t.restore();
  }
}
const S = new g(
  24,
  24,
  [0, 0, 24, 24],
  ["M13.6,12c0,0.9-0.7,1.6-1.6,1.6s-1.6-0.7-1.6-1.6s0.7-1.6,1.6-1.6S13.6,11.1,13.6,12z M21,10.4v3.3h-2.1c-0.6,2.6-2.7,4.7-5.3,5.3V21h-3.3v-2.1c-2.6-0.6-4.7-2.7-5.3-5.3H3v-3.3h2.1c0.6-2.6,2.7-4.7,5.3-5.3V3h3.3v2.1c2.6,0.6,4.7,2.7,5.3,5.3H21z M16.7,12c0-2.6-2.1-4.7-4.7-4.7S7.3,9.4,7.3,12s2.1,4.7,4.7,4.7S16.7,14.6,16.7,12z"]
), y = new g(
  24,
  24,
  [0, 0, 24, 24],
  ["M0,4.96h24V11H0V4.96z"]
  // 一个简单矩形
), b = new g(
  24,
  24,
  [0, 0, 24, 24],
  ["M12.91,4.96 L0,4.96 L0,11 L12.91,11 L12.91,24 L18.95,24 L18.95,11 L18.95,4.96 Z"]
), p = new g(
  24,
  24,
  [0, 0, 24, 24],
  ["M13.7,12L13.7,12l0-7.3H17L12,0.1L6.9,4.7h3.3v14.5H6.8l5.1,4.7l5.1-4.7h-3.3V12z"]
), C = new g(
  24,
  24,
  [0, 0, 24, 24],
  ["M20.8,18.3L20.8,18.3l-0.3,0c0,0,0,0,0,0c0-8.2-6.6-14.8-14.8-14.8c0,0-0.1,0-0.1,0V0.2L0.1,5.7l5.5,5.5V7.6c0,0,0.1,0,0.1,0c5.9,0,10.7,4.8,10.7,10.7c0,0,0,0,0,0h-0.3l-0.1,0h-3.1l5.5,5.5l5.5-5.5H20.8z"]
), k = new g(
  24,
  24,
  [0, 0, 24, 24],
  ["M19.3,17.1v-3.3h-5.5v5.5h3.3l-5.2,4.7l-5.1-4.7h3.3v-5.5H4.6v3.3L-0.1,12l4.7-5.2v3.4h5.5V4.7H6.8L12-0.1l5.1,4.7h-3.3v5.5h5.5V6.8L24,12L19.3,17.1z"]
), P = new g(
  24,
  24,
  [0, 0, 24, 24],
  ["M24,13.9H13.9V24h-4V13.9H-0.1v-4H10v-10h4v10H24V13.9z"]
), z = new g(
  24,
  24,
  [0, 0, 24, 24],
  ["M18.8,5.4c-0.4,0-0.7,0.1-1,0.4c-0.3,0.3-0.4,0.6-0.4,1v5.6c0,0.3-0.2,0.4-0.4,0.4c-0.1,0-0.2,0-0.3-0.1c-0.1-0.1-0.1-0.2-0.1-0.3V3.1c0-0.4-0.1-0.7-0.4-1c-0.3-0.3-0.6-0.4-1-0.4c-0.4,0-0.7,0.1-1,0.4c-0.3,0.3-0.4,0.6-0.4,1v8c0,0.1,0,0.2-0.1,0.3c-0.1,0.1-0.2,0.1-0.3,0.1s-0.2,0-0.3-0.1c-0.1-0.1-0.1-0.2-0.1-0.3V1.9c0-0.4-0.1-0.7-0.4-1c-0.3-0.3-0.6-0.4-1-0.4c-0.4,0-0.7,0.1-1,0.4c-0.3,0.3-0.4,0.6-0.4,1v9.3c0,0.3-0.2,0.4-0.4,0.4c-0.1,0-0.2,0-0.3-0.1c-0.1-0.1-0.1-0.2-0.1-0.3v-8c0-0.4-0.1-0.7-0.4-1s-0.6-0.4-1-0.4s-0.7,0.1-1,0.4c-0.3,0.3-0.4,0.6-0.4,1v9.7c0,0.4-0.1,0.7-0.2,0.9c-0.1,0.2-0.2,0.3-0.4,0.4c-0.2,0-0.4,0-0.5-0.1c-0.2-0.1-0.4-0.4-0.6-0.7l-2-3.4C2.7,9.5,2.4,9.3,2.1,9.2c-0.3-0.1-0.7,0-1,0.1c-0.3,0.2-0.5,0.5-0.6,0.9c-0.1,0.4-0.1,0.8,0.1,1.1s0.2,0.3,0.2,0.3l0.5,1.1L3.8,18c0.6,1.2,1.2,2.2,1.8,3c0.5,0.6,1,1.1,1.5,1.5c0.3,0.3,0.7,0.4,1,0.6c0.2,0.1,0.3,0.1,0.4,0.1h6.1c0.9,0,1.8-0.3,2.5-1c0.6-0.5,1.1-1.2,1.5-2.1c1-2.1,1.6-4.8,1.6-8.2V6.8c0-0.4-0.1-0.7-0.4-1C19.6,5.6,19.2,5.4,18.8,5.4L18.8,5.4z"]
);
class r {
  constructor(t, e) {
    this.x = t, this.y = e;
  }
}
class O {
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
  get width() {
    return this.right - this.left;
  }
  get height() {
    return this.bottom - this.top;
  }
  get center() {
    return new r((this.right - this.left) / 2, (this.bottom - this.top) / 2);
  }
  clone() {
    return new a(this.left, this.top, this.right, this.bottom);
  }
}
class L {
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
    }, this.parent = t, this.cursor = e, Object.assign(this.config, i);
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
    this.parent?.layoutList.splice(this.parent.layoutList.indexOf(this), 1);
  }
}
class H extends L {
  constructor(t, e) {
    super(t, P.clone(), e), this.mousePoint = new r(0, 0), this.selectRect = new a(0, 0, 0, 0), this.onStartSelect = null, this.onMoveSelect = null, this.onEndSelect = null;
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
    const { left: e, top: i, right: s, bottom: h } = this.rect, c = s - e, n = h - i;
    for (let o = 0; o < n; o += this.config.backgroundBoxSize) {
      let u = Math.floor(o / this.config.backgroundBoxSize) % 2 ? this.config.backgroundBoxColor0 : this.config.backgroundBoxColor1;
      for (let l = 0; l < c; l += this.config.backgroundBoxSize)
        t.fillStyle = u = u === this.config.backgroundBoxColor1 ? this.config.backgroundBoxColor0 : this.config.backgroundBoxColor1, t.fillRect(l, o, this.config.backgroundBoxSize, this.config.backgroundBoxSize);
    }
  }
}
class E extends L {
  constructor(t, e, i) {
    super(t, e, i), this.scale = 1, this.angle = 0, this.clipRect = new a(0, 0, 0, 0), this.offset = new r(0, 0);
  }
  initScale(t) {
    this.image && (this.scale = Math.max(t.width / this.image.width, t.height / this.image.height));
  }
  reset() {
    this.angle = 0, this.offset = new r(0, 0), this.config.defaultClipRect ? this.scale = Math.max(this.clipRect.width / this.image.width, this.clipRect.height / this.image.height) : (this.clipRect = new a(this.rect.left, this.rect.top, this.rect.right, this.rect.bottom), this.scale = Math.min(this.rect.width / this.image.width, this.rect.height / this.image.height));
  }
  setRect(t) {
    super.setRect(t), this.clipRect = new a(t.left, t.top, t.right, t.bottom);
  }
  setClipRect(t) {
    const e = new r(
      this.clipRect.left + this.clipRect.width / 2 - (t.left + t.width / 2),
      this.clipRect.top + this.clipRect.height / 2 - (t.top + t.height / 2)
    );
    this.moveImage(e), this.clipRect = t;
  }
  setImage(t) {
    this.image = t;
    const e = this.rect.width / t.width, i = this.rect.height / t.height;
    this.scale = Math.min(e, i);
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
    const e = Math.cos(-this.angle * Math.PI / 180), i = Math.sin(-this.angle * Math.PI / 180), s = t.x * e - t.y * i, h = t.x * i + t.y * e;
    this.offset.x += s / this.scale, this.offset.y += h / this.scale;
  }
  draw(t) {
    if (!this.image)
      return;
    const e = new r(this.clipRect.left + this.clipRect.width / 2, this.clipRect.top + this.clipRect.height / 2);
    t.translate(e.x, e.y), t.scale(this.scale, this.scale), t.rotate(this.angle * Math.PI / 180), t.translate(this.offset.x, this.offset.y), t.drawImage(this.image, -this.image.width / 2, -this.image.height / 2);
  }
  getClipCanvas() {
    const t = document.createElement("canvas"), e = t.getContext("2d");
    if (!e)
      throw new Error("no canvas context");
    let i = 1;
    return this.config.outType == 0 && (this.config?.outWidth && this.config?.outHeight ? i = Math.min(this.config?.outWidth / this.clipRect.width, this.config?.outHeight / this.clipRect.height) : this.config?.outWidth ? i = this.config?.outWidth / this.clipRect.width : this.config?.outHeight && (i = this.config?.outHeight / this.clipRect.height)), t.width = this.clipRect.width * i, t.height = this.clipRect.height * i, e.translate(t.width / 2, t.height / 2), e.scale(this.scale * i, this.scale * i), e.rotate(this.angle * Math.PI / 180), e.translate(this.offset.x, this.offset.y), e.drawImage(
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
        this.getClipCanvas().toBlob((h) => {
          i(h);
        }, t ?? "image/png", e);
      } catch (h) {
        s(h);
      }
    }) : Promise.reject(new Error("image not loaded"));
  }
  toDataUrl(t, e) {
    return this.image ? new Promise((i, s) => {
      try {
        i(this.getClipCanvas().toDataURL(t ?? "image/png", e));
      } catch (h) {
        s(h);
      }
    }) : Promise.reject(new Error("image not loaded"));
  }
}
class W extends L {
  constructor(t, e, i) {
    super(t, e, i), this.layoutList = [], this.isChecked = !1, this.mousePoint = new r(0, 0), this.onMoveLayout = null, this.onEndSelect = null, this.center = new B(this, S, 0, z.clone(), i), this.topLeft = new m(this, b, -90, p.clone(-45), i), this.topCenter = new m(this, y, 0, p.clone(), i), this.topRight = new m(this, b, 0, p.clone(45), i), this.centerLeft = new m(this, y, -90, p.clone(90), i), this.centerRight = new m(this, y, 90, p.clone(90), i), this.bottomLeft = new m(this, b, 180, p.clone(45), i), this.bottomCenter = new m(this, y, 180, p.clone(), i), this.bottomRight = new m(this, b, 90, p.clone(-45), i), this.center.setOnMoveLayout(this.onMoveCenter.bind(this)), this.topLeft.setOnMoveLayout(this.onMoveTopLeft.bind(this)), this.topCenter.setOnMoveLayout(this.onMoveTopCenter.bind(this)), this.topRight.setOnMoveLayout(this.onMoveTopRight.bind(this)), this.centerLeft.setOnMoveLayout(this.onMoveCenterLeft.bind(this)), this.centerRight.setOnMoveLayout(this.onMoveCenterRight.bind(this)), this.bottomLeft.setOnMoveLayout(this.onMoveBottomLeft.bind(this)), this.bottomCenter.setOnMoveLayout(this.onMoveBottomCenter.bind(this)), this.bottomRight.setOnMoveLayout(this.onMoveBottomRight.bind(this)), this.center.setOnEndLayout(this.onEndLayout.bind(this)), this.topLeft.setOnEndLayout(this.onEndLayout.bind(this)), this.topCenter.setOnEndLayout(this.onEndLayout.bind(this)), this.topRight.setOnEndLayout(this.onEndLayout.bind(this)), this.centerLeft.setOnEndLayout(this.onEndLayout.bind(this)), this.centerRight.setOnEndLayout(this.onEndLayout.bind(this)), this.bottomLeft.setOnEndLayout(this.onEndLayout.bind(this)), this.bottomCenter.setOnEndLayout(this.onEndLayout.bind(this)), this.bottomRight.setOnEndLayout(this.onEndLayout.bind(this)), this.layoutList = [
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
  setOnEndSelect(t) {
    this.onEndSelect = t;
  }
  onMoveCenter(t) {
    const e = this.rect.clone();
    e.left += t.x, e.top += t.y, e.right += t.x, e.bottom += t.y, this.rect = e, this.setRect(this.rect);
  }
  onMoveTopLeft(t) {
    const e = this.rect.clone();
    if (e.left += t.x, e.top += t.y, e.left >= e.right - 12 && (e.left = e.right - 12), e.top >= e.bottom - 12 && (e.top = e.bottom - 12), this.config?.outWidth && this.config?.outHeight) {
      const i = this.config?.outWidth > this.config?.outHeight ? e.width / this.config?.outWidth : e.height / this.config?.outHeight, s = this.config?.outWidth * i, h = this.config?.outHeight * i;
      e.left += e.width - s, e.top += e.height - h;
    }
    this.rect = e, this.setRect(this.rect);
  }
  onMoveTopCenter(t) {
    const e = this.rect.clone();
    if (e.top += t.y, e.top >= e.bottom - 12 && (e.top = e.bottom - 12), this.config?.outWidth && this.config?.outHeight) {
      const i = e.height / this.config?.outHeight, s = this.config?.outWidth * i;
      e.left += (e.width - s) / 2, e.right = e.left + s, e.bottom = e.top + this.config?.outHeight * i;
    }
    this.rect = e, this.setRect(this.rect);
  }
  onMoveTopRight(t) {
    const e = this.rect.clone();
    if (e.right += t.x, e.top += t.y, e.right <= e.left + 12 && (e.right = e.left + 12), e.top >= e.bottom - 12 && (e.top = e.bottom - 12), this.config?.outWidth && this.config?.outHeight) {
      const i = this.config?.outWidth > this.config?.outHeight ? e.width / this.config?.outWidth : e.height / this.config?.outHeight;
      e.right = e.left + this.config?.outWidth * i, e.top += e.height - this.config?.outHeight * i;
    }
    this.rect = e, this.setRect(this.rect);
  }
  onMoveCenterLeft(t) {
    const e = this.rect.clone();
    if (e.left += t.x, e.left >= e.right - 12 && (e.left = e.right - 12), this.config?.outWidth && this.config?.outHeight) {
      const i = e.width / this.config?.outWidth, s = this.config?.outHeight * i;
      e.top += (e.height - s) / 2, e.bottom = e.top + s, e.right = e.left + this.config?.outWidth * i;
    }
    this.rect = e, this.setRect(this.rect);
  }
  onMoveCenterRight(t) {
    const e = this.rect.clone();
    if (e.right += t.x, e.right <= e.left + 12 && (e.right = e.left + 12), this.config?.outWidth && this.config?.outHeight) {
      const i = e.width / this.config?.outWidth, s = this.config?.outHeight * i;
      e.top += (e.height - s) / 2, e.bottom = e.top + s, e.right = e.left + this.config?.outWidth * i;
    }
    this.rect = e, this.setRect(this.rect);
  }
  onMoveBottomLeft(t) {
    const e = this.rect.clone();
    if (e.left += t.x, e.bottom += t.y, e.left >= e.right - 12 && (e.left = e.right - 12), e.bottom <= e.top + 12 && (e.bottom = e.top + 12), this.config?.outWidth && this.config?.outHeight) {
      const i = this.config?.outWidth > this.config?.outHeight ? e.width / this.config?.outWidth : e.height / this.config?.outHeight;
      e.left += e.width - this.config?.outWidth * i, e.bottom = e.top + this.config?.outHeight * i;
    }
    this.rect = e, this.setRect(this.rect);
  }
  onMoveBottomCenter(t) {
    const e = this.rect.clone();
    if (e.bottom += t.y, e.bottom <= e.top + 12 && (e.bottom = e.top + 12), this.config?.outWidth && this.config?.outHeight) {
      const i = e.height / this.config?.outHeight, s = this.config?.outWidth * i;
      e.left += (e.width - s) / 2, e.right = e.left + s, e.bottom = e.top + this.config?.outHeight * i;
    }
    this.rect = e, this.setRect(this.rect);
  }
  onMoveBottomRight(t) {
    const e = this.rect.clone();
    if (e.right += t.x, e.bottom += t.y, e.right <= e.left + 12 && (e.right = e.left + 12), e.bottom <= e.top + 12 && (e.bottom = e.top + 12), this.config?.outWidth && this.config?.outHeight) {
      const i = this.config?.outWidth > this.config?.outHeight ? e.width / this.config?.outWidth : e.height / this.config?.outHeight;
      e.right = e.left + this.config?.outWidth * i, e.bottom = e.top + this.config?.outHeight * i;
    }
    this.rect = e, this.setRect(this.rect);
  }
  start(t) {
    return super.start(t) ? !0 : this.checkPointInRect(t) ? (this.isChecked = !0, this.mousePoint = t, !0) : !1;
  }
  move(t) {
    return this.isChecked && (this.onMoveLayout?.call(this, new r(t.x - this.mousePoint.x, t.y - this.mousePoint.y)), this.mousePoint = t), super.move(t);
  }
  end(t) {
    return this.isChecked && (this.onMoveLayout?.call(this, new r(t.x - this.mousePoint.x, t.y - this.mousePoint.y)), this.mousePoint = t, this.isChecked = !1), super.end(t);
  }
  setRect(t) {
    super.setRect(t);
    const { left: e, top: i, right: s, bottom: h } = t, c = s - e, n = h - i, o = this.config.pointRadius * 2;
    this.center.setRect(a.fromSize(e + c / 2, i + n / 2, o, o)), this.topLeft.setRect(a.fromSize(e, i, o, o)), this.topCenter.setRect(a.fromSize(e + c / 2, i, o, o)), this.topRight.setRect(a.fromSize(s, i, o, o)), this.centerLeft.setRect(a.fromSize(e, i + n / 2, o, o)), this.centerRight.setRect(a.fromSize(s, i + n / 2, o, o)), this.bottomLeft.setRect(a.fromSize(e, h, o, o)), this.bottomCenter.setRect(a.fromSize(e + c / 2, h, o, o)), this.bottomRight.setRect(a.fromSize(s, h, o, o));
  }
  drawEllipse(t, e, i, s, h) {
    const c = 0.5522848, n = s / 2 * c, o = h / 2 * c, u = e + s, l = i + h, w = e + s / 2, f = i + h / 2;
    t.moveTo(e, f), t.bezierCurveTo(e, f - o, w - n, i, w, i), t.bezierCurveTo(w + n, i, u, f - o, u, f), t.bezierCurveTo(u, f + o, w + n, l, w, l), t.bezierCurveTo(w - n, l, e, f + o, e, f);
  }
  drawMask(t) {
    this.config.circle ? this.drawEllipse(t, this.rect.left, this.rect.top, this.rect.width, this.rect.height) : t.roundRect(this.rect.left, this.rect.top, this.rect.width, this.rect.height, this.config.circleRadius ?? 0);
  }
  drawLine(t, e, i) {
    t.save(), t.beginPath(), t.moveTo(e.x, e.y), t.lineTo(i.x, i.y), t.closePath(), t.setLineDash([this.config.guidelineDsah, this.config.guidelineDsah]), t.lineWidth = this.config.guidelineWidth, t.strokeStyle = this.config.guidelineColor1, t.lineDashOffset = 0, t.stroke(), t.strokeStyle = this.config.guidelineColor2, t.lineDashOffset = this.config.guidelineDsah, t.stroke(), t.restore();
  }
  draw(t) {
    const { left: e, top: i, right: s, bottom: h } = this.rect;
    let c = s - e, n = h - i;
    t.lineWidth = this.config.borderWidth, t.beginPath(), t.rect(e - 1, i - 1, c + 2, n + 2), t.closePath(), t.strokeStyle = this.config.borderColor2, t.stroke(), t.beginPath(), this.config.circle ? this.drawEllipse(t, e, i, c, n) : t.roundRect(e, i, c, n, this.config.circleRadius ?? 0), t.closePath(), t.strokeStyle = this.config.borderColor1, t.stroke(), c = c / 3, n = n / 3, this.drawLine(t, new r(e, i + n), new r(s, i + n)), this.drawLine(t, new r(e, i + n * 2), new r(s, i + n * 2)), this.drawLine(t, new r(e + c, i), new r(e + c, h)), this.drawLine(t, new r(e + c * 2, i), new r(e + c * 2, h)), super.draw(t);
  }
}
class m extends L {
  constructor(t, e, i, s, h) {
    super(t, s, h), this.isChecked = !1, this.mousePoint = new r(0, 0), this.onMoveLayout = null, this.onEndLayout = null, this.icon = e.clone(), this.icon.setAngle(i);
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
    return this.isChecked && (this.onMoveLayout?.call(this, new r(t.x - this.mousePoint.x, t.y - this.mousePoint.y)), this.mousePoint = t), !1;
  }
  end(t) {
    return this.isChecked && (this.onEndLayout?.call(this, new r(t.x - this.mousePoint.x, t.y - this.mousePoint.y)), this.mousePoint = t, this.isChecked = !1), !1;
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
}
class B extends m {
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
class D extends L {
  constructor(t, e, i) {
    super(t, e, i), this.maskColor = "#88888888", this.isSelect = !0, this.isChecked = !1, this.mousePoint = new r(0, 0), this.onRotateLayout = null, this.handle = new W(this, k, i), this.layoutList.push(this.handle);
  }
  setOnRotateLayout(t) {
    this.onRotateLayout = t;
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
    const e = this.handle.getRect(), i = new r(e.left + e.width / 2, e.top + e.height / 2);
    let s = t.x - i.x, h = t.y - i.y, c = 0 - i.x, n = 0 - i.y, o = (Math.atan2(h, s) - Math.atan2(n, c)) * (180 / Math.PI);
    return this.cursor?.setAngle(-100 + o), this.isChecked ? (s = t.x - i.x, h = t.y - i.y, c = this.mousePoint.x - i.x, n = this.mousePoint.y - i.y, o = (Math.atan2(n, c) - Math.atan2(h, s)) * (180 / Math.PI), this.onRotateLayout?.call(this, o), this.mousePoint = t, !0) : (super.move(t), !0);
  }
  end(t) {
    return this.isSelect ? !1 : (this.isChecked = !1, super.end(t), !0);
  }
  setHandleRect(t) {
    this.handle.setRect(t);
  }
  endSelect(t) {
    this.handle.setRect(t), this.isSelect = !1;
  }
  setOnMoveLayout(t) {
    this.handle.setOnMoveLayout(t);
  }
  draw(t) {
    const { left: e, top: i, right: s, bottom: h } = this.rect, c = s - e, n = h - i;
    t.save(), t.beginPath(), t.rect(e, i, c, n), this.handle.drawMask(t), t.closePath(), t.fillStyle = this.maskColor, t.fill("evenodd"), t.restore(), super.draw(t);
  }
  getClipRect() {
    return this.handle.getRect();
  }
}
class I extends L {
  constructor(t, e) {
    super(null, null, e), this.overLayout = null, this.layoutList = [], this.mouseOver = !1, this.background = new H(this, e);
    const { width: i, height: s } = t.getBoundingClientRect();
    t.style.cursor = "none", t.width = i, t.height = s, this.canvas = t, this.canvas2D = t.getContext("2d"), this.setRect(new a(0, 0, this.canvas.width, this.canvas.height)), this.initBackground(), this.initClipRect(e?.defaultClipRect), t.addEventListener("mousedown", this.onMouseDown.bind(this)), t.addEventListener("mousemove", this.onMouseMove.bind(this)), t.addEventListener("mouseup", this.onMouseUp.bind(this)), t.addEventListener("wheel", this.onMouseWheel.bind(this)), t.addEventListener("mouseover", this.onMouseOver.bind(this)), t.addEventListener("mouseout", this.onMouseOut.bind(this)), t.addEventListener("touchstart", this.onTouchStart.bind(this)), t.addEventListener("touchmove", this.onTouchMove.bind(this)), t.addEventListener("touchend", this.onTouchEnd.bind(this)), this.draw(this.canvas2D);
  }
  setCursor(t) {
    this.drawCursor = t;
  }
  start(t) {
    return super.start(this.mousePoint = t), this.draw(this.canvas2D), !0;
  }
  move(t) {
    return this.checkOverOut(t), super.move(this.mousePoint = t), this.draw(this.canvas2D), !0;
  }
  end(t) {
    return super.end(this.mousePoint = t), this.draw(this.canvas2D), !0;
  }
  onTouchStart(t) {
    t.preventDefault(), t.touches.length !== 0 && this.start(new r(t.touches[0].clientX, t.touches[0].clientY));
  }
  onTouchMove(t) {
    t.preventDefault(), t.touches.length !== 0 && this.move(new r(t.touches[0].clientX, t.touches[0].clientY));
  }
  onTouchEnd(t) {
    t.preventDefault(), this.end(new r(t.changedTouches[0].clientX, t.changedTouches[0].clientY));
  }
  onMouseDown(t) {
    t.preventDefault(), this.start(this.mousePoint = new r(t.offsetX, t.offsetY));
  }
  onMouseMove(t) {
    t.preventDefault(), this.move(new r(t.offsetX, t.offsetY));
  }
  onMouseUp(t) {
    t.preventDefault(), this.end(new r(t.offsetX, t.offsetY));
  }
  onMouseOver(t) {
    this.mouseOver = !0, this.draw(this.canvas2D);
  }
  onMouseOut(t) {
    this.mouseOver = !1, this.draw(this.canvas2D);
  }
  onMouseWheel(t) {
    t.preventDefault(), this.wheel(new O(t.deltaX, t.deltaY, t.deltaZ)), this.draw(this.canvas2D);
  }
  setImage(t) {
    if (this.image = new E(this, null, this.config), this.image.setRect(this.rect.clone()), this.image.setImage(t), this.mask) {
      const e = this.mask.getClipRect().clone();
      this.image?.setClipRect(e), this.image.initScale(e);
    }
    this.layoutList.splice(1, 0, this.image), this.draw(this.canvas2D);
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
    this.mask?.remove(), this.mask = void 0, this.initClipRect(this.config?.defaultClipRect), this.image?.reset(), this.draw(this.canvas2D);
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
        const i = Math.min(e.width / this.config?.outWidth, e.height / this.config?.outHeight), s = this.config?.outWidth * i, h = this.config?.outHeight * i;
        e.left = (this.rect.width - s) / 2, e.top = (this.rect.height - h) / 2, e.right = e.left + s, e.bottom = e.top + h;
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
    this.mask = new D(this, C, this.config), this.mask.setOnMoveLayout((e) => {
      this.image?.moveImage(e);
    }), this.mask.setOnRotateLayout((e) => {
      this.image?.setRotate(e);
    }), this.mask.setOnEndSelect((e) => {
      this.image?.setClipRect(e.clone());
    }), this.mask.setRect(this.rect), this.mask.setHandleRect(t), this.layoutList.push(this.mask);
  }
  draw(t) {
    super.draw(t), this.mousePoint && this.drawCursor && this.mouseOver && (t.save(), t.translate(this.mousePoint.x - 9, this.mousePoint.y - 9), this.drawCursor.draw(
      t,
      this.config.cursorSize,
      this.config.cursorSize,
      this.config.cursorStrokeColor,
      this.config.cursorColor,
      this.config.cursorStrokeLineWidth
    ), t.restore());
  }
}
export {
  I as default
};
