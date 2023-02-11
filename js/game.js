//! Tamaño del canvas
let canvasSize;
let elementsSize;
let level = 0;
let lives = 3;

let timeStart;
let timePlayer;
let timeInterval;

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

const spanLives = document.querySelector('#lives');
const spanTime = document.querySelector('#time');
const spanRecord = document.querySelector('#record');
const spanResult = document.querySelector('#result');

const reset_button = document.querySelector('#reset_button');
reset_button.addEventListener('click', resetGame);
function resetGame() {
    location.reload();
}

/** @type {HTMLCanvasElement} */

const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

//! Eventos de carga y redimensionamiento
window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

//! Eventos de movimiento
window.addEventListener('keydown', moveByKeys);
btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);

//! Setear el tamaño del canvas
function setCanvasSize() {
    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.6;
    } else {
        canvasSize = window.innerHeight * 0.6;
    }

    /* canvasSize = canvasSize.toFixed(2); */

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    

    //! tamaño de los elementos
    elementsSize = canvasSize / 10 - 1.5;

    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame();
}

//! Funcion para iniciar el juego
function startGame() {

    console.log({canvasSize, elementsSize});
    console.log({level, lives});
    showLives();

    game.font = elementsSize + 'px Verdana';
    game.textAlign = 'end';

    //! mapa
    const map = maps[level];
    if (!map) {
        gameWin();
        return;
    }

    //! Iniciar el tiempo
    if (!timeStart) {
        timeStart = Date.now();
        timeInterval = setInterval(showTime, 100);
        showRecord();
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

            //! dibujar el mapa
            game.fillText(emoji, posX, posY);
        });

        
    });

    console.log({playerPosition, goalPosition });
    movePlayer(playerPosition);

}

//! Funcion para mover al jugador
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
        timeStart = undefined;
    }

    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame();

}

//! si se gana el juego
function gameWin() {
    console.log('Ganaste el juego');
    clearInterval(timeInterval);
    setRecord();
}

//! Funcion para guardar el record
function setRecord() {
    const recordTime = localStorage.getItem('recordTime');
    if (recordTime) {
       const playerTime = Date.now() - timeStart;
         if (recordTime > playerTime) {
            localStorage.setItem('recordTime', playerTime);
            spanResult.innerHTML = 'Superaste el record';
        } else {
            spanResult.innerHTML = 'No superaste el record';
        }
    } else {
        localStorage.setItem('recordTime', Date.now() - timeStart);
        spanResult.innerHTML = 'Primera vez? trata de mejorar el record';
    }
}


function showLives() {
    const heartsArray = Array(lives).fill(emojis['HEART']);
    console.log(heartsArray);
    spanLives.innerHTML = heartsArray.join('');
}

function showTime() {
    const time = Date.now() - timeStart;
    spanTime.innerHTML = formatTime(time)
}

function showRecord() {
    const recordTime = localStorage.getItem('recordTime');
    if (recordTime) {
        spanRecord.innerHTML = formatTime(recordTime);
        return;
    }
    spanRecord.innerHTML = 'No hay record';
}

function formatTime(time_ms) {
    let minutes = Math.floor(time_ms / 1000 / 60);
    let seconds = Math.floor(time_ms / 1000 % 60);
    let milliseconds = time_ms % 1000;
  
    return minutes + "Min ** " + seconds + " Sec ** " + milliseconds + " Ms";
}



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
