using System;
using System.Collections.Generic;

namespace ConsoleApplication1.DataStructures
{
    public class Heap
    {
        private int[] _array;
        private int _currentPointer;

        public Heap(int length = 10)
        {
            _array = new int[length];
            _currentPointer = 0;
        }

        public Heap(IReadOnlyCollection<int> array)
        {
            _array = new int[array.Count];
            _currentPointer = 0;

            foreach (var i in array)
                Push(i);

            ToConsole();
        }

        public void Push(int element)
        {
            // if the current array is full - double its length
            if (_array.Length - 1 == _currentPointer)
                ResizeArray();

            _array[_currentPointer] = element;
            
            var i = _currentPointer;
            var parentIndex = GetParentIndex(i);
            while (i > 0 && element > _array[parentIndex])
            {
                Swap(i, parentIndex);
                i = parentIndex;
                parentIndex = GetParentIndex(i);
            }

            _currentPointer++;
        }

        public int Pop()
        {
            if (_currentPointer == 0)
                throw new IndexOutOfRangeException("Heap is empty!");

            // move last element to the head
            var i = 0;
            _currentPointer--;
            Swap(i, _currentPointer);

            // remember previous head and reset last element to 0
            var popValue = _array[_currentPointer];
            _array[_currentPointer] = 0;

            while (true)
            {
                var left = GetLeftChildIndex(i);
                var right = GetRightChildIndex(i);

                // returns if left is out of the heap, or both child is less then parent
                if ((left >= _currentPointer) || 
                    (_array[i] >= _array[left] && _array[i] >= _array[right]))
                    break;

                var toSwap = (right >= _currentPointer || _array[left] >= _array[right])
                    ? left
                    : right;

                Swap(i, toSwap);
                i = toSwap;
            }
            return popValue;
        }

        public void ToConsole()
        {
            Console.WriteLine("*********************************************");

            var length = _currentPointer;
            if (length == 0)
                return;
            if (length == 1)
            {
                Console.WriteLine(_array[0]);
                return;
            }

            var rowsCount = Convert.ToInt32(Math.Ceiling(Math.Log(length + 1, 2)));
            var rowLength = Convert.ToInt32(Math.Pow(rowsCount, 2));
            var divider = 2;
            var arrayPosition = 0;

            for (var i = 1; i <= rowsCount; i++)
            {
                var multiplier = 1;
                var elementPosition = rowLength/divider;
                for (var j = 1; j <= rowLength; j++)
                {
                    if (j == elementPosition && _array[arrayPosition] > 0)
                    {
                        Console.Write("{0, 3}",_array[arrayPosition]);
                        arrayPosition++;
                        multiplier += 2;
                        elementPosition = multiplier*rowLength/divider;
                    }
                    else
                        Console.Write("   ");
                }

                divider *= 2;
                Console.WriteLine();
            }
        }

        public bool VerifyInvariant()
        {
            for (var child = 1; child < _currentPointer; child++)
            {
                var parent = GetParentIndex(child);
                if (_array[child] > _array[parent])
                    return false;
            }

            return true;
        }

        private static int GetParentIndex(int i)
        {
            return (i - 1)/2;
        }

        private static int GetLeftChildIndex(int i)
        {
            return 2*i + 1;
        }

        private static int GetRightChildIndex(int i)
        {
            return 2*i + 2;
        }

        private void ResizeArray()
        {
            var extended = new int[_array.Length * 2];

            Array.Copy(_array, extended, _array.Length);

            _array = extended;
        }

        private void Swap(int i, int j)
        {
            var temp = _array[i];
            _array[i] = _array[j];
            _array[j] = temp;
        }
    }
}