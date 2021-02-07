const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let scale = 1;

canvas.width = canvas.offsetWidth*scale;
canvas.height = canvas.offsetHeight*scale;

ctx.fillStyle = "white";
ctx.strokeStyle = "white";

let planets = [];
let orbits = true;
let playing = false;
let fullscreen = false;

function setup() {
  ctx.translate(canvas.width/2, canvas.height/2);
  planets[0] = new Planet(0, 0, 50, 0)
  planets[1] = new Planet(500, 0, 20, 0.001, planets[0]);
  planets[2] = new Planet(200, 0, 15, 0.01, planets[1]);
  planets[3] = new Planet(40, 0, 5, 0.02, planets[2]);
  planets[4] = new Planet(350, 0, 25, 0.005, planets[1]);
  planets[5] = new Planet(75, 0, 5, 0.02, planets[4])
}


function draw() {
  ctx.clearRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height);

  for (var i = 0; i < planets.length; i++) {
    if (playing) {
      planets[i].update();
    }
    planets[i].draw();
  }

  requestAnimationFrame(draw);
}

function toggleFullscreen() {
  if (!fullscreen) {
    canvas.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
  fullscreen = !fullscreen;
}

setup();
draw();

canvas.addEventListener("dblclick", e => toggleFullscreen())

document.addEventListener("fullscreenchange", () => {
  canvas.width = canvas.offsetWidth*scale;
  canvas.height = canvas.offsetHeight*scale;
  ctx.translate(canvas.width/2, canvas.height/2);
})

document.addEventListener("keydown", e => {
  if (e.key == "+" && scale > 1) {
    scale -= 0.05;
    canvas.width = canvas.offsetWidth*scale;
    canvas.height = canvas.offsetHeight*scale;
    ctx.translate(canvas.width/2, canvas.height/2);
  } else if (e.key == "-" && scale <= 10) {
    scale += 0.05;

    canvas.width = canvas.offsetWidth*scale;
    canvas.height = canvas.offsetHeight*scale;
    ctx.translate(canvas.width/2, canvas.height/2);
  } else if (e.key == " ") {
    playing = !playing;
  } else if (e.key == "o") {
    orbits = !orbits;
  }
})
