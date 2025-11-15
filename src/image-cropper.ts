interface ImageCropperOption {
    outputWidth?: number
    outputHeight?: number
    maskHandleRadius?: number;
    maskLineWidth?: number
    maskLineColor?: string
    maskColor?: string;
    backgroundBoxSize?: number
    backgroundBoxColor0?: string
    backgroundBoxColor1?: string
}

class Point {
    x: number
    y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }
}

class Delta {
    x: number
    y: number
    z: number

    constructor(x: number, y: number, z: number) {
        this.x = x
        this.y = y
        this.z = z
    }
}

class Rect {
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

    get width() {
        return this.right - this.left
    }

    get height() {
        return this.bottom - this.top
    }

    get center(): Point {
        return new Point((this.right - this.left) / 2, (this.bottom - this.top) / 2)
    }

    public clone(): Rect {
        return new Rect(this.left, this.top, this.right, this.bottom)
    }

}

interface Root {
    setCursor(cursor: string): void

    setOverLayout(layout: Layout, point: Point): void
}

abstract class Layout {
    protected layoutList: Layout[] = []
    protected rect: Rect = new Rect(0, 0, 0, 0)
    protected parent: Layout | null = null
    protected cursor: string;
    protected config: ImageCropperOption = {
        backgroundBoxSize: 10,
        backgroundBoxColor0: '#fff',
        backgroundBoxColor1: '#ddd',
    };

    constructor(parent: Layout | null, cursor: string, config?: ImageCropperOption) {
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
            layout.draw(ctx)
        }
    }
}

class BackgroundLayout extends Layout {
    protected mousePoint: Point = new Point(0, 0);
    protected selectRect: Rect = new Rect(0, 0, 0, 0)
    protected onStartSelect: ((rect: Rect) => void) | null = null
    protected onMoveSelect: ((rect: Rect) => void) | null = null
    protected onEndSelect: ((rect: Rect) => void) | null = null

