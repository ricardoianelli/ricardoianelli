function Node(value) {
    this.value = value;
    this.next = null;    
}

Node.prototype.toString = function() {
    return "" + this.value
}

function LinkedList() {
    this.firstNode = null;
}

LinkedList.prototype.print = function() {
    printString = "LinkedList{";
    
    let currentNode = this.firstNode;

    while (currentNode != null) {
        printString += currentNode;
        currentNode = currentNode.next;
        if (currentNode != null) {
            printString += "," 
        }
    }

    printString += "}"

    console.log(printString)
}

LinkedList.prototype.add = function (value) {
    newNode = new Node(value);

    currentNode = this.firstNode;

    if (currentNode === null) {
        this.firstNode = newNode;
        return;
    }

    while (currentNode.next != null) {
        currentNode = currentNode.next;
    }

    currentNode.next = newNode;
}

LinkedList.prototype.remove = function (valueToRemove) {

    // Check if the first value is the one we're looking for.
    if (this.firstNode == valueToRemove) {
        this.firstNode = this.firstNode.next;
        return;
    }

    let currentNode = this.firstNode;

    while (currentNode.next != null) {
        if (currentNode.next == valueToRemove) {
            currentNode.next = currentNode.next.next;
            break;
        }
        else {
            currentNode = currentNode.next;
        }
    }
}

let linkedlist = new LinkedList();
linkedlist.add(1);
linkedlist.add(2);
linkedlist.add(3);

linkedlist.print(); //Expected Result: LinkedList{1,2,3};

linkedlist.remove(2);

linkedlist.print(); //Expected Result: LinkedList{1,3};