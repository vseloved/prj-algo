using System;

namespace ConsoleApplication1
{
    public static class MergeSort
    {
        public static int[] LinkedListSort(int[] array)
        {
            // building linked-list
            StackItem<int> stack = null;
            for (var i = array.Length - 1; i >= 0; i--)
                stack = new StackItem<int>(array[i], stack);

            // sorting
            var sorted = LinkedListSortImpl(stack, array.Length);

            // building result
            var counter = 0;
            do
            {
                array[counter++] = sorted.Value;
                sorted = sorted.Next;
            } while (sorted != null);

            return array;
        }

        private static StackItem<int> LinkedListSortImpl(StackItem<int> stack, int length)
        {
            if (length <= 1)
                return stack;

            var leftLength = length/2;
            var rightLength = length - length/2;

            // Left - is the head of stack
            var left = stack;

            // Get right
            var counter = 1;
            while (counter < leftLength)
            {
                stack = stack.Next;
                counter++;
            }
			// remove connection between right and left sides
            var right = stack.Next;
            stack.Next = null;

            left = LinkedListSortImpl(left, leftLength);
            right = LinkedListSortImpl(right, rightLength);

            // Merge left and right
            return Merge(length, left, right);
        }

        private static StackItem<int> Merge(int totalLength, StackItem<int> left, StackItem<int> right)
        {
            StackItem<int> sorted;
            // choose the head
            if (left.Value <= right.Value)
            {
                sorted = left;
                left = left.Next;
                sorted.Next = null;
            }
            else
            {
                sorted = right;
                right = right.Next;
                sorted.Next = null;
            }

            // remember the link to the first item
            var first = sorted;
            
            // regular merging
            for (var counter = 1; counter < totalLength; counter++)
            {
                if (left == null)
                {
                    sorted.Next = right;
                    break;
                }
                if (right == null)
                {
                    sorted.Next = left;
                    break;
                }

                if (left.Value <= right.Value)
                {
                    sorted.Next = left;
                    left = left.Next;
                }
                else
                {
                    sorted.Next = right;
                    right = right.Next;
                }

                sorted = sorted.Next;
                sorted.Next = null;
            }

            return first;
        }
		
		class StackItem<T>
		{
			public StackItem(T value, StackItem<T> next = null)
			{
				Value = value;
				Next = next;
			}

			public T Value { get; private set; }
			public StackItem<T> Next { get; set; }
		}
    }
}