const enrollmentService = require('../services/enrollmentService');
const studentService = require('../services/studentService');
const courseService = require('../services/courseService');

const getAllEnrollments = (req, res) => {
  res.json(enrollmentService.getAllEnrollments());
};

const getEnrollmentById = (req, res) => {
  const id = Number(req.params.id);
  const enrollment = enrollmentService.getById(id);
  if (!enrollment) return res.status(404).json({ error: 'לא נמצא רישום עם מזהה זה' });
  res.json(enrollment);
};

const createEnrollment = (req, res) => {
  const { studentId, courseId, date } = req.body;
  if (!studentId || !courseId) {
    return res.status(400).json({ error: 'יש לספק studentId ו-courseId' });
  }
  if (!studentService.getById(Number(studentId)) || !courseService.getById(Number(courseId))) {
    return res.status(400).json({ error: 'studentId ו-courseId חייבים להיות קיימים' });
  }
  const newEnrollment = enrollmentService.createEnrollment({
    studentId: Number(studentId),
    courseId: Number(courseId),
    date
  });
  res.status(201).json(newEnrollment);
};

const updateEnrollment = (req, res) => {
  const id = Number(req.params.id);
  const { studentId, courseId, date } = req.body;
  if (studentId && !studentService.getById(Number(studentId))) {
    return res.status(400).json({ error: 'studentId חייב להיות קיים' });
  }
  if (courseId && !courseService.getById(Number(courseId))) {
    return res.status(400).json({ error: 'courseId חייב להיות קיים' });
  }
  const updatedEnrollment = enrollmentService.updateEnrollment(id, {
    studentId: studentId ? Number(studentId) : undefined,
    courseId: courseId ? Number(courseId) : undefined,
    date
  });
  if (!updatedEnrollment) return res.status(404).json({ error: 'לא נמצא רישום לעדכון' });
  res.json(updatedEnrollment);
};

const deleteEnrollment = (req, res) => {
  const id = Number(req.params.id);
  const deletedEnrollment = enrollmentService.deleteEnrollment(id);
  if (!deletedEnrollment) return res.status(404).json({ error: 'לא נמצא רישום למחיקה' });
  res.json(deletedEnrollment);
};

module.exports = {
  getAllEnrollments,
  getEnrollmentById,
  createEnrollment,
  updateEnrollment,
  deleteEnrollment
};
