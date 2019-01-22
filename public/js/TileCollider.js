import TileResolver from './TileResolver.js'

export default class TileCollider {
  constructor(tileMatrix) {
    this.tiles = new TileResolver(tileMatrix) 

  }
  checkX(entity) {
    let x
    //algorithm for collision
    if(entity.vel.x > 0) {
      x = entity.pos.x + entity.size.x
    } else if(entity.vel.x < 0) {
      x = entity.pos.x
    } else {
      return 
    }
    const matches = this.tiles.searchByRange(
      x, x,
      entity.pos.y, entity.pos.y + entity.size.y)

    matches.forEach(match => {
      //youre on the sky, no collision
      if(match.tile.name !== 'ground'){
        return
      }
      //return if collide with tile from falling down to up
      if(entity.vel.x > 0) {
        if(entity.pos.x + entity.size.x > match.x1) {
          entity.pos.x = match.x1 - entity.size.x
          entity.vel.x = 0
        }
        //return if collide with tile from jumping up and hitting head into tile
      } else if(entity.vel.x < 0) {
        if(entity.pos.x < match.x2) {
          entity.pos.x = match.x2
          entity.vel.x = 0
        }
      }
    })
  }
  checkY(entity) {
    let y
    if(entity.vel.y > 0) {
      y = entity.pos.y + entity.size.y
    } else if(entity.vel.y < 0) {
      y = entity.pos.y
    } else {
      return
    }
    const matches = this.tiles.searchByRange(
      entity.pos.x, entity.pos.x + entity.size.x,
      y, y)

    matches.forEach(match => {
      //youre on the sky, no collision
      if(match.tile.name !== 'ground'){
        return
      }
      //return if collide with tile from falling down to up
      if(entity.vel.y > 0) {
        if(entity.pos.y + entity.size.y > match.y1) {
          entity.pos.y = match.y1 - entity.size.y
          entity.vel.y = 0
        }
        //return if collide with tile from jumping up and hitting head into tile
      } else if(entity.vel.y < 0) {
        if(entity.pos.y < match.y2) {
          entity.pos.y = match.y2
          entity.vel.y = 0
        }
      }
    })
  }
  test(entity) {
    this.checkY(entity)
    // const match = this.tiles.matchByPosition(entity.pos.x, entity.pos.y)
    // if(match) {
    //   console.log('Mathched tile: ', match, match.tile)
    // }
  }
}