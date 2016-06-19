// ### Выравнивание строк
//
// Реализовать алгоритм выравнивания строк на основании метрик Левенштейна.
// Найти примеры, для которых они дают разные результаты выравнивания.


const make2dArray = (rows, columns) => {
  const res = [];
  for (let i = 0; i < rows; i++) {
    res.push(new Array(columns));
  }
  return res;
}

const COSTS = {
  DELETION: () => -1,
  INSERTION: () => -1,
  CHANGE: (a, b) => {
    return a === b ? 1 : -1},
}

const _traceback = (matrix, x, y, sofar) => {
  const getValueAt = (array, xcoord, ycoord, defaultValue = Infinity) =>
    ((xcoord >= 0) && (ycoord >= 0))
      ? array[ycoord][xcoord]
      : defaultValue

  const OPS = {
    [getValueAt(matrix, x, y - 1)]: ['INS', x, y - 1],
    [getValueAt(matrix, x - 1, y)]: ['DEL', x - 1, y],
    [getValueAt(matrix, x - 1, y - 1)]: ['CHG', x - 1, y - 1],
  };
  const taken = Math.max(
    getValueAt(matrix, x, y - 1, -Infinity),
    getValueAt(matrix, x - 1, y, -Infinity),
    getValueAt(matrix, x - 1, y - 1, -Infinity)
  )
  if (!OPS[taken]) {
    return sofar;
  }
  const [operation, newX, newY] = OPS[taken];
  return _traceback(matrix, newX, newY, sofar.concat(operation));
}
const traceback = (result, xmax, ymax, sofar = []) => {
  return _traceback(result, xmax, ymax, []).reverse();
}
const align = (firstWord, secondWord, costMatrix = COSTS) => {
  const columnCount = firstWord.length;
  const rowCount = secondWord.length;
  const result = make2dArray(rowCount + 1, columnCount + 1);
  result[0][0] = 0;
  for (let i = 1; i < columnCount + 1; i++) {
    result[0][i] = result[0][i - 1] + COSTS.INSERTION();
  }
  for (let i = 1; i < rowCount + 1; i++) {
    result[i][0] = result[i - 1][0] + COSTS.DELETION();
  }
  for (let y = 1; y < rowCount + 1; y ++) {
    for (let x = 1; x < columnCount + 1; x ++) {
      result[y][x] = Math.max(
        result[y - 1][x] + costMatrix.INSERTION(),
        result[y][x - 1] + costMatrix.DELETION(),
        result[y - 1][x - 1] + costMatrix.CHANGE(firstWord[x - 1], secondWord[y - 1])
      );
    }
  }

  const ops = traceback(result, columnCount, rowCount);
  let printRow1 = '';
  let printRow2 = '';
  let charTaken1 = 0;
  let charTaken2 = 0;
  for (let i = 0; i < ops.length; i ++) {
    if (ops[i] === 'INS') {
      printRow1 += '-';
      printRow2 += secondWord[charTaken2];
      charTaken2++;
    }
    if (ops[i] === 'DEL') {
      printRow1 += `${firstWord[charTaken1]}̶` ;
      printRow2 += '-';
      charTaken1++;
    }
    if (ops[i] === 'CHG') {
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
Hl̶el-o
H-ello
*/
