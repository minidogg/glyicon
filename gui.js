const canvas = document.getElementById("output")
const ctx = canvas.getContext("2d")

let data = await GenerateGlyiconData("unluckycrafter")
console.log(data)

ctx.fillStyle = `rgb(${data.r}, ${data.g}, ${data.b})`
ctx.fillRect(0, 0, 100, 100)