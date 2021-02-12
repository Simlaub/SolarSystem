const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const planetOptions = document.getElementById("planetOptions");
ctx.fillStyle = "white";
ctx.strokeStyle = "white";

let scale = 2;
let planets = [];
let orbits = true;
let playing = false;
let fullscreen = false;
let mousedown = false;
let prevX, prevY;
let selection;

canvas.width = canvas.offsetWidth*scale;
canvas.height = canvas.offsetHeight*scale;

let translateX = canvas.width/2;
let translateY = canvas.height/2;



//toggles fullscreen
function toggleFullscreen() {
  if (!fullscreen) {
    document.getElementById("body").requestFullscreen();
    document.getElementById("fullscreen").style.backgroundImage = "url(./textures/exitFullscreen.png)";
  } else {
    document.exitFullscreen();
    document.getElementById("fullscreen").style.backgroundImage = "url(./textures/enterFullscreen.png)";
  }
  fullscreen = !fullscreen;
}

//changes the canvas pixel count to match its real pixel count (times the scale) also translates back to the center
function canvasRefresh() {
  canvas.width = canvas.offsetWidth*scale;
  canvas.height = canvas.offsetHeight*scale;
  ctx.translate(translateX, translateY);
}

//returns a random float between min and max (if only one arg: 0 and max)
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


//adds drag functionality (takes a mouseEvent)
function drag(e) {
  if (mousedown) {
    let dx = prevX - (e.offsetX * scale);
    let dy = prevY - (e.offsetY * scale);

    ctx.translate(-dx, -dy)

    //keeps track of the total translation X and Y
    translateX += -dx;
    translateY += -dy;

    prevX = e.offsetX * scale;
    prevY = e.offsetY * scale;
  }
}

//checks if mouse position is over one of the planets (takes a mouse event) => returns index of the planet the mouse us over
function mouseOnPlanet(e) {
  let mouseX = e.offsetX * scale - translateX;
  let mouseY = e.offsetY * scale - translateY;
  let planetX, planetY, planetSize;

  for (var i = 0; i < planets.length; i++) {
    planetX = planets[i].x;
    planetY = planets[i].y;
    planetSize = planets[i].size;

    if (mouseX > planetX - planetSize && mouseX < planetX + planetSize && mouseY > planetY - planetSize && mouseY < planetY + planetSize && planets[i].fillColor != "grey") {
      return i;
    }
  }
  return undefined;
}

//activates toggleFullscreen on double click on canvas
canvas.addEventListener("dblclick", toggleFullscreen);
//refreshes the canvas on fullscreenchange
document.addEventListener("fullscreenchange", canvasRefresh);
//refreshes the canvas on window resize
window.addEventListener("resize", canvasRefresh);

//checks if mouse position is inside of a planet => if so it makes it planet another color
canvas.addEventListener("click", e => {
  let index = mouseOnPlanet(e);

  //selected planet gets reset
  for (var i = 0; i < planets.length; i++) {
    if (planets[i].selected) {
      planets[i].fillColor = "white";
      planets[i].selected = false;
    }
  }

  //new planet gets selected
  if (index + 1) {
    planets[index].fillColor = "grey";
    planets[index].selected = true;
  }
  selection = index;
})

//Activates drag function and checks if mouse position is inside of a planet => if so it makes it planet another color
document.addEventListener("mousemove", e => {
   drag(e);
   let index = mouseOnPlanet(e);

   for (var i = 0; i < planets.length; i++) {
     if (!planets[i].selected) {
       planets[i].fillColor = "white";
     }
   }

   if (index + 1) {
     planets[index].fillColor = "lightgrey";
   }


 });

//if mouse 3 is pressed prevX and prevY are set to initiate draging
document.addEventListener("mousedown", e => {
  if (e.button == 1) {
    mousedown = true;
    prevX = e.offsetX * scale;
    prevY = e.offsetY * scale;
    body.style.cursor = "grab";
  }
});

//sets mousedown variable to false and resets the cursor style
document.addEventListener("mouseup", () => {
  mousedown = false;
  body.style.cursor = "default";
});

//toggles animation and orbits
document.addEventListener("keyup", e => {
  switch (e.key) {
    case " ":
      if (playing) {
        document.getElementById("play").style.backgroundImage = "url(./textures/play.png)";
      } else {
        document.getElementById("play").style.backgroundImage = "url(./textures/pause.png)";
      }
      playing = !playing;
      break;
    case "o":
      orbits = !orbits;
      break;
    default:
      break;
  }
});

//adds custom zoom functionality
canvas.addEventListener("wheel", e => {
  //checks scroll direction
  if (e.deltaY < 0 && canvas.width > canvas.offsetWidth && !e.ctrlKey) {
    scale -= 0.2;
    canvasRefresh();
  } else if (e.deltaY > 0 && canvas.width < canvas.offsetWidth*4 && !e.ctrlKey) {
    scale += 0.2;
    canvasRefresh();
  }

  //fixes problem with draging whilst zooming by resetting prevX and prevY
  if (mousedown) {
    prevX = e.offsetX * scale;
    prevY = e.offsetY * scale;
  }
});

//toolbar buttons
document.getElementById("fullscreen").addEventListener("click", toggleFullscreen);
document.getElementById("play").addEventListener("click", () => {
  if (playing) {
    document.getElementById("play").style.backgroundImage = "url(./textures/play.png)";
  } else {
    document.getElementById("play").style.backgroundImage = "url(./textures/pause.png)";
  }
  playing = !playing
})
document.getElementById("orbits").addEventListener("click", () => orbits = !orbits);
