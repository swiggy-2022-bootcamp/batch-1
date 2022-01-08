
function processInput(data) {

    document.getElementById("displaySpan").innerHTML = data;
    return false;
}

function changeFontSize() {

    let fSize = prompt("Please enter font size");

    if (!isNaN(fSize) && fSize > 0) {
        document.getElementById("displaySpan").style.fontSize = fSize;
    } else {
        alert('Invalid Font Size Entered !!!');
    }
}

function changeDisplay(data) {

    var selection = data.options[data.selectedIndex].text;
    document.getElementById("displaySpan").style.display = selection;
}

function changeVisibility(data) {

    var selection = data.options[data.selectedIndex].text;
    document.getElementById("displaySpan").style.visibility = selection;
}

function practiceMethods() {

    // some array operations

    let arr = [{ id: 1, quantity: 10 }, { id: 2, quantity: 6 }, { id: 3, quantity: 1 }, { id: 4, quantity: 50 }, { id: 5, quantity: 2 }];
    arr.push({ id: 6, quantity: 3 });
    arr.push({ id: 7, quantity: 25 });
    console.log('Array: ');
    arr.forEach((val) => console.log('Id: ' + val.id + ' Quantity: ' + val.quantity));

    arr.sort((a, b) => a.quantity - b.quantity);
    console.log('Array sorted by quantity: ');
    arr.forEach((val) => console.log('Id: ' + val.id + ' Quantity: ' + val.quantity));

    let sum = arr.reduce((prev, curr) => prev + curr.quantity, 0);
    console.log('Total quantity: ' + sum);


    // some string operations

    let string = 'Hi! This is the test string!';
    console.log('String: ' + string);

    string = string.replace('Hi', 'Hello');
    console.log('Modified String: ' + string);

    string = string.toUpperCase();
    console.log('Modified String: ' + string);

    string = string.toLowerCase();
    console.log('Modified String: ' + string);


    // some date operations

    let date = new Date();
    console.log('Current date : ' + date);
    console.log('Current date in ISO format : ' + date.toISOString());

    alert('Please check console by pressing F12');
}