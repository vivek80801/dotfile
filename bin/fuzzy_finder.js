//@ts-check

const { execSync } = require("child_process");
const currentDirectory = execSync("pwd").toString();
const { createInterface } = require("readline");

const fileTree = [];

/**
 * @param {string} directory
 * @returns {string}
 */
function tree(directory) {
  const dirToShow = [];
  const dirArray = directory.split("/");
  for (let i = 0; i < directory.length; i++) {
    if (directory[i] === "/" && directory[i + 1] === "/") {
      return directory;
    }
  }
  for (let i = 3; i < dirArray.length; i++) {
    dirToShow.push(dirArray[i]);
    if (dirArray.length - 1 !== i) {
      dirToShow.push("/");
    }
  }
  fileTree.push(dirToShow.join(""));
  //console.log("file: " + dirToShow.join(""));
  if (
    execSync("ls " + directory)
      .toString()
      .slice(0, execSync("ls " + directory).toString().length - 1) ===
      directory ||
    execSync("ls " + directory).toString() === "" ||
    execSync("ls " + directory).toString() ===
      "ls: cannot access '" + directory + "': Not a directory"
  ) {
    return directory;
  }
  const directories = execSync("ls " + directory)
    .toString()
    .split("\n");
  for (let i = 0; i < directories.length; i++) {
    const newDir = directory.split("\n")[0];
    tree(newDir + "/" + directories[i]);
  }
}

const repl = () => {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: ">> ",
  });
  rl.prompt();
  rl.on("line", (input) => {
    if (input === "quit" || input === "exit") {
      rl.close();
      process.exit();
    } else if (input === "clear") {
      console.clear();
    } else {
      console.clear();
      find(input);
    }
    rl.prompt();
  });
};

/**
 * @param {string} fileName
 * @returns {void}
 */
const find = (fileName) => {
  //console.log("fileName: " + fileName)
  //console.log("fileTree: " + fileTree.join("\n"))
  const searchedFiles = [];
  for (let i = 0; i < fileTree.length; i++) {
    let isMatched = false;
    for (let k = 0; k < fileTree[i].length; k++) {
      if (fileTree[i][k] === fileName[0]) {
        for (let l = 0; l < fileName.length; l++) {
          if (fileTree[i][k + l] === fileName[l]) {
            isMatched = true;
          } else {
            isMatched = false;
          }
        }
      }
    }
    if (isMatched) {
      const searchedFile = fileTree[i].split("/");
      searchedFiles.push(searchedFile[searchedFile.length - 1]);
    }
  }
  if (searchedFiles.length > 0) {
    for (let i = 0; i < searchedFiles.length; i++) {
      console.log(searchedFiles[i]);
    }
  } else {
    console.log("Can not find the file");
  }
};

tree(currentDirectory);
repl();
