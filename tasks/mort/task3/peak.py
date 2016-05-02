def find_peak_brut_force1(a: list):
    for i in range(1, len(a) - 1):
        if a[i - 1] <= a[i] >= a[i + 1]:
            return True, i, a[i]
    return False


print(find_peak_brut_force1([3, 2, 9, 5, 6]))
print(find_peak_brut_force1([3, 2, 1, 5, 6]))


def find_peak_brut_force2(a: list):
    for i in range(1, len(a) - 1):
        for j in range(1, len(a[i]) - 1):
            if a[i][j - 1] <= a[i][j] >= a[i][j + 1] and a[i - 1][j] <= a[i][j] >= a[i + 1][j]:
                return True, i, j, a[i][j]
    return False


print(find_peak_brut_force2([
    [1, 4, 5, 6],
    [2, 3, 8, 7],
    [5, 4, 6, 7]
]))
print(find_peak_brut_force2([
    [1, 4, 5, 6],
    [2, 3, 3, 7],
    [5, 4, 6, 7]
]))
