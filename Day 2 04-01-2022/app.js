const text1 = document.querySelector('#text1');
const btn1 = document.querySelector("#btn1");
const text2 = document.querySelector('#text2');
const btn2 = document.querySelector("#btn2");
const text3 = document.querySelector('#text3');
const btn3 = document.querySelector("#btn3");
const text4 = document.querySelector('#text4');
const btn4 = document.querySelector("#btn4");

btn1.addEventListener('click', function changeInnerHTML() {
    text1.innerHTML = "<h2> InnerHTML Changed </h2>";
})

btn2.addEventListener('click', function changeFontSize() {
    text2.style.fontSize = "30px";
})

btn3.addEventListener('click', function changeDisplay() {
    text3.style.display = "none";
})

btn4.addEventListener('click', function changeVisibility() {
    text4.style.visibility = "hidden";
})