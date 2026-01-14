//@ts-check
const { readFile } = require("fs");
const { createInterface } = require("readline");

/**
 * @param {string} sourceCode
 * @param {number} key
 * @returns {string}
 */
const dcrpt = (sourceCode, key = 4) => {
  let output = "";
  let alphas =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.-+=/'\\;:<>!@#$%^&*()[]{},?|\"`~\n\t ";
  for (let i = 0; i < key; i++) {
    alphas += i;
  }
  for (let i = 0; i < sourceCode.length; i++) {
    for (let k = 0; k < alphas.length; k++) {
      if (sourceCode[i] === alphas[k]) {
        output += alphas[k - key];
      } else {
        if (sourceCode[i] === "_") {
          if (sourceCode[i + 1] === alphas[k]) {
            i += 1;
            output += alphas[alphas.length - key + k];
            break;
          }
        }
      }
    }
  }
  return output;
};

/**
 * @param {string} sourceCode
 * @param {number} key
 * @returns {string}
 */
const encrpt = (sourceCode, key = 4) => {
  let output = "";
  let alphas =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.-+=/'\\;:<>!@#$%^&*()[]{},?|\"`~\n\t ";
  for (let i = 0; i < key; i++) {
    alphas += i;
  }
  for (let i = 0; i < sourceCode.length; i++) {
    for (let k = 0; k < alphas.length; k++) {
      if (sourceCode[i] === alphas[k]) {
        if (k + key < alphas.length) {
          output += alphas[k + key];
        } else {
          output += "_";
          output += alphas[k + key - alphas.length];
        }
      }
    }
  }
  return output;
};

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
      console.log(
        "Input: %s\nencrpted: %s\ndcrpted: %s\n",
        input,
        encrpt(input, 10),
        dcrpt(encrpt(input, 10), 10)
      );
    }
    rl.prompt();
  });
};

const main = () => {
  if (process.argv.length > 2) {
    const options = ["--key"];
    const files = [];
    const userOptions = [];
    let key = 10;
    for (let i = 2; i < process.argv.length; i++) {
      let matched = false;
      for (let k = 0; k < options.length; k++) {
        if (process.argv[i] === options[k]) {
          matched = true;
        }
      }
      if (matched) {
        const userOptionsKey = process.argv[i];
        const userOptionsValue = process.argv[i + 1];
        userOptions.push({ [userOptionsKey]: userOptionsValue });
        i += 1;
      } else {
        files.push(process.argv[i]);
      }
    }
    for (let i = 0; i < userOptions.length; i++) {
      if (userOptions[i]["--key"]) {
        key = parseInt(userOptions[i]["--key"]);
        if (key > 10) {
          console.log("key must be less than 11");
          return;
        }
      }
    }
    console.log("key: ", key);
    for (let i = 0; i < files.length; i++) {
      readFile(files[i], { encoding: "utf8" }, (err, data) => {
        if (err) {
          console.log("\x1b[1;31mError\x1b[0m: File does not exits");
          return;
        } else {
          console.log("\x1b[1;34mFile\x1b[0m: ", files[i], "\n");
          console.log("Encrpted:");
          console.log(encrpt(data, key));
          console.log("\n");
          console.log("Decrpted:");
          console.log(dcrpt(encrpt(data, key), key));
        }
      });
    }
  } else {
    repl();
  }
};

main();
