class Punto {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.type = 1;
  }

  draw() {
    push();
    strokeWeight(3);
    if (this.type === 1) stroke(255, 0, 0);
    else stroke(0, 255, 0);
    point(this.x, this.y);
    pop();
  }
}
