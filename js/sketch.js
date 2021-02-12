function setup() {
  ctx.translate(translateX, translateY);
  sun = new Sun(0, 0, 200);
  planets[0] = new Planet(1000, 0, 100, 0.002, sun);
  planets[1] = new Planet(300, 0, 25, 0.01, planets[0]);
  planets[2] = new Planet(500, 0, 25, 0.02, planets[0]);
  planets[3] = new Planet(100, 0, 10, 0.03, planets[1]);
  planets[4] = new Planet(75, 0, 10, 0.1, planets[2]);

}


function draw() {
  ctx.clearRect(-translateX, -translateY, canvas.width, canvas.height);

  if (orbits) {
    for (var i = 0; i < planets.length; i++) {
      planets[i].update(playing);
      planets[i].drawOrbits();
    }
  }

  sun.update(playing);
  sun.drawOrbits()

  for (var i = 0; i < planets.length; i++) {
    planets[i].draw();
  }

  sun.draw();

  updateMenu();

  requestAnimationFrame(draw);
}

setup();
draw();
