const fontChoices = ["30px", "40px", "50px", "60px", "70px", "80px", "90px", "100px"];
const displayChoices = ["block", "inline", "none"];
const visibiltyChoices = ["visible", "hidden"];

function updateName() {
    let name = document.getElementById("in1").value;
    document.getElementById("name").innerHTML = name;
}

function toggleFontSize() {
    let name = document.getElementById("heading");
    let current = name.style.fontSize;
    let index = fontChoices.indexOf(current);
    if (index < fontChoices.length - 1) {
        index++;
    }
    else {
        index = 0;
    }
    name.style.fontSize = fontChoices[index];
}
function toggleDisplay() {
    let name = document.getElementById("heading");
    let current = name.style.display;
    let index = displayChoices.indexOf(current);
    if (index < displayChoices.length - 1) {
        index++;
    }
    else {
        index = 0;
    }
    name.style.display = displayChoices[index];
}
function toggleVisibility() {
    let name = document.getElementById("heading");
    let current = name.style.visibility;
    let index = visibiltyChoices.indexOf(current);
    if (index < visibiltyChoices.length - 1) {
        index++;
    }
    else {
        index = 0;
    }
    name.style.visibility = visibiltyChoices[index];
}