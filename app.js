const express = require('express');
const app = express();
const PORT = 3000;

const courses = require('./courses');
const students = require('./students');
const registrations = require('./registrations');

app.use(express.json());

const getById = (array, id) => array.find(item => item.id === id);
const nextId = (array) => (array.length ? Math.max(...array.map(item => item.id)) + 1 : 1);

app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'השרת עובד בהצלחה',
    description: 'API של קורסים, תלמידים ורישומים'
  });
});

// courses
app.get('/courses', (req, res) => {
  res.json(courses);
});

app.get('/courses/:id', (req, res) => {
  const id = Number(req.params.id);
  const course = getById(courses, id);
  if (!course) return res.status(404).json({ error: 'לא נמצא קורס עם מזהה זה' });
  res.json(course);
});

app.post('/courses', (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).json({ error: 'יש לספק שם ותיאור לקורס' });
  }
  const newCourse = { id: nextId(courses), name, description };
  courses.push(newCourse);
  res.status(201).json(newCourse);
});

app.put('/courses/:id', (req, res) => {
  const id = Number(req.params.id);
  const course = getById(courses, id);
  if (!course) return res.status(404).json({ error: 'לא נמצא קורס לעדכון' });
  const { name, description } = req.body;
  if (name) course.name = name;
  if (description) course.description = description;
  res.json(course);
});

app.delete('/courses/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = courses.findIndex(c => c.id === id);
  if (index === -1) return res.status(404).json({ error: 'לא נמצא קורס למחיקה' });
  const [deletedCourse] = courses.splice(index, 1);
  res.json(deletedCourse);
});

// students
app.get('/students', (req, res) => {
  res.json(students);
});

app.get('/students/:id', (req, res) => {
  const id = Number(req.params.id);
  const student = getById(students, id);
  if (!student) return res.status(404).json({ error: 'לא נמצא תלמיד עם מזהה זה' });
  res.json(student);
});

app.post('/students', (req, res) => {
  const { name, class: studentClass } = req.body;
  if (!name || !studentClass) {
    return res.status(400).json({ error: 'יש לספק שם וכיתה לתלמיד' });
  }
  const newStudent = { id: nextId(students), name, class: studentClass };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

app.put('/students/:id', (req, res) => {
  const id = Number(req.params.id);
  const student = getById(students, id);
  if (!student) return res.status(404).json({ error: 'לא נמצא תלמיד לעדכון' });
  const { name, class: studentClass } = req.body;
  if (name) student.name = name;
  if (studentClass) student.class = studentClass;
  res.json(student);
});

app.delete('/students/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = students.findIndex(s => s.id === id);
  if (index === -1) return res.status(404).json({ error: 'לא נמצא תלמיד למחיקה' });
  const [deletedStudent] = students.splice(index, 1);
  res.json(deletedStudent);
});

// registrations
app.get('/registrations', (req, res) => {
  res.json(registrations);
});

app.get('/registrations/:id', (req, res) => {
  const id = Number(req.params.id);
  const registration = getById(registrations, id);
  if (!registration) return res.status(404).json({ error: 'לא נמצא רישום עם מזהה זה' });
  res.json(registration);
});

app.post('/registrations', (req, res) => {
  const { studentId, courseId, date } = req.body;
  if (!studentId || !courseId) {
    return res.status(400).json({ error: 'יש לספק studentId ו-courseId' });
  }
  const student = getById(students, Number(studentId));
  const course = getById(courses, Number(courseId));
  if (!student || !course) {
    return res.status(400).json({ error: 'studentId ו-courseId חייבים להיות קיימים' });
  }
  const newRegistration = {
    id: nextId(registrations),
    studentId: Number(studentId),
    courseId: Number(courseId),
    date: date || new Date().toISOString().split('T')[0]
  };
  registrations.push(newRegistration);
  res.status(201).json(newRegistration);
});

app.put('/registrations/:id', (req, res) => {
  const id = Number(req.params.id);
  const registration = getById(registrations, id);
  if (!registration) return res.status(404).json({ error: 'לא נמצא רישום לעדכון' });
  const { studentId, courseId, date } = req.body;
  if (studentId) {
    const student = getById(students, Number(studentId));
    if (!student) return res.status(400).json({ error: 'studentId חייב להיות קיים' });
    registration.studentId = Number(studentId);
  }
  if (courseId) {
    const course = getById(courses, Number(courseId));
    if (!course) return res.status(400).json({ error: 'courseId חייב להיות קיים' });
    registration.courseId = Number(courseId);
  }
  if (date) registration.date = date;
  res.json(registration);
});

app.delete('/registrations/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = registrations.findIndex(r => r.id === id);
  if (index === -1) return res.status(404).json({ error: 'לא נמצא רישום למחיקה' });
  const [deletedRegistration] = registrations.splice(index, 1);
  res.json(deletedRegistration);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
