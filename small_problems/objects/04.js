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

let foo = createStudent('Foo', '1st');
// foo.info();
// foo.listCourses();
foo.addCourse({ name: 'Math', code: 101 });
foo.addCourse({ name: 'Advanced Math', code: 102 });
// foo.listCourses();
foo.addNote(101, 'Fun course');
foo.addNote(101, 'Remember to study for algebra');
// foo.viewNotes();
foo.addNote(102, 'Difficult subject');
// foo.viewNotes();
foo.updateNote(101, 'Fun course');
foo.viewNotes();