    constructor(parent: Layout | null, config?: ImageCropperOption) {
        super(parent, 'crosshair', config);
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
        this.selectRect.right += point.x - this.mousePoint.x
        this.selectRect.bottom += point.y - this.mousePoint.y
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

class ImageLayout extends Layout {
    protected image?: HTMLImageElement
    protected scale: number = 1;
    protected angle: number = 0;
    // protected center: Point = new Point(0, 0);
    protected clipRect: Rect = new Rect(0, 0, 0, 0)
    protected offset: Point = new Point(0, 0);

    constructor(parent: Layout | null, cursor: string = "auto") {
        super(parent, cursor);
    }

    public setRect(rect: Rect): void {
        super.setRect(rect);
        this.clipRect = new Rect(rect.left, rect.top, rect.right, rect.bottom)
    }

    public setClipRect(rect: Rect): void {
        console.log(rect)
        const offset = new Point(
            (this.clipRect.left + this.clipRect.width / 2) - (rect.left + rect.width / 2),
            (this.clipRect.top + this.clipRect.height / 2) - (rect.top + rect.height / 2),
        )
        console.log(offset)
        this.moveImage(offset)
        this.clipRect = rect
    }


    public setImage(image: HTMLImageElement): void {
        this.image = image
        const scaleX = this.rect.width / image.width;
        const scaleY = this.rect.height / image.height;
        this.scale = Math.min(scaleX, scaleY)
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

        ctx.save();
        ctx.translate(center.x, center.y);
        ctx.scale(this.scale, this.scale);
        ctx.rotate(this.angle * Math.PI / 180)
        ctx.translate(this.offset.x, this.offset.y);
        ctx.drawImage(this.image, -this.image.width / 2, -this.image.height / 2);
        ctx.restore();
    }

    protected getClipCanvas(): HTMLCanvasElement {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
            throw new Error('no canvas context');
        }


        // 设置canvas尺寸
        canvas.width = this.clipRect.width;
        canvas.height = this.clipRect.height;

        ctx.save();

        ctx.translate(this.clipRect.width / 2, this.clipRect.height / 2);
        ctx.scale(this.scale, this.scale);
        ctx.rotate(this.angle * Math.PI / 180);
        ctx.translate(this.offset.x, this.offset.y);

        ctx.drawImage(
            this.image!,
            -this.image!.width / 2,
            -this.image!.height / 2,
            this.image!.width,
            this.image!.height
        );

        ctx.restore();
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
}

class HandleLayout extends Layout {
    protected maskLineColor: string = '#000';
    protected maskLineWidth: number = 2;
    protected topLeft: PointLayout = new PointLayout(this, "nwse-resize")
    protected topCenter: PointLayout = new PointLayout(this, "ns-resize")
    protected topRight: PointLayout = new PointLayout(this, "nesw-resize")
    protected centerLeft: PointLayout = new PointLayout(this, "ew-resize ")
    protected centerRight: PointLayout = new PointLayout(this, "ew-resize ")
    protected bottomLeft: PointLayout = new PointLayout(this, "nesw-resize")
    protected bottomCenter: PointLayout = new PointLayout(this, "ns-resize")
    protected bottomRight: PointLayout = new PointLayout(this, "nwse-resize")
    protected layoutList: Layout[] = []
    private pointRadius: number = 6;
    protected isChecked: boolean = false;
    protected mousePoint: Point = new Point(0, 0);
    protected onMoveLayout: ((offset: Point) => void) | null = null
    protected onEndSelect: ((rect: Rect) => void) | null = null


    constructor(parent: Layout, cursor: string = "move") {
        super(parent, cursor)
        this.topLeft.setOnMoveLayout(this.onMoveTopLeft.bind(this))
        this.topCenter.setOnMoveLayout(this.onMoveTopCenter.bind(this))
        this.topRight.setOnMoveLayout(this.onMoveTopRight.bind(this))
        this.centerLeft.setOnMoveLayout(this.onMoveCenterLeft.bind(this))
        this.centerRight.setOnMoveLayout(this.onMoveCenterRight.bind(this))
        this.bottomLeft.setOnMoveLayout(this.onMoveBottomLeft.bind(this))
        this.bottomCenter.setOnMoveLayout(this.onMoveBottomCenter.bind(this))
        this.bottomRight.setOnMoveLayout(this.onMoveBottomRight.bind(this))

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
            this.bottomRight
        ]
    }

    public onEndLayout(): void {
        this.onEndSelect?.call(this, this.rect)
    }

    public setOnMoveLayout(callback: (offset: Point) => void) {
        this.onMoveLayout = callback
    }

    public setOnEndSelect(callback: (rect: Rect) => void) {
        this.onEndSelect = callback
    }

    protected onMoveTopLeft(offset: Point): void {
        this.rect.left = this.rect.left + offset.x
        this.rect.top = this.rect.top + offset.y
        this.setRect(this.rect)
    }

    protected onMoveTopCenter(offset: Point): void {
        this.rect.top = this.rect.top + offset.y
        this.setRect(this.rect)
    }

    protected onMoveTopRight(offset: Point): void {
        this.rect.right = this.rect.right + offset.x
        this.rect.top = this.rect.top + offset.y
        this.setRect(this.rect)
    }

    protected onMoveCenterLeft(offset: Point): void {
        this.rect.left = this.rect.left + offset.x
        this.setRect(this.rect)
    }

    protected onMoveCenterRight(offset: Point): void {
        this.rect.right = this.rect.right + offset.x
        this.setRect(this.rect)
    }

    protected onMoveBottomLeft(offset: Point): void {
        this.rect.left = this.rect.left + offset.x
        this.rect.bottom = this.rect.bottom + offset.y
        this.setRect(this.rect)
    }

    protected onMoveBottomCenter(offset: Point): void {
        this.rect.bottom = this.rect.bottom + offset.y
        this.setRect(this.rect)
    }

    protected onMoveBottomRight(offset: Point): void {
        this.rect.right = this.rect.right + offset.x
        this.rect.bottom = this.rect.bottom + offset.y
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
            this.onMoveLayout?.call(this, new Point(point.x - this.mousePoint.x, point.y - this.mousePoint.y))
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

        this.topLeft.setRect(new Rect(left - this.pointRadius, top - this.pointRadius, left + this.pointRadius * 2, top + this.pointRadius * 2))
        this.topCenter.setRect(new Rect(left + width / 2 - this.pointRadius, top - this.pointRadius, left + width / 2 + this.pointRadius * 2, top + this.pointRadius * 2))
        this.topRight.setRect(new Rect(right - this.pointRadius, top - this.pointRadius, right + this.pointRadius * 2, top + this.pointRadius * 2))
        this.centerLeft.setRect(new Rect(left - this.pointRadius, top + height / 2 - this.pointRadius, left + this.pointRadius * 2, top + height / 2 + this.pointRadius * 2))
        this.centerRight.setRect(new Rect(right - this.pointRadius, top + height / 2 - this.pointRadius, right + this.pointRadius * 2, top + height / 2 + this.pointRadius * 2))
        this.bottomLeft.setRect(new Rect(left - this.pointRadius, bottom - this.pointRadius, left + this.pointRadius * 2, bottom + this.pointRadius * 2))
        this.bottomCenter.setRect(new Rect(left + width / 2 - this.pointRadius, bottom - this.pointRadius, left + width / 2 + this.pointRadius * 2, bottom + this.pointRadius * 2))
        this.bottomRight.setRect(new Rect(right - this.pointRadius, bottom - this.pointRadius, right + this.pointRadius * 2, bottom + this.pointRadius * 2))
    }

    public drawMask(ctx: CanvasRenderingContext2D): void {
        ctx.rect(this.rect.left, this.rect.top, this.rect.width, this.rect.height)
    }

    private drawLine(ctx: CanvasRenderingContext2D, start: Point, end: Point): void {
        ctx.beginPath()
        ctx.moveTo(start.x, start.y)
        ctx.lineTo(end.x, end.y)
        ctx.closePath()

        ctx.strokeStyle = "rgba(255,255,255,0.31)"
        ctx.setLineDash([4, 5])
        ctx.lineWidth = 1

        ctx.stroke()
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        const {left, top, right, bottom} = this.rect
        let width = right - left
        let height = (bottom - top)
        ctx.save()
        ctx.beginPath()
        ctx.rect(left, top, width, height)
        ctx.closePath()
        ctx.strokeStyle = this.maskLineColor
        ctx.lineWidth = this.maskLineWidth
        ctx.stroke()
        ctx.restore()


        width = width / 4
        height = height / 4
        ctx.save()
        this.drawLine(ctx, new Point(left, top + height), new Point(right, top + height))
        this.drawLine(ctx, new Point(left, top + height * 2), new Point(right, top + height * 2))
        this.drawLine(ctx, new Point(left, top + height * 3), new Point(right, top + height * 3))

        this.drawLine(ctx, new Point(left + width, top), new Point(left + width, bottom))
        this.drawLine(ctx, new Point(left + width * 2, top), new Point(left + width * 2, bottom))
        this.drawLine(ctx, new Point(left + width * 3, top), new Point(left + width * 3, bottom))

        ctx.restore()

        super.draw(ctx)
    }
}

class PointLayout extends Layout {
    protected maskLineColor: string = '#000';
    protected isChecked: boolean = false;
    protected mousePoint: Point = new Point(0, 0);
    protected onMoveLayout: ((offset: Point) => void) | null = null
    protected onEndLayout: ((offset: Point) => void) | null = null

