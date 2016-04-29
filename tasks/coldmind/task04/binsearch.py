def binsearch(arr, n, start_from, end):
    if start_from > end:
        return -1
    middle_idx = start_from + (end - start_from) // 2
    middle_el = arr[middle_idx]
    if middle_el == n:
        return middle_idx
    if middle_el < n:
        return binsearch(arr, n, middle_idx + 1, end)
    else:
        return binsearch(arr, n, start_from, middle_idx - 1)


arr = range(0, 150000, 20)
assert binsearch(arr, 9000, 0, len(arr)) == 450
assert binsearch(arr, 666, 0, len(arr)) == -1
