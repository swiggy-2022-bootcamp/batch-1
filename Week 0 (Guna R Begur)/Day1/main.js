const list = document.getElementById('list')

const input = document.getElementById('listValue')


function addValue(event){
    if(event.keyCode==13 && input.value.trim()!==""){
        const li = document.createElement('li')
        li.innerText = input.value.trim()
        list.appendChild(li)
        console.log(`${input.value} was added to list`)
        input.value = ""
    }
}