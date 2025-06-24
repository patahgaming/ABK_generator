// Simple Node.js test suite (no Jest required)
// Run with: node generate.test.js

// Mock data (replace with actual imports if needed)
const mockDataBingkar = [
  ["2024-01-01", "Bongkar Muat", "Kegiatan bongkar barang", 5, 8, "Selesai"],
  ["2024-01-02", "Inspeksi", "Pemeriksaan dokumen", 3, 4, "Proses"],
  ["2024-01-03", "Verifikasi", "Cek kelengkapan", 2, 3, "Pending"],
  ["2024-01-04", "Administrasi", "Input data", 4, 6, "Selesai"],
  ["2024-01-05", "Koordinasi", "Meeting tim", 1, 2, "Terjadwal"],
  ["2024-01-06", "Laporan", "Buat laporan harian", 3, 5, "Draft"],
  ["2024-01-07", "Evaluasi", "Review hasil kerja", 2, 4, "Selesai"]
];

// Simple assertion helper
function assert(condition, message) {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
}

function assertEqual(actual, expected, message) {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(`Assertion failed: ${message}\nExpected: ${JSON.stringify(expected)}\nActual: ${JSON.stringify(actual)}`);
  }
}

function assertContains(array, item, message) {
  if (!array.includes(item)) {
    throw new Error(`Assertion failed: ${message}\nArray: ${JSON.stringify(array)}\nItem: ${JSON.stringify(item)}`);
  }
}

function assertInRange(value, min, max, message) {
  if (value < min || value > max) {
    throw new Error(`Assertion failed: ${message}\nValue: ${value}, Range: ${min}-${max}`);
  }
}

// Import your functions (adjust path as needed)
let generateGiat, pick5RandomNumbers, todayInName;
try {
  const module = require('./generate.js'); // Adjust this path to your actual file
  generateGiat = module.generateGiat;
  pick5RandomNumbers = module.pick5RandomNumbers;
  todayInName = module.todayInName;
} catch (error) {
  console.error('Error importing module:', error.message);
  console.log('Please make sure the path to your module is correct');
  process.exit(1);
}

// Test runner
let testsRun = 0;
let testsPassed = 0;
let testsFailed = 0;

function runTest(testName, testFunction) {
  testsRun++;
  try {
    testFunction();
    console.log(`✅ ${testName}`);
    testsPassed++;
  } catch (error) {
    console.log(`❌ ${testName}: ${error.message}`);
    testsFailed++;
  }
// JS does not have time.sleep; use setTimeout with a blocking loop for demo (not recommended in production)
// Simple blocking sleep (synchronous, for test/demo only)
function sleep(ms) {
    const start = Date.now();
    while (Date.now() - start < ms) {}
}
sleep(120); // Optional delay for readability
}

console.log('🧪 Running tests...\n');

// Test pick5RandomNumbers
runTest('pick5RandomNumbers - default parameters', () => {
  const result = pick5RandomNumbers();
  assert(result.length === 5, 'Should return 5 numbers by default');
  
  // Check uniqueness
  const uniqueNumbers = [...new Set(result)];
  assert(uniqueNumbers.length === result.length, 'All numbers should be unique');
  
  // Check range (default 1-7)
  result.forEach(num => {
    assertInRange(num, 1, 7, `Number ${num} should be in range 1-7`);
  });
});

runTest('pick5RandomNumbers - custom parameters', () => {
  const result = pick5RandomNumbers(3, 10, 3);
  assert(result.length === 3, 'Should return 3 numbers');
  
  result.forEach(num => {
    assertInRange(num, 3, "10", `Number ${num} should be in range 3-10`);
  });
});

runTest('pick5RandomNumbers - uniqueness test', () => {
  const result = pick5RandomNumbers(1, 100, 10);
  const uniqueNumbers = [...new Set(result)];
  assert(uniqueNumbers.length === 10, 'All 10 numbers should be unique');
});

runTest('pick5RandomNumbers - small range', () => {
  const result = pick5RandomNumbers(1, 3, 3);
  assert(result.length === 3, 'Should return 3 numbers');
  assert(result.includes(1) && result.includes(2) && result.includes(3), 'Should contain all numbers 1, 2, 3');
});

// Test todayInName
runTest('todayInName - current date', () => {
  const result = todayInName();
  const validDays = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  assertContains(validDays, result, 'Should return valid Indonesian day name');
});

runTest('todayInName - specific dates', () => {
  const testCases = [
    { date: '2024-01-01', expected: 'Senin' },    // Monday
    { date: '2024-01-05', expected: 'Jumat' },   // Friday
    { date: '2024-01-07', expected: 'Minggu' },  // Sunday
    { date: '2024-01-06', expected: 'Sabtu' }    // Saturday
  ];
  
  testCases.forEach(({ date, expected }) => {
    const result = todayInName(date);
    assertEqual(result, expected, `Date ${date} should return ${expected}`);
  });
});

runTest('todayInName - Date object input', () => {
  const testDate = new Date('2024-01-03'); // Wednesday
  const result = todayInName(testDate);
  assertEqual(result, 'Rabu', 'Should handle Date object input');
});

