using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ConsoleApplication1
{
    public static class MergeSort
    {
        public static int[] SortWithThreads(int[] array)
        {
            var powerOfTwo = FloorPowerOfTwo(array.Length);
            var scale = ((float) array.Length)/powerOfTwo;

            for (var length = 1; length < powerOfTwo; length *= 2)
            {
                var tasks = new List<Task>();
                for (var merge = 0; merge < powerOfTwo; merge += length * 2)
                {
                    var start = Convert.ToInt32(merge*scale);
                    var mid = Convert.ToInt32((merge + length)*scale);
                    var end = Convert.ToInt32((merge + length*2)*scale);

                    var left = new int[mid - start];
                    Array.Copy(array, start, left, 0, mid - start);

                    var right = new int[end - mid];
                    Array.Copy(array, mid, right, 0, end - mid);
                    
                    // executes merge in a thread within ThreadPool
                    tasks.Add(Task.Run(() => Merge(array, left, right, start)));
                }

                // waits for all merge tasks to be completed
                Task.WaitAll(tasks.ToArray());
            }

            return array;
        }

        private static void Merge(int[] array, int[] sortedLeft, int[] sortedRight, int start)
        {
            var i = 0;
            var j = 0;

            var length = sortedLeft.Length + sortedRight.Length;

            for (var counter = 0; counter < length; counter++)
            {
                if (i == sortedLeft.Length)
                    array[start + counter] = sortedRight[j++];
                else if (j == sortedRight.Length)
                    array[start + counter] = sortedLeft[i++];
                else if (sortedLeft[i] <= sortedRight[j])
                    array[start + counter] = sortedLeft[i++];
                else
                    array[start + counter] = sortedRight[j++];
            }
        }

        private static int FloorPowerOfTwo(int x)
        {
            x--; // comment out to always take the next biggest power of two, even if x is already a power of two
            x |= (x >> 1);
            x |= (x >> 2);
            x |= (x >> 4);
            x |= (x >> 8);
            x |= (x >> 16);
            return (x + 1);
        }
    }
}