export default class TileResolver {
  constructor(matrix, tileSize=16) {
    this.matrix = matrix
    this.tileSize = tileSize
  }
  //this will let us know which x and y square (16x16) mario currently is or is touching. TECHINICALLY NOT though because it makes the
  // grid, which is...
  toIndex(pos) {
    return Math.floor(pos / this.tileSize)
  }
  toIndexRange(pos1, pos2) {
    //max search range
    const pMax = Math.ceil(pos2 / this.tileSize) * this.tileSize
    const range = []
    let pos = pos1
    while (pos < pMax) {
      range.push(this.toIndex(pos))
      pos += this.tileSize
    }
    return range

  }
  getByIndex(indexX, indexY) {
    const tile = this.matrix.get(indexX, indexY)
    if(tile) {
      const x1 = indexX * this.tileSize
      const x2 = x1 + this.tileSize
      const y1 = indexY * this.tileSize
      const y2 = y1 + this.tileSize
      return {
        tile: tile,
        x1,
        x2, 
        y1: y1,
        y2: y2,
      }
    }
  }
  //the method I needed - to get X and Y on the tile grid
  searchByPosition(posX, posY) {
    return this.getByIndex(this.toIndex(posX), this.toIndex(posY))
  }
  searchByRange(x1, x2, y1, y2) {
    const matches = []
    this.toIndexRange(x1, x2).forEach(indexX => {
      this.toIndexRange(y1, y2).forEach(indexY => {
        const match = this.getByIndex(indexX, indexY)
        if(match) {
          matches.push(match)
        }
      })
    })
    return matches
  }
}

window.TileResolver = TileResolver