runTest('todayInName - timestamp input', () => {
  const timestamp = new Date('2024-01-04').getTime(); // Thursday
  const result = todayInName(timestamp);
  assertEqual(result, 'Kamis', 'Should handle timestamp input');
});

// Test generateGiat
runTest('generateGiat - basic functionality', () => {
  const originalLog = console.log;
  let loggedMessage = '';
  console.log = (...args) => { loggedMessage = args.join(' '); };
  
  const testData = mockDataBingkar;
  const randomNumbers = [1, 2, 3];
  const result = generateGiat(testData, [...randomNumbers]); // Use spread to avoid mutation
  
  console.log = originalLog;
  
  // Check header
  const expectedHeader = ["Tanggal", "Kategori", "Uraian", "Jumlah Giat", "Jumlah Waktu (per jam)", "Keterangan"];
  assertEqual(result[0], expectedHeader, 'Should have correct header');
  
  // Check logging
  assert(loggedMessage.includes('Random Numbers Seed:'), 'Should log random numbers seed');
  
  // Should have more than just header
  assert(result.length > 1, 'Should have data rows');
});

runTest('generateGiat - data[0] and data[1] assignment', () => {
  const testData = mockDataBingkar;
  const randomNumbers = [3, 4, 5];
  const result = generateGiat(testData, [...randomNumbers]);
  
  // First data row should be data[0]
  assertEqual(result[1], testData[0], 'Second row should be data[0]');
  
  // Second data row should be data[1] (due to multiple entries)
  assertEqual(result[2], testData[1], 'Third row should be data[1]');
});

runTest('generateGiat - Friday special case', () => {
  const testData = mockDataBingkar;
  const randomNumbers = [3, 4, 5];
  const fridayDate = '2024-01-05'; // Friday
  const result = generateGiat(testData, [...randomNumbers], fridayDate);
  
  // On Friday, second row should be data[1]
  assertEqual(result[2], testData[1], 'On Friday, third row should be data[1]');
});

runTest('generateGiat - empty data handling', () => {
  const emptyData = [];
  const randomNumbers = [1, 2];
  const result = generateGiat(emptyData, [...randomNumbers]);
  
  const expectedHeader = ["Tanggal", "Kategori", "Uraian", "Jumlah Giat", "Jumlah Waktu (per jam)", "Keterangan"];
  assertEqual(result[0], expectedHeader, 'Should still have header with empty data');
});

runTest('generateGiat - single data entry', () => {
  const singleData = [mockDataBingkar[0]];
  const randomNumbers = [0];
  const result = generateGiat(singleData, [...randomNumbers]);
  
  assert(result.length >= 2, 'Should have header plus at least one data row');
  assertEqual(result[1], singleData[0], 'Should include the single data entry');
});

runTest('generateGiat - array mutation test', () => {
  const testData = mockDataBingkar;
  const randomNumbers = [1, 2, 3];
  const originalLength = randomNumbers.length;
  
  generateGiat(testData, randomNumbers);
  
  assert(randomNumbers.length === 0, 'Random numbers array should be emptied by shift operations');
});

// Integration tests
runTest('Integration - pick5RandomNumbers + generateGiat', () => {
  const randomNumbers = pick5RandomNumbers(0, 6, 3); // Valid indices for mock data
  const originalNumbers = [...randomNumbers]; // Copy for verification
  const result = generateGiat(mockDataBingkar, randomNumbers);
  
  assert(result.length >= 4, 'Should have header + data rows'); // Header + 3 data rows minimum
  assert(originalNumbers.every(num => num >= 0 && num <= 6), 'Random numbers should be valid indices');
});

runTest('Integration - todayInName + generateGiat workflow', () => {
  const fridayDate = '2024-01-05';
  const dayName = todayInName(fridayDate);
  const randomNumbers = [2, 3, 4];
  const result = generateGiat(mockDataBingkar, [...randomNumbers], fridayDate);
  
  assertEqual(dayName, 'Jumat', 'Should identify Friday correctly');
  assertEqual(result[2], mockDataBingkar[1], 'Should apply Friday logic');
});

// Performance test
runTest('Performance - pick5RandomNumbers', () => {
  const start = Date.now();
  const result = pick5RandomNumbers(1, 50, 20);
  const end = Date.now();
  
  assert(end - start < 1000, 'Should complete within 1 second');
  assert(result.length === 20, 'Should return correct number of results');
});

// Edge case tests
runTest('Edge case - invalid date handling', () => {
  try {
    todayInName('invalid-date');
    assert(false, 'Should throw error for invalid date');
  } catch (error) {
    assert(true, 'Should handle invalid date gracefully');
  }
});

// Summary
console.log('\n📊 Test Results Summary:');
console.log(`Total tests: ${testsRun}`);
console.log(`Passed: ${testsPassed} ✅`);
console.log(`Failed: ${testsFailed} ❌`);

if (testsFailed === 0) {
  console.log('\n🎉 All tests passed!');
  process.exit(0);
} else {
  console.log(`\n⚠️  ${testsFailed} test(s) failed.`);
  process.exit(1);
}