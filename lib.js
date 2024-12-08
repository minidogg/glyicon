async function DigestMessage(message) {
    const msgUint8 = new TextEncoder().encode(message); // encode as (utf-8) Uint8Array
    const hashBuffer = await window.crypto.subtle.digest("SHA-256", msgUint8); // hash the message
    const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
    // const hashHex = hashArray
    //   .map((b) => b.toString(16).padStart(2, "0"))
    //   .join(""); // convert bytes to hex string
    return hashArray;
}

export async function GenerateGlyiconData(text, width, height){
    let r = 0;
    let g = 0;
    let b = 0;
    let grid = []

    let hashArray = await DigestMessage(text)
    let hashArrayReduce = hashArray.reduce((p, c)=>p+c)

    r = Math.abs(Math.floor(Math.sin(hashArrayReduce)*255))
    g = Math.abs(Math.floor(Math.cos(hashArrayReduce)*255))
    b = Math.abs(Math.floor(Math.tan(hashArrayReduce)*255))

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

    return {r, g, b, grid}
}
