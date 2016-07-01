// freq / by whole length
/*
a 0.1
b 0.15
c 0.5
d 0.16
e 0.19
*/
let initialElement = [
  [0.1, 'a'],
  [0.15, 'b'],
  [0.5, 'c'],
  [0.06, 'd'],
  [0.19, 'e'],
];

const treeToDict = (tree, currentPath = '', result = {}) => {
  const [left, right] = tree;
  const [leftProbability, leftChild] = left;
  const [rightProbability, rightChild] = right;
  if (Array.isArray(leftChild)) {
    treeToDict(leftChild, currentPath + '0', result)
  } else {
    result[leftChild] = currentPath + '0';
  }
  if (Array.isArray(rightChild)) {
    treeToDict(rightChild, currentPath + '1', result)
  } else {
    result[rightChild] = currentPath + '1';
  }
  return result;
}
const encode = (listOfFreqs) => {
  const res = listOfFreqs
  while (res.length > 1) {
    res.sort(([freq1], [freq2]) => { return freq1 - freq2 })
    const [toMerge1, toMerge2] = res.slice(0, 2);
    const freq1 = toMerge1[0];
    const freq2 = toMerge2[0];
    const merged = freq1 < freq2
      ? [freq1 + freq2, [toMerge1, toMerge2]]
      : [freq1 + freq2, [toMerge2, toMerge1]]
    res.splice(0, 2, merged);
  }
  console.log(treeToDict(res[0][1]))
}
encode(initialElement) // { c: '0', e: '10', b: '110', d: '1110', a: '1111' }
