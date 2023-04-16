'use strict'

const EASY = 16
const MEDIUM = 25
const HARD = 36
var gLastCorrNum = 0
var gCurrDifficulty = EASY
var gTimeInterval

function onInitGame() {
    renderBoard(EASY)
}


// hide the victory status options
function hideVictoryStatus() {
    var hideVictoryStatus = document.querySelector('.win-status')
    hideVictoryStatus.classList.add('hidden')
}


// defining a victory status
function victory() {
        const winAudio = new Audio('audio/win.mp3')
        winAudio.play()
        winAudio.volume = 0.05
        var showVictoryStatus = document.querySelector('.win-status')
        showVictoryStatus.classList.remove('hidden')
        gLastCorrNum = 0
}


// start the timer
function startTimer() {
    var startTime = Date.now()
    gTimeInterval = setInterval(setTimer, 1, startTime)
}


// defining cell clicks - adding a css defined class to each cell
function onCellClick(elCell) {
    var currCell = +elCell.innerHTML
    if (currCell === 1) startTimer()
    if (currCell === gLastCorrNum + 1) {
        elCell.classList.add("clickedNum")
        gLastCorrNum++
        const correctAudio = new Audio('audio/correct.mp3')
        correctAudio.play()
        correctAudio.volume = 0.05
        if(gLastCorrNum === gCurrDifficulty) {
            victory()
        }
    } else {
        const loseAudio = new Audio('audio/negative.mp3')
        loseAudio.play()
        loseAudio.volume= 0.05
    }
}


// renders your board with a given size(16 is deafult, called in HTML) - gLastCorrNum - set to 0 everytime rendered (bug fix)
// sqrt - makes a 4x4/5x5/6x6 board size accordingly
// victory status hidden every render
function renderBoard(size) {
    clearInterval(gTimeInterval)
    gLastCorrNum = 0
    gCurrDifficulty = size
    var currBoard = generateBoard(size)
    var elBoard = document.querySelector('.board')
    var rowLength = Math.sqrt(size)
    var colLength = Math.sqrt(size)
    var tableHTML = ''
    for (var i = 0; i < rowLength; i++) {
        tableHTML += `<tr>`
        for (var j = 0; j < colLength; j++) {
            tableHTML += `<td onclick="onCellClick(this)">${currBoard.pop()}</td>`
        }
        tableHTML += `</tr>`
    }
    elBoard.innerHTML = tableHTML
    hideVictoryStatus()
}


// generate a board with a given size, return a shuffled array - util
function generateBoard(size) {
    var boardValues = []
    for (var i = 1; i <= size; i++) {
        boardValues.push(i)
    }
    return arrShuffle(boardValues)
}


// shuffle a given array - boardValues is used in generateBoard() - util
function arrShuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr
}


// set a timer - util
function setTimer(startTime) {
    var elapsedTime = Date.now() - startTime
    var elTimer = document.querySelector('.timer')
    elTimer.innerText = (elapsedTime / 1000).toFixed(3)
}