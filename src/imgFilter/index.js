//index.js based on filter
import handleEffectWorkerUrl from './handleEffectWorker.js';

function handleEffect(effect,cxt,originImgData) {
	let presentImgData = cxt.getImageData(0, 0, 1150, 650);
	// let presentImgData = originImgData.ImageData;
	console.log(originImgData);
	console.log(presentImgData);
	console.log(presentImgData == originImgData);
	if (effect == "Ori") {
		putImageData(cxt, originImgData, 0, 0, 0, 0, 1150, 650);
	} else {
		let wk = new Worker(handleEffectWorkerUrl);
		wk.postMessage({imgData: originImgData, effect});
		wk.onmessage = function(e) {
			putImageData(cxt, e.data, 0, 0, 0, 0, 1150, 650);
		}
	}
	
}

function putImageData(ctx, imageData, dx, dy,
    dirtyX, dirtyY, dirtyWidth, dirtyHeight) {
  var data = imageData.data;
  var height = imageData.height;
  var width = imageData.width;
  dirtyX = dirtyX || 0;
  dirtyY = dirtyY || 0;
  dirtyWidth = dirtyWidth !== undefined? dirtyWidth: width;
  dirtyHeight = dirtyHeight !== undefined? dirtyHeight: height;
  var limitBottom = dirtyY + dirtyHeight;
  var limitRight = dirtyX + dirtyWidth;
  for (var y = dirtyY; y < limitBottom; y++) {
    for (var x = dirtyX; x < limitRight; x++) {
      var pos = y * width + x;
      ctx.fillStyle = 'rgba(' + data[pos*4+0]
                        + ',' + data[pos*4+1]
                        + ',' + data[pos*4+2]
                        + ',' + (data[pos*4+3]/255) + ')';
      ctx.fillRect(x + dx, y + dy, 1, 1);
    }
  }
}

export default {
    handleEffect
}