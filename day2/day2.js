function modifyInnerHTML(id, value) {
    console.log(document.getElementById(id).innerHTML);
    document.getElementById(id).innerHTML = value;
}

function toggleVis(id) {
    document.getElementById(id).style.visibility = 'hidden';
}

function modifyFontSize(id) {
    document.getElementById(id).style.fontSize = '25px';
}

function modifyDisplay(id) {
    document.getElementById(id).style.display = 'none';
}

function changeValue(id, val) {
    document.getElementById(id).value = val;
}

function toggleColor(id) {
    const x = document.getElementById(id).style.color;
    if (!x || x === 'black') document.getElementById(id).style.color = 'red';
    else if (x === 'red') document.getElementById(id).style.color = 'green';
    else if (x === 'green') document.getElementById(id).style.color = 'black';
}

const dbl = (item, index, arr) => {
    arr[index] += item;
};
let arr = [1, 5, 2, 8, 92, 29];
arr.forEach(dbl);
console.log(arr);
console.log(arr.splice(1, 3));
console.log(arr.reduce((prev, curr) => curr - prev));
