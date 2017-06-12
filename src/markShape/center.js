const center = function(x,y,z,n) {
    n.moveTo(x+2,y);
    n.arc(x, y, z, 0, 2*Math.PI, false);
    n.fillStyle = "#87CEFA";
    n.fill();
};

export default center;