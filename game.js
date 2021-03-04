//imported modules

import {update as updateSnake, draw as drawSnake, snakeSpeed, gameBoard} from './snake.js';
import { update as updateApple, draw as drawApple } from "./apple.js";

//variables
let lastRenderTime=0;
export let record = document.getElementById("last-score");
//my game-loop

function main(currentTime) {
    //request to render the next frame
    window.requestAnimationFrame(main);
    //how much time takes to a frame to be rendered (very little)
    const secondsSinceLastRender = (currentTime-lastRenderTime) / 1000
    //render a new frame, after this check
    if (secondsSinceLastRender < 1 / snakeSpeed) return
    // console.log("render");
    lastRenderTime = currentTime;
    //2 steps in game logic
    //1)update the structure and data
    update();
    //2)draw the render
    draw();
}

window.requestAnimationFrame(main);
window.onload = yourRecord();

function update() {
    updateSnake();
    updateApple();
    // checkFailure();
}

function draw() {
    //remove old position
    gameBoard.innerHTML = '';
    drawSnake(gameBoard);
    drawApple(gameBoard);
}

//update the user record
function yourRecord() {
    let lastRecord = JSON.parse(localStorage.getItem("YourRecords"));
    record.innerHTML = lastRecord[0];
}

