// JavaScript is grabbing the canvas setup in the HTML file.
var container = document.getElementById('container');
var box = container.getContext('2d');

// Total is the score of the user.
var total = 0;
// Lives restricts how many times a user can be hit.
var lives = 3;

// These Objects control the variables for the computer controlled characters.
var redBox = {
    x: 0,
    y: 125,
    dx: 5,
    dy: 0,
    width: 50,
    height: 50,
    fillStyle: 'red',
};
var blueBox = {
    x: 1000,
    y: 250,
    dx: 8,
    dy: 0,
    width: 50,
    height: 50,
    fillStyle: 'blue',
};
var purpleBox = {
    x: 1000,
    y: 50,
    dx: 4,
    dy: 0,
    width: 50,
    height: 50,
    fillStyle: 'purple',
};
var yellowBox = {
    x: 0,
    y: 375,
    dx: 3,
    dy: 0,
    width: 50,
    height: 50,
    fillStyle: 'yellow',
};
// This is the user's character in the game.
var greenBox = {
    x: 500,
    y: 450,
    dx: 3,
    dy: 3,
    width: 50,
    height: 50,
    fillStyle: 'green',
};

// These variables are used to allow the user to control the 'greenBox' object.
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
// These methods allow the user to use the keyboard to move the greenBox Object.
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// These functions allow the user to use the arrow keys to move the 'greenBox' Object.
function keyDownHandler(e) {
    if(e.keyCode === 39) {
        rightPressed = true;
    }
    else if(e.keyCode === 37) {
        leftPressed = true;
    }
    else if(e.keyCode === 38) {
        upPressed = true;
    }
    else if(e.keyCode === 40) {
        downPressed = true;
    }
}
function keyUpHandler(e) {
    if(e.keyCode === 39) {
        rightPressed = false;
    }
    else if(e.keyCode === 37) {
        leftPressed = false;
    }
    else if(e.keyCode === 38) {
        upPressed = false;
    }
    else if(e.keyCode === 40) {
        downPressed = false;
    }
}
// Draws 'redBox' object
function drawRed(){
    box.beginPath();
    box.rect(redBox.x, redBox.y, redBox.width, redBox.height);
    box.fillStyle = redBox.fillStyle;
    box.fill();
    box.closePath();
}
// Draws 'blueBox' object
function drawBlue(){
    box.beginPath();
    box.rect(blueBox.x, blueBox.y, blueBox.width, blueBox.height);
    box.fillStyle = blueBox.fillStyle;
    box.fill();
    box.closePath();
}
// Draws 'purpleBox' object
function drawPurple(){
    box.beginPath();
    box.rect(purpleBox.x, purpleBox.y, purpleBox.width, purpleBox.height);
    box.fillStyle = purpleBox.fillStyle;
    box.fill();
    box.closePath();
}
// Draws 'yellowBox' object
function drawYellow(){
    box.beginPath();
    box.rect(yellowBox.x, yellowBox.y, yellowBox.width, yellowBox.height);
    box.fillStyle = yellowBox.fillStyle;
    box.fill();
    box.closePath();
}
// Draws 'greenBox' object
function drawGreen(){
    box.beginPath();
    box.rect(greenBox.x, greenBox.y, greenBox.width, greenBox.height);
    box.fillStyle = greenBox.fillStyle;
    box.fill();
    box.closePath();
}

// When redBox and greenBox collide it resets greenBox's location and reduces the user's lives.
function redGreenCollision(){
    if (redBox.x < greenBox.x + greenBox.width &&
    redBox.x + redBox.width > greenBox.x &&
    redBox.y < greenBox.y + greenBox.height &&
    redBox.height + redBox.y > greenBox.y){
        greenBox.y = 450;
        lives--;
   }
}
// When blueBox and greenBox collide it resets greenBox's location and reduces the user's lives.
function blueGreenCollision(){
    if(blueBox.x < greenBox.x + greenBox.width &&
    blueBox.x + blueBox.width > greenBox.x &&
    blueBox.y < greenBox.y + greenBox.height &&
    blueBox.height + blueBox.y > greenBox.y){
        greenBox.y = 450;
        lives--;
    }
}
// When purpleBox and greenBox collide it resets greenBox's location and reduces the user's lives.
function purpleGreenCollision(){
    if (purpleBox.x < greenBox.x + greenBox.width &&
    purpleBox.x + purpleBox.width > greenBox.x &&
    purpleBox.y < greenBox.y + greenBox.height &&
    purpleBox.height + purpleBox.y > greenBox.y){
       greenBox.y = 450;
       lives--;
   }
}
// When yellowBox and greenBox collide it resets greenBox's location and reduces the user's lives.
function yellowGreenCollision(){
    if (yellowBox.x < greenBox.x + greenBox.width &&
    yellowBox.x + yellowBox.width > greenBox.x &&
    yellowBox.y < greenBox.y + greenBox.height &&
    yellowBox.height + yellowBox.y > greenBox.y){
       greenBox.y = 450;
       lives--;
   }
}

// This function draws the score of the game in the upper left corner of the canvas.
function drawScore(){
    box.font = "16px Arial";
    box.fillStyle = "#0095DD";
    box.fillText("Score: " + total, 8, 20)
}
// This function draws the lives of the user in the upper right corner of the canvas.
function drawLives(){
    box.font = "16px Arial";
    box.fillStyle = "#0095DD";
    box.fillText("Lives: " + lives, 940, 20)
}

// The draw function is what initializes the game and draws, clears, and redraws all the characters in the game.
// This function also controls movement of the characters and keeps track of the score and lives.
function draw(){
    box.clearRect(0, 0, 1000, 500) // Clears the canvas to allow for movement.
    drawRed();
    drawBlue();
    drawPurple();
    drawYellow();
    drawGreen();
    redGreenCollision();
    blueGreenCollision();
    purpleGreenCollision();
    yellowGreenCollision();
    drawScore();
    drawLives();
    // Red Box Movement
    redBox.x += redBox.dx;
    redBox.y += redBox.dy;
    if(redBox.x === 1000){
        redBox.x = 0;
    }
    // Blue Box Movement
    blueBox.x -= blueBox.dx;
    blueBox.y -= blueBox.dy;
    if(blueBox.x === 0){
        blueBox.x = 1000;
    }
    // Purple Box Movement
    purpleBox.x -= purpleBox.dx;
    purpleBox.y -= purpleBox.dy;
    if(purpleBox.x === 0){
        purpleBox.x = 1000;
    }

    // Yellow Box Movement
    yellowBox.x += yellowBox.dx;
    yellowBox.y += yellowBox.dy;
    if(yellowBox.x === 999){
        yellowBox.x = 0;
    }
    // Green Box Movement
    if(rightPressed && greenBox.x < 950) {
        greenBox.x += greenBox.dx;
    }
    else if(leftPressed && greenBox.x > 0) {
        greenBox.x -= greenBox.dx;
    }
    else if(upPressed && greenBox.y > 0) {
        greenBox.y -= greenBox.dy;
    }
    else if(downPressed && greenBox.y < 450) {
        greenBox.y += greenBox.dy;
    }
    else if(greenBox.y === 0){
        greenBox.y = 450;
        total++;
    }
    // Game is ended and reset if the score reaches 10 or if lives are reduced to zero.
    if(total === 10) {
        window.location.reload();
        alert("You have scored 10 points and have won!");
    }
    if(lives === 0) {
        window.location.reload();
        alert("You have lost all your lives!");
    }
}

// setInterval is what powers the game. It redraws the canvas every 10 miliseconds.
setInterval(draw, 10);
