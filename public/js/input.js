import Keyboard from './KeyboardState.js'

export function setupKeyboard(entity) {
  const SPACE = "Space"
  const RIGHT = "ArrowRight"
  const LEFT = "ArrowLeft"
  const input = new Keyboard()
  input.addMapping(SPACE, keyState => {
    if(keyState) { //if its being held, mario is continuously in the motion
      entity.jump.start()
    } else { //can choose to early cancel for a smaller jump?
      entity.jump.cancel()
    }
  })
  input.addMapping(RIGHT, keyState => {
    entity.go.dir = keyState
  })
  input.addMapping(LEFT, keyState => {
    entity.go.dir = -keyState
  })
  return input
} 
  