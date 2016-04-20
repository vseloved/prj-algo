using System;
using System.Collections.Generic;
using System.Linq;

namespace ConsoleApplication1
{
    class Program
    {
        static void Main()
        {
            Permutations.Add("A", new List<bool> { true, true, false, false });
            Permutations.Add("B", new List<bool> { true, false, true, false });
            Recursive(new List<bool>(), 4);

            Console.WriteLine(string.Join(" | ", Permutations.Keys.Select(i => $"{i,5}")));
            Console.WriteLine(string.Join("", new bool[150].Select(i => "-")));
            Console.WriteLine(string.Join(" | ", Permutations.Values.Select(i => $"{i[0],5}")));
            Console.WriteLine(string.Join(" | ", Permutations.Values.Select(i => $"{i[1],5}")));
            Console.WriteLine(string.Join(" | ", Permutations.Values.Select(i => $"{i[2],5}")));
            Console.WriteLine(string.Join(" | ", Permutations.Values.Select(i => $"{i[3],5}")));

            Console.ReadKey();
        }

        private static readonly bool[] AvailableElements = { true, false };
        private static readonly Dictionary<string, List<bool>> Permutations = new Dictionary<string, List<bool>>();

        private static void Recursive(List<bool> currentTuple, int length)
        {
            if (currentTuple.Count() < length)
                foreach (var b in AvailableElements)
                {
                    var bools = new List<bool>(currentTuple) {b};
                    Recursive(bools, length);
                }
            else
            {
                Permutations.Add(GetName(currentTuple), currentTuple);
            }
        }

        private static string GetName(List<bool> tuple)
        {
            if (IsTrueForAll(tuple, (a, b, i) => i))
                return "TRUE";
            if (IsTrueForAll(tuple, (a, b, i) => !i))
                return "FALSE";
            if (IsTrueForAll(tuple, (a, b, i) => (a || b) == i))
                return "OR";
            if (IsTrueForAll(tuple, (a, b, i) => (a ^ b) == i))
                return "XOR";
            if (IsTrueForAll(tuple, (a, b, i) => (a && b) == i))
                return "AND";
            if (IsTrueForAll(tuple, (a, b, i) => !a == i))
                return "!A";
            if (IsTrueForAll(tuple, (a, b, i) => !b == i))
                return "!B";
            if (IsTrueForAll(tuple, (a, b, i) => !(a || b) == i))
                return "!OR";
            if (IsTrueForAll(tuple, (a, b, i) => !(a && b) == i))
                return "!AND";
            if (IsTrueForAll(tuple, (a, b, i) => a == i))
                return "(A)";
            if (IsTrueForAll(tuple, (a, b, i) => b == i))
                return "(B)";
            if (IsTrueForAll(tuple, (a, b, i) => !(a ^ b) == i))
                return "!XOR";
            if (IsTrueForAll(tuple, (a, b, i) => (!a || b) == i))
                return "!A||B";
            if (IsTrueForAll(tuple, (a, b, i) => (a || !b) == i))
                return "A||!B";
            if (IsTrueForAll(tuple, (a, b, i) => (!a && b) == i))
                return "!A&&B";
            if (IsTrueForAll(tuple, (a, b, i) => (a && !b) == i))
                return "A&&!B";

            return string.Join("", tuple.Select(i => i ? "T" : "F"));
        }

        private static bool IsTrueForAll(IEnumerable<bool> tuple, Func<bool, bool, bool, bool> predicate)
        {
            return tuple
                .Select((t, i) => predicate(Permutations["A"][i], Permutations["B"][i], t))
                .All(result => result);
        }
    }
}
