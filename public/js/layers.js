
// //background is the data.json() we get back from loadLevel(call with data.background)
// function drawBackground(background, context, sprites) {
//   //we are destructuring the 4 numbers in range that we have in all level.json files
//   //REMEMBER forEach is not calling through x1,x2,y1,y2, its calling the RANGES, so inside each range we destructure!! 
//   //We could write foreach(range) => x1 = range[0] x2 = range[1] y1 = range[2] y2 = range[3]
//   background.ranges.forEach(([x1, x2, y1, y2]) => {
//     for(let x = x1; x < x2; x++) {
//       for(let y = y1; y < y2; y++){
//         sprites.drawTile(background.tile, context, x, y)
//       }
//     }
//   })
// }

export function createBackgroundLayer(level, sprites) {
  //we are creating another canvas buffer screen, like in SpriteSheet, size of nintendo screen
  const backgroundBuffer = document.createElement('canvas')
  backgroundBuffer.width = 256
  backgroundBuffer.height = 240

  const context = backgroundBuffer.getContext('2d')

  level.tiles.forEach((tile , x, y) => {
    sprites.drawTile(tile.name, context, x, y)
  })


  // //got backgrounds from level.backgrounds, which got it from Promise all of loadLevel('1-1'). now iterate through the backgrounds to initiate forloop from drawBackground(x1,x2,y1,y2)
  // backgrounds.forEach((background) => {
  //   //notice how we add getContext here, because we want to draw on this new buffer screen and we always draw on the context. So drawing here instead of original canvas context
  //   //Reminder - drawBackground is the function that loops to draw x1x2y1y2
  //   drawBackground(background, backgroundBuffer.getContext('2d'), sprites)
  // })
  //closure that keeps track of backgroundBuffer(screen size and background tiles draw on it) Then places it on the main context
  return function drawBackgroundLayer(context) {
    //so with this background buffer drawing, we already drew it once with the drawBackground function above and created a layer on
    //backgroundBuffer. Now we just have to call this backgroundBuffer which is already styled how we want, so no more looping required
    context.drawImage(backgroundBuffer, 0, 0)
  }
}

export function createSpriteLayer(entities) {
  //returns a function AKA its a closure
  return function drawSpriteLayer(context) {
    entities.forEach((entity) => {
      entity.draw(context)
    })
  }
}

export function createCollisionLayer(level) {
  const resolvedTiles = []

  const tileResolver = level.tileCollider.tiles
  const tileSize = tileResolver.tileSize

  const getByIndexOriginal = tileResolver.getByIndex
  tileResolver.getByIndex = function getByIndexFake(x,y) {
    resolvedTiles.push({x, y})
    return getByIndexOriginal.call(tileResolver, x, y)
  }
  return function drawCollision(context) {
    //draw color
    context.strokeStyle = 'blue'
    resolvedTiles.forEach(({x, y}) => {
      context.beginPath()
      context.rect(x * tileSize, y * tileSize, tileSize, tileSize)
      context.stroke()
    })

    resolvedTiles.length = 0
  }
}