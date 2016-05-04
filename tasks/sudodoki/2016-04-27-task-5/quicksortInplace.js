function swap(array, i, j) {
  [array[i], array[j]] = [array[j], array[i]]
}

function partition(array, start, edge) {
  console.group('called partition with: ', array, 'start: ', start, 'edge: ', edge)
  let i = start;
  let mid = Math.floor(start + (edge - start) / 2)
  if (array[edge] < array[start]) {swap(array, start, edge)}
  if (array[mid] < array[start]) {swap(array, mid, start)}
  if (array[edge] < array[mid]) {swap(arr, edge, mid)}
  for (let j = start; j < edge - 1; ++j) {
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
function _quicksort(array, start, edge) {
  if (edge - start > 1) {
    let newPivot = partition(array, start, edge);
    _quicksort(array, start, newPivot);
    _quicksort(array, newPivot + 1, edge);
  }
}
function quicksort(array) {
  _quicksort(array, 0, array.length)
  return array;
}
