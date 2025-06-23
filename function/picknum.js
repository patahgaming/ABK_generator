function pick5RandomNumbers(min = 1, max = 7) {
  const numbers = [];
  while (numbers.length < 5) {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    if (randomNumber > min && randomNumber < max + 1) { // Ensure the number is between 1 and 7
      if (!numbers.includes(randomNumber)) {
        numbers.push(randomNumber);
      }
    }
  }
  return numbers;
}
module.exports = { pick5RandomNumbers };
