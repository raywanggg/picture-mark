// index.js
// 主入口文件
import markShape from './markShape';
import './styles';

var control_panel = document.getElementById("control-panel");
var drawing = document.getElementById("drawing");
var cxt = drawing.getContext("2d");
var e = window.event||e;

var isComment = true;
var isDrag = false;
var drag = false;
var flag = false;

var method = {
	addDot: (cxt) => {console.log("1");},
	addRect: (cxt) => {console.log("2");},
	addCircle: (cxt) => {console.log("3");},
	addArrow: (cxt) => {console.log("4");}
}

//侧栏显示
var movePanel = e => {
	if(e.pageX <= 10 && e.pageY > 80 && e.pageY < 400 && isComment == true && flag == false) {   
        control_panel.style.display = "block"; 
    } 
    control_panel.addEventListener('mouseenter', enterPanel, false);
	control_panel.addEventListener('mouseleave', leavePanel, false);
};
var enterPanel = e => {
	control_panel.style.display = "block";
};
var leavePanel = e => {
	control_panel.style.display = "none";
};
document.addEventListener('mousemove', movePanel, false);

//侧栏点击
// 1、control_panel.click();
var clickPanel = e => {
	let type = e.target.getAttribute("data-shape-type");
	type = "add" + type.charAt(0).toUpperCase() + type.toLowerCase().slice(1);//2、es6转换大小写
	method[type]();
};
control_panel.addEventListener('click', clickPanel, false);

 