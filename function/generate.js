const dataBingkar = require("./subagBingkar.js").dataBingkar;
const dataDalpres = require("./subagDalpres.js").dataDalpres;
function pick5RandomNumbers(min = 1, max = 7, dataLength = 5) {
  const numbers = [];
  while (numbers.length < dataLength) {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    if (randomNumber > min-1 && randomNumber < max + 1) { // Ensure the number is between 1 and 7
      if (!numbers.includes(randomNumber)) {
        numbers.push(randomNumber);
      }
    }
  }
  return numbers;
}
function todayInName(dateParam = null) {
  const date = new Date(dateParam ?? Date.now());
  const options = { weekday: 'long' };
  return date.toLocaleDateString('id-ID', options);
}

function generateGiat(data, randomNumbers,dateParam, jenis =null) {
    const result = [];
    result.push(["Tanggal","Kategori", "Uraian", "Jumlah Giat", "Jumlah Waktu (per jam)", "Keterangan"]);
    const randomNumbersSeed = randomNumbers; // Keep the original random numbers for logging
    console.log("Random Numbers Seed:", randomNumbersSeed);
    const today = todayInName(dateParam);
    while (randomNumbers.length > 0) {
        result.push(data[randomNumbers[0]]);
        randomNumbers.shift(); // Remove the used number
    }
    result[1] = data[0]; // Set the first row to the first data entry
    if (jenis === "bingkar") {
        if (today === "Jumat") {
            result[2] = data[1]; // Set the second row to the second data entry
        }
    }
    return result;
}

console.log(todayInName("2025-06-27")); // Example usage of todayInName function
// console.log(generateGiat(dataDalpres, pick5RandomNumbers(1, 7)));
// console.log(generateGiat(dataBingkar, pick5RandomNumbers(2, 7), "bingkar"));
// console.log(pick5RandomNumbers(1, 7));
module.exports = { generateGiat };
