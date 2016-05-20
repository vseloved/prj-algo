using System;
using ConsoleApplication1.Helpers;

namespace ConsoleApplication1
{
    class Program
    {
        static void Main()
        {
            var array = Randomizer.GetArray(10);
            Writer.ArrayToConsole(array);

			// build tree
            var tree = new BinaryNode<int>(array[0]);
            for (var i = 1; i < array.Length; i++)
                tree.Insert(array[i]);

			// get sorted array
            var counter = 0;
            tree.InOrder(tree, el => array[counter++] = el);
            Writer.ArrayToConsole(array);

            Console.ReadKey();
        }

        internal class BinaryNode<T> where T : IComparable<T>
        {
            public BinaryNode(T value)
            {
                Value = value;
            }

            private BinaryNode<T> Left { get; set; }

            private T Value { get; set; }

            private BinaryNode<T> Right { get; set; }

            internal void Insert(T value)
            {
                var node = this;

                while (true)
                {
                    if (node.Value.CompareTo(value) > 0)
                    {
                        if (node.Left == null)
                            node.Left = new BinaryNode<T>(value);
                        else
                        {
                            node = node.Left;
                            continue;
                        }
                    }
                    else
                    {
                        if (node.Right == null)
                            node.Right = new BinaryNode<T>(value);
                        else
                        {
                            node = node.Right;
                            continue;
                        }
                    }
                    break;
                }
            }

            internal void InOrder(BinaryNode<T> node, Action<T> action)
            {
                if(node == null)
                    return;

                InOrder(node.Left, action);
                action(node.Value);
                InOrder(node.Right, action);
            }
        }
    }
}
