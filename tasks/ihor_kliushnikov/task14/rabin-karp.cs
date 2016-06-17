using System;

namespace ConsoleApplication1
{
    class Program
    {
        private static void Main()
        {
            var text = "ABC ABCDAB ABCDABCDABDE";
            var word = "ABCDABD";
            var n = text.Length;
            var m = pattern.Length;

            var patternHash = pattern.GetHashCode();

            for (var i = 0; i < n - m + 1; i++)
            {
                var substring = text.Substring(i, m);
                if (substring.GetHashCode() == patternHash && substring == pattern)
                {
                    Console.WriteLine(i);
                    break;
                }
            }

            Console.ReadKey();
        }
    }
}