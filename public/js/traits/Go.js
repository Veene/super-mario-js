import {Trait} from '../Entity.js'

export default class Go extends Trait {
  constructor() {
    super('go')

    //max time you can hold the go for or else mario will fly
    this.dir = 0
    this.speed = 6000
  }
  update(entity, deltaTime) {
    entity.vel.x = this.speed * this.dir * deltaTime
  }
}