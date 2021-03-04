import {getInputDirection} from "./input.js";

//moves of the snake per second
export const snakeSpeed = 6;
export const gameBoard = document.getElementById("game-board");
//initialize my snake body in the gride board
const snakeBody = [{x:11,y:11}];
//to add new segments to the snake body
let newSegments = 0;

export function update() {
    //add segments 
    addSegments();
    const inputDirection = getInputDirection();
    //move the previous snake element to the position of the next
    for (let i = snakeBody.length - 2; i >= 0; i--) {
        //the second last element is duplicated in a new reference object with the next index pos
        snakeBody[i+1] = {...snakeBody[i]}
    }

    //movement 
    snakeBody[0].x += inputDirection.x;
    snakeBody[0].y += inputDirection.y;
}

export function draw() {
    snakeBody.forEach(element => {
        const snakePixel = document.createElement('div');
        snakePixel.style.gridRowStart = element.y;
        snakePixel.style.gridColumn = element.x;
        snakePixel.classList.add('snake');
        gameBoard.appendChild(snakePixel);
    });
}

//the snake expands of the given amount
export function expandSnake(amount) {
    newSegments += amount
}

//i check the position of the apple and the segments of snake body
export function onSnake(position) {
    return snakeBody.some(segments => {
        return equalPos(segments, position)
    })
}

function equalPos(pos1, pos2) {
    return (pos1.x === pos2.x && pos1.y === pos2.y) 
}

function addSegments() {
    for (let i = 0; i < newSegments; i++) {
        //duplicating the last snake segment
        snakeBody.push({...snakeBody[snakeBody.lenght-1]});
    }
    //clear the segments
    newSegments=0
}

