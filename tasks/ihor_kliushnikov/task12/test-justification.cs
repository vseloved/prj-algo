using System;
using System.IO;
using System.Linq;

namespace ConsoleApplication1
{
    class Program
    {
        private static void Main()
        {
            const int maxWidth = 80;
            var strings = File
                .ReadAllText(@"C:\Users\Igor\Desktop\test.txt")
                .Split(new [] {" "}, StringSplitOptions.RemoveEmptyEntries);

            var wordsLength = strings.Select(i => i.Length).ToArray();
            var n = wordsLength.Length;

            var dp = new int[n];
            var path = new int[n];

            for (var i = n - 2; i >= 0; i--)
            {
                var min = int.MaxValue;
                var pathFinder = n - 1;
                for (var j = i + 1; j < n; j++)
                {
                    var substring = wordsLength[i];
                    for (var k = i + 1; k < j; k++)
                    {
                        substring += wordsLength[k] + 1;
                        if(substring > maxWidth)
                            goto saveBestResult; // current string legth exceeded allowed limit - exit from cycle
                    }

                    var newMinValue = dp[j] + Badness(substring);
                    if (newMinValue >= min) 
                        continue;
                    
                    // new minimum was found - remember it and path to it
                    min = newMinValue;
                    pathFinder = j;
                }

            saveBestResult:
                dp[i] = min;
                path[i] = pathFinder;
            }

            WriteResult(strings, path);
        }

        private static void WriteResult(string[] words, int[] path)
        {
            var next = path[0];
            var counter = 0;

            while (counter < words.Length)
            {
                Console.Write(words[counter] + " ");
                if (next != ++counter) 
                    continue;
                next = path[counter];
                Console.WriteLine();
            }
        }

        private static int Badness(int substring)
        {
            var length = maxWidth - substring;
            return length*length*length;
        }
    }
}