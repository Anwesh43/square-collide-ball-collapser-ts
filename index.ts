const w : number = window.innerWidth 
const h : number = window.innerHeight 
const parts : number = 5
const scGap : number = 0.02 / parts 
const strokeFactor : number = 90 
const squareSizeFactor : number = 5.6 
const ballRFactor : number = 11.2 
const delay : number = 20 
const colors : Array<string> = [
    "#f44336",
    "#004D40",
    "#0D47A1",
    "#00C853",
    "#2196F3"
]
const backColor : string = "#bdbdbd"

class ScaleUtil {

    static maxScale(scale : number, i : number, n : number) : number {
        return Math.max(0, scale - i / n)
    }
    
    static divideScale(scale : number, i : number, n : number) : number {
        return Math.min(1 / n, ScaleUtil.maxScale(scale, i, n)) * n 
    }

    static sinify(scale : number) : number {
        return Math.sin(scale * Math.PI)
    }
}

class DrawingUtil {

    static drawCircle(context : CanvasRenderingContext2D, x : number, y : number, r : number) {
        context.beginPath()
        context.arc(x, y, r, 0, 2 * Math.PI)
        context.fill()
    }

    static drawSquareCollideBallCollapser(context : CanvasRenderingContext2D, scale : number) {
        const size : number = Math.min(w, h) / squareSizeFactor 
        const r : number = Math.min(w, h) / ballRFactor 
        const sf : number = ScaleUtil.sinify(scale)
        const sf1 : number = ScaleUtil.divideScale(sf, 0, parts)
        const sf2 : number = ScaleUtil.divideScale(sf, 1, parts)
        const sf3 : number = ScaleUtil.divideScale(sf, 2, parts)
        const sf4 : number = ScaleUtil.divideScale(sf, 3, parts)
        const sf5 : number = ScaleUtil.divideScale(sf, 4, parts)
        const squareH : number = size * (sf1 - sf5)
        context.save()
        context.translate(w / 2, h / 2)
        for (var j = 0; j < 2; j++) {
            context.save()
            context.scale(1 - 2 * j, 1)
            context.fillRect(-w / 2 + (w /2 - size) * sf2, -squareH, size, squareH)
            context.restore()
        }
        DrawingUtil.drawCircle(context, 0, -h / 2 + r + (h / 2 - size - 2 * r) * sf4 + size * sf5, r * sf3)
        context.restore()
    }

    static drawSCBCNode(context : CanvasRenderingContext2D, i : number, scale : number) {
        context.fillStyle = colors[i]
        DrawingUtil.drawSquareCollideBallCollapser(context, scale)
    }
}

class Stage {

    canvas : HTMLCanvasElement = document.createElement('canvas')
    context : CanvasRenderingContext2D 

    initCanvas() {
        this.canvas.width = w 
        this.canvas.height = h 
        this.context = this.canvas.getContext('2d')
        document.body.appendChild(this.canvas)
    }

    render() {
        this.context.fillStyle = backColor 
        this.context.fillRect(0, 0, w, h)
    }

    handleTap() {
        this.canvas.onmousedown = () => {
            
        }
    }

    static init() {
        const stage : Stage = new Stage()
        stage.initCanvas()
        stage.render()
        stage.handleTap()
    }
}