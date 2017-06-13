//create new Canvas, then remove

const addCanvas = function() {
    var canvas = document.createElement("canvas");
    canvas.width = 1150;
    canvas.height = 650;
    canvas.style.position = "absolute";
    canvas.style.left = 0;
    canvas.style.top = 0;
    document.body.appendChild(canvas);
    return canvas;
};

export default addCanvas;