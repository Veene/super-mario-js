import {  loadLevel } from './loaders.js'
import { loadMarioSprite, loadBackgroundSprites } from './sprites.js'
import Compositor from './Compositor.js'
import { createBackgroundLayer, createSpriteLayer } from './layers.js'
import Entity from './Entity.js'
import { createMario } from './entities.js'
import Timer from './Timer.js'

window.addEventListener('keydown', event => {
  event.preventDefault()
  console.log(event)
})

const canvas = document.getElementById('screen')
const context = canvas.getContext('2d')


//important to keep loading grouped, or else it becomes disjointed & load longer. and makes a janky user experience - THIS IS PARALLEL
//PROMISE.ALL for Parralel loading - 1st takes 3sec, second 2sec, so 5 if synchronous, but .all makes it 3 secs total.
Promise.all([
  createMario(),
  loadBackgroundSprites(),
  loadLevel('1-1'),  //loadLevel is a promise. It is the data.json() promise that has the body of 1-1.json file that was fetched with FETCH API in loaders.js
]).then(([mario, backgroundSprites, level]) => {
  const compositor = new Compositor()

  //we instantiating compositor, now we needed to add the background layer of '1-1', so its stored and doesnt have to be relooped each time
  //reminder that createBackgroundLayer return a function (closure) it requires a context to draw on
  const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprites)
  compositor.layers.push(backgroundLayer)

  const gravity = 2000
  mario.pos.set(64, 180)
  mario.velocity.set(200, -600)

  //get marioSprite from loadMarioSprite() after promise.all spits it out LEGACY
  //NEW - now we add mario object/entity instead of marioSprite
  const spriteLayer = createSpriteLayer(mario)
  compositor.layers.push(spriteLayer)
  //adding a function that will update sprite drawing which will simulate movement
  const timer = new Timer(1/60)
  timer.update = function update(deltaTime) {
      
      mario.update(deltaTime)
      //the draw method in compositor class calls each function stored in its layers array (closure from createBackgroundLayer)
      //curently we have pushed backgroundLayer and spriteLayer(aka mariospritelayer)
      compositor.draw(context)

      // console.log(mario.pos)
      //basically adding gravity - we will need a boundary that stops or redraws when passed
      mario.velocity.y += gravity * deltaTime
    }
    
    //requestAnimationFrame needs to be called inside update to keep calling update. Takes into acount users Refresh rate etc.
    // requestAnimationFrame(update)
    
  //run update INSIDE the Promise.all .THEN chain (wow what an interesting way to load parallel and call the drawing)
  //we have to give update a number 0 here because otherwise time is called with undefined and causes NaN
  timer.start()
})