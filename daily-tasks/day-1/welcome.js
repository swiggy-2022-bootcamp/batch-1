function processInput(name, number) {
    var isValid = true;
    var errorMessage = "";

    if (name.length == 0) {
        isValid = false;
        errorMessage += "Your name is blank !!!\n\n";
    }

    if (isNaN(number)) {
        isValid = false;
        errorMessage += "Your mobile number is not a number !!!\n\n";
    }

    if (number.length != 10) {
        isValid = false;
        errorMessage += "Your mobile number is not of 10 digits !!!";
    }

    if (isValid) {
        console.log("Name: " + name + "; Mobile: " + number);
        document.getElementById("dispDiv").innerHTML =
            "Name: " + name + "; Mobile: " + number + "; Hover on me once!";
    } else {
        console.log(errorMessage);
        document.write(errorMessage);
    }
    return false;
}
