import { GenerateGlyiconData } from "./lib.js"

const coolMode = false

const canvas = document.getElementById("output")
const ctx = canvas.getContext("2d")
function ResizeCanvas(){
    let minMeasure = Math.min(window.innerHeight, window.innerWidth)
    canvas.width = minMeasure*0.5
    canvas.height = minMeasure*0.5
}
ResizeCanvas()

function Triangle(x, y, width, height, bottom = true){
    var path=new Path2D();
    path.moveTo(x, y);
    if(bottom==true){
        path.lineTo(x,y+height);
        path.lineTo(x+width, y+height);
    }else{
        path.lineTo(x+width,y)
        path.lineTo(x+width,y+width)
    }

    ctx.fill(path);
}

async function UpdateGlyicon(text, clearCanvas = true){
    let data = await GenerateGlyiconData(text, 5, 5)
    console.log(data)

    if(clearCanvas==true){
        if(document.getElementById("bg").checked==true){
            ctx.fillStyle = `rgb(${data.background.r}, ${data.background.g}, ${data.background.b})`
            ctx.fillRect(0, 0, canvas.width, canvas.height)
        }else{
            ctx.clearRect(0, 0, canvas.width, canvas.height)
        }

    }

    let pixelSize = canvas.width/5
    for(let i1 = 0;i1<data.grid.length;i1++){
        for(let i2 = 0;i2<data.grid[i1].length;i2++){
            ctx.fillStyle = `rgb(${data.primary.r}, ${data.primary.g}, ${data.primary.b})`
            if(data.grid[i1][i2]==true) Triangle(i2*pixelSize, i1*pixelSize, pixelSize+1, pixelSize+1)
            ctx.fillStyle = `rgb(${data.secondary.r}, ${data.secondary.g}, ${data.secondary.b})`
            if(data.grid[i1][i2]==true) Triangle(i2*pixelSize, i1*pixelSize, pixelSize+1, pixelSize+1, false)
        }
    }

}

let input = document.getElementById("inputText")
input.addEventListener("change", ()=>{
    UpdateGlyicon(input.value)
    if(coolMode){
        UpdateGlyicon(input.value+input.value+"cool", false)
    }
})