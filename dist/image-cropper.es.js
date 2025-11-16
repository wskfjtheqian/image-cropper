const M = "data:image/svg+xml;base64,PHN2ZyB0PSIxNzYzMzA4NTgxNTE3IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE1NzAiCiAgICAgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIj4KICAgIDxwYXRoIGQ9Ik00MjEuMTIgNTkwLjUwNjY2N0wzNjIuNjY2NjY3IDY0OC41MzMzMzNhMzI5LjM4NjY2NyAzMjkuMzg2NjY3IDAgMCAxIDIzLjQ2NjY2Ni00MDkuMTczMzMzIDguNTMzMzMzIDguNTMzMzMzIDAgMCAwLTkuODEzMzMzLTEzLjIyNjY2NyAzMTAuMTg2NjY3IDMxMC4xODY2NjcgMCAwIDAtODMuMiA0OTIuMzczMzM0TDI0MS45MiA3NjhhMTcuMDY2NjY3IDE3LjA2NjY2NyAwIDAgMCAxMS45NDY2NjcgMjkuMDEzMzMzaDE3OS4yYTE3LjA2NjY2NiAxNy4wNjY2NjcgMCAwIDAgMTcuMDY2NjY2LTE3LjA2NjY2NnYtMTc5LjJhMTcuMDY2NjY3IDE3LjA2NjY2NyAwIDAgMC0yOS4wMTMzMzMtMTAuMjR6TTYwMi44OCA0MzMuNDkzMzMzTDY2MS4zMzMzMzMgMzc1LjQ2NjY2N2EzMjkuMzg2NjY3IDMyOS4zODY2NjcgMCAwIDEtMjEuMzMzMzMzIDQwOS4xNzMzMzMgOC41MzMzMzMgOC41MzMzMzMgMCAwIDAgOS44MTMzMzMgMTMuMjI2NjY3IDMxMC4xODY2NjcgMzEwLjE4NjY2NyAwIDAgMCA4MS4wNjY2NjctNDkyLjM3MzMzNEw3ODIuMDggMjU2YTE3LjA2NjY2NyAxNy4wNjY2NjcgMCAwIDAtMTEuOTQ2NjY3LTI5LjAxMzMzM2gtMTc5LjJhMTcuMDY2NjY3IDE3LjA2NjY2NyAwIDAgMC0xNy4wNjY2NjYgMTcuMDY2NjY2djE3OS4yYTE3LjA2NjY2NyAxNy4wNjY2NjcgMCAwIDAgMjkuMDEzMzMzIDEwLjI0eiIKICAgICAgICAgIHAtaWQ9IjE1NzEiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMjAiPjwvcGF0aD4KPC9zdmc+";
class i {
  constructor(t, e) {
    this.x = t, this.y = e;
  }
}
class m {
  constructor(t, e, s) {
    this.x = t, this.y = e, this.z = s;
  }
}
class n {
  constructor(t, e, s, o) {
    this.left = t, this.top = e, this.right = s, this.bottom = o;
  }
  static fromSize(t, e, s, o) {
    return new n(t, e, t + s, e + o);
  }
  get width() {
    return this.right - this.left;
  }
  get height() {
    return this.bottom - this.top;
  }
  get center() {
    return new i((this.right - this.left) / 2, (this.bottom - this.top) / 2);
  }
  clone() {
    return new n(this.left, this.top, this.right, this.bottom);
  }
}
class d {
  constructor(t, e, s) {
    this.layoutList = [], this.rect = new n(0, 0, 0, 0), this.parent = null, this.config = {
      backgroundBoxSize: 10,
      backgroundBoxColor0: "#fff",
      backgroundBoxColor1: "#ddd",
      guidelineWidth: 1,
      guidelineColor1: "#ffffff60",
      guidelineColor2: "#00000060",
      guidelineDsah: 4,
      borderWidth: 1,
      borderColor1: "#000000",
      borderColor2: "#ffffff",
      pointRadius: 7
    }, this.parent = t, this.cursor = e, Object.assign(this.config, s);
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
class y extends d {
  constructor(t, e) {
    super(t, "crosshair", e), this.mousePoint = new i(0, 0), this.selectRect = new n(0, 0, 0, 0), this.onStartSelect = null, this.onMoveSelect = null, this.onEndSelect = null;
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
    return this.mousePoint = t, this.selectRect = new n(t.x, t.y, t.x, t.y), this.onStartSelect?.call(this, this.selectRect), !0;
  }
  move(t) {
    return this.selectRect.right += t.x - this.mousePoint.x, this.selectRect.bottom += t.y - this.mousePoint.y, this.mousePoint = t, this.onMoveSelect?.call(this, this.selectRect), !0;
  }
  end() {
    return this.onEndSelect?.call(this, this.selectRect), !0;
  }
  draw(t) {
    const { left: e, top: s, right: o, bottom: h } = this.rect, r = o - e, a = h - s;
    for (let l = 0; l < a; l += this.config.backgroundBoxSize) {
      let f = Math.floor(l / this.config.backgroundBoxSize) % 2 ? this.config.backgroundBoxColor0 : this.config.backgroundBoxColor1;
      for (let g = 0; g < r; g += this.config.backgroundBoxSize)
        t.fillStyle = f = f === this.config.backgroundBoxColor1 ? this.config.backgroundBoxColor0 : this.config.backgroundBoxColor1, t.fillRect(g, l, this.config.backgroundBoxSize, this.config.backgroundBoxSize);
    }
  }
}
class w extends d {
  constructor(t, e = "auto") {
    super(t, e), this.scale = 1, this.angle = 0, this.clipRect = new n(0, 0, 0, 0), this.offset = new i(0, 0);
  }
  reset() {
    this.angle = 0, this.offset = new i(0, 0), this.clipRect = new n(this.rect.left, this.rect.top, this.rect.right, this.rect.bottom);
    const t = this.rect.width / this.image.width, e = this.rect.height / this.image.height;
    this.scale = Math.min(t, e);
  }
  setRect(t) {
    super.setRect(t), this.clipRect = new n(t.left, t.top, t.right, t.bottom);
  }
  setClipRect(t) {
    const e = new i(
      this.clipRect.left + this.clipRect.width / 2 - (t.left + t.width / 2),
      this.clipRect.top + this.clipRect.height / 2 - (t.top + t.height / 2)
    );
    this.moveImage(e), this.clipRect = t;
  }
  setImage(t) {
    this.image = t;
    const e = this.rect.width / t.width, s = this.rect.height / t.height;
    this.scale = Math.min(e, s);
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
    const e = Math.cos(-this.angle * Math.PI / 180), s = Math.sin(-this.angle * Math.PI / 180), o = t.x * e - t.y * s, h = t.x * s + t.y * e;
    this.offset.x += o / this.scale, this.offset.y += h / this.scale;
  }
  draw(t) {
    if (!this.image)
      return;
    const e = new i(this.clipRect.left + this.clipRect.width / 2, this.clipRect.top + this.clipRect.height / 2);
    t.translate(e.x, e.y), t.scale(this.scale, this.scale), t.rotate(this.angle * Math.PI / 180), t.translate(this.offset.x, this.offset.y), t.drawImage(this.image, -this.image.width / 2, -this.image.height / 2);
  }
  getClipCanvas() {
    const t = document.createElement("canvas"), e = t.getContext("2d");
    if (!e)
      throw new Error("no canvas context");
    return t.width = this.clipRect.width, t.height = this.clipRect.height, e.translate(this.clipRect.width / 2, this.clipRect.height / 2), e.scale(this.scale, this.scale), e.rotate(this.angle * Math.PI / 180), e.translate(this.offset.x, this.offset.y), e.drawImage(
      this.image,
      -this.image.width / 2,
      -this.image.height / 2,
      this.image.width,
      this.image.height
    ), t;
  }
  toBlob(t, e) {
    return this.image ? new Promise((s, o) => {
      try {
        this.getClipCanvas().toBlob((h) => {
          s(h);
        }, t ?? "image/png", e);
      } catch (h) {
        o(h);
      }
    }) : Promise.reject(new Error("image not loaded"));
  }
  toDataUrl(t, e) {
    return this.image ? new Promise((s, o) => {
      try {
        s(this.getClipCanvas().toDataURL(t ?? "image/png", e));
      } catch (h) {
        o(h);
      }
    }) : Promise.reject(new Error("image not loaded"));
  }
}
class L extends d {
  constructor(t, e = "move", s) {
    super(t, e, s), this.layoutList = [], this.isChecked = !1, this.mousePoint = new i(0, 0), this.onMoveLayout = null, this.onEndSelect = null, this.topLeft = new u(this, "nwse-resize", s), this.topCenter = new u(this, "ns-resize", s), this.topRight = new u(this, "nesw-resize", s), this.centerLeft = new u(this, "ew-resize", s), this.centerRight = new u(this, "ew-resize", s), this.bottomLeft = new u(this, "nesw-resize", s), this.bottomCenter = new u(this, "ns-resize", s), this.bottomRight = new u(this, "nwse-resize", s), this.topLeft.setOnMoveLayout(this.onMoveTopLeft.bind(this)), this.topCenter.setOnMoveLayout(this.onMoveTopCenter.bind(this)), this.topRight.setOnMoveLayout(this.onMoveTopRight.bind(this)), this.centerLeft.setOnMoveLayout(this.onMoveCenterLeft.bind(this)), this.centerRight.setOnMoveLayout(this.onMoveCenterRight.bind(this)), this.bottomLeft.setOnMoveLayout(this.onMoveBottomLeft.bind(this)), this.bottomCenter.setOnMoveLayout(this.onMoveBottomCenter.bind(this)), this.bottomRight.setOnMoveLayout(this.onMoveBottomRight.bind(this)), this.topLeft.setOnEndLayout(this.onEndLayout.bind(this)), this.topCenter.setOnEndLayout(this.onEndLayout.bind(this)), this.topRight.setOnEndLayout(this.onEndLayout.bind(this)), this.centerLeft.setOnEndLayout(this.onEndLayout.bind(this)), this.centerRight.setOnEndLayout(this.onEndLayout.bind(this)), this.bottomLeft.setOnEndLayout(this.onEndLayout.bind(this)), this.bottomCenter.setOnEndLayout(this.onEndLayout.bind(this)), this.bottomRight.setOnEndLayout(this.onEndLayout.bind(this)), this.layoutList = [
      this.topLeft,
      this.topCenter,
      this.topRight,
      this.centerLeft,
      this.centerRight,
      this.bottomLeft,
      this.bottomCenter,
      this.bottomRight
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
  onMoveTopLeft(t) {
    this.rect.left = this.rect.left + t.x, this.rect.top = this.rect.top + t.y, this.setRect(this.rect);
  }
  onMoveTopCenter(t) {
    this.rect.top = this.rect.top + t.y, this.setRect(this.rect);
  }
  onMoveTopRight(t) {
    this.rect.right = this.rect.right + t.x, this.rect.top = this.rect.top + t.y, this.setRect(this.rect);
  }
  onMoveCenterLeft(t) {
    this.rect.left = this.rect.left + t.x, this.setRect(this.rect);
  }
  onMoveCenterRight(t) {
    this.rect.right = this.rect.right + t.x, this.setRect(this.rect);
  }
  onMoveBottomLeft(t) {
    this.rect.left = this.rect.left + t.x, this.rect.bottom = this.rect.bottom + t.y, this.setRect(this.rect);
  }
  onMoveBottomCenter(t) {
    this.rect.bottom = this.rect.bottom + t.y, this.setRect(this.rect);
  }
  onMoveBottomRight(t) {
    this.rect.right = this.rect.right + t.x, this.rect.bottom = this.rect.bottom + t.y, this.setRect(this.rect);
  }
  start(t) {
    return super.start(t) ? !0 : this.checkPointInRect(t) ? (this.isChecked = !0, this.mousePoint = t, !0) : !1;
  }
  move(t) {
    return this.isChecked && (this.onMoveLayout?.call(this, new i(t.x - this.mousePoint.x, t.y - this.mousePoint.y)), this.mousePoint = t), super.move(t);
  }
  end(t) {
    return this.isChecked && (this.onMoveLayout?.call(this, new i(t.x - this.mousePoint.x, t.y - this.mousePoint.y)), this.mousePoint = t, this.isChecked = !1), super.end(t);
  }
  setRect(t) {
    super.setRect(t);
    const { left: e, top: s, right: o, bottom: h } = t, r = o - e, a = h - s;
    this.topLeft.setRect(n.fromSize(e, s, this.config.pointRadius * 2, this.config.pointRadius * 2)), this.topCenter.setRect(n.fromSize(e + r / 2, s, this.config.pointRadius * 2, this.config.pointRadius * 2)), this.topRight.setRect(n.fromSize(o, s, this.config.pointRadius * 2, this.config.pointRadius * 2)), this.centerLeft.setRect(n.fromSize(e, s + a / 2, this.config.pointRadius * 2, this.config.pointRadius * 2)), this.centerRight.setRect(n.fromSize(o, s + a / 2, this.config.pointRadius * 2, this.config.pointRadius * 2)), this.bottomLeft.setRect(n.fromSize(e, h, this.config.pointRadius * 2, this.config.pointRadius * 2)), this.bottomCenter.setRect(n.fromSize(e + r / 2, h, this.config.pointRadius * 2, this.config.pointRadius * 2)), this.bottomRight.setRect(n.fromSize(o, h, this.config.pointRadius * 2, this.config.pointRadius * 2));
  }
  drawMask(t) {
    t.rect(this.rect.left, this.rect.top, this.rect.width, this.rect.height);
  }
  drawLine(t, e, s) {
    t.save(), t.beginPath(), t.moveTo(e.x, e.y), t.lineTo(s.x, s.y), t.closePath(), t.setLineDash([this.config.guidelineDsah, this.config.guidelineDsah]), t.lineWidth = this.config.guidelineWidth, t.strokeStyle = this.config.guidelineColor1, t.lineDashOffset = 0, t.stroke(), t.strokeStyle = this.config.guidelineColor2, t.lineDashOffset = this.config.guidelineDsah, t.stroke(), t.restore();
  }
  draw(t) {
    const { left: e, top: s, right: o, bottom: h } = this.rect;
    let r = o - e, a = h - s;
    t.lineWidth = this.config.borderWidth, t.beginPath(), t.rect(e - 1, s - 1, r + 2, a + 2), t.closePath(), t.strokeStyle = this.config.borderColor2, t.stroke(), t.beginPath(), t.rect(e, s, r, a), t.closePath(), t.strokeStyle = this.config.borderColor1, t.stroke(), r = r / 3, a = a / 3, this.drawLine(t, new i(e, s + a), new i(o, s + a)), this.drawLine(t, new i(e, s + a * 2), new i(o, s + a * 2)), this.drawLine(t, new i(e + r, s), new i(e + r, h)), this.drawLine(t, new i(e + r * 2, s), new i(e + r * 2, h)), super.draw(t);
  }
}
class u extends d {
  constructor() {
    super(...arguments), this.isChecked = !1, this.mousePoint = new i(0, 0), this.onMoveLayout = null, this.onEndLayout = null;
  }
  setOnMoveLayout(t) {
    this.onMoveLayout = t;
  }
  setOnEndLayout(t) {
    this.onEndLayout = t;
  }
  setRect(t) {
    super.setRect(new n(
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
    return this.isChecked && (this.onMoveLayout?.call(this, new i(t.x - this.mousePoint.x, t.y - this.mousePoint.y)), this.mousePoint = t), !1;
  }
  end(t) {
    return this.isChecked && (this.onEndLayout?.call(this, new i(t.x - this.mousePoint.x, t.y - this.mousePoint.y)), this.mousePoint = t, this.isChecked = !1), !1;
  }
  draw(t) {
    t.beginPath(), t.rect(this.rect.left, this.rect.top, this.rect.width, this.rect.height), t.closePath(), t.fillStyle = this.config.borderColor2, t.fill(), t.lineWidth = this.config.borderWidth, t.strokeStyle = this.config.borderColor1, t.stroke();
  }
}
class R extends d {
  constructor(t, e = "pointer", s) {
    super(t, e, s), this.maskColor = "#88888888", this.isSelect = !0, this.isChecked = !1, this.mousePoint = new i(0, 0), this.onRotateLayout = null, this.handle = new L(this, "move", s), this.layoutList.push(this.handle);
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
    if (this.isChecked) {
      const e = this.getRect(), s = new i(e.left + e.width / 2, e.top + e.height / 2), o = t.x - s.x, h = t.y - s.y, r = this.mousePoint.x - s.x, a = this.mousePoint.y - s.y, l = (Math.atan2(a, r) - Math.atan2(h, o)) * (180 / Math.PI);
      return this.onRotateLayout?.call(this, l), this.mousePoint = t, !0;
    }
    return super.move(t), !0;
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
    const { left: e, top: s, right: o, bottom: h } = this.rect, r = o - e, a = h - s;
    t.save(), t.beginPath(), t.rect(e, s, r, a), this.handle.drawMask(t), t.closePath(), t.fillStyle = this.maskColor, t.fill("evenodd"), t.restore(), super.draw(t);
  }
}
class p extends d {
  constructor(t, e) {
    super(null, "auto", e), this.overLayout = null, this.layoutList = [], this.background = new y(this, e);
    const { width: s, height: o } = t.getBoundingClientRect();
    t.width = s, t.height = o, this.canvas = t, this.canvas2D = t.getContext("2d"), this.setRect(new n(0, 0, this.canvas.width, this.canvas.height)), this.initBackground(), t.addEventListener("mousedown", this.onMouseDown.bind(this)), t.addEventListener("mousemove", this.onMouseMove.bind(this)), t.addEventListener("mouseup", this.onMouseUp.bind(this)), t.addEventListener("wheel", this.onMouseWheel.bind(this)), t.addEventListener("touchstart", this.onTouchStart.bind(this)), t.addEventListener("touchmove", this.onTouchMove.bind(this)), t.addEventListener("touchend", this.onTouchEnd.bind(this)), this.draw(this.canvas2D);
  }
  setCursor(t) {
    this.canvas.style.cursor = t;
  }
  start(t) {
    return super.start(t), this.draw(this.canvas2D), !0;
  }
  move(t) {
    return this.checkOverOut(t), super.move(t), this.draw(this.canvas2D), !0;
  }
  end(t) {
    return super.end(t), this.draw(this.canvas2D), !0;
  }
  onTouchStart(t) {
    t.preventDefault(), t.touches.length !== 0 && this.start(new i(t.touches[0].clientX, t.touches[0].clientY));
  }
  onTouchMove(t) {
    t.preventDefault(), t.touches.length !== 0 && this.move(new i(t.touches[0].clientX, t.touches[0].clientY));
  }
  onTouchEnd(t) {
    t.preventDefault(), this.end(new i(t.changedTouches[0].clientX, t.changedTouches[0].clientY));
  }
  onMouseDown(t) {
    t.preventDefault(), this.start(new i(t.offsetX, t.offsetY));
  }
  onMouseMove(t) {
    t.preventDefault(), this.move(new i(t.offsetX, t.offsetY));
  }
  onMouseUp(t) {
    t.preventDefault(), this.end(new i(t.offsetX, t.offsetY));
  }
  onMouseOver(t) {
    t.preventDefault(), this.over();
  }
  onMouseWheel(t) {
    t.preventDefault(), this.wheel(new m(t.deltaX, t.deltaY, t.deltaZ)), this.draw(this.canvas2D);
  }
  setImage(t) {
    this.image = new w(this), this.image.setRect(this.rect.clone()), this.image.setImage(t), this.layoutList.push(this.image), this.draw(this.canvas2D);
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
      this.mask || (this.mask = new R(this, `url(${M}), auto`, this.config), this.mask.setOnMoveLayout((e) => {
        this.image?.moveImage(e);
      }), this.mask.setOnRotateLayout((e) => {
        this.image?.setRotate(e);
      }), this.mask.setOnEndSelect((e) => {
        this.image?.setClipRect(e.clone());
      }), this.mask.setRect(this.rect), this.mask.setHandleRect(t.clone()), this.layoutList.push(this.mask));
    }), this.background.setOnMoveSelect((t) => {
      this.mask?.setHandleRect(t.clone());
    }), this.background.setOnEndSelect((t) => {
      this.mask?.endSelect(t.clone()), this.image?.setClipRect(t.clone());
    });
  }
  reset() {
    this.mask?.remove(), this.mask = void 0, this.image?.reset(), this.draw(this.canvas2D);
  }
}
export {
  p as default
};
