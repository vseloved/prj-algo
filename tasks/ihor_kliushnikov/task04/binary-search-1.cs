using System;
using System.Linq;

namespace ConsoleApplication1
{
    class Program
    {
        private static readonly Random Random = new Random();

        static void Main()
        {
            const int n = 10;
            var array = GetArray(n).OrderBy(i => i).ToArray();
            ArrayToConsole(array);

            var value = array[Random.Next(n)];
            Console.WriteLine("Looking for {0}", value);

            var index = BinarySearch(array, 0, array.Length - 1, value);
            Console.WriteLine("Index={0}", index);

            Console.ReadKey();
        }

        private static int BinarySearch(int[] array, int start, int end, int value)
        {
            while (true)
            {
                var mid = start + (end - start)/2;

                if (array[mid] == value)
                    return mid;
                if (array[mid] < value)
                {
                    start = mid;
                    continue;
                }
                end = mid;
            }
        }

        public static int[] GetArray(int n)
        {
            var result = new int[n];

            for (var i = 0; i < n; i++)
                result[i] = Random.Next(100);

            return result;
        }

        public static void ArrayToConsole<T>(T[] array)
        {
            Console.WriteLine(string.Join(" ", array.Select(i => string.Format("{0, 4}", i))));
        }
    }
}
