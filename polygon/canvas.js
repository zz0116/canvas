const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

const width = canvas.width;
const height = canvas.height;

ctx.globalCompositeOperation = "lighter";
ctx.fillStyle = "rgba(0, 0, 0, 0.01)";
ctx.lineWidth = 0.1;

function draw() {
    let timeS = new Date().getTime();
    clearCanvas(ctx);

    // let p1 = {
    //         x: 10,
    //         y: 10
    //     },
    //     p2 = {
    //         x: 30,
    //         y: 10
    //     },
    //     p3 = {
    //         x: 10,
    //         y: 50
    //     },
    //     p4 = {
    //         x: 30,
    //         y: 60
    //     };

    // polygon(p1, p2, p3, p4);

    Object.keys(data).forEach(rollerId => {
        let curData = data[rollerId];
        if (dataEnd > curData.length - 3) {
            dataEnd = curData.length - 3;
        }
        for (let i = dataBegin; i < dataEnd; i += 2) {
            let p1 = curData[i];
            let p4 = curData[i + 1];
            let p2 = curData[i + 2];
            let p3 = curData[i + 3];

            if (!sameDirection(p1, p2, p3, p4)) {
                let temp = JSON.parse(JSON.stringify(p2));
                p2 = p4;
                p4 = temp;
            }

            polygon(p1, p2, p3, p4);
        }
    });

    let timeE = new Date().getTime();

    // console.log('canvas', timeE - timeS);
}

function polygon(p1, p2, p3, p4) {
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.lineTo(p3.x, p3.y);
    ctx.lineTo(p4.x, p4.y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}