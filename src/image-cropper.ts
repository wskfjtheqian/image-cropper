

const minSize: number = 20

export enum OutType {
    SIZE,
    RATIO,
}

export class Svg {
    protected width: number;
    protected height: number;
    protected angle: number = 0;
    protected path: string[];
    protected viewBox: [number, number, number, number]; // [x, y, width, height]

    constructor(width: number, height: number, viewBox: [number, number, number, number], path: string[]) {
        this.width = width;
        this.height = height;
        this.path = path;
        this.viewBox = viewBox;
    }

    public clone(angle?: number): Svg {
        const svg = new Svg(this.width, this.height, this.viewBox, this.path);
        svg.setAngle(angle ?? this.angle);
        return svg;
    }

    public setAngle(angle: number): void {
        this.angle = angle;
    }

    public setViewBox(x: number, y: number, width: number, height: number) {
        this.viewBox = [x, y, width, height];
    }

    public draw(
        ctx: CanvasRenderingContext2D,
        drawWidth: number,
        drawHeight: number,
        strokeStyle: string = "#000",
        fillStyle?: string,
        strokeWidth: number = 1
    ): void {
        if (!this.path || this.path.length === 0) return;

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

const centerIcon: Svg = new Svg(24, 24, [0, 0, 24, 24],
    ["M13.6,12c0,0.9-0.7,1.6-1.6,1.6s-1.6-0.7-1.6-1.6s0.7-1.6,1.6-1.6S13.6,11.1,13.6,12z M21,10.4v3.3h-2.1" +
    "c-0.6,2.6-2.7,4.7-5.3,5.3V21h-3.3v-2.1c-2.6-0.6-4.7-2.7-5.3-5.3H3v-3.3h2.1c0.6-2.6,2.7-4.7,5.3-5.3V3h3.3v2.1" +
    "c2.6,0.6,4.7,2.7,5.3,5.3H21z M16.7,12c0-2.6-2.1-4.7-4.7-4.7S7.3,9.4,7.3,12s2.1,4.7,4.7,4.7S16.7,14.6,16.7,12z"]
)

const edgeIcon: Svg = new Svg(24, 24, [0, 0, 24, 24],
    ["M0,4.96h24V11H0V4.96z"] // 一个简单矩形
)

const cornerIcon: Svg = new Svg(24, 24, [0, 0, 24, 24],
    ["M12.91,4.96 L0,4.96 L0,11 L12.91,11 L12.91,24 L18.95,24 L18.95,11 L18.95,4.96 Z"]
)
const resizeIcon: Svg = new Svg(24, 24, [0, 0, 24, 24],
    ["M13.7,12L13.7,12l0-7.3H17L12,0.1L6.9,4.7h3.3v14.5H6.8l5.1,4.7l5.1-4.7h-3.3V12z"]
)

const rotateIcon: Svg = new Svg(24, 24, [0, 0, 24, 24],
    ["M20.8,18.3L20.8,18.3l-0.3,0c0,0,0,0,0,0c0-8.2-6.6-14.8-14.8-14.8c0,0-0.1,0-0.1,0V0.2L0.1,5.7l5.5,5.5V7.6c0,0,0.1,0,0.1,0c5.9,0," +
    "10.7,4.8,10.7,10.7c0,0,0,0,0,0h-0.3l-0.1,0h-3.1l5.5,5.5l5.5-5.5H20.8z"],
)

const moveIcon: Svg = new Svg(24, 24, [0, 0, 24, 24],
    ["M19.3,17.1v-3.3h-5.5v5.5h3.3l-5.2,4.7l-5.1-4.7h3.3v-5.5H4.6v3.3L-0.1,12l4.7-5.2v3.4h5.5V4.7H6.8L12-0.1l5.1,4.7h-3.3v5.5h5.5V6.8L24,12L19.3,17.1z"],
)

const clipIcon: Svg = new Svg(24, 24, [0, 0, 24, 24],
    ["M24,13.9H13.9V24h-4V13.9H-0.1v-4H10v-10h4v10H24V13.9z"],
)

const handIcon: Svg = new Svg(24, 24, [0, 0, 24, 24],
    ["M18.8,5.4c-0.4,0-0.7,0.1-1,0.4c-0.3,0.3-0.4,0.6-0.4,1v5.6c0,0.3-0.2,0.4-0.4,0.4c-0.1,0-0.2,0-0.3-0.1" +
    "c-0.1-0.1-0.1-0.2-0.1-0.3V3.1c0-0.4-0.1-0.7-0.4-1c-0.3-0.3-0.6-0.4-1-0.4c-0.4,0-0.7,0.1-1,0.4c-0.3,0.3-0.4,0.6-0.4,1v8" +
    "c0,0.1,0,0.2-0.1,0.3c-0.1,0.1-0.2,0.1-0.3,0.1s-0.2,0-0.3-0.1c-0.1-0.1-0.1-0.2-0.1-0.3V1.9c0-0.4-0.1-0.7-0.4-1" +
    "c-0.3-0.3-0.6-0.4-1-0.4c-0.4,0-0.7,0.1-1,0.4c-0.3,0.3-0.4,0.6-0.4,1v9.3c0,0.3-0.2,0.4-0.4,0.4c-0.1,0-0.2,0-0.3-0.1" +
    "c-0.1-0.1-0.1-0.2-0.1-0.3v-8c0-0.4-0.1-0.7-0.4-1s-0.6-0.4-1-0.4s-0.7,0.1-1,0.4c-0.3,0.3-0.4,0.6-0.4,1v9.7c0,0.4-0.1,0.7-0.2,0.9" +
    "c-0.1,0.2-0.2,0.3-0.4,0.4c-0.2,0-0.4,0-0.5-0.1c-0.2-0.1-0.4-0.4-0.6-0.7l-2-3.4C2.7,9.5,2.4,9.3,2.1,9.2c-0.3-0.1-0.7,0-1,0.1" +
    "c-0.3,0.2-0.5,0.5-0.6,0.9c-0.1,0.4-0.1,0.8,0.1,1.1s0.2,0.3,0.2,0.3l0.5,1.1L3.8,18c0.6,1.2,1.2,2.2,1.8,3c0.5,0.6,1,1.1,1.5,1.5" +
    "c0.3,0.3,0.7,0.4,1,0.6c0.2,0.1,0.3,0.1,0.4,0.1h6.1c0.9,0,1.8-0.3,2.5-1c0.6-0.5,1.1-1.2,1.5-2.1c1-2.1,1.6-4.8,1.6-8.2V6.8" +
    "c0-0.4-0.1-0.7-0.4-1C19.6,5.6,19.2,5.4,18.8,5.4L18.8,5.4z"]
)

export interface ImageCropperOption {
    cursorStrokeLineWidth?: number;
    cursorStrokeColor?: string;
    cursorColor?: string;
    cursorSize?: number;
    pointRadius?: number;
    borderWidth?: number;
    borderColor1?: string;
    borderColor2?: string;
    guidelineWidth?: number;
    guidelineColor1?: string;
    guidelineColor2?: string;
    guidelineDsah?: number;
    maskHandleRadius?: number;
    maskColor?: string;
    backgroundBoxSize?: number
    backgroundBoxColor0?: string
    backgroundBoxColor1?: string
    defaultClipRect?: Rect
    outType?: OutType
    outWidth?: number | null
    outHeight?: number | null
    circle?: boolean
    circleRadius?: number
}

export class Point {
    x: number
    y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }
}

export class Delta {
    x: number
    y: number
    z: number

