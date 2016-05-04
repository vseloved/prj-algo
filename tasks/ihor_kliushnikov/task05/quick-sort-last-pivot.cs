using System;
using System.Linq;

namespace ConsoleApplication1
{
    class Program
    {
        static void Main()
        {
            var array = GetRandomArray(20);
            WriteArrayConsole(array);

            QuickSort(array, 0, array.Length - 1);
            WriteArrayConsole(array);

            Console.ReadKey();
        }

        private static void QuickSort(int[] array, int start, int end)
        {
            if ((end - start) <= 0)
                return;

            var pivot = array[end];
            var k = start;

            for (var i = start; i < end; i++)
                if (array[i] < pivot)
                {
                    Swap(array, k, i);
                    k++;
                }

            // Set pivot to correct place
            Swap(array, k, end);

            QuickSort(array, start, k - 1); // LEFT
            QuickSort(array, k + 1, end); // RIGHT
        }

        private static void Swap(int[] array, int k, int i)
        {
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
