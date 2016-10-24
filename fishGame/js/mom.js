var momObj = function() {
	this.x ;
	this.y;
	this.angle;
	this.bigEye = new Image();
	this.bigBody = new Image();
	this.bigTail = new Image();
}
momObj.prototype.init = function() {
	this.x = canWith * 0.5;
	this.y = canHeight * 0.5;
	this.angle = 0;
	this.bigEye.src = "./src/bigEye0.png";
	this.bigBody.src = "./src/bigSwim0.png";
	this.bigTail.src = "./src/bigTail0.png";
}
momObj.prototype.draw = function() {

	this.x = lerpDistance(mx, this.x, 0.98);//让鱼跟随鼠标运动
	this.y = lerpDistance(my, this.y, 0.98);

	//计算鼠标和鱼的角度查
	var deltaY = my - this.y;
	var deltaX = mx - this.x; 
	var beta = Math.atan2(deltaY, deltaX) + Math.PI;//期返回值是[-PI, PI]
	this.angle = lerpAngle(beta, this.angle, 0.6);//计算旋转角度

	ctx1.save();
	ctx1.translate(this.x, this.y);
	ctx1.rotate(this.angle);
	ctx1.drawImage(this.bigEye, -this.bigEye.width * 0.5, -this.bigEye.height * 0.5);
	ctx1.drawImage(this.bigBody, -this.bigBody.width * 0.5, -this.bigBody.height * 0.5);
	ctx1.drawImage(this.bigTail, -this.bigTail.width * 0.5 + 30, -this.bigTail.height * 0.5);
	ctx1.restore();
}