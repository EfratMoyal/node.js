
const express = require('express');
const app = express();
const PORT = 3000;

// ייבוא מערכי הנתונים מהקבצים הנפרדים שיצרת
const courses = require('./courses');
const students = require('./students');

// 1. נתיב ראשי (/) - מחזיר אובייקט JSON פשוט עם מידע על השרת
app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'השרת עובד בהצלחה',
    description: 'ברוכים הבאים לשרת ה-Express שלי'
  });
});

// 2. נתיב הקורסים (/courses) - מחזיר את מערך הקורסים בפורמט JSON
app.get('/courses', (req, res) => {
  res.json(courses);
});

// 3. נתיב התלמידים (/students) - מחזיר את מערך התלמידים בפורמט JSON
app.get('/students', (req, res) => {
  res.json(students);
});

// הפעלת השרת והאזנה לפורט שהוגדר
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});