var tree = ['root', ['A', ['C', 'D']], ['B']]

function bfs(tree, fn) {
  var queue = [];
  queue.push(tree);
  next = queue.shift();
  while (next) {
    const [data, ...children] = next;
    fn(data);
    queue = queue.concat(children);
    next = queue.shift();
  }
}

bfs(tree, console.log.bind(console)); /* root A B C D */

function dfs([el, ...children], fn) {
  fn(el);
  children.forEach((node) => dfs(node, fn));
}

dfs(tree, console.log.bind(console)); /* root A C D B */
