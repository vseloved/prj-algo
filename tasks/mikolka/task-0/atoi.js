/**
 * @param $string
 * @return int
 */
function atoi (str) {
	var result = 0;
	var len = str.length;
	var float = false;
	var reverse = false;

	if (str.length === 0) {
		return 'not a number';
	}

	//46 = .
	//45 = -
	//48 - 57 = number (0 - 9)
	for (var i = 0; i < len; i++) {
		var code = str.charCodeAt(i);
		var num = code - 48;
			
		if (i === 0 && code === 45) {
			reverse = true;
			continue;
		}
		
		if ((code < 48 || code > 57) && code !== 46) {
			return 'not a number';  
		}

		if (code !== 46 && !float) {
			result = result * 10 + num;
		}
		else {
			float = true;
		}
	}

	if (reverse) {
		return -result;	
	}
	else {
		return result;
	}
}

//tests
console.log(atoi('')); 		  // -> "not a number"
console.log(atoi('фів')); 	  // -> "not a number"
console.log(atoi('1541')); 	  // -> 1541
console.log(atoi('1541.321'));  // -> 1541
console.log(atoi('-100500.3')); // -> -100500
console.log(atoi('15d41.321')); // -> "not a number"
console.log(atoi('1541.32a1')); // -> "not a number"