using System;
using System.Linq;

namespace ConsoleApplication1
{
    class Program
    {
        static void Main()
        {
            var array = GetRandomArray(40);
            WriteArrayConsole(array);

            QuickSort(array, 0, array.Length - 1);
            WriteArrayConsole(array);

            Console.ReadKey();
        }

        private static void QuickSort(int[] array, int start, int end)
        {
            if ((end - start) <= 0)
                return;

            var medianPivot = Get3MedianPivot(array, start, end);
            // sets pivot to the end of array
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

            QuickSort(array, start, k - 1); // LEFT
            QuickSort(array, k + 1, end); // RIGHT
        }

        private static int Get3MedianPivot(int[] array, int first, int last)
        {
            var firstElement = array[first];
            var lastElement = array[last];
            var mid = first + (last - first) / 2;
            var midElement = array[mid];

            if (midElement > firstElement)
                return midElement > lastElement ? last : mid;
            return firstElement > lastElement ? last : first;
        }

        private static void Swap(int[] array, int k, int i)
        {
            if (k == i)
                return;

            var temp = array[k];
            array[k] = array[i];
            array[i] = temp;
        }

        private static int[] GetRandomArray(int n)
        {
            var r = new Random();
            var result = new int[n];

            for (var i = 0; i < n; i++)
                result[i] = r.Next(100);

            return result;
        }

        private static void WriteArrayConsole(int[] array)
        {
            Console.WriteLine(string.Join(" ", array.Select(i => string.Format("{0, 4}", i))));
        }
    }
}
