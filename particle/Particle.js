class Particle extends Subject {
    constructor(r, color, x, y, vx, vy, ax, ay) {
        super(r, r, color, x, y, vx, vy, ax, ay);
        this.r = r;
    }
    static new(r, color, x, y, vx, vy, ax, ay) {
        return new this(r, color, x, y, vx, vy, ax, ay);
    }
    init() {
        this.r = this.r ? this.r : 10;
        this.w = this.r;
        this.h = this.r;
        super.init();
    }
    update() {
        super.update();
    }
    draw() {
        // log("arc draw")
        let ctx = this.ctx;
        ctx.fillStyle = this.color;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, true);
        ctx.closePath();

        ctx.fill();
    }
    // /**
    //  * 相撞
    //  */
    // collide(o1, o2) {
    //     let dis = Math.sqrt(Math.pow((o1.x - o2.x), 2) + Math.pow((o1.y - o2.y), 2));
    //     if (dis < o1.r + o2.r) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }
    // /**
    //  * 动量定理
    //  */
    // momentum(o1, o2) {
    //     let vx = o1.vx;
    //     let vy = o1.vy;
    //     o1.vx = o2.vx;
    //     o1.vy = o2.vy;
    //     o2.vx = vx;
    //     o2.vy = vy;
    // }
}
