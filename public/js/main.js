import SpriteSheet from './SpriteSheet.js'
import { loadImage, loadLevel } from './loaders.js'
import { loadMarioSprite, loadBackgroundSprites } from './sprites.js'
import Compositor from './Compositor.js'
import { createBackgroundLayer } from './layers.js'
import Entity from './Entity.js'

const canvas = document.getElementById('screen')
const context = canvas.getContext('2d')

function createSpriteLayer(entity) {
  //returns a function AKA its a closure
  return function drawSpriteLayer(context) {
    entity.draw(context)
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

  //creating const pos to be able to move mario, (LEGACY CODE)
  // const pos = {
  //   x:16,
  //   y:180
  // }
  // NEW way to create a class to hold these values (nicer)
  // const pos = new Vector2(16, 180)
  //when you jump (LEGACY CODE)
  // const velocity = {
  //   x:2,
  //   y:-10
  // }
  // const velocity = new Vector2(2, -10)
  const gravity = 0.5
  // High level refactor for cleaner classes. Mario is now instance of Entity class, which has pos and velocity, which are instances
  // of Vector2 class, which only holds this.x and this.y
  const mario = new Entity()
  mario.pos.set(64, 180)
  mario.velocity.set(2, -10)
  //moved mario.pos.x and y from the update() function and put it directly into the mario entity. Instead of writing mario.pos.x +=, you
  //can write this.pos.x, because when you add a function to object you get access to this. mario.update = function
  mario.update = function updateMario() {
    this.pos.x += this.velocity.x
    this.pos.y += this.velocity.y
  }
  mario.draw = function drawMario() {
    //referencing marioSprite from promise.all return of loadMarioSprite()
    marioSprite.draw('idle', context, this.pos.x, this.pos.y)
  }
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
    requestAnimationFrame(update)
  }
  //run update INSIDE the Promise.all .THEN chain (wow what an interesting way to load parallel and call the drawing)
  update()
})