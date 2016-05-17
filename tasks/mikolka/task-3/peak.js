/*
 * Задача поиска пика
 * Задание: Реализуйте наивный алогритм (полным перебором), который находит хотя бы один пик в одномерном и двухмерном массиве.
 */

//пошук всіх піків
function peak (arr) {
	let len = arr.length - 1;
	let peck = [];
	let twoDim = Array.isArray(arr[0]);
	
	for (var i = 1; i < len; i++) {
		if (twoDim) {
			let aLen = arr[i].length - 1;

			for (var j = 1; j < aLen; j++) {
				let num = arr[i][j];
				let prevNum = arr[i][j - 1];
				let nextNum = arr[i][j + 1];
				let topNum = arr[i + 1][j];
				let downNum = arr[i - 1][j];
				
				if (num > nextNum && 
					num > prevNum &&
					num > topNum &&
					num > downNum
				) {
					peck.push({
						number: num, 
						row: i,
						col: j
					});
				}
			}
		}
		else {
			let num = arr[i];
			let prevNum = arr[i - 1];
			let nextNum = arr[i + 1];
			
			if (num > nextNum && num > prevNum) {
				peck.push({
					number: num, 
					position: i
				});
			}
		}
	}

	return peck;
}

let arr = [12, 3, 4, 5, 2, 9, 4, 0, 2, 9, 3, 1, 12, 44, 34];

let arr2 = [
	[2, 5, 8, 12, 7, 4, 21],
	[8, 5, 9, 0,  3, 6, 8],
	[3, 5, 1, 10, 9, 2, 0],
	[5, 2, 0, 0,  3, 6, 1]
];

console.log(arr);
console.log(peak(arr));
console.log('\n');
console.log(arr2);
console.log(peak(arr2));