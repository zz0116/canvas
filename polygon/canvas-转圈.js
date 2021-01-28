const canvas1 = document.getElementById("canvas1");
const ctx1 = canvas1.getContext('2d');

const width1 = canvas1.width;
const height1 = canvas1.height;

ctx1.globalCompositeOperation = "lighter";
ctx1.fillStyle = fillStyle;
ctx1.lineWidth = lineWidth;

function draw1() {
    clearCanvas(ctx1);

    let polygonList = [];
    Object.keys(data).forEach(rollerId => {
        let curData = data[rollerId];
        var curDataEnd = dataEnd;
        if (curDataEnd > curData.length - 3) {
            curDataEnd = curData.length - 3;
        }
        let p2Arr = [curData[0]];
        let p3Arr = [curData[1]];
        for (let i = dataBegin; i < curDataEnd; i += 2) {
            let p1 = curData[i];
            let p4 = curData[i + 1];
            let p2 = curData[i + 2];
            let p3 = curData[i + 3];

            if (dis(p1, p2) < 0.01) {
                continue;
            }

            if (dis(p1, p2) > 5) {
                collectPolygon(polygonList, p2Arr, p3Arr);
                p2Arr = [p2];
                p3Arr = [p3];
                continue;
            }
            if (isSegmentsIntersectant([p1, p2], [p3, p4])) {
                collectPolygon(polygonList, p2Arr, p3Arr);
                p2Arr = [p2];
                p3Arr = [p3];
                continue;
            }

            if (isIntersect(p2Arr, p3Arr, p1, p2, p3, p4)) {
                collectPolygon(polygonList, p2Arr, p3Arr);

                p2Arr = [p2];
                p3Arr = [p3];
            } else {
                p2Arr.push(p2);
                p3Arr.push(p3);

                if (i + 2 >= dataEnd) {
                    collectPolygon(polygonList, p2Arr, p3Arr);
                }
            }
        }
    });
    drawTrack(polygonList);
}

function collectPolygon(polygons, p2Arr, p3Arr) {
    for (let j = p3Arr.length - 1; j >= 0; j--) {
        p2Arr.push(p3Arr[j]);
    }
    if (p2Arr.length > 2) {
        polygons.push(p2Arr);
    }
}

function drawTrack(polygons) {
    if (polygons.length == 0) {
        return;
    }
    for (let i = 0; i < polygons.length; i++) {
        const polygon = polygons[i];
        if (polygon.length < 4) {
            continue;
        }

        ctx1.beginPath();
        ctx1.moveTo(polygon[0].x, polygon[0].y);
        for (let j = 1; j < polygon.length; j++) {
            const p = polygon[j];
            ctx1.lineTo(p.x, p.y);
        }
        // ctx1.closePath();
        ctx1.stroke();
        ctx1.fill();
    }
}

function isIntersect(p2Arr, p3Arr, p1, p2, p3, p4) {
    var polygon1 = [];
    for (let j = 0; j < p2Arr.length; j++) {
        polygon1.push(p2Arr[j]);
        
    }
    for (let j = p3Arr.length - 1; j >= 0; j--) {
        polygon1.push(p3Arr[j]);
    }
    var polygon2 = [p1, p2, p3, p4];
    return isPolygonsIntersectant(polygon1, polygon2);
}

//判断两多边形线段是否相交
function isSegmentsIntersectant(segA, segB) {
    const abc = (segA[0].x - segB[0].x) * (segA[1].y - segB[0].y) - (segA[0].y - segB[0].y) * (segA[1].x - segB[0].x);
    const abd = (segA[0].x - segB[1].x) * (segA[1].y - segB[1].y) - (segA[0].y - segB[1].y) * (segA[1].x - segB[1].x);
    if (abc * abd >= 0) {
        return false;
    }
    const cda = (segB[0].x - segA[0].x) * (segB[1].y - segA[0].y) - (segB[0].y - segA[0].y) * (segB[1].x - segA[0].x);
    const cdb = cda + abc - abd;
    return !(cda * cdb >= 0);
}

//判断两多边形边界是否相交
function isPolygonsIntersectant(plyA, plyB) {
    for (let i = 0, il = plyA.length; i < il; i++) {
        for (let j = 0, jl = plyB.length; j < jl; j++) {
            const segA = [plyA[i], plyA[i === il - 1 ? 0 : i + 1]];
            const segB = [plyB[j], plyB[j === jl - 1 ? 0 : j + 1]];
            if (isSegmentsIntersectant(segA, segB)) {
                return true;
            }
        }
    }
    return false;
}