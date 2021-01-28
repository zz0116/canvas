const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

const width = canvas.width;
const height = canvas.height;

ctx.globalCompositeOperation = "lighter";
ctx.fillStyle = fillStyle;
ctx.lineWidth = lineWidth;

function draw() {
    clearCanvas(ctx);
    Object.keys(data).forEach(rollerId => {
        let curData = data[rollerId];
        var curDataEnd = dataEnd;
        if (curDataEnd > curData.length - 3) {
            curDataEnd = curData.length - 3;
        }
        for (let i = dataBegin; i < curDataEnd; i += 2) {
            let p1 = curData[i];
            let p4 = curData[i + 1];
            let p2 = curData[i + 2];
            let p3 = curData[i + 3];

            if (dis(p1, p2) < 0.01 || dis(p1, p2) > 5) {
                continue;
            }

            if (!sameDirection(p1, p2, p3, p4)) {
                let temp = p2;
                p2 = p3;
                p3 = temp;
            } 

            polygon(p1, p2, p3, p4);
        }
    });
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