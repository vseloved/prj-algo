import random


def insertion_sort(arr):
    for i, el in enumerate(arr):
        j = i
        while(j > 0 and arr[j - 1] > arr[j]):
            arr[j], arr[j - 1] = arr[j - 1], arr[j]
            j -= 1
    return arr


for i in range(100):
     rarr = [random.randint(-10, 100) for i in range(100)]
     print rarr, insertion_sort(rarr[:])
     assert insertion_sort(rarr[:]) == sorted(rarr[:])
