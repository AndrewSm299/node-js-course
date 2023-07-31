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
    let elements = document.getElementById("qselector").value.length == 0 || document.getElementById("qselector").value.length == null || document.getElementById("qselector").value.length == "" ? document.querySelectorAll('.div') : document.querySelectorAll(document.getElementById("qselector").value)
    elements.forEach(function (el) {
        if (el.style.display === "none") {
            el.style.display = "block"
        } else {
            el.style.display = "none"
        }
    });
}


function firstClickFunction() {
    alert("Привет")
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

const inputField = document.getElementById("inputField")
const greenBlock = document.getElementById("green-block")

function onFocusAndInput() {
    greenBlock.style.display = inputField === document.activeElement ? "block" : "none";
}

inputField.addEventListener("input", onFocusAndInput);
inputField.addEventListener("focus", onFocusAndInput);
inputField.addEventListener("blur", onFocusAndInput);
