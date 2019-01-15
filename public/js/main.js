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

const canvas = document.getElementById('screen')
const context = canvas.getContext('2d')

//loadimage invokes the promise, after promise resolves with image, use that image object/class to 
loadImage('/img/tiles.png')
.then(image => {
  const sprites = new SpriteSheet(image, 16, 16)
  sprites.define('ground', 0, 0)
  sprites.define('sky', 3, 23)
  //now that we've used the spritesheet define method and added ground and sky to the MAP object (sprites.tiles)

  //loadLevel is a promise. It is the data.json() promise that has the body of 1-1.json file that was fetched with FETCH API in loaders.js
  loadLevel('1-1').then((data) => {
    console.log(data)
    drawBackground(data.backgrounds[0], context, sprites)
    drawBackground(data.backgrounds[1], context, sprites)
  })

  
  // for(let x = 0; x<25; x++) {
  //   for(let y=12; y<14; y++){
  //     sprites.drawTile('ground', context, x, y)
  //   }
  // }
})


  







//LEGACY CODE - this is how we started the easy simple way to put an image from a tileSet unto the canvas. BUT so much better way
// was to make putting an image up easier with two drawImage calls. Both will be in a class called SpriteSheet. the first will be the
// crazy 8 arg polymorphic function drawImage which takes SOURCE image cut out and places it in a canvas box 0,0,16,16 as well - method DEFINE
//then simple second method DRAW takes that box out of the this.tiles which is a new Map() and called simple drawimage func x and y placement only


//look up drawImage on MDN, polymorphic (allows different rendering if you use different amount of args)
  // context.drawImage(image, 
  //   0, 0, 16, 16, 
  //   0, 0, 16, 16)