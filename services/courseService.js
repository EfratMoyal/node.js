const courses = require('../data/courses');

const getById = (id) => courses.find(course => course.id === id);
const nextId = () => (courses.length ? Math.max(...courses.map(course => course.id)) + 1 : 1);

const getAllCourses = () => courses;
const createCourse = ({ name, description }) => {
  const newCourse = { id: nextId(), name, description };
  courses.push(newCourse);
  return newCourse;
};

const updateCourse = (id, updates) => {
  const course = getById(id);
  if (!course) return null;
  if (updates.name) course.name = updates.name;
  if (updates.description) course.description = updates.description;
  return course;
};

const deleteCourse = (id) => {
  const index = courses.findIndex(course => course.id === id);
  if (index === -1) return null;
  return courses.splice(index, 1)[0];
};

module.exports = {
  getAllCourses,
  getById,
  createCourse,
  updateCourse,
  deleteCourse
};
