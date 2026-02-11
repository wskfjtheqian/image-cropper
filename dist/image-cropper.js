const minSize = 20;
export var OutType;
(function (OutType) {
    OutType[OutType["SIZE"] = 0] = "SIZE";
    OutType[OutType["RATIO"] = 1] = "RATIO";
})(OutType || (OutType = {}));
export class Svg {
    constructor(width, height, viewBox, path) {
        this.angle = 0;
        this.width = width;
        this.height = height;
        this.path = path;
        this.viewBox = viewBox;
    }
    clone(angle) {
        const svg = new Svg(this.width, this.height, this.viewBox, this.path);
        svg.setAngle(angle ?? this.angle);
        return svg;
    }
    setAngle(angle) {
        this.angle = angle;
    }
    setViewBox(x, y, width, height) {
        this.viewBox = [x, y, width, height];
    }
    draw(ctx, drawWidth, drawHeight, strokeStyle = "#000", fillStyle, strokeWidth = 1) {
        if (!this.path || this.path.length === 0)
            return;
        ctx.save();
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        let vbX = 0, vbY = 0, vbWidth = this.width, vbHeight = this.height;
        if (this.viewBox) {
            [vbX, vbY, vbWidth, vbHeight] = this.viewBox;
        }
        const scaleX = drawWidth / vbWidth;
        const scaleY = drawHeight / vbHeight;
        const scale = Math.min(scaleX, scaleY);
        ctx.translate(drawWidth / 2, drawHeight / 2);
        ctx.rotate((this.angle * Math.PI) / 180);
        ctx.scale(scale, scale);
        ctx.translate(-vbWidth / 2 - vbX + 0.5 / scale, -vbHeight / 2 - vbY + 0.5 / scale);
        const path2d = new Path2D();
        for (const d of this.path) {
            path2d.addPath(new Path2D(d));
        }
        ctx.strokeStyle = strokeStyle;
        ctx.lineWidth = Math.max(1, strokeWidth / scale);
        ctx.stroke(path2d);
        if (fillStyle) {
            ctx.fillStyle = fillStyle;
            ctx.fill(path2d);
        }
        ctx.restore();
    }
}
const centerIcon = new Svg(24, 24, [0, 0, 24, 24], ["M13.6,12c0,0.9-0.7,1.6-1.6,1.6s-1.6-0.7-1.6-1.6s0.7-1.6,1.6-1.6S13.6,11.1,13.6,12z M21,10.4v3.3h-2.1" +
        "c-0.6,2.6-2.7,4.7-5.3,5.3V21h-3.3v-2.1c-2.6-0.6-4.7-2.7-5.3-5.3H3v-3.3h2.1c0.6-2.6,2.7-4.7,5.3-5.3V3h3.3v2.1" +
        "c2.6,0.6,4.7,2.7,5.3,5.3H21z M16.7,12c0-2.6-2.1-4.7-4.7-4.7S7.3,9.4,7.3,12s2.1,4.7,4.7,4.7S16.7,14.6,16.7,12z"]);
const edgeIcon = new Svg(24, 24, [0, 0, 24, 24], ["M0,4.96h24V11H0V4.96z"] // 一个简单矩形
);
const cornerIcon = new Svg(24, 24, [0, 0, 24, 24], ["M12.91,4.96 L0,4.96 L0,11 L12.91,11 L12.91,24 L18.95,24 L18.95,11 L18.95,4.96 Z"]);
const resizeIcon = new Svg(24, 24, [0, 0, 24, 24], ["M13.7,12L13.7,12l0-7.3H17L12,0.1L6.9,4.7h3.3v14.5H6.8l5.1,4.7l5.1-4.7h-3.3V12z"]);
const rotateIcon = new Svg(24, 24, [0, 0, 24, 24], ["M20.8,18.3L20.8,18.3l-0.3,0c0,0,0,0,0,0c0-8.2-6.6-14.8-14.8-14.8c0,0-0.1,0-0.1,0V0.2L0.1,5.7l5.5,5.5V7.6c0,0,0.1,0,0.1,0c5.9,0," +
        "10.7,4.8,10.7,10.7c0,0,0,0,0,0h-0.3l-0.1,0h-3.1l5.5,5.5l5.5-5.5H20.8z"]);
