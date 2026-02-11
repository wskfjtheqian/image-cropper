export declare enum OutType {
    SIZE = 0,
    RATIO = 1
}
export declare class Svg {
    protected width: number;
    protected height: number;
    protected angle: number;
    protected path: string[];
    protected viewBox: [number, number, number, number];
    constructor(width: number, height: number, viewBox: [number, number, number, number], path: string[]);
    clone(angle?: number): Svg;
    setAngle(angle: number): void;
    setViewBox(x: number, y: number, width: number, height: number): void;
    draw(ctx: CanvasRenderingContext2D, drawWidth: number, drawHeight: number, strokeStyle?: string, fillStyle?: string, strokeWidth?: number): void;
}
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
    backgroundBoxSize?: number;
    backgroundBoxColor0?: string;
    backgroundBoxColor1?: string;
    defaultClipRect?: Rect;
    outType?: OutType;
    outWidth?: number | null;
    outHeight?: number | null;
    circle?: boolean;
    circleRadius?: number;
}
export declare class Point {
    x: number;
    y: number;
    constructor(x: number, y: number);
}
export declare class Delta {
    x: number;
    y: number;
    z: number;
    constructor(x: number, y: number, z: number);
}
export declare class Rect {
    left: number;
    top: number;
    right: number;
    bottom: number;
    constructor(left: number, top: number, right: number, bottom: number);
    static fromSize(left: number, top: number, width: number, height: number): Rect;
    static fromCenter(center: Point, width: number, height: number): Rect;
    get width(): number;
    get height(): number;
    get center(): Point;
    clone(): Rect;
    toString(): string;
}
export interface Transform {
    scaleX: number;
    scaleY: number;
    rotation: number;
    translateX: number;
    translateY: number;
}
export declare function inverseTransform(clipRect: Rect, transform: Transform, targetCenter: Point): Point[];
interface Root {
    setCursor(cursor?: Svg | null): void;
    setOverLayout(layout: Layout, point: Point): void;
}
export declare class Layout {
    protected layoutList: Layout[];
    protected rect: Rect;
    protected parent: Layout | null;
    protected cursor?: Svg | null;
    protected config: ImageCropperOption;
    constructor(parent: Layout | null, cursor?: Svg | null, config?: ImageCropperOption);
    setRect(rect: Rect): void;
    getRect(): Rect;
    protected getRoot(): Root | null;
    protected checkPointInRect(point: Point): boolean;
    start(point: Point): boolean;
    move(point: Point): boolean;
    end(point: Point): boolean;
    wheel(delta: Delta): boolean;
    over(): void;
    out(): void;
    checkOverOut(point: Point): boolean;
    draw(ctx: CanvasRenderingContext2D): void;
    remove(): void;
}
export declare class BackgroundLayout extends Layout {
    protected mousePoint: Point;
    protected selectRect: Rect;
    protected onStartSelect: ((rect: Rect) => void) | null;
    protected onMoveSelect: ((rect: Rect) => void) | null;
    protected onEndSelect: ((rect: Rect) => void) | null;
    constructor(parent: Layout | null, config?: ImageCropperOption);
    setOnStartSelect(callback: (rect: Rect) => void): void;
    setOnMoveSelect(callback: (rect: Rect) => void): void;
    setOnEndSelect(callback: (rect: Rect) => void): void;
    start(point: Point): boolean;
    move(point: Point): boolean;
    end(): boolean;
    draw(ctx: CanvasRenderingContext2D): void;
}
export declare class ImageLayout extends Layout {
    protected image?: HTMLImageElement;
    protected scale: number;
    protected angle: number;
    protected clipRect: Rect;
    protected offset: Point;
    constructor(parent: Layout | null, config?: ImageCropperOption);
    initScale(rect: Rect): void;
    reset(): void;
    setRect(rect: Rect): void;
    setClipRect(rect: Rect): void;
    checkOverOut(point: Point): boolean;
    setImage(image: HTMLImageElement): void;
    setRotate(angle: number): void;
    start(): boolean;
    move(): boolean;
    end(): boolean;
    wheel(delta: Delta): boolean;
    moveImage(offset: Point): void;
    draw(ctx: CanvasRenderingContext2D): void;
    protected getClipCanvas(): HTMLCanvasElement;
    toBlob(type?: string, quality?: any): Promise<Blob | null>;
    toDataUrl(type?: string, quality?: any): Promise<string>;
    onEndSelect(): void;
}
export declare class HandleLayout extends Layout {
    protected center: PointLayout;
    protected topLeft: PointLayout;
    protected topCenter: PointLayout;
    protected topRight: PointLayout;
    protected centerLeft: PointLayout;
    protected centerRight: PointLayout;
    protected bottomLeft: PointLayout;
    protected bottomCenter: PointLayout;
    protected bottomRight: PointLayout;
    protected layoutList: Layout[];
    protected isChecked: boolean;
    protected mousePoint: Point;
    protected onMoveLayout: ((offset: Point) => void) | null;
    protected onEndMoveLayout: ((offset: Point) => void) | null;
    protected onEndSelect: ((rect: Rect) => void) | null;
    constructor(parent: Layout, cursor?: Svg | null, config?: ImageCropperOption);
    onEndLayout(): void;
    setOnMoveLayout(callback: (offset: Point) => void): void;
    setOnEndMoveLayout(callback: (offset: Point) => void): void;
    setOnEndSelect(callback: (rect: Rect) => void): void;
    protected onMoveCenter(offset: Point): void;
    protected onMoveTopLeft(offset: Point): void;
    protected onMoveTopCenter(offset: Point): void;
    protected onMoveTopRight(offset: Point): void;
    protected onMoveCenterLeft(offset: Point): void;
    protected onMoveCenterRight(offset: Point): void;
    protected onMoveBottomLeft(offset: Point): void;
    protected onMoveBottomCenter(offset: Point): void;
    protected onMoveBottomRight(offset: Point): void;
    start(point: Point): boolean;
    move(point: Point): boolean;
    end(point: Point): boolean;
    setRect(rect: Rect): void;
    protected drawEllipse(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number): void;
    drawMask(ctx: CanvasRenderingContext2D): void;
    private drawLine;
    draw(ctx: CanvasRenderingContext2D): void;
    endSelect(): void;
}
export declare class PointLayout extends Layout {
    protected isChecked: boolean;
    protected mousePoint: Point;
    protected onMoveLayout: ((offset: Point) => void) | null;
    protected onEndLayout: ((offset: Point) => void) | null;
    protected icon: Svg;
    constructor(parent: Layout, icon: Svg, angle: number, cursor?: Svg | null, config?: ImageCropperOption);
    setOnMoveLayout(callback: (offset: Point) => void): void;
    setOnEndLayout(callback: (offset: Point) => void): void;
    setRect(rect: Rect): void;
    start(point: Point): boolean;
    move(point: Point): boolean;
    end(point: Point): boolean;
    draw(ctx: CanvasRenderingContext2D): void;
    endSelect(rect: Rect): void;
}
export declare class CenterLayout extends PointLayout {
    draw(ctx: CanvasRenderingContext2D): void;
}
export declare class MaskLayout extends Layout {
    protected maskColor: string;
    protected isSelect: boolean;
    protected handle: HandleLayout;
    protected isChecked: boolean;
    protected mousePoint: Point;
    protected onRotateLayout: ((angle: number) => void) | null;
    protected onEndRotateLayout: (() => void) | null;
    constructor(parent: Layout, cursor?: Svg | null, config?: ImageCropperOption);
    setOnRotateLayout(callback: (angle: number) => void): void;
    setOnEndRotateLayout(callback: () => void): void;
    setOnEndSelect(callback: (rect: Rect) => void): void;
    start(point: Point): boolean;
    move(point: Point): boolean;
    end(point: Point): boolean;
    setHandleRect(rect: Rect): void;
    endSelect(rect: Rect): void;
    setOnMoveLayout(callback: (offset: Point) => void): void;
    setOnEndMoveLayout(callback: (offset: Point) => void): void;
    draw(ctx: CanvasRenderingContext2D): void;
    getClipRect(): Rect;
}
export declare class ImageCropper extends Layout implements Root {
    protected canvas: HTMLCanvasElement;
    protected canvas2D: CanvasRenderingContext2D;
    protected background: BackgroundLayout;
    protected mask?: MaskLayout;
    protected image?: ImageLayout;
    protected overLayout: Layout | null;
    protected layoutList: Layout[];
    protected mousePoint?: Point;
    protected drawCursor?: Svg | null;
    protected mouseOver: boolean;
    private dirty;
    private time;
    constructor(canvas: HTMLCanvasElement, config?: ImageCropperOption);
    setCursor(cursor?: Svg | null): void;
    start(point: Point): boolean;
    move(point: Point): boolean;
    end(point: Point): boolean;
    protected onTouchStart(event: TouchEvent): void;
    protected onTouchMove(event: TouchEvent): void;
    protected onTouchEnd(event: TouchEvent): void;
    protected onMouseDown(event: MouseEvent): void;
    protected onMouseMove(event: MouseEvent): void;
    protected onMouseUp(event: MouseEvent): void;
    onMouseOver(event: MouseEvent): void;
    onMouseOut(event: MouseEvent): void;
    protected onMouseWheel(event: WheelEvent): void;
    setImage(image: HTMLImageElement): void;
    setOverLayout(layout: Layout): void;
    toDataUrl(type?: string, quality?: any): Promise<string>;
    toBlob(type?: string, quality?: any): Promise<Blob | null>;
    protected initBackground(): void;
    reset(): void;
    protected initClipRect(padding?: Rect | null): void;
    protected createMask(rect: Rect): void;
    draw(ctx: CanvasRenderingContext2D): void;
    protected markDirty(): void;
    protected drawLoop(time: DOMHighResTimeStamp): void;
}
export declare class AnimationManager {
    private animations;
    private static instance;
    static getInstance(): AnimationManager;
    add(animation: Animation): void;
    remove(animation: Animation): void;
    update(time: number): boolean;
}
export declare abstract class Animation {
    protected duration: number;
    protected target: Record<string, number>;
    protected form: Record<string, number>;
    protected to: Record<string, number>;
    protected elapsedTime: number;
    protected onEnd: (() => void) | null;
    protected isFinished: boolean;
    constructor(form: Record<string, any>, to: Record<string, number>, duration: number, onEnd?: (() => void) | null);
    abstract update(time: number): boolean;
    protected updateValue(progress: number): boolean;
    cancel(): void;
    run(): void;
}
export declare class LinearAnimation extends Animation {
    update(time: number): boolean;
}
export default ImageCropper;
