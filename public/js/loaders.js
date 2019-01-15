export function loadImage(url) {
  return new Promise(resolve => {
    const image = new Image()
    image.addEventListener('load', () => {
      resolve(image)
    })
    //image.src triggers the addEventListener to resolve
    image.src = url
  }).catch((err) => console.log(err))
}