class Planet {
  constructor(distance, angle, size, speed, parent) {
    this.a = angle;
    this.dist = distance;
    this.size = size;
    this.speed = speed;
    this.parent = parent;
    this.children = [];
    this.fillColor = "white";
    this.strokeColor = "white";
    this.selected = "false"

    if (this.parent) {
      this.parent.children.push(this)
    }

    this.x = this.parent.x + this.dist * Math.cos(this.a);
    this.y = this.parent.y + this.dist * Math.sin(this.a);
  }

  draw() {
    ctx.strokeStyle = this.strokeColor;
    ctx.fillStyle = this.fillColor;

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
    ctx.fill();
    //ctx.stroke();
    ctx.closePath();

    ctx.lineWidth = 2 * scale;

    if (this.children && orbits) {
      for (var i = 0; i < this.children.length; i++) {
        this.drawOrbit(this.children[i].dist);
      }
    }
  }

  update() {
    this.x = this.parent.x + this.dist * Math.cos(this.a);
    this.y = this.parent.y + this.dist * Math.sin(this.a);
    this.a += this.speed;

  }


  drawOrbit(dist) {
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";

    ctx.beginPath();
    ctx.arc(this.x, this.y, dist, 0, Math.PI*2);
    ctx.stroke();
    ctx.closePath();
  }
}


class Sun {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.children = [];
    this.fillColor = "white";
    this.strokeColor = "white";

  }

  draw() {
    ctx.strokeStyle = this.strokeColor;
    ctx.fillStyle = this.fillColor;

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
    ctx.fill();
    //ctx.stroke();
    ctx.closePath();

    ctx.lineWidth = 2 * scale;

    if (this.children && orbits) {
      for (var i = 0; i < this.children.length; i++) {
        this.drawOrbit(this.children[i].dist);
      }
    }
  }

  update() {
  }

  drawOrbit(dist) {
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";

    ctx.beginPath();
    ctx.arc(this.x, this.y, dist, 0, Math.PI*2);
    ctx.stroke();
    ctx.closePath();
  }
}
