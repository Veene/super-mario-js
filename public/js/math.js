//vector2 keeps track of x and y and is used inside of Entity to make up each entities pos and velocity
export class Vector2 {
  constructor(x, y) {
    this.set(x, y)
  }
  set(x, y) {
    this.x = x
    this.y = y
  }
}