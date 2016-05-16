def search_peak(a: list):
    i = len(a) // 2
    if a[i - 1] <= a[i] >= a[i + 1]:
        return True, a[i]
    return search_peak(a)