    constructor(x: number, y: number, z: number) {
        this.x = x
        this.y = y
        this.z = z
    }
}

export class Rect {
    left: number
    top: number
    right: number
    bottom: number

    constructor(left: number, top: number, right: number, bottom: number) {
        this.left = left
        this.top = top
        this.right = right
        this.bottom = bottom
    }

    public static fromSize(left: number, top: number, width: number, height: number): Rect {
        return new Rect(left, top, left + width, top + height)
    }

    public static fromCenter(center: Point, width: number, height: number): Rect {
        return new Rect(center.x - width / 2, center.y - height / 2, center.x + width / 2, center.y + height / 2)
    }

    get width() {
        return this.right - this.left
    }

    get height() {
        return this.bottom - this.top
    }

    get center(): Point {
        return new Point(this.left + (this.right - this.left) / 2, this.top + (this.bottom - this.top) / 2)
    }

    public clone(): Rect {
        return new Rect(this.left, this.top, this.right, this.bottom)
    }

    public toString(): string {
        return `rect[${this.left.toFixed(2)}, ${this.top.toFixed(2)}, ${this.right.toFixed(2)}, ${this.bottom.toFixed(2)}],size[${this.width.toFixed(2)}, ${this.height.toFixed(2)}],center[${this.center.x.toFixed(2)}, ${this.center.y.toFixed(2)}]`
    }
}

export interface Transform {
    scaleX: number;
    scaleY: number;
    rotation: number;
    translateX: number;
    translateY: number;
}

export function inverseTransform(
    clipRect: Rect,
    transform: Transform,
    targetCenter: Point
): Point[] {
    const {scaleX, scaleY, rotation, translateX, translateY} = transform;
    const cosTheta = Math.cos(rotation);
    const sinTheta = Math.sin(rotation);

    const center = clipRect.center;
    const points: Point[] = [
        {x: clipRect.left, y: clipRect.top},
        {x: clipRect.right, y: clipRect.top},
        {x: clipRect.left, y: clipRect.bottom},
        {x: clipRect.right, y: clipRect.bottom},
    ]

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
    })
}

interface Root {
    setCursor(cursor?: Svg | null): void

    setOverLayout(layout: Layout, point: Point): void
}

export class Layout {
    protected layoutList: Layout[] = []
    protected rect: Rect = new Rect(0, 0, 0, 0)
    protected parent: Layout | null = null
    protected cursor?: Svg | null;
    protected config: ImageCropperOption = {
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

    constructor(parent: Layout | null, cursor?: Svg | null, config?: ImageCropperOption) {
        this.parent = parent
        this.cursor = cursor
        Object.assign(this.config, config)
    }

    public setRect(rect: Rect): void {
        this.rect = rect
    }

    public getRect(): Rect {
        return this.rect
    }

    protected getRoot(): Root | null {
        let parent: Layout | null = this.parent
        while (parent?.parent) {
            parent = parent.parent
        }
        return parent as Root | null
    }

    protected checkPointInRect(point: Point): boolean {
        return point.x >= this.rect.left && point.x <= this.rect.right && point.y >= this.rect.top && point.y <= this.rect.bottom
    }

    public start(point: Point): boolean {
        for (let i = this.layoutList.length - 1; i >= 0; i--) {
            if (this.layoutList[i]!.start(point)) {
                return true
            }
        }
        return false
    }

    public move(point: Point): boolean {
        for (let i = this.layoutList.length - 1; i >= 0; i--) {
            if (this.layoutList[i]!.move(point)) {
                return true
            }
        }
        return false
    }

    public end(point: Point): boolean {
        for (let i = this.layoutList.length - 1; i >= 0; i--) {
            if (this.layoutList[i]!.end(point)) {
                return true
            }
        }
        return false
    }

    public wheel(delta: Delta): boolean {
        for (let i = this.layoutList.length - 1; i >= 0; i--) {
            if (this.layoutList[i]!.wheel(delta)) {
                return true
            }
        }
        return false
    }

    public over(): void {
        this.getRoot()?.setCursor(this.cursor)
    }

    public out(): void {
    }

    public checkOverOut(point: Point): boolean {
        for (let i = this.layoutList.length - 1; i >= 0; i--) {
            if (this.layoutList[i]!.checkOverOut(point)) {
                return true
            }
        }
        if (this.checkPointInRect(point)) {
            this.getRoot()?.setOverLayout(this, point)
            return true
        }
        return false
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        for (const layout of this.layoutList) {
            ctx.save()
            layout.draw(ctx)
            ctx.restore()
        }
    }

    public remove(): void {
        if (this.parent) {
            this.parent!.layoutList.splice(this.parent!.layoutList.indexOf(this), 1)
        }
    }
}

export class BackgroundLayout extends Layout {
    protected mousePoint: Point = new Point(0, 0);
    protected selectRect: Rect = new Rect(0, 0, 0, 0)
    protected onStartSelect: ((rect: Rect) => void) | null = null
    protected onMoveSelect: ((rect: Rect) => void) | null = null
    protected onEndSelect: ((rect: Rect) => void) | null = null

    constructor(parent: Layout | null, config?: ImageCropperOption) {
        super(parent, clipIcon.clone(), config);
    }

    public setOnStartSelect(callback: (rect: Rect) => void) {
        this.onStartSelect = callback
    }

    public setOnMoveSelect(callback: (rect: Rect) => void) {
        this.onMoveSelect = callback
    }

    public setOnEndSelect(callback: (rect: Rect) => void) {
        this.onEndSelect = callback
    }

    public start(point: Point): boolean {
        this.mousePoint = point

        this.selectRect = new Rect(point.x, point.y, point.x, point.y)
        this.onStartSelect?.call(this, this.selectRect)
        return true
    }

