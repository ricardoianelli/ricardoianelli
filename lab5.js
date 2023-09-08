
//First Question
function sum(inputArray) {
    return inputArray.reduce((total, currentNum) => 
    {
    	if (currentNum > 20) {
    		total += currentNum;
    	}
        return total;
    }, 0);
}


//Second Question
function getNewArray(stringsArray) {
    return stringsArray.filter(()=> (s.length >= 5 && s.includes('a')))
}

function stringFilter(s) {
    return (s.length >= 5 && s.includes('a'));
}

