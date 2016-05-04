function quicksort(array) {
  if (array.length === 2) {
    if (array[0] > array[1]) {
      return array.reverse();
    } else {
      return array;
    }
  }
  if (array.length <= 1) {
    return array;
  }
  let pivotIndex = Math.floor(Math.random() * array.length);
  let pivot = array.splice(pivotIndex, 1)
  let left = quicksort(array.filter((i) => i < pivot))
  let right = quicksort(array.filter((i) => i >= pivot))
  return left.concat(pivot).concat(right);
}
