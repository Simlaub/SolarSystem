function setup() {
  ctx.translate(translateX, translateY);
  planets[0] = new Sun(0, 0, 200);
  planets[1] = new Planet(1000, 0, 100, 0.002, planets[0]);
  planets[2] = new Planet(300, 0, 25, 0.01, planets[1]);
  planets[3] = new Planet(500, 0, 25, 0.02, planets[1]);
  planets[4] = new Planet(100, 0, 10, 0.03, planets[2]);
  planets[5] = new Planet(75, 0, 10, 0.1, planets[3]);

}


function draw() {
  ctx.clearRect(-translateX, -translateY, canvas.width, canvas.height);

  for (var i = 0; i < planets.length; i++) {
    if (playing) {
      planets[i].update();
    }
    planets[i].draw();
  }

  if (selection != undefined) {
    planetOptions.style.display = "grid";
  } else {
    planetOptions.style.display = "none";
  }

  requestAnimationFrame(draw);
}

setup();
draw();
