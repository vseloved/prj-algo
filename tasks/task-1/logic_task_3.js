(function () {
	const booleanFunctions = [
		{
			title: 'zero',
			code: 'false'
		}, 
		{
			title: 'and',
			code: 'a && b'
		}, 
		{
			title: 'a > b',
			code: 'a > b'
		}, 
		{
			title: 'a',
			code: 'a'
		}, 
		{
			title: 'b > a',
			code: 'b > a'
		}, 
		{
			title: 'b',
			code: 'b'
		}, 
		{
			title: 'xor',
			code: 'a !== b'
		}, 
		{
			title: 'or',
			code: 'a || b'
		}, 
		{
			title: 'nor',
			code: '!a && !b'
		}, 
		{
			title: 'xnor',
			code: 'a === b'
		}, 
		{
			title: 'not "b"',
			code: '!b'
		}, 
		{
			title: 'a <= b',
			code: 'a >= b'
		}, 
		{
			title: 'not "a"',
			code: '!a'
		}, 
		{
			title: 'b <= a',
			code: 'b >= a'
		}, 
		{
			title: 'nand',
			code: '!a || !b'
		}, 
		{
			title: 'one',
			code: 'true'
		}
	]

	let str = ' A | B';
	let row = [
			['F', 'F']
		, ['F', 'T']
		, ['T', 'F']
		, ['T', 'T']
	];
	
	for (i in booleanFunctions) {
		let fn = booleanFunctions[i];

		row.forEach(function(item, i) {
			let a = item[0] === 'T' ? true : false;
			let b = item[1] === 'T' ? true : false;
			let r = (eval(fn.code)) ? 'T' : 'F'; 
			row[i].push(r);
		});
	}

	booleanFunctions.forEach(function(item) {
		str += ' | ' + item.title;
	});

	str += '\n---+---+-';

	booleanFunctions.forEach(function(item, i) {
		c = item.title.length;
		if (i !== 0) {
			str += '-+-';
		} 
		
		for (let j = 0; j < c; j++) {
			str += '-';   
		}
	});

	row.forEach(function (item) {
		str += '\n ';

		item.forEach(function (item, i) {
			let space = ''; 
			let c = '';
			
			if (i !== 0) {
				str += ' | ';
			}

			if (i > 1) {
				c = booleanFunctions[i - 2].title.length;

				if (!(c % 2)) {
					str += ' ';
				}

				c = Math.floor((c - 1) / 2);

				for (let j = 0; j < c; j++) {
					space += ' ';   
				}
			}
			
			str += space + item + space;
		});
	});
	console.log(str);

})();