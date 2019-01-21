export class Matrix {
  constructor() {
    this.grid = []
  }
  forEach(callback) {
    this.grid.forEach((column, x) => {
      column.forEach((value, y) => {
        callback(value, x, y)
      })
    })
  }
  //get will be grabbing the value at this.grid[x][y] => ex: 'ground'
  get(x, y) {
    const col = this.grid[x]
    if(col) {
      return col[y]
    }
    return undefined
  }
  //if not exist, make array for the x position in this.grid, then at that x pos make another grid array at y pos and set it to value
  set(x, y, value) {
    if(!this.grid[x]) {
      this.grid[x] = []
    }
    this.grid[x][y] = value
  }
}

window.Matrix = Matrix

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
