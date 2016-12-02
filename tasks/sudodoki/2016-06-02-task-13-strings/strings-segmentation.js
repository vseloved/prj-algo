// ### Сегментация строк
//
// Реализовать алгоритм, который расставляет пробелы в строке текста, из которой они были удалены, используя словарь.
// На вход дается строка следующего вида: `thisisatext` которая должна превратиться в `this is a text`. Если возможны несколько разбиений, возвращать все варианты. (По каким критериям варианты могут ранжироваться между собой?)
//
// Алгоритм должен работать за линейное время от длины строки (с учетом того, что максимальная длина слова в
// словаре — известная константа).
//
// Бонус: реализовать улучшение, которое работает в условии присутствия ошибок/опечаток, находя все слова, разбивая текст на все слова, которые не содержат ошибок и остальную непонятную фигню. Пример: `thoisa text -> tho is a text`.
//  t h i s i s a t e s t
// |0|0|0|0|1|1|1|0|1|0|1
// this
// is
// a
// text
// his
// sis
// sate
// isis
const WORDS = [
  'a',
  'is',
  'his',
  'sis',
  'isis',
  'sate',
  'text',
  'this',
];

const traceback = (resultArr, sofar = []) => {
  if (!resultArr.length) { return sofar; }
  const [_, ways] = resultArr.slice(-1)[0];
  if (!ways.length) { return sofar; }
  const shouldDivergeResults = ways.length > 1;
  const method = shouldDivergeResults ? 'splice' : 'slice'
  const [newPosition, word] = ways[method](0, 1)[0];
  let result = traceback(resultArr.slice(0, newPosition), [word].concat(sofar))
  if (shouldDivergeResults) {
    result = result.concat('|', traceback(resultArr, sofar));
  }
  return result
}

const breakDownString = (string, words = WORDS) => {
  const dictionary = new Set(words)
  const MAXLEN = words.sort((a, b) => b.length - a.length)[0].length
  const result = new Array(string.length + 1).fill([0, []]);
  const markPossibleFrom = (position) => {
    for (let i = 1; i <= MAXLEN; i++) {
      const possibleWord = string.slice(position, position + i);
      if (dictionary.has(possibleWord) && position + i <= result.length) {
        const [res, paths] = result[position + i];
        result[position + i] = [1, [...paths, [position + 1, possibleWord]]];
      }
    }
  }
  for (let i = 0; i < string.length; i++) {
      if (i === 0 || result[i][0]) {
        markPossibleFrom(i);
      }
  }

  console.log(JSON.stringify(traceback(result)));
  // ["this","is","a","text"]
}

breakDownString('thisisatext')
