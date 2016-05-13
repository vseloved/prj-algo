using System;
using System.Linq;

namespace ConsoleApplication1
{
    class Program
    {
        static void Main()
        {
            var array = GetArray(1000);
            Console.WriteLine(string.Join(" ", array.Select(i => string.Format("{0, 4}", i))));

            Sort9Median(array, 0, array.Length - 1);
            Console.WriteLine();
            Console.WriteLine(string.Join(" ", array.Select(i => string.Format("{0, 4}", i))));

            Console.ReadKey();
        }

        private static void Sort9Median(int[] array, int start, int end)
        {
            if ((end - start) <= 0)
                return;

            // set pivot to the end of array
            var medianPivot = Get9MedianPivot(array, start, end);
            Swap(array, medianPivot, end);
            var k = start;

            for (var i = start; i < end; i++)
                if (array[i] < array[end])
                {
                    Swap(array, k, i);
                    k++;
                }

            // Set pivot to correct place
            Swap(array, k, end);

            Sort9Median(array, start, k - 1); // LEFT
            Sort9Median(array, k + 1, end); // RIGHT
        }

        private static int Get9MedianPivot(int[] array, int start, int end)
        {
            var length = (end - start);
            var mid = start + length / 2;

            // return middle, for small arrays
            if (length < 7)
                return mid;

            var first = start;
            var last = end;

            // return median of 9th for large arrays, otherwise - median of first, mid and last
            if (length > 40)
            {
                var multiplier = length / 8;
                first = GetMid(array, start, start + multiplier, start + multiplier * 2);
                mid = GetMid(array, start + multiplier * 3, start + multiplier * 4, start + multiplier * 5);
                last = GetMid(array, start + multiplier * 6, start + multiplier * 7, end);
            }

            return GetMid(array, first, mid, last);
        }

        private static int GetMid(int[] array, int first, int second, int third)
        {
            if (array[second] > array[first])
                return array[second] > array[third] ? third : second;
            return array[first] > array[third] ? third : first;
        }

        private static void Swap(int[] array, int k, int i)
        {
            if (k == i)
                return;

            var temp = array[k];
            array[k] = array[i];
            array[i] = temp;
        }

        private static int[] GetArray(int n)
        {
            var r = new Random();
            var result = new int[n];

            for (var i = 0; i < n; i++)
                result[i] = r.Next(1, 100);

            return result;
        }
    }
}
