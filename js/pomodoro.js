let divTimer = document.getElementById('divTimer')
let faceCard = document.getElementById('cara')
let textTimer = document.createElement('p')
faceCard.appendChild(textTimer)
textTimer.classList.add('timerText')
textTimer.textContent = '25:00'



/** Create Cronometre Button. */
let divCronoButton = document.getElementById('divCrono')
let cronoButton = document.createElement('button')
divCronoButton.appendChild(cronoButton)
cronoButton.classList.add('startCrono')

cronoButton.textContent = 'Iniciar'

/** Hacer tarjetas giratorias */
let tarjs = document.getElementsByClassName('tarjetas')
let content = document.getElementById('contenido')
let rotated = false
for (const tarj of tarjs) {
    tarj.addEventListener('click', function(){
        if (window.getComputedStyle(tarj).transform === 'none') {
            tarj.style.transform = 'rotateY(180deg)'
            content.textContent = '05:00'
            cronoButton.style.backgroundColor = '#7ACE8C'
        } else tarj.style.transform = 'none'
    })
}




