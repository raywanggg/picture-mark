// dot.js

// 箭头函数不会改变作用域
// const dot = () => {
// 	console.log(this);
// };
import center from './center';
const dot = function() {
	console.log(this);
	var e = window.event||e;
	var cxt = this.cxt;
	var canvas = this.canvas;
	var panel = this.panel;
	panel.style.display = "none";

	//改变鼠标形状
	document.body.style.cursor = "none";
	var markPin = document.createElement("div");
	markPin.className = "marktools-pin";
    document.body.appendChild(markPin);
    markPin.style.left = (e.pageX - 15) + "px";
    markPin.style.top = (e.pageY - 40) + "px";

    var dotCreate = (x,y,n) => {
    	n.beginPath();
    	center(x, y, 2, n);
    	n.moveTo(x+15, y);
    	n.arc(x, y, 15, 0, 2*Math.PI, false);
    	n.setLineDash([4, 6]);
	    n.strokeStyle = "#87CEFA";
	    n.fillStyle = "rgba(135,206,250,0.2)";
	    n.stroke();
	    n.fill();         
	    n.closePath();
    };

    var moveDot = e => {
    	markPin.style.left = (e.pageX - 15) + "px";
    	markPin.style.top = (e.pageY - 40) + "px";
    };

    var downDot = e => {
    	document.body.style.cursor = "auto";
    	document.body.removeChild(markPin);
    	var xPin = e.pageX;
        var yPin = e.pageY;
        dotCreate(xPin, yPin, cxt);
        canvas.removeEventListener('mousedown', downDot);
        // canvas.removeEventListener('mousemove', moveDot);
        console.log("down");
    };
    // canvas.removeEventListener('click');
    canvas.addEventListener('mousedown', downDot, false);
    canvas.addEventListener('mousemove', moveDot, false);
    
    
};


export default dot;