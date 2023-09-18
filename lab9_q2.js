function Student(studentId) {
    this.studentId = studentId;
    this.answers = [];
}

Student.prototype.addAnswer = function(question) {
    let prevAnswer = this.answers.find(a => a.qid == question.qid);
    if (prevAnswer == null) {
        this.answers.push(question);
    }
    else {
        this.answers = this.answers.filter(a => a != question);
    }
};

function Question(qid, answer) {
    this.qid = qid;
    this.answer = answer;
}

Question.prototype.checkAnswer = function(answer) {
    return this.answer == answer;
};

function Quiz(questions, students) {
    this.questions = questions;
    this.students = students;
};

Quiz.prototype.scoreStudentBySid = function(sid) {
    let student = this.students.find(s => s.studentId == sid);
    if (student == null) return;

    let result = 0;

    this.questions.forEach(question => {
        let studentAnswer = student.answers.find(a => a.qid == question.qid);
        if (studentAnswer.answer == question.answer) {
            result++;
        }
    });

    return result;
};

Quiz.prototype.getAverageScore = function() {
    let sumOfScores = 0;

    this.students.forEach(s => {
        sumOfScores += this.scoreStudentBySid(s.studentId);
    });

    return sumOfScores/this.students.length;
};