class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    };

    toString() {
        return this.value;
    };
}

class LinkedList {
    constructor() {
        this.firstNode = null;
    };

    add(value) {
        let newNode = new Node(value);
        if (this.firstNode == null) {
            this.firstNode = newNode;
        }
        else {
            let currentNode = this.firstNode;
            while (currentNode.next != null) {
                currentNode = currentNode.next;
            }

            currentNode.next = newNode;
        }
    };

    remove(value) {
        if (this.firstNode == value) {
            this.firstNode = this.firstNode.next;
            return;
        }

        let currentNode = this.firstNode;

        while (currentNode.next != null) {
            if (currentNode.next == value) {
                currentNode.next = currentNode.next.next;
                return;
            }
            currentNode = currentNode.next;
        }
    };

    print() {
        let printString = "LinkedList{";
        let currentNode = this.firstNode;
        while (currentNode != null) {
            printString += currentNode;
            currentNode = currentNode.next;
            if (currentNode != null) {
                printString += ",";
            }
        }

        printString += "}"
        console.log(printString);
    };
}

let linkedlist = new LinkedList();
linkedlist.add(1);
linkedlist.add(2);
linkedlist.add(3);
linkedlist.print(); //in the console, you should see: LinkedList{1,2,3}
linkedlist.remove(2);
linkedlist.print(); //in the console, you should see: LinkedList{1,3}
