// Задание 2: Используя вашу реализацию хеш-таблицы, посчитать статистику среднего количества операций поиска при обращении к элементам в зависимости от заполняемости таблицы и вывести таблицу среднего количества обращений (для каждого метода расширения таблицы). Например:
//
// ```
// Заполняемость   Количество операций
// 10%                1.01
// 20%                1.2
// 30%                1.4
// ...
// ```

const moveAllHash = require('./hash-1a');
const movePartiallyHash = require('./hash-1b');

function Inspector() {
  const allOperations = [];
  let currentCount = 0;
  let currentTarget = null;
  this.instance = function () {
    return new Proxy(new Array, {
          get: function(target, property) {
              var method;
              if (!['splice', 'length'].includes(property)) {
                currentCount++
              }

              currentTarget = target
              if (property in target) {
                  return target[property];
              }
              return target[property];
          }
      });
  }
  this.startOp = () => {
    currentCount = 0;
  }
  this.endOp = () => {
    let currentLength = currentTarget.filter(i => i).length;
    allOperations.push({ops: currentCount, filled: currentLength, length: this.instance.size});
  }
  this.inspect = () => {
    return {
      allOperations, currentCount, length: this.instance.size
    }
  }
  return this;
}

const proccess = ({allOperations}, caseName) => {
  const average = (arr) => arr.reduce((s, i) => s + i, 0) / arr.length;

  let result = allOperations.reduce((memo, record) => {
    const roundTo10 = (number) => Math.ceil(number / 10) * 10
    const percentage = roundTo10(record.filled / record.length * 100);
    if (!memo[percentage]) {
      memo[percentage] = [];
    }
    memo[percentage].push(record.ops)
    return memo
  }, {});
  result = Object.keys(result).reduce((memo, percentage) => {
    memo[percentage] = average(result[percentage]);
    return memo;
  }, {});
  console.log(caseName)
  console.log(result);
}
const inspector1 = new Inspector;
const hash1 = moveAllHash(32, inspector1.instance);
const possibleKeys = ["transferal", "strother", "vlad", "unsandaled", "oryxes", "foredoom", "overact", "mallow", "emotively", "telugu", "unsensualized", "encumber", "belting", "silverish", "prounionism", "glynis", "boswell", "appreciativeness", "woodies", "unascertained", "cavalierism", "epizooty", "microinjection", "assemblï¿¥ï¾½", "pauperised", "statical", "argued", "aryanized", "katharevousa", "investigated", "demurral", "char", "eskilstuna", "versailles", "embrocating", "inodorousness", "microorganism", "backstab", "premodeled", "clothespin", "gambade", "flinchingly", "inertly", "patternable", "premodelled", "osborn", "finney", "fenny", "therewithal", "coitus", "yorubaland", "stromboli", "triggerless", "kudzu", "nonderisive", "verb", "stragglier", "passive", "impresser", "mucigen", "enarme", "litigating", "wherewithal", "malleolus", "strapping", "tactual", "acetaldol", "tzigane", "supermundane", "nonrestorative", "knobstick", "bartram", "cephalitis", "thadentsonyane", "demonolater", "precorrection", "lys", "defy", "painter", "overfee", "butterbush", "copulation", "galleried", "terraced", "unusualness", "bascinet", "domett", "signorina", "poetess", "dunderhead", "mukade", "bernardsville", "millenniums", "dendrologist", "prefiller", "diecious", "reincur", "postconvalescent", "regrip", "kasper"];
possibleKeys.forEach((key) => {
  inspector1.startOp()
  hash1.setKey(key, Math.random());
  inspector1.endOp()
})
proccess(inspector1.inspect(), "Move All on resize Hash")
/*
Move All on resize Hash
{ '10': 1,
  '20': 1,
  '30': 1.6666666666666667,
  '40': 1.6666666666666667,
  '50': 1.75,
  '60': 34.714285714285715,
  '70': 9.090909090909092,
  '80': 13.571428571428571,
  '90': 14.444444444444445,
  '100': 25.818181818181817 }
*/

const inpsector2 = new Inspector;
const hash2 = movePartiallyHash(32, inpsector2.instance);
possibleKeys.forEach((key) => {
  inpsector2.startOp()
  hash2.setKey(key, Math.random());
  inpsector2.endOp()
})
proccess(inpsector2.inspect(), "Eventually moving hash")
/* TODO: figure out how this should be computed
Eventually moving hash
{ '10': 456.9230769230769,
  '20': 289.55555555555554,
  '30': 207,
  '40': 103.33333333333333,
  '50': 110.63636363636364,
  '60': 124.11111111111111,
  '70': 139.33333333333334,
  '80': 150.5,
  '90': 156,
  '100': 181 }
*/
