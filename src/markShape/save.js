//save.js

const save = function() {
	console.log(this);
	const canvas = this.canvas;
	// let imageHref = canvas.toDataURL('image/png').replace(/^data:image\/[^;]/, 'data:application/octet-stream');
	let imageURL = canvas.toDataURL('image/png');
	let imageNAME = "canvas_save_image";
	window.open(imageURL, imageNAME);
	console.log(imageURL);
};
export default save;