const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const USERS_FILE = path.join(__dirname, 'users.json');

// Ensure users.json exists
if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, JSON.stringify([], null, 2), 'utf8');
}

// Helper: Read users safely from JSON file using fs
function readUsersFromFile() {
  try {
    if (!fs.existsSync(USERS_FILE)) {
      fs.writeFileSync(USERS_FILE, JSON.stringify([], null, 2), 'utf8');
      return [];
    }
    const data = fs.readFileSync(USERS_FILE, 'utf8').trim();
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error("Error reading users file:", err.message);
    return [];
  }
}

// Helper: Write users to JSON file using fs
function writeUsersToFile(users) {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf8');
  } catch (err) {
    console.error("Error writing users file:", err.message);
    throw err;
  }
}

// Helper: Parse incoming request body safely
function parseRequestBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const parsed = body ? JSON.parse(body) : {};
        resolve(parsed);
      } catch (err) {
        resolve({});
      }
    });
    req.on('error', () => resolve({}));
  });
}

// Helper: Send JSON response
function sendJSON(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(data));
}

// Create HTTP server
const server = http.createServer(async (req, res) => {
  const { method } = req;
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname.replace(/\/+$/, '') || '/';

  // Handle CORS preflight
  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    return res.end();
  }

  // 1) POST /user - Add new user
  if (method === 'POST' && (pathname === '/user' || pathname === '/users')) {
    const body = await parseRequestBody(req);
    const { name, age, email } = body;

    if (!name || age === undefined || !email) {
      return sendJSON(res, 200, { message: "Name, age, and email are required." });
    }

    const users = readUsersFromFile();

    // Check if email already exists
    const emailExists = users.some(
      (u) => u.email && u.email.toLowerCase() === String(email).toLowerCase()
    );
    if (emailExists) {
      return sendJSON(res, 200, { message: "Email already exists." });
    }

    // Auto-increment ID
    const nextId = users.length > 0 ? Math.max(...users.map((u) => Number(u.id) || 0)) + 1 : 1;
    const newUser = {
      id: nextId,
      name,
      age: Number(age),
      email
    };

    users.push(newUser);
    writeUsersToFile(users);

    return sendJSON(res, 201, { message: "User added successfully." });
  }

  // 4) GET /user - Get all users
  if (method === 'GET' && (pathname === '/user' || pathname === '/users')) {
    const users = readUsersFromFile();
    return sendJSON(res, 200, users);
  }

  // Routes matching /user/:id or /users/:id
  const userByIdMatch = pathname.match(/^\/(?:user|users)\/([^/]+)$/);
  if (userByIdMatch) {
    const idParam = userByIdMatch[1];
    const users = readUsersFromFile();
    const userIndex = users.findIndex((u) => String(u.id) === String(idParam));

    // 5) GET /user/:id - Get user by ID
    if (method === 'GET') {
      if (userIndex === -1) {
        return sendJSON(res, 200, { message: "User not found." });
      }
      return sendJSON(res, 200, users[userIndex]);
    }

    // 2) PATCH /user/:id - Update user's name, age, or email by ID
    if (method === 'PATCH') {
      if (userIndex === -1) {
        return sendJSON(res, 200, { message: "User ID not found." });
      }

      const body = await parseRequestBody(req);
      const user = users[userIndex];
      const updatedFields = [];

      if (body.name !== undefined) {
        user.name = body.name;
        updatedFields.push("name");
      }
      if (body.age !== undefined) {
        user.age = Number(body.age);
        updatedFields.push("age");
      }
      if (body.email !== undefined) {
        const emailTaken = users.some(
          (u) => u.id !== user.id && u.email && u.email.toLowerCase() === String(body.email).toLowerCase()
        );
        if (emailTaken) {
          return sendJSON(res, 200, { message: "Email already exists." });
        }
        user.email = body.email;
        updatedFields.push("email");
      }

      writeUsersToFile(users);

      let responseMsg = "User updated successfully.";
      if (updatedFields.length === 1) {
        responseMsg = `User ${updatedFields[0]} updated successfully.`;
      }

      return sendJSON(res, 200, { message: responseMsg });
    }

    // 3) DELETE /user/:id - Delete user by ID
    if (method === 'DELETE') {
      if (userIndex === -1) {
        return sendJSON(res, 200, { message: "User ID not found." });
      }

      users.splice(userIndex, 1);
      writeUsersToFile(users);

      return sendJSON(res, 200, { message: "User deleted successfully." });
    }
  }

  // Not found fallback
  return sendJSON(res, 404, { message: "Route not found" });
});

function startServer(port = PORT) {
  if (!server.listening) {
    server.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  }
  return server;
}

if (require.main === module) {
  startServer();
}

module.exports = server;
module.exports.startServer = startServer;
