// JavaScript Document

var canvas = document.getElementById("mainCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height-30;
 
var dx = 0;
var dy = -2;
var ballRad = 10;

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
var pressedRight = false;
var pressedLeft = false;

var brickRowCount = 5;
var brickColCount = 3;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var bricks = [];
for (c = 0; c < brickColCount; c++)
{
	bricks[c] = [];
	for (r = 0; r < brickRowCount; r++)
	{
		bricks[c][r] = { x: 0, y: 0, status: 1 };
	}
}
        
function drawBricks()
{
	for (c=0; c < brickColCount; c++)
	{
		for (r=0; r < brickRowCount; r++)
		{
			//draws the bricks if the status == 1
			if(bricks[c][r].status == 1)
			{
				var brickX = (r * (brickWidth + brickPadding)) + brickOffsetLeft;
				var brickY = (c * (brickHeight + brickPadding)) + brickOffsetTop;
				
				bricks[c][r].x = brickX;
				bricks[c][r].y = brickY;
				
				ctx.beginPath();
				ctx.rect(brickX, brickY, brickWidth, brickHeight);
				ctx.fillStyle = "#0095DD";
				ctx.fill();
				ctx.closePath();
			}
		}
	}
}

function drawBall() 
{
	ctx.beginPath();
	ctx.arc(x, y, ballRad, 0, Math.PI*2);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}

function drawPaddle()
{
	ctx.beginPath();
	ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}

//Key pressed? Switch Bools!
function keyDwnHandler(e)
{
	if(e.keyCode == 39)
	{
		pressedRight = true;
	}
	if(e.keyCode == 37)
	{
		pressedLeft = true;
	}
}

//Let up off the keys? Switch bools!
function keyUpHandler(e)
{
	if(e.keyCode == 39)
	{
		pressedRight = false;
	}
	if(e.keyCode == 37)
	{
		pressedLeft = false;
	}
}

function collisionDetection() 
{
	for(c=0; c<brickColCount; c++)
	{
		for(r=0; r<brickRowCount; r++)
		{
			var b = bricks[c][r];
			if(b.status == 1)
			{
				if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight)
				{
					dy = -dy;
					b.status = 0;
				}
			}
		}	
	}
}

function draw() 
{
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBricks();
	drawBall();
	drawPaddle();
	collisionDetection()
	x += dx;
	y += dy;
	
	//Y-Axis limits
	if(y + dy < ballRad)
	{
		dy = -dy;
	}
	else if(y + dy > canvas.height - ballRad)
	{
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
	
	//X-Axis limits
	if(x + dx  < ballRad)
	{
		dx = -dx;
	}
	else if (x + dx > canvas.width - ballRad)
	{
		dx = -dx;
	}
	
	//Paddle movement
	if(pressedRight && paddleX < canvas.width - paddleWidth)
	{
		paddleX += 7;
	}
	if(pressedLeft && paddleX > 0)
	{
		paddleX -= 7;
	}
}
        
//event listeners for player control
document.addEventListener("keydown", keyDwnHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

//sets the game/refresh loop for the game
setInterval(draw, 10);
