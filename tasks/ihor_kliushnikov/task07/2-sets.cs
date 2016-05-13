using System.Collections.Generic;

namespace ConsoleApplication1.DataStructures
{
    public class Set
    {
        public Set(int[] array)
        {
            Values = array;
        }

        public readonly int[] Values;

        public IEnumerable<int> Union(Set otherSet)
        {
            var other = otherSet.Values;
            var j = 0;

            foreach (var a in Values)
            {
                while (j < other.Length && a >= other[j])
                {
                    if (a != other[j])
                        yield return other[j];
                    j++;
                }

                yield return a;
            }

            for (var i = j; i < other.Length; i++)
                yield return other[i];
        }

        public IEnumerable<int> Intersection(Set otherSet)
        {
            var other = otherSet.Values;
            var j = 0;

            foreach (var a in Values)
            {
                while (j < other.Length - 1 && a > other[j])
                    j++;

                if (a == other[j])
                    yield return a;
            }
        }

        public IEnumerable<int> Complement(Set otherSet)
        {
            var other = otherSet.Values;
            var j = 0;

            foreach (var a in Values)
            {
                while (j < other.Length - 1 && a > other[j])
                    j++;

                if (a != other[j])
                    yield return a;
            }
        }
    }
}