const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.fillStyle = "white";
ctx.strokeStyle = "white";

let scale = 2;
let planets = [];
let orbits = true;
let playing = true;
let fullscreen = false;
let mousedown = false;
let prevX, prevY;
canvas.width = canvas.offsetWidth*scale;
canvas.height = canvas.offsetHeight*scale;

function setup() {
  ctx.translate(canvas.width/2, canvas.height/2);
  planets[0] = new Sun(0, 0, 200);
  planets[1] = new Planet(1000, 0, 100, 0.002, planets[0]);
  planets[2] = new Planet(300, 0, 25, 0.01, planets[1]);
  planets[3] = new Planet(500, 0, 25, 0.02, planets[1]);
  planets[4] = new Planet(100, 0, 10, 0.03, planets[2]);
  planets[5] = new Planet(75, 0, 10, 0.01, planets[3]);

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

function canvasRefresh() {
  canvas.width = canvas.offsetWidth*scale;
  canvas.height = canvas.offsetHeight*scale;
  ctx.translate(canvas.width/2, canvas.height/2);
}


function randomFloat(min, max) {
  if (!max) {
    max = min;
    min = 0;
  } else {
    min = min;
    max = max;
  }
  return Math.random() * (max - min) + min;
}



function drag(e) {
  if (mousedown) {
    let dx = prevX - (e.offsetX * scale);
    let dy = prevY - (e.offsetY * scale);

    planets[0].x -= dx;
    planets[0].y -= dy;

    prevX = e.offsetX * scale;
    prevY = e.offsetY * scale;
  }
}

setup();
draw();

canvas.addEventListener("dblclick", toggleFullscreen)
canvas.addEventListener("mousemove", e => drag(e))

canvas.addEventListener("mousedown", e => {
  mousedown = true;
  prevX = e.offsetX * scale;
  prevY = e.offsetY * scale;
});

document.addEventListener("mouseup", () => mousedown = false);
document.addEventListener("fullscreenchange", canvasRefresh);
window.addEventListener("resize", canvasRefresh);

document.addEventListener("keydown", e => {
  if (e.key == " ") {
    playing = !playing;
  } else if (e.key == "o") {
    orbits = !orbits;
  }
})



canvas.addEventListener("wheel", e => {
  if (e.deltaY < 0 && scale > 0.5) {
    scale -= 0.2;
    canvasRefresh();
  } else if (e.deltaY > 0 && scale <= 6) {
    scale += 0.2;
    canvasRefresh();
  }
})
