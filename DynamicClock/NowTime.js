var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;
var RANDIUS = 8;
var balls = [];
//const endTime = new Date(2016, 7, 14, 18, 47, 52);//IE 中不支持const
var curShowTimeSeconds = [];
//console.log(endTime);
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
window.onload = function() {
	curShowTimeSeconds = getNowTime();
	canvas.width = WINDOW_WIDTH;
	canvas.height = WINDOW_HEIGHT;
	setInterval(
		function() {
			render(context);//绘制当前画面
			update();
		}, 50);//毫秒是计数单位
}
//得到现在的时间，并且计算与截至时间的毫秒，然后转为秒
function getNowTime() {
	var nowDate = new Date();
	var curTime = [];
	curTime.push(nowDate.getHours());
	curTime.push(nowDate.getMinutes());
	curTime.push(nowDate.getSeconds());
	return curTime;
}

//更新时间以及产生小球和更新小球的位置
function update() {
	var nextShowTimeSeconds = getNowTime();
	if( nextShowTimeSeconds[2] != curShowTimeSeconds[2]) {
		if( parseInt(curShowTimeSeconds[0] / 10) != parseInt(nextShowTimeSeconds[0] / 10)) {
			addBalls(MARGIN_LEFT, MARGIN_TOP, parseInt(curShowTimeSeconds[0] / 10));
		}
		if( parseInt(curShowTimeSeconds[0] % 10) != parseInt(nextShowTimeSeconds[0] % 10)) {
			addBalls(MARGIN_LEFT + 15 * (RANDIUS + 1), MARGIN_TOP, parseInt(curShowTimeSeconds[0] % 10));
		}
		if( parseInt(curShowTimeSeconds[1] / 10) != parseInt(nextShowTimeSeconds[1] / 10)) {
			addBalls(MARGIN_LEFT + 39 * (RANDIUS + 1), MARGIN_TOP, parseInt(curShowTimeSeconds[1] / 10));
		}
		if( parseInt(curShowTimeSeconds[1] % 10) != parseInt(nextShowTimeSeconds[1] % 10)) {
			addBalls(MARGIN_LEFT + 54 * (RANDIUS + 1), MARGIN_TOP, parseInt(curShowTimeSeconds[1] % 10));
		}
		if( parseInt(curShowTimeSeconds[2] / 10) != parseInt(nextShowTimeSeconds[2] / 10)) {
			addBalls(MARGIN_LEFT + 78 * (RANDIUS + 1), MARGIN_TOP, parseInt(curShowTimeSeconds[2] / 10));
		}
		if( parseInt(curShowTimeSeconds[2] % 10) != parseInt(nextShowTimeSeconds[2] % 10)) {
			addBalls(MARGIN_LEFT + 93 * (RANDIUS + 1), MARGIN_TOP, parseInt(curShowTimeSeconds[2] % 10));
		}
		curShowTimeSeconds = nextShowTimeSeconds;
		// updateBalls(); 放在这效果很独特啊
	}
    updateBalls();
}
//渲染数字
function render(cxt) {
	//每一次更新画面，都要先清除画布，否则会叠加
	cxt.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
	/*每个格子的宽度都是2 * (RANDIUS + 1) ,而每个数字都占七个格子，所以数字的
	 宽度就为 14 * (RANDIUS + 1)，再加上数字之间的间隔（RANDIUS + 1)，所以就有
	 以下对每个数字的计算公式
	*/
	renderDight(MARGIN_LEFT, MARGIN_TOP, parseInt(curShowTimeSeconds[0] / 10), cxt);
	renderDight(MARGIN_LEFT + 15 * (RANDIUS + 1), MARGIN_TOP, parseInt(curShowTimeSeconds[0] % 10), cxt);
	renderDight(MARGIN_LEFT + 30 * (RANDIUS + 1), MARGIN_TOP,  10, cxt);
	renderDight(MARGIN_LEFT + 39 * (RANDIUS + 1), MARGIN_TOP, parseInt(curShowTimeSeconds[1] / 10), cxt);
	renderDight(MARGIN_LEFT + 54 * (RANDIUS + 1), MARGIN_TOP, parseInt(curShowTimeSeconds[1] % 10), cxt);
	renderDight(MARGIN_LEFT + 69 * (RANDIUS + 1), MARGIN_TOP,  10, cxt);
	renderDight(MARGIN_LEFT + 78 * (RANDIUS + 1), MARGIN_TOP, parseInt(curShowTimeSeconds[2] / 10), cxt);
	renderDight(MARGIN_LEFT + 93 * (RANDIUS + 1), MARGIN_TOP, parseInt(curShowTimeSeconds[2] % 10), cxt);
//
	for (var i = 0; i < balls.length; i ++) {
		//cxt.globalAlpha = 0.6;
		cxt.fillStyle = balls[i].color;
		//console.log(balls[i].color);
		cxt.strokeStyle = "rgb(245, 212, 217)";
		cxt.beginPath();
		cxt.arc(balls[i].x, balls[i].y, RANDIUS, 0, 2 * Math.PI);
		cxt.closePath();
		cxt.fill();
		cxt.stroke();
	}
}
//更新小球的位置
function updateBalls() {
	for(var i = 0; i < balls.length; i ++) {
		balls[i].x += balls[i].vx;
		balls[i].y += balls[i].vy;
		balls[i].vy += balls[i].g;
		if(balls[i].y >= WINDOW_HEIGHT - RANDIUS) {
			balls[i].y = WINDOW_HEIGHT - RANDIUS;
			balls[i].vy = - balls[i].vy * 0.75;
		}
	}
}

//添加小球
function addBalls(x, y, num) {
	for(var i = 0; i < digit[num].length; i ++) {
		for(var j = 0; j < digit[num][i].length; j++) {
			var aBall = {
				x: x + j * 2 * (RANDIUS + 1) + (RANDIUS + 1),
				y: y + i * 2 * (RANDIUS + 1) + (RANDIUS + 1),
				g: 1.5 + Math.random(),
				vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 5,
				vy: -5 + Math.random(),
				//color:  '#'+(Math.random()*0xffffff<<0).toString(16)
				color: "rgba(" + Math.floor(255 * Math.random()) + "," + Math.floor(255 * Math.random()) +"," + Math.floor(255 * Math.random()) + ", 0.6)"
			};
			balls.push(aBall);
		}
	}
}
//描绘出数字
function renderDight(x, y, num, cxt) {
	cxt.fillStyle = "rgb(0,102,153)";
	cxt.strokeStyle = "rgb(0,202,200)";
	for(var i = 0; i < digit[num].length; i ++) {
		for(var j = 0; j < digit[num][i].length; j++) {
			if(digit[num][i][j] == 1) {
				cxt.beginPath();
				cxt.arc(x + j * 2 * (RANDIUS + 1) + (RANDIUS + 1), y + i * 2 * (RANDIUS + 1) + (RANDIUS + 1), RANDIUS, 0, 2 * Math.PI);
				cxt.closePath();
				cxt.fill();
				cxt.stroke();

			}
		}
	}
}