    public move(point: Point): boolean {
        const rect = this.selectRect.clone()
        rect.right += point.x - this.mousePoint.x
        rect.bottom += point.y - this.mousePoint.y
        if (this.config?.outWidth && this.config?.outHeight) {
            const scale = Math.min(rect.width / this.config?.outWidth, rect.height / this.config?.outHeight)
            rect.right = rect.left + this.config?.outWidth * scale
            rect.bottom = rect.top + this.config?.outHeight * scale
        }

        this.selectRect = rect
        this.mousePoint = point
        this.onMoveSelect?.call(this, this.selectRect)
        return true
    }

    public end(): boolean {
        this.onEndSelect?.call(this, this.selectRect)
        return true
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        const {left, top, right, bottom} = this.rect
        const width = right - left
        const height = bottom - top

        for (let y = 0; y < height; y += this.config.backgroundBoxSize!) {
            let color = (Math.floor(y / this.config.backgroundBoxSize!) % 2) ? this.config.backgroundBoxColor0! : this.config.backgroundBoxColor1!
            for (let x = 0; x < width; x += this.config.backgroundBoxSize!) {
                ctx.fillStyle = color = color === this.config.backgroundBoxColor1 ? this.config.backgroundBoxColor0! : this.config.backgroundBoxColor1!
                ctx.fillRect(x, y, this.config.backgroundBoxSize!, this.config.backgroundBoxSize!)
            }
        }
    }
}

export class ImageLayout extends Layout {
    protected image?: HTMLImageElement
    protected scale: number = 1;
    protected angle: number = 0;
    protected clipRect: Rect = new Rect(0, 0, 0, 0)
    protected offset: Point = new Point(0, 0);

    constructor(parent: Layout | null, config?: ImageCropperOption) {
        super(parent, null, config);
    }

    public initScale(rect: Rect): void {
        if (this.image) {
            this.scale = Math.max(rect.width / this.image!.width, rect.height / this.image!.height)
        }
    }

    public reset(): void {
        this.angle = 0;
        this.offset = new Point(0, 0);
        if (this.config.defaultClipRect) {
            this.scale = Math.max(this.clipRect.width / this.image!.width, this.clipRect.height / this.image!.height)
        } else {
            this.clipRect = new Rect(this.rect.left, this.rect.top, this.rect.right, this.rect.bottom)
            this.scale = Math.min(this.rect.width / this.image!.width, this.rect.height / this.image!.height)
        }
    }

    public setRect(rect: Rect): void {
        super.setRect(rect);
        this.clipRect = new Rect(rect.left, rect.top, rect.right, rect.bottom)
    }

    public setClipRect(rect: Rect): void {
        const offset = new Point(
            (this.clipRect.left + this.clipRect.width / 2) - (rect.left + rect.width / 2),
            (this.clipRect.top + this.clipRect.height / 2) - (rect.top + rect.height / 2),
        )
        this.moveImage(offset)
        this.clipRect = rect
    }

    checkOverOut(point: Point): boolean {
        return false
    }

    public setImage(image: HTMLImageElement): void {
        this.image = image
        const scaleX = this.rect.width / image.width;
        const scaleY = this.rect.height / image.height;
        // this.scale = Math.min(scaleX, scaleY)
    }

    public setRotate(angle: number): void {
        this.angle -= angle
    }

    public start(): boolean {
        return false
    }

    public move(): boolean {
        return false
    }

    public end(): boolean {
        return false
    }

    public wheel(delta: Delta): boolean {
        const zoomSpeed = 0.1;
        if (delta.y < 0) {
            this.scale *= (1 + zoomSpeed);
        } else {
            this.scale *= (1 - zoomSpeed);
        }
        this.scale = Math.max(0.1, Math.min(5, this.scale));
        return true
    }

    public moveImage(offset: Point): void {
        const cos = Math.cos(-this.angle * Math.PI / 180);
        const sin = Math.sin(-this.angle * Math.PI / 180);
        const deltaX = offset.x * cos - offset.y * sin;
        const deltaY = offset.x * sin + offset.y * cos;

        this.offset.x += deltaX / this.scale;
        this.offset.y += deltaY / this.scale;
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        if (!this.image) {
            return
        }

        const center = new Point(this.clipRect.left + this.clipRect.width / 2, this.clipRect.top + this.clipRect.height / 2)
        ctx.translate(center.x, center.y)
        ctx.scale(this.scale, this.scale)
        ctx.rotate(this.angle * Math.PI / 180)
        ctx.translate(this.offset.x, this.offset.y)
        ctx.drawImage(this.image, -this.image.width / 2, -this.image.height / 2)
    }

    protected getClipCanvas(): HTMLCanvasElement {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
            throw new Error('no canvas context');
        }

        let scale: number = 1
        if (this.config.outType == OutType.SIZE) {
            if (this.config?.outWidth && this.config?.outHeight) {
                scale = Math.min(this.config?.outWidth / this.clipRect.width, this.config?.outHeight / this.clipRect.height)
            } else if (this.config?.outWidth) {
                scale = this.config?.outWidth / this.clipRect.width
            } else if (this.config?.outHeight) {
                scale = this.config?.outHeight / this.clipRect.height
            }
        }
        canvas.width = this.clipRect.width * scale;
        canvas.height = this.clipRect.height * scale;

        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.scale(this.scale * scale, this.scale * scale);
        ctx.rotate(this.angle * Math.PI / 180);
        ctx.translate(this.offset.x, this.offset.y);
        ctx.drawImage(
            this.image!,
            -this.image!.width / 2,
            -this.image!.height / 2,
            this.image!.width,
            this.image!.height
        );
        return canvas
    }

    public toBlob(type?: string, quality?: any): Promise<Blob | null> {
        if (!this.image) {
            return Promise.reject(new Error('image not loaded'))
        }
        return new Promise((resolve, reject) => {
            try {
                this.getClipCanvas().toBlob((blob: Blob | null): void => {
                    resolve(blob);
                }, type ?? "image/png", quality)
            } catch (error) {
                reject(error);
            }
        })

    }

    public toDataUrl(type?: string, quality?: any): Promise<string> {
        if (!this.image) {
            return Promise.reject(new Error('image not loaded'));
        }
        return new Promise((resolve, reject) => {
            try {
                resolve(this.getClipCanvas().toDataURL(type ?? "image/png", quality));
            } catch (error) {
                reject(error);
            }
        });
    }

