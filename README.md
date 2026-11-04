# Assignment 2 - Node.js Core Modules, HTTP CRUD & Bonus 🚀

حل كامل وشامل للتكليف الثاني (Assignment 2) الخاص بكورس Node.js من أكاديمية Route.

---

## 📁 محتويات المشروع (Project Structure)

| الملف | الوصف |
| :--- | :--- |
| **`part1.js`** | حلول الـ 20 سؤال الخاصة بـ **Node.js Core Modules** (Path, FS, OS, Events, Streams, Zlib). |
| **`server.js`** | سيرفر مبني بـ Node.js HTTP Module والـ `fs` Module لتنفيذ عمليات الـ CRUD مباشرة من `users.json`. |
| **`users.json`** | ملف الـ JSON المخصص لحفظ بيانات المستخدمين. |
| **`bonus.js`** | حل مسألة LeetCode رقم 1539 (`kth-missing-positive-number`) باستخدام خوارزمية Binary Search. |
| **`Assignment2.postman_collection.json`** | كولكشن بوستمان جاهز للاستيراد بضغطة واحدة. |

---

## 🚀 طريقة التشغيل (Commands)

### 1. تشغيل واختبار الجزء الأول (Part 1 - Core Modules):
```bash
node part1.js
```

### 2. تشغيل سيرفر الـ CRUD (Part 2 - HTTP Server):
```bash
node server.js
```
أو:
```bash
npm start
```
> السيرفر سيعمل على: `http://localhost:3000`

### 3. تشغيل مسألة البونص (Part 3 - Bonus):
```bash
node bonus.js
```
