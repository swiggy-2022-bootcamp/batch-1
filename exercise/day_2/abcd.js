function arrayMethods(){

    var arr = new Array();




    arr.push("Apple");

    arr.push("Cherry");

    arr.push("Ornage");

    arr.push(1);

    console.log(arr);




    arr.shift("new")

    console.log(arr);




    arr.pop()

    console.log(arr);




    arr.unshift();

    console.log(arr);




    //----------------------------//




    var arr2 = [,43,55,33,78,88,1,2,3,4,5,6,7,8,9,10,12,14,16,-4,-2];

    arr2 = arr2.filter((digit)=> digit%2==0);

    console.log(arr2);




    arr2.splice(3,2);

    console.log(arr2);




    arr2.sort();

    console.log(arr2);







    arr2.sort((a,b)=>{return b-a});

    console.log(arr2);




    //------------------------------//




    const date1 = new Date();

    console.log(date1);

    const date2 = new Date(70000);

    console.log(date2);

    const date3 = new Date("01/04/2022");

    console.log(date3);

} 