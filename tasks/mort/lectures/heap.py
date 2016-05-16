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
    heap[0] = heap[:-1]
    heap.pop()
    heap_down(heap, 0)


def heap_up(heap, begin):
    if begin == 0: return
    parent_i = get_parent(begin)
    if heap[begin] > heap[parent_i]:
        heap[begin], heap[parent_i] = heap[parent_i], heap[begin]
        heap_up(heap, parent_i)
    else:
        return


def heap_down(heap, begin):
    len_heap = len(heap) - 1
    left_index = get_left(begin)
    right_index = get_right(begin)

    if len_heap < left_index: return
    if len_heap == left_index:
        if heap[begin] > heap[left_index]:
            heap[begin], heap[left_index] = heap[left_index], heap[begin]
        return
    # if


heap = [10, 8, 1, 3, 5]
heap_push(9, heap)
print(heap)
