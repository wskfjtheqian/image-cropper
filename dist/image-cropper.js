const rotatingCursor = 'data:image/svg+xml;base64,PHN2ZyB0PSIxNzYzMzA4NTgxNTE3IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE1NzAiCiAgICAgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIj4KICAgIDxwYXRoIGQ9Ik00MjEuMTIgNTkwLjUwNjY2N0wzNjIuNjY2NjY3IDY0OC41MzMzMzNhMzI5LjM4NjY2NyAzMjkuMzg2NjY3IDAgMCAxIDIzLjQ2NjY2Ni00MDkuMTczMzMzIDguNTMzMzMzIDguNTMzMzMzIDAgMCAwLTkuODEzMzMzLTEzLjIyNjY2NyAzMTAuMTg2NjY3IDMxMC4xODY2NjcgMCAwIDAtODMuMiA0OTIuMzczMzM0TDI0MS45MiA3NjhhMTcuMDY2NjY3IDE3LjA2NjY2NyAwIDAgMCAxMS45NDY2NjcgMjkuMDEzMzMzaDE3OS4yYTE3LjA2NjY2NiAxNy4wNjY2NjcgMCAwIDAgMTcuMDY2NjY2LTE3LjA2NjY2NnYtMTc5LjJhMTcuMDY2NjY3IDE3LjA2NjY2NyAwIDAgMC0yOS4wMTMzMzMtMTAuMjR6TTYwMi44OCA0MzMuNDkzMzMzTDY2MS4zMzMzMzMgMzc1LjQ2NjY2N2EzMjkuMzg2NjY3IDMyOS4zODY2NjcgMCAwIDEtMjEuMzMzMzMzIDQwOS4xNzMzMzMgOC41MzMzMzMgOC41MzMzMzMgMCAwIDAgOS44MTMzMzMgMTMuMjI2NjY3IDMxMC4xODY2NjcgMzEwLjE4NjY2NyAwIDAgMCA4MS4wNjY2NjctNDkyLjM3MzMzNEw3ODIuMDggMjU2YTE3LjA2NjY2NyAxNy4wNjY2NjcgMCAwIDAtMTEuOTQ2NjY3LTI5LjAxMzMzM2gtMTc5LjJhMTcuMDY2NjY3IDE3LjA2NjY2NyAwIDAgMC0xNy4wNjY2NjYgMTcuMDY2NjY2djE3OS4yYTE3LjA2NjY2NyAxNy4wNjY2NjcgMCAwIDAgMjkuMDEzMzMzIDEwLjI0eiIKICAgICAgICAgIHAtaWQ9IjE1NzEiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMjAiPjwvcGF0aD4KPC9zdmc+';
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
class Delta {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}
class Rect {
    constructor(left, top, right, bottom) {
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
    }
    static fromSize(left, top, width, height) {
        return new Rect(left, top, left + width, top + height);
    }
    get width() {
        return this.right - this.left;
    }
    get height() {
        return this.bottom - this.top;
    }
    get center() {
        return new Point((this.right - this.left) / 2, (this.bottom - this.top) / 2);
    }
    clone() {
        return new Rect(this.left, this.top, this.right, this.bottom);
    }
}
class Layout {
    constructor(parent, cursor, config) {
        this.layoutList = [];
        this.rect = new Rect(0, 0, 0, 0);
        this.parent = null;
        this.config = {
            backgroundBoxSize: 10,
            backgroundBoxColor0: '#fff',
            backgroundBoxColor1: '#ddd',
            guidelineWidth: 1,
            guidelineColor1: '#ffffff60',
            guidelineColor2: '#00000060',
            guidelineDsah: 4,
            borderWidth: 1,
            borderColor1: '#000000',
            borderColor2: '#ffffff',
            pointRadius: 7,
        };
        this.parent = parent;
        this.cursor = cursor;
        Object.assign(this.config, config);
    }
    setRect(rect) {
        this.rect = rect;
    }
    getRect() {
        return this.rect;
    }
    getRoot() {
        let parent = this.parent;
        while (parent?.parent) {
            parent = parent.parent;
        }
        return parent;
    }
    checkPointInRect(point) {
        return point.x >= this.rect.left && point.x <= this.rect.right && point.y >= this.rect.top && point.y <= this.rect.bottom;
    }
    start(point) {
        for (let i = this.layoutList.length - 1; i >= 0; i--) {
            if (this.layoutList[i].start(point)) {
                return true;
            }
        }
        return false;
    }
    move(point) {
        for (let i = this.layoutList.length - 1; i >= 0; i--) {
            if (this.layoutList[i].move(point)) {
                return true;
            }
        }
        return false;
    }
    end(point) {
        for (let i = this.layoutList.length - 1; i >= 0; i--) {
            if (this.layoutList[i].end(point)) {
                return true;
            }
        }
        return false;
    }
    wheel(delta) {
        for (let i = this.layoutList.length - 1; i >= 0; i--) {
            if (this.layoutList[i].wheel(delta)) {
                return true;
            }
        }
        return false;
    }
    over() {
        this.getRoot()?.setCursor(this.cursor);
    }
    out() {
    }
    checkOverOut(point) {
        for (let i = this.layoutList.length - 1; i >= 0; i--) {
            if (this.layoutList[i].checkOverOut(point)) {
                return true;
            }
        }
        if (this.checkPointInRect(point)) {
            this.getRoot()?.setOverLayout(this, point);
            return true;
        }
        return false;
    }
    draw(ctx) {
        for (const layout of this.layoutList) {
            ctx.save();
            layout.draw(ctx);
            ctx.restore();
        }
    }
    remove() {
        this.parent?.layoutList.splice(this.parent.layoutList.indexOf(this), 1);
    }
}
class BackgroundLayout extends Layout {
    constructor(parent, config) {
        super(parent, 'crosshair', config);
        this.mousePoint = new Point(0, 0);
        this.selectRect = new Rect(0, 0, 0, 0);
        this.onStartSelect = null;
        this.onMoveSelect = null;
        this.onEndSelect = null;
    }
    setOnStartSelect(callback) {
        this.onStartSelect = callback;
    }
    setOnMoveSelect(callback) {
        this.onMoveSelect = callback;
    }
    setOnEndSelect(callback) {
        this.onEndSelect = callback;
    }
    start(point) {
        this.mousePoint = point;
        this.selectRect = new Rect(point.x, point.y, point.x, point.y);
        this.onStartSelect?.call(this, this.selectRect);
        return true;
    }
    move(point) {
        this.selectRect.right += point.x - this.mousePoint.x;
        this.selectRect.bottom += point.y - this.mousePoint.y;
        this.mousePoint = point;
        this.onMoveSelect?.call(this, this.selectRect);
        return true;
    }
    end() {
        this.onEndSelect?.call(this, this.selectRect);
        return true;
    }
    draw(ctx) {
        const { left, top, right, bottom } = this.rect;
        const width = right - left;
        const height = bottom - top;
        for (let y = 0; y < height; y += this.config.backgroundBoxSize) {
            let color = (Math.floor(y / this.config.backgroundBoxSize) % 2) ? this.config.backgroundBoxColor0 : this.config.backgroundBoxColor1;
            for (let x = 0; x < width; x += this.config.backgroundBoxSize) {
                ctx.fillStyle = color = color === this.config.backgroundBoxColor1 ? this.config.backgroundBoxColor0 : this.config.backgroundBoxColor1;
                ctx.fillRect(x, y, this.config.backgroundBoxSize, this.config.backgroundBoxSize);
            }
        }
    }
}
class ImageLayout extends Layout {
    constructor(parent, cursor = "auto") {
        super(parent, cursor);
        this.scale = 1;
        this.angle = 0;
        this.clipRect = new Rect(0, 0, 0, 0);
        this.offset = new Point(0, 0);
    }
    reset() {
        this.angle = 0;
        this.offset = new Point(0, 0);
        this.clipRect = new Rect(this.rect.left, this.rect.top, this.rect.right, this.rect.bottom);
        const scaleX = this.rect.width / this.image.width;
        const scaleY = this.rect.height / this.image.height;
        this.scale = Math.min(scaleX, scaleY);
    }
    setRect(rect) {
        super.setRect(rect);
        this.clipRect = new Rect(rect.left, rect.top, rect.right, rect.bottom);
    }
    setClipRect(rect) {
        const offset = new Point((this.clipRect.left + this.clipRect.width / 2) - (rect.left + rect.width / 2), (this.clipRect.top + this.clipRect.height / 2) - (rect.top + rect.height / 2));
        this.moveImage(offset);
        this.clipRect = rect;
    }
    setImage(image) {
        this.image = image;
        const scaleX = this.rect.width / image.width;
        const scaleY = this.rect.height / image.height;
        this.scale = Math.min(scaleX, scaleY);
    }
    setRotate(angle) {
        this.angle -= angle;
    }
    start() {
        return false;
    }
    move() {
        return false;
    }
    end() {
        return false;
    }
    wheel(delta) {
        const zoomSpeed = 0.1;
        if (delta.y < 0) {
            this.scale *= (1 + zoomSpeed);
        }
        else {
            this.scale *= (1 - zoomSpeed);
        }
        this.scale = Math.max(0.1, Math.min(5, this.scale));
        return true;
    }
    moveImage(offset) {
        const cos = Math.cos(-this.angle * Math.PI / 180);
        const sin = Math.sin(-this.angle * Math.PI / 180);
        const deltaX = offset.x * cos - offset.y * sin;
        const deltaY = offset.x * sin + offset.y * cos;
        this.offset.x += deltaX / this.scale;
        this.offset.y += deltaY / this.scale;
    }
    draw(ctx) {
        if (!this.image) {
            return;
        }
        const center = new Point(this.clipRect.left + this.clipRect.width / 2, this.clipRect.top + this.clipRect.height / 2);
        ctx.translate(center.x, center.y);
        ctx.scale(this.scale, this.scale);
        ctx.rotate(this.angle * Math.PI / 180);
        ctx.translate(this.offset.x, this.offset.y);
        ctx.drawImage(this.image, -this.image.width / 2, -this.image.height / 2);
    }
    getClipCanvas() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            throw new Error('no canvas context');
        }
        canvas.width = this.clipRect.width;
        canvas.height = this.clipRect.height;
        ctx.translate(this.clipRect.width / 2, this.clipRect.height / 2);
        ctx.scale(this.scale, this.scale);
        ctx.rotate(this.angle * Math.PI / 180);
        ctx.translate(this.offset.x, this.offset.y);
        ctx.drawImage(this.image, -this.image.width / 2, -this.image.height / 2, this.image.width, this.image.height);
        return canvas;
    }
    toBlob(type, quality) {
        if (!this.image) {
            return Promise.reject(new Error('image not loaded'));
        }
        return new Promise((resolve, reject) => {
            try {
                this.getClipCanvas().toBlob((blob) => {
                    resolve(blob);
                }, type ?? "image/png", quality);
            }
            catch (error) {
                reject(error);
            }
        });
    }
    toDataUrl(type, quality) {
        if (!this.image) {
            return Promise.reject(new Error('image not loaded'));
        }
        return new Promise((resolve, reject) => {
            try {
                resolve(this.getClipCanvas().toDataURL(type ?? "image/png", quality));
            }
            catch (error) {
                reject(error);
            }
        });
    }
}
class HandleLayout extends Layout {
    constructor(parent, cursor = "move", config) {
        super(parent, cursor, config);
        this.layoutList = [];
        this.isChecked = false;
        this.mousePoint = new Point(0, 0);
        this.onMoveLayout = null;
        this.onEndSelect = null;
        this.topLeft = new PointLayout(this, "nwse-resize", config);
        this.topCenter = new PointLayout(this, "ns-resize", config);
        this.topRight = new PointLayout(this, "nesw-resize", config);
        this.centerLeft = new PointLayout(this, "ew-resize", config);
        this.centerRight = new PointLayout(this, "ew-resize", config);
        this.bottomLeft = new PointLayout(this, "nesw-resize", config);
        this.bottomCenter = new PointLayout(this, "ns-resize", config);
        this.bottomRight = new PointLayout(this, "nwse-resize", config);
        this.topLeft.setOnMoveLayout(this.onMoveTopLeft.bind(this));
        this.topCenter.setOnMoveLayout(this.onMoveTopCenter.bind(this));
        this.topRight.setOnMoveLayout(this.onMoveTopRight.bind(this));
        this.centerLeft.setOnMoveLayout(this.onMoveCenterLeft.bind(this));
        this.centerRight.setOnMoveLayout(this.onMoveCenterRight.bind(this));
        this.bottomLeft.setOnMoveLayout(this.onMoveBottomLeft.bind(this));
        this.bottomCenter.setOnMoveLayout(this.onMoveBottomCenter.bind(this));
        this.bottomRight.setOnMoveLayout(this.onMoveBottomRight.bind(this));
        this.topLeft.setOnEndLayout(this.onEndLayout.bind(this));
        this.topCenter.setOnEndLayout(this.onEndLayout.bind(this));
        this.topRight.setOnEndLayout(this.onEndLayout.bind(this));
        this.centerLeft.setOnEndLayout(this.onEndLayout.bind(this));
        this.centerRight.setOnEndLayout(this.onEndLayout.bind(this));
        this.bottomLeft.setOnEndLayout(this.onEndLayout.bind(this));
        this.bottomCenter.setOnEndLayout(this.onEndLayout.bind(this));
        this.bottomRight.setOnEndLayout(this.onEndLayout.bind(this));
        this.layoutList = [
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
    setOnMoveLayout(callback) {
        this.onMoveLayout = callback;
    }
    setOnEndSelect(callback) {
        this.onEndSelect = callback;
    }
    onMoveTopLeft(offset) {
        this.rect.left = this.rect.left + offset.x;
        this.rect.top = this.rect.top + offset.y;
        this.setRect(this.rect);
    }
    onMoveTopCenter(offset) {
        this.rect.top = this.rect.top + offset.y;
        this.setRect(this.rect);
    }
    onMoveTopRight(offset) {
        this.rect.right = this.rect.right + offset.x;
        this.rect.top = this.rect.top + offset.y;
        this.setRect(this.rect);
    }
    onMoveCenterLeft(offset) {
        this.rect.left = this.rect.left + offset.x;
        this.setRect(this.rect);
    }
    onMoveCenterRight(offset) {
        this.rect.right = this.rect.right + offset.x;
        this.setRect(this.rect);
    }
    onMoveBottomLeft(offset) {
        this.rect.left = this.rect.left + offset.x;
        this.rect.bottom = this.rect.bottom + offset.y;
        this.setRect(this.rect);
    }
    onMoveBottomCenter(offset) {
        this.rect.bottom = this.rect.bottom + offset.y;
        this.setRect(this.rect);
    }
    onMoveBottomRight(offset) {
        this.rect.right = this.rect.right + offset.x;
        this.rect.bottom = this.rect.bottom + offset.y;
        this.setRect(this.rect);
    }
    start(point) {
        if (super.start(point)) {
            return true;
        }
        if (this.checkPointInRect(point)) {
            this.isChecked = true;
            this.mousePoint = point;
            return true;
        }
        return false;
    }
    move(point) {
        if (this.isChecked) {
            this.onMoveLayout?.call(this, new Point(point.x - this.mousePoint.x, point.y - this.mousePoint.y));
            this.mousePoint = point;
        }
        return super.move(point);
    }
    end(point) {
        if (this.isChecked) {
            this.onMoveLayout?.call(this, new Point(point.x - this.mousePoint.x, point.y - this.mousePoint.y));
            this.mousePoint = point;
            this.isChecked = false;
        }
        return super.end(point);
    }
    setRect(rect) {
        super.setRect(rect);
        const { left, top, right, bottom } = rect;
        const width = right - left;
        const height = bottom - top;
        this.topLeft.setRect(Rect.fromSize(left, top, this.config.pointRadius * 2, this.config.pointRadius * 2));
        this.topCenter.setRect(Rect.fromSize(left + width / 2, top, this.config.pointRadius * 2, this.config.pointRadius * 2));
        this.topRight.setRect(Rect.fromSize(right, top, this.config.pointRadius * 2, this.config.pointRadius * 2));
        this.centerLeft.setRect(Rect.fromSize(left, top + height / 2, this.config.pointRadius * 2, this.config.pointRadius * 2));
        this.centerRight.setRect(Rect.fromSize(right, top + height / 2, this.config.pointRadius * 2, this.config.pointRadius * 2));
        this.bottomLeft.setRect(Rect.fromSize(left, bottom, this.config.pointRadius * 2, this.config.pointRadius * 2));
        this.bottomCenter.setRect(Rect.fromSize(left + width / 2, bottom, this.config.pointRadius * 2, this.config.pointRadius * 2));
        this.bottomRight.setRect(Rect.fromSize(right, bottom, this.config.pointRadius * 2, this.config.pointRadius * 2));
    }
    drawMask(ctx) {
        ctx.rect(this.rect.left, this.rect.top, this.rect.width, this.rect.height);
    }
    drawLine(ctx, start, end) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.closePath();
        ctx.setLineDash([this.config.guidelineDsah, this.config.guidelineDsah]);
        ctx.lineWidth = this.config.guidelineWidth;
        ctx.strokeStyle = this.config.guidelineColor1;
        ctx.lineDashOffset = 0;
        ctx.stroke();
        ctx.strokeStyle = this.config.guidelineColor2;
        ctx.lineDashOffset = this.config.guidelineDsah;
        ctx.stroke();
        ctx.restore();
    }
    draw(ctx) {
        const { left, top, right, bottom } = this.rect;
        let width = right - left;
        let height = (bottom - top);
        ctx.lineWidth = this.config.borderWidth;
        ctx.beginPath();
        ctx.rect(left - 1, top - 1, width + 2, height + 2);
        ctx.closePath();
        ctx.strokeStyle = this.config.borderColor2;
        ctx.stroke();
        ctx.beginPath();
        ctx.rect(left, top, width, height);
        ctx.closePath();
        ctx.strokeStyle = this.config.borderColor1;
        ctx.stroke();
        width = width / 3;
        height = height / 3;
        this.drawLine(ctx, new Point(left, top + height), new Point(right, top + height));
        this.drawLine(ctx, new Point(left, top + height * 2), new Point(right, top + height * 2));
        this.drawLine(ctx, new Point(left + width, top), new Point(left + width, bottom));
        this.drawLine(ctx, new Point(left + width * 2, top), new Point(left + width * 2, bottom));
        super.draw(ctx);
    }
}
class PointLayout extends Layout {
    constructor() {
        super(...arguments);
        this.isChecked = false;
        this.mousePoint = new Point(0, 0);
        this.onMoveLayout = null;
        this.onEndLayout = null;
    }
    setOnMoveLayout(callback) {
        this.onMoveLayout = callback;
    }
    setOnEndLayout(callback) {
        this.onEndLayout = callback;
    }
    setRect(rect) {
        super.setRect(new Rect(rect.left - this.config.pointRadius, rect.top - this.config.pointRadius, rect.right - this.config.pointRadius, rect.bottom - this.config.pointRadius));
    }
    start(point) {
        if (this.checkPointInRect(point)) {
            this.isChecked = true;
            this.mousePoint = point;
            return true;
        }
        return false;
    }
    move(point) {
        if (this.isChecked) {
            this.onMoveLayout?.call(this, new Point(point.x - this.mousePoint.x, point.y - this.mousePoint.y));
            this.mousePoint = point;
        }
        return false;
    }
    end(point) {
        if (this.isChecked) {
            this.onEndLayout?.call(this, new Point(point.x - this.mousePoint.x, point.y - this.mousePoint.y));
            this.mousePoint = point;
            this.isChecked = false;
        }
        return false;
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.rect(this.rect.left, this.rect.top, this.rect.width, this.rect.height);
        ctx.closePath();
        ctx.fillStyle = this.config.borderColor2;
        ctx.fill();
        ctx.lineWidth = this.config.borderWidth;
        ctx.strokeStyle = this.config.borderColor1;
        ctx.stroke();
    }
}
class MaskLayout extends Layout {
    constructor(parent, cursor = "pointer", config) {
        super(parent, cursor, config);
        this.maskColor = '#88888888';
        this.isSelect = true;
        this.isChecked = false;
        this.mousePoint = new Point(0, 0);
        this.onRotateLayout = null;
        this.handle = new HandleLayout(this, "move", config);
        this.layoutList.push(this.handle);
    }
    setOnRotateLayout(callback) {
        this.onRotateLayout = callback;
    }
    setOnEndSelect(callback) {
        this.handle.setOnEndSelect(callback);
    }
    start(point) {
        if (this.isSelect) {
            return false;
        }
        if (super.start(point)) {
            return true;
        }
        if (this.checkPointInRect(point)) {
            this.isChecked = true;
            this.mousePoint = point;
            return true;
        }
        return true;
    }
    move(point) {
        if (this.isSelect) {
            return false;
        }
        if (this.isChecked) {
            const rect = this.getRect();
            const center = new Point(rect.left + rect.width / 2, rect.top + rect.height / 2);
            const dx1 = point.x - center.x;
            const dy1 = point.y - center.y;
            const dx2 = this.mousePoint.x - center.x;
            const dy2 = this.mousePoint.y - center.y;
            const angle = (Math.atan2(dy2, dx2) - Math.atan2(dy1, dx1)) * (180 / Math.PI);
            this.onRotateLayout?.call(this, angle);
            this.mousePoint = point;
            return true;
        }
        super.move(point);
        return true;
    }
    end(point) {
        if (this.isSelect) {
            return false;
        }
        this.isChecked = false;
        super.end(point);
        return true;
    }
    setHandleRect(rect) {
        this.handle.setRect(rect);
    }
    endSelect(rect) {
        this.handle.setRect(rect);
        this.isSelect = false;
    }
    setOnMoveLayout(callback) {
        this.handle.setOnMoveLayout(callback);
    }
    draw(ctx) {
        const { left, top, right, bottom } = this.rect;
        const width = right - left;
        const height = bottom - top;
        ctx.save();
        ctx.beginPath();
        ctx.rect(left, top, width, height);
        this.handle.drawMask(ctx);
        ctx.closePath();
        ctx.fillStyle = this.maskColor;
        ctx.fill('evenodd');
        ctx.restore();
        super.draw(ctx);
    }
}
class ImageCropper extends Layout {
    constructor(canvas, config) {
        super(null, "auto", config);
        this.overLayout = null;
        this.layoutList = [];
        this.background = new BackgroundLayout(this, config);
        const { width, height } = canvas.getBoundingClientRect();
        canvas.width = width;
        canvas.height = height;
        this.canvas = canvas;
        this.canvas2D = canvas.getContext('2d');
        this.setRect(new Rect(0, 0, this.canvas.width, this.canvas.height));
        this.initBackground();
        canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
        canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
        canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
        canvas.addEventListener('wheel', this.onMouseWheel.bind(this));
        canvas.addEventListener('touchstart', this.onTouchStart.bind(this));
        canvas.addEventListener('touchmove', this.onTouchMove.bind(this));
        canvas.addEventListener('touchend', this.onTouchEnd.bind(this));
        this.draw(this.canvas2D);
    }
    setCursor(cursor) {
        this.canvas.style.cursor = cursor;
    }
    start(point) {
        super.start(point);
        this.draw(this.canvas2D);
        return true;
    }
    move(point) {
        this.checkOverOut(point);
        super.move(point);
        this.draw(this.canvas2D);
        return true;
    }
    end(point) {
        super.end(point);
        this.draw(this.canvas2D);
        return true;
    }
    onTouchStart(event) {
        event.preventDefault();
        if (event.touches.length === 0) {
            return;
        }
        this.start(new Point(event.touches[0].clientX, event.touches[0].clientY));
    }
    onTouchMove(event) {
        event.preventDefault();
        if (event.touches.length === 0) {
            return;
        }
        this.move(new Point(event.touches[0].clientX, event.touches[0].clientY));
    }
    onTouchEnd(event) {
        event.preventDefault();
        this.end(new Point(event.changedTouches[0].clientX, event.changedTouches[0].clientY));
    }
    onMouseDown(event) {
        event.preventDefault();
        this.start(new Point(event.offsetX, event.offsetY));
    }
    onMouseMove(event) {
        event.preventDefault();
        this.move(new Point(event.offsetX, event.offsetY));
    }
    onMouseUp(event) {
        event.preventDefault();
        this.end(new Point(event.offsetX, event.offsetY));
    }
    onMouseOver(event) {
        event.preventDefault();
        this.over();
    }
    onMouseWheel(event) {
        event.preventDefault();
        this.wheel(new Delta(event.deltaX, event.deltaY, event.deltaZ));
        this.draw(this.canvas2D);
    }
    setImage(image) {
        this.image = new ImageLayout(this);
        this.image.setRect(this.rect.clone());
        this.image.setImage(image);
        this.layoutList.push(this.image);
        this.draw(this.canvas2D);
    }
    setOverLayout(layout) {
        if (this.overLayout != layout) {
            this.overLayout?.out();
            this.overLayout = layout;
            this.overLayout.over();
        }
    }
    toDataUrl(type, quality) {
        if (!this.image) {
            return Promise.reject('No image');
        }
        if (!this.mask) {
            return Promise.reject('No mask');
        }
        return this.image.toDataUrl(type, quality);
    }
    toBlob(type, quality) {
        if (!this.image) {
            return Promise.reject('No image');
        }
        if (!this.mask) {
            return Promise.reject('No mask');
        }
        return this.image.toBlob(type, quality);
    }
    initBackground() {
        this.background.setRect(this.rect);
        this.layoutList.push(this.background);
        this.background.setOnStartSelect((rect) => {
            if (this.mask) {
                return;
            }
            this.mask = new MaskLayout(this, `url(${rotatingCursor}), auto`, this.config);
            this.mask.setOnMoveLayout((offset) => {
                this.image?.moveImage(offset);
            });
            this.mask.setOnRotateLayout((angle) => {
                this.image?.setRotate(angle);
            });
            this.mask.setOnEndSelect((rect) => {
                this.image?.setClipRect(rect.clone());
            });
            this.mask.setRect(this.rect);
            this.mask.setHandleRect(rect.clone());
            this.layoutList.push(this.mask);
        });
        this.background.setOnMoveSelect((rect) => {
            this.mask?.setHandleRect(rect.clone());
        });
        this.background.setOnEndSelect((rect) => {
            this.mask?.endSelect(rect.clone());
            this.image?.setClipRect(rect.clone());
        });
    }
    reset() {
        this.mask?.remove();
        this.mask = undefined;
        this.image?.reset();
        this.draw(this.canvas2D);
    }
}
export default ImageCropper;
