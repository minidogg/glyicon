async function DigestMessage(message) {
    const msgUint8 = new TextEncoder().encode(message); // encode as (utf-8) Uint8Array
    const hashBuffer = await window.crypto.subtle.digest("SHA-256", msgUint8); // hash the message
    const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
    // const hashHex = hashArray
    //   .map((b) => b.toString(16).padStart(2, "0"))
    //   .join(""); // convert bytes to hex string
    return hashArray;
}

function lerp(start, end, amt = 0.5) {
    return start + (end - start) * amt;
}

export async function GenerateGlyiconData(text, width, height){
    let primary = {r: 0, g: 0, b: 0}
    let secondary = {r: 0, g: 0, b: 0}
    let background = {r: 0, g: 0, b: 0}
    let grid = []

    let hashArray = await DigestMessage(text)
    let hashArrayReduce = hashArray.reduce((p, c)=>p+c)

    primary.r = Math.abs(Math.floor(Math.sin(hashArrayReduce)*255))
    primary.g = Math.abs(Math.floor(Math.cos(hashArrayReduce+primary.r)*255))
    primary.b = Math.abs(Math.floor(Math.tan(hashArrayReduce+primary.g)*255))

    secondary.r = Math.abs(Math.floor(Math.sin(hashArrayReduce+primary.b)*255))
    secondary.g = Math.abs(Math.floor(Math.cos(hashArrayReduce+primary.g)*255))
    secondary.b = Math.abs(Math.floor(Math.tan(hashArrayReduce+primary.r)*255))

    background.r = lerp(primary.r, secondary.r)
    background.g = lerp(primary.g, secondary.g)
    background.b = lerp(primary.b, secondary.b)


    let seedNumber = hashArrayReduce
    function PRNG(){
        seedNumber = Math.sin(seedNumber*10)
        return Math.abs(seedNumber)
    }

    for(let i1 = 0;i1<height;i1++){
        let row = []
        for(let i2 = 0;i2<width;i2++){
            row.push(Math.round(PRNG())==1)
        }
        grid.push(row)
    }

    return {primary, secondary, background, grid}
}
