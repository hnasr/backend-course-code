const fs = require("fs");

console.log("1");
const res = fs.readFileSync("test.txt");
console.log("file:" + res);
console.log("2");

