//Умножение матриц
//Закончите реализацию функции умножения двух матриц, которую мы писали во время занятия

const A = [
	[1, 2],
	[3, 4]
];

const B = [
	[1, 0],
	[0, 1]
]

let g = [];

for (var i = 0; i < A.length; i++) {
	g[i] = [];
	for (var j = 0; j < A[i].length; j++) {
		for (var k = 0; k < A.length; k++) {
			g[i][j] = (g[i][j] || 0) + A[i][k] * B[k][j];
		}
	}
}

console.log(g);
