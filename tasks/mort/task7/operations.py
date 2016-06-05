def intersection(a: list, b: list):
    i = 0
    j = 0
    result = []
    while (i < len(a)) and (j < len(b)):
        if a[i] == b[j]:
            result.append(a[i])
            i += 1
            j += 1
            continue
        if a[i] > b[j]:
            j += 1
            continue
        if a[i] < b[j]:
            i += 1

    return result


def union(a: list, b: list):
    i = 0
    j = 0
    result = []
    while (i < len(a)) and (j < len(b)):
        if a[i] == b[j]:
            result.append(a[i])
            i += 1
            j += 1
            continue
        if a[i] > b[j]:
            result.append(b[j])
            j += 1
            continue
        if a[i] < b[j]:
            result.append(a[i])
            i += 1

    if i < len(a):
        result += a[i:]
    if j < len(b):
        result += b[j:]

    return result


def difference(a: list, b: list):
    i = 0
    j = 0
    result = []
    while (i < len(a)) and (j < len(b)):
        if a[i] == b[j]:
            i += 1
            j += 1
            continue
        if a[i] > b[j]:
            result.append(b[j])
            j += 1
            continue
        if a[i] < b[j]:
            result.append(a[i])
            i += 1

    if i < len(a):
        result += a[i:]

    return result


print(intersection([3, 4, 5, 7], [1, 2, 3, 5, 11, 33]))
print(union([3, 4, 5, 7], [1, 2, 3, 5, 11, 33]))
print(difference([3, 4, 5, 7], [1, 2, 3, 5, 11, 33]))
print(difference([1, 2, 3, 5, 11, 33], [3, 4, 5, 7]))