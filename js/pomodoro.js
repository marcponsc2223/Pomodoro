/** Variables. */
let crono1
let crono2
let cronoLarge
let cronoSarted = false
let crono2IsStarted = false
let cronoLargeSarted = false
let cronoLargeSartedIsFinished = true
let cronoLargeActive = false
let cronoButton = document.createElement('button')
let cronoLargeButton = document.getElementById('cronoLargeButton')
let crono1Text = document.getElementById('timerText')
let crono2Text = document.getElementById('contenido')
let largeBreakTimeText = document.getElementById('largeBreakTimeText')
let draggableContainer = document.getElementsByClassName('draggableContainer')
let draggableObjects
let deleteTaskButtons
let bgColorGreen = 'rgb(191, 223, 191)'
let bgColorWhite = '#ffffff'
let pauseMode = false
let breakMode = false
let minutes
let seconds
let minutesCrono2
let secondsCrono2
let minutesLargeCrono
let secondsLargeCrono2
let crono1Seconds
let cronoSec2 = 5
let cronoSec3 = 25
let element = null
let workMakerDiv = document.getElementById('workMakerDiv')
let buttonCreateTasks = document.getElementById('buttonCreateTasks')
let createObjectDraggeableDiv = document.getElementById('createObjectDraggeableDiv')
let titleCreatedDiv = document.getElementById('title')
let descCreatedDiv = document.getElementById('desc')
let obj
let deletedTaskEvent
let run = 0
let animaitonRotatedEnded = true
let checkBox = document.getElementsByClassName('btn-check')
let body = document.querySelector('body')
createCronometreButton()
let tarjs = document.getElementsByClassName('tarjetas')
if (animaitonRotatedEnded) {
    rotateCard()
}

