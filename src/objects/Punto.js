class Punto {
  constructor(x, y, type = 0) {
    this.x = x;
    this.y = y;
    this.type = type;
  }

  draw() {
    push();
    strokeWeight(3);
    stroke(50);
    if(this.type === 1)stroke(255, 0, 0);
    if(this.type === 2)stroke(0, 255, 0);
    point(this.x, this.y);
    pop();
  }

  getCoords = () => [this.x, this.y];

  set(prop, value){
    return this[prop] = value;
  }
}
