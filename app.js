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

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
