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
//vector2 keeps track of x and y
class Vector2 {
  constructor(x, y) {
    this.set(x, y)
  }
  set(x, y) {
    this.x = x
    this.y = y
  }
}
//merging different classes of vectors allows an entity to cleanly keep many different calculations
class Entity {
  constructor() {
    this.pos = new Vector2(0, 0)
    this.velocity = new Vector2(0, 0)
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
  const pos = new Vector2(16, 180)
  //when you jump (LEGACY CODE)
  // const velocity = {
  //   x:2,
  //   y:-10
  // }
  const velocity = new Vector2(2, -10)
  const gravity = 0.5
  // High level refactor for cleaner classes. Mario is now instance of Entity class, which has pos and velocity, which are instances
  // of Vector2 class, which only holds this.x and this.y
  const mario = new Entity()
  mario.pos.set(64, 180)
  mario.velocity.set(2, -10)

  //get marioSprite from loadMarioSprite() after promise.all spits it out
  const spriteLayer = createSpriteLayer(marioSprite, mario.pos)
  compositor.layers.push(spriteLayer)
  //adding a function that will update sprite drawing which will simulate movement
  function update() {
    //the draw method in compositor class calls each function stored in its layers array (closure from createBackgroundLayer)
    //curently we have pushed backgroundLayer and spriteLayer(aka mariospritelayer)
    compositor.draw(context)
    
    mario.pos.x += mario.velocity.x
    mario.pos.y += mario.velocity.y
    //basically adding gravity - we will need a boundary that stops or redraws when passed
    mario.velocity.y += gravity
    //requestAnimationFrame needs to be called inside update to keep calling update. Takes into acount users Refresh rate etc.
    requestAnimationFrame(update)
  }
  //run update INSIDE the Promise.all .THEN chain (wow what an interesting way to load parallel and call the drawing)
  update()
})