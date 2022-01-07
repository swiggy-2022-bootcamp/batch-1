function extractValue(arr, id) {

    for (let i = 0; i < arr.length; ++i) {
        // extract value from property
        if (arr[i]['id'] == id) {
            return (arr[i]['name']);
        }
    }
    window.alert("Item not found in the Register !")
    return ("");
}

function showBillAmount() {
    console.log("Bill Amount Called !");

    var rate = parseInt(document.getElementById("rate").value);
    var quant = parseInt(document.getElementById("quant").value);

    console.log(rate);
    console.log(quant);

    if (rate == NaN) window.alert("Rate Missing !");
    else if (quant == NaN) window.alert("Quantity Missing !");
    else {
        //window.alert("Quantity Missing !");
        var total = rate * quant;

        console.log(total);

        document.getElementById("billtext").style.display = "";
        document.getElementById("billamt").style.display = "";
        document.getElementById("billamt").style.fontSize = 72;
        document.getElementById("billamt").innerText = total;
    }
}

function displayImage() {
    document.getElementById("logo").style.display = "";
}

function hideImage() {

    document.getElementById("logo").style.display = "None";

}