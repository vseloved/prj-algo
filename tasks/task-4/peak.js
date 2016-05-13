function peakTwoDimRec (arr, start, end) {
	start = start || 0;
	end = end || arr[0].length;

	let col = Math.floor((start + end) / 2);
	//рекурсивний пошук елеменета в стовпчику має малу точність, 
	//тому шукаємо максимальний елемент
	let row = maxColEl(arr, col);

	let curNum = arr[row][col];
	let topNum = arr[row - 1][col];
	let bottomNum = arr[row + 1][col];
	let leftNum = arr[row][col - 1];
	let rightNum = arr[row][col + 1];

	if (
		(col !== 0 || col !== arr.length) &&
		(curNum >= topNum) &&
        (curNum >= bottomNum) &&
        (curNum >= leftNum) &&
        (curNum >= rightNum)
    ) {
        return {
        	num: curNum,
        	row: row,
        	col: col
        };
    }
    else if (col !== 0 && leftNum > curNum) {
        return peakTwoDimRec(arr, start, col);
    }
    else if (col !== arr.length && rightNum > curNum) {
        return peakTwoDimRec(arr, col, end);
    }
    else {
    	//нічого не знайшли шукаємо в іншому напрямку?
    }

    return "no find peak";
}

function maxColEl (arr, col) {
	let row = 1;
	let max = arr[row][col];	

	//не шукаємо в крайніх точках
	for (let i = 1; i < arr.length - 1; i++) {
		let el = arr[i][col];
		if (max < el) {
			max = el;
			row = i;
		}
	}

	return row;
}

let arr = [
	[2, 5, 8, 12, 7, 4, 21],
	[8, 5, 9, 0,  3, 6, 2],
	[3, 5, 1, 10, 9, 2, 0],
	[5, 2, 0, 0,  3, 6, 1]
];

let arr2 = [
	[2, 5, 0, 12, 7,  4, 21],
	[8, 5, 0, 0,  3,  6, 2],
	[3, 5, 0, 10, 12, 2, 0],
	[5, 2, 0, 0,  3,  6, 1]
];

let arr3 = [
	[2, 5, 0, 12, 7, 4, 21],
	[8, 5, 0, 0,  3, 6, 8],
	[3, 5, 0, 10, 12, 2, 0],
	[5, 2, 0, 0,  3, 6, 1]
];

console.log(peakTwoDimRec(arr));
console.log(peakTwoDimRec(arr2));
console.log(peakTwoDimRec(arr3));