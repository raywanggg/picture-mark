//index.js based on filter
import handleEffectWorkerUrl from './handleEffectWorker.js';

function handleEffect(effect,cxt,originImgData) {
	// let presentImgData = cxt.getImageData(0, 0, 1150, 650);
	// let presentImgData = originImgData.ImageData;
	// console.log(originImgData);
	// console.log(presentImgData);
	// console.log(presentImgData == originImgData);
	if (effect == "Ori") {
		putImageData(cxt, originImgData, 0, 0, 0, 0, 1150, 650);
	} else {
		let wk = new Worker(handleEffectWorkerUrl);
<<<<<<< HEAD
		wk.postMessage({imgData: presentImgData, effect});
		wk.onmessage = function(e) {
			putImageData(cxt, e.data, 0, 0, 0, 0, 1150, 650);
=======
		wk.postMessage({imgData: originImgData, effect});
		wk.onmessage = function({data}) {
			putImageData(cxt, data, 0, 0, 0, 0, 1150, 650);
>>>>>>> 9575a357967481f34ac14ce9eac72f6fbdc5fe96
		}
	}
	
}

function putImageData(ctx, {data, height, width}, dx, dy,
    dirtyX = 0, dirtyY = 0, dirtyWidth, dirtyHeight) {
  dirtyWidth = dirtyWidth || width;
  dirtyHeight = dirtyHeight || height;
  const limitBottom = dirtyY + dirtyHeight;
  const limitRight = dirtyX + dirtyWidth;
  for (let y = dirtyY; y < limitBottom; y++) {
    for (let x = dirtyX; x < limitRight; x++) {
      const pos = y * width + x;
      ctx.fillStyle = 'rgba(' + data[pos*4+0]
                        + ',' + data[pos*4+1]
                        + ',' + data[pos*4+2]
                        + ',' + (data[pos*4+3]/255) + ')';
      ctx.fillRect(x + dx, y + dy, 1, 1);
    }
  }
}

export default handleEffect;