// ## 2016-05-06 - Задание 6
//
// [Бинарная куча](https://ru.wikipedia.org/wiki/%D0%94%D0%B2%D0%BE%D0%B8%D1%87%D0%BD%D0%B0%D1%8F_%D0%BA%D1%83%D1%87%D0%B0)
//
// Задание 1: Завершить реализацию бинарной кучи на основе массива, а также функций для ее визуализации и проверки инвариантов
const backend = [];
const swap = (array, i, j) => {
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}
const hparent = (i) => Math.floor((i - 1) / 2)
const hleft = (i) => (i + 1) * 2 - 1
const hright = (i) => (i + 1) * 2

const hpush = (backendArray, node) => {
  backendArray.push(node);
  hup(backendArray, backendArray.length - 1);
  return backendArray.length;
}

const hpop = (backendArray) => {
  swap(backendArray, 0, backendArray.length - 1);
  result = backendArray.pop()
  hdown(backendArray, 0);
  return result;
}

const hup = (backendArray, begin) => {
  // swap with parent until invariant works
  const parentIndex = hparent(begin)
  if (begin > 0 && backendArray[begin] > backendArray[parentIndex]) {
    swap(backendArray, begin, parentIndex);
    hup(backendArray, parentIndex);
  }
}

const hdown = (backendArray, begin, end = backendArray.length - 1) => {
  // swap with biggest on next level until invariant works
  const leftIndex = hleft(begin)
  const rightIndex = hright(begin)
  if (!(leftIndex <= end)) { return }
  const cannotUseRightAsChild = (rightIndex > end) || backendArray[rightIndex] == undefined
  const child = (cannotUseRightAsChild || (backendArray[leftIndex] > backendArray[rightIndex])) ? leftIndex : rightIndex
  if (backendArray[child] > backendArray[begin]) {
    swap(backendArray, child, begin);
    hdown(backendArray, child, end);
  }
  return backendArray;
}

const hbuild = (array) => {
  let mid = Math.floor(array.length / 2);
  for (let i = 0; i < mid; i++) {
    hdown(array, mid - i - 1)
  }
  return array;
}

const hcheck = (array, index) => {
  const leftIndex = hleft(index)
  const rightIndex = hright(index)
  return [leftIndex, rightIndex]
    .every(childIndex => array[childIndex] == undefined ||
            (array[index] > array[childIndex] && hcheck(array, childIndex)))
}

const hprint = (heap) => {
  const maxLevel = Math.log2(heap.length);
  const maxWidth = 3 * Math.pow(2, maxLevel) + 1;
  for (let currentLevel = 0; currentLevel < maxLevel; currentLevel++) {
    const levelStart = Math.pow(2, currentLevel) - 1
    const levelEnd = Math.pow(2, currentLevel + 1) - 1
    const toPrint = heap.slice(levelStart, levelEnd);
    const spacesNeeded = Math.pow(2, maxLevel - currentLevel);
    const spacer = " ".repeat(spacesNeeded);
    const consoleArgs = toPrint.reduce((memo, el) => {
      memo[0] += "%s%i%s"
      return memo.concat(spacer, el, spacer);
    }, [''])
    console.log.apply(console, consoleArgs);
  }
}
var heap = hbuild([2, 5, 6, 1, 3, 4, 7]);

console.assert(hcheck(heap, 0), "Invariant should work")
console.log('~~~ ⇊⇊ Initial HEAP ⇊⇊ ~~~')
hprint(heap);
console.log('~~~ ⇈⇈ Initial HEAP ⇈⇈ ~~~')

console.log('hpop: ', hpop(heap));
console.assert(hcheck(heap, 0), "Invariant should work")
hprint(heap);

console.log('hpush: ',hpush(heap, 10))
console.assert(hcheck(heap, 0), "Invariant should work")
hprint(heap);

// Задание 2: Завершить реализацию кучной сортировки
//
const heapSort = (array) => {
  array = hbuild(array);
  for (let i = 0; i < array.length; i ++) {
    swap(array, 0, array.length - 1 - i)
    hdown(array, 0, array.length - 2 - i)
  }
  return array;
}

console.log(heapSort([4, 3, 2, 1, 5, 6, 7]));
