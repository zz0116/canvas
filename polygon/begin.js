$.ajaxSettings.async = false;
let data;
$.getJSON('../allTrackData.json', function (res) {
    data = res;
});
Object.keys(data).forEach(rollerId => {
    let curData = data[rollerId];
    for (let i = 0; i < curData.length; i++) {
        let p = curData[i];
        p.x = p.x % 900;
        p.y = p.y % 800;
    }
});

let origin = {
    x: 0,
    y: 0
};
let dataBegin = 0,
    dataEnd = 0,
    scale = 1,
    zoomIntensity = 0.2,
    fillStyle = 'rgba(0, 0, 0, 0.05)',
    lineWidth = 0.05;

//清除canvas，四个值分别为起点x坐标，y坐标，清除的宽度，长度
function clearCanvas(context) {
    context.clearRect(origin.x, origin.y, width1 * scale, height1 * scale);
}