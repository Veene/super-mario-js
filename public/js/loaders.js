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

export function loadLevel(name){
  return fetch(`/levels/${name}.json`)
  .then((data) => {
    //data returns a response to the fetch promise, there's a body, and a bunch of other parameters, but the body is in json, so to read
    //it we have to call data.json(), which itself returns a promise to resolve with the body but in readable state
    // console.log(data)
    return data.json()
  })
}