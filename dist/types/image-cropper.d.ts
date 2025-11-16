interface ImageCropperOption {
    pointRadius?: number;
    borderWidth?: number;
    borderColor1?: string;
    borderColor2?: string;
    guidelineWidth?: number;
    guidelineColor1?: string;
    guidelineColor2?: string;
    guidelineDsah?: number;
    outputWidth?: number;
    outputHeight?: number;
    maskHandleRadius?: number;
    maskColor?: string;
    backgroundBoxSize?: number;
    backgroundBoxColor0?: string;
    backgroundBoxColor1?: string;
}
declare class Point {
    x: number;
    y: number;
    constructor(x: number, y: number);
}
declare class Delta {
    x: number;
    y: number;
    z: number;
    constructor(x: number, y: number, z: number);
}
declare class Rect {
    left: number;
    top: number;
    right: number;
    bottom: number;
    constructor(left: number, top: number, right: number, bottom: number);
    static fromSize(left: number, top: number, width: number, height: number): Rect;
    get width(): number;
    get height(): number;
    get center(): Point;
    clone(): Rect;
}
interface Root {
    setCursor(cursor: string): void;
    setOverLayout(layout: Layout, point: Point): void;
}
declare abstract class Layout {
    protected layoutList: Layout[];
    protected rect: Rect;
    protected parent: Layout | null;
    protected cursor: string;
    protected config: ImageCropperOption;
    constructor(parent: Layout | null, cursor: string, config?: ImageCropperOption);
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
declare class BackgroundLayout extends Layout {
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
declare class ImageLayout extends Layout {
    protected image?: HTMLImageElement;
    protected scale: number;
    protected angle: number;
    protected clipRect: Rect;
    protected offset: Point;
    constructor(parent: Layout | null, cursor?: string);
    reset(): void;
    setRect(rect: Rect): void;
    setClipRect(rect: Rect): void;
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
}
declare class HandleLayout extends Layout {
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
    protected onEndSelect: ((rect: Rect) => void) | null;
    constructor(parent: Layout, cursor?: string, config?: ImageCropperOption);
    onEndLayout(): void;
    setOnMoveLayout(callback: (offset: Point) => void): void;
    setOnEndSelect(callback: (rect: Rect) => void): void;
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
    drawMask(ctx: CanvasRenderingContext2D): void;
    private drawLine;
    draw(ctx: CanvasRenderingContext2D): void;
}
declare class PointLayout extends Layout {
    protected isChecked: boolean;
    protected mousePoint: Point;
    protected onMoveLayout: ((offset: Point) => void) | null;
    protected onEndLayout: ((offset: Point) => void) | null;
    setOnMoveLayout(callback: (offset: Point) => void): void;
    setOnEndLayout(callback: (offset: Point) => void): void;
    setRect(rect: Rect): void;
    start(point: Point): boolean;
    move(point: Point): boolean;
    end(point: Point): boolean;
    draw(ctx: CanvasRenderingContext2D): void;
}
declare class MaskLayout extends Layout {
    protected maskColor: string;
    protected isSelect: boolean;
    protected handle: HandleLayout;
    protected isChecked: boolean;
    protected mousePoint: Point;
    protected onRotateLayout: ((angle: number) => void) | null;
    constructor(parent: Layout, cursor?: string, config?: ImageCropperOption);
    setOnRotateLayout(callback: (angle: number) => void): void;
    setOnEndSelect(callback: (rect: Rect) => void): void;
    start(point: Point): boolean;
    move(point: Point): boolean;
    end(point: Point): boolean;
    setHandleRect(rect: Rect): void;
    endSelect(rect: Rect): void;
    setOnMoveLayout(callback: (offset: Point) => void): void;
    draw(ctx: CanvasRenderingContext2D): void;
}
declare class ImageCropper extends Layout implements Root {
    protected canvas: HTMLCanvasElement;
    protected canvas2D: CanvasRenderingContext2D;
    protected background: BackgroundLayout;
    protected mask?: MaskLayout;
    protected image?: ImageLayout;
    private overLayout;
    protected layoutList: Layout[];
    constructor(canvas: HTMLCanvasElement, config?: ImageCropperOption);
    setCursor(cursor: string): void;
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
    protected onMouseWheel(event: WheelEvent): void;
    setImage(image: HTMLImageElement): void;
    setOverLayout(layout: Layout): void;
    toDataUrl(type?: string, quality?: any): Promise<string>;
    toBlob(type?: string, quality?: any): Promise<Blob | null>;
    private initBackground;
    reset(): void;
}
export default ImageCropper;
