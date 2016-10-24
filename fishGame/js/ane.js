var aneObj = function() {
	// start point control point end point(sin)
	this.rootx = [];// start point
	this.headx = [];//control point x
	this.heady = [];//control point y
	this.amp = [];//每个海葵都有自己单独的海葵
	this.alpha = 0;
	//this.len = [];
}
aneObj.prototype.num = 50;

aneObj.prototype.init = function() {
	//画num个海葵
	for(var i = 0; i < this.num; i++) {

		this.rootx[i] = i * 16 + Math.random() * 20;
		this.headx[i] = this.rootx[i];
		this.heady[i] = canHeight - 250 + Math.random() * 50;
		this.amp[i] = Math.random() * 50 + 50;
	}
}
aneObj.prototype.draw = function() {
	this.alpha += deltaTime * 0.001;//正弦中的x坐标是随着时间慢慢增加的
	var len = Math.sin(this.alpha)//正弦中的y坐标是如何变化的 [-1, 1]

	ctx2.save();
	ctx2.globalAlpha = 0.6;
	ctx2.lineWidth = 20;
	ctx2.lineCap = "round";
	ctx2.strokeStyle = "#3b154e";
	for(var i = 0; i < this.num; i++) {

		ctx2.beginPath();
		ctx2.moveTo(this.rootx[i], canHeight);
		ctx2.quadraticCurveTo(this.rootx[i], canHeight - 100, this.headx[i] + len * this.amp[i], this.heady[i] );
	
		ctx2.stroke();
		ctx2.closePath();
	}
	ctx2.restore();
}
//绘制摆动的海葵
//贝塞尔二次曲线 正弦函数（结束点的轨迹）