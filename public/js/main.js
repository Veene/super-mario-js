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
  context.drawImage(image, 0,0)
})