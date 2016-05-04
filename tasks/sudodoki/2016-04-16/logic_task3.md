Задание 3. Напишите программу, которая печатает таблицу истинности для всех булевых функций и по ходу придумайте названия для каждой из них. Результат работы должен выглядеть примерно так:

```
 X | Y | True | False | AND | ...
---+---+------+-------+-----+----
 T | T |   T  |   F   |  T  | ...
 T | F |   T  |   F   |  F  | ...
...
```

// TODO: rewrite in lisp
const labels = ['A', 'B', 'False', 'And', 'ExactlyToffee', 'CanBeToffee', 'Fatty', 'WhateverTrue', 'XOR', 'NAND', 'EverybodyFails', 'Equal', 'WhateverFalse', 'NotFatty', 'CanBeFatty', 'NotToffee', 'NooneIsOk', 'True'];
const row1 = ['T', 'T'];
const row2 = ['T', 'F'];
const row3 = ['F', 'T'];
const row4 = ['F', 'F'];
labels.forEach(function (item, i) {
  // limiting to 16 values only, skipping 'a', 'b' labels
  if (i >= 2) {
    row1.push(!!((i - 2) & 1));
    row2.push(!!((i - 2) & 2));
    row3.push(!!((i - 2) & 4));
    row4.push(!!((i - 2) & 8));
  }

});
console.table([labels, row1, row2, row3, row4])
