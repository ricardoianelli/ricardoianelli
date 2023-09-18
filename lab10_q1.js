/*
Question 1

Write the necessary Node script to make this code work for all arrays: 
[1,2,3,4,5,6,7,8].even(); // [2,4,6,8] 
[1,2,3,4,5,6,7,8].odd(); // [1,3,5,7] 
Test your code in Node.JS CLI
*/

Array.prototype.even = function() {
    return this.filter(x => x%2==0);
}

Array.prototype.odd = function() {
    return this.filter(x => x%2!=0);
}

var evenResult = [1,2,3,4,5,6,7,8].even();
console.log("Even: " + evenResult)

var oddResult = [1,2,3,4,5,6,7,8].odd();
console.log("Odd: " + oddResult)