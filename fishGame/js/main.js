var can1,can2;
var ctx1,ctx2;

var canWith, canHeight;
var lastTime, deltaTime;

var bgImg = new Image();

var ane,fruit;
var mom;
var mx,my;//鼠标位置
function game() {

	init();
	lastTime = Date.now();
	deltaTime = 0;
	gameloop();
}
//初始化函数
function init() {

	can1 = document.getElementById("canvas1");
	ctx1 = can1.getContext("2d");
	can2 = document.getElementById("canvas2");
	ctx2 = can2.getContext("2d");

	can1.addEventListener('mousemove', onMouseMove, false);//监听函数
	canWith = can1.width;
	canHeight = can1.height;

	bgImg.src = "./src/background.jpg";
	

	ane = new aneObj();
	ane.init();

	fruit = new fruitObj();
	fruit.init();

	mom  = new momObj();
	mom.init();

	mx = canWith * 0.5;
	my = canHeight * 0.5;

}

function gameloop() {
	window.requestAnimationFrame(gameloop);//当前绘制完成之后，根据当前的机器来执行，
	//相对于setimeout等更科学，帧间隔每次都一定是一样的
	//不同浏览器需要配适
	var now = Date.now();//获取两的时间间隔
	deltaTime = now - lastTime;
	lastTime = now;//更新时间
	if(deltaTime > 40) {//因为deltaTime后面会变得无限大，而小圆的大小是根据deltaTime，这里限制deltaTime的最大值，避免小圆变得很大
		deltaTime = 40;
	}
	dramBackground();
	ane.draw();

	fruit.draw();
	update();

	ctx1.clearRect(0, 0, canWith, canHeight);
	mom.draw();

	momFruitsCollision();
}
//鼠标移动
function onMouseMove(e) {
	if(e.offSetX || e.layerX) {
		mx = e.offSetX  == undefined ? e.layerX : e.offSetX;
		my = e.offSetY == undefined ? e.layerY : e.offSetY;
	}
}

window.onload = function() {
	game();
}