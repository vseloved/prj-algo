def selection_sort(a):
    print(a)
    lenA = len(a)
    for key in range(0, lenA - 1):
        if a[key] > a[key + 1]:
            temp = a[key + 1]
            a[key + 1] = a[key]
            a[key] = temp
            for rkey in range(key, 1, -1):
                if a[rkey] < a[rkey - 1]:
                    temp = a[rkey - 1]
                    a[rkey - 1] = a[rkey]
                    a[rkey] = temp
                else:
                    break
        print(a)

a = [2, 8, 6, 4, 7, 4, 4, 123, 14, 5, 52, 23]
selection_sort(a)
print(a)
