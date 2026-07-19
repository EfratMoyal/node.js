const enrollments = require('../data/enrollments');
const studentService = require('./studentService');
const courseService = require('./courseService');

const getById = (id) => enrollments.find(enrollment => enrollment.id === id);
const nextId = () => (enrollments.length ? Math.max(...enrollments.map(enrollment => enrollment.id)) + 1 : 1);

const getAllEnrollments = () => enrollments;

const createEnrollment = ({ studentId, courseId, date }) => {
  if (!studentService.getById(studentId) || !courseService.getById(courseId)) return null;
  const newEnrollment = {
    id: nextId(),
    studentId,
    courseId,
    date: date || new Date().toISOString().split('T')[0]
  };
  enrollments.push(newEnrollment);
  return newEnrollment;
};

const updateEnrollment = (id, updates) => {
  const enrollment = getById(id);
  if (!enrollment) return null;
  if (updates.studentId && !studentService.getById(updates.studentId)) return null;
  if (updates.courseId && !courseService.getById(updates.courseId)) return null;
  if (updates.studentId) enrollment.studentId = updates.studentId;
  if (updates.courseId) enrollment.courseId = updates.courseId;
  if (updates.date) enrollment.date = updates.date;
  return enrollment;
};

const deleteEnrollment = (id) => {
  const index = enrollments.findIndex(enrollment => enrollment.id === id);
  if (index === -1) return null;
  return enrollments.splice(index, 1)[0];
};

module.exports = {
  getAllEnrollments,
  getById,
  createEnrollment,
  updateEnrollment,
  deleteEnrollment
};
