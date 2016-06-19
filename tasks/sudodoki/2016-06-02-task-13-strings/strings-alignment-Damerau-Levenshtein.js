// ### Выравнивание строк
//
// Реализовать алгоритм выравнивания строк на основании метрик Дамеро-Левенштейна.
// Найти примеры, для которых они дают разные результаты выравнивания.


const make2dArray = (rows, columns) => {
  const res = [];
  for (let i = 0; i < rows; i++) {
    res.push(new Array(columns));
  }
  return res;
}

const OPERATIONS = [
  {
    name: 'DELETION',
    isApplicable(x, y, word1, word2){ return x >= 0 && y >= 0 },
    score(x, y, word1, word2){ return -1; },
    shiftX(x) {return x - 1},
    shiftY(y) {return y},
  },
  {
    name: 'INSERTION',
    isApplicable(x, y, word1, word2){ return x >= 0 && y >= 0 },
    score(x, y, word1, word2){ return -1; },
    shiftX(x) {return x},
    shiftY(y) {return y - 1},
  },
  {
    name: 'SWITCH',
    isApplicable(x, y, word1, word2){
      return x >= 1 && y >= 1 && word1[x - 1] === word2[y-2] && word1[x-2] === word2[y-1]
    },
    score(x, y, word1, word2){ return 0.5; },
    shiftX(x) {return x - 2},
    shiftY(y) {return y - 2},
  },
  {
    name: 'CHANGE',
    isApplicable(x, y, word1, word2){ return x >= 0 && y >= 0 },
    score(x, y, word1, word2){ return -1; },
    shiftX(x) {return x - 1},
    shiftY(y) {return y - 1},
  },
  {
    name: 'KEEP',
    isApplicable(x, y, word1, word2){
      return x >= 0 && y >= 0  && word1[x - 1] === word2[y - 1]
    },
    score(x, y, word1, word2){ return 1; },
    shiftX(x) {return x - 1},
    shiftY(y) {return y - 1},
  },
]

const traceback = (result, xmax, ymax, sofar = []) => {
  if (xmax < 0 || ymax < 0) { return sofar; }
  const op = result[ymax][xmax];
  if (!op.from) {
    return sofar;
  }
  const [newY, newX] = op.from;
  return traceback(result, newX, newY, sofar.concat(op));
}
const align = (firstWord, secondWord, operations = OPERATIONS) => {
  const columnCount = firstWord.length;
  const rowCount = secondWord.length;
  const result = make2dArray(rowCount + 1, columnCount + 1);

  const canSwitch = (i, j, word1, word2) => {
    if (i <= 1 || j <= 1) { return false }
    return word1[i - 1] === word2[j - 2] &&
      word1[i - 2] === word2[j - 1]
  }
  const Insertion = operations.find(i => i.name === 'INSERTION');
  const Deletion = operations.find(i => i.name === 'DELETION');
  result[0][0] = {value: 0, op: 'NOOP'};
  for (let i = 1; i < columnCount + 1; i++) {
    result[0][i] = {
      value: result[0][i - 1].value + Deletion.score(),
      name: Deletion.name,
      from: [0, i - 1]
    };
  }
  for (let i = 1; i < rowCount + 1; i++) {
    result[i][0] = {
      value: result[i - 1][0].value + Insertion.score(),
      name: Insertion.name,
      from: [i - 1, 0]
    };
  }
  for (let y = 1; y < rowCount + 1; y ++) {
    for (let x = 1; x < columnCount + 1; x ++) {
      result[y][x] = operations
        .filter(op => op.isApplicable(x, y, firstWord, secondWord))
        .map(op => ({
          value: result[op.shiftY(y)][op.shiftX(x)].value + op.score(x, y, firstWord, secondWord),
          name: op.name,
          from: [op.shiftY(y), op.shiftX(x)]
        }))
        .sort((op1, op2) => op2.value - op1.value)
        [0]
    }
  }

  const ops = traceback(result, columnCount, rowCount).reverse();

  let printRow1 = '';
  let printRow2 = '';
  let charTaken1 = 0;
  let charTaken2 = 0;
  for (let i = 0; i < ops.length; i ++) {
    if (ops[i].name === 'INSERTION') {
      printRow1 += '-';
      printRow2 += secondWord[charTaken2];
      charTaken2++;
    }
    if (ops[i].name === 'DELETION') {
      printRow1 += `${firstWord[charTaken1]}̶` ;
      printRow2 += '-';
      charTaken1++;
    }
    if (ops[i].name === 'SWITCH') {
      printRow1 += `${firstWord[charTaken1]}⇄${firstWord[charTaken1 + 1]}`;
      printRow2 += `${secondWord[charTaken2]} ${secondWord[charTaken2 + 1]}`;
      charTaken1 += 2;
      charTaken2 += 2;
    }
    if (['CHANGE', 'KEEP'].includes(ops[i].name)) {
      printRow1 += firstWord[charTaken1];
      printRow2 += secondWord[charTaken2];
      charTaken1++;
      charTaken2++;
    }
  }
  console.log(printRow1)
  console.log(printRow2)
}

align('Hlelo', 'Hello');
/*
Hl⇄elo
He llo
*/