    public onEndSelect(): void {
        const imageRect = Rect.fromCenter(this.rect.center, this.image!.width, this.image!.height)
        //console.log("Clip 的位置", this.clipRect.toString())
        //console.log("Image 的位置", imageRect.toString())
        const center = imageRect.center

        const offset = new Point(this.offset.x + center.x, this.offset.y + center.y)
        //console.log("Offset 的相对位置", this.offset)
        //console.log("Offset 的位置", offset)
        const points = inverseTransform(
            this.clipRect,
            {
                rotation: -this.angle * Math.PI / 180,
                scaleX: this.scale,
                scaleY: this.scale,
                translateX: 0,
                translateY: 0,
            },
            imageRect.center
        )
        //console.log(points)

        let isInside = true
        points.forEach(point => {
            if (!isPointInsideAxisAlignedRect(point, this.image!.width, this.image!.height)) {    // 超出范围
                isInside = false
            }
        })

        //console.log(isInside)

    }
}


/**
 * 检查点是否在轴对齐矩形内部
 */
function isPointInsideAxisAlignedRect(
    point: Point,
    rectWidth: number,
    rectHeight: number,
    rectCenter: Point = {x: 0, y: 0},
    epsilon: number = 1e-10
): boolean {
    const halfWidth = rectWidth / 2;
    const halfHeight = rectHeight / 2;

    // 相对于矩形中心的坐标
    const xRelative = point.x - rectCenter.x;
    const yRelative = point.y - rectCenter.y;

    return (
        xRelative >= -halfWidth - epsilon &&
        xRelative <= halfWidth + epsilon &&
        yRelative >= -halfHeight - epsilon &&
        yRelative <= halfHeight + epsilon
    );
}

export class HandleLayout extends Layout {
    protected center: PointLayout
    protected topLeft: PointLayout
    protected topCenter: PointLayout
    protected topRight: PointLayout
    protected centerLeft: PointLayout
    protected centerRight: PointLayout
    protected bottomLeft: PointLayout
    protected bottomCenter: PointLayout
    protected bottomRight: PointLayout
    protected layoutList: Layout[] = []
    protected isChecked: boolean = false;
    protected mousePoint: Point = new Point(0, 0);
    protected onMoveLayout: ((offset: Point) => void) | null = null
    protected onEndMoveLayout: ((offset: Point) => void) | null = null
    protected onEndSelect: ((rect: Rect) => void) | null = null

