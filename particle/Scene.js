class Scene {
    constructor() {
        // log('scene new ')
        this.canvas = $("#canvas");
        this.ctx = this.canvas.getContext('2d');
        this.elements = [];
    }
    static new() {
        return new this();
    }
    addElement(e) {
        let add = true;
        for (const ee of this.elements) {
            if (this.collide(e, ee)) {
                log('collide')
                add = false;
            }
        }
        if (add) {
            this.elements.push(e);
        }
    }
    init(n) {
        // log('scene init')
        // 乘以1.5预留因初始位置重合导致的未添加
        for (let i = 0; i < n * 1.5; i++) {
            if (this.elements.length == n) {
                return;
            }
            let e = Particle.new();
            e.init();
            this.addElement(e);
        }
    }
    draw() {
        let callback = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            // log('scene draw', this.elements);
            for (let e of this.elements) {
                e.draw();
            }
            this.update();
            window.requestAnimationFrame(callback);
        }
        window.requestAnimationFrame(callback);
    }

    update() {
        for (let i = 0; i < this.elements.length; i++) {
            const e1 = this.elements[i];
            e1.update();
            for (let j = i + 1; j < this.elements.length; j++) {
                const e2 = this.elements[j];
                if (this.collide(e1, e2)) {
                    this.momentum(e1, e2);
                }
            }
            // log('scene update', e);
        }
    }

    /**
     * 相撞
     */
    collide(o1, o2) {
        let dis = Math.sqrt(Math.pow((o1.x - o2.x), 2) + Math.pow((o1.y - o2.y), 2));
        if (dis < o1.r + o2.r) {
            return true;
        } else {
            return false;
        }
    }
    /**
     * 动量定理
     */
    momentum(o1, o2) {
        let vx = o1.vx;
        let vy = o1.vy;
        o1.vx = o2.vx;
        o1.vy = o2.vy;
        o2.vx = vx;
        o2.vy = vy;
    }
}