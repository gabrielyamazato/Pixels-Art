const btRandom = document.getElementById('button-random-color');
const divColors = document.getElementsByClassName('color');
const board = document.getElementById('pixel-board');
const colorPalete = document.getElementById('color-palette');
const firstClr = document.getElementById('firstColor');
const secondClr = document.getElementById('secondColor');
const thirdClr = document.getElementById('thirdColor');
const fourthClr = document.getElementById('fourthColor');

// FUNÇÃO PARA PEGAR UMA COR ALEATORIA
function getRandomColor() {
    let letters = '0123456789ABCDEF'.split('');
    let color = '#';
    for (let i = 0; i < 6; i += 1) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
}
// FUNÇÃO getRandomColor RETIRADA DA INTERNET: https://css-tricks.com/snippets/javascript/random-hex-color/

// FUNÇÃO PARA ALTERAR A COR DAS PALETAS RANDOMICAMENTE
btRandom.addEventListener('click', () => {
    for (i = 1; i < divColors.length; i += 1) {
        const storage = getRandomColor();
        divColors[i].style.backgroundColor = `${storage}`;
    }
}
)

// FUNÇÃO PARA GERAR O BOARD
function generateBoard() {
    for (let i = 0; i < 25; i += 1) {
        const pixel = document.createElement('span');
        pixel.classList.add('pixel');
        board.appendChild(pixel);
        pixel.style.backgroundColor = 'rgb(255, 255, 255)'
    }
}
generateBoard();

// FUNÇÃO PARA LIMPAR O BOARD
function clearBoard() {
    const board = document.querySelectorAll('.pixel');
    for (i = 0; i < board.length; i += 1) {
        board[i].style.backgroundColor = 'rgb(255, 255, 255)';
    }
}

const btClear = document.getElementById('clear-board');
btClear.addEventListener('click', clearBoard)

// EVENTOS PARA TROCAR A COR PARA A PALETA CLICADA

const paletteElement = document.querySelectorAll('.color')

function removeClass() {
    for (let i = 0; i < paletteElement.length; i += 1) {
        paletteElement[i].classList.remove('selected')
    }
}

function addClass(event) {
    removeClass();
    event.target.classList.add('selected');
}

function toggleClass() {
    const paletteElement = document.querySelectorAll('.color')
    console.log('teste', paletteElement)
    for (let i = 0; i < paletteElement.length; i += 1) {
        paletteElement[i].addEventListener('click', addClass)
    }
}
toggleClass();

// FUNÇÃO PARA PINTAR OS PIXELS
const pixel = document.querySelectorAll('.pixel');

function changeColor(event) {
    let holdColor = document.getElementsByClassName('selected')[0];
    let x = window.getComputedStyle(holdColor).getPropertyValue('background-color');
    event.target.style.backgroundColor = x;
}

for (let i = 0; i < pixel.length; i += 1) {
    pixel[i].addEventListener('click', changeColor)
}

// FUNÇÃO PARA RECUPERAR A PALETA SALVA
function restore() {
    colorPalete.innerHTML = localStorage.getItem('colorPalette');
    for (let i = 0; i < pixel.length; i += 1) {
        pixel[i].addEventListener('click', changeColor)
    }
    toggleClass();
}

function gettItem() {
    if (localStorage.colorPalette) {
        // restore();
        toggleClass();
    }
}

window.onload = () => {
    gettItem();
}