def selection_sort(a):
    for key in range(0, len(a) - 1):
        if a[key] > a[key + 1]:
            a[key], a[key + 1] = a[key + 1], a[key]
            for rkey in range(key, 1, -1):
                if a[rkey] < a[rkey - 1]:
                    a[rkey - 1], a[rkey] = a[rkey], a[rkey - 1]
                else:
                    break

a = [2, 8, 6, 4, 7, 4, 4, 123, 14, 5, 52, 23]
selection_sort(a)
print(a)
