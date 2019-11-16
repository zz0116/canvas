class Subject {
    constructor(w, h, color, x, y, vx, vy, ax, ay) {
        this.canvas = $("#canvas");
        this.ctx = this.canvas.getContext('2d');

        this.w = w;
        this.h = h;
        this.color = color;

        this.x = x;
        this.y = y;
        // 速度
        this.vx = vx;
        this.vy = vy;
        // 加速度
        this.ax = ax;
        this.ay = ay;
    }
    static new(w, h, color, x, y, vx, vy, ax, ay) {
        return new this(w, h, color, x, y, vx, vy, ax, ay);
    }
    init() {
        // 
        this.x = this.x ? this.x : getRandomIntInclusive(this.w, this.canvas.width - this.w);
        this.y = this.y ? this.y : getRandomIntInclusive(this.h, this.canvas.height - this.h);

        this.vx = this.vx ? this.vx : getRandomIntInclusive(-10, 10) / 100;
        this.vy = this.vy ? this.vy : getRandomIntInclusive(-10, 10) / 100;

        this.ax = 0;
        this.ay = 0;
        this.color = this.color ? this.color : getRandomRgba();
    }
    draw() {

    }
    update() {
        // log("subject update", this)
        // log("subject color", this.color)
        // 速度
        this.x += this.vx;
        this.y += this.vy;
        if (this.x - this.w < 0 || this.x + this.w > this.canvas.width) {
            this.vx = -this.vx;
        }
        if (this.y - this.h < 0 || this.y + this.h > this.canvas.height) {
            this.vy = -this.vy;
        }
        // 加速度
        this.vx += this.ax;
        this.vy += this.ay;
        this.ax = getRandomIntInclusive(-10, 10) / 1000;
        this.ay = getRandomIntInclusive(-10, 10) / 1000;
    }
}