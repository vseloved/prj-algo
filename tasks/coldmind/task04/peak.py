def get_peak(matrix, left=0, right="init"):
    if right == "init":
        right = len(matrix[0])
    middle_col_idx = (left + right) // 2

    middle_row = [row[middle_col_idx] for row in matrix]
    global_max = max(middle_row)
    global_max_row_idx = middle_row.index(global_max)

    if (
        ((global_max_row_idx - 1) > 0 and global_max >= matrix[global_max_row_idx - 1][middle_col_idx]) and  # up
        ((global_max_row_idx + 1) < len(matrix) and global_max >= matrix[global_max_row_idx + 1][middle_col_idx]) and  # down
        ((middle_col_idx - 1) > 0 and global_max >= matrix[global_max_row_idx][middle_col_idx - 1]) and # left
        ((middle_col_idx + 1) < len(matrix[global_max_row_idx]) and global_max >= matrix[global_max_row_idx][middle_col_idx + 1]) # right
    ):
        return matrix[global_max_row_idx][middle_col_idx]
    elif (middle_col_idx + 1) < len(matrix[global_max_row_idx]) and matrix[global_max_row_idx][middle_col_idx + 1] > global_max:
        return get_peak(matrix, left=middle_col_idx, right=right)
    elif (middle_col_idx > 0) and matrix[global_max_row_idx][middle_col_idx - 1] > global_max:
        return get_peak(matrix, left=left, right=middle_col_idx)

    return global_max

matrix1 = [
    [0,  0,  9,  0,  48,  0,  0],
    [0,  0,  0,  -2,  0,  0,  0],
    [0,  1,  0,  0,  0,  0,  0],
    [0,  2,  0,  0,  0,  0,  0],
    [0,  3,  0,  0,  0,  0,  0],
    [0,  5,  0,  0,  0,  0,  0],
    [0,  4,  7,  -1,  0,  99,  145],
]
assert get_peak(matrix1) == 145

matrix2 = [
    [0,  0,  9,  0,  0,  0,  0],
    [0,  0,  0,  -2,  0,  0,  0],
    [0,  1,  0,  0,  0,  0,  0],
    [0,  2,  0,  0,  0,  0,  0],
    [0,  3,  0,  0,  0,  0,  0],
    [66,  15,  0,  0,  0,  0,  0],
    [0,  4,  7,  -1,  0,  99,  145],
]
assert get_peak(matrix2) == 66

matrix3 = [
    [0,  0,  9,    0,   0,  0,  0],
    [0,  0,  0,   -2,  0,  0,  0],
    [0,  1,  0,    0,   0,  0,  0],
    [0,  2,  0,    0,   0,  0,  0],
    [0,  3,  0,    0,   0,  0,  0],
    [0, 3,  0,    0,   0,  0,  0],
    [0,  4,  13,  12,  0,  99,  145],
]
assert get_peak(matrix3) == 13