    constructor(parent: Layout, cursor?: Svg | null, config?: ImageCropperOption) {
        super(parent, cursor, config)

        this.center = new CenterLayout(this, centerIcon, 0, handIcon.clone(), config)
        this.topLeft = new PointLayout(this, cornerIcon, -90, resizeIcon.clone(-45), config)
        this.topCenter = new PointLayout(this, edgeIcon, 0, resizeIcon.clone(), config)
        this.topRight = new PointLayout(this, cornerIcon, 0, resizeIcon.clone(45), config)
        this.centerLeft = new PointLayout(this, edgeIcon, -90, resizeIcon.clone(90), config)
        this.centerRight = new PointLayout(this, edgeIcon, 90, resizeIcon.clone(90), config)
        this.bottomLeft = new PointLayout(this, cornerIcon, 180, resizeIcon.clone(45), config)
        this.bottomCenter = new PointLayout(this, edgeIcon, 180, resizeIcon.clone(), config)
        this.bottomRight = new PointLayout(this, cornerIcon, 90, resizeIcon.clone(-45), config)

        this.center.setOnMoveLayout(this.onMoveCenter.bind(this))
        this.topLeft.setOnMoveLayout(this.onMoveTopLeft.bind(this))
        this.topCenter.setOnMoveLayout(this.onMoveTopCenter.bind(this))
        this.topRight.setOnMoveLayout(this.onMoveTopRight.bind(this))
        this.centerLeft.setOnMoveLayout(this.onMoveCenterLeft.bind(this))
        this.centerRight.setOnMoveLayout(this.onMoveCenterRight.bind(this))
        this.bottomLeft.setOnMoveLayout(this.onMoveBottomLeft.bind(this))
        this.bottomCenter.setOnMoveLayout(this.onMoveBottomCenter.bind(this))
        this.bottomRight.setOnMoveLayout(this.onMoveBottomRight.bind(this))

        this.center.setOnEndLayout(this.onEndLayout.bind(this))
        this.topLeft.setOnEndLayout(this.onEndLayout.bind(this))
        this.topCenter.setOnEndLayout(this.onEndLayout.bind(this))
        this.topRight.setOnEndLayout(this.onEndLayout.bind(this))
        this.centerLeft.setOnEndLayout(this.onEndLayout.bind(this))
        this.centerRight.setOnEndLayout(this.onEndLayout.bind(this))
        this.bottomLeft.setOnEndLayout(this.onEndLayout.bind(this))
        this.bottomCenter.setOnEndLayout(this.onEndLayout.bind(this))
        this.bottomRight.setOnEndLayout(this.onEndLayout.bind(this))

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
        ]
    }

    public onEndLayout(): void {
        this.onEndSelect?.call(this, this.rect)
    }

    public setOnMoveLayout(callback: (offset: Point) => void) {
        this.onMoveLayout = callback
    }

    public setOnEndMoveLayout(callback: (offset: Point) => void) {
        this.onEndMoveLayout = callback
    }

    public setOnEndSelect(callback: (rect: Rect) => void) {
        this.onEndSelect = callback
    }

    protected onMoveCenter(offset: Point): void {
        const rect = this.rect.clone()
        rect.left += offset.x
        rect.top += offset.y
        rect.right += offset.x
        rect.bottom += offset.y
        this.rect = rect
        this.setRect(this.rect)
    }

    protected onMoveTopLeft(offset: Point): void {
        const rect = this.rect.clone()
        rect.left += offset.x
        rect.top += offset.y
        if (rect.left >= rect.right - minSize) {
            rect.left = rect.right - minSize
        }
        if (rect.top >= rect.bottom - minSize) {
            rect.top = rect.bottom - minSize
        }

        if (this.config?.outWidth && this.config?.outHeight) {
            const scale = this.config?.outWidth > this.config?.outHeight ? rect.width / this.config?.outWidth : rect.height / this.config?.outHeight
            const width = this.config?.outWidth * scale
            const height = this.config?.outHeight * scale
            rect.left += rect.width - width
            rect.top += rect.height - height
        }
        this.rect = rect
        this.setRect(this.rect)
    }

    protected onMoveTopCenter(offset: Point): void {
        const rect = this.rect.clone()
        rect.top += offset.y
        if (rect.top >= rect.bottom - minSize) {
            rect.top = rect.bottom - minSize
        }
        if (this.config?.outWidth && this.config?.outHeight) {
            const scale = rect.height / this.config?.outHeight
            const width = this.config?.outWidth * scale
            rect.left += (rect.width - width) / 2
            rect.right = rect.left + width
            rect.bottom = rect.top + this.config?.outHeight * scale
        }
        this.rect = rect
        this.setRect(this.rect)
    }

    protected onMoveTopRight(offset: Point): void {
        const rect = this.rect.clone()
        rect.right += offset.x
        rect.top += offset.y
        if (rect.right <= rect.left + minSize) {
            rect.right = rect.left + minSize
        }
        if (rect.top >= rect.bottom - minSize) {
            rect.top = rect.bottom - minSize
        }
        if (this.config?.outWidth && this.config?.outHeight) {
            const scale = this.config?.outWidth > this.config?.outHeight ? rect.width / this.config?.outWidth : rect.height / this.config?.outHeight
            rect.right = rect.left + this.config?.outWidth * scale
            rect.top += rect.height - this.config?.outHeight * scale
        }
        this.rect = rect
        this.setRect(this.rect)
    }

    protected onMoveCenterLeft(offset: Point): void {
        const rect = this.rect.clone()
        rect.left += offset.x
        if (rect.left >= rect.right - minSize) {
            rect.left = rect.right - minSize
        }
        if (this.config?.outWidth && this.config?.outHeight) {
            const scale = rect.width / this.config?.outWidth
            const height = this.config?.outHeight * scale
            rect.top += (rect.height - height) / 2
            rect.bottom = rect.top + height
            rect.right = rect.left + this.config?.outWidth * scale
        }
        this.rect = rect
        this.setRect(this.rect)
    }

    protected onMoveCenterRight(offset: Point): void {
        const rect = this.rect.clone()
        rect.right += offset.x
        if (rect.right <= rect.left + minSize) {
            rect.right = rect.left + minSize
        }
        if (this.config?.outWidth && this.config?.outHeight) {
            const scale = rect.width / this.config?.outWidth
            const height = this.config?.outHeight * scale
            rect.top += (rect.height - height) / 2
            rect.bottom = rect.top + height
            rect.right = rect.left + this.config?.outWidth * scale
        }
        this.rect = rect
        this.setRect(this.rect)
    }

    protected onMoveBottomLeft(offset: Point): void {
        const rect = this.rect.clone()
        rect.left += offset.x
        rect.bottom += offset.y
        if (rect.left >= rect.right - minSize) {
            rect.left = rect.right - minSize
        }
        if (rect.bottom <= rect.top + minSize) {
            rect.bottom = rect.top + minSize
        }
        if (this.config?.outWidth && this.config?.outHeight) {
            const scale = this.config?.outWidth > this.config?.outHeight ? rect.width / this.config?.outWidth : rect.height / this.config?.outHeight
            rect.left += (rect.width - this.config?.outWidth * scale)
            rect.bottom = rect.top + this.config?.outHeight * scale
        }
        this.rect = rect
        this.setRect(this.rect)
    }

    protected onMoveBottomCenter(offset: Point): void {
        const rect = this.rect.clone()
        rect.bottom += offset.y
        if (rect.bottom <= rect.top + minSize) {
            rect.bottom = rect.top + minSize
        }
        if (this.config?.outWidth && this.config?.outHeight) {
            const scale = rect.height / this.config?.outHeight
            const width = this.config?.outWidth * scale
            rect.left += (rect.width - width) / 2
            rect.right = rect.left + width
            rect.bottom = rect.top + this.config?.outHeight * scale
        }
        this.rect = rect
        this.setRect(this.rect)
    }

    protected onMoveBottomRight(offset: Point): void {
        const rect = this.rect.clone()
        rect.right += offset.x
        rect.bottom += offset.y
        if (rect.right <= rect.left + minSize) {
            rect.right = rect.left + minSize
        }
        if (rect.bottom <= rect.top + minSize) {
            rect.bottom = rect.top + minSize
        }
        if (this.config?.outWidth && this.config?.outHeight) {
            const scale = this.config?.outWidth > this.config?.outHeight ? rect.width / this.config?.outWidth : rect.height / this.config?.outHeight
            rect.right = rect.left + this.config?.outWidth * scale
            rect.bottom = rect.top + this.config?.outHeight * scale
        }
        this.rect = rect
        this.setRect(this.rect)
    }

    public start(point: Point): boolean {
        if (super.start(point)) {
            return true
        }
        if (this.checkPointInRect(point)) {
            this.isChecked = true
            this.mousePoint = point
            return true
        }
        return false
    }

    public move(point: Point): boolean {
        if (this.isChecked) {
            this.onMoveLayout?.call(this, new Point(point.x - this.mousePoint.x, point.y - this.mousePoint.y))
            this.mousePoint = point
        }
        return super.move(point)
    }

    public end(point: Point): boolean {
        if (this.isChecked) {
            this.onEndMoveLayout?.call(this, new Point(point.x - this.mousePoint.x, point.y - this.mousePoint.y))
            this.mousePoint = point
            this.isChecked = false
        }
        return super.end(point)
    }

    public setRect(rect: Rect): void {
        super.setRect(rect)
        const {left, top, right, bottom} = rect
        const width = right - left
        const height = bottom - top
        const diameter = this.config.pointRadius! * 2

        this.center.setRect(Rect.fromSize(left + width / 2, top + height / 2, diameter, diameter))
        this.topLeft.setRect(Rect.fromSize(left, top, diameter, diameter))
        this.topCenter.setRect(Rect.fromSize(left + width / 2, top, diameter, diameter))
        this.topRight.setRect(Rect.fromSize(right, top, diameter, diameter))
        this.centerLeft.setRect(Rect.fromSize(left, top + height / 2, diameter, diameter))
        this.centerRight.setRect(Rect.fromSize(right, top + height / 2, diameter, diameter))
        this.bottomLeft.setRect(Rect.fromSize(left, bottom, diameter, diameter))
        this.bottomCenter.setRect(Rect.fromSize(left + width / 2, bottom, diameter, diameter))
        this.bottomRight.setRect(Rect.fromSize(right, bottom, diameter, diameter))
    }

    protected drawEllipse(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
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

    public drawMask(ctx: CanvasRenderingContext2D): void {
        if (this.config.circle) {
            this.drawEllipse(ctx, this.rect.left, this.rect.top, this.rect.width, this.rect.height)
        } else {
            ctx.roundRect(this.rect.left, this.rect.top, this.rect.width, this.rect.height, this.config.circleRadius ?? 0)
        }

    }

    private drawLine(ctx: CanvasRenderingContext2D, start: Point, end: Point): void {
        ctx.save()
        ctx.beginPath()
        ctx.moveTo(start.x, start.y)
        ctx.lineTo(end.x, end.y)
        ctx.closePath()

        ctx.setLineDash([this.config.guidelineDsah!, this.config.guidelineDsah!]);
        ctx.lineWidth = this.config.guidelineWidth!;

        ctx.strokeStyle = this.config.guidelineColor1!;
        ctx.lineDashOffset = 0;
        ctx.stroke();

        ctx.strokeStyle = this.config.guidelineColor2!;
        ctx.lineDashOffset = this.config.guidelineDsah!;
        ctx.stroke();
        ctx.restore()
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        const {left, top, right, bottom} = this.rect
        let width = right - left
        let height = (bottom - top)

        ctx.lineWidth = this.config.borderWidth!;

        ctx.beginPath()
        ctx.rect(left - 1, top - 1, width + 2, height + 2)
        ctx.closePath()
        ctx.strokeStyle = this.config.borderColor2!;
        ctx.stroke()

        ctx.beginPath()
        if (this.config.circle) {
            this.drawEllipse(ctx, left, top, width, height)
        } else {
            ctx.roundRect(left, top, width, height, this.config.circleRadius ?? 0)
        }
        ctx.closePath()
        ctx.strokeStyle = this.config.borderColor1!;
        ctx.stroke()

        width = width / 3
        height = height / 3

        this.drawLine(ctx, new Point(left, top + height), new Point(right, top + height))
        this.drawLine(ctx, new Point(left, top + height * 2), new Point(right, top + height * 2))

        this.drawLine(ctx, new Point(left + width, top), new Point(left + width, bottom))
        this.drawLine(ctx, new Point(left + width * 2, top), new Point(left + width * 2, bottom))

        super.draw(ctx)
    }

    public endSelect() {
        if (this.rect.width < minSize || this.rect.height < minSize) {
            const size = minSize / 2
            const center = this.rect.center
            const to = new Rect(center.x - size, center.y - size, center.x + size, center.y + size)
            new LinearAnimation(this.rect, to as Record<string, any>, 200, () => {
                this.onEndLayout()
            }).run()

            const {left, top, right, bottom} = to
            const width = right - left
            const height = bottom - top
            const diameter = this.config.pointRadius! * 2

            this.center.endSelect(Rect.fromSize(left + width / 2, top + height / 2, diameter, diameter))
            this.topLeft.endSelect(Rect.fromSize(left, top, diameter, diameter))
            this.topCenter.endSelect(Rect.fromSize(left + width / 2, top, diameter, diameter))
            this.topRight.endSelect(Rect.fromSize(right, top, diameter, diameter))
            this.centerLeft.endSelect(Rect.fromSize(left, top + height / 2, diameter, diameter))
            this.centerRight.endSelect(Rect.fromSize(right, top + height / 2, diameter, diameter))
            this.bottomLeft.endSelect(Rect.fromSize(left, bottom, diameter, diameter))
            this.bottomCenter.endSelect(Rect.fromSize(left + width / 2, bottom, diameter, diameter))
            this.bottomRight.endSelect(Rect.fromSize(right, bottom, diameter, diameter))
        }
    }
}

