// rect.js

import addCenter from './center';
import addCanvas from './canvas';
const rect = function() {
	console.log(this);
	var e = window.event||e;
	var cxt = this.cxt;
	var canvas = this.canvas;
	var panel = this.panel;
	var startX, startY, x1, x2, y1, y2, dragX, dragY;
	var isClick = false;//判断是否已经点击
	var isDrag = false;//判断是否可以移动（评论框生成方可拖拽）
	var rectArray = new Array();
	panel.style.display = "none";
	//添加长宽表示,mousemove后显示
    var coordRect = document.createElement("p");
    coordRect.className = "coord-rect";
    document.body.appendChild(coordRect);

	//改变鼠标形状
	document.body.style.cursor = "crosshair";
	var markRect = document.createElement("div");
    markRect.className = "marktools-rect";// imgPin.addClass为什么不行
    document.body.appendChild(markRect);
    markRect.style.left = (e.pageX + 7) + "px";
    markRect.style.top = (e.pageY - 23) + "px";

    //建立新画布
    var rectCan = addCanvas();
    var rectcxt = rectCan.getContext("2d");

    var downRect = e => {
    	isClick = true;
    	startX = e.pageX;
    	startY = e.pageY;
    	rectcxt.moveTo(startX, startY);

    	//矩形框的拖拽缩放
    	// if (isDrag && e.pageX > x1 && e.pageX < x2 && e.pageY > y1 && e.pageY < y2) {
     //        drag = true;
     //        dragX = e.pageX;
     //        dragY = e.pageY;
     //    }
    }; 
    var moveRect = e => {
    	markRect.style.left = (e.pageX + 7) + "px";
    	markRect.style.top = (e.pageY - 23) + "px";
    	if (isClick) {
    		//考虑反方向情况重新选取开始点
            var rect = { };//定义矩形的长宽间距
            rect.left = (startX - e.pageX > 0 ? e.pageX : startX);
            rect.top = (startY - e.pageY > 0 ? e.pageY : startY);
            rect.height = Math.abs(startY - e.pageY);
            rect.width = Math.abs(startX - e.pageX);
            //x1为左下角横坐标，y2为右下角纵坐标
            x1 = rect.left;
            x2 = rect.left + rect.width;
            y1 = rect.top;
            y2 = rect.top + rect.height;
            rectArray.push(rect);
            //虚线函数
            rectcxt.beginPath();
            rectcxt.setLineDash([4, 8]);
            rectcxt.strokeStyle = "rgb(176, 226, 255)";//边框颜色
            rectcxt.fillStyle = "rgba(135,206,250,0.2)";//填充颜色
            rectcxt.linewidth = 1;//边框宽度
            if (rectArray[1]) {
                rectcxt.clearRect(rectArray[0].left - 1,
                    rectArray[0].top - 1,
                    rectArray[0].width + 2,
                    rectArray[0].height + 2);
                rectcxt.strokeRect(rectArray[1].left,
                    rectArray[1].top,
                    rectArray[1].width,
                    rectArray[1].height);//pop移出并删除栈顶元素
                rectcxt.fillRect(rectArray[1].left,
                    rectArray[1].top,
                    rectArray[1].width,
                    rectArray[1].height);
                rectArray.shift();//shift移出并删除首元素
            }
            rectcxt.closePath();
            //描出长宽
            coordRect.innerHTML = "(" + (x2 - x1) + "x" + (y2 - y1) + ")";
            coordRect.style.left = (e.pageX - 70) + "px";
            coordRect.style.top = (e.pageY + 5) + "px";
    	}
    };
    var upRect = e => {
    	isClick = false;
    	document.body.style.cursor = "auto";
    	rectArray.length = 0;
    	document.body.removeChild(markRect);
    	document.body.removeChild(coordRect);
    	//标记实心四点
        cxt.beginPath();
        cxt.setLineDash([4, 8]);
        cxt.strokeStyle = "rgb(176, 226, 255)";//边框颜色
        cxt.fillStyle = "rgba(135,206,250,0.2)";//填充颜色
        cxt.linewidth = 1;//边框宽度
        cxt.strokeRect(x1, y1, x2-x1, y2-y1);
        cxt.fillRect(x1, y1, x2-x1, y2-y1);
        addCenter(x1,y1,2,cxt);
        addCenter(x1,y2,2,cxt);
        addCenter(x2,y1,2,cxt);
        addCenter(x2,y2,2,cxt);
        cxt.closePath();
        document.body.removeChild(rectCan);
        // canvas.removeEventListener('mousedown', downRect);
        // canvas.removeEventListener('mouseup', upRect);
    };

    rectCan.addEventListener('mousedown', downRect, false);
    rectCan.addEventListener('mousemove', moveRect, false);
    rectCan.addEventListener('mouseup', upRect, false);
    
};


export default rect;