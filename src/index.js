// index.js
// 主入口文件
import markShape from './markShape';
import imgUrl from './image/test1.jpg';
import './styles';

const control_panel = document.getElementById("control-panel");
const drawing = document.getElementById("drawing");
const cxt = drawing.getContext("2d");
const e = window.event||e;
markShape.cxt = cxt;
markShape.canvas = drawing;
markShape.panel = control_panel;

//给canvas画图
let canvasImg = new Image();
canvasImg.src = imgUrl;
canvasImg.onload = function() {
	cxt.drawImage(canvasImg, 0, 0, 1150, 650);
}



// var method = {
// 	addDot: markShape.dot,
// 	addRect: markShape.rect,
// 	addCircle: markShape.circle,
// 	addArrow: markShape.arrow
// }

//侧栏显示
const movePanel = e => {
	if(e.pageX <= 10 && e.pageY > 80 && e.pageY < 400) {   
        control_panel.style.display = "block"; 
    } 
    control_panel.addEventListener('mouseenter', enterPanel, false);
	control_panel.addEventListener('mouseleave', leavePanel, false);
};
const enterPanel = e => {
	control_panel.style.display = "block";
};
const leavePanel = e => {
	control_panel.style.display = "none";
};
document.addEventListener('mousemove', movePanel, false);

//侧栏点击
// 1、control_panel.click();
const clickPanel = e => {
	let type = e.target.getAttribute("data-shape-type");
	markShape[type]();
	// type = "add" + type.charAt(0).toUpperCase() + type.toLowerCase().slice(1);//2、es6转换大小写
	// method[type](markShape);
};
control_panel.addEventListener('click', clickPanel, false);
