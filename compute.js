

function add() {
  num1 = parseInt(document.getElementById("num1").value);
  num2 = parseInt(document.getElementById("num2").value);
  var output = num1 + num2;
  console.log(output);
  document.getElementById("result").innerHTML += output;
  alert("Addition Complete!");
}