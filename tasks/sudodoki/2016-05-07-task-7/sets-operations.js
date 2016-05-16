// Задание 2: Эффективно реализовать множественные операции объединение, пересечение и
// разница с использованием отсортированных списков
'use strict';
const printList = (list) => {
  var head = list;
  var consoleArgs = [''];
  while (head) {
      consoleArgs  = [consoleArgs[0].concat('%c %s %c⤏')].concat(consoleArgs.slice(1)).concat('background: #888; color: #222', head.el, 'background: #fff; color: #888');
      head = head.next;
  }
  consoleArgs = [consoleArgs[0].concat('%c%s')].concat(consoleArgs.slice(1)).concat('background: #888; color: #222', 'NULL')
  console.log.apply(console, consoleArgs);
}

const addToList = (list, el) => {
  var tail = list;
  while (tail.next) {
    tail = tail.next
  }
  // handle list start
  if (tail.hasOwnProperty('next')) {
    tail.next = {el, next: undefined}
  } else {
    Object.assign(list, {el, next: undefined})
  }
}

const buildList = (arr) => {
  var list = {};
  arr.forEach(el => addToList(list, el));
  return list;
}

const buildSortedList = (arr) => buildList(JSON.parse(JSON.stringify(arr)).sort())

const union = (left, right) => {
  const res = {};
  let [headLeft, headRight] = left.el > right.el ? [right, left] : [left, right];
  while (headLeft) {
    addToList(res, headLeft.el);
    while (headRight && (headRight.el >= headLeft.el) && (headRight.el < (headLeft.next && headLeft.next.el || Infinity))) {
      if (headRight.el !== headLeft.el) { addToList(res, headRight.el); }
      headRight = headRight && headRight.next
    }
    headLeft = headLeft.next;
  }
  return res;
}

printList(union(buildSortedList([0, 2, 5, 6]), buildSortedList([0, 1, 2, 3, 4, 7])));
//  0 ⤏ 1 ⤏ 2 ⤏ 3 ⤏ 4 ⤏ 5 ⤏ 6 ⤏ 7 ⤏NULL

const intersection = (left, right) => {
  const res = {};
  let [headLeft, headRight] = left.el > right.el ? [right, left] : [left, right];
  while (headLeft) {
    while (headRight && (headRight.el >= headLeft.el) && (headRight.el < (headLeft.next && headLeft.next.el || Infinity))) {
      if (headRight.el === headLeft.el) { addToList(res, headRight.el); }
      headRight = headRight.next
    }
    headLeft = headLeft.next;
  }
  return res;
}

printList(intersection(buildSortedList([0, 2, 5, 6]), buildSortedList([0, 1, 2, 3, 4, 7])));
// 0 ⤏ 2 ⤏NULL

const difference = (left, right) => {
  const res = {};
  let headLeft = left;
  let headRight = right;
  while (headLeft) {
    while (headRight && (headRight.el < headLeft.el)) {
      headRight = headRight.next
    }
    if (headRight.el !== headLeft.el) { addToList(res, headLeft.el) }
    headLeft = headLeft.next
  }
  return res;
}

printList(difference(buildSortedList([0, 2, 5, 6]), buildSortedList([0, 1, 2, 3, 4, 7])));
// 5 ⤏ 6 ⤏NULL
