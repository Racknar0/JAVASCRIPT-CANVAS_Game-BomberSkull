//! Tamaño del canvas
let canvasSize;
let elementsSize;

const playerPosition = {
    x: undefined,
    y: undefined,
};

const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnDown = document.querySelector('#down');
const btnRight = document.querySelector('#right');


/** @type {HTMLCanvasElement} */

const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function setCanvasSize() {
    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.8;
    } else {
        canvasSize = window.innerHeight * 0.8;
    }

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    elementsSize = canvasSize / 10 - 1.5;

    startGame();
}

function startGame() {

    game.font = elementsSize + 'px Verdana';
    game.textAlign = 'end';

    const map = maps[0];
    const mapRows = map.trim().split('\n');
    const mapRowCols = mapRows.map((row) => row.trim().split(''));

    mapRowCols.forEach((row, rowI) => {
        row.forEach((col, colI) => {
            const emoji = emojis[col];
            const posX = elementsSize * (colI + 1) + 15;
            const posY = elementsSize * (rowI + 1);

            if (col === "O") {
                playerPosition.x = posX;
                playerPosition.y = posY;
            }

            game.fillText(emoji, posX, posY);
        });
    });

    game.fillText(emojis.PLAYER, playerPosition.x, playerPosition.y);
}

window.addEventListener('keydown', moveByKeys);

btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);



function moveByKeys(event) {
    switch (event.key) {
        case 'ArrowUp':
            moveUp();
            break;
        case 'ArrowLeft':
            moveLeft();
            break;
        case 'ArrowRight':
            moveRight();
            break;
        case 'ArrowDown':
            moveDown();
            break;
}
}

function moveUp() {
    console.log('up');
}

function moveLeft() {
    console.log('left');
}

function moveRight() {
    console.log('right');
}

function moveDown() {
    console.log('down');
}
