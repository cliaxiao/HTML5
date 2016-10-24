var fruitObj = function() {
	this.alive = [];
	this.x = [];
	this.y = [];
	this.length = [];
	this.speed = [];
	this.fruitType = [];
	this.img = new Image();
	//this.blue = new Image();
}

fruitObj.prototype.num = 30;

fruitObj.prototype.init = function() {
	for(var i = 0; i < this.num; i++) {
		this.alive[i] = true;
		this.x[i] = 0;
		this.y[i] = 0;
		this.speed[i] = Math.random() * 0.017 + 0.003;//[0.005, 0.035]
		
	}
	//this.orange.src = "./src/fruit.png";
	//this.blue.src = "./src/blue.png"
	//console.log(this.orange.src)
} 

fruitObj.prototype.draw = function() {
	for(var i = 0; i < this.num; i++) {
		if(	this.alive[i]) {
			if(this.fruitType[i] == "blue") {
				this.img.src = "./src/blue.png";
			} else {
				this.img.src = "./src/fruit.png";
			}
			if(this.length[i] <= 14) {
				this.length[i] += this.speed[i] * deltaTime;
			} else {
				this.y[i] -= this.speed[i] * 6 * deltaTime;
			}
			
			ctx2.drawImage(this.img, this.x[i] - this.length[i] * 0.5 , this.y[i] - this.length[i] * 0.5, this.length[i], this.length[i]);
		 	
		 	if(this.y[i] < 10) {//如果小圆点的y位置小于10则代表其出去了canvas，这个时候生成新的小圆点，也就
		 		this.alive[i] = false;
		 	}

		}
	
	}

}

function update() {
	var num = 0;
	for(var i = 0; i < fruit.num; i++) {
		if(fruit.alive[i]) {
			num++;
		}
	}
	if( num < 15) {//保证小圆点一直有15个
		sendFruit();
		return;
	}
}

function sendFruit() {
	for(var i = 0; i < fruit.num; i++) {
		if(!fruit.alive[i]) {
			fruit.born(i);
			return;
		}
	}
}

fruitObj.prototype.born = function(i) {
	//产生一个新的小圆点，如果小圆点被鱼吃掉了，这个时候将这个小圆点重绘，也就是可以使得当前被吃掉的小圆点消失
	var aneID = Math.floor(Math.random() * ane.num);
	this.x[i] = ane.headx[aneID];
	this.y[i] = ane.heady[aneID];
	this.length[i] = 0;
	this.alive[i] = true;
	var range = Math.random();
	if(range < 0.2) {
		this.fruitType[i] = "blue";
	} else {
		this.fruitType[i] = "orange";
	}
	
}

fruitObj.prototype.dead = function(i) {
	
	this.alive[i] = false;
	
	
}

