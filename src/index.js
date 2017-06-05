// index.js
// 主入口文件
import markShape from './markShape';

import './styles';

const canvas = document.createElement('canvas');

canvas.width = '800';
canvas.height = '600';

document.getElementsByTagName('body')[0].append(canvas);