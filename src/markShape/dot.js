// dot.js

// 箭头函数不会改变作用域
// const test = () => {
// 	console.log(this);
// };
// 箭头函数this指向定义时的作用域；
// es5this指向运行时的作用域；
import addCenter from './center';
const dot = function() {
	console.log(this);
	const e = window.event||e;
	const cxt = this.cxt;
	const canvas = this.canvas;
	const panel = this.panel;
	panel.style.display = "none";

	//改变鼠标形状
	document.body.style.cursor = "none";
	let markPin = document.createElement("div");
	markPin.className = "marktools-pin";
    document.body.appendChild(markPin);
    markPin.style.left = (e.pageX - 15) + "px";
    markPin.style.top = (e.pageY - 40) + "px";

    const dotCreate = (x,y,n) => {
    	n.beginPath();
    	addCenter(x, y, 2, n);
    	n.moveTo(x+15, y);
    	n.arc(x, y, 15, 0, 2*Math.PI, false);
    	n.setLineDash([4, 6]);
	    n.strokeStyle = "#87CEFA";
	    n.fillStyle = "rgba(135,206,250,0.2)";
	    n.linewidth = 1;//边框宽度
	    n.stroke();
	    n.fill();         
	    n.closePath();
    };

    const moveDot = e => {
    	markPin.style.left = (e.pageX - 15) + "px";
    	markPin.style.top = (e.pageY - 40) + "px";
    };
    const downDot = e => {
    	document.body.style.cursor = "auto";
    	document.body.removeChild(markPin);
    	let xPin = e.pageX;
        let yPin = e.pageY;
        dotCreate(xPin, yPin, cxt);
        canvas.removeEventListener('mousedown', downDot);
        canvas.removeEventListener('mousemove', moveDot);
    };

    markPin.addEventListener('mousedown', downDot, false);
    canvas.addEventListener('mousemove', moveDot, false);
    
    
};


export default dot;