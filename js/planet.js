class Planet {
  constructor(radius, angle, size, speed, parent) {
    this.r = radius;
    this.a = angle;
    this.size = size;
    this.speed = speed;


    if (parent) {
      this.parent = parent;
      this.sun = false;
    } else {
      this.parent = {x: 0, y: 0};
      this.sun = true;
    }

    this.x = this.parent.x + this.r * Math.cos(this.a);
    this.y = this.parent.y + this.r * Math.sin(this.a);
  }

  draw() {
    ctx.strokeStyle = "white";
    ctx.fillStyle = "white";

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
    ctx.fill();
    ctx.closePath();

    if (!this.sun && orbits) {
      this.parent.drawOrbit(this.r);
    }
  }

  update() {
    this.x = this.parent.x + this.r * Math.cos(this.a);
    this.y = this.parent.y + this.r * Math.sin(this.a);
    this.a += this.speed;

  }

  drawOrbit(r) {
    ctx.strokeStyle = "white";

    ctx.beginPath();
    ctx.arc(this.x, this.y, r, 0, Math.PI*2);
    ctx.stroke();
    ctx.closePath();
  }
}