/** Click Listener. */
document.onclick = function (event) {
    let target = event.target
    if (target.classList.contains('startCrono') && cronoLargeSartedIsFinished) {
        if (!breakMode) {
            if (cronoButton.textContent === 'Pausar') {
                pauseMode = true
                clearInterval(crono1)
                console.log('estamos en pausa');
                cronoButton.textContent = 'Iniciar'
            } else {
                if (!cronoSarted || crono1Seconds <= 1) {
                    startCrono()
                } else resumeCrono()
                clearInterval(crono2)
                clearInterval(cronoLarge)
                titleText.textContent = 'Modo Cronometro'
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
                clearInterval(cronoLarge)
                cronoButton.textContent = 'Pausar'
            }
        }
     } else if (target.classList.contains('startCronoLargeBreak') && cronoLargeActive) {
        if (cronoLargeButton.textContent === 'Pausar') {
            pauseMode = true
            clearInterval(cronoLarge)
            console.log('estamos en pausa');
            cronoLargeButton.textContent = 'Iniciar'
        } else {
            if (!cronoLargeSarted || cronoSec3 <= 1) {
                startLargeCrono()
            } else resumeCrono()
            clearInterval(crono1)
            clearInterval(crono2)
            titleText.textContent = 'Modo Descanso Largo'
            cronoLargeButton.textContent = 'Pausar'
        }
     } else if (target.classList.contains('createWorks')) {
            createObjectDraggeableDiv.style.display = 'block'
     } else if (target.classList.contains('deleteButton')) {
            sureMessage(event)
            deletedTaskEvent = target.parentNode
     } else if (target.classList.contains('deleteTask')) {
            target.parentNode.style.display = 'none'
            deletedTaskEvent.remove()
     } else if (target.classList.contains('exitIcon')) {
            hideSureMessage(target)
     } else if (target.classList.contains('settingsImg')) {
            showConfigs()
     }
     
     
};
/** Hover listener. */
document.onmouseover = function (event) {
    let target = event.target
    if (target.classList.contains('workMaker')) {
        buttonCreateTasks.style.animation = 'float 2s infinite'
    }
}
/** Before the form is submided. */
let createdWell = document.getElementById('createdWell')
document.onsubmit = function (event) {
    event.preventDefault();
    let target = event.target
    if (target.parentNode.classList.contains('createObjectDraggeableDiv')) {
        createObjectDraggeableDiv.style.display = 'none'
        let draggableContainerPendents = document.getElementById('draggableContainerPendents')
        obj = document.createElement('div')
        let objTitle = document.createElement('h1')
        let objDesc = document.createElement('p')
        let deleteButton = document.createElement('div')
        let dateText = document.createElement('p')
        let hourText = document.createElement('p')
        let dateCreated = new Date()
        deleteButton.classList.add('deleteButton')
        draggableContainerPendents.appendChild(obj)
        obj.appendChild(objTitle)
        obj.appendChild(objDesc)
        obj.appendChild(deleteButton)
        obj.appendChild(dateText)
        obj.appendChild(hourText)
        dateText.textContent = dateCreated.getDate() + '/' + dateCreated.getMonth() + '/' + dateCreated.getFullYear()
        hourText.textContent = dateCreated.getHours() + ':' + dateCreated.getMinutes()
        obj.classList.add('draggObject')
        obj.draggable = true
        for (const cb of checkBox) {
            if (cb.checked) {
                obj.style.backgroundColor = cb.value
            }
            objTitle.textContent = titleCreatedDiv.value
            objDesc.textContent = descCreatedDiv.value
        }
        draggableObjects = document.getElementsByClassName('draggObject')
        deleteTaskButtons = document.getElementsByClassName('deleteButton')
        dragDiv() 
    } else {
        showCreateWell()
        
        cronoSec2 = firstBreak.value
        cronoSec2.textContent = cronoSec2 + ':00'
        // cronoSec2 = cronoSec2 * 60

        cronoSec3 = secondBreak.value
        largeBreakTimeText.textContent = cronoSec3 + ':00'
        // cronoSec2 = cronoSec2 * 60
    }
    
}
/** Hover out listener. */
workMakerDiv.onmouseleave = function () {
    buttonCreateTasks.style.animation = ''
}
/** Animation end Listener. */
document.addEventListener('animationend', function (event) {
    let target = event.target
    if (target.classList.contains('tarjetas')) {
        for (const tarj of tarjs) {
            tarj.style.border = '0'  
            tarj.style.animation = ''
            animaitonRotatedEnded = true
        }
    } else {
        if (breakMode) {
            body.style.backgroundColor = bgColorGreen
        } else body.style.backgroundColor = bgColorWhite
        body.style.animation = ''
    }
})
/** Create Cronometre Button.*/
function createCronometreButton() {
    let divCronoButton = document.getElementById('divCrono')
    divCronoButton.appendChild(cronoButton)
    cronoButton.classList.add('startCrono')
    cronoButton.textContent = 'Iniciar'
}
/** Make rotate cards.*/
function rotateCard() {
    for (const tarj of tarjs) {
        tarj.addEventListener('click', function(){
            if (animaitonRotatedEnded) {
                const tarjTransform = window.getComputedStyle(tarj).transform;
                
                if (tarjTransform === 'none' && run >= 1) {
                    // PAUSE MODE
                    tarj.style.transform = 'rotateY(180deg)';
                    breakMode = true;
                    cronoButton.style.backgroundColor = '#7ACE8C';
                    titleText.textContent = 'Modo Descanso';
                    body.style.animation = 'changeBG 1s';
                    clearInterval(crono1);
                    cronoSarted = false;
                    cronoButton.textContent = 'Iniciar';
                } else if (tarjTransform === 'none') {
                    // Display error message
                    animaitonRotatedEnded = false;
                    tarj.style.animation = 'rotatedFailed 0.4s';
                    tarj.style.border = '2px solid red';
                    titleText.textContent = 'Primero tienes que completar el primer pomodoro.';
                } else {
                    // CRONO MODE
                    const bgButton = window.getComputedStyle(tarj).backgroundColor;
                    tarj.style.transform = 'none';
                    breakMode = false;
                    cronoButton.style.backgroundColor = bgButton;
                    titleText.textContent = 'Modo Cronometro';
                    if (window.getComputedStyle(body).backgroundColor === bgColorGreen) {
                        body.style.animation = 'changeBGReverse 1s';
                    }
                    cronoButton.textContent = 'Iniciar';
                    clearInterval(crono2);
                    cronoSarted = true;
                }
                console.log(breakMode);
            }
            
        })
    }
}
/** Make the counters.*/
function startCrono() {
    // Converter the minutes in seconds.
    crono1Seconds = 1 * 1
    cronoSarted = true
    crono1 = setInterval(() => {
        if (crono1Seconds >= 0) {
            crono1Seconds--
            minutes = Math.floor(crono1Seconds / 60)
            seconds = crono1Seconds % 60
            crono1Text.textContent = minutes + ':' + seconds  
        } else {
            run++
            pomodoroCompletedMessage(run, true)
        }
    }, 1000);  
}
function startCronoPause() {
    // cronoSec2 = 5 * 60
    crono2IsStarted = true
    crono2 = setInterval(() => {
        if (cronoSec2 >= 0) {
            cronoSec2--
            minutesCrono2 = Math.floor(cronoSec2 / 60)
            secondsCrono2 = cronoSec2 % 60
            crono2Text.textContent = minutesCrono2 + ':' + secondsCrono2 
        } else {
            pomodoroCompletedMessage(run, false)
        }
    }, 1000);
}
function startLargeCrono() {
    cronoSec3 = cronoSec3 * 60
    cronoLargeSarted = true
    cronoLargeSartedIsFinished = false
    cronoLarge = setInterval(() => {
        if (cronoSec3 >= 0) {
            cronoSec3--
            minutesLargeCrono = Math.floor(cronoSec3 / 60)
            secondsLargeCrono2 = cronoSec3 % 60
            largeBreakTimeText.textContent = minutesLargeCrono + ':' + secondsLargeCrono2 
            console.log(cronoLargeSartedIsFinished);
        }  else {
            cronoSec3 = 25
            cronoLargeActive = false
            run = 0
            cronoLargeSartedIsFinished = true
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
    } else if (cronoLargeActive) {
        cronoLarge = setInterval(() => {
            if (cronoSec3 >= 0) {
                cronoSec3--
                minutesLargeCrono = Math.floor(cronoSec3 / 60)
                secondsLargeCrono2 = cronoSec3 % 60
                largeBreakTimeText.textContent = minutesLargeCrono + ":" + (secondsLargeCrono2 < 10 ? "0" + secondsLargeCrono2 : secondsLargeCrono2)
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
/** Make the draggable div objects. */
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
/** Drag and drop Function. */
for (const dc of draggableContainer) {
    dc.ondrop = function (event){
        drop(event)
        completedTaskComprovation()
    }
    dc.ondragover = function (event) {
        allowDrop(event)
       
    }
    dc.ondragleave = function (event) {
        removeDrop(event)
        
    }
}
function dragDiv() {
    for (const dg of draggableObjects) {
        dg.ondragstart = function (event) {
            drag(event)
        }
    } 
}
/** Comprove if the task is completed or not. */
function completedTaskComprovation() {
    for (const draggO of draggableObjects) {
        if (draggO.parentNode.classList.contains('completedTasks')) {
            draggO.draggable = false
            draggO.classList.add('taskIsCompleted')
        }  
    }
}
/** Show and hide sureMessage */
let divSure = document.getElementById('sureMessageID')
let divConfigMessage = document.getElementById('configWindow')
let firstBreak = document.getElementById('short_break')
let secondBreak = document.getElementById('large_break')
function sureMessage() {
    divSure.style.display = 'block'
} 
function hideSureMessage(target) {
    if (target.parentNode.classList.contains('window')) {
        divSure.style.display = 'none'
    } else {
        divConfigMessage.style.display = 'none'
    }
}
function showConfigs() {
    divConfigMessage.style.display = 'grid'
    firstBreak.value = cronoSec2
    secondBreak.value = cronoSec3
}
function showCreateWell() {
    createdWell.style.display = 'block'
    setTimeout(() => {
        createdWell.style.display = 'none'
    }, 3000);
}
/** Show the pomodoro completed messages. */
let pomodoroCompletMessage = document.getElementById('pomodoroCompletedMessage')
let divMessage = document.getElementById('divMessage')
function pomodoroCompletedMessage(run, pomodoroMode) {
    divMessage.style.display = 'block'
    let pomodoroName
    if (pomodoroMode) pomodoroName = 'Pomodoro'
    else pomodoroName = 'Break Mode'
    switch (run) {
        case 1:
            alarm.play()
            pomodoroCompletMessage.textContent = 'Enorabuena, primer ' + pomodoroName + ' completado.'
            break;
        case 2:
            alarm.play()
            pomodoroCompletMessage.textContent = 'Enorabuena, segundo ' + pomodoroName + ' completado.'
            break;
        case 3:
            alarm.play()
            pomodoroCompletMessage.textContent = 'Enorabuena, tercer ' + pomodoroName + ' completado.'
            break;
        case 4:
            alarm.play()
            pomodoroCompletMessage.textContent = 'Enorabuena, cuarto ' + pomodoroName + ' completado, tienes acceso al modo pausa largo.'
            cronoLargeActive = true
        break;
    }
    setTimeout(() => {
        divMessage.style.display = 'none'
    }, 4000);
    clearInterval(crono1)
    cronoButton.textContent = 'Iniciar'

}