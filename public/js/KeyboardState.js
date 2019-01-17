const PRESSED = 1 
const RELEASED = 0

export default class KeyboardState {
  constructor() {

    //when keyboard button is pressed we store in keyState Map, Holds the current state of a given key
    this.keyState = new Map()
    //holds the callback function for a given keycode
    this.keyMap = new Map()
  }
  addMapping(keyCode, callback) {
    this.keyMap.set(keyCode, callback)
  }
  handleEvent(event) {
    const {keycode} = event

    if(!this.keyMap.has(keyCode)){
      // did not have key mapped
      return false
    }
    event.preventDefault()
    const keyState = event.type === 'keydown' ? PRESSED : RELEASED
  }
}