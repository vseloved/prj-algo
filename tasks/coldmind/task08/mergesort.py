import random


def mergesort(arr):
    if len(arr) <= 1:
        return arr
    res = []
    middle_idx = len(arr) // 2
    left = mergesort(arr[:middle_idx])
    right = mergesort(arr[middle_idx:])
    while len(left) and len(right):
        if left[0] <= right[0]:
            res.append(left.pop(0))
        else:
            res.append(right.pop(0))
    res.extend(left)
    res.extend(right)
    return res

for i in range(100):
     rarr = [random.randint(-10, 100) for i in range(100)]
     assert mergesort(rarr[:]) == sorted(rarr[:])
