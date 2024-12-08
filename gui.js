import { GenerateGlyiconData } from "./lib.js"

const canvas = document.getElementById("output")
const ctx = canvas.getContext("2d")
function ResizeCanvas(){
    let minMeasure = Math.min(window.innerHeight, window.innerWidth)
    canvas.width = minMeasure*0.5
    canvas.height = minMeasure*0.5
}
ResizeCanvas()

async function UpdateGlyicon(text){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    let data = await GenerateGlyiconData(text, 5, 5)
    console.log(data)

    ctx.fillStyle = `rgb(${data.r}, ${data.g}, ${data.b})`
    let pixelSize = canvas.width/5
    for(let i1 = 0;i1<data.grid.length;i1++){
        for(let i2 = 0;i2<data.grid[i1].length;i2++){
            if(data.grid[i1][i2]==true)ctx.fillRect(i2*pixelSize, i1*pixelSize, pixelSize, pixelSize)
        }
    }

}

let input = document.getElementById("inputText")
input.addEventListener("change", ()=>{
    UpdateGlyicon(input.value)
})