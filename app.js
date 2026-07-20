const express = require('express');
const app = express();
const PORT = 3000;

const courseRoutes = require('./routes/courseRoutes');
const studentRoutes = require('./routes/studentRoutes');
const enrollmentRoutes = require('./routes/enrollmentRoutes');

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'השרת עובד בהצלחה',
    description: 'API של קורסים, תלמידים ורישומים'
  });
});

app.use('/courses', courseRoutes);
app.use('/students', studentRoutes);
app.use('/enrollments', enrollmentRoutes);

// טיפול ב-404 עבור נתיבים שלא קיימים
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// טיפול בשגיאות כלליות של השרת
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Server error' });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
