let clickCount = 0

function setStyles(){
    let element = document.getElementById("div1")
    element.style.display = "none"
}

function removeDiv2(){
    let element = document.getElementById("div2")
    element.remove()
}

function setClass(){
    let element = document.getElementById("div3")
    if (element.classList.contains("div")) {
        element.classList.replace("div", "hidden")
    }
    else {
        element.classList.replace("hidden", "div")
    }
}

function toggleBlocks() {
    const selector = document.getElementById("qselector").value;
    let elements;
    if (selector.trim() === "") {
        elements = document.querySelectorAll('.div');
    } else {
        elements = document.querySelectorAll(selector);
    }
    elements.forEach(function (el) {
        if (el.style.display === "none" || el.style.display === "") {
            el.style.display = "block";
        } else {
            el.style.display = "none";
        }
    });
}



function firstClickFunction() {
    alert("Hi")
}

function secondClickFunction() {
    document.getElementById("yellow-div").classList.add("hidden")
}

function buttonClickHandler() {
    if (clickCount == 0) {
        firstClickFunction()
        clickCount++
        return
    } 
    else if (clickCount == 1) {
        secondClickFunction()
        clickCount = 0
        return
    }
}

function OnHover(){
    document.getElementById("red-block").style.display = 'block'
}

function OnOut(){
    document.getElementById("red-block").style.display = 'none'
}

function Focused(){
    document.getElementById("green-block").style.display = 'block'
}

function Input(){
    document.getElementById("green-block").style.display = 'none'
}


function loadImages() {
    const allImageLinks = document.getElementById("imageLinks")
    const imageContainer = document.getElementById("imageContainer")
    
    imageContainer.innerHTML = ""

    const imageLinks = allImageLinks.value.trim().split('\n')
    imageLinks.forEach(link => {
        const image = new Image()
        image.src = link
        imageContainer.appendChild(image)
    })
}


document.addEventListener('DOMContentLoaded', function () {
    const usersinfo = document.getElementById('upper-right-block')
    let latitude = ''
    let longitude = ''

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, showError)
        } 
        else {
            alert("Geolocation is not supported by this browser.")
        }
    }

    function showPosition(position) {
        latitude = position.coords.latitude
        longitude = position.coords.longitude
    }

    function showError(){
        latitude = 'Unable to get Latitude'
        longitude = 'Unable to get Longitude'
    }

    getLocation()

    function updateCoordinates(event) {
        const x = event.clientX
        const y = event.clientY

        usersinfo.textContent = `x: ${x}px, y: ${y}px\n`
        usersinfo.insertAdjacentHTML('beforeend', `User language: ${navigator.language || navigator.userLanguage}\nLatitude: ${latitude}\nLongitude: ${longitude}`)
    }
  
    document.addEventListener('mousemove', updateCoordinates)
})

window.addEventListener('beforeunload', BeforUnload)

function BeforUnload(){
    localStorage.setItem("field1", document.getElementById("field1").innerHTML)

    setCookie('field2', document.getElementById('field2').innerHTML, 1)

    sessionStorage.setItem("field3", document.getElementById("field3").innerHTML)
}

function AfterUnload(){
    document.getElementById('field1').innerHTML = localStorage.getItem("field1") == 'undefined' ? "" : localStorage.getItem("field1")

    document.getElementById('field2').innerHTML = getCookie("field2") == 'undefined' | getCookie("field2") == null ? "" : getCookie('field2')

    document.getElementById('field3').innerHTML = sessionStorage.getItem("field3") == 'undefined' ? "" : sessionStorage.getItem("field3")
}

window.onload = AfterUnload

function setCookie(cname, cvalue, exdays) {
    const d = new Date()
    d.setTime(d.getTime() + (exdays*24*60*60*1000))
    let expires = "expires="+ d.toUTCString()
    document.cookie = cname + "=" + encodeURIComponent(cvalue) + ";" + expires + ";path=/"
}

function getCookie(cname) {
    let name = cname + "="
    let decodedCookie = decodeURIComponent(document.cookie)
    let ca = decodedCookie.split(';')
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i]
        while (c.charAt(0) == ' ') {
            c = c.substring(1)
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length)
        }
    }
    return null
}


const scrollTopArrow = document.getElementById("scroll-top")

window.addEventListener('scroll', function() {
    if (window.scrollY >= 1) {
        scrollTopArrow.style.display = "block";
    }
    else {
        scrollTopArrow.style.display = "none";
    }
})

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
}

const square = document.getElementById('square')

function showSquare() {
  square.style.display = 'block'
  disableScroll()
}

function hideSquare() {
  square.style.display = 'none'
  enableScroll()
}

function disableScroll() {
    document.body.style.overflow = 'hidden';
}
  
function enableScroll() {
    document.body.style.overflow = 'auto';
}

document.getElementById("myForm").addEventListener("submit", function(event) {
    event.preventDefault()
})


let fileInput = document.getElementById('fileInput')
let fileLabel = document.querySelector('.fileLabel')

fileInput.addEventListener('dragover', (element) => {
    element.preventDefault()
    fileLabel.classList.add('dragover')
})

fileInput.addEventListener('dragleave', () => {
    fileLabel.classList.remove('dragover')
})

fileInput.addEventListener('drop', () => {
    fileLabel.classList.remove('dragover')
})

fileInput.addEventListener('change', (e) => {
    fileLabel.classList.add('selected')
    fileLabel.innerHTML = `Selected file: ${e.target.files[0].name}`
})