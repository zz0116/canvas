const main = () => {
    const universe = Universe.new();

    let s1 = Star.new(250, 300, 30);
    let s2 = Star.new(550, 300, 25);
    // x, y, r, vx, vy, star
    let p7 = Planet.new(400, 300, 10, 2, 2.8);
    
    universe.addStar(s1);
    universe.addStar(s2);
    universe.addPlanet(p7);
    p7.addStar(s1);
    p7.addStar(s2);

    //TODO, 如何做双星甚至多星系统？
    universe.draw();
}

main();