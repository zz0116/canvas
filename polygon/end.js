
animate();

function animate() {
    let t1 = new Date().getTime();
    draw();
    let t2 = new Date().getTime();
    draw1();
    let t3 = new Date().getTime();
    console.log('canvas', t2 - t1);
    console.log('canvas1', t3 - t2);
    dataEnd++;
    window.requestAnimationFrame(animate);
}

//平移
window.onmousedown = function (event) {
    // Get mouse offset.
    var mousepos = {
        x: event.offsetX - canvas.offsetLeft,
        y: event.offsetY - canvas.offsetTop
    };
    canvas.style.cursor = "move";
    canvas1.style.cursor = "move";
    window.onmousemove = function (evt) { // 移动
        var mousepos1 = {
            x: evt.offsetX - canvas.offsetLeft,
            y: evt.offsetY - canvas.offsetTop
        };
        // 屏幕移动距离到canvas移动距离转换
        var dx1 = (mousepos1.x - mousepos.x) / scale;
        var dy1 = (mousepos1.y - mousepos.y) / scale;
        mousepos = mousepos1;
        ctx.translate(dx1, dy1);
        ctx1.translate(dx1, dy1);
        origin.x -= dx1;
        origin.y -= dy1;
    }

    window.onmouseup = function (evt) {
        window.onmousemove = null;
        window.onmouseup = null;
        canvas.style.cursor = "default";
        canvas1.style.cursor = "default";
    }
}

window.onmousewheel = function (event) {
    // Get mouse offset.
    var mouse = {
        x: event.offsetX - canvas.offsetLeft,
        y: event.offsetY - canvas.offsetTop
    };
    // Normalize wheel to +1 or -1.
    /*1.除了火狐浏览器外，都能获取到event.wheelDelta 并且是按照鼠标向上滚为大值，向下滚为小值
     * 2.火狐浏览器必须采用event.detail 才能监听到鼠标滚动事件，并且火狐的是依据鼠标向上滚为小值，向下滚为大值*/
    if (event.wheelDelta == undefined) {
        var wheel = event.detail > 0 ? -3 : 3;
    } else {
        var wheel = event.wheelDelta > 0 ? 1 : -1;
    }

    // Compute zoom factor.
    var zoom = Math.exp(wheel * zoomIntensity);
    // 道路占满屏幕时
    if (scale * zoom < 1) {
        zoom = 1 / scale;
        // 1px代表0.01米时
    } else if (scale * zoom > 100) {
        zoom = 100 / scale;
    }

    ctx.translate(origin.x, origin.y);
    ctx1.translate(origin.x, origin.y);
    origin.x -= mouse.x / (scale * zoom) - mouse.x / scale;
    origin.y -= mouse.y / (scale * zoom) - mouse.y / scale;
    ctx.scale(zoom, zoom);
    ctx1.scale(zoom, zoom);
    ctx.translate(-origin.x, -origin.y);
    ctx1.translate(-origin.x, -origin.y);

    scale *= zoom;
}