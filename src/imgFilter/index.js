//index.js based on filter
import * as reducerTpye from './reducerType';
import handleEffectWorkerUrl from './handleEffectWorker.js';

function saveOriginImgData(data) {
    return {
        type: reducerTpye.SAVE_ORIGIN_IMG_DATA,
        data
    }
}
function updateImgData(data) {
    return {
        type: reducerTpye.UPDATE_CURRENT_IMG_DATA,
        data
    };
}
function handleEffect(effect) {
    return (dispatch, getState) => {
        let orginImgData = getState().get('orginImgData');
        let wk = new Worker(handleEffectWorkerUrl);
        wk.postMessage({imgData: orginImgData, effect});
        wk.onmessage = function(e){
            dispatch(updateImgData(e.data));
        }
    }
}

export default {
    saveOriginImgData,
    handleEffect,
    updateImgData
}