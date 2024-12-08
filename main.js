const canvas = document.getElementById("output")
const ctx = canvas.getContext("2d")

function ResizeCanvas(){
    let minMeasure = Math.min(window.innerHeight, window.innerWidth)
    canvas.width = minMeasure*0.5
    canvas.height = minMeasure*0.5
}
ResizeCanvas()

async function DigestMessage(message) {
    const msgUint8 = new TextEncoder().encode(message); // encode as (utf-8) Uint8Array
    const hashBuffer = await window.crypto.subtle.digest("SHA-256", msgUint8); // hash the message
    const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
    // const hashHex = hashArray
    //   .map((b) => b.toString(16).padStart(2, "0"))
    //   .join(""); // convert bytes to hex string
    return hashArray;
}

async function GenerateGlyiconData(text){
    let r = 0;
    let g = 0;
    let b = 0;
    let grid = []

    let hashArray = await DigestMessage(text)
    let hashArrayReduce = hashArray.reduce((p, c)=>p+c)

    r = Math.abs(Math.floor(Math.sin(hashArrayReduce)*255))
    g = Math.abs(Math.floor(Math.cos(hashArrayReduce)*255))
    b = Math.abs(Math.floor(Math.tan(hashArrayReduce)*255))
    console.log(hashArrayReduce)

    return {r, g, b, grid}
}
let data = await GenerateGlyiconData("unluckycrafter")
console.log(data)

ctx.fillStyle = `rgb(${data.r}, ${data.g}, ${data.b})`
ctx.fillRect(0, 0, 100, 100)