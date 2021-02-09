class Planet {
  constructor(distance, angle, size, speed, parent) {
    this.dist = distance;
    this.a = angle;
    this.size = size;
    this.speed = speed;
    this.parent = parent;
    this.children = [];
    this.color = "white";

    if (this.parent) {
      this.parent.children.push(this)
    }

    this.x = this.parent.x + this.dist * Math.cos(this.a);
    this.y = this.parent.y + this.dist * Math.sin(this.a);
  }

  draw() {
    ctx.strokeStyle = "white";
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
    ctx.fill();
    ctx.closePath();

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
    ctx.strokeStyle = "white";

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
    this.color = "white";

  }

  draw() {
    ctx.strokeStyle = "white";
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
    ctx.fill();
    ctx.closePath();

    if (this.children && orbits) {
      for (var i = 0; i < this.children.length; i++) {
        this.drawOrbit(this.children[i].dist);
      }
    }
  }

  update() {
  }

  drawOrbit(dist) {
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.arc(this.x, this.y, dist, 0, Math.PI*2);
    ctx.stroke();
    ctx.closePath();
  }
}
