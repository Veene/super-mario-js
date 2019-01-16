const tick = now => {
  console.log('now: ', now)
  requestAnimationFrame(tick);
};

requestAnimationFrame(tick);