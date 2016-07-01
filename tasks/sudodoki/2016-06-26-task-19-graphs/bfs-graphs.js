var vertices = {
  "1": ["2", "3"],
  "2": ["4", "5"],
  "3": ["4"],
  "4": ["6", "7"],
  "7": ["8"],
  "8": ["6"],
  "6": ["4"],
};

function bfs(vertices, startingPoint, lookingFor) {
  var queue = [];
  queue.push([startingPoint, ['Start']]);
  next = queue.shift();
  while (next) {
    const [nextItem, pathToNext] = next;
    if (nextItem === lookingFor) {
      return console.log(`Found ${nextItem}, path: ${pathToNext.join(' → ')}`);
    }
    const children = (vertices[nextItem] || []).filter((item) => {
      return !queue.map(([_item, path]) => _item).includes(item)
    });
    queue = queue.concat(children.map(item => ([item, pathToNext.concat(nextItem)])));
    next = queue.shift();
  }
}

var startingPoint = Object.keys(vertices).slice(0, 1);

bfs(vertices, startingPoint, "6") // Found 6, path: Start → 1 → 2 → 4
