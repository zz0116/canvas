class Universe {
    constructor() {
        // log('canvas new')
        this.canvas = $("#id-canvas-1");
        this.ctx = this.canvas.getContext("2d");
        this.planets = [];
        this.stars = [];
        this.G = 1.2;
    }
    static new() {
        return new this();
    }
    addPlanet(p) {
        this.planets.push(p);
    }
    addStar(s) {
        this.planets.push(s);
    }
    draw() {
        let callback = () => {
            let ctx = this.ctx;
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.stars.forEach(s => {
                s.draw();
            });
            this.planets.forEach(e => {
                e.draw();
            });
            setTimeout(callback, 1000 / 60);
        }
        callback();
    }
    update() {

    }
}