const XLSX = require("xlsx");
const path = require("path");
const fs = require("fs");
const dataBingkar = require("./subagBingkar.js").dataBingkar;
const dataDalpres = require("./subagDalpres.js").dataDalpres;
/**
 * Generates an array of unique random integers within a specified range.
 *
 * @param {number} [min=1] - The minimum integer value (inclusive).
 * @param {number} [max=7] - The maximum integer value (inclusive).
 * @param {number} [dataLength=5] - The number of unique random integers to generate.
 * @returns {number[]} An array containing unique random integers between min and max.
 */
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
/**
 * Returns the day of the week in Indonesian for a given date.
 *
 * @param {string | number | Date} [dateParam] - The date to get the day of the week for.
 * If not specified, the current date is used.
 * @returns {string} The day of the week in Indonesian.
 */
function todayInName(dateParam = null) {
  const date = new Date(dateParam ?? Date.now());
  const options = { weekday: 'long' };
  return date.toLocaleDateString('id-ID', options);
}

/**
 * Generates a report based on given data and random numbers.
 *
 * @param {any[][]} data - The data to use for generating the report.
 * @param {number[]} randomNumbers - The array of unique random numbers to use for selecting data.
 * @param {string | number | Date} [dateParam] - The date parameter to use for logging.
 * @param {string} [jenis] - The type of report to generate (not used currently).
 * @returns {any[][]} The generated report.
 */
function generateGiat(data, randomNumbers, jenis =null) {
    const result = [];
    result.push(["Tanggal","Kategori", "Uraian", "Jumlah Giat", "Jumlah Waktu (per jam)", "Keterangan"]);
    const randomNumbersSeed = randomNumbers; // Keep the original random numbers for logging
    // Log the original random numbers for debugging or verification purposes
    console.log("Random Numbers Seed:", randomNumbersSeed);
    const today = todayInName(data[1][0]);
    while (randomNumbers.length > 0) {
        // result.push(today);
        result.push(data[randomNumbers[0]]);
        randomNumbers.shift(); // Remove the used number
        
    }
    if (data && data[0]) {
        result[1] = data[0]; // Set the first row to the first data entry
    }
    //         if (data.length > 1) {
    //             result[2] = data[1]; // Set the second row to the second data entry
    //         }
        if (today === "Jumat" && jenis === "Subag Bingkar") {
          result[2] = data[1]; // Set the second row to the second data entry
        }
        return result;
    }

/**
 * Generates an Excel file based on the given data and downloads it.
 *
 * @param {string | number | Date} dateParam - The date parameter to use for the file name.
 * @param {any[][]} data - The data to use for generating the Excel file.
 * @param {string} [jenis] - The type of report to generate (used as the file name prefix).
 * @returns {undefined}
 */
function generateGiatToXLSX(dateParam, data, jenis = null) {
    const XLSX = require("xlsx");
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, jenis);

    const filePath = path.join(__dirname, jenis + "_" + dateParam + ".xlsx");
    XLSX.writeFile(workbook, filePath);

    res.download(filePath, jenis + "_" + dateParam + ".xlsx", (err) => {
      if (err) console.error("Download error:", err);
      // Optional: hapus file setelah download
      fs.unlink(filePath, () => {});
    });
}
// console.log(generateGiat(dataBingkar("2025-06-26"), pick5RandomNumbers(2, 7, 5),"Subag Bingkar"));
// console.log(generateGiat(dataDalpres("2025-06-26"), pick5RandomNumbers(2, 7, 5),"Subag Dalpres"));
// console.log(generateGiatToXLSX("2024-01-01", generateGiat(dataBingkar, pick5RandomNumbers(2, 7, 5)), "Subag Bingkar"));
module.exports = { generateGiat, pick5RandomNumbers, todayInName, generateGiatToXLSX };
