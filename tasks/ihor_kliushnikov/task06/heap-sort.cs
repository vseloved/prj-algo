using System;
using ConsoleApplication1.Helpers;

namespace ConsoleApplication1
{
    class Program
    {
        static void Main()
        {
            var array = Randomizer.GetArray(127);
            Writer.ArrayToConsole(array);

            var heap = new DataStructures.Heap(array);

            for (var i = array.Length - 1; i >= 0; i--)
                array[i] = heap.Pop();

            Writer.ArrayToConsole(array);

            Console.ReadKey();
        }
    }
}
