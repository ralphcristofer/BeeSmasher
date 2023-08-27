"use strict";

// Create the canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 900;
canvas.height = 550;

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};

bgImage.src = "./images/bg.jpg";

// Game objects
var beeReady = false;
var beeImage = new Image();
beeImage.onload = function () {
    beeReady = true;
};
beeImage.src = "./images/honeybee.png";

// Game objects
var bee = {
    x: 0,
    y: 0,
    width: 32,
    height: 32
};

// Speed of the Bee
var moveInterval = 3000;
var isReset = false;
var resetSpeed = function () {
    moveInterval = 3000;
    clearInterval(moveBeeInterval);
    moveBeeInterval = setInterval(moveBee, moveInterval);
};
var resetSpeedButton = document.getElementById("resetSpeed");
resetSpeedButton.addEventListener("click", resetSpeed);

// Initial Score and the function to reset the score
var score = 0;
var resetScore = function () {
    score = 0;
    bee.width = 32;
    bee.height = 32;
    beeImage.src = "./images/honeybee.png";
};
var resetScoreButton = document.getElementById("resetScore");
resetScoreButton.addEventListener("click", resetScore);

// Handle keyboard controls
canvas.addEventListener("mousedown", onMouseDown);

function onMouseDown(event) {
    var rect = canvas.getBoundingClientRect();
    var mouseX = event.clientX - rect.left;
    var mouseY = event.clientY - rect.top;

    if (mouseX >= bee.x &&
        mouseX <= bee.x + bee.width &&
        mouseY >= bee.y &&
        mouseY <= bee.y + bee.height) {
            score++;
            moveBee();
            moveInterval -= 100;
            if (score > 30) {
                moveBee();
            } else if (score == 30) {
                window.alert("Swarm Mode Activated! Bee Swarmed!");
            } else if (score > 20) {
                bee.width = 192;
                bee.height = 192;
                moveBee();
            } else if (score == 20) {
                window.alert("It's Bee-Challenge! Don't Bee Confused!");
                beeImage.src = "./images/imageHeader.png";
            } else if (score == 10) {
                window.alert("Bee-Ready! Bee is quicker!");
                bee.width = 128;
                bee.height = 128;
            } else if (score == 5) {
                window.alert("It's Bee-volution!");
                bee.width = 64;
                bee.height = 64;
            }
            clearInterval(moveBeeInterval);
            moveBeeInterval = setInterval(moveBee, moveInterval);
        }
}

// Reset the game when the player catches a monster
var moveBee = function () {

    if (score > 30) {
        var randomBeeSize = Math.floor(Math.random() * (256 - 64 + 1)) + 64;
        bee.width = randomBeeSize;
        bee.height = randomBeeSize;
    } 

    bee.x = (Math.random() * (canvas.width - bee.width));
    bee.y = (Math.random() * (canvas.height - bee.height));
};

var render = function () {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }

    if (beeReady) {
        ctx.drawImage(beeImage, bee.x, bee.y, bee.width, bee.height);
    }

    ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
    document.getElementById("score").innerHTML = score;
}

var moveBeeInterval = setInterval(moveBee, moveInterval);
setInterval(render, 3000 / 60);

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;