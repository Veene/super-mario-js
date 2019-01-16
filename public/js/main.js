import SpriteSheet from './SpriteSheet.js'
import { loadImage, loadLevel } from './loaders.js'

//background is the data.json() we get back from loadLevel(call with data.background)
function drawBackground(background, context, sprites) {
  //we are destructuring the 4 numbers in range that we have in all level.json files
  //REMEMBER forEach is not calling through x1,x2,y1,y2, its calling the RANGES, so inside each range we destructure!! 
  //We could write foreach(range) => x1 = range[0] x2 = range[1] y1 = range[2] y2 = range[3]
  background.ranges.forEach(([x1, x2, y1, y2]) => {
    for(let x = x1; x < x2; x++) {
      for(let y = y1; y < y2; y++){
        sprites.drawTile(background.tile, context, x, y)
      }
    }
  })
}
function loadMarioSprite() {
  //loadimage invokes the promise, after promise resolves with image after 2000ms, use that image(tileset) with spritesheet
  return loadImage('/img/characters.gif')
  .then(image => {
    const sprites = new SpriteSheet(image, 16, 16)
    sprites.define('idle', 17, 3)
    //now that we've used the spritesheet define method and added ground and sky to the MAP object (sprites.tiles) IMPORTANT STEP
    return sprites
  })
}

function loadBackgroundSprites() {
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

const canvas = document.getElementById('screen')
const context = canvas.getContext('2d')

//important to keep loading grouped, or else it becomes disjointed & load longer. and makes a janky user experience - THIS IS PARALLEL
//PROMISE.ALL for Parralel loading - 1st takes 3sec, second 2sec, so 5 if synchronous, but .all makes it 3 secs total.
Promise.all([
  loadMarioSprite(),
  loadBackgroundSprites(),
  loadLevel('1-1'),  //loadLevel is a promise. It is the data.json() promise that has the body of 1-1.json file that was fetched with FETCH API in loaders.js
]).then(([marioSprite, sprites, level]) => {
  level.backgrounds.forEach((background) => {
    drawBackground(background, context, sprites)
  })
  marioSprite.draw('idle', context, 64, 64)
})



  


  







//LEGACY CODE - this is how we started the easy simple way to put an image from a tileSet unto the canvas. BUT so much better way
// was to make putting an image up easier with two drawImage calls. Both will be in a class called SpriteSheet. the first will be the
// crazy 8 arg polymorphic function drawImage which takes SOURCE image cut out and places it in a canvas box 0,0,16,16 as well - method DEFINE
//then simple second method DRAW takes that box out of the this.tiles which is a new Map() and called simple drawimage func x and y placement only


//look up drawImage on MDN, polymorphic (allows different rendering if you use different amount of args)
  // context.drawImage(image, 
  //   0, 0, 16, 16, 
  //   0, 0, 16, 16)