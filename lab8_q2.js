function Student (firstName, lastName, grades=[]) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.grades = grades;
}

Student.prototype.inputNewGrade = function (newGrade) {
    this.grades.push(newGrade)
};

Student.prototype.computeAverageGrade = function () {
    let sum = this.grades.reduce((sum, currentGrade) => sum += currentGrade);
    return sum / this.grades.length;
};

Student.prototype.printGradeAverage = function () {
    console.log("Average grade for " + this.firstName + " " + this.lastName + ": " + this.computeAverageGrade());
};

let student1 = new Student("Ricardo", "Ianelli", [90, 100]);
let student2 = new Student("Bruce", "Wayne");

student2.inputNewGrade(98);
student2.inputNewGrade(100);

student1.printGradeAverage();
student2.printGradeAverage();