const moveIcon = new Svg(24, 24, [0, 0, 24, 24], ["M19.3,17.1v-3.3h-5.5v5.5h3.3l-5.2,4.7l-5.1-4.7h3.3v-5.5H4.6v3.3L-0.1,12l4.7-5.2v3.4h5.5V4.7H6.8L12-0.1l5.1,4.7h-3.3v5.5h5.5V6.8L24,12L19.3,17.1z"]);
const clipIcon = new Svg(24, 24, [0, 0, 24, 24], ["M24,13.9H13.9V24h-4V13.9H-0.1v-4H10v-10h4v10H24V13.9z"]);
const handIcon = new Svg(24, 24, [0, 0, 24, 24], ["M18.8,5.4c-0.4,0-0.7,0.1-1,0.4c-0.3,0.3-0.4,0.6-0.4,1v5.6c0,0.3-0.2,0.4-0.4,0.4c-0.1,0-0.2,0-0.3-0.1" +
        "c-0.1-0.1-0.1-0.2-0.1-0.3V3.1c0-0.4-0.1-0.7-0.4-1c-0.3-0.3-0.6-0.4-1-0.4c-0.4,0-0.7,0.1-1,0.4c-0.3,0.3-0.4,0.6-0.4,1v8" +
        "c0,0.1,0,0.2-0.1,0.3c-0.1,0.1-0.2,0.1-0.3,0.1s-0.2,0-0.3-0.1c-0.1-0.1-0.1-0.2-0.1-0.3V1.9c0-0.4-0.1-0.7-0.4-1" +
        "c-0.3-0.3-0.6-0.4-1-0.4c-0.4,0-0.7,0.1-1,0.4c-0.3,0.3-0.4,0.6-0.4,1v9.3c0,0.3-0.2,0.4-0.4,0.4c-0.1,0-0.2,0-0.3-0.1" +
        "c-0.1-0.1-0.1-0.2-0.1-0.3v-8c0-0.4-0.1-0.7-0.4-1s-0.6-0.4-1-0.4s-0.7,0.1-1,0.4c-0.3,0.3-0.4,0.6-0.4,1v9.7c0,0.4-0.1,0.7-0.2,0.9" +
        "c-0.1,0.2-0.2,0.3-0.4,0.4c-0.2,0-0.4,0-0.5-0.1c-0.2-0.1-0.4-0.4-0.6-0.7l-2-3.4C2.7,9.5,2.4,9.3,2.1,9.2c-0.3-0.1-0.7,0-1,0.1" +
        "c-0.3,0.2-0.5,0.5-0.6,0.9c-0.1,0.4-0.1,0.8,0.1,1.1s0.2,0.3,0.2,0.3l0.5,1.1L3.8,18c0.6,1.2,1.2,2.2,1.8,3c0.5,0.6,1,1.1,1.5,1.5" +
        "c0.3,0.3,0.7,0.4,1,0.6c0.2,0.1,0.3,0.1,0.4,0.1h6.1c0.9,0,1.8-0.3,2.5-1c0.6-0.5,1.1-1.2,1.5-2.1c1-2.1,1.6-4.8,1.6-8.2V6.8" +
        "c0-0.4-0.1-0.7-0.4-1C19.6,5.6,19.2,5.4,18.8,5.4L18.8,5.4z"]);
