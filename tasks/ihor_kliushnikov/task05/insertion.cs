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

            InsertionSort(array);
            WriteArrayConsole(array);

            Console.ReadKey();
        }

        private static void InsertionSort(int[] array)
        {
            for (var i = 0; i < array.Length; i++)
            {
                var element = array[i];
                for (var j = i - 1; j >= 0; j--)
                {
                    if (element >= array[j])
                        break;

                    var temp = array[j];
                    array[j] = element;
                    array[j + 1] = temp;
                }
            }
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
