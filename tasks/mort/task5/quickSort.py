import statistics

def quick_sort(a):
    print(a)
    if len(a) < 2:
        return a

    left, right = partitioning(a)
    return quick_sort(left) + quick_sort(right)


def partitioning(a):
    left = []
    right = []
    pivot = get_pivot(a)
    # pivot = a[0]
    for j in range(1, len(a)):
        if a[j] >= pivot:
            right.append(a[j])
        else:
            left.append(a[j])
    left.append(pivot)
    return left, right


def get_pivot(a: list):
    l = len(a)
    if l >= 9:
        return statistics.median([a[i * (l // 9)] for i in range(9)])
    if l >= 3:
        return statistics.median([a[i * (l // 3)] for i in range(3)])
    return a[0]


def partitioning_inplace(a: list, s, e):
    i = s



def quick_sort_inplace(a: list, s, e):
    if e - s > 1:
        q = partitioning_inplace(a, s, e)
        quick_sort_inplace(a, s, q)
        quick_sort_inplace(a, q + 1, e)


a = [6, 2, 8, 6, 4, 7, 4, 4, 123, 14, 5, 52, 23]
print(quick_sort(a))