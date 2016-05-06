function binarSearch (arr, number, start, end) {
	start = start || 0;
	end = end || arr.length;
	var m = start + Math.floor((end - start) / 2);
	var findEl = arr[m];

	if (m === 0 || findEl === number) {
		if (findEl === number) {
			return m;
		}
		else {
			return null;
		}
	}
	else if (findEl < number) {
		return binarSearch(arr, number, m, end);
	}
	else {
		return binarSearch(arr, number, start, m);
	}

}
var arr1 = [1, 2, 4, 6, 8, 9, 11, 14, 16, 17, 21, 25, 37, 39, 45];
var arr2 = [1, 2, 2, 2, 5, 6, 7, 8, 8, 8];
var arr3 = [3];
console.log(binarSearch2(arr1, 17));
console.log(binarSearch2(arr1, 45));
console.log(binarSearch2(arr2, 2));
console.log(binarSearch2(arr3, 3));