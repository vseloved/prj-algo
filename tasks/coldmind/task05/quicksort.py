import random


def qs(arr):
    left = []
    right = []
    if len(arr) < 2:
        return arr
    pivot = arr.pop()
    for el in arr:
        if el <= pivot:
            left.append(el)
        elif el > pivot:
            right.append(el)
    return qs(left) + [pivot] + qs(right)


def _partition(arr, begin_idx, end_idx):
    pivot = begin_idx
    for i in xrange(begin_idx + 1, end_idx + 1):
        if arr[i] <= arr[begin_idx]:
            pivot += 1
            arr[i], arr[pivot] = arr[pivot], arr[i]
    arr[pivot], arr[begin_idx] = arr[begin_idx], arr[pivot]
    return pivot


def _get_median_pivot_idx(arr, mode, begin_idx, end_idx):
    if mode == "m3":
        assert len(arr) >= 3
        first, middle, last = (
            (arr[begin_idx], begin_idx),
            (arr[(begin_idx + end_idx) // 2], (begin_idx + end_idx) // 2),
            (arr[end_idx], end_idx),
        )
        return sorted([first, middle, last], key=lambda x: x[0])[1][1]
    elif mode == "m9":
        raise NotImplementedError()
    else:
        raise NotImplementedError("Unknown mode.")


def qs_in_place(arr, begin_idx=0, end_idx="init"):
    if end_idx == "init":
        end_idx = len(arr) - 1
    if begin_idx >= end_idx:
        return arr
    pivot = _partition(arr, begin_idx, end_idx)
    qs_in_place(arr, begin_idx, pivot - 1)
    qs_in_place(arr, pivot + 1, end_idx)
    return arr


def qs_median(arr, begin_idx=0, end_idx="init", mode=None):
    if end_idx == "init":
        end_idx = len(arr) - 1
    if begin_idx >= end_idx:
        return arr
    median_idx = _get_median_pivot_idx(arr, mode, begin_idx, end_idx)
    arr[end_idx], arr[median_idx] = arr[median_idx], arr[end_idx]
    pivot = _partition(arr, begin_idx, end_idx)
    qs_median(arr, begin_idx, pivot - 1, mode=mode)
    qs_median(arr, pivot + 1, end_idx, mode=mode)
    return arr


assert qs([6, 4, 2, 2, 3, 3, 13, 10, 1, 7, 5, 8, 9]) == [1, 2, 2, 3, 3, 4, 5, 6, 7, 8, 9, 10, 13]
assert qs_in_place([6, 4, 2, 2, 3, 3, 13, 10, 1, 7, 5, 8, 9]) == [1, 2, 2, 3, 3, 4, 5, 6, 7, 8, 9, 10, 13]
assert qs_median([1, 4, 2, 2, 3, 3, 13, 10, 1, 7, 5, 8, 3], mode="m3") == [1, 1, 2, 2, 3, 3, 3, 4, 5, 7, 8, 10, 13]

for i in range(100):
     rarr = [random.randint(-10, 100) for i in range(100)]
     assert qs(rarr[:]) == sorted(rarr[:])
     assert qs_in_place(rarr[:]) == sorted(rarr[:])
     assert qs_median(rarr[:], mode="m3") == sorted(rarr[:])
