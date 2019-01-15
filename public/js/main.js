function loadImage(url) {
  return new Promise(resolve => {
    const image = new Image()
    image.addEventListener('load', () => {
      resolve(image)
    })
    //image.src triggers the addEventListener to resolve
    image.src = url
  })
}

const canvas = document.getElementById('screen')
const context = canvas.getContext('2d')

context.fillRect(0,0,50,50)
//loadimage invokes the promise, after promise resolves with image, use that image object/class to 
loadImage('/img/tiles.png')
.then(image => {
  console.log(image)
  //look up drawImage on MDN, polymorphic (allows different rendering if you use different amount of args)
  context.drawImage(image, 
    0, 0, 16, 16, 
    0, 0, 32, 32)
})