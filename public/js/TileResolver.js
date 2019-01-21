export default class TileResolver {
  constructor(matrix, tileSize=16) {
    this.matrix = matrix
    this.tileSize = tileSize
  }
  //this will let us know which x and y square (16x16) mario currently is or is touching
  toIndex(pos) {
    return Math.floor(pos / this.tileSize)
  }
  getByIndex(indexX, indexY) {
    const tile = this.matrix.get(indexX, indexY)
    if(tile) {
      const y1 = indexY * this.tileSize
      return {
        tile: tile, 
        y1: y1,
      }
    }
  }
  //the method I needed - to get X and Y on the tile grid
  matchByPosition(posX, posY) {
    return this.getByIndex(this.toIndex(posX), this.toIndex(posY))
  }
}

window.TileResolver = TileResolver