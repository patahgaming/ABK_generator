const dataBingkar = require("./subagBingkar.js").dataBingkar;
const pick5RandomNumbers = require("./picknum.js").pick5RandomNumbers;
function generateGiat(data, randomNumbers) {
console.log("data:", data);
console.log("Random Numbers:", randomNumbers);
}
generateGiat(dataBingkar, pick5RandomNumbers(1, 7));
module.exports = { generateGiat };