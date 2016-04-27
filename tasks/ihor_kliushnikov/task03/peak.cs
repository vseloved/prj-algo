using System;
using System.Collections.Generic;
using System.Linq;

namespace ConsoleApplication1
{
    class Program
    {
        static void Main()
        {
            var matrix = GetRandomMatrix(10, 10);

            foreach (var row in matrix)
                Console.WriteLine(string.Join(" ", row.Select(i => string.Format($"{i,4}"))));

            if (!FindPeak(matrix))
                Console.WriteLine("No Peak!");

            Console.ReadKey();
        }

        private static int[][] GetRandomMatrix(int n, int m)
        {
            var random = new Random();
            var result = new int[n][];

            for (var i = 0; i < n; i++)
            {
                result[i] = new int[m];
                for (var j = 0; j < m; j++)
                    result[i][j] = random.Next(20);
            }

            return result;
        }

        private static bool FindPeak(int[][] matrix)
        {
            var n = matrix.Length;
            var m = matrix.First().Length;
            for (var i = 1; i < n - 1; i++)
                for (var j = 1; j < m - 1; j++)
                    if (matrix[i][j] >= matrix[i - 1][j] &&
                        matrix[i][j] >= matrix[i + 1][j] &&
                        matrix[i][j] >= matrix[i][j - 1] &&
                        matrix[i][j] >= matrix[i][j + 1])
                    {
                        Console.WriteLine($"Peak at {i},{j}. Value={matrix[i][j]}");
                        return true;
                    }

            return false;
        }
    }
}
