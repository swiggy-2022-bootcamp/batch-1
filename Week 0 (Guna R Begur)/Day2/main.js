const selValue = document.getElementById("selValue")
const image = document.getElementsByTagName('img')[0]

function update(data){
    selValue.innerHTML = data; 
    console.log(selValue.style.fontSize)
}

function incFont(){
    selValue.style.fontSize = "2rem"
}

function decFont(){
    selValue.style.fontSize = "1rem"
}

function toggleDisplay(){
    if(image.style.display==="none"){
        image.style.display=""
    }else{
        image.style.display="none"
    }
}

function toggleVisibility(){
    console.log(image.style.visibility)
    if(image.style.visibility==="hidden"){
        image.style.visibility=""
    }else{
        image.style.visibility="hidden"
    }
}