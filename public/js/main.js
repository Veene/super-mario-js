import SpriteSheet from './SpriteSheet.js'
import { loadImage, loadLevel } from './loaders.js'
import { loadMarioSprite, loadBackgroundSprites } from './sprites.js'

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
  //creating const pos to be able to move mario, originally just loaded him at 64,64, but now swapped to x, y from pos
  const pos = {
    x:64,
    y:64
  }
  //adding a function that will update sprite drawing which will simulate movement
  function update() {
    marioSprite.draw('idle', context, pos.x, pos.y)
    pos.x += 2
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