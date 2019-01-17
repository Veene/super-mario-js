import Entity from './Entity.js'
import { loadMarioSprite } from './sprites.js'

// High level refactor for cleaner classes. Mario is now instance of Entity class, which has pos and velocity, which are instances
// of Vector2 class, which only holds this.x and this.y
export function createMario() {
  return loadMarioSprite().then(sprite => {
    const mario = new Entity()
    mario.pos.set(64, 180)
    mario.velocity.set(2, -10)
    //moved mario.pos.x and y from the update() function and put it directly into the mario entity. Instead of writing mario.pos.x +=, you
    //can write this.pos.x, because when you add a function to object you get access to this. mario.update = function
    mario.update = function updateMario() {
      this.pos.x += this.velocity.x
      this.pos.y += this.velocity.y
    }
    mario.draw = function drawMario(context) {
      //referencing marioSprite from promise.all return of loadMarioSprite()
      sprite.draw('idle', context, this.pos.x, this.pos.y)
    }
    return mario
  })
}  
  