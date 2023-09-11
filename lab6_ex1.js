//Exercise 1: What’s the output in the console?
function b() {
    const y = 30;
    a();
    function a() {
        console.log(x, y);
    }
    var x = 10;
    console.log(x, y);
}
const x = 20;
var y = 40;
b();


/* Answer and explanation: It will output two things to the console:
-> First output: undefined 30
-> Second output: 10 30

Explanation: It will try to output the values of x and y, but at the first time, x have not been initialized.
For that reason, though x exists in the FEC variable object, it is still not initialized, so its value is undefined, and that's
what is printed. Y is both defined and initialized, so its value is printed successfully.

On the second output, both of them have already been defined and initialized, so they're successfuly printed.

A question I had first was "Why it didn't print the value of X as 20 instead of undefined if it is a constant outside the function?"
After some minutes analyzing the code I came to the conclusion that it's because function a will follow the execution chain only until it finds those
variables. After it finds it, it doesn't keep looking in outer scopes, that's why it never need to go and use the values defined in the global execution context.

The answer to why the values of x=20 and y=40 aren't used is the same, since they exist in the inner contexts, function a doesn't need to go all the way out there to get values for x and y.
 */