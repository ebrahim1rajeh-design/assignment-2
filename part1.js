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
  console.log(result);
  return result;
}

// 2. Write a function that takes a file path and returns its file name. (0.5 Grade)
// Input Example: /user/files/report.pdf -> Output Example: "report.pdf"
function getFileName(filePath) {
  const fileName = path.basename(filePath);
  console.log(`"${fileName}"`);
  return fileName;
}

// 3. Write a function that builds a path from an object (0.5 Grade)
// Input Example: { dir: "/folder", name: "app", ext: ".js"} -> Output Example: "/folder/app.js"
function buildPathFromObject(pathObj) {
  const builtPath = (path.posix && pathObj.dir && pathObj.dir.startsWith('/'))
    ? path.posix.format(pathObj)
    : path.format(pathObj).replace(/\\/g, '/');
  console.log(`"${builtPath}"`);
  return builtPath;
}

// 4. Write a function that returns the file extension from a given file path. (0.5 Grade)
// Input Example: /docs/readme.md -> Output Example: ".md"
function getFileExtension(filePath) {
  const ext = path.extname(filePath);
  console.log(`"${ext}"`);
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
  console.log(result);
  return result;
}

// 6. Write a function that checks whether a given path is absolute. (0.5 Grade)
// Input Example: /home/user/file.txt -> Output Example: true
function isPathAbsolute(filePath) {
  const isAbs = path.isAbsolute(filePath);
  console.log(isAbs);
  return isAbs;
}

// 7. Write a function that joins multiple segments (0.5 Grade)
// Input: "src", "components", "App.js" -> Output Example: src/components/App.js
function joinSegments(...segments) {
  const joined = path.join(...segments).replace(/\\/g, '/');
  console.log(joined);
  return joined;
}

// 8. Write a function that resolves a relative path to an absolute one. (0.5 Grade)
// Input Example: ./index.js -> Output Example: /home/user/project/src/index.js
function resolveRelativePath(relPath) {
  const resolved = path.resolve(relPath);
  console.log(resolved);
  return resolved;
}

// 9. Write a function that joins two paths. (0.5 Grade)
// Input Example: /folder1, folder2/file.txt -> Output Example: /folder1/folder2/file.txt
function joinTwoPaths(p1, p2) {
  const joined = path.join(p1, p2).replace(/\\/g, '/');
  console.log(joined);
  return joined;
}

// 10. Write a function that deletes a file asynchronously. (0.5 Grade)
// Input Example: /path/to/file.txt -> Output Example: The file.txt is deleted.
function deleteFileAsync(filePath, callback) {
  fs.unlink(filePath, (err) => {
    if (err) {
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
    console.log("Success");
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
  console.log(exists);
  return exists;
}

// 17. Write a function that returns the OS platform and CPU architecture. (0.5 Grade)
// Output Example: {Platform: “win32”, Arch: “x64”}
function getOSPlatformAndArch() {
  const result = {
    Platform: os.platform(),
    Arch: os.arch()
  };
  console.log(result);
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
      console.log(`[Chunk ${chunkCount}]: ${chunk.trim()}`);
    });

    readable.on('end', () => {
      resolve();
    });

    readable.on('error', reject);
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
        reject(err);
      } else {
        console.log(`File compressed successfully using pipeline`);
        resolve();
      }
    });
  });
}

// ==========================================
// Runner to demonstrate and test all 20 questions
// ==========================================
async function runDemo() {
  console.log("========== Testing Part 1: Node.js Core Modules ==========\n");

  console.log("1. Current file path and directory:");
  logCurrentFileAndDir();

  console.log("\n2. File name from path:");
  getFileName("/user/files/report.pdf");

  console.log("\n3. Build path from object:");
  buildPathFromObject({ dir: "/folder", name: "app", ext: ".js" });

  console.log("\n4. File extension from path:");
  getFileExtension("/docs/readme.md");

  console.log("\n5. Parse path into name and ext:");
  parsePathNameAndExt("/home/app/main.js");

  console.log("\n6. Check if path is absolute:");
  isPathAbsolute("/home/user/file.txt");

  console.log("\n7. Join multiple segments:");
  joinSegments("src", "components", "App.js");

  console.log("\n8. Resolve relative path to absolute:");
  resolveRelativePath("./index.js");

  console.log("\n9. Join two paths:");
  joinTwoPaths("/folder1", "folder2/file.txt");

  // Temporary folder for clean file tests
  const testDir = path.join(os.tmpdir(), "route-assignment2-tests");
  if (!fs.existsSync(testDir)) fs.mkdirSync(testDir, { recursive: true });

  console.log("\n10. Delete file asynchronously:");
  const testFile10 = path.join(testDir, "file.txt");
  fs.writeFileSync(testFile10, "delete me");
  await new Promise((res) => deleteFileAsync(testFile10, res));

  console.log("\n11. Create folder synchronously:");
  const testFolder11 = path.join(testDir, "new-folder");
  createFolderSync(testFolder11);

  console.log("\n12. Start event listener:");
  const startEmitter = setupStartListener();
  startEmitter.emit('start');

  console.log("\n13. Custom login event:");
  setupAndEmitLogin("Ahmed");

  console.log("\n14. Read file synchronously:");
  const testNotes14 = path.join(testDir, "notes.txt");
  fs.writeFileSync(testNotes14, "This is a note.");
  readFileContentSync(testNotes14);

  console.log("\n15. Write asynchronously to file:");
  const testAsync15 = path.join(testDir, "async.txt");
  await new Promise((res) => writeFileAsync(testAsync15, "Async save", res));

  console.log("\n16. Check if path exists:");
  checkPathExists(testNotes14);

  console.log("\n17. OS platform and CPU architecture:");
  getOSPlatformAndArch();

  console.log("\n18. Readable stream in chunks:");
  const testBig18 = path.join(testDir, "big.txt");
  fs.writeFileSync(testBig18, "Node.js core modules streams demonstration in chunks. ".repeat(6));
  await readFileInChunks(testBig18);

  console.log("\n19. Copy content using streams:");
  const testSrc19 = path.join(testDir, "source.txt");
  const testDest19 = path.join(testDir, "dest.txt");
  fs.writeFileSync(testSrc19, "File content copied via stream.");
  await copyFileUsingStreams(testSrc19, testDest19);

  console.log("\n20. Compress file using pipeline:");
  const testData20 = path.join(testDir, "data.txt");
  const testGz20 = path.join(testDir, "data.txt.gz");
  fs.writeFileSync(testData20, "Data to compress using zlib pipeline.");
  await compressFilePipeline(testData20, testGz20);

  // Clean up temporary test files cleanly
  fs.rmSync(testDir, { recursive: true, force: true });

  console.log("\n==================== Completed Part 1 ====================");
}

if (require.main === module) {
  runDemo();
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
