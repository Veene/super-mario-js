import Level from './Level.js'
import { createBackgroundLayer, createSpriteLayer } from './layers.js'
import { loadBackgroundSprites } from './sprites.js'

export function loadImage(url) {
  return new Promise(resolve => {
    //starts with a promise that will only be resolved once 'load' eventlistener pops - which will require an image call (With.src)
    //makes new instance of class Image
    const image = new Image()
    //add eventlistener that will pop once image loaded
    image.addEventListener('load', () => {
      //can be used to fake delay, returns image with resolve. Can also use resolve(image)
      setTimeout(resolve, 0, image)
    })
    //image.src triggers the addEventListener to resolve, because it basically forces the image to load
    image.src = url
  }).catch((err) => console.log(err))
}

function createTiles(level, backgrounds) {
  backgrounds.forEach(background => {
    background.ranges.forEach(([x1, x2, y1, y2]) => {
      for(let x = x1; x < x2; x++) {
        for(let y = y1; y < y2; y++){
          //coming from matrix class
          level.tiles.set(x, y, { name: background.tile })
        }
      }
    })
  })
}


export function loadLevel(name){
  return Promise.all([
    fetch(`/levels/${name}.json`)
    .then((data) => data.json()),

    loadBackgroundSprites()
  ])
 .then(([levelSpec, backgroundSprite]) => {
   console.log(levelSpec.backgrounds) // [0: {tile,range} , 1:{tile,range}]
    const level = new Level()

    createTiles(level, levelSpec.backgrounds)

    const backgroundLayer = createBackgroundLayer(level, backgroundSprite)
    level.comp.layers.push(backgroundLayer)
    //get marioSprite from loadMarioSprite() after promise.all spits it out LEGACY
    //NEW - now we add mario object/entity instead of marioSprite
    const spriteLayer = createSpriteLayer(level.entities)
    level.comp.layers.push(spriteLayer)

    console.log(level.tiles.grid)

    return level
  })
}