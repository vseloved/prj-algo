const getXY = (rows, x, y) => {
  return rows[y] && rows[y][x] != undefined && rows[y][x]
}

const findPeak = (rows) => {
  const midRow = rows.length === 1 ? 0 : Math.floor(rows.length / 2)
  const possiblePeak = Math.max.apply(Math, rows[midRow])
  console.log('possiblePeak: ', possiblePeak, rows[midRow])
  const possiblePeakIndex = rows[midRow].findIndex(i => i === possiblePeak)
  const above  = getXY(rows, possiblePeakIndex, midRow - 1);
  const below = getXY(rows, possiblePeakIndex, midRow + 1);
  if (above && possiblePeak >= above) {
    if (below && possiblePeak >= below) {
      return {el: possiblePeak, x: possiblePeakIndex, y: midRow}
    } else {
      return findPeak(rows.slice(midRow + 1))
    }
  } else {
    return findPeak(rows.slice(0, midRow))
  }
}
