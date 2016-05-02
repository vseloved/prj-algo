def quick_sort(a):
    print(a)
    if len(a) < 2:
        return a
    if len(a) == 2:
        if a[0] > a[1]:
            a[0], a[1] = a[1], a[0]
        return a

    left, right = partitioning(a)
    return quick_sort(left) + quick_sort(right)


def partitioning(a):
    left = []
    right = []
    for j in range(1, len(a)):
        if a[j] >= a[0]:
            right.append(a[j])
        else:
            left.append(a[j])
    left.append(a[0])
    return left, right
a = [6, 2, 8, 6, 4, 7, 4, 4, 123, 14, 5, 52, 23]
print(quick_sort(a))