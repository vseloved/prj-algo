using System;

namespace ConsoleApplication1
{
    public class MergeSort
    {
        public static int[] Sort(int[] array)
        {
            if (array.Length <= 1)
                return array;

            var mid = array.Length / 2;

            var left = new int[mid];
            Array.Copy(array, left, mid);

            var right = new int[array.Length - mid];
            Array.Copy(array, mid, right, 0, array.Length - mid);

            var sortedLeft = Sort(left);
            var sortedRight = Sort(right);

            // Merging
            var i = 0;
            var j = 0;

            for (var counter = 0; counter < array.Length; counter++)
            {
                if (i == sortedLeft.Length)
                    array[counter] = sortedRight[j++];
                else if(j == sortedRight.Length)
                    array[counter] = sortedLeft[i++];
                else if (sortedLeft[i] <= sortedRight[j])
                    array[counter] = sortedLeft[i++];
                else
                    array[counter] = sortedRight[j++];
            }
            return array;
        }
    }
}