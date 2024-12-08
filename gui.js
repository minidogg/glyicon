import { GenerateGlyiconData } from "./lib.js"

const canvas = document.getElementById("output")
const ctx = canvas.getContext("2d")

function ResizeCanvas(){
    let minMeasure = Math.min(window.innerHeight, window.innerWidth)
    canvas.width = minMeasure*0.5
    canvas.height = minMeasure*0.5
}
ResizeCanvas()

let data = await GenerateGlyiconData("unluckycrafter")
console.log(data)

ctx.fillStyle = `rgb(${data.r}, ${data.g}, ${data.b})`
ctx.fillRect(0, 0, 100, 100)