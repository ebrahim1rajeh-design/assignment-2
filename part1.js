const path = require('path');
const fs = require('fs');
const os = require('os');
const EventEmitter = require('events');
const zlib = require('zlib');
const { pipeline } = require('stream');

// ==========================================
// Part 1: Node.js Core Modules (10 Grades)
// ==========================================

// 1. Write a function that logs the current file path and directory. (0.5 Grade)
// Output Example: {File: "/home/user/project/index.js", Dir: "/home/user/project"}
function logCurrentFileAndDir() {
  const result = {
    File: __filename,
    Dir: __dirname
  };
  console.log("Q1 Result:", result);
  return result;
}

// 2. Write a function that takes a file path and returns its file name. (0.5 Grade)
// Input Example: /user/files/report.pdf -> Output Example: "report.pdf"
function getFileName(filePath) {
  const fileName = path.basename(filePath);
  console.log(`Q2 Result for '${filePath}':`, fileName);
  return fileName;
}

// 3. Write a function that builds a path from an object (0.5 Grade)
// Input Example: { dir: "/folder", name: "app", ext: ".js"} -> Output Example: "/folder/app.js"
function buildPathFromObject(pathObj) {
  // Using path.format and normalizing slashes for cross-platform consistency
  const builtPath = (path.posix && pathObj.dir && pathObj.dir.startsWith('/')) 
    ? path.posix.format(pathObj)
    : path.format(pathObj).replace(/\\/g, '/');
  console.log("Q3 Result:", builtPath);
  return builtPath;
}

// 4. Write a function that returns the file extension from a given file path. (0.5 Grade)
// Input Example: /docs/readme.md -> Output Example: ".md"
function getFileExtension(filePath) {
  const ext = path.extname(filePath);
  console.log(`Q4 Result for '${filePath}':`, ext);
  return ext;
}

// 5. Write a function that parses a given path and returns its name and ext. (0.5 Grade)
// Input Example: /home/app/main.js -> Output Example: {Name: "main", Ext: ".js"}
function parsePathNameAndExt(filePath) {
  const parsed = path.parse(filePath);
  const result = {
    Name: parsed.name,
    Ext: parsed.ext
  };
  console.log(`Q5 Result for '${filePath}':`, result);
  return result;
}

// 6. Write a function that checks whether a given path is absolute. (0.5 Grade)
// Input Example: /home/user/file.txt -> Output Example: true
function isPathAbsolute(filePath) {
  const isAbs = path.isAbsolute(filePath);
  console.log(`Q6 Result for '${filePath}':`, isAbs);
  return isAbs;
}

// 7. Write a function that joins multiple segments (0.5 Grade)
// Input: "src", "components", "App.js" -> Output Example: src/components/App.js
function joinSegments(...segments) {
  // Normalize forward slashes for cross-platform consistency
  const joined = path.join(...segments).replace(/\\/g, '/');
  console.log("Q7 Result:", joined);
  return joined;
}

// 8. Write a function that resolves a relative path to an absolute one. (0.5 Grade)
// Input Example: ./index.js -> Output Example: /home/user/project/src/index.js
function resolveRelativePath(relPath) {
  const resolved = path.resolve(relPath);
  console.log(`Q8 Result for '${relPath}':`, resolved);
  return resolved;
}

// 9. Write a function that joins two paths. (0.5 Grade)
// Input Example: /folder1, folder2/file.txt -> Output Example: /folder1/folder2/file.txt
function joinTwoPaths(p1, p2) {
  const joined = path.join(p1, p2).replace(/\\/g, '/');
  console.log(`Q9 Result:`, joined);
  return joined;
}

// 10. Write a function that deletes a file asynchronously. (0.5 Grade)
// Input Example: /path/to/file.txt -> Output Example: The file.txt is deleted.
function deleteFileAsync(filePath, callback) {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(`Error deleting file: ${err.message}`);
      if (callback) callback(err);
      return;
    }
    const fileName = path.basename(filePath);
    console.log(`The ${fileName} is deleted.`);
    if (callback) callback(null);
  });
}

// 11. Write a function that creates a folder synchronously. (0.5 Grade)
// Output Example: "Success"
function createFolderSync(folderPath) {
  try {
    fs.mkdirSync(folderPath, { recursive: true });
    console.log("Q11 Result: Success");
    return "Success";
  } catch (err) {
    console.error("Error creating folder:", err.message);
    throw err;
  }
}

// 12. Create an event emitter that listens for a "start" event and logs a welcome message. (0.5 Grade)
// Output Example: Welcome event triggered!
function setupStartListener() {
  const emitter = new EventEmitter();
  emitter.on('start', () => {
    console.log("Welcome event triggered!");
  });
  return emitter;
}

// 13. Emit a custom "login" event with a username parameter. (0.5 Grade)
// Input Example: "Ahmed" -> Output Example: “User logged in: Ahmed”
function setupAndEmitLogin(username) {
  const emitter = new EventEmitter();
  emitter.on('login', (user) => {
    console.log(`User logged in: ${user}`);
  });
  emitter.emit('login', username);
  return emitter;
}

// 14. Read a file synchronously and log its contents. (0.5 Grade)
// Input Example: "./notes.txt" -> Output Example: the file content => “This is a note.”
function readFileContentSync(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    console.log(`the file content => “${content}”`);
    return content;
  } catch (err) {
    console.error("Error reading file:", err.message);
    throw err;
  }
}

// 15. Write asynchronously to a file. (0.5 Grade)
// Input: path: "./async.txt", content: "Async save"
function writeFileAsync(filePath, content, callback) {
  fs.writeFile(filePath, content, 'utf8', (err) => {
    if (err) {
      console.error("Error writing to file:", err.message);
      if (callback) callback(err);
      return;
    }
    console.log(`File saved asynchronously at ${filePath}`);
    if (callback) callback(null);
  });
}

