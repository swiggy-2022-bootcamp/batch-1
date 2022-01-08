### Inline Script:
* Inline scripts cannot be reused.
### Hoisting :
* Hoisting is used for 're-use' of the code.
* Hoisting is Javascript's default behaviour of moving all declarations to the top of the current scope ( to the top of the current script or the current function )
* Hoisting a `let` variable before declaration causes `ReferenceError - Cannog access the let variable before intialization`.
* With `const`, you cant use a variable before it is declared. Error : `Missing initializer in const declaration.`

### Date:

* `const d1 = new Date();`
* `const d2 = new Date(year,month,day,hours,seconds,milliseconds);`
* `cost d3 = new Date(milliseconds);`
* `const d4 = new Date(date string);`

* Month from 0 to 11 (12 will overflow to next Jan)
* Day overflow will spill over to next month
* Using lesser parameters will exclue from the right

### Array:
* Array definition
* Methods
* Sort (string and number) - mynum.sort(function(a,b){return a-b});
* Iterating arrays - forEach()
* toString, pop, push, shift, unshift, splice,concat, slice
* Math.max.apply(null,param) to find max number
* Map(), filter(), reduce() [myfunc(prev,curvalue)],every(),includes(),find(),findIndex()
* from(), keys()

### Sets:

* new Set()
* add()
* delete()
* has()
* forEach()
* values()
* size()
* entries()


## Assignment 1:
1. Modify innerHTML, style.fontSize, style.display, style.visibility,document.getElementById(“test”).value;
2. Array Methods, Objects, Sets and Maps.