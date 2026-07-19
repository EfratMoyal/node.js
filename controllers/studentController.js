const studentService = require('../services/studentService');

const getAllStudents = (req, res) => {
  res.json(studentService.getAllStudents());
};

const getStudentById = (req, res) => {
  const id = Number(req.params.id);
  const student = studentService.getById(id);
  if (!student) return res.status(404).json({ error: 'לא נמצא תלמיד עם מזהה זה' });
  res.json(student);
};

const createStudent = (req, res) => {
  const { name, class: studentClass } = req.body;
  if (!name || !studentClass) {
    return res.status(400).json({ error: 'יש לספק שם וכיתה לתלמיד' });
  }
  const newStudent = studentService.createStudent({ name, class: studentClass });
  res.status(201).json(newStudent);
};

const updateStudent = (req, res) => {
  const id = Number(req.params.id);
  const student = studentService.updateStudent(id, req.body);
  if (!student) return res.status(404).json({ error: 'לא נמצא תלמיד לעדכון' });
  res.json(student);
};

const deleteStudent = (req, res) => {
  const id = Number(req.params.id);
  const deletedStudent = studentService.deleteStudent(id);
  if (!deletedStudent) return res.status(404).json({ error: 'לא נמצא תלמיד למחיקה' });
  res.json(deletedStudent);
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
};
