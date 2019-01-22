import Entity from './Entity.js'
import { loadMarioSprite } from './sprites.js'
import Velocity from './traits/Velocity.js'
import Jump from './traits/Jump.js'
import Go from './traits/Go.js'

// High level refactor for cleaner classes. Mario is now instance of Entity class, which has pos and velocity, which are instances
// of Vector2 class, which only holds this.x and this.y
export function createMario() {
  return loadMarioSprite().then(sprite => {
    const mario = new Entity()

    mario.size.set(14, 16)

    mario.addTrait(new Go())
    mario.addTrait(new Jump())
    // mario.addTrait(new Velocity())
    
    
    
    //can write this.pos.x, because when you add a function to object you get access to this. mario.update = function
    // mario.update = function updateMario(deltaTime) {
    //   this.pos.x += this.velocity.x * deltaTime 
    //   this.pos.y += this.velocity.y * deltaTime
    // }
    mario.draw = function drawMario(context) {
      //referencing marioSprite from promise.all return of loadMarioSprite()
      sprite.draw('idle', context, this.pos.x, this.pos.y)
    }
    return mario
  })
}  
  