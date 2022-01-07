function changeFontSize(){
    document.getElementById("p1").style.fontSize = "20px";
}

function changeBackgroundColor(){
    document.getElementById("p1").style.backgroundColor ="orange";
}

function changeVisibility(){
    document.getElementById("p1").style.visibility = "hidden";
}

function changeText(text){
    document.getElementById("p1").innerHTML = text;
}



//Array operations
//Sorting the array
var nums=[98,3,1,4,1,3,5,3,4,32,4,342,12];
console.log(nums.sort());

//Pushing into array
var arr1=[10,20,30];
arr1.push(40);
console.log(arr1);

//Poping from array
arr1.pop();
console.log(arr1);

//Populating 2 array in one 
var arr2= [1,2,3,4,5];
var arr3= arr2.concat(...arr1);
console.log(arr3);

//Splicing
arr3.splice(3,4);
console.log(arr3);

//Removing from front
arr3.shift();
console.log(arr3);

//Adding to front
arr3.unshift(1);
arr3.unshift(2);
console.log(arr3);

//Slicing the array
var arr4= arr3.slice(0, 2);
console.log(arr4);


//Objects
var obj=[{
    id:1,
    name:"BMW",
    model:"X",
    price:100
},
{
    id:2,
    name:"Volkswagon",
    model:"A",
    price:200
    
},
{
    id:3,
    name:"Mercedes",
    model:"R",
    price:300
},
{
    id:4,
    name:"Aston Martin",
    model:"I",
    price:400
},
{
    id:5,
    name:"Tesla",
    model:"T",
    price:500
}]

//Filter 
var filterObj= obj.filter(item => item.price > 300);
console.log(filterObj);

//Using custom sorting
var res= obj.sort((a, b)=> a.model.localeCompare(b.model));
console.log(res);

//Using for Each
obj.forEach((item)=> console.log(item.name +" "+ item.model));

//Using for
for(var item of obj){
    console.log(item.model +" "+ item.name)
}

//Reduce
var totalPrice= Object.keys(obj).reduce(   
    function (prev, key) { 
        return (prev + obj[key].price) 
    }, 0);
console.log(totalPrice);



//Maps 
const map= new Map();
map.set('India','INR');
map.set('USA','Dollar');
map.set('UK', 'Pound');
map.set('FRANCE', 'Euro');
console.log(map);

//Checking map contains key
console.log(map.has('USA'));

//Deleting
map.delete('UK');
console.log(map);
console.log(map.has('UK'));


//Iteratring thriugh the map
map.forEach((key, val)=> console.log(key, val));


//Sets
const set= new Set();
set.add(100);
set.add(200);
set.add(300);
console.log(set);

//Deleting
set.delete(100);
console.log(set);

console.log(set.keys())

//Iteratiing
for(var item of set) {
    console.log(item)
}

//200 is not added since the set already contains 200 
set.add(200);
console.log("After adding ");
for(var key of set) {console.log(keyFoo)}

