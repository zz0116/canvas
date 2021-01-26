const canvas1 = document.getElementById("canvas1");
const ctx1 = canvas1.getContext('2d');

const width1 = canvas1.width;
const height1 = canvas1.height;

ctx1.globalCompositeOperation = "lighter";
ctx1.fillStyle = "rgba(0, 0, 0, 0.1)";
ctx1.lineWidth = 0.1;

function draw1() {
    let timeS = new Date().getTime();
    clearCanvas(ctx1);

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

    // polygon1(p1, p2, p3, p4);

    Object.keys(data).forEach(rollerId => {
        let polygonList = [];
        let curData = data[rollerId];
        if (dataEnd > curData.length - 3) {
            dataEnd = curData.length - 3;
        }
        let p2Arr = [curData[0]];
        let p3Arr = [curData[1]];
        for (let i = dataBegin; i < dataEnd; i += 2) {
            let p1 = curData[i];
            let p4 = curData[i + 1];
            let p2 = curData[i + 2];
            let p3 = curData[i + 3];

            // if ((p4.x == p3.x && p4.y == p3.y) || (p1.x == p2.x && p1.y == p2.y)) {
            //     continue;
            // }

            if (dis(p1, p2) > 10) {
                collectPolygon(polygonList, p2Arr, p3Arr);
                p2Arr = [p2];
                p3Arr = [p3];
                continue;
            }

            if (sameDirection(p1, p2, p3, p4)) {
                p2Arr.push(p2);
                p3Arr.push(p3);

                if (i + 2 >= dataEnd) {
                    collectPolygon(polygonList, p2Arr, p3Arr);
                }
            } else {
                collectPolygon(polygonList, p2Arr, p3Arr);

                p2Arr = [p4];
                p3Arr = [p1];
            }
        }
        drawTrack(polygonList);
    });

    let timeE = new Date().getTime();

    // console.log('canvas1', timeE - timeS);
}

function collectPolygon(polygons, p2Arr, p3Arr) {
    for (let j = p3Arr.length - 1; j >= 0; j--) {
        p2Arr.push(p3Arr[j]);
    }
    if (p2Arr.length > 2) {
        polygons.push(p2Arr);
    }
}

function polygon1(p1, p2, p3, p4) {
    ctx1.beginPath();
    ctx1.moveTo(p1.x, p1.y);
    ctx1.lineTo(p2.x, p2.y);
    ctx1.lineTo(p3.x, p3.y);
    ctx1.lineTo(p4.x, p4.y);
    ctx1.closePath();
    ctx1.fill();
    ctx1.stroke();
}

function drawTrack(polygons) {
    if (polygons.length == 0) {
        return;
    }
    for (let i = 0; i < polygons.length; i++) {
        const polygon = polygons[i];

        ctx1.beginPath();
        ctx1.moveTo(polygon[0].x, polygon[0].y);
        for (let j = 1; j < polygon.length; j++) {
            const p = polygon[j];
            ctx1.lineTo(p.x, p.y);
        }
        ctx1.closePath();
        ctx1.stroke();
        ctx1.fill();
    }
}

function polygonBig(arr1, arr2) {
    if (arr1.length < 2 || arr2.length < 2) {
        return;
    }

    ctx1.beginPath();
    ctx1.moveTo(arr1[0].x, arr1[0].y);
    for (let i = 0; i < arr1.length; i++) {
        let p = arr1[i];
        ctx1.lineTo(p.x, p.y);
    }
    for (let i = arr2.length - 1; i > 0; i--) {
        let p = arr2[i];
        ctx1.lineTo(p.x, p.y);
    }
    ctx1.closePath();
    ctx1.fill();
    ctx1.stroke();
}