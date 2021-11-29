function createStudent(name, grade) {
  return {
    name: name,
    grade: grade,
    courses: [],
    info: function() {
      console.log(`${this.name} is a ${grade} year student`);
    },

    addCourse: function(course) {
      this.courses.push(course);
    },

    listCourses: function() {
      console.log(this.courses);
    },

    addNote: function(code, note) {
      this.courses.forEach(course => {
        if (course['code'] === code) {
          if (course['note']) {
            course['note'] += `; ${note}`;
          } else {
            course['note'] = note;
          }
        }
      });
    },

    updateNote: function(code, note) {
      this.courses.forEach(course => {
        if (course['code'] === code) {
            course['note'] = note;
          }
        }
      );
    },

    viewNotes() {
      this.courses.forEach(course => {
        if (course['note']) {
          console.log(`${course.name}: ${course.note}`);
        }
      })
    }
  }
}

let school = {
  students = [],

  addStudent: function(name, grade) {
    let validGrades = ['1st', '2nd', '3rd', '4th', '5th'];

    if (!validGrades.includes(grade)) {
      return 'Invalid Year';
    }

    let student = createStudent(name, grade);
    this.students.push(student);
    return student;
  },

  enrollStudent: function(student, courseName, courseCode) {
    student.addCourse({'course': courseName, 'code': courseCode});
  },

  addGrade: function(student, courseName, grade) {
    student.courses.forEach(course => {
      if (course['name'] === courseName) {
        course['grade'] = grade;
      }
    });
  },

  getReportCard: function(studentName) {
    studentName.courses.forEach(course => {
      if (course.grade) {
        console.log(`${course.name}: ${course.grade}`);
      } else {
        console.log(`${course.name}: In Progress`);
      }
    });
  },

  courseReport: function(courseName) {
    let total = [];

    console.log(`=${courseName} Grades=`)
    students.forEach(student => {
      student.courses.forEach(course => {
        if (course.name === courseName && course.grade) {
          console.log(`${student}: ${course.grade}`);
          total.push(course.grade);
        }
      });
    });

    let sum = total.reduce((acc, curr) => acc + curr, 0);
    console.log('---');
    console.log(`Course Average: ${sum / total.length}`);
  }

}