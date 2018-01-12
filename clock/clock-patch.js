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

// !!!! 应该单独把这个拿出来 如果放在 draw 里面 那么每次执行 draw 的时候都会声明一次 
// !!!! test 也一样 应该拿出来
function drawPointer(){
	var time = new Date();
	var h = time.getHours();
	var m = time.getMinutes();
	var s = time.getSeconds();

	test(5 * (h + m/60),r - 30);
	test(m,r - 12);
	test(s,r);
}

`
    !!!! 变量名不能随便取 
`
function test(which,length){
	var pos = getPos(which,length);
	// ctx.strokeStyle = 'rgb('+h+','+m + s+','+s * r/5+')';
	// console.log(h,m,s);
	ctx.beginPath();
	ctx.moveTo(x,y);
	ctx.lineTo(pos[0],pos[1]);
	ctx.closePath();
	ctx.stroke();
}

//画图
function draw () {
	ctx.clearRect(0,0,2 * x,2 * y);

	ctx.strokeStyle = 'rgb(0,0,0)';
	arcPath(x,y,r);
	ctx.stroke();

`
	!!!! 这个画表盘的操作 应该抽象成函数： drawWatch(howMany, length); 
	!!!! 这样可以提高抽象程度 
`
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

	drawPointer();
}

draw();
`
	[HINT] 应该存储 setInterval 的返回值 timer
		利用 timer 可以停止计时器 
	
		var timer = setInterval(draw,1000);

		// 取消定时器
		function stopClocking(theClockTimer){
			clearInterval(theClockTimer); 
		}
`

`
	!!!! [HINT] 尽量不要在函数里面声明函数，除非你有更好的理由 
	            比如在 A 的函数体里面声明 a 函，那么在调用 A 的时候 a 会被声明一次
	            如果多次调用 A ，a也会被声明多次，会拖慢代码执行速度 
	!!!! [HINT] 出于完备性的考虑，你应该存储 setInterval 的返回值并建立好结束定时器的函数

	!!!! [HINT] 三个指针分针秒针时针均为 "X针" 
	            我们仅需要：
				    1. 长度 
					2. 角度 
				即可绘制出来。 

				因此需要一个构造函数 Pointer 来创建 X针 对象
				
				比如: 

				var 分针 = new Pointer(长度, 初始角度, 一个用于获取当前分钟对应角度的函数); 
				var 秒针 = new Pointer(长度, 初始角度, 一个用于获取当前秒数对应角度的函数); 
				var 时针 = new Pointer(长度, 初始角度, 一个用于获取当前时针对应角度的函数); 

				// 绘制分针
				[分针, 秒针, 时针].forEach(
					// render 是定义在 Pointer.prototype 上的方法
					// 根据 this.长度 this.初始角度 和 this.一个用于获取当前X针对应角度的函数() 来完成绘图
					pointer => pointer.render()
				); 
`