export class PointLayout extends Layout {
    protected isChecked: boolean = false;
    protected mousePoint: Point = new Point(0, 0);
    protected onMoveLayout: ((offset: Point) => void) | null = null
    protected onEndLayout: ((offset: Point) => void) | null = null
    protected icon: Svg

    constructor(parent: Layout, icon: Svg, angle: number, cursor?: Svg | null, config?: ImageCropperOption) {
        super(parent, cursor, config)
        this.icon = icon.clone()
        this.icon.setAngle(angle)
    }

    public setOnMoveLayout(callback: (offset: Point) => void) {
        this.onMoveLayout = callback
    }

    public setOnEndLayout(callback: (offset: Point) => void) {
        this.onEndLayout = callback
    }

    public setRect(rect: Rect): void {
        super.setRect(new Rect(
            rect.left - this.config.pointRadius!,
            rect.top - this.config.pointRadius!,
            rect.right - this.config.pointRadius!,
            rect.bottom - this.config.pointRadius!,
        ))
    }

    public start(point: Point): boolean {
        if (this.checkPointInRect(point)) {
            this.isChecked = true
            this.mousePoint = point
            return true
        }
        return false
    }

    public move(point: Point): boolean {
        if (this.isChecked) {
            this.onMoveLayout?.call(this, new Point(point.x - this.mousePoint.x, point.y - this.mousePoint.y))
            this.mousePoint = point
        }
        return false
    }

    public end(point: Point): boolean {
        if (this.isChecked) {
            this.onEndLayout?.call(this, new Point(point.x - this.mousePoint.x, point.y - this.mousePoint.y))
            this.mousePoint = point
            this.isChecked = false
        }
        return false
    }


    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.save()
        ctx.translate(this.rect.left, this.rect.top)
        this.icon.draw(
            ctx, this.rect.width, this.rect.height,
            this.config.borderColor1!,
            this.config.borderColor2!,
            this.config.borderWidth!
        )
        ctx.restore()
    }

    endSelect(rect: Rect) {
        const to = new Rect(
            rect.left - this.config.pointRadius!,
            rect.top - this.config.pointRadius!,
            rect.right - this.config.pointRadius!,
            rect.bottom - this.config.pointRadius!,
        )
        new LinearAnimation(this.rect, to as Record<string, any>, 200).run()
    }
}

export class CenterLayout extends PointLayout {

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.save()
        ctx.translate(this.rect.left, this.rect.top)
        this.icon.draw(
            ctx, this.rect.width, this.rect.height,
            this.config.borderColor2!,
            this.config.borderColor1!,
            this.config.borderWidth!
        )
        ctx.restore()
    }
}

export class MaskLayout extends Layout {
    protected maskColor: string = '#88888888';
    protected isSelect: boolean = true
    protected handle: HandleLayout
    protected isChecked: boolean = false;
    protected mousePoint: Point = new Point(0, 0);
    protected onRotateLayout: ((angle: number) => void) | null = null
    protected onEndRotateLayout: (() => void) | null = null

    constructor(parent: Layout, cursor?: Svg | null, config?: ImageCropperOption) {
        super(parent, cursor, config)
        this.handle = new HandleLayout(this, moveIcon, config)
        this.layoutList.push(this.handle)
    }

    public setOnRotateLayout(callback: (angle: number) => void) {
        this.onRotateLayout = callback
    }

    public setOnEndRotateLayout(callback: () => void) {
        this.onEndRotateLayout = callback
    }

    public setOnEndSelect(callback: (rect: Rect) => void) {
        this.handle.setOnEndSelect(callback)
    }

    public start(point: Point): boolean {
        if (this.isSelect) {
            return false
        }
        if (super.start(point)) {
            return true
        }
        if (this.checkPointInRect(point)) {
            this.isChecked = true
            this.mousePoint = point
            return true
        }
        return true
    }

