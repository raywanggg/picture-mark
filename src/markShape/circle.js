// circle.js

import addCenter from './center';
import addCanvas from './canvas';
const circle = function() {
	// console.log(this);
	const e = window.event||e;
	const cxt = this.cxt;
	const canvas = this.canvas;
	const panel = this.panel;
    let startX, startY, x1, x2, y1, y2;
	let isClick = false;//判断是否已经点击
	let isDrag = false;//判断是否可以移动（评论框生成方可拖拽）
	let cirArray = new Array();
	panel.style.display = "none";

	//添加长宽表示,mousemove后显示
    let coordCir = document.createElement("p");
    coordCir.className = "coord-rect";
    document.body.appendChild(coordCir);

    //改变鼠标形状
	document.body.style.cursor = "crosshair";
	let markCir = document.createElement("div");
    markCir.className = "marktools-ellipse";
    document.body.appendChild(markCir);
    markCir.style.left = (e.pageX + 6) + "px";
    markCir.style.top = (e.pageY - 20) + "px";

    //建立新画布
    let cirCan = addCanvas();
    let circxt = cirCan.getContext("2d");

    const circleCreate = (x,y,a,b,n) => {//xy为圆心
    	const step = (a > b) ? 1/a : 1/b;
    	n.beginPath();
    	n.moveTo(x + a, y);
    	for (let i = 0; i < 2*Math.PI; i += step) {
    		n.lineTo(x + a*Math.cos(i), y + b*Math.sin(i));
    	}
    	n.closePath();
    	n.stroke();
    	n.fill();
    };

    const downCir = e => {
    	isClick = true;
    	startX = e.pageX;
    	startY = e.pageY;
    	circxt.moveTo(startX, startY); 
    };
    const moveCir = e => {
    	// console.log("move");
    	markCir.style.left = (e.pageX + 6) + "px";
    	markCir.style.top = (e.pageY - 20) + "px";
    	if (isClick) {
    		let rect = { };//定义矩形的长宽间距
            rect.left = (startX - e.pageX > 0 ? e.pageX : startX);
            rect.top = (startY - e.pageY > 0 ? e.pageY : startY);
            rect.height = Math.abs(startY - e.pageY);
            rect.width = Math.abs(startX - e.pageX);
            //x1为左下角横坐标，y2为右下角纵坐标
            x1 = rect.left;
            x2 = rect.left + rect.width;
            y1 = rect.top;
            y2 = rect.top + rect.height;
            cirArray.push(rect);
            //虚线函数
            circxt.beginPath();
            circxt.setLineDash([4, 8]);
            circxt.strokeStyle = "rgb(176, 226, 255)";
            circxt.fillStyle = "rgba(135,206,250,0.2)";
            circxt.linewidth = 1;
            if (cirArray[1]) {
                //清除数组第一个元素
                circxt.clearRect(cirArray[0].left - 1,
                    cirArray[0].top - 1,
                    cirArray[0].width + 2,
                    cirArray[0].height + 2);
                //画椭圆
                circleCreate((x1 + x2)/2, (y1 + y2)/2, (x2 - x1)/2, (y2 - y1)/2, circxt);
                cirArray.shift();//shift移出并删除首元素
            }
            circxt.closePath();
            //描出长宽
            coordCir.innerHTML = "(" + (x2 - x1) + "x" + (y2 - y1) + ")";
            coordCir.style.left = (e.pageX - 70) + "px";
            coordCir.style.top = (e.pageY + 5) + "px";
    	}
    };
    const upCir = e => {
    	isClick = false;
    	document.body.style.cursor = "auto";
    	cirArray.length = 0;
    	document.body.removeChild(markCir);
    	document.body.removeChild(coordCir);
    	cxt.beginPath();
        cxt.setLineDash([4, 8]);
        cxt.strokeStyle = "rgb(176, 226, 255)";
        cxt.fillStyle = "rgba(135,206,250,0.2)";
        cxt.linewidth = 1;
        circleCreate((x1 + x2)/2, (y1 + y2)/2, (x2 - x1)/2, (y2 - y1)/2, cxt);
        cxt.closePath();
        document.body.removeChild(cirCan);
    };

    cirCan.addEventListener('mousedown', downCir, false);
    cirCan.addEventListener('mousemove', moveCir, false);
    cirCan.addEventListener('mouseup', upCir, false);

};
export default circle;