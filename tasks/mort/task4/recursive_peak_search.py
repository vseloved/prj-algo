def max_in_column(a: list, column):
    i = 0
    for j in range(1, len(a)):
        if a[i][column] < a[j][column]:
            i = j
    return i


def check_for_peak(a: list, row, column):
    val = a[row][column]
    if ((row == 0 or val > a[row - 1][column])
        and (row == len(a) - 1 or val > a[row + 1][column])
        and (column == 0 or val > a[row][column - 1])
        and (column == len(a[0]) or val > a[row][column + 1])):
        return True
    return False


def search_peak_rec(a: list, beg, end):
    print(beg, end)
    if beg == end:
        return max_in_column(a, beg)
    mid = (end - beg) // 2
    i = max_in_column(a, mid)
    print(i)
    if check_for_peak(a, i, mid):
        return i, mid
    if a[i][mid - 1] > a[i][mid + 1]:
        return search_peak_rec(a, beg, mid - 1)
    return search_peak_rec(a, mid + 1, end)


print(search_peak_rec([
    [0, 0, 9, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 8, 9],
    [0, 2, 0, 0, 0, 0, 0],
    [0, 3, 0, 0, 0, 0, 0],
    [0, 5, 0, 0, 0, 0, 0],
    [0, 4, 7, 0, 0, 0, 0]], 0, 6))
