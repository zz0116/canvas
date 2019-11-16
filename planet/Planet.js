class Planet extends Universe {
    constructor(x, y, r, vx, vy) {
        super();
        this.x = x ? x : 100;
        this.y = y ? y : 300;
        this.r = r ? r : 10;
        this.color = getRandomRgba();

        this.vx = vx ? vx : 0;
        this.vy = vy ? vy : 2;

        this.ax = 0;
        this.ay = 0;

        this.stars = [];
    }
    static new(x, y, r, vx, vy) {
        return new this(x, y, r, vx, vy);
    }
    addStar(s) {
        this.stars.push(s);
    }
    draw() {
        let ctx = this.ctx;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
        this.update();

    }
    update() {
        // log('update')
        // 恒星
        let G = this.G;
        this.ax = 0;
        this.ay = 0;
        // 万有引力定律
        for (const s of this.stars) {
            // 角度
            let a = Math.atan2(s.y - this.y, s.x - this.x);
            // log(this.a)
            // 距离
            let dis2 = Math.pow(s.x - this.x, 2) + Math.pow(s.y - this.y, 2);
            // 重力加速度
            // 加速度
            let mm = Math.pow(s.r, 2) * Math.pow(this.r, 2) / 100;
            this.ax += mm * G * Math.cos(a) / dis2;
            this.ay += mm * G * Math.sin(a) / dis2;
        }
        // 速度
        this.vx += this.ax;
        this.vy += this.ay;
        // 坐标
        this.x += this.vx;
        this.y += this.vy;
    }
}