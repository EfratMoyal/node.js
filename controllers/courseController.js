const courseService = require('../services/courseService');

const getAllCourses = (req, res) => {
  res.json(courseService.getAllCourses());
};

const getCourseById = (req, res) => {
  const id = Number(req.params.id);
  const course = courseService.getById(id);
  if (!course) return res.status(404).json({ error: 'לא נמצא קורס עם מזהה זה' });
  res.json(course);
};

const createCourse = (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).json({ error: 'יש לספק שם ותיאור לקורס' });
  }
  const newCourse = courseService.createCourse({ name, description });
  res.status(201).json(newCourse);
};

const updateCourse = (req, res) => {
  const id = Number(req.params.id);
  const course = courseService.updateCourse(id, req.body);
  if (!course) return res.status(404).json({ error: 'לא נמצא קורס לעדכון' });
  res.json(course);
};

const deleteCourse = (req, res) => {
  const id = Number(req.params.id);
  const deletedCourse = courseService.deleteCourse(id);
  if (!deletedCourse) return res.status(404).json({ error: 'לא נמצא קורס למחיקה' });
  res.json(deletedCourse);
};

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse
};
