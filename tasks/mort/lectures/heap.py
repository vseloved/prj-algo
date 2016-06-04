from math import ceil, log


def get_parent(i):
    return (i - 1) // 2


def get_left(i):
    return (i + 1) * 2 - 1


def get_right(i):
    return (i + 1) * 2


def heap_push(node, heap: list):
    heap.append(node)
    heap_up(heap, len(heap) - 1)


def heap_pop(heap: list):
    max_node = heap[0]
    heap[0] = heap[-1]
    heap.pop()
    heap_down(heap, 0)
    return max_node


def heap_up(heap, begin):
    if begin == 0:
        return
    parent_i = get_parent(begin)
    if heap[begin] > heap[parent_i]:
        heap[begin], heap[parent_i] = heap[parent_i], heap[begin]
        heap_up(heap, parent_i)


def heap_down(heap, begin):
    len_heap = len(heap) - 1
    left_index = get_left(begin)
    right_index = get_right(begin)

    if len_heap < left_index: return
    if len_heap == left_index:
        if heap[begin] < heap[left_index]:
            heap[begin], heap[left_index] = heap[left_index], heap[begin]
        return
    if heap[begin] < heap[left_index] > heap[right_index]:
        heap[begin], heap[left_index] = heap[left_index], heap[begin]
        heap_down(heap, left_index)
        return
    if heap[begin] < heap[right_index] > heap[left_index]:
        heap[begin], heap[right_index] = heap[right_index], heap[begin]
        heap_down(heap, right_index)
        return


def heap_sort(l: list):
    heap = []
    result = []
    for e in l:
        heap_push(e, heap)
    while len(heap) > 0:
        result.append(heap_pop(heap))
    return result


def draw_heap(heap: list):
    levels = get_levels(heap)
    max_level = ceil(log(len(heap), 2))
    for level in levels:
        # if level != max_level:
        #     print('  ' * round(max_level * 2 / level), sep='', end='')
        # for element in levels[level]:
        #     print(element, '  ' * round(max_level * 2), sep='', end='')
        # print()



def get_levels(heap: list, index=0, level=1, d={1: []}):
    l = len(heap) - 1
    d[level].append(heap[index])

    left = get_left(index)
    right = get_right(index)

    if left <= l:
        if not((level + 1 ) in d.keys()):
            d[level + 1] = []
        get_levels(heap, left, level + 1, d)

    if right <= l:
        get_levels(heap, right, level + 1, d)

    return d


heap = [10, 8, 1, 3, 5]
# print(heap)
# heap_pop(heap)
# print(heap)
heap_push(11, heap)
heap_push(31, heap)
heap_push(8, heap)
heap_push(0, heap)
heap_push(9, heap)
heap_push(5, heap)
heap_push(8, heap)
# print(heap)
# heap_pop(heap)
# print(heap)
heap_push(1, heap)
# print(heap)

# print(heap_sort([4, 6, 7, 3]))
print(heap)
draw_heap(heap)