    public move(point: Point): boolean {
        if (this.isSelect) {
            return false
        }
        const rect = this.handle.getRect()
        const center = new Point(rect.left + rect.width / 2, rect.top + rect.height / 2)

        let dx1 = point.x - center.x;
        let dy1 = point.y - center.y;
        let dx2 = 0 - center.x;
        let dy2 = 0 - center.y;
        let angle = (Math.atan2(dy1, dx1) - Math.atan2(dy2, dx2)) * (180 / Math.PI);
        this.cursor?.setAngle(-100 + angle)

        if (this.isChecked) {
            dx1 = point.x - center.x;
            dy1 = point.y - center.y;
            dx2 = this.mousePoint.x - center.x;
            dy2 = this.mousePoint.y - center.y;
            angle = (Math.atan2(dy2, dx2) - Math.atan2(dy1, dx1)) * (180 / Math.PI);

            this.onRotateLayout?.call(this, angle)
            this.mousePoint = point
            return true
        }
        super.move(point)
        return true

    }

    public end(point: Point): boolean {
        if (this.isSelect) {
            return false
        }
        this.isChecked = false
        this.onEndRotateLayout?.call(this)
        super.end(point)
        return true
    }

    public setHandleRect(rect: Rect): void {
        if (rect.left > rect.right) {
            const temp = rect.left
            rect.left = rect.right
            rect.right = temp
        }
        if (rect.top > rect.bottom) {
            const temp = rect.top
            rect.top = rect.bottom
            rect.bottom = temp
        }
        this.handle.setRect(rect)
    }

    public endSelect(rect: Rect): void {
        if (rect.left > rect.right) {
            const temp = rect.left
            rect.left = rect.right
            rect.right = temp
        }
        if (rect.top > rect.bottom) {
            const temp = rect.top
            rect.top = rect.bottom
            rect.bottom = temp
        }
        this.handle.setRect(rect)
        this.isSelect = false
        this.handle.endSelect()
    }

    public setOnMoveLayout(callback: (offset: Point) => void) {
        this.handle.setOnMoveLayout(callback)
    }

    public setOnEndMoveLayout(callback: (offset: Point) => void) {
        this.handle.setOnEndMoveLayout(callback)
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        const {left, top, right, bottom} = this.rect
        const width = right - left
        const height = bottom - top

        ctx.save()
        ctx.beginPath()
        ctx.rect(left, top, width, height)
        this.handle.drawMask(ctx)
        ctx.closePath()

        ctx.fillStyle = this.maskColor
        ctx.fill('evenodd')
        ctx.restore()

        super.draw(ctx)
    }

    public getClipRect(): Rect {
        return this.handle.getRect()
    }
}

export class ImageCropper extends Layout implements Root {
    protected canvas: HTMLCanvasElement;
    protected canvas2D: CanvasRenderingContext2D
    protected background: BackgroundLayout
    protected mask?: MaskLayout
    protected image?: ImageLayout
    protected overLayout: Layout | null = null;
    protected layoutList: Layout[] = []
    protected mousePoint?: Point;
    protected drawCursor?: Svg | null;
    protected mouseOver: boolean = false;
    private dirty = true;
    private time: DOMHighResTimeStamp = 0;

    constructor(canvas: HTMLCanvasElement, config?: ImageCropperOption) {
        super(null, null, config)
        this.background = new BackgroundLayout(this, config)
        const {width, height} = canvas.getBoundingClientRect();
        canvas.style.cursor = "none"
        canvas.width = width;
        canvas.height = height;

        this.canvas = canvas
        this.canvas2D = canvas.getContext('2d')!
        this.setRect(new Rect(0, 0, this.canvas.width, this.canvas.height))
        this.initBackground()
        this.initClipRect(config?.defaultClipRect)
        canvas.addEventListener('mousedown', this.onMouseDown.bind(this))
        canvas.addEventListener('mousemove', this.onMouseMove.bind(this))
        canvas.addEventListener('mouseup', this.onMouseUp.bind(this))
        canvas.addEventListener('wheel', this.onMouseWheel.bind(this))
        canvas.addEventListener('mouseover', this.onMouseOver.bind(this))
        canvas.addEventListener('mouseout', this.onMouseOut.bind(this))


        canvas.addEventListener('touchstart', this.onTouchStart.bind(this))
        canvas.addEventListener('touchmove', this.onTouchMove.bind(this))
        canvas.addEventListener('touchend', this.onTouchEnd.bind(this))

        requestAnimationFrame(this.drawLoop.bind(this))
        this.markDirty()
    }

    public setCursor(cursor?: Svg | null): void {
        this.drawCursor = cursor
    }

    public start(point: Point): boolean {
        super.start(this.mousePoint = point)
        this.markDirty()
        return true
    }

    public move(point: Point): boolean {
        this.checkOverOut(point)
        super.move(this.mousePoint = point)
        this.markDirty()
        return true
    }

    public end(point: Point): boolean {
        super.end(this.mousePoint = point)
        this.markDirty()
        return true
    }

    protected onTouchStart(event: TouchEvent): void {
        event.preventDefault()
        if (event.touches.length === 0) {
            return
        }
        this.start(new Point(event.touches[0]!.clientX, event.touches[0]!.clientY))
    }

    protected onTouchMove(event: TouchEvent): void {
        event.preventDefault()

        if (event.touches.length === 0) {
            return
        }
        this.move(new Point(event.touches[0]!.clientX, event.touches[0]!.clientY))
    }

    protected onTouchEnd(event: TouchEvent): void {
        event.preventDefault()
        this.end(new Point(event.changedTouches[0]!.clientX, event.changedTouches[0]!.clientY))
    }

    protected onMouseDown(event: MouseEvent): void {
        event.preventDefault()
        this.start(this.mousePoint = new Point(event.offsetX, event.offsetY))
    }

    protected onMouseMove(event: MouseEvent): void {
        event.preventDefault()
        this.move(new Point(event.offsetX, event.offsetY))
    }

    protected onMouseUp(event: MouseEvent): void {
        event.preventDefault()
        this.end(new Point(event.offsetX, event.offsetY))
    }

    public onMouseOver(event: MouseEvent): void {
        this.move(new Point(event.offsetX, event.offsetY))
        this.mouseOver = true
        this.markDirty()
    }

    public onMouseOut(event: MouseEvent): void {
        this.mouseOver = false
        this.markDirty()
    }

    protected onMouseWheel(event: WheelEvent): void {
        event.preventDefault()
        this.wheel(new Delta(event.deltaX, event.deltaY, event.deltaZ))
        this.markDirty()
    }

    public setImage(image: HTMLImageElement): void {
        this.image = new ImageLayout(this, this.config)
        this.image.setRect(this.rect.clone())
        this.image.setImage(image)
        if (this.mask) {
            const rect = this.mask.getClipRect().clone()
            this.image?.setClipRect(rect)
            this.image.initScale(rect)
        }
        this.layoutList.splice(1, 0, this.image)

        this.markDirty()
    }

