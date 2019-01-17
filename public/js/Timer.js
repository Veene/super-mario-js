export default class Timer {
  constructor(deltaTime=1/60) {
    let accumulatedTime = 0
    let lastTime = 0

     this.updateProxy = (time) => {
      accumulatedTime += (time - lastTime)/1000
      // console.log('deltaTime:',deltaTime)
      // console.log('accumulatedTime:',accumulatedTime)

      while(accumulatedTime > deltaTime) {
        this.update(deltaTime)
        accumulatedTime -= deltaTime
      }
      
      
      // setTimeout(update, 1000/144, performance.now())
      lastTime = time

      //requestAnimationFrame needs to be called inside update to keep calling update. Takes into acount users Refresh rate etc.
      this.enqueue()
    }
  }
  enqueue() {
    requestAnimationFrame(this.updateProxy)
  }
  start() {
    this.enqueue()
  }
}