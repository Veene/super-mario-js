import {  loadLevel } from './loaders.js'
import { createMario } from './entities.js'
import Timer from './Timer.js'
import Keyboard from './KeyboardState.js'
import { createCollisionLayer } from './layers.js'


const canvas = document.getElementById('screen')
const context = canvas.getContext('2d')





//important to keep loading grouped, or else it becomes disjointed & load longer. and makes a janky user experience - THIS IS PARALLEL
//PROMISE.ALL for Parralel loading - 1st takes 3sec, second 2sec, so 5 if synchronous, but .all makes it 3 secs total.
Promise.all([
  createMario(),
  loadLevel('1-1'),  //loadLevel is a promise. It is the data.json() promise that has the body of 1-1.json file that was fetched with FETCH API in loaders.js
]).then(([mario, level]) => {
  
  const gravity = 2000
  mario.pos.set(64, 64)

  //maps x and y to the grid position
  level.comp.layers.push(createCollisionLayer(level))

  level.entities.add(mario)

  const SPACE = 32
  const input = new Keyboard()
  input.addMapping(SPACE, keyState => {
    if(keyState) { //if its being held, mario is continuously in the motion
      mario.jump.start()
    } else { //can choose to early cancel for a smaller jump?
      mario.jump.cancel()
    }
  })
  input.listenTo(window)

  canvas.addEventListener('mousedown', (event) => {
    if(event.buttons === 1) {
      mario.vel.set(0,0)
      mario.pos.set(event.offsetX, event.offsetY)
    }
  })
  canvas.addEventListener('mousemove', (event) => {
      mario.vel.set(0,0)
      mario.pos.set(event.offsetX, event.offsetY)
  })
  //adding a function that will update sprite drawing which will simulate movement
  const timer = new Timer(1/60)
  timer.update = function update(deltaTime) {
      
      level.update(deltaTime)
      //the draw method in compositor class calls each function stored in its layers array (closure from createBackgroundLayer)
      //curently we have pushed backgroundLayer and spriteLayer(aka mariospritelayer)
      level.comp.draw(context)

      // console.log(mario.pos)
      //basically adding gravity - we will need a boundary that stops or redraws when passed
      mario.vel.y += gravity * deltaTime
    }
    
    //requestAnimationFrame needs to be called inside update to keep calling update. Takes into acount users Refresh rate etc.
    // requestAnimationFrame(update)
    
  //run update INSIDE the Promise.all .THEN chain (wow what an interesting way to load parallel and call the drawing)
  //we have to give update a number 0 here because otherwise time is called with undefined and causes NaN
  timer.start()
})