using System;

namespace ConsoleApplication1
{
    class Program
    {
        private static void Main()
        {
            var text = "ABC ABCDAB ABCDABCDABDE";
            var word = "ABCDABD";

            var T = new int[word.Length];
            int pos = 2, cnd = 0;
            T[0] = -1;

            while (pos < word.Length)
            {
                if (word[pos - 1] == word[cnd])
                    T[pos++] = ++cnd;
                else if (cnd > 0)
                    cnd = T[cnd];
                else
                    T[pos++] = 0;
            }

            int m = 0, i = 0;
            while (m + i < text.Length && i < word.Length)
            {
                if (word[i] == text[m + i])
                    i++;
                else
                {
                    m = m + i - T[i];
                    i = T[i] > -1
                        ? T[i]
                        : 0;
                }
            }

            Console.ReadKey();
        }
    }
}