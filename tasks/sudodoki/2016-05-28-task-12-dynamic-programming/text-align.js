// ## 2016-05-28 - Задание 12
// ### Динамическое программирование
// Задание: задача выравнивания текста.
// На вход дается (длинная) строка текста, которую нужно разбить на подстроки не шире определенного лимита
// (`width`) символов.
// (Это задача, которая решается в браузере или в редакторе для показа теста с параметром `align=justify`).
// Необходимо найти самое "красивое" разбиение строки на строки из отдельных токенов (разделенных проблеми),
// т.е. один токен не может разбиваться на части.
// Мера уродливости строки: `(expt (- width (length substring)) 3)`.
// Результатом будет отображение на экране разбитого на строки абзаца (при этом можно выводить его красиво,
// добавляя дополнительные пробелы между словами, чтобы последнее слово упиралось в оганичение по символам). Стандартное ограничение (`width = 80`).

// expt returns base-number raised to the power power-number.

// I would not lie – I didn't get how to do this task correctly even after
// reading multiple solutions :( – this is done based on http://www.geeksforgeeks.org/dynamic-programming-set-18-word-wrap/

const make2DArray = (amountOfSubArrays) => {
  const res = [];
  for (let i = 0; i < amountOfSubArrays; i++)
  res.push([]);
  return res;
}

const INPUT_STRING = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const printSolution = (printBreaks, words, maxLength) => {
  const wordCount = words.length;
  const res = [];
  const setIndexes = (prArr, n) => {
    let k;
    if (prArr[n] == 1) {
      k = 1;
    } else {
      k = setIndexes(prArr, prArr[n]-1) + 1;
    }
    res.push([prArr[n], n])
    return k;
  }
  setIndexes(printBreaks, wordCount);
  for (let [lower, upper] of res) {
    const line = words.slice(lower - 1, upper);
    const extraSpaces = Math.floor((maxLength - line.join(' ').length)  / (2 * line.length));
    const res = line.reduce((memo, str) => memo + ' '.repeat(extraSpaces) + str + ' '.repeat(extraSpaces + 1), '')
    console.log(res);
  }
}
const textAlign = (text = INPUT_STRING, maxLength = 80) => {
  const words = text.split(' ');
  const wordCount = words.length;
  const extraSpaces = make2DArray(wordCount + 1);
  const lineCosts = make2DArray(wordCount + 1);
  const costs = [];
  const printBreaks = [];
  for (let i = 1; i <= wordCount; i++) {
    extraSpaces[i][i] = maxLength - words[i-1].length;
    for (let j = i+1; j <= wordCount; j++) {
      extraSpaces[i][j] = extraSpaces[i][j-1] - words[j-1].length - 1;
    }
  }
  for (let i = 1; i <= wordCount; i++) {
    for (let j = i; j <= wordCount; j++) {
        if (extraSpaces[i][j] < 0) {
          lineCosts[i][j] = Infinity;
        } else if (j == wordCount && extraSpaces[i][j] >= 0) {
          lineCosts[i][j] = 0;
        } else {
          lineCosts[i][j] = Math.pow(extraSpaces[i][j], 3)
        }
    }
  }
  costs[0] = 0;
  for (let j = 1; j <= wordCount; j++) {
    costs[j] = Infinity;
    for (let i = 1; i <= j; i++) {
      if (costs[i-1] != Infinity && lineCosts[i][j] != Infinity && (costs[i-1] + lineCosts[i][j] < costs[j])) {
        costs[j] = costs[i-1] + lineCosts[i][j];
        printBreaks[j] = i;
      }
    }
  }
  printSolution(printBreaks, words, maxLength);
}
textAlign()