// 16. Check if a directory exists. (0.5 Grade)
// Input Example: "./notes.txt" -> Output Example: true
function checkPathExists(checkPath) {
  const exists = fs.existsSync(checkPath);
  console.log(`Q16 Result for '${checkPath}':`, exists);
  return exists;
}

// 17. Write a function that returns the OS platform and CPU architecture. (0.5 Grade)
// Output Example: {Platform: “win32”, Arch: “x64”}
function getOSPlatformAndArch() {
  const result = {
    Platform: os.platform(),
    Arch: os.arch()
  };
  console.log("Q17 Result:", result);
  return result;
}

// 18. Use a readable stream to read a file in chunks and log each chunk. (0.5 Grade)
// Input Example: "./big.txt" -> Output Example: log each chunk
function readFileInChunks(filePath) {
  return new Promise((resolve, reject) => {
    const readable = fs.createReadStream(filePath, { highWaterMark: 64, encoding: 'utf8' });
    let chunkCount = 0;

    readable.on('data', (chunk) => {
      chunkCount++;
      console.log(`[Chunk ${chunkCount}]:`, chunk);
    });

    readable.on('end', () => {
      console.log(`Finished reading file in ${chunkCount} chunks.`);
      resolve();
    });

    readable.on('error', (err) => {
      console.error("Stream read error:", err);
      reject(err);
    });
  });
}

// 19. Use readable and writable streams to copy content from one file to another. (0.5 Grade)
// Input Example: "./source.txt", "./dest.txt" -> Output Example: File copied using streams
function copyFileUsingStreams(srcPath, destPath) {
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(srcPath);
    const writeStream = fs.createWriteStream(destPath);

    readStream.pipe(writeStream);

    writeStream.on('finish', () => {
      console.log("File copied using streams");
      resolve("File copied using streams");
    });

    readStream.on('error', reject);
    writeStream.on('error', reject);
  });
}

// 20. Create a pipeline that reads a file, compresses it, and writes it to another file. (0.5 Grade)
// Input Example: "./data.txt", "./data.txt.gz"
function compressFilePipeline(srcPath, destPath) {
  return new Promise((resolve, reject) => {
    const gzip = zlib.createGzip();
    const source = fs.createReadStream(srcPath);
    const destination = fs.createWriteStream(destPath);

    pipeline(source, gzip, destination, (err) => {
      if (err) {
        console.error("Pipeline failed:", err);
        reject(err);
      } else {
        console.log(`Pipeline succeeded: ${srcPath} compressed into ${destPath}`);
        resolve();
      }
    });
  });
}

// ==========================================
// Demo / Runner for testing all 20 functions
// ==========================================
async function runAll() {
  console.log("================== RUNNING PART 1 ==================");

  // 1
  logCurrentFileAndDir();

  // 2
  getFileName("/user/files/report.pdf");

  // 3
  buildPathFromObject({ dir: "/folder", name: "app", ext: ".js" });

  // 4
  getFileExtension("/docs/readme.md");

  // 5
  parsePathNameAndExt("/home/app/main.js");

  // 6
  isPathAbsolute("/home/user/file.txt");

  // 7
  joinSegments("src", "components", "App.js");

  // 8
  resolveRelativePath("./index.js");

  // 9
  joinTwoPaths("/folder1", "folder2/file.txt");

  // 10
  const tempToDelete = path.join(__dirname, "temp-to-delete.txt");
  fs.writeFileSync(tempToDelete, "temporary content");
  deleteFileAsync(tempToDelete);

  // 11
  createFolderSync(path.join(__dirname, "temp-folder"));

  // 12
  const startEmitter = setupStartListener();
  startEmitter.emit('start');

  // 13
  setupAndEmitLogin("Ahmed");

  // 14
  const notesPath = path.join(__dirname, "notes.txt");
  fs.writeFileSync(notesPath, "This is a note.");
  readFileContentSync(notesPath);

  // 15
  await new Promise((res) => {
    writeFileAsync(path.join(__dirname, "async.txt"), "Async save", res);
  });

  // 16
  checkPathExists(notesPath);

  // 17
  getOSPlatformAndArch();

  // 18
  const bigPath = path.join(__dirname, "big.txt");
  fs.writeFileSync(bigPath, "Node.js is a powerful JavaScript runtime built on Chrome's V8 engine. ".repeat(10));
  await readFileInChunks(bigPath);

  // 19
  const sourcePath = path.join(__dirname, "source.txt");
  const destPath = path.join(__dirname, "dest.txt");
  fs.writeFileSync(sourcePath, "Content to copy using streams.");
  await copyFileUsingStreams(sourcePath, destPath);

  // 20
  const dataPath = path.join(__dirname, "data.txt");
  const gzPath = path.join(__dirname, "data.txt.gz");
  fs.writeFileSync(dataPath, "Hello World from data compression pipeline!");
  await compressFilePipeline(dataPath, gzPath);

  console.log("================== PART 1 FINISHED ==================");
}

if (require.main === module) {
  runAll();
}

module.exports = {
  logCurrentFileAndDir,
  getFileName,
  buildPathFromObject,
  getFileExtension,
  parsePathNameAndExt,
  isPathAbsolute,
  joinSegments,
  resolveRelativePath,
  joinTwoPaths,
  deleteFileAsync,
  createFolderSync,
  setupStartListener,
  setupAndEmitLogin,
  readFileContentSync,
  writeFileAsync,
  checkPathExists,
  getOSPlatformAndArch,
  readFileInChunks,
  copyFileUsingStreams,
  compressFilePipeline
};
