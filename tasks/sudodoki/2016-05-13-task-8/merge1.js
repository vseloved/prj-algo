// Задание 1: Закончить реализацию алгоритма сортировки слиянием для массивов,
// добиться использования места `O(n)`, а не `O(n log n)` или хуже

const merge = (left, right) => {
  let leftPointer = 0, rightPointer = 0, result = [];
  while ((leftPointer < left.length) || (rightPointer < right.length)) {
    if (leftPointer === left.length) {
      result.push(right[rightPointer]);
      rightPointer++;
    } else if (rightPointer === right.length) {
      result.push(left[leftPointer]);
      leftPointer++;
    } else {
      if (right[rightPointer] < left[leftPointer]) {
        result.push(right[rightPointer]);
        rightPointer++;
      } else {
        result.push(left[leftPointer]);
        leftPointer++;
      }
    }
  }
  return result;
}
console.assert(merge([1, 2, 5], [3, 4, 6]).join('|') === [1, 2, 3, 4, 5, 6].join('|'))
const mergeSort = (arr) => {
  const len = arr.length;
  if (len < 2) return arr;
  const mid = Math.ceil(len / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid, len));
  return merge(left, right);
}
console.assert(mergeSort([12, 14, 10, 8, 4, 6, 2, 0, 16, 20, 26, 15]).join('|') === [0, 2, 4, 6, 8, 10, 12, 14, 15, 16, 20, 26].join('|'))
