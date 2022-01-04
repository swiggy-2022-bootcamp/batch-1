function display() {  
    alert("Hello from an external JavaScript file!");  
    console.log("Now printing the page using print() method...")
    window.print("Using External JavaScript.")
    document.getElementById("internal_js").innerHTML = "Paragraph's value has been changed using the 'innerHtml' property!";
}