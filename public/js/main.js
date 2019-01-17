import {  loadLevel } from './loaders.js'
import { loadMarioSprite, loadBackgroundSprites } from './sprites.js'
import Compositor from './Compositor.js'
import { createBackgroundLayer, createSpriteLayer } from './layers.js'
import Entity from './Entity.js'
import { createMario } from './entities.js'

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
  // compositor.layers.push(backgroundLayer)

  const gravity = 0.5

  //get marioSprite from loadMarioSprite() after promise.all spits it out LEGACY
  //NEW - now we add mario object/entity instead of marioSprite
  const spriteLayer = createSpriteLayer(mario)
  compositor.layers.push(spriteLayer)
  //adding a function that will update sprite drawing which will simulate movement
  function update() {
    //the draw method in compositor class calls each function stored in its layers array (closure from createBackgroundLayer)
    //curently we have pushed backgroundLayer and spriteLayer(aka mariospritelayer)
    compositor.draw(context)
    
    mario.update()
    //basically adding gravity - we will need a boundary that stops or redraws when passed
    mario.velocity.y += gravity
    //requestAnimationFrame needs to be called inside update to keep calling update. Takes into acount users Refresh rate etc.
    // requestAnimationFrame(update)
    setTimeout(update, 1000/5)
  }
  //run update INSIDE the Promise.all .THEN chain (wow what an interesting way to load parallel and call the drawing)
  update()
})