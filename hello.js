const http = require('http');
const PORT = 3000;
const courses = [
  { id: 1, name: 'Node.js Basics', description: 'לומדים את הבסיס של Node' },
  { id: 2, name: 'Frontend Development', description: 'עיצוב ובניית אתרים מתקדמים' }
];

const html = `<!doctype html><meta charset="utf-8"><style>body{font-family:Arial,sans-serif;direction:rtl;padding:20px}li{background:#f8f9fa;margin:10px 0;padding:15px;border-radius:5px;border-right:5px solid #3498db}</style><h1>רשימת הקורסים שלי</h1><ul style="list-style:none;padding:0">${courses
  .map(
    ({ id, name, description }) =>
      `<li><strong style="font-size:1.2em;color:#2c3e50">${name}</strong> <span style="color:#7f8c8d;font-size:.9em">(מזהה:${id})</span><p style="margin:5px 0 0 0;color:#34495e">${description}</p></li>`
  )
  .join('')}</ul>`;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(html);
});

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  console.log('\n--- רשימת הקורסים הפעילים בשרת ---');
  courses.forEach(({ id, name, description }) =>
    console.log(`[מזהה: ${id}] ${name} - ${description}`)
  );
  console.log('----------------------------------\n');
});