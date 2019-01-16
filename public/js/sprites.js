import { loadImage } from './loaders.js'
import SpriteSheet from './SpriteSheet.js'

export function loadMarioSprite() {
  //loadimage invokes the promise, after promise resolves with image after 2000ms, use that image(tileset) with spritesheet
  return loadImage('/img/characters.gif')
  .then(image => {
    const sprites = new SpriteSheet(image, 16, 16)
    sprites.define('idle', 276, 44, 16,16)
    //now that we've used the spritesheet define method and added ground and sky to the MAP object (sprites.tiles) IMPORTANT STEP
    return sprites
  })
}

export function loadBackgroundSprites() {
  //loadimage invokes the promise, after promise resolves with image after 2000ms, use that image(tileset) with spritesheet
  return loadImage('/img/tiles.png')
  .then(image => {
    const sprites = new SpriteSheet(image, 16, 16)
    sprites.defineTile('ground', 0, 0)
    sprites.defineTile('sky', 3, 23)
    //now that we've used the spritesheet define method and added ground and sky to the MAP object (sprites.tiles) IMPORTANT STEP
    return sprites
  })
}