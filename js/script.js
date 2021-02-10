const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.fillStyle = "white";
ctx.strokeStyle = "white";

let scale = 2;
let planets = [];
let orbits = true;
let playing = false;
let fullscreen = false;
let mousedown = false;
let prevX, prevY;
let selection = 0;

canvas.width = canvas.offsetWidth*scale;
canvas.height = canvas.offsetHeight*scale;

let translateX = canvas.width/2;
let translateY = canvas.height/2;


function setup() {
  ctx.translate(translateX, translateY);
  planets[0] = new Sun(0, 0, 200);
  planets[1] = new Planet(1000, 0, 100, 0.002, planets[0]);
  planets[2] = new Planet(300, 0, 25, 0.01, planets[1]);
  planets[3] = new Planet(500, 0, 25, 0.02, planets[1]);
  planets[4] = new Planet(100, 0, 10, 0.03, planets[2]);
  planets[5] = new Planet(75, 0, 10, 0.1, planets[3]);

  planetOptions = new Menu(10, 10, 400, 700, 40);

}


function draw() {
  ctx.clearRect(-translateX, -translateY, canvas.width, canvas.height);

  for (var i = 0; i < planets.length; i++) {
    if (playing) {
      planets[i].update();
    }
    planets[i].draw();
  }

  if (selection != null) {
    planetOptions.show();
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
  ctx.translate(translateX, translateY);
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

    ctx.translate(-dx, -dy)

    translateX += -dx;
    translateY += -dy;

    prevX = e.offsetX * scale;
    prevY = e.offsetY * scale;
  }
}

setup();
draw();

canvas.addEventListener("click", e => {
  let mouseX = e.offsetX * scale - translateX;
  let mouseY = e.offsetY * scale - translateY;
  let planetX, planetY, planetSize;

  for (var i = 0; i < planets.length; i++) {
    planets[i].strokeColor = "white";
    planets[i].fillColor = "white";
  }

  for (var i = 0; i < planets.length; i++) {
    planetX = planets[i].x;
    planetY = planets[i].y;
    planetSize = planets[i].size;

    if (mouseX > planetX - planetSize && mouseX < planetX + planetSize && mouseY > planetY - planetSize && mouseY < planetY + planetSize) {
      planets[i].fillColor = "grey";
      selection = i;
      return;
    }
  }
  selection = null;
  return;
})

canvas.addEventListener("mousemove", e => {
   drag(e);

   let mouseX = e.offsetX * scale - translateX;
   let mouseY = e.offsetY * scale - translateY;
   let planetX, planetY, planetSize;

   for (var i = 0; i < planets.length; i++) {
     planetX = planets[i].x;
     planetY = planets[i].y;
     planetSize = planets[i].size;

     if (mouseX > planetX - planetSize && mouseX < planetX + planetSize && mouseY > planetY - planetSize && mouseY < planetY + planetSize && planets[i].fillColor != "grey") {
       planets[i].fillColor = "lightgrey";

     } else if (planets[i].fillColor != "grey") {
       planets[i].fillColor = "white";
     }
   }

 });


canvas.addEventListener("mousedown", e => {
  if (e.button == 1) {
    mousedown = true;
    prevX = e.offsetX * scale;
    prevY = e.offsetY * scale;
    document.getElementById("canvas").style.cursor = "grab";
  }
});

document.addEventListener("mouseup", () => {
  mousedown = false;
  document.getElementById("canvas").style.cursor = "default";
});

canvas.addEventListener("dblclick", toggleFullscreen)
document.addEventListener("fullscreenchange", canvasRefresh);
window.addEventListener("resize", canvasRefresh);

document.addEventListener("keydown", e => {
  switch (e.key) {
    case " ":
      playing = !playing;
      break;
    case "o":
      orbits = !orbits;
      break;
    default:
      break;
  }
});

canvas.addEventListener("wheel", e => {
  if (e.deltaY < 0 && scale > 1.2) {
    scale -= 0.2;
    canvasRefresh();
  } else if (e.deltaY > 0 && scale <= 5) {
    scale += 0.2;
    canvasRefresh();
  }

  if (mousedown) {
    prevX = e.offsetX * scale;
    prevY = e.offsetY * scale;
  }
});
