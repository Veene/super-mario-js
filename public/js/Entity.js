import { Vector2 } from './math.js'

//merging different classes of vectors allows an entity to cleanly keep many different calculations
export default class Entity {
  constructor() {
    this.pos = new Vector2(0, 0)
    this.velocity = new Vector2(0, 0)
  }
}

