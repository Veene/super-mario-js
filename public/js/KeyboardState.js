const PRESSED = 1 
const RELEASED = 0

export default class KeyboardState {
  constructor() {
    //when keyboard button is pressed we store in keyState Map, Holds the current state of a given key
    this.keyStates = new Map()
    //holds the callback function for a given keycode
    this.keyMap = new Map()
  }
  addMapping(keyCode, callback) {
    this.keyMap.set(keyCode, callback)
  }
  handleEvent(event) {
    const { keyCode } = event   //38, 39,40
    if(!this.keyMap.has(keyCode)){
      // did not have key mapped
      return
    }
    //stop page scrolling if people click up or down
    event.preventDefault()
    //check if keydown, if its not then its probably keyup
    const keyState = event.type === 'keydown' ? PRESSED : RELEASED
    //
    if(this.keyStates.get(keyCode) === keyState) { // 38(keyCode): PRESSED(keyState)
      return
    }
    //otherwise
    this.keyStates.set(keyCode, keyState) // 38:PRESSED or if keyState is new, 38:RELEASED
    console.log(this.keyStates)
    //get it and call it with keyState to callback to actually do what we want when that key is pressed
    this.keyMap.get(keyCode)(keyState)
  }

  listenTo(window) {
    ['keydown', 'keyup'].forEach(eventName => {
      window.addEventListener(eventName, event => {
        this.handleEvent(event)
      })
    })
  }
}