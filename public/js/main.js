import SpriteSheet from './SpriteSheet.js'
import { loadImage } from './loaders.js'

const canvas = document.getElementById('screen')
const context = canvas.getContext('2d')

context.fillRect(0,0,50,50)


//loadimage invokes the promise, after promise resolves with image, use that image object/class to 
loadImage('/img/tiles.png')
.then(image => {
  const sprites = new SpriteSheet(image, 16, 16)
  sprites.define('ground', 0, 0)
  sprites.define('sky', 3, 23)
  
  
    for(let x = 0; x<25; x++) {
      for(let y=0; y<14; y++){
        sprites.drawTile('sky', context, x, y)
      }
    }
    for(let x = 0; x<25; x++) {
      for(let y=12; y<14; y++){
        sprites.drawTile('ground', context, x, y)
      }
    }
})
  
  







//LEGACY CODE - this is how we started the easy simple way to put an image from a tileSet unto the canvas. BUT so much better way
// was to make putting an image up easier with two drawImage calls. Both will be in a class called SpriteSheet. the first will be the
// crazy 8 arg polymorphic function drawImage which takes SOURCE image cut out and places it in a canvas box 0,0,16,16 as well - method DEFINE
//then simple second method DRAW takes that box out of the this.tiles which is a new Map() and called simple drawimage func x and y placement only


//look up drawImage on MDN, polymorphic (allows different rendering if you use different amount of args)
  // context.drawImage(image, 
  //   0, 0, 16, 16, 
  //   0, 0, 16, 16)