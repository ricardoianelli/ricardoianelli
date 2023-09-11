//Exercise 2: What’s the output in the console?
function foo(x) {
    let m;
    console.log(x, y);
    if (x > 5) {
        var y = 5;
        m = x + y;
    } else {
        let z = 10;
        m = z;
    }
    x = m;
    console.log(x, y);
}
var x = 10;
foo(3);
console.log(x);



/* Answer and explanation: It will output three times to the console:
-> First output:  3 undefined
-> Second output: 10 undefined
-> Third output: 10

Explanation: 
First output will be from console.log(x,y), but at this time, we only have the value of x that came as a method argument with the value of 3,
so it will output x as 3 and y is still undefined. It don't error out as I would expect, probably because it exists inside one of the conditions inside this function.

Second output will also be from a console.log(x,y), but at this time the value of x have changed, but y is still undefined because it didn't go inside the condition block that 
assigns a value to y (x>5).

Third output is just logging x, and since we don't create any new variable x using var inside the function, we still use the value assigned globally before, which is 10.
*/