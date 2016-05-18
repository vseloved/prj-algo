def selection_sort(a):
    for key in range(1, len(a)):
        for rkey in range(key, 0, -1):
            if a[rkey] < a[rkey - 1]:
                a[rkey - 1], a[rkey] = a[rkey], a[rkey - 1]
            else:
                break

a = [77, 8, 6, 4, 7, 4, 4, 123, 14, 5, 52, 23]
selection_sort(a)
print(a)