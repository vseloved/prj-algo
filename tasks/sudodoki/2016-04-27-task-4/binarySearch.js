function binarySearch(array, item, offset = 0) {
  const size = array.length;
  if (size <= 1) {
    return array[0] === item ? offset : -1;
  }
  const mid = Math.floor(size / 2);
  if (array[mid] <= item) {
    return binarySearch(array.slice(mid), item, offset + mid)
  } else {
    return binarySearch(array.slice(0, mid), item, offset)
  }
}
