const log = console.log.bind(console);

const $ = document.querySelector.bind(document);

/**
 * 返回一个在min和max之间的整数，包含min和max
 * @param {num} min 最小值
 * @param {num} max 最大值
 */
const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

const getRandomRgba = () => {
    let r = getRandomIntInclusive(0, 255);
    let g = getRandomIntInclusive(0, 255);
    let b = getRandomIntInclusive(0, 255);
    let a = Math.random(0, 1);
    return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
}

/**
 * canvas边框可拖动插件
 * TODO: 多个canvas边框可拖动(暂时会出错)
 */
for (let canvas of document.querySelectorAll("canvas")) {
    let mousedown = false;
    let resizeX = canvas.width;
    let resizeY = canvas.height;
    window.onmousemove = (event) => {
        let { x, y } = { x: event.x, y: event.y };
        let wOn = x < canvas.width + 10 && x > canvas.width - 10;
        let hOn = y < canvas.height + 10 && y > canvas.height - 10;
        if (wOn && hOn) {
            canvas.style.cursor = "nw-resize";
            resizeX = x;
            resizeY = y;
        } else if (wOn) {
            canvas.style.cursor = "e-resize";
            resizeX = x;
        } else if (hOn) {
            canvas.style.cursor = "s-resize";
            resizeY = y;
        } else {
            canvas.style.cursor = "";
        }
        if (mousedown) {
            canvas.width = resizeX;
            canvas.height = resizeY;
        }
    }
    window.onmousedown = () => {
        mousedown = true;
    } 
    window.onmouseup = () => {
        mousedown = false;
    } 
}