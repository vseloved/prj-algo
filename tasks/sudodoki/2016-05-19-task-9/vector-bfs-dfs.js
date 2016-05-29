var tree = ['A', 'B', 'C', undefined, 'D', 'E', 'F', 'G', undefined, undefined, undefined, undefined, undefined, 'H'];

var BRANCHING_FACTOR = 3;

// TODO: dynamically add index calculation functions
const hleft = (i) => (i + 1) * BRANCHING_FACTOR - 2
const hmid = (i) => (i + 1) * BRANCHING_FACTOR - 1
const hright = (i) => (i + 1) * BRANCHING_FACTOR

function bfs(tree, fn) {
  tree.filter(i=>i).map((el) => fn(el));
}
bfs(tree, console.log.bind(console)); /* A B C D E F G H */

function _dfs(tree, el, fn) {
  if (!tree[el]) { return null; }
  fn(tree[el])
  if (hleft(el) < tree.length) {
    _dfs(tree, hleft(el), fn)
    _dfs(tree, hmid(el), fn)
    _dfs(tree, hright(el), fn)
  }
}
function dfs(tree, fn) {
  _dfs(tree, 0, fn)
}
dfs(tree, console.log.bind(console)); /* A B D H E F C G */
