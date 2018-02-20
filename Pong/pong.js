// JavaScript is grabbing the canvas setup in the HTML file.
var container = document.getElementById('container');
var box = container.getContext('2d');

// redPlayer score
var redPlayer = 0;
// bluePlayer score
var bluePlayer = 0;

// Object that sets the variables for redPlayer.
var redBox = {
    x: 20,
    y: 250,
    dx: 0,
    dy: 3,
    width: 25,
    height: 100,
    fillStyle: 'red',
};
// Object that sets the variables for bluePlayer.
var blueBox = {
    x: 960,
    y: 250,
    dx: 0,
    dy: 3,
    width: 25,
    height: 100,
    fillStyle: 'blue',
};
// Object that sets the variables for the purpleCircle.
var purpleCircle = {
    x: 500,
    y: 250,
    dx: 3,
    dy: 3,
    r: 15,
    sAngle: 0,
    eAngle: 2*Math.PI,
    fillStyle: 'purple',
};

// These variables are used to allow the blue and red players to control their paddles.
var upPressed = false;
var downPressed = false;
var upPressed2 = false;
var downPressed2 = false;
// These methods are used to gain access to the keyboard.
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// These functions allow the red and blue players to use the W key , S key, down arrow, or up arrow key to move the redBox or blueBox.
function keyDownHandler(e) {
    // Press "W"
    if(e.keyCode === 87) {
        upPressed2 = true;
    }
    // Press "S"
    else if(e.keyCode === 83) {
        downPressed2 = true;
    }
    // Press up arrow key
    if(e.keyCode === 38) {
        upPressed = true;
    }
    // Press down arrow key
    else if(e.keyCode === 40) {
        downPressed = true;
    }
}
function keyUpHandler(e) {
    if(e.keyCode === 87) {
        upPressed2 = false;
    }
    else if(e.keyCode === 83) {
        downPressed2 = false;
    }
    if(e.keyCode === 38) {
        upPressed = false;
    }
    else if(e.keyCode === 40) {
        downPressed = false;
    }
}

// Draws redBox
function drawRed(){
    box.beginPath();
    box.rect(redBox.x, redBox.y, redBox.width, redBox.height);
    box.fillStyle = redBox.fillStyle;
    box.fill();
    box.closePath();
}
// Draws blueBox
function drawBlue(){
    box.beginPath();
    box.rect(blueBox.x, blueBox.y, blueBox.width, blueBox.height);
    box.fillStyle = blueBox.fillStyle;
    box.fill();
    box.closePath();
}
// Draws purpleCircle
function drawPurple(){
    box.beginPath();
    box.arc(purpleCircle.x, purpleCircle.y, purpleCircle.r, purpleCircle.sAngle, purpleCircle.eAngle);
    box.fillStyle = purpleCircle.fillStyle;
    box.fill();
    box.closePath;
}

// When purpleCircle collides with blueBox it reverses purpleCircles direction.
function bluePurpleCollision(){
    if (blueBox.x < purpleCircle.x + purpleCircle.r &&
        blueBox.x + blueBox.width > purpleCircle.x &&
        blueBox.y < purpleCircle.y + purpleCircle.r &&
        blueBox.height + blueBox.y > purpleCircle.y){
            purpleCircle.dy = -purpleCircle.dy;
            purpleCircle.dx = -purpleCircle.dx;
   }
}
// When purpleCircle collides with redBox it reverses purpleCircles direction.
function redPurpleCollision(){
    if (redBox.x < purpleCircle.x + purpleCircle.r &&
        redBox.x + redBox.width > purpleCircle.x &&
        redBox.y < purpleCircle.y + purpleCircle.r &&
        redBox.height + redBox.y > purpleCircle.y){
            purpleCircle.dy = -1.05*purpleCircle.dy;
            purpleCircle.dx = -1.05*purpleCircle.dx;
   }
}
// This function draws the redPlayer's score in the upper left corner of the canvas.
function drawRedScore(){
    box.font = "16px Arial";
    box.fillStyle = "#0095DD";
    box.fillText("Score: " + redPlayer, 8, 20)
}
// This function draws the bluePlayer's score in the upper right corner of the canvas.
function drawBlueScore(){
    box.font = "16px Arial";
    box.fillStyle = "#0095DD";
    box.fillText("Score: " + bluePlayer, 940, 20)
}
// The draw function is what initializes the game and draws, clears, and redraws all the characters in the game.
// This function also controls the movement of the characters and keeps track of the score.
function draw(){
    box.clearRect(0, 0, 1000, 500) // Clears the canvas to allow for movement.
    drawRed();
    drawBlue();
    drawPurple();
    bluePurpleCollision();
    redPurpleCollision();
    drawRedScore();
    drawBlueScore();

    // Red Box Movement
    if(upPressed2 && redBox.y > 0) {
        redBox.y -= redBox.dy;
    }
    else if(downPressed2 && redBox.y < 400) {
        redBox.y += redBox.dy;
    }
    // Blue Box Movement
    if(upPressed && blueBox.y > 0) {
        blueBox.y -= blueBox.dy;
    }
    else if(downPressed && blueBox.y < 400) {
        blueBox.y += blueBox.dy;
    }
    // Purple Circle Movement
    purpleCircle.x += purpleCircle.dx;
    purpleCircle.y += purpleCircle.dy;
    if(purpleCircle.y + purpleCircle.dy > 485 || purpleCircle.y + purpleCircle.dy < 15){
        purpleCircle.dy = -purpleCircle.dy;
    }
    if(purpleCircle.x >= 1000) {
        purpleCircle.x = 500;
        purpleCircle.y = 250;
        redPlayer++;
    }
    if(purpleCircle.x <= 0) {
        purpleCircle.x = 500;
        purpleCircle.y = 250;
        bluePlayer++;
    }
    // Red player wins
    if(redPlayer >= 5) {
        window.location.reload();
        alert("redplayer has scored 5 points and has won!");
    }
    // Blue player wins
    if(bluePlayer >= 5) {
        window.location.reload();
        alert("blueplayer has scored 5 points and has won!");
    }
}

// setInterval is what powers the game. It redraws the canvas every 10 miliseconds.
setInterval(draw, 10);
