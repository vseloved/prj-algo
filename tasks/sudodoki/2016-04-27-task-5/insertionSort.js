function swap(array, i, j) {
  [array[i], array[j]] = [array[j], array[i]]
}

function insertionSort(array) {
  for (let sortedHead = 1; sortedHead < array.length; sortedHead++) {
    let toCheck = sortedHead;
    while (toCheck && (array[toCheck] < array[toCheck - 1])) {
      swap(array, toCheck, toCheck - 1)
      toCheck--;
    }
    return array
  }
}