    public setOverLayout(layout: Layout): void {
        if (this.overLayout != layout) {
            this.overLayout?.out()
            this.overLayout = layout
            this.overLayout.over()
        }
    }

    public toDataUrl(type?: string, quality?: any): Promise<string> {
        if (!this.image) {
            return Promise.reject('No image')
        }
        if (!this.mask) {
            return Promise.reject('No mask')
        }
        return this.image.toDataUrl(type, quality)
    }

    public toBlob(type?: string, quality?: any): Promise<Blob | null> {
        if (!this.image) {
            return Promise.reject('No image')
        }
        if (!this.mask) {
            return Promise.reject('No mask')
        }
        return this.image.toBlob(type, quality)
    }

    protected initBackground() {
        this.background.setRect(this.rect)
        this.layoutList.push(this.background)
        this.background.setOnStartSelect((rect: Rect) => {
            if (this.mask) {
                return
            }
            this.createMask(rect.clone())
        })
        this.background.setOnMoveSelect((rect: Rect) => {
            this.mask?.setHandleRect(rect.clone())
        })
        this.background.setOnEndSelect((rect: Rect) => {
            this.mask?.endSelect(rect.clone())
            this.image?.setClipRect(rect.clone())
        })
    }

    public reset(): void {
        this.mask?.remove()
        this.mask = undefined
        this.initClipRect(this.config?.defaultClipRect)
        this.image?.reset()
        this.markDirty()
    }

    protected initClipRect(padding?: Rect | null): void {
        if (padding) {
            const rect = new Rect(
                padding.left,
                padding.top,
                this.rect.right - padding.right,
                this.rect.bottom - padding.bottom,
            )
            if (this.config?.outWidth && this.config?.outHeight) {
                const scale = Math.min(rect.width / this.config?.outWidth, rect.height / this.config?.outHeight)
                const width = this.config?.outWidth * scale
                const height = this.config?.outHeight * scale
                rect.left = (this.rect.width - width) / 2
                rect.top = (this.rect.height - height) / 2
                rect.right = rect.left + width
                rect.bottom = rect.top + height
            } else if (this.config?.outWidth) {
                const scale = rect.width / this.config?.outWidth
                const width = this.config?.outWidth * scale
                rect.left = (this.rect.width - width) / 2
                rect.right = rect.left + width
            } else if (this.config?.outHeight) {
                const scale = rect.height / this.config?.outHeight
                const height = this.config?.outHeight * scale
                rect.top = (this.rect.height - height) / 2
                rect.bottom = rect.top + height
            }
            this.image?.setClipRect(rect.clone())
            this.createMask(rect)
            this.mask?.endSelect(rect)
        }
    }

    protected createMask(rect: Rect) {
        this.mask = new MaskLayout(this, rotateIcon, this.config)
        this.mask.setOnMoveLayout((offset: Point) => {
            this.image?.moveImage(offset)
        })
        this.mask.setOnEndMoveLayout((offset: Point) => {
            this.image?.moveImage(offset)
            this.image?.onEndSelect()
        })

        this.mask.setOnRotateLayout((angle: number) => {
            this.image?.setRotate(angle)
        })
        this.mask.setOnEndRotateLayout(() => {
            this.image?.onEndSelect()
        })

        this.mask.setOnEndSelect((rect: Rect) => {
            this.image?.setClipRect(rect.clone())
            this.image?.onEndSelect()
        })
        this.mask.setRect(this.rect)
        this.mask.setHandleRect(rect)
        this.layoutList.push(this.mask)
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        super.draw(ctx)
        if (this.mousePoint && this.drawCursor && this.mouseOver) {
            ctx.save()
            ctx.translate(this.mousePoint.x - this.config.cursorSize! / 2, this.mousePoint.y - this.config.cursorSize! / 2)
            this.drawCursor.draw(ctx,
                this.config.cursorSize!,
                this.config.cursorSize!,
                this.config.cursorStrokeColor!,
                this.config.cursorColor!,
                this.config.cursorStrokeLineWidth!
            )
            ctx.restore()
        }
    }

    protected markDirty(): void {
        this.dirty = true;
    }

    protected drawLoop(time: DOMHighResTimeStamp) {
        if (this.dirty) {
            this.draw(this.canvas2D)
            this.dirty = false;
        }
        this.dirty = AnimationManager.getInstance().update(time - this.time)
        this.time = time
        requestAnimationFrame(this.drawLoop.bind(this))
    }

}

//动画管理器
export class AnimationManager {
    private animations: Animation[] = []

    private static instance: AnimationManager | null = null

    public static getInstance(): AnimationManager {
        return AnimationManager.instance ?? (AnimationManager.instance = new AnimationManager())
    }

    public add(animation: Animation): void {
        this.animations.push(animation)
    }

    public remove(animation: Animation): void {
        const index = this.animations.indexOf(animation)
        if (index >= 0) {
            this.animations.splice(index, 1)
        }
    }

    public update(time: number): boolean {
        for (let i = 0; i < this.animations.length; i++) {
            const animation = this.animations[i]
            if (!animation.update(time)) {
                this.remove(animation)
            }
        }
        return this.animations.length > 0
    }
}

export abstract class Animation {
    protected duration: number
    protected target: Record<string, number> = {}
    protected form: Record<string, number> = {}
    protected to: Record<string, number> = {}
    protected elapsedTime: number
    protected onEnd: (() => void) | null = null
    protected isFinished: boolean = false

    constructor(form: Record<string, any>, to: Record<string, number>, duration: number, onEnd: (() => void) | null = null) {
        for (const key in to) {
            this.form[key] = form[key]
        }
        this.target = form
        this.to = to
        this.duration = duration
        this.elapsedTime = 0
        this.onEnd = onEnd
    }

    abstract update(time: number): boolean;

    protected updateValue(progress: number): boolean {
        if (this.isFinished) {
            this.onEnd?.call(this)
            return false
        }
        for (const key in this.to) {
            const from = this.form[key]
            const to = this.to[key]
            if (from != undefined && to != undefined) {
                this.target[key] = from + (to - from) * progress
            }
        }

        if (progress >= 1) {
            this.isFinished = true
        }
        return true
    }

    public cancel(): void {
        AnimationManager.getInstance().remove(this)
        this.onEnd?.call(this)
    }

    public run() {
        AnimationManager.getInstance().add(this)
    }
}

export class LinearAnimation extends Animation {
    public update(time: number): boolean {
        this.elapsedTime += time
        const progress = this.duration <= 0 ? 1 : this.elapsedTime / this.duration
        return this.updateValue(progress)
    }
}


export default ImageCropper;
