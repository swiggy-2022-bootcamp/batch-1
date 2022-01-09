##  day 2 notes

Variables and constants 

* ```let``` has block-level scope.

* variables declared with ```const``` can not be reassigned. But are not immutable

example,
```
        const letters = new Set(["a","b","c"]); 
        letters.add("x")
```
This ^ is ok.

### exercise

1. Modify innerHTML, style.fontSize, style.display, style.visibility, document.getElementById(“test”).value;

2. Add date object 
```
const d1 = new Date();
const d2 = new Date(year,month,day,hour,minute,seconds);

```
3.
