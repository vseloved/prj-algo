var tree = ['A', 'B', 'C', undefined, 'D', 'E', 'F', 'G', undefined, undefined, undefined, undefined, undefined, 'H'];

var BRANCHING_FACTOR = 3;

// TODO: dynamically add index calculation functions
const hleft = (i) => (i + 1) * BRANCHING_FACTOR - 2
const hmid = (i) => (i + 1) * BRANCHING_FACTOR - 1
const hright = (i) => (i + 1) * BRANCHING_FACTOR

function bfs(tree, fn) {
  tree.filter(i=>i).map((el) => fn(el));
}
bfs(tree, console.log.bind(console));

// TODO: implement
// function _dfs(tree, level, fn) {
//   fn()
// }
// function dfs(tree, fn) {
//   fn(tree[0])
//   _dfs(tree, 0, fn)
// }
