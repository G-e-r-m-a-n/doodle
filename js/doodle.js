const canvas = document.getElementById('field');
const ctx = canvas.getContext('2d');

const bgImage = new Image();
bgImage.src = "img/background.png"
const doodleImage = new Image();
doodleImage.src = "img/doodle.png"
const plImage = new Image();
plImage.src = "img/platform.png"

var player;
var platforms = [];
var isAlive = true;
var h = 200;

class Doodle {
	constructor(x, y) {
		this.x = x;
		this.y = y;

		this.dx = 0;
		this.dy = 10;

		this.score = 0;

		this.img = doodleImage;
	}

	changeDirection(event) {
	}

	move(event) {
		var rect = canvas.getBoundingClientRect();
		var newX = Math.floor(event.clientX - rect.left);
		if ((newX > 0) && (newX + 80 < 400)){
			this.x = newX;
		}
	}

	fall() {
		this.y += this.dy;
	}

	draw() {
		ctx.drawImage(this.img, this.x, this.y)
	}

	collide() {
		for(var i = 0; i < platforms.length; i++) {
			if((this.x + 62 > platforms[i].x) && (this.x + 20 < platforms[i].x + 62) &&  (this.y + 70 > platforms[i].y) && (this.y + 70 < platforms[i].y + 14) && (this.dy > 0)) {
				this.dy = -10;
			}
		}
	}

	isDead(newHead) {
	}
}

function gameOver() {
	ctx.fillStyle = "black"
	ctx.font = "50px Arial";
	ctx.fillText("GAME OVER", 40, 300);	
	clearInterval(game)
}

function youWin() {
	ctx.fillStyle = "red"
	ctx.font = "50px Arial";
	ctx.fillText("You Win", 70, 90);
	clearInterval(game)
}

function init() {
	player = new Doodle(100, 100);

	for(var i = 0; i < 9; i++) {
		platforms.push({x: Math.floor(Math.random()*330), y: i*50 + 170});
	}
}

function tick() {
	player.dy += 0.2;
	player.fall();

	if(player.y > 533) {
		isAlive = false;
		gameOver();
	}

	if (player.y < h) {
		player.y = h;
		player.score += 1;
		for(var i = 0; i < platforms.length; i++) {
			platforms[i].y -= player.dy;
			if(platforms[i].y > 533) {
				platforms[i].y = 0;
				platforms[i].x = Math.floor(Math.random()*330);
			}
		}
	}
}

function drawAll() {
	ctx.drawImage(bgImage, 0, 0);

	for(var i = 0; i < platforms.length; i++) {
		ctx.drawImage(plImage, platforms[i].x, platforms[i].y);
	}

	ctx.fillStyle = "black"
	ctx.font = "50px Arial";
	ctx.fillText(player.score, 10, 50);

	player.draw();
}

function gameLoop() {
	tick();
	player.collide();
	if (isAlive) {
		drawAll();
	}
}


function main() {
	init();

	game = setInterval(gameLoop, 20)
}

document.addEventListener("keydown", function chdir(event) {
	player.changeDirection(event);
})


canvas.addEventListener("mousemove", function chdir(event) {
	player.move(event);
})

main()