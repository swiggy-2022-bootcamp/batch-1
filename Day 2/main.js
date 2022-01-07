function updateDiv2(){
    console.log("Upadting content of div tag with id=div2");
    var divToUpdate = document.getElementById("div2");
    var inputField = document.getElementById("field1");
    divToUpdate.style.fontSize = 12;
    divToUpdate.style.display = 'inline';
    inputField.style.visibility = "visible";
    inputField.value = "Value upadted"
    divToUpdate.innerHTML = "Updated the content on mouse click on div 1";
}

day2Array();
day2Map();
day2Set();

function day2Array(){
    let arr = [1,2,4,62,0,4,-20];
    let sortArr = arr.sort(function(a,b){return b-a;});
    console.log(sortArr)

    arr = [{id:'1',fname:'Aaditya',lname:'Khetan'},{id:'2',fname:'John',lname:'Smith'},{id:'3',fname:'Mark',lname:'Stake'}]
    sortArr = arr.sort(function(a,b){return b.fname < a.fname});
    console.log(sortArr);
    let len = arr.length
    for(let i in arr){
        //console.log(arr[obj].fname);
        //console.log(i);
        printFullName(arr[i]);
    }
    console.log("using for each loop");
    arr.forEach(printFullName);
}

function printFullName(j){
    console.log(j.fname + " " + j.lname);
}

function day2Map(){
    let map = new Map();
    for(let i=0;i<10;i++){
        map.set(i,`hello ${i}`);
    }
    for(let item of map.keys()){
        console.log(item);
    }
    for(let item of map.values()){
        console.log(item);
    }
    for(let item of map.entries()){
        console.log(item);
    }

    map.forEach((value,key)=>{
        console.log(`${key} : ${value}`);
    })

    let obj = {
        name: "Aaditya",
        age: 21
      };
      
      let map1 = new Map(Object.entries(obj));
      
      console.log( map1.get('age') );
}

function day2Set(){
    let set = new Set(["oranges", "apples", "bananas"]);

    for (let value of set) console.log(value);

    console.log("**********************");
    
    set.forEach((value) => {
        console.log(value);
    });

    console.log("**********************");

    for(let item of set.keys()){
        console.log(item);
    }

    console.log("**********************");

    for(let item of set.values()){
        console.log(item);
    }
}