class Star extends Universe {
    constructor(x, y, r) {
        super();
        this.x = x ? x : 300;
        this.y = y ? y : 300;
        this.r = r ? r : 50;

        // this.vx = 0;
        // this.vy = 2;

        // this.ax = 0;
        // this.ay = 0;

        // this.a = 0;
    }
    static new(x, y, r) {
        return new this(x, y, r);
    }
    draw() {
        let ctx = this.ctx;
        // 恒星
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fillStyle = "rgba(255, 0, 0, 0.6)";
        ctx.fill();
        this.update();
    }
    update() {
        // // log('update')
        // // 恒星默认质量为其r=100,坐标为x=200,y=200
        // // 角度
        // this.a = Math.atan2(300 - this.y, 300 - this.x);
        // // log(this.a)
        // // 距离
        // let dis2 = Math.pow(300 - this.x, 2) + Math.pow(300 - this.y, 2);
        // // 加速度
        // this.ax = 1000 * Math.cos(this.a) / dis2;
        // this.ay = 1000 * Math.sin(this.a) / dis2;
        // // 速度
        // this.vx += this.ax;
        // this.vy += this.ay;
        // // 坐标
        // this.x += this.vx;
        // this.y += this.vy;
    }
}