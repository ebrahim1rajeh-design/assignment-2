# Assignment 2 - Node.js Core Modules, HTTP CRUD & Bonus 🚀

حل كامل وشامل للتكليف الثاني (Assignment 2) الخاص بكورس Node.js من أكاديمية Route.

---

## 📁 محتويات المشروع (Project Structure)

| الملف | الوصف |
| :--- | :--- |
| **`part1.js`** | يحتوي على حلول الـ 20 سؤال الخاصة بـ **Node.js Core Modules** (Path, FS, OS, Events, Streams, Zlib). |
| **`server.js`** | سيرفر مبني بـ Node.js HTTP Module والـ `fs` Module لتنفيذ عمليات الـ CRUD بدون تخزين في الذاكرة. |
| **`users.json`** | ملف الـ JSON الذي يتم القراءة منه والكتابة عليه مباشرة لجميع بيانات المستخدمين. |
| **`bonus.js`** | حل مسألة LeetCode رقم 1539 (`kth-missing-positive-number`) باستخدام خوارزمية Binary Search المثالية. |
| **`Assignment2.postman_collection.json`** | كولكشن بوستمان جاهز للاستيراد بضغطة واحدة، بأسماء endpoints واضحة ودقيقة. |
| **`test-server.js`** | اسكريبت لاختبار جميع مسارات الـ API تلقائياً والتأكد من مطابقتها لمخرجات التكليف. |
| **`package.json`** | تعريف أوامر التشغيل والاختبار. |

---

## ⚙️ متطلبات التشغيل (Prerequisites)

- **Node.js** (إصدار 18 أو أحدث)
- **VS Code** (محرر الأكواد)
- **Postman** (لاختبار الـ APIs)
- **Git** (لرفع الكود على GitHub)

---

## 🚀 طريقة التشغيل عبر VS Code Terminal

افتح مجلد المشروع في **VS Code** وافتح الـ Terminal (`Ctrl + ~`):

### 1. تشغيل واختبار الجزء الأول (Part 1 - Core Modules):
```bash
npm run part1
```
أو:
```bash
node part1.js
```

### 2. تشغيل سيرفر الـ CRUD (Part 2 - HTTP Server):
```bash
npm start
```
أو:
```bash
node server.js
```
> السيرفر سيعمل على: `http://localhost:3000`

### 3. اختبار السيرفر تلقائياً:
```bash
npm test
```

### 4. تشغيل مسألة البونص (Part 3 - Bonus):
```bash
npm run bonus
```
أو:
```bash
node bonus.js
```

---

## 📬 ربط واختبار Postman (Postman Setup)

تم تجهيز ملف `Assignment2.postman_collection.json` كاملاً وفقاً للتعليمات:
1. افتح برنامج **Postman**.
2. اضغط على زر **Import** في أعلى اليسار.
3. اختر ملف **`Assignment2.postman_collection.json`** من داخل مجلد المشروع.
4. ستظهر لك كولكشن باسم **Assignment2 - Node.js CRUD API** تحتوي على الـ Endpoints التالية:
   - **`Add User`**: `POST http://localhost:3000/user`
   - **`Add User - Duplicate Email Check`**: `POST http://localhost:3000/user`
   - **`Get All Users`**: `GET http://localhost:3000/user`
   - **`Get User by ID`**: `GET http://localhost:3000/user/1`
   - **`Get User by ID - Not Found`**: `GET http://localhost:3000/user/99`
   - **`Update User Age`**: `PATCH http://localhost:3000/user/1`
   - **`Update User - Not Found`**: `PATCH http://localhost:3000/user/99`
   - **`Delete User by ID`**: `DELETE http://localhost:3000/user/1`
   - **`Delete User - Not Found`**: `DELETE http://localhost:3000/user/99`
5. شغّل السيرفر أولاً بـ `npm start` ثم قم بإرسال الطلبات (Send).

> **ملاحظة لتسليم التكليف**: للحصول على لينك الـ Postman Collection أونلاين:
> في Postman اضغط على الثلاث نقاط بجانب الكولكشن `...` -> ثم اختر **Share** -> ثم **Via API / Public Link** وانسخ اللينك.

---

## 🐙 خطوات رفع المشروع على GitHub (Git & GitHub)

افتح الـ Terminal في VS Code ونفّذ الأوامر التالية بالترتيب:

```bash
# 1. تهيئة مستودع Git محلي
git init

# 2. إضافة جميع الملفات
git add .

# 3. عمل أول Commit
git commit -m "feat: complete assignment 2 core modules, http crud, and bonus"

# 4. تسمية الفرع الرئيسي main
git branch -M main

# 5. ربط المستودع برابط الـ Repo الخاص بك على GitHub (استبدل الرابط برابط مستودعك)
git remote add origin https://github.com/<YOUR_USERNAME>/<YOUR_REPO_NAME>.git

# 6. رفع الملفات إلى GitHub
git push -u origin main
```
