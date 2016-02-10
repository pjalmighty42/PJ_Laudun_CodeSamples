// JavaScript Document

var canvas = document.getElementById("myCanvas");		//Get the canvas
var context = canvas.getContext("2d");					//creates a 2D render area with canvas

//Input Listeners
document.addEventListener("keydown", KeyDownHandler, false);
document.addEventListener("keyup", KeyUpHandler, false);

//Ball Position X/Y
var x = canvas.width/2;
var y = canvas.height - 30;
//Ball Delta movement vars
var dx = 1.5;
var dy = -1.5;

//Ball & Paddle size vars
var ballRadius = 10;
var paddleHeight = 10;
var paddleWidth = 75;

//Paddle Pos X
var paddleX = (canvas.width-paddleWidth)/2;

//Bools for Paddle movement
var rightPressed = false;
var leftPressed = false;

//Brick grid vars & Array
var brickRowCount = 3;
var brickColCount = 5;
var bricks = [];

//Brick size vars
var brickW = 75;
var brickH = 20;

//Brick spacing
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

function KeyDownHandler(e)
{
	if(e.keyCode == 39)
	{
		rightPressed = true;
	}
	else if(e.keyCode == 37)
	{
		leftPressed = true;
	}
}

function KeyUpHandler(e)
{
	if(e.keyCode == 39)
	{
		rightPressed = false;
	}
	else if(e.keyCode == 37)
	{
		leftPressed = false;
	}
}

function DrawBricks()
{
	for(c=0; c < brickColCount; c++)
	{
		for(r = 0; r < brickRowCount; r++)
		{
			//Vars that will compute the spacing between the bricks
			var brickX = (c * (brickW + brickPadding)) + brickOffsetLeft;
			var brickY = (r * (brickH + brickPadding)) + brickOffsetTop;
			
			bricks[c][r].x = brickX;
			bricks[c][r].y = brickY;
			
			//Draw the bricks
			context.beginPath();
			context.rect(brickX, brickY, brickW, brickH);
			context.fillStyle = "#0095DD";
			context.fill();
			context.closePath();
		}
	}
}

function DrawBall()
{
	context.beginPath();
	context.arc(x, y, ballRadius, 0, Math.PI*2);
	context.fillStyle = "#0095DD";
	context.fill();
	context.closePath();
}

function DrawPaddle()
{
	context.beginPath();
	context.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
	context.fillStyle = "#0095DD";
	context.fill();
	context.closePath();
}

function WallCheck()
{
	//Top and Game Over Limits
	if(y + dy < ballRadius)
	{
		dy = -dy;
	}
	else if(y + dy > canvas.height-ballRadius)
	{
		//Game Over unless it hits the paddle
		if(x > paddleX && x < paddleX + paddleWidth)
		{
			dy = -dy;
		}
		else
		{
			alert("GAME OVER!");
			document.location.reload();
		}
	}
	//Left & Right Limits
	if(x + dx < 10 || x + dx > canvas.width - 10)
	{
		dx = -dx;
	}
}

//Creates a loop to cycle draw() every 10ms
function draw()
{
	context.clearRect(0, 0, canvas.width, canvas.height);
	DrawBricks();
	DrawBall();
	DrawPaddle();
	
	WallCheck();
	
	//Move the paddle
	if(rightPressed && paddleX < canvas.width-paddleWidth)
	{
		paddleX += 7;
	}
	else if(leftPressed && paddleX > 0)
	{
		paddleX -= 7;
	}
	
	//Moves the above ball
	x += dx;
	y += dy;
}
setInterval(draw, 10);