    public setOnMoveLayout(callback: (offset: Point) => void) {
        this.onMoveLayout = callback
    }

    public setOnEndLayout(callback: (offset: Point) => void) {
        this.onEndLayout = callback
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
        const {left, top, right, bottom} = this.rect
        ctx.beginPath()
        ctx.rect(left, top, right - left, bottom - top)
        ctx.closePath()
        ctx.fillStyle = this.maskLineColor
        ctx.fill()
    }
}

class MaskLayout extends Layout {
    protected maskColor: string = '#88888888';
    protected isSelect: boolean = true;
    protected handle: HandleLayout = new HandleLayout(this)
    protected isChecked: boolean = false;
    protected mousePoint: Point = new Point(0, 0);
    protected onRotateLayout: ((angle: number) => void) | null = null

    constructor(parent: Layout, cursor: string = "pointer") {
        super(parent, cursor)
        this.layoutList.push(this.handle)
    }

    public setOnRotateLayout(callback: (angle: number) => void) {
        this.onRotateLayout = callback
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
        if (this.isChecked) {
            const rect = this.getRect()
            const center = new Point(rect.left + rect.width / 2, rect.top + rect.height / 2)

            const dx1 = point.x - center.x;
            const dy1 = point.y - center.y;
            const dx2 = this.mousePoint.x - center.x;
            const dy2 = this.mousePoint.y - center.y;

            const angle = (Math.atan2(dy2, dx2) - Math.atan2(dy1, dx1)) * (180 / Math.PI);

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
        super.end(point)
        return true
    }

    public setHandleRect(rect: Rect): void {
        this.handle.setRect(rect)
    }

    public endSelect(rect: Rect): void {
        this.handle.setRect(rect)
        this.isSelect = false
    }

    public setOnMoveLayout(callback: (offset: Point) => void) {
        this.handle.setOnMoveLayout(callback)
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        const {left, top, right, bottom} = this.rect
        const width = right - left
        const height = bottom - top

        ctx.fillStyle = this.maskColor
        ctx.beginPath()
        ctx.rect(left, top, width, height)
        this.handle.drawMask(ctx)
        ctx.closePath()
        ctx.fill('evenodd')

        super.draw(ctx)
    }

}

class ImageCropper extends Layout implements Root {
    protected canvas: HTMLCanvasElement;
    protected canvas2D: CanvasRenderingContext2D
    protected background: BackgroundLayout = new BackgroundLayout(this);
    protected mask?: MaskLayout
    protected image?: ImageLayout
    private overLayout: Layout | null = null;
    protected layoutList: Layout[] = []

