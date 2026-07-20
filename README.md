# Node.js Lessons API

API פשוט לניהול קורסים, תלמידים ורישומים.

## מבנה הפרויקט

- `app.js` - נקודת הכניסה של השרת
- `package.json` - הגדרות הפרויקט ותלויות
- `data/` - נתונים בזיכרון, מייצגים את המשתמשים, הקורסים והרישומים
- `services/` - לוגיקה עסקית לביצוע CRUD על הנתונים
- `controllers/` - בקרות לטיפול בבקשות HTTP
- `routes/` - ניתוב הכתובות ל־controllers

## איך מריצים

1. נווטי לתיקיית הפרויקט:
   ```powershell
   cd "C:\Users\User\Desktop\תכנות\Node,js\hello.js"
   ```
2. התקיני תלויות (אם צריך):
   ```powershell
   npm install
   ```
3. הפעלי את השרת:
   ```powershell
   npm start
   ```
4. השרת רץ ב־`http://localhost:3000`

## נקודות קצה (API)

### קורסים
- `GET /courses` - קבלת רשימת כל הקורסים
- `GET /courses/:id` - קבלת קורס לפי מזהה
- `POST /courses` - יצירת קורס חדש
- `PUT /courses/:id` - עדכון קורס קיימת
- `DELETE /courses/:id` - מחיקת קורס

### תלמידים
- `GET /students` - קבלת רשימת כל התלמידים
- `GET /students/:id` - קבלת תלמיד לפי מזהה
- `POST /students` - יצירת תלמיד חדש
- `PUT /students/:id` - עדכון תלמיד
- `DELETE /students/:id` - מחיקת תלמיד

### רישומים
- `GET /enrollments` - קבלת רשימת כל הרישומים
- `GET /enrollments/:id` - קבלת רישום לפי מזהה
- `POST /enrollments` - יצירת רישום חדש
- `PUT /enrollments/:id` - עדכון רישום
- `DELETE /enrollments/:id` - מחיקת רישום

## הערות

- הנתונים נשמרים כרגע בזיכרון בלבד ולא בבסיס נתונים.
- כל רענון של השרת מחזיר את הנתונים למצב ההתחלתי.
- המבנה מופרד לשכבות: `data`, `services`, `controllers`, `routes`.
