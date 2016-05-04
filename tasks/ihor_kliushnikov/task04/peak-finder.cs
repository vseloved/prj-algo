using System;
using System.Linq;

namespace ConsoleApplication1
{
    class Program
    {
        static void Main()
        {
            var array = GetArray(10, 10);

            var start = 0;
            var end = array.Length - 1;

            while (true)
            {
                var mid = start + (end - start) / 2;

                var maxInColumn = FindMaxInColumn(array, mid);
                if (array[maxInColumn][mid] < array[maxInColumn][mid + 1] &&
                    array[maxInColumn][mid - 1] < array[maxInColumn][mid + 1])
                {
                	// looking in the right half
                    start = mid + 1;
                }
                else if (array[maxInColumn][mid] < array[maxInColumn][mid - 1] &&
                         array[maxInColumn][mid + 1] <= array[maxInColumn][mid - 1])
                {
                	// looking in the left half
                    end = mid - 1;
                }
                else
                {
                    ArrayToConsole(array);
                    Console.WriteLine("Peak is {0} at [{1},{2}]", array[maxInColumn][mid], maxInColumn, mid);

                    break;
                }
            }

            Console.ReadKey();
        }

        private static int[][] GetArray(int n, int m)
        {
            var r = new Random();
            var result = new int[n][];

            for (var i = 0; i < n; i++)
            {
                result[i] = new int[m];
                for (var j = 0; j < m; j++)
                    result[i][j] = r.Next(10);
            }

            return result;
        }

        private static void ArrayToConsole<T>(T[][] array)
        {
            for (var i = 0; i < array.Length; i++)
            {
                Console.ForegroundColor = (i % 2) == 0 ? ConsoleColor.Green : ConsoleColor.White;
                Console.WriteLine(string.Join(" ", array[i].Select(j => string.Format("{0, 4}", j))));
            }
        } 

        private static int FindMaxInColumn(int[][] array, int column)
        {
            var result = 0;
            var max = 0;
            
            // skips first and last elements, because we are not considering borders
            for (var i = 1; i < array.Length - 1; i++)
            {
                if (array[i][column] > max)
                {
                    result = i;
                    max = array[i][column];
                }
            }

            return result;
        }
    }
}
