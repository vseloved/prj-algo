var tree = {
  data: 'A',
  children: [
    {data: 'B', children: [{data: 'D'}, {data: 'E', children: [{data: 'H'}]}, {data: 'F'}]},
    {data: 'C', children: [{data: 'G'}]}
  ]
}

function bfs(tree, fn) {
  var queue = [];
  queue.push(tree);
  next = queue.shift();
  while (next) {
    fn(next.data);
    queue = queue.concat(next.children);
    next = queue.shift();
  }
}

bfs(tree, console.log.bind(console)) /* A B C D E F G */
console.log('--')
function dfs(tree, fn) {
  fn(tree.data);
  tree.children && tree.children.map((node) => dfs(node, fn));
}
dfs(tree, console.log.bind(console)) /* A B D E H F C G */
