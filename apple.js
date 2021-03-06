import { gameBoard , onSnake, expandSnake} from "./snake.js";

let apple = getRandomApplePos()
//how much the snake grows
const EXPANSION_RATE = 1;
let currentPoints = document.getElementById("current-points");
let points = 0;
let lastRecord = 0;

export function update() {
    //if the snake and the apple position match
    if (onSnake(apple)) {
        //the snake expands
        expandSnake(EXPANSION_RATE)
        //the apple go somewhere else randomly
        apple = getRandomApplePos()
        //update the current points and record
        points+=1;
        currentPoints.innerHTML = points;
        localStorage.setItem("YourPoints", JSON.stringify(points))
        if (points > JSON.parse(localStorage.getItem("LastRecord"))) {
            lastRecord = points;
            localStorage.setItem("LastRecord", JSON.stringify(lastRecord))
        }
    }
}

export function draw() {
    const appleElement = document.createElement('div');
    appleElement.style.gridRowStart = apple.y;
    appleElement.style.gridColumn = apple.x;
    appleElement.classList.add('apple');
    gameBoard.appendChild(appleElement);
}

//move the apple randomly on the grid

function getRandomApplePos() {
    let newPos;
    //loop to find a value matching my condition for the random apple pos
    while ( newPos == null || onSnake(newPos)) {
        newPos = randomGridPosition();
    }
    return newPos
}

// i create a random number included in the interval of the size of my grid 1<21

function randomGridPosition() {
    return {
        x: Math.floor(Math.random() * 21) + 1,
        y: Math.floor(Math.random() * 21) + 1
    }
}