const students = require('../data/students');

const getById = (id) => students.find(student => student.id === id);
const nextId = () => (students.length ? Math.max(...students.map(student => student.id)) + 1 : 1);

const getAllStudents = () => students;
const createStudent = ({ name, class: studentClass }) => {
  const newStudent = { id: nextId(), name, class: studentClass };
  students.push(newStudent);
  return newStudent;
};

const updateStudent = (id, updates) => {
  const student = getById(id);
  if (!student) return null;
  if (updates.name) student.name = updates.name;
  if (updates.class) student.class = updates.class;
  return student;
};

const deleteStudent = (id) => {
  const index = students.findIndex(student => student.id === id);
  if (index === -1) return null;
  return students.splice(index, 1)[0];
};

module.exports = {
  getAllStudents,
  getById,
  createStudent,
  updateStudent,
  deleteStudent
};
