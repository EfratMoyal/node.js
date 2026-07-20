# Node.js Lessons API

פרויקט API פשוט לניהול קורסים, תלמידים ורישומים שנבנה ב־Node.js עם Express.

## סיכום הפרויקט והשלבים

הפרויקט בנוי לפי דרישות שיעור 5 של המורה:
1. בנינו פרויקט מבוסס Express עם מבנה מודולרי בשכבות.
2. הוספנו נתונים פשוטים בזיכרון ב־`data/`.
3. בנינו שירותי CRUD ב־`services/` עבור כל ישות.
4. יצרנו בקרות ב־`controllers/` לטיפול בבקשות HTTP.
5. קישרנו את כל הנתיבים דרך `routes/`.
6. הוספנו middleware לבדיקה ולוג של בקשות.
7. שיפרנו את הפרויקט עם טיפול שגיאות ו־404.

## מה קרה בפרויקט

### שלב ראשוני
- התחלנו עם קובץ `app.js` שמפעיל שרת Express.
- יצרנו נתיבי API בסיסיים לקורסים, תלמידים ורישומים.
- הקוד הראשוני היה עם כל הלוגיקה ב־`app.js`.

### שלב ארגון למבנה מודולרי
- העברנו את הנתונים ל־`data/` כדי להפריד את האחסון מהלוגיקה.
- בנינו `services/` שכוללים פונקציות CRUD על רשימת הנתונים.
- בנינו `controllers/` שמקבלים בקשה, מבצעים בדיקות ונשלחים ל־service.
- יצרנו `routes/` שמקשרים את הכתובות לפונקציות של ה־controllers.

### שלב הוספת middleware
- יצרנו קובץ `middleware.js` שמיישם בדיקת `auth-key` ב־header.
- אם ה־header חסר או לא תקין, השרת מחזיר `401`.
- הוספנו גם לוג כל בקשה ב־console כדי לבדוק שה־middleware רץ.
- כל הראוטים ב־`routes/` משתמשים ב־middleware הזה.

### שלב טיפול בשגיאות
- הוספנו ב־`app.js` טיפול ב־404 לכל נתיב שלא קיים.
- הוספנו טיפול בשגיאות כלליות שמחזיר `500` במקרים של שגיאה פנימית.

## מבנה קבצים והשכבות

- `app.js`
  - נקודת ההרצה של השרת.
  - מייבא את ה־routes ומפעיל את Express.
  - מגדיר middleware גלובלי ל־JSON.
  - מטפל ב־404 ובשגיאות כלליות.

- `package.json`
  - מנהל את התלויות של הפרויקט.
  - הקוד משתמש בספריית `express` בלבד.

- `data/`
  - `courses.js` - מערך של קורסים.
  - `students.js` - מערך של תלמידים.
  - `enrollments.js` - מערך של רישומים.
  - הקבצים האלה נותנים נתונים סטטיים בזיכרון.

- `services/`
  - `courseService.js`, `studentService.js`, `enrollmentService.js`.
  - כל service מכיל פונקציות לשאילתות ועדכונים על המערך.
  - פונקציות מרכזיות: `getAll`, `getById`, `create`, `update`, `delete`.

- `controllers/`
  - `courseController.js`, `studentController.js`, `enrollmentController.js`.
  - כל controller מקבל `req` ו־`res`, עושה בדיקה ראשונית ואז קורא ל־service.
  - Controllers דואגים להחזיר סטטוס HTTP נכון לפי התוצאה.

- `routes/`
  - `courseRoutes.js`, `studentRoutes.js`, `enrollmentRoutes.js`.
  - מחברים נתיבים ל־controllers.
  - מיישמים middleware על כל ראוטר כדי להגן על כל הנתיבים.

## פונקציות מרכזיות

### `authMiddleware` (`middleware.js`)
- קורא את ה־header `auth-key`.
- אם הערך מתאים ל־`my-secure-key`, הבקשה ממשיכה.
- אם לא, מחזיר `401 Unauthorized`.
- גם מדפיס כל בקשה בקונסול.

### `courseService.getAllCourses()`
- מחזירה את כל מערך הקורסים.
- כל service דומה במבנה ונותן נקודת גישה אחת לנתונים.

### `controller.getCourseById()`
- ממיר את `req.params.id` למספר.
- קורא ל־service לקבלת הקורס.
- אם הקורס לא קיים מחזיר `404`.

### `app.js` - טיפול ב־404
- אחרי כל הנתיבים יש `app.use((req, res) => res.status(404).json({ error: 'Not found' }))`.
- זה מבטיח שהשרת יחזיר תשובה נכונה כשמבקשים נתיב לא מוכר.

### `app.js` - טיפול בשגיאות כלליות
- מאזין לשגיאות שלא טופלו ומחזיר `500`.
- רושם את השגיאה בקונסול כדי שניתן יהיה לבדוק אותה.

## איך להריץ

1. נווטי לתיקיית הפרויקט:
   ```powershell
   cd "C:\Users\User\Desktop\תכנות\Node,js\hello.js"
   ```
2. התקיני תלויות:
   ```powershell
   npm install
   ```
3. הפעלי את השרת:
   ```powershell
   npm start
   ```
4. השרת רץ בכתובת:
   ```
   http://localhost:3000
   ```

## נקודות קצה (API)

### קורסים
- `GET /courses`
- `GET /courses/:id`
- `POST /courses`
- `PUT /courses/:id`
- `DELETE /courses/:id`

### תלמידים
- `GET /students`
- `GET /students/:id`
- `POST /students`
- `PUT /students/:id`
- `DELETE /students/:id`

### רישומים
- `GET /enrollments`
- `GET /enrollments/:id`
- `POST /enrollments`
- `PUT /enrollments/:id`
- `DELETE /enrollments/:id`

## דוגמאות קריאות עם curl

### GET לכל הקורסים
```bash
curl -H "auth-key: my-secure-key" http://localhost:3000/courses
```

### POST יצירת קורס חדש
```bash
curl -X POST http://localhost:3000/courses \
  -H "Content-Type: application/json" \
  -H "auth-key: my-secure-key" \
  -d '{"name":"JavaScript Advanced","description":"קורס מתקדם ב-JavaScript"}'
```

### PUT עדכון תלמיד
```bash
curl -X PUT http://localhost:3000/students/1 \
  -H "Content-Type: application/json" \
  -H "auth-key: my-secure-key" \
  -d '{"name":"יונית כהן","class":"ח2"}'
```

### DELETE מחיקת רישום
```bash
curl -X DELETE http://localhost:3000/enrollments/1 \
  -H "auth-key: my-secure-key"
```

## הערות חשובות

- הנתונים נשמרים בזיכרון בלבד.
- אם סוגרים ומפעילים שוב את השרת, הנתונים יחזרו למצב ההתחלתי.
- הפרויקט מוכן לשדרוג עתידי עם מסד נתונים אמיתי.
- הקוד נבנה לפי עקרון ההפרדה של שכבות כדי שיהיה קריא ונוח לתחזוקה.