export class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
export class Delta {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}
export class Rect {
    constructor(left, top, right, bottom) {
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
    }
    static fromSize(left, top, width, height) {
        return new Rect(left, top, left + width, top + height);
    }
    static fromCenter(center, width, height) {
        return new Rect(center.x - width / 2, center.y - height / 2, center.x + width / 2, center.y + height / 2);
    }
    get width() {
        return this.right - this.left;
    }
    get height() {
        return this.bottom - this.top;
    }
    get center() {
        return new Point(this.left + (this.right - this.left) / 2, this.top + (this.bottom - this.top) / 2);
    }
    clone() {
        return new Rect(this.left, this.top, this.right, this.bottom);
    }
    toString() {
        return `rect[${this.left.toFixed(2)}, ${this.top.toFixed(2)}, ${this.right.toFixed(2)}, ${this.bottom.toFixed(2)}],size[${this.width.toFixed(2)}, ${this.height.toFixed(2)}],center[${this.center.x.toFixed(2)}, ${this.center.y.toFixed(2)}]`;
    }
}
export function inverseTransform(clipRect, transform, targetCenter) {
    const { scaleX, scaleY, rotation, translateX, translateY } = transform;
    const cosTheta = Math.cos(rotation);
    const sinTheta = Math.sin(rotation);
    const center = clipRect.center;
    const points = [
        { x: clipRect.left, y: clipRect.top },
        { x: clipRect.right, y: clipRect.top },
        { x: clipRect.left, y: clipRect.bottom },
        { x: clipRect.right, y: clipRect.bottom },
    ];
    return points.map((point) => {
        // 当旋转点和缩放点都是矩形A的中心时，变换的数学表示：
        // 设矩形A的中心为 C_A，变换参数为 S(缩放)、R(旋转)、T(平移)
        // 对于矩形B上的一个点 P（局部坐标），变换到全局坐标 P' 的公式为：
        // P' = T + R(S(P - C_A) + C_A - C_A) + C_A
        // 简化后：P' = T + R(S(P - C_A)) + C_A
        // 即：P' = T + C_A + R(S(P - C_A))
        // 逆变换（从 P' 求 P）：
        // 1. 减去平移和矩形A中心：P1 = P' - T - C_A
        // 2. 逆旋转：P2 = R^{-1}(P1) = R^T(P1)
        // 3. 逆缩放：P3 = P2 / S + C_A
        // 4. 减去目标中心：P4 = P3 - targetCenter
        // 步骤1: 减去平移和矩形A的中心
        const p1x = point.x - translateX - center.x;
        const p1y = point.y - translateY - center.y;
        // 步骤2: 逆旋转（应用旋转矩阵的转置）
        // 旋转矩阵 R = [[cosθ, -sinθ], [sinθ, cosθ]]
        // 逆旋转矩阵 R^{-1} = R^T = [[cosθ, sinθ], [-sinθ, cosθ]]
        const p2x = p1x * cosTheta + p1y * sinTheta;
        const p2y = -p1x * sinTheta + p1y * cosTheta;
        // 步骤3: 逆缩放并加上矩形A的中心
        const p3x = p2x / scaleX + center.x;
        const p3y = p2y / scaleY + center.y;
        // 步骤4: 减去目标中心坐标（转换到目标局部坐标系）
        return {
            x: p3x - targetCenter.x,
            y: p3y - targetCenter.y
        };
    });
}
export class Layout {
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
            borderWidth: 1.5,
            borderColor1: '#000000',
            borderColor2: '#ffffff',
            pointRadius: 12,
            cursorStrokeLineWidth: 2,
            cursorStrokeColor: '#ffffff',
            cursorColor: '#000000',
            cursorSize: 18,
        };
        this.parent = parent;
        this.cursor = cursor;
        assignExcludingUndefined(this.config, config);
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
        if (this.parent) {
            this.parent.layoutList.splice(this.parent.layoutList.indexOf(this), 1);
        }
    }
}
export class BackgroundLayout extends Layout {
    constructor(parent, config) {
        super(parent, clipIcon.clone(), config);
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
        const rect = this.selectRect.clone();
        rect.right += point.x - this.mousePoint.x;
        rect.bottom += point.y - this.mousePoint.y;
        if (this.config?.outWidth && this.config?.outHeight) {
            const scale = Math.min(rect.width / this.config?.outWidth, rect.height / this.config?.outHeight);
            rect.right = rect.left + this.config?.outWidth * scale;
            rect.bottom = rect.top + this.config?.outHeight * scale;
        }
        this.selectRect = rect;
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
export class ImageLayout extends Layout {
    constructor(parent, config) {
        super(parent, null, config);
        this.scale = 1;
        this.angle = 0;
        this.clipRect = new Rect(0, 0, 0, 0);
        this.offset = new Point(0, 0);
    }
    initScale(rect) {
        if (this.image) {
            this.scale = Math.max(rect.width / this.image.width, rect.height / this.image.height);
        }
    }
    reset() {
        this.angle = 0;
        this.offset = new Point(0, 0);
        if (this.config.defaultClipRect) {
            this.scale = Math.max(this.clipRect.width / this.image.width, this.clipRect.height / this.image.height);
        }
        else {
            this.clipRect = new Rect(this.rect.left, this.rect.top, this.rect.right, this.rect.bottom);
            this.scale = Math.min(this.rect.width / this.image.width, this.rect.height / this.image.height);
        }
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
    checkOverOut(point) {
        return false;
    }
    setImage(image) {
        this.image = image;
        const scaleX = this.rect.width / image.width;
        const scaleY = this.rect.height / image.height;
        // this.scale = Math.min(scaleX, scaleY)
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
    getOutSize() {
        let scale = 1;
        if (this.config.outType == OutType.SIZE) {
            if (this.config?.outWidth && this.config?.outHeight) {
                scale = Math.min(this.config?.outWidth / this.clipRect.width, this.config?.outHeight / this.clipRect.height);
            }
            else if (this.config?.outWidth) {
                scale = this.config?.outWidth / this.clipRect.width;
            }
            else if (this.config?.outHeight) {
                scale = this.config?.outHeight / this.clipRect.height;
            }
        }
        return {
            width: this.clipRect.width * scale,
            height: this.clipRect.height * scale,
            scale: scale
        };
    }
    getClipCanvas() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            throw new Error('no canvas context');
        }
        const { width, height, scale } = this.getOutSize();
        canvas.width = width;
        canvas.height = height;
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.scale(this.scale * scale, this.scale * scale);
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
    onEndSelect() {
        const imageRect = Rect.fromCenter(this.rect.center, this.image.width, this.image.height);
        //console.log("Clip 的位置", this.clipRect.toString())
        //console.log("Image 的位置", imageRect.toString())
        const center = imageRect.center;
        const offset = new Point(this.offset.x + center.x, this.offset.y + center.y);
        //console.log("Offset 的相对位置", this.offset)
        //console.log("Offset 的位置", offset)
        const points = inverseTransform(this.clipRect, {
            rotation: -this.angle * Math.PI / 180,
            scaleX: this.scale,
            scaleY: this.scale,
            translateX: 0,
            translateY: 0,
        }, imageRect.center);
        //console.log(points)
        let isInside = true;
        points.forEach(point => {
            if (!isPointInsideAxisAlignedRect(point, this.image.width, this.image.height)) { // 超出范围
                isInside = false;
            }
        });
        //console.log(isInside)
    }
}
function assignExcludingUndefined(target, ...sources) {
    if (target == null) {
        throw new TypeError('Cannot convert undefined or null to object');
    }
    const to = Object(target);
    sources.forEach(source => {
        if (source != null) {
            for (const key in source) {
                if (source.hasOwnProperty(key) && source[key] !== undefined) {
                    to[key] = source[key];
                }
            }
        }
    });
    return to;
}
/**
 * 检查点是否在轴对齐矩形内部
 */
function isPointInsideAxisAlignedRect(point, rectWidth, rectHeight, rectCenter = { x: 0, y: 0 }, epsilon = 1e-10) {
    const halfWidth = rectWidth / 2;
    const halfHeight = rectHeight / 2;
    // 相对于矩形中心的坐标
    const xRelative = point.x - rectCenter.x;
    const yRelative = point.y - rectCenter.y;
    return (xRelative >= -halfWidth - epsilon &&
        xRelative <= halfWidth + epsilon &&
        yRelative >= -halfHeight - epsilon &&
        yRelative <= halfHeight + epsilon);
}
export class HandleLayout extends Layout {
    constructor(parent, cursor, config) {
        super(parent, cursor, config);
        this.layoutList = [];
        this.isChecked = false;
        this.mousePoint = new Point(0, 0);
        this.onMoveLayout = null;
        this.onEndMoveLayout = null;
        this.onEndSelect = null;
        this.center = new CenterLayout(this, centerIcon, 0, handIcon.clone(), config);
        this.topLeft = new PointLayout(this, cornerIcon, -90, resizeIcon.clone(-45), config);
        this.topCenter = new PointLayout(this, edgeIcon, 0, resizeIcon.clone(), config);
        this.topRight = new PointLayout(this, cornerIcon, 0, resizeIcon.clone(45), config);
        this.centerLeft = new PointLayout(this, edgeIcon, -90, resizeIcon.clone(90), config);
        this.centerRight = new PointLayout(this, edgeIcon, 90, resizeIcon.clone(90), config);
        this.bottomLeft = new PointLayout(this, cornerIcon, 180, resizeIcon.clone(45), config);
        this.bottomCenter = new PointLayout(this, edgeIcon, 180, resizeIcon.clone(), config);
        this.bottomRight = new PointLayout(this, cornerIcon, 90, resizeIcon.clone(-45), config);
        this.center.setOnMoveLayout(this.onMoveCenter.bind(this));
        this.topLeft.setOnMoveLayout(this.onMoveTopLeft.bind(this));
        this.topCenter.setOnMoveLayout(this.onMoveTopCenter.bind(this));
        this.topRight.setOnMoveLayout(this.onMoveTopRight.bind(this));
        this.centerLeft.setOnMoveLayout(this.onMoveCenterLeft.bind(this));
        this.centerRight.setOnMoveLayout(this.onMoveCenterRight.bind(this));
        this.bottomLeft.setOnMoveLayout(this.onMoveBottomLeft.bind(this));
        this.bottomCenter.setOnMoveLayout(this.onMoveBottomCenter.bind(this));
        this.bottomRight.setOnMoveLayout(this.onMoveBottomRight.bind(this));
        this.center.setOnEndLayout(this.onEndLayout.bind(this));
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
            this.bottomRight,
            this.center
        ];
    }
    onEndLayout() {
        this.onEndSelect?.call(this, this.rect);
    }
    setOnMoveLayout(callback) {
        this.onMoveLayout = callback;
    }
    setOnEndMoveLayout(callback) {
        this.onEndMoveLayout = callback;
    }
    setOnEndSelect(callback) {
        this.onEndSelect = callback;
    }
    onMoveCenter(offset) {
        const rect = this.rect.clone();
        rect.left += offset.x;
        rect.top += offset.y;
        rect.right += offset.x;
        rect.bottom += offset.y;
        this.rect = rect;
        this.setRect(this.rect);
    }
    onMoveTopLeft(offset) {
        const rect = this.rect.clone();
        rect.left += offset.x;
        rect.top += offset.y;
        if (rect.left >= rect.right - minSize) {
            rect.left = rect.right - minSize;
        }
        if (rect.top >= rect.bottom - minSize) {
            rect.top = rect.bottom - minSize;
        }
        if (this.config?.outWidth && this.config?.outHeight) {
            const scale = this.config?.outWidth > this.config?.outHeight ? rect.width / this.config?.outWidth : rect.height / this.config?.outHeight;
            const width = this.config?.outWidth * scale;
            const height = this.config?.outHeight * scale;
            rect.left += rect.width - width;
            rect.top += rect.height - height;
        }
        this.rect = rect;
        this.setRect(this.rect);
    }
    onMoveTopCenter(offset) {
        const rect = this.rect.clone();
        rect.top += offset.y;
        if (rect.top >= rect.bottom - minSize) {
            rect.top = rect.bottom - minSize;
        }
        if (this.config?.outWidth && this.config?.outHeight) {
            const scale = rect.height / this.config?.outHeight;
            const width = this.config?.outWidth * scale;
            rect.left += (rect.width - width) / 2;
            rect.right = rect.left + width;
            rect.bottom = rect.top + this.config?.outHeight * scale;
        }
        this.rect = rect;
        this.setRect(this.rect);
    }
    onMoveTopRight(offset) {
        const rect = this.rect.clone();
        rect.right += offset.x;
        rect.top += offset.y;
        if (rect.right <= rect.left + minSize) {
            rect.right = rect.left + minSize;
        }
        if (rect.top >= rect.bottom - minSize) {
            rect.top = rect.bottom - minSize;
        }
        if (this.config?.outWidth && this.config?.outHeight) {
            const scale = this.config?.outWidth > this.config?.outHeight ? rect.width / this.config?.outWidth : rect.height / this.config?.outHeight;
            rect.right = rect.left + this.config?.outWidth * scale;
            rect.top += rect.height - this.config?.outHeight * scale;
        }
        this.rect = rect;
        this.setRect(this.rect);
    }
    onMoveCenterLeft(offset) {
        const rect = this.rect.clone();
        rect.left += offset.x;
        if (rect.left >= rect.right - minSize) {
            rect.left = rect.right - minSize;
        }
        if (this.config?.outWidth && this.config?.outHeight) {
            const scale = rect.width / this.config?.outWidth;
            const height = this.config?.outHeight * scale;
            rect.top += (rect.height - height) / 2;
            rect.bottom = rect.top + height;
            rect.right = rect.left + this.config?.outWidth * scale;
        }
        this.rect = rect;
        this.setRect(this.rect);
    }
    onMoveCenterRight(offset) {
        const rect = this.rect.clone();
        rect.right += offset.x;
        if (rect.right <= rect.left + minSize) {
            rect.right = rect.left + minSize;
        }
        if (this.config?.outWidth && this.config?.outHeight) {
            const scale = rect.width / this.config?.outWidth;
            const height = this.config?.outHeight * scale;
            rect.top += (rect.height - height) / 2;
            rect.bottom = rect.top + height;
            rect.right = rect.left + this.config?.outWidth * scale;
        }
        this.rect = rect;
        this.setRect(this.rect);
    }
    onMoveBottomLeft(offset) {
        const rect = this.rect.clone();
        rect.left += offset.x;
        rect.bottom += offset.y;
        if (rect.left >= rect.right - minSize) {
            rect.left = rect.right - minSize;
        }
        if (rect.bottom <= rect.top + minSize) {
            rect.bottom = rect.top + minSize;
        }
        if (this.config?.outWidth && this.config?.outHeight) {
            const scale = this.config?.outWidth > this.config?.outHeight ? rect.width / this.config?.outWidth : rect.height / this.config?.outHeight;
            rect.left += (rect.width - this.config?.outWidth * scale);
            rect.bottom = rect.top + this.config?.outHeight * scale;
        }
        this.rect = rect;
        this.setRect(this.rect);
    }
    onMoveBottomCenter(offset) {
        const rect = this.rect.clone();
        rect.bottom += offset.y;
        if (rect.bottom <= rect.top + minSize) {
            rect.bottom = rect.top + minSize;
        }
        if (this.config?.outWidth && this.config?.outHeight) {
            const scale = rect.height / this.config?.outHeight;
            const width = this.config?.outWidth * scale;
            rect.left += (rect.width - width) / 2;
            rect.right = rect.left + width;
            rect.bottom = rect.top + this.config?.outHeight * scale;
        }
        this.rect = rect;
        this.setRect(this.rect);
    }
    onMoveBottomRight(offset) {
        const rect = this.rect.clone();
        rect.right += offset.x;
        rect.bottom += offset.y;
        if (rect.right <= rect.left + minSize) {
            rect.right = rect.left + minSize;
        }
        if (rect.bottom <= rect.top + minSize) {
            rect.bottom = rect.top + minSize;
        }
        if (this.config?.outWidth && this.config?.outHeight) {
            const scale = this.config?.outWidth > this.config?.outHeight ? rect.width / this.config?.outWidth : rect.height / this.config?.outHeight;
            rect.right = rect.left + this.config?.outWidth * scale;
            rect.bottom = rect.top + this.config?.outHeight * scale;
        }
        this.rect = rect;
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
            this.onEndMoveLayout?.call(this, new Point(point.x - this.mousePoint.x, point.y - this.mousePoint.y));
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
        const diameter = this.config.pointRadius * 2;
        this.center.setRect(Rect.fromSize(left + width / 2, top + height / 2, diameter, diameter));
        this.topLeft.setRect(Rect.fromSize(left, top, diameter, diameter));
        this.topCenter.setRect(Rect.fromSize(left + width / 2, top, diameter, diameter));
        this.topRight.setRect(Rect.fromSize(right, top, diameter, diameter));
        this.centerLeft.setRect(Rect.fromSize(left, top + height / 2, diameter, diameter));
        this.centerRight.setRect(Rect.fromSize(right, top + height / 2, diameter, diameter));
        this.bottomLeft.setRect(Rect.fromSize(left, bottom, diameter, diameter));
        this.bottomCenter.setRect(Rect.fromSize(left + width / 2, bottom, diameter, diameter));
        this.bottomRight.setRect(Rect.fromSize(right, bottom, diameter, diameter));
    }
    drawEllipse(ctx, x, y, w, h) {
        const kappa = 0.5522848;
        const ox = (w / 2) * kappa;
        const oy = (h / 2) * kappa;
        const xe = x + w;
        const ye = y + h;
        const xm = x + w / 2;
        const ym = y + h / 2;
        ctx.moveTo(x, ym);
        ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
        ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
        ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
        ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
    }
    drawMask(ctx) {
        if (this.config.circle) {
            this.drawEllipse(ctx, this.rect.left, this.rect.top, this.rect.width, this.rect.height);
        }
        else {
            ctx.roundRect(this.rect.left, this.rect.top, this.rect.width, this.rect.height, this.config.circleRadius ?? 0);
        }
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
        if (this.config.circle) {
            this.drawEllipse(ctx, left, top, width, height);
        }
        else {
            ctx.roundRect(left, top, width, height, this.config.circleRadius ?? 0);
        }
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
    endSelect() {
        if (this.rect.width < minSize || this.rect.height < minSize) {
            const size = minSize / 2;
            const center = this.rect.center;
            const to = new Rect(center.x - size, center.y - size, center.x + size, center.y + size);
            new LinearAnimation(this.rect, to, 200, () => {
                this.onEndLayout();
            }).run();
            const { left, top, right, bottom } = to;
            const width = right - left;
            const height = bottom - top;
            const diameter = this.config.pointRadius * 2;
            this.center.endSelect(Rect.fromSize(left + width / 2, top + height / 2, diameter, diameter));
            this.topLeft.endSelect(Rect.fromSize(left, top, diameter, diameter));
            this.topCenter.endSelect(Rect.fromSize(left + width / 2, top, diameter, diameter));
            this.topRight.endSelect(Rect.fromSize(right, top, diameter, diameter));
            this.centerLeft.endSelect(Rect.fromSize(left, top + height / 2, diameter, diameter));
            this.centerRight.endSelect(Rect.fromSize(right, top + height / 2, diameter, diameter));
            this.bottomLeft.endSelect(Rect.fromSize(left, bottom, diameter, diameter));
            this.bottomCenter.endSelect(Rect.fromSize(left + width / 2, bottom, diameter, diameter));
            this.bottomRight.endSelect(Rect.fromSize(right, bottom, diameter, diameter));
        }
    }
}
export class PointLayout extends Layout {
    constructor(parent, icon, angle, cursor, config) {
        super(parent, cursor, config);
        this.isChecked = false;
        this.mousePoint = new Point(0, 0);
        this.onMoveLayout = null;
        this.onEndLayout = null;
        this.icon = icon.clone();
        this.icon.setAngle(angle);
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
        ctx.save();
        ctx.translate(this.rect.left, this.rect.top);
        this.icon.draw(ctx, this.rect.width, this.rect.height, this.config.borderColor1, this.config.borderColor2, this.config.borderWidth);
        ctx.restore();
    }
    endSelect(rect) {
        const to = new Rect(rect.left - this.config.pointRadius, rect.top - this.config.pointRadius, rect.right - this.config.pointRadius, rect.bottom - this.config.pointRadius);
        new LinearAnimation(this.rect, to, 200).run();
    }
}
export class CenterLayout extends PointLayout {
    draw(ctx) {
        ctx.save();
        ctx.translate(this.rect.left, this.rect.top);
        this.icon.draw(ctx, this.rect.width, this.rect.height, this.config.borderColor2, this.config.borderColor1, this.config.borderWidth);
        ctx.restore();
    }
}
export class MaskLayout extends Layout {
    constructor(parent, cursor, config) {
        super(parent, cursor, config);
        this.maskColor = '#88888888';
        this.isSelect = true;
        this.isChecked = false;
        this.mousePoint = new Point(0, 0);
        this.onRotateLayout = null;
        this.onEndRotateLayout = null;
        this.handle = new HandleLayout(this, moveIcon, config);
        this.layoutList.push(this.handle);
    }
    setOnRotateLayout(callback) {
        this.onRotateLayout = callback;
    }
    setOnEndRotateLayout(callback) {
        this.onEndRotateLayout = callback;
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
        const rect = this.handle.getRect();
        const center = new Point(rect.left + rect.width / 2, rect.top + rect.height / 2);
        let dx1 = point.x - center.x;
        let dy1 = point.y - center.y;
        let dx2 = 0 - center.x;
        let dy2 = 0 - center.y;
        let angle = (Math.atan2(dy1, dx1) - Math.atan2(dy2, dx2)) * (180 / Math.PI);
        this.cursor?.setAngle(-100 + angle);
        if (this.isChecked) {
            dx1 = point.x - center.x;
            dy1 = point.y - center.y;
            dx2 = this.mousePoint.x - center.x;
            dy2 = this.mousePoint.y - center.y;
            angle = (Math.atan2(dy2, dx2) - Math.atan2(dy1, dx1)) * (180 / Math.PI);
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
        this.onEndRotateLayout?.call(this);
        super.end(point);
        return true;
    }
    setHandleRect(rect) {
        if (rect.left > rect.right) {
            const temp = rect.left;
            rect.left = rect.right;
            rect.right = temp;
        }
        if (rect.top > rect.bottom) {
            const temp = rect.top;
            rect.top = rect.bottom;
            rect.bottom = temp;
        }
        this.handle.setRect(rect);
    }
    endSelect(rect) {
        if (rect.left > rect.right) {
            const temp = rect.left;
            rect.left = rect.right;
            rect.right = temp;
        }
        if (rect.top > rect.bottom) {
            const temp = rect.top;
            rect.top = rect.bottom;
            rect.bottom = temp;
        }
        this.handle.setRect(rect);
        this.isSelect = false;
        this.handle.endSelect();
    }
    setOnMoveLayout(callback) {
        this.handle.setOnMoveLayout(callback);
    }
    setOnEndMoveLayout(callback) {
        this.handle.setOnEndMoveLayout(callback);
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
    getClipRect() {
        return this.handle.getRect();
    }
}
export class ImageCropper extends Layout {
    constructor(canvas, config) {
        super(null, null, config);
        this.overLayout = null;
        this.layoutList = [];
        this.mouseOver = false;
        this.dirty = true;
        this.time = 0;
        this.background = new BackgroundLayout(this, config);
        const { width, height } = canvas.getBoundingClientRect();
        canvas.style.cursor = "none";
        canvas.width = width;
        canvas.height = height;
        this.canvas = canvas;
        this.canvas2D = canvas.getContext('2d');
        this.setRect(new Rect(0, 0, this.canvas.width, this.canvas.height));
        this.initBackground();
        this.initClipRect(config?.defaultClipRect);
        canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
        canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
        canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
        canvas.addEventListener('wheel', this.onMouseWheel.bind(this));
        canvas.addEventListener('mouseover', this.onMouseOver.bind(this));
        canvas.addEventListener('mouseout', this.onMouseOut.bind(this));
        canvas.addEventListener('touchstart', this.onTouchStart.bind(this));
        canvas.addEventListener('touchmove', this.onTouchMove.bind(this));
        canvas.addEventListener('touchend', this.onTouchEnd.bind(this));
        requestAnimationFrame(this.drawLoop.bind(this));
        this.markDirty();
    }
    setCursor(cursor) {
        this.drawCursor = cursor;
    }
    start(point) {
        super.start(this.mousePoint = point);
        this.markDirty();
        return true;
    }
    move(point) {
        this.checkOverOut(point);
        super.move(this.mousePoint = point);
        this.markDirty();
        return true;
    }
    end(point) {
        super.end(this.mousePoint = point);
        this.markDirty();
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
        this.start(this.mousePoint = new Point(event.offsetX, event.offsetY));
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
        this.move(new Point(event.offsetX, event.offsetY));
        this.mouseOver = true;
        this.markDirty();
    }
    onMouseOut(event) {
        this.mouseOver = false;
        this.markDirty();
    }
    onMouseWheel(event) {
        event.preventDefault();
        this.wheel(new Delta(event.deltaX, event.deltaY, event.deltaZ));
        this.markDirty();
    }
    setImage(image) {
        this.image = new ImageLayout(this, this.config);
        this.image.setRect(this.rect.clone());
        this.image.setImage(image);
        if (this.mask) {
            const rect = this.mask.getClipRect().clone();
            this.image?.setClipRect(rect);
            this.image.initScale(rect);
        }
        this.layoutList.splice(1, 0, this.image);
        this.markDirty();
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
            this.createMask(rect.clone());
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
        this.initClipRect(this.config?.defaultClipRect);
        this.image?.reset();
        this.markDirty();
    }
    initClipRect(padding) {
        if (padding) {
            const rect = new Rect(padding.left, padding.top, this.rect.right - padding.right, this.rect.bottom - padding.bottom);
            if (this.config?.outWidth && this.config?.outHeight) {
                const scale = Math.min(rect.width / this.config?.outWidth, rect.height / this.config?.outHeight);
                const width = this.config?.outWidth * scale;
                const height = this.config?.outHeight * scale;
                rect.left = (this.rect.width - width) / 2;
                rect.top = (this.rect.height - height) / 2;
                rect.right = rect.left + width;
                rect.bottom = rect.top + height;
            }
            else if (this.config?.outWidth) {
                const scale = rect.width / this.config?.outWidth;
                const width = this.config?.outWidth * scale;
                rect.left = (this.rect.width - width) / 2;
                rect.right = rect.left + width;
            }
            else if (this.config?.outHeight) {
                const scale = rect.height / this.config?.outHeight;
                const height = this.config?.outHeight * scale;
                rect.top = (this.rect.height - height) / 2;
                rect.bottom = rect.top + height;
            }
            this.image?.setClipRect(rect.clone());
            this.createMask(rect);
            this.mask?.endSelect(rect);
        }
    }
    createMask(rect) {
        this.mask = new MaskLayout(this, rotateIcon, this.config);
        this.mask.setOnMoveLayout((offset) => {
            this.image?.moveImage(offset);
        });
        this.mask.setOnEndMoveLayout((offset) => {
            this.image?.moveImage(offset);
            this.image?.onEndSelect();
        });
        this.mask.setOnRotateLayout((angle) => {
            this.image?.setRotate(angle);
        });
        this.mask.setOnEndRotateLayout(() => {
            this.image?.onEndSelect();
        });
        this.mask.setOnEndSelect((rect) => {
            this.image?.setClipRect(rect.clone());
            this.image?.onEndSelect();
        });
        this.mask.setRect(this.rect);
        this.mask.setHandleRect(rect);
        this.layoutList.push(this.mask);
    }
    draw(ctx) {
        super.draw(ctx);
        if (this.mousePoint && this.drawCursor && this.mouseOver) {
            ctx.save();
            ctx.translate(this.mousePoint.x - this.config.cursorSize / 2, this.mousePoint.y - this.config.cursorSize / 2);
            this.drawCursor.draw(ctx, this.config.cursorSize, this.config.cursorSize, this.config.cursorStrokeColor, this.config.cursorColor, this.config.cursorStrokeLineWidth);
            ctx.restore();
        }
    }
    markDirty() {
        this.dirty = true;
    }
    drawLoop(time) {
        if (this.dirty) {
            this.draw(this.canvas2D);
            this.dirty = false;
        }
        this.dirty = AnimationManager.getInstance().update(time - this.time);
        this.time = time;
        requestAnimationFrame(this.drawLoop.bind(this));
    }
}
//动画管理器
export class AnimationManager {
    constructor() {
        this.animations = [];
    }
    static getInstance() {
        return AnimationManager.instance ?? (AnimationManager.instance = new AnimationManager());
    }
    add(animation) {
        this.animations.push(animation);
    }
    remove(animation) {
        const index = this.animations.indexOf(animation);
        if (index >= 0) {
            this.animations.splice(index, 1);
        }
    }
    update(time) {
        for (let i = 0; i < this.animations.length; i++) {
            const animation = this.animations[i];
            if (!animation.update(time)) {
                this.remove(animation);
            }
        }
        return this.animations.length > 0;
    }
}
AnimationManager.instance = null;
export class Animation {
    constructor(form, to, duration, onEnd = null) {
        this.target = {};
        this.form = {};
        this.to = {};
        this.onEnd = null;
        this.isFinished = false;
        for (const key in to) {
            this.form[key] = form[key];
        }
        this.target = form;
        this.to = to;
        this.duration = duration;
        this.elapsedTime = 0;
        this.onEnd = onEnd;
    }
    updateValue(progress) {
        if (this.isFinished) {
            this.onEnd?.call(this);
            return false;
        }
        for (const key in this.to) {
            const from = this.form[key];
            const to = this.to[key];
            if (from != undefined && to != undefined) {
                this.target[key] = from + (to - from) * progress;
            }
        }
        if (progress >= 1) {
            this.isFinished = true;
        }
        return true;
    }
    cancel() {
        AnimationManager.getInstance().remove(this);
        this.onEnd?.call(this);
    }
    run() {
        AnimationManager.getInstance().add(this);
    }
}
export class LinearAnimation extends Animation {
    update(time) {
        this.elapsedTime += time;
        const progress = this.duration <= 0 ? 1 : this.elapsedTime / this.duration;
        return this.updateValue(progress);
    }
}
export default ImageCropper;
