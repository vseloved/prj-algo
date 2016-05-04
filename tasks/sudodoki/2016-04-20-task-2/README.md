![](result.png)
Issue with following code
```javascript
if (!availableVertices.length) { return {takenVertices, pointDictionary, points};}
let willBeTaking = availableVertices.sort(function (thisV, otherV) { return thisV.distance - otherV.distance})[0];
willBeTaking.nodes.forEach((id) => pointDictionary[id] = (pointDictionary[id] || 0) + 1);
let newTakenVertices = takenVertices.concat(willBeTaking);
// TODO: Fix this condition
let newAvailableVertices = availableVertices.filter(({nodes}) => {
  return !willBeTaking.nodes.every((node) => nodes.includes(node)) &&
    pointDictionary[nodes[0]] + pointDictionary[nodes[1]] <= 2
});
return step(newTakenVertices, newAvailableVertices, pointDictionary)
```
