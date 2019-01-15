export default class SpriteSheet {
  constructor(image, width, height) {
    this.image = image
    this.width = width
    this.height = height
    //Map keeps key,value pairs (add k/v pairs with .set, iterate with Map.keys, map.values, map.entries)
    this.tiles = new Map()
  }
  //CUSTOM METHOD DEFINE on SpriteSheet - draw the image on its own canvas layer and store in MAP as Key-Val(name,buffer(canvas))
  define(name, x, y) {
    //buffer is basically additional CANVAS to draw on top of main canvas
    const buffer = document.createElement('canvas')
    buffer.width = this.width
    buffer.height = this.height
    buffer.getContext('2d')
      //drawImage watch closely, using the 4x4 set from drawimage on MDN, when you create a Sprite sheet, 
      //you say what size you will be giving to sprites, 16x16 px was chosen
      .drawImage(this.image,
        //src image positions(x/y (you want 1st sprite, its row 0, column 0)) + size(x/y) 
        x*this.width, y*this.height, this.width, this.height, 
        //destination image position (where will we draw on canvas. x/y top left, followed by usually same as size above, unless you want to scale it differently)
        0, 0, this.width, this.height)
    //we are adding name:buffer as a key-value pair into the Map() with set
    this.tiles.set(name, buffer)
  }
  //CUSTOM METHOD DRAW
  //We have already defined the sprite we will be using, size is 16x16px, we defined where we're grabbing it from, made a tiny 16x16
  //canvas layer with the image on top of it, and stored it in this.tiles (which is a new Map()) using.get we grab the canvas layer image
  //and draw it with simple polymorphic drawImage - (image, x, y) simple placement now on the map
  draw(name, context, x, y) {
    const buffer = this.tiles.get(name)
    context.drawImage(buffer, x, y)
  }
  drawTile(name, context, x, y) {
    this.draw(name, context, x*this.width, y*this.height)
  }
}