def mmul(a, b):
    m = len(a)
    n = len(b)
    q = len(b[0])
    result = [[0 for x in range(q)] for y in range(m)]
    for i in range(m):
        for j in range(q):
            for r in range(n):
                result[i][j] += a[i][r] * b[r][j]
    return result

print(mmul(
    [
        [1, 2],
        [3, 4],
        [5, 6]
    ],
    [
        [7,   8,  9, 10],
        [11, 12, 13, 14]
    ]
))