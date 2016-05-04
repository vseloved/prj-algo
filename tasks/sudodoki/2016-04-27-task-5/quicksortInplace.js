function swap(array, i, j) {
  [array[i], array[j]] = [array[j], array[i]]
}

function partition(array, pivot, edge) {
  console.group('called partition with: ', array, 'pivot: ', pivot, 'edge: ', edge)
  let i = pivot;
  for (let j = pivot; j < edge - 1; ++j) {
    if (array[j] <= array[edge - 1]) {
      console.log('will be swapping ', 'i: ', i, 'arr[i]:',array[i], ' j: ', j, 'arr[j]:', array[j]);
      swap(array, i, j);
      console.log('after swap ', array.join(' '))
      ++i;
    }
  }
  swap(array, i, edge-1);
  console.log('pivotIndex is: ', i);
  console.groupEnd()
  return i;
}
function _quicksort(array, pivot, edge) {
  if (edge - pivot > 1) {
    let newPivot = partition(array, pivot, edge);
    _quicksort(array, pivot, newPivot);
    _quicksort(array, newPivot + 1, edge);
  }
}
function quicksort(array) {
  _quicksort(array, 0, array.length)
  return array;
}
