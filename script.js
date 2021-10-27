let playerScore = 0;
let paddle;
let ball;
let bricks;
let isPlaying;



function setup() {
	createCanvas(800, 600);


	isPlaying = true;
	let colors = createColors();
	paddle = new Paddle();
	ball = new Ball(paddle);
	bricks = createBricks(colors);

}

function createColors() {
	const colors = []
	colors.push(color(84, 157, 138))
	colors.push(color(135, 206, 250))
	colors.push(color(147, 112, 219))

	return colors
  }

function createBricks(colors) {
	const bricks = []
	const rows = 5
	const bricksPerRow = 10
	const brickWidth = width / bricksPerRow
	for (let row = 0; row < rows; row++) {
	  for (let i = 0; i < bricksPerRow; i++) {
		brick = new Brick(createVector(brickWidth * i, 25 * row), brickWidth, 25, colors[floor(random(0, colors.length))])
		bricks.push(brick) 
	  }
	}
	return bricks
  }

function draw() {
	background(0);

	if(isPlaying) {

	}

	textSize(32);
	fill(255);
	text(`Score: ${playerScore}`, width - 150, 50);
	


	if (keyIsDown(LEFT_ARROW)) {
		paddle.move("left");
	} else if (keyIsDown(RIGHT_ARROW)) {
		paddle.move("right");
	}

	paddle.display();
	ball.update();
	ball.display();
	ball.bounceEdge();
	ball.bouncePaddle();

	if(ball.belowBottom()) {
		isPlaying = false;
		fill(200, 0, 0);
		text("you lose!", width/2 -175, height/2);
		playerScore = 0;
	}
	for(let i = bricks.length - 1; i >= 0; i--) {
		const brick = bricks[i];
		brick.display();
		if(brick.isColliding(ball)) {
			ball.reverse("y");
			bricks.splice(i, 1);
			playerScore += brick.points;
		}
	}

	if(bricks.length === 0) {
		isPlaying = false;
		console.log("0 bricks");
		fill(255);
		text("All Bricks Destroyed!", width/2 -175, height/2);
		;
	}
}

