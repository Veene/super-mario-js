export function loadImage(url) {
  return new Promise(resolve => {
    //starts with a promise that will only be resolved once 'load' eventlistener pops - which will require an image call (With.src)
    //makes new instance of class Image
    const image = new Image()
    //add eventlistener that will pop once image loaded
    image.addEventListener('load', () => {
      //can be used to fake delay, returns image with resolve. Can also use resolve(image)
      setTimeout(resolve, 0, image)
    })
    //image.src triggers the addEventListener to resolve, because it basically forces the image to load
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
    //you can keep chaining promises, setTimeout(resolve, time, argument to return)
  }).then(json => {
    //these last chainings are unecessary but I left it here if we ever want to fake delay
    return new Promise(resolve => {
      return setTimeout(resolve, 0, json)
    })
  })
}