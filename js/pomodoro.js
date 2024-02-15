let crono1
let crono2
let cronoSarted = false
let crono2IsStarted = false
let cronoButton = document.createElement('button')
let crono1Text = document.getElementById('timerText')
let crono2Text = document.getElementById('contenido')
// let draggableContainer = document.getElementById('draggableContainer')
let draggableContainer = document.getElementsByClassName('draggableContainer')
let bgColorGreen = 'rgb(191, 223, 191)'
let bgColorWhite = '#ffffff'
let pauseMode = false
let breakMode = false
let minutes
let seconds
let minutesCrono2
let secondsCrono2
let crono1Seconds
let cronoSec2
let element = null
let workMakerDiv = document.getElementById('workMakerDiv')
let buttonCreateTasks = document.getElementById('buttonCreateTasks')
let createObjectDraggeableDiv = document.getElementById('createObjectDraggeableDiv')
let titleCreatedDiv = document.getElementById('title')
let descCreatedDiv = document.getElementById('desc')
let createdObjectTitle = document.getElementById('createdObjectTitle')
let createdObjectDesc = document.getElementById('createdObjectDesc')
let checkBox = document.getElementsByClassName('btn-check')
let draggableObjects = document.getElementsByClassName('draggObject')
let form = document.getElementById('form')
let body = document.querySelector('body')
createCronometreButton()
rotateCard()
document.onclick = function (event) {
    let target = event.target
    if (target.classList.contains('startCrono')) {
        if (!breakMode) {
            if (cronoButton.textContent === 'Pausar') {
                pauseMode = true
                clearInterval(crono1)
                console.log('estamos en pausa');
                cronoButton.textContent = 'Iniciar'
            } else {
                if (!cronoSarted) {
                    startCrono()
                } else resumeCrono()
                clearInterval(crono2)
                cronoButton.textContent = 'Pausar'
            }
        } else {
            if (cronoButton.textContent === 'Pausar') {
                pauseMode = true
                clearInterval(crono2)
                console.log('estamos en pausa');
                cronoButton.textContent = 'Iniciar'
            } else {
                if (!crono2IsStarted) {
                    startCronoPause()
                } else resumeCrono()
                clearInterval(crono1)
                cronoButton.textContent = 'Pausar'
            }
            // clearInterval(crono1)
            // // startCronoPause(5)
            // cronoButton.textContent = 'Pausar'
        }
     } else if (target.classList.contains('createWorks')) {
        createObjectDraggeableDiv.style.display = 'block'
     } 
};
document.onmouseover = function (event) {
    let target = event.target
    if (target.classList.contains('workMaker')) {
        buttonCreateTasks.style.animation = 'float 2s infinite'
    }
}
form.onsubmit = function (event) {
    event.preventDefault();
    createObjectDraggeableDiv.style.display = 'none'
    for (const cb of checkBox) {
        if (cb.checked) {
            draggableObjects.style.backgroundColor = cb.value
        }
        createdObjectTitle.textContent = titleCreatedDiv.value
        createdObjectDesc.textContent = descCreatedDiv.value
    }
}
workMakerDiv.onmouseleave = function () {
    buttonCreateTasks.style.animation = ''
}
/** Create Cronometre Button.*/
function createCronometreButton() {
    let divCronoButton = document.getElementById('divCrono')
    divCronoButton.appendChild(cronoButton)
    cronoButton.classList.add('startCrono')
    cronoButton.textContent = 'Iniciar'
}
/** Make rotate cards.*/
function rotateCard() {
    let tarjs = document.getElementsByClassName('tarjetas')
    let bgButton
    for (const tarj of tarjs) {
        tarj.addEventListener('click', function(){
            if (window.getComputedStyle(tarj).transform === 'none') {
                // PAUSE MODE
                tarj.style.transform = 'rotateY(180deg)'
                breakMode = true
                cronoButton.style.backgroundColor = '#7ACE8C'
                titleText.textContent = 'Modo Descanso'
                body.style.animation = 'changeBG 1s'
                clearInterval(crono1)
                cronoSarted = false
                // cronoSarted = true
                // crono2IsStarted = true
                cronoButton.textContent = 'Iniciar'
            } else {
                // CRONO MODE
                bgButton = window.getComputedStyle(tarj).backgroundColor;
                tarj.style.transform = 'none'
                breakMode = false
                cronoButton.style.backgroundColor = bgButton;
                titleText.textContent = 'Modo Cronometro'
                if (window.getComputedStyle(body).backgroundColor === bgColorGreen) body.style.animation = 'changeBGReverse 1s'
                cronoButton.textContent = 'Iniciar'
                clearInterval(crono2)
                // crono2IsStarted = true
                cronoSarted = true
            }
            console.log(breakMode);
        })
    }
}
body.addEventListener('animationend', function () {
    if (breakMode) {
        body.style.backgroundColor = bgColorGreen
    } else body.style.backgroundColor = bgColorWhite
})
/** Make the counters.*/
function startCrono() {
    // Converter the minutes in seconds.
    crono1Seconds = 25 * 60
    cronoSarted = true
    crono1 = setInterval(() => {
        if (crono1Seconds >= 0) {
            crono1Seconds--
            minutes = Math.floor(crono1Seconds / 60)
            seconds = crono1Seconds % 60
            crono1Text.textContent = minutes + ':' + seconds  
        }
    }, 1000);  
}
function startCronoPause() {
    cronoSec2 = 5 * 60
    crono2IsStarted = true
    crono2 = setInterval(() => {
        if (cronoSec2 >= 0) {
            cronoSec2--
            minutesCrono2 = Math.floor(cronoSec2 / 60)
            secondsCrono2 = cronoSec2 % 60
            crono2Text.textContent = minutesCrono2 + ':' + secondsCrono2 
        }
    }, 1000);
}
/** If the crono is the pause one, restarHim. */
function resumeCrono() {
    if (!cronoSarted) {
        crono2 = setInterval(() => {
            if (cronoSec2 >= 0) {
                cronoSec2--
                minutesCrono2 = Math.floor(cronoSec2 / 60)
                secondsCrono2 = cronoSec2 % 60
                crono2Text.textContent = minutesCrono2 + ":" + (secondsCrono2 < 10 ? "0" + secondsCrono2 : secondsCrono2)
            }
        }, 1000); // Reanudar el intervalo
    } else {
        crono1 = setInterval(() => {
            if (crono1Seconds >= 0) {
                crono1Seconds--
                minutes = Math.floor(crono1Seconds / 60)
                seconds = crono1Seconds % 60
                crono1Text.textContent = minutes + ":" + (seconds < 10 ? "0" + seconds : seconds)
            }
        }, 1000); // Reanudar el intervalo
    }
}
/** Make the draggable div objects */
function allowDrop(ev) {
   ev.target.classList.add('feedme')
    ev.preventDefault()
}
  
function removeDrop(ev) {
    ev.target.classList.remove('feedme');
    ev.preventDefault();
}
  
function drag(ev) {
    element = ev.target
    element.parentNode.classList.add('feedme')
    element.classList.add('dragging')
}
  
function drop(ev) {
    ev.preventDefault()
    ev.target.classList.remove('feedme')
    element.classList.remove('dragging')
    if (ev.target.classList.contains('droppable')) {
        ev.target.appendChild(element)
    }
    element = null
}

for (const dc of draggableContainer) {
    dc.ondrop = function (event){
        drop(event)
    }
    dc.ondragover = function (event) {
        allowDrop(event)
    }
    dc.ondragleave = function (event) {
        removeDrop(event)
    }
}
for (const dg of draggableObjects) {
    dg.ondragstart = function (event) {
        drag(event)
    }
}

