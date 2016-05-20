// complexity: n * lg n
const tree = {};

const addToTree = (tree, node) => {
  if (!tree.data) {
    tree.data = node;
    tree.children = [{}, {}];
    return
  }
  if (node > tree.data) {
    addToTree(tree.children[1], node)
  } else {
    addToTree(tree.children[0], node)
  }
  return;
}

const inorder = (tree, fn) => {
  tree.children && tree.children[0] && inorder(tree.children[0], fn)
  tree.data && fn(tree.data);
  tree.children && tree.children[0] && inorder(tree.children[1], fn)
}

addToTree(tree, 2)
addToTree(tree, 1)
addToTree(tree, 3)
addToTree(tree, 7)
inorder(tree, console.log.bind(console));
