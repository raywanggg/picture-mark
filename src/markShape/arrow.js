// arrow.js

import addCanvas from './canvas';
const arrow = function(ev) {
	// console.log(this);
	const e = window.event||ev;
	const cxt = this.cxt;
	const canvas = this.canvas;
	const panel = this.panel;
	let startX, startY;
	let isClick = false;//判断是否已经点击
	// let arrArray = [];
	let a1,a2,b1,b2,c1,c2,d1,d2;//a1a2b1b2c1c2d1d2分别为连线上的四点
	let arrow = {//定义箭头顶部的角度和边长
	    edgeLen: null,
	    angle: null
	};
	panel.style.display = "none";

	//添加鼠标形状
	document.body.style.cursor = "crosshair";
	let markLine = document.createElement("div");
    markLine.className = "marktools-line";
    document.body.appendChild(markLine);
    markLine.style.left = (e.pageX + 15) + "px";
    markLine.style.top = (e.pageY - 25) + "px";

	//建立新画布
    let arrCan = addCanvas();
    let arrcxt = arrCan.getContext("2d");

    //修改箭头头部
	let ArrowSize = (x1,y1,x2,y2) => {
        const EDGELEN = 50, ANGLE = 25;
	    let x = Math.abs(x2 - x1);
	    let y = Math.abs(y2 - y1);
	    let arrowlength = Math.sqrt(Math.pow(x,2) + Math.pow(y,2));
	    if (arrowlength < 250) {
	        arrow.edgeLen = EDGELEN/2;
	        arrow.angle = ANGLE/2;
	    }
	    else if (arrowlength < 500) {
	        arrow.edgeLen = EDGELEN * arrowlength/500;
	        arrow.angle = ANGLE * arrowlength/500;
	    }
	};
	//获得连线上各点坐标
	const ArrowCoord = (x1,y1,x2,y2) => {
	    //angleOri为起始点连线与x轴夹角
	    const angleOri = Math.atan2(y2 - y1, x2 - x1) / Math.PI * 180;
	    //bc为箭头底边两点
	    c1 = x2 - arrow.edgeLen * Math.cos(Math.PI / 180 * (angleOri + arrow.angle));
	    c2 = y2 - arrow.edgeLen * Math.sin(Math.PI / 180 * (angleOri + arrow.angle));
	    b1 = x2 - arrow.edgeLen * Math.cos(Math.PI / 180 * (angleOri - arrow.angle));
	    b2 = y2 - arrow.edgeLen * Math.sin(Math.PI / 180 * (angleOri - arrow.angle));
	    //midPoint为垂直中垂线交点
	    const midPoint1 = (b1 + c1) / 2;
	    const midPoint2 = (b2 + c2) / 2;   
	    //ad为底边侧面两点
	    a1 = (midPoint1 + b1) / 2;
	    a2 = (midPoint2 + b2) / 2;
	    d1 = (midPoint1 + c1) / 2;
	    d2 = (midPoint2 + c2) / 2;
	};
	//连线完成箭头
	const ArrowCreate = (x1,y1,x2,y2,n) => {
	    ArrowSize(x1,y1,x2,y2);
	    ArrowCoord(x1,y1,x2,y2);
	    n.beginPath();
	    n.fillStyle = "rgba(135,206,250,0.8)";
	    n.moveTo(x1,y1);
	    n.lineTo(a1,a2);
	    n.lineTo(b1,b2);
	    n.lineTo(x2,y2);
	    n.lineTo(c1,c2);
	    n.lineTo(d1,d2);
	    n.lineTo(x1,y1);
	    n.closePath();
	    n.fill();
	};

    const downArr = e => {
    	isClick = true;
    	startX = e.pageX;
    	startY = e.pageY;
        arrcxt.beginPath();
    	arrcxt.moveTo(startX, startY); 
    };
    const moveArr = e => {
        const {pageX, pageY} = e;
    	markLine.style.left = (pageX + 15) + "px";
    	markLine.style.top = (pageY - 25) + "px";
    	if (isClick) {
    		// let mark = { };
      //   	mark.endX = pageX;
      //   	mark.endY = pageY;
            // arrArray.push(mark);
            //虚线函数
            
            arrcxt.setLineDash([4, 8]);
            arrcxt.strokeStyle = "rgb(176, 226, 255)";
            arrcxt.fillStyle = "rgba(135,206,250,0.2)";
            arrcxt.linewidth = 1;

            // console.log(arrArray);


            // if (arrArray[1]) {
                //清除数组第一个元素即清除整张画布
                // arrcxt.clearRect(startX, arrArray[0].endY, arrArray[0].endX - startX, startY - arrArray[0].endY);
                arrcxt.clearRect(0, 0, arrCan.width, arrCan.height);
                //画箭头
                // ArrowCreate(startX,startY,arrArray[0].endX,arrArray[0].endY,arrcxt);
                ArrowCreate(startX, startY, pageX, pageY, arrcxt);
                // arrArray.shift();//shift移出并删除首元素
            // }
            // console.log(startX, startY, pageX, pageY, arrcxt);
            arrcxt.closePath();
    	}
    };
    let upArr = e => {
        const {pageX, pageY} = e;
    	isClick = false;
    	document.body.style.cursor = "auto";
    	// arrArray = [];
    	document.body.removeChild(markLine);
    	
        ArrowCreate(startX,startY,pageX,pageY,cxt);
    	document.body.removeChild(arrCan);
    };

    arrCan.addEventListener('mousedown', downArr, false);
    arrCan.addEventListener('mousemove', moveArr, false);
    arrCan.addEventListener('mouseup', upArr, false);

};
export default arrow;