//判断鱼和果实的距离
function momFruitsCollision() {
	for(var i = 0; i < fruit.num; i++) {
		if(fruit.alive[i]) {
			var len = calLength2(fruit.x[i], fruit.y[i], mom.x, mom.y);
			if(len < 900) {
				fruit.dead(i);
			}
		}
	}
}