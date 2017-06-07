// index.js
// 主入口文件
import markShape from './markShape';

import './styles';

// const canvas = document.createElement('canvas');
// canvas.width = '800';
// canvas.height = '600';
// document.getElementsByTagName('body')[0].append(canvas);

var control_panel = document.getElementById("control-panel");
var drawing = document.getElementById("drawing");
var cxt = drawing.getContext("2d");
var e = window.event||e;
var isComment = true;
var isDrag = false;
var drag = false;
var flag = false;

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

 