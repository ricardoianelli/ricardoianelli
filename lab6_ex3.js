/*
Exercise 3: Write a function printNumbers(from, to) that outputs a number every second, 
starting from from and ending with to.
*/


function printNumbers(from, to) {
    "use strict";
    let recurringJobId;
    recurringJobId = setInterval(() => {
        if (from <= to) {
            console.log(from++);
        }
        else {
            clearInterval(recurringJobId);
        }
    }, 1000);
}