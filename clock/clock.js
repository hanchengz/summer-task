var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
// 圆心坐标，半径
var x = 100;
var y = 100;
var r = 80;
// 画圆的路径
function arcPath(x,y,r){
	ctx.beginPath();
	ctx.arc(x,y,r,0,Math.PI*2);
	ctx.closePath();
}
// 计算每个时刻指针的位置
function getPos(a,b){
	var xpos = x + b * Math.sin(a * Math.PI/30);
	var ypos = y - b * Math.cos(a * Math.PI/30);
	return [xpos,ypos];
}
//画图
function draw () {
	ctx.clearRect(0,0,2 * x,2 * y);
	//大表盘的圆
	ctx.strokeStyle = 'rgb(0,0,0)';
	arcPath(x,y,r);
	ctx.stroke();

	for (var i = 0; i < 60; i++) {
		ctx.translate(x,y);
		ctx.rotate(Math.PI/30);
		ctx.translate(-x,-y);
		ctx.strokeStyle = 'rgba(0,0,0,.5)';
		ctx.beginPath();
		ctx.moveTo(x,y);
		ctx.lineTo(x,y - r);
		ctx.stroke();
	}

	ctx.fillStyle = '#FFF';
	arcPath(x,y,r - 4);
	ctx.fill();

	for (var i = 0; i < 12; i++) {
		ctx.translate(x,y);
		ctx.rotate(Math.PI/6);
		ctx.translate(-x,-y);
		ctx.strokeStyle = 'rgba(0,0,0,1)';
		ctx.beginPath();
		ctx.moveTo(x,y);
		ctx.lineTo(x,y - r);
		ctx.stroke();
	}

	ctx.fillStyle = '#FFF';
	arcPath(x,y,r - 8);
	ctx.fill();
	//画指针
	function drawPointer(){
		var time = new Date();
		var h = time.getHours();
		var m = time.getMinutes();
		var s = time.getSeconds();

		function test(which,length){
			var pos = getPos(which,length);
			ctx.strokeStyle = 'rgb('+h+','+m + s+','+s * r/5+')';
			// console.log(h,m,s);
			ctx.beginPath();
			ctx.moveTo(x,y);
			ctx.lineTo(pos[0],pos[1]);
			ctx.closePath();
			ctx.stroke();
		}
		test(5 * (h + m/60),r - 35);
		test(m,r - 12);
		test(s,r);
	}
	drawPointer();
}
draw();
setInterval(draw,1000);