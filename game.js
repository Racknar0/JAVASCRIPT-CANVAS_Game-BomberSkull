//! Tamaño del canvas
let canvasSize;
let elementsSize;
let level = 0;
let lives = 3;

const playerPosition = {
    x: undefined,
    y: undefined,
};

const goalPosition = {
    x: undefined,
    y: undefined,
};

let enemyPositions = [];

const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnDown = document.querySelector('#down');
const btnRight = document.querySelector('#right');


/** @type {HTMLCanvasElement} */

const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

//! Setear el tamaño del canvas
function setCanvasSize() {
    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.8;
    } else {
        canvasSize = window.innerHeight * 0.8;
    }

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    //! tamaño de los elementos
    elementsSize = canvasSize / 10 - 1.5;

    startGame();
}

function startGame() {

    console.log({level, lives});

    game.font = elementsSize + 'px Verdana';
    game.textAlign = 'end';

    //! mapa
    const map = maps[level];
    if (!map) {
        gameWin();
        return;
    }

    const mapRows = map.trim().split('\n');
    const mapRowCols = mapRows.map((row) => row.trim().split(''));

    //! limpiar el canvas
    game.clearRect(0, 0, canvasSize, canvasSize);
    //! limpiar las posiciones
    enemyPositions = [];

    mapRowCols.forEach((row, rowI) => {
        row.forEach((col, colI) => {
            const emoji = emojis[col];
            const posX = elementsSize * (colI + 1) + 15;
            const posY = elementsSize * (rowI + 1);

            //! posicion del jugador
            if (col === "O") {
                if (!playerPosition.x && !playerPosition.y) {
                    playerPosition.x = posX;
                    playerPosition.y = posY;
                    
                }
            } else if (col === "I") {
                goalPosition.x = posX;
                goalPosition.y = posY;
            } else if (col === "X") {
                enemyPositions.push({x: posX, y: posY});
            }

            game.fillText(emoji, posX, posY);
        });

        
    });

    console.log({playerPosition, goalPosition });
    movePlayer(playerPosition);

}

function movePlayer(playerPosition) {

    //! colision con el objetivo
    const huboColisionX = playerPosition.x.toFixed(2) === goalPosition.x.toFixed(2);
    const huboColisionY = playerPosition.y.toFixed(2) === goalPosition.y.toFixed(2);
    const huboColision = huboColisionX && huboColisionY;

    if (huboColision) {
        levelWin();
    }

    //! colision con enemigos
    const enmemyCollision = enemyPositions.find((enemy) => {
        const huboColisionX = playerPosition.x.toFixed(2) === enemy.x.toFixed(2);
        const huboColisionY = playerPosition.y.toFixed(2) === enemy.y.toFixed(2);
        return huboColisionX && huboColisionY;
    });

    //! si hay colision con enemigo
    if (enmemyCollision) {
        levelLose();
    }

    game.fillText(emojis.PLAYER, playerPosition.x, playerPosition.y);
}

//! si se supera el nivel
function levelWin() {
    console.log('Subiste de nivel');
    level++;
    startGame();
}

//! si se pierde el nivel
function levelLose() {
    console.log('Chocaste con un enemigo');
    console.log('Perdiste una vida', lives);
    lives--;

    if (lives <= 0) {
        level = 0;
        console.log('Perdiste el juego');
        lives = 3;
    }

    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame();

}

//! si se gana el juego
function gameWin() {
    console.log('Ganaste el juego');
}




window.addEventListener('keydown', moveByKeys);

btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);


//! mover el jugador con las flechas
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
    if ((playerPosition.y - elementsSize) < elementsSize) {
        return;
    }
    playerPosition.y -= elementsSize
    startGame();
}

function moveLeft() {
    if ((playerPosition.x - elementsSize) < elementsSize) {
        return;
    }
    playerPosition.x -= elementsSize
    startGame();
}

function moveRight() {
    if ((playerPosition.x + elementsSize) > canvasSize) {
        return;
    }
    playerPosition.x += elementsSize
    startGame();
}

function moveDown() {
    if ((playerPosition.y + elementsSize) > canvasSize ) {
        return;
    }
    playerPosition.y += elementsSize
    startGame();
}
