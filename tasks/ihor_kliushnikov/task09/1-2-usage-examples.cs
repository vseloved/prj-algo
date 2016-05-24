using System;
using System.Collections;

namespace ConsoleApplication1
{
    class Program
    {
        static void Main()
        {
            TestNodeTree();
            Console.WriteLine();
            Console.WriteLine();
            TestListTree();
            Console.WriteLine();
            Console.WriteLine();
            TestArrayTree();

            Console.ReadKey();
        }

        private static void TestNodeTree()
        {
            var root = new Node<char>(
                'A',
                new[]
                {
                    new Node<char>(
                        'B',
                        new[]
                        {
                            new Node<char>('D'), 
                            new Node<char>('E', new[] {new Node<char>('H')}), 
                            new Node<char>('F')
                        }),
                    new Node<char>(
                        'C', 
                        new[] {new Node<char>('G')})
                });
            var nodeTree = new NodeTree<char>(root);
            nodeTree.DepthFirst(Console.WriteLine);
            Console.WriteLine();
            nodeTree.BreadthFirst(Console.WriteLine);
        }

        private static void TestListTree()
        {
            var list = new ArrayList
            {
                'A',
                new ArrayList
                {
                    'B',
                    new ArrayList {'D'},
                    new ArrayList {'E', new ArrayList {'H'}},
                    new ArrayList {'F'}
                },
                new ArrayList
                {
                    'C',
                    new ArrayList {'G'}
                }
            };
            var listTree = new ListTree<char>(list);
            listTree.DepthFirst(Console.WriteLine);
            Console.WriteLine();
            listTree.BreadthFirst(Console.WriteLine);
        }

        private static void TestArrayTree()
        {
            const char c = default(char);
            var arrayTree = new ArrayTree<char>(new[]
            {
                'A',
                'B', 'C', c,
                'D', 'E', 'F', 'G', c, c, c, c, c,
                c, c, c, 'H', c, c, c, c, c, c, c, c, c, c, c, c, c, c, c, c, c, c, c, c, c, c, c
            },
                3);

            arrayTree.DepthFirst(Console.WriteLine);
            Console.WriteLine();
            arrayTree.BreadthFirst(Console.WriteLine);
        }
    }
}
