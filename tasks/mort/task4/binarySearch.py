from Tools.scripts.treesync import raw_input


def binary_search(needle: int, array: list, start: int = 0, end: int = None):
    end = end if end else len(array)
    length = end - start
    i = length // 2 + start
    print(start, end, i, array[start:end], array[i])
    raw_input('Press enter')
    if length == 1:
        if needle == array[i]:
            return i
        else:
            return False
    if needle > array[i]:
        return binary_search(needle, array, i + 1, end)
    else:
        return binary_search(needle, array, start, i)


print(binary_search(1, [1, 2, 3, 4, 5, 6, 7, 8, 9]))
