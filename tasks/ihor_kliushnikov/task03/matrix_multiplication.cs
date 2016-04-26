using System;
using System.Linq;

namespace ConsoleApplication1
{
    class Program
    {
        static void Main()
        {
            // I'm using array of arrays (int[][]) instead of 2-dimensional array (int[,]) 
            // due to huge performance issues with two-dimensional arrays in C#
            var matrix = MatrixMultiplication(GetA(), GetB());

            foreach (var row in matrix)
                Console.WriteLine(string.Join(" ", row));

            Console.ReadKey();
        }

        private static int[][] GetA()
        {
            return new[]
            {
                new[] {1, 2},
                new[] {3, 4}
            };
        }

        private static int[][] GetB()
        {
            return new[]
            {
                new[] {1, 0},
                new[] {0, 1}
            };
        }

        private static int[][] MatrixMultiplication(int[][] a, int [][] b)
        {
            var result = new[]
            {
                new[] {0, 0},
                new[] {0, 0}
            };

            // expects each row has same size
            var length = a.First().Length;
            for (var i = 0; i < a.Length; i++)
                for (var j = 0; j < b.Length; j++)
                    for (var k = 0; k < length; k++)
                        result[i][j] += a[i][k] * b[k][j];

            return result;
        }
    }
}
