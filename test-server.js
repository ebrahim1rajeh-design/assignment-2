const http = require('http');
const server = require('./server');

function makeRequest(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });

    req.on('error', (err) => reject(err));

    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

async function runTests() {
  server.listen(3000, async () => {
    console.log("=== Testing Server CRUD Endpoints ===");

    try {
      // 1. POST /user
      const postRes = await makeRequest('POST', '/user', {
        name: "User 1",
        age: 27,
        email: "user@email.com"
      });
      console.log("1) POST /user (New):", postRes);

      // 2. POST /user duplicate email
      const dupRes = await makeRequest('POST', '/user', {
        name: "User 2",
        age: 30,
        email: "user@email.com"
      });
      console.log("2) POST /user (Duplicate Email):", dupRes);

      // 3. GET /user
      const getAllRes = await makeRequest('GET', '/user');
      console.log("3) GET /user:", getAllRes);

      // 4. GET /user/1
      const getOneRes = await makeRequest('GET', '/user/1');
      console.log("4) GET /user/1:", getOneRes);

      // 5. GET /user/99
      const get404Res = await makeRequest('GET', '/user/99');
      console.log("5) GET /user/99 (Not Found):", get404Res);

      // 6. PATCH /user/1
      const patchRes = await makeRequest('PATCH', '/user/1', { age: 30 });
      console.log("6) PATCH /user/1:", patchRes);

      // 7. PATCH /user/99
      const patch404Res = await makeRequest('PATCH', '/user/99', { age: 30 });
      console.log("7) PATCH /user/99 (Not Found):", patch404Res);

      // 8. DELETE /user/1
      const deleteRes = await makeRequest('DELETE', '/user/1');
      console.log("8) DELETE /user/1:", deleteRes);

      // 9. DELETE /user/99
      const delete404Res = await makeRequest('DELETE', '/user/99');
      console.log("9) DELETE /user/99 (Not Found):", delete404Res);

    } catch (err) {
      console.error("Test failed:", err);
    } finally {
      server.close(() => {
        console.log("=== All Tests Completed ===");
        process.exit(0);
      });
    }
  });
}

runTests();
