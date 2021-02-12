class Planet {
  constructor(distance, angle, size, speed, parent, name) {
    this.a = angle;
    this.dist = distance;
    this.size = size;
    this.speed = speed;
    this.parent = parent;
    this.children = [];
    this.fillColor = "white";
    this.strokeColor = "white";
    this.selected = false;
    if (name) {
      this.name = name;
    } else {
      this.name = "";
    }

    if (this.parent) {
      this.parent.children.push(this);
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


  }

  update(aInc) {
    this.x = this.parent.x + this.dist * Math.cos(this.a);
    this.y = this.parent.y + this.dist * Math.sin(this.a);

    if (aInc) {
      this.a += this.speed;
    }

  }


  drawOrbits() {
    ctx.strokeStyle = "rgb(30, 30, 30)";
    if (this.children) {
      for (var i = 0; i < this.children.length; i++) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.children[i].dist, 0, Math.PI*2);
        ctx.stroke();
        ctx.closePath();
      }
    }
  }

  calcPolarCoords(x, y) {
    let dx = x - this.parent.x;
    let dy = y - this.parent.y;

    this.dist =Math.sqrt(dx * dx + dy * dy);
    if (dx < 0) {
      this.a = Math.PI + Math.atan(dy / dx);
    } else {
      this.a = Math.atan(dy / dx);
    }

    console.log("awda");
  }
}


class Sun {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.children = [];
    this.fillColor = "#f6ff8b";
    this.strokeColor = "white";
    this.selected = false;
    this.name = "Sun";

  }

  draw() {
    if (moving) {
      ctx.fillStyle = "rgb(255, 255, 255, 0.05)"
    } else {
      ctx.fillStyle = this.fillColor;
    }

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
    ctx.fill();
    //ctx.stroke();
    ctx.closePath();
    ctx.lineWidth = 2 * scale;

  }

  update() {
  }

  drawOrbits() {
    ctx.strokeStyle = "rgb(30, 30, 30)";
    if (this.children) {
      for (var i = 0; i < this.children.length; i++) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.children[i].dist, 0, Math.PI*2);
        ctx.stroke();
        ctx.closePath();
      }
    }
  }
}
