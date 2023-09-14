let student = {
    firstName: "",
    lastName: "",
    grades: [],

    inputNewGrade: function (newGrade) {
        this.grades.push(newGrade)
    },
    
    computeAverageGrade: function () {
        let sum = this.grades.reduce((sum, currentGrade) => sum += currentGrade);
        return sum / this.grades.length;
    },

    printGradeAverage: function () {
        console.log("Average grade for " + this.firstName + " " + this.lastName + ": " + this.computeAverageGrade());
    },
}

let student1 = Object.create(student);
student1.firstName = "Ricardo";
student1.lastName = "Ianelli";
student1.grades = [90, 100];

let student2 = Object.create(student);
student2.firstName = "Bruce";
student2.lastName = "Wayne";
student2.grades = [98, 100];

student1.printGradeAverage();
student2.printGradeAverage();