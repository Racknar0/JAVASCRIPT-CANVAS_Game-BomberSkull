
//! Tamaño del canvas
let canvasSize;
let elementSize;

/** @type {HTMLCanvasElement} */
const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function setCanvasSize() {
    /* realizar un cuadrado */
    window.innerHeight > window.innerWidth ? canvasSize = window.innerWidth * 0.8 : canvasSize = window.innerHeight * 0.8;
    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    //! Tamaño de cada elemento
    elementSize = (canvasSize / 10) - 1
    console.log({canvasSize, elementSize});
    startGame();
}


function startGame (){
    game.font = `${elementSize}px Arial`;  
    game.textAlign = 'start';  
    
    for (let i = 0; i < 10; i++) {
        game.fillText(emojis['X'],elementSize * i, elementSize);
    }
}

