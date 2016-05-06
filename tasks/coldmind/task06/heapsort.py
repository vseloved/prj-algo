import math
import random


def hparent(n):
    if n == 0:
        return -1
    return (n - 1) // 2


def hleft(n):
    return ((n + 1) * 2) - 1


def hright(n):
    return (n + 1) * 2


def heap_up(heap, idx):
    parent_idx = hparent(idx)
    if parent_idx == -1:
        return
    if heap[parent_idx] < heap[idx]:
        heap[parent_idx], heap[idx] = heap[idx], heap[parent_idx]
        return heap_up(heap, hparent(idx))
    return heap


def heap_down(heap, n):
    left = hleft(n)
    right = hright(n)
    largest = n
    if left <= (len(heap) - 1) and heap[left] > heap[largest]:
        largest = left
    if right <= (len(heap) - 1) and heap[right] > heap[largest]:
        largest = right
    if largest != n:
        heap[n], heap[largest] = heap[largest], heap[n]
        return heap_down(heap, largest)


def heap_push(heap, node):
    heap.append(node)
    heap_up(heap, len(heap) - 1)
    return heap


def heap_pop(heap):
    if(len(heap) < 0):
        raise ValueError("Empty heap")
    heap[0], heap[len(heap) - 1] = heap[len(heap) - 1], heap[0]
    max_val = heap.pop()
    heap_down(heap, 0)
    return max_val


def make_heap(arr, heap):
    for el in arr:
        heap_push(heap, el)
    return heap


def is_heap(arr, i, el_count):
    if i > (el_count - 2) / 2:
        return True
    if (
        arr[i] >= arr[2 * i + 1] and
        arr[i] >= arr[2 * i + 2] and
        is_heap(arr, 2 * i + 1, el_count) and
        is_heap(arr, 2 * i + 2, el_count)
    ):
        return True
    return False


def visualize_heap(heap, width=48, fill_with="."):
    """
    Example output:
    .......................10.......................
    ...........8.......................9............
    .....7...........3...........5...........8......
    """
    result_str = ""
    last_row = -1
    for i, n in enumerate(heap):
        row = int(math.log(i + 1, 2))
        if row != last_row:
            result_str += "\n"
        last_row = row
        columns = 2**row
        col_width = int(math.floor((width * 1.0) / columns))
        result_str += str(n).center(col_width, fill_with)
    print(result_str)
    return result_str


def heapsort(arr):
    heap = make_heap(arr, [])
    while(len(heap)):
        assert is_heap(heap, 0, len(heap) - 1)
        yield heap_pop(heap)


heap1 = [10, 8, 8, 7, 3, 5]
heap_push(heap1, 9)
assert heap1 == [10, 8, 9, 7, 3, 5, 8]
visualize_heap(heap1)
print("\n\n")

heap2 = [10, 8, 9, 7, 3, 5, 8, 7]
heap_push(heap2, 9)
assert heap2 == [10, 9, 9, 8, 3, 5, 8, 7, 7]
visualize_heap(heap2)
print("\n\n")

heap3 = []
heap3 = make_heap([1, 3, 5, 7, 7, 8, 8, 9, 9, 10], heap3)
assert heap3 == [10, 9, 8, 8, 9, 3, 7, 1, 7, 5]
visualize_heap(heap3)
print("\n\n")

heap4 = [12, 8, 11, 7, 3, 5]
assert heap_pop(heap4) == 12
assert heap4 == [11, 8, 5, 7, 3]
visualize_heap(heap4)
print("\n\n")

arr1 = [0, -5, -23, 19, 6, 3, 6, 6, 7, 1, 0, 9, 1, 5, 7, 3, 3, 2]
assert list(heapsort(arr1[:])) == sorted(arr1[:], reverse=True)

for i in range(1000):
    rarr = [random.randint(-10, 100) for i in range(30)]
    assert list(heapsort(rarr[:])) == sorted(rarr[:], reverse=True)
