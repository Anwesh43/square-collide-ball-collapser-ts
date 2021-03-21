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