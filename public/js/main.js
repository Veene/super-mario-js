import SpriteSheet from './SpriteSheet.js'
import { loadImage, loadLevel } from './loaders.js'
import { loadMarioSprite, loadBackgroundSprites } from './sprites.js'
import Compositor from './Compositor.js'
import { createBackgroundLayer } from './layers.js'

const canvas = document.getElementById('screen')
const context = canvas.getContext('2d')

function createSpriteLayer(sprite, pos) {
  //returns a function AKA its a closure
  return function drawSpriteLayer(context) {
    for(let i = 0; i< 20; i++) {
      //we have idle hardcoded into spritesheet.tiles Map() object //Reminder - the sprite will be instance of spritesheet so has its methods
      sprite.draw('idle', context, pos.x + i*16, pos.y)
    }
  }
}

//important to keep loading grouped, or else it becomes disjointed & load longer. and makes a janky user experience - THIS IS PARALLEL
//PROMISE.ALL for Parralel loading - 1st takes 3sec, second 2sec, so 5 if synchronous, but .all makes it 3 secs total.
Promise.all([
  loadMarioSprite(),
  loadBackgroundSprites(),
  loadLevel('1-1'),  //loadLevel is a promise. It is the data.json() promise that has the body of 1-1.json file that was fetched with FETCH API in loaders.js
]).then(([marioSprite, backgroundSprites, level]) => {
  const compositor = new Compositor()

  //we instantiating compositor, now we needed to add the background layer of '1-1', so its stored and doesnt have to be relooped each time
  //reminder that createBackgroundLayer return a function (closure) it requires a context to draw on
  const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprites)
  compositor.layers.push(backgroundLayer)

  //creating const pos to be able to move mario, originally just loaded him at 64,64, but now swapped to x, y from pos
  const pos = {
    x:16,
    y:16
  }
  //get marioSprite from loadMarioSprite() after promise.all spits it out
  const spriteLayer = createSpriteLayer(marioSprite, pos)
  compositor.layers.push(spriteLayer)
  //adding a function that will update sprite drawing which will simulate movement
  function update() {
    //the draw method in compositor class calls each function stored in its layers array (closure from createBackgroundLayer)
    //curently we have pushed backgroundLayer and spriteLayer(aka mariospritelayer)
    compositor.draw(context)
    
    pos.x += 1
    pos.y += 1
    //requestAnimationFrame needs to be called inside update to keep calling update. Takes into acount users Refresh rate etc.
    requestAnimationFrame(update)
  }
  //run update INSIDE the Promise.all .THEN chain (wow what an interesting way to load parallel and call the drawing)
  update()
})