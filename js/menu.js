class Menu {
  //takes coords regardless  of translate
  constructor(x, y, width, height, fontSize, text) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.fontSize = fontSize;
    this.text = text;

  }

  draw() {
    ctx.fillStyle = "rgba(100, 100, 100, 0.9)";
    ctx.strokeStyle = "rgb(50, 50, 50)";
    ctx.lineWidth = 2 * scale;


    ctx.save();
    ctx.translate(-translateX, -translateY);

    ctx.beginPath();
    ctx.rect(this.x * scale, this.y * scale, this.width * scale, this.height * scale);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    ctx.fillStyle = "white";
    ctx.font = "" + this.fontSize * scale + "px Helvetica";


    ctx.beginPath();
    ctx.fillText("Index: "+ selection, this.x * scale + this.fontSize / 2 * scale, this.y * scale + this.fontSize * scale);
    ctx.fillText("X:"+parseInt(this.planet.x)+"  Y:"+parseInt(-this.planet.y), this.x * scale + this.fontSize / 2 * scale, this.y * scale + this.fontSize * 2 * scale)


    ctx.restore();
  }

  show() {
    this.update();
    this.draw();
  }

  update() {
    this.planet = planets[selection];
  }
}
