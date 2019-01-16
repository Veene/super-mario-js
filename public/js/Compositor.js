//point of Compositor is basically to store drawn layers, so that we can just draw them without going through loading images, forloops etc.
//important that the layers pushed return functions(closures) that hold the information of the drawing&buffer(from outer function)
class Compositor {
  constructor() {
    this.layers = []
  }
  draw(context) {
    this.layers.forEach(layer => {
      layer(context)
    })
  }
}

export default Compositor