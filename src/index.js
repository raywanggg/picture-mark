// index.js
// 主入口文件
import markShape from './markShape';
import imgFilter from './imgFilter';
import imgUrl from './image/test1.jpg';
import './styles';

// 实现深复制
// function cloneDeep(obj){
//     if( typeof obj !== 'object' || Object.keys(obj).length === 0 ){
//         return obj
//     }
//     let resultData = {}
//     return recursion(obj, resultData)
// }

// function recursion(obj, data={}){
// 	var key;
//     for(key in obj){
//         if( typeof obj[key] == 'object' && Object.keys(obj[key].length>0 )){
//             data[key] = recursion(obj[key])
//         }else{
//             data[key] = obj[key]
//         }
//     }
//     return data
// }

const control_panel = document.getElementById("control-panel");
const drawing = document.getElementById("drawing");
const cxt = drawing.getContext("2d");
const e = window.event||e;
const originData = cxt.getImageData(0, 0, 1150, 650);
// const originDataDeep = cloneDeep(originData);
// console.log(originDataDeep);
markShape.cxt = cxt;
markShape.canvas = drawing;
markShape.panel = control_panel;


//给canvas画图
let canvasImg = new Image();
canvasImg.src = imgUrl;
canvasImg.onload = function() {
	cxt.drawImage(canvasImg, 0, 0, 1150, 650);
}


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

const clickFilter = e => {
	let type = e.target.getAttribute("data-filter-type");
	imgFilter.handleEffect(type, cxt, originData);
}
document.addEventListener('click', clickFilter, false);