    constructor(canvas: HTMLCanvasElement, config?: ImageCropperOption) {
        super(null, "auto", config)

        this.canvas = canvas
        this.canvas2D = canvas.getContext('2d')!
        this.setRect(new Rect(0, 0, this.canvas.width, this.canvas.height))
        this.initBackground()

        canvas.addEventListener('mousedown', this.onMouseDown.bind(this))
        canvas.addEventListener('mousemove', this.onMouseMove.bind(this))
        canvas.addEventListener('mouseup', this.onMouseUp.bind(this))
        canvas.addEventListener('wheel', this.onMouseWheel.bind(this))

        canvas.addEventListener('touchstart', this.onTouchStart.bind(this))
        canvas.addEventListener('touchmove', this.onTouchMove.bind(this))
        canvas.addEventListener('touchend', this.onTouchEnd.bind(this))

        this.draw(this.canvas2D)
    }

    public setCursor(cursor: string): void {
        this.canvas.style.cursor = cursor
    }

    public start(point: Point): boolean {
        super.start(point)
        this.draw(this.canvas2D)
        return true
    }

    public move(point: Point): boolean {
        this.checkOverOut(point)
        super.move(point)
        this.draw(this.canvas2D)
        return true
    }

    public end(point: Point): boolean {
        super.end(point)
        this.draw(this.canvas2D)
        return true
    }

    protected onTouchStart(event: TouchEvent) {
        event.preventDefault()
        if (event.touches.length === 0) {
            return
        }
        this.start(new Point(event.touches[0]!.clientX, event.touches[0]!.clientY))
    }

    protected onTouchMove(event: TouchEvent) {
        event.preventDefault()

        if (event.touches.length === 0) {
            return
        }
        this.move(new Point(event.touches[0]!.clientX, event.touches[0]!.clientY))
    }

    protected onTouchEnd(event: TouchEvent) {
        event.preventDefault()
        this.end(new Point(event.changedTouches[0]!.clientX, event.changedTouches[0]!.clientY))
    }

    protected onMouseDown(event: MouseEvent) {
        event.preventDefault()
        this.start(new Point(event.offsetX, event.offsetY))
    }

    protected onMouseMove(event: MouseEvent) {
        event.preventDefault()
        this.move(new Point(event.offsetX, event.offsetY))
    }

    protected onMouseUp(event: MouseEvent) {
        event.preventDefault()
        this.end(new Point(event.offsetX, event.offsetY))
    }

    public onMouseOver(event: MouseEvent) {
        event.preventDefault()
        this.over()
    }

    protected onMouseWheel(event: WheelEvent) {
        event.preventDefault()
        this.wheel(new Delta(event.deltaX, event.deltaY, event.deltaZ))
        this.draw(this.canvas2D)
    }

    public setImage(image: HTMLImageElement): void {
        this.image = new ImageLayout(this)
        this.image.setRect(this.rect.clone())
        this.image.setImage(image)
        this.layoutList.push(this.image)

        this.draw(this.canvas2D)
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

    private initBackground() {
        this.background.setRect(this.rect)
        this.layoutList.push(this.background)
        this.background.setOnStartSelect((rect: Rect) => {
            if (this.mask) {
                return
            }
            this.mask = new MaskLayout(this)
            this.mask.setOnMoveLayout((offset: Point) => {
                this.image?.moveImage(offset)
            })
            this.mask.setOnRotateLayout((angle: number) => {
                this.image?.setRotate(angle)
            })
            this.mask.setOnEndSelect((rect: Rect) => {
                this.image?.setClipRect(rect.clone())
            })
            this.mask.setRect(this.rect)
            this.mask.setHandleRect(rect.clone())
            this.layoutList.push(this.mask)
        })
        this.background.setOnMoveSelect((rect: Rect) => {
            this.mask?.setHandleRect(rect.clone())
        })
        this.background.setOnEndSelect((rect: Rect) => {
            this.mask?.endSelect(rect.clone())
            this.image?.setClipRect(rect.clone())
        })
    }

    

}

export default ImageCropper;
