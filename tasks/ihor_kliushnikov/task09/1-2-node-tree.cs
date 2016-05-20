using System;
using System.Collections.Generic;

namespace ConsoleApplication1
{
    public class NodeTree<T> where T : IComparable<T>
    {
        private readonly Node<T> _root;
 
        public NodeTree(Node<T> root)
        {
            _root = root;
        }

        public void DepthFirst(Action<T> action)
        {
            DepthFirstImpl(action, _root);
        }

        private void DepthFirstImpl(Action<T> action, Node<T> node)
        {
            if (node == null)
                return;

            action(node.Value);
            
            // recurring fo each child element
            foreach (var child in node.Children)
                DepthFirstImpl(action, child);
        }

        public void BreadthFirst(Action<T> action)
        {
            var queue = new System.Collections.Generic.Queue<Node<T>>();
            queue.Enqueue(_root);

            while (queue.Count > 0)
            {
                var node = queue.Dequeue();
                action(node.Value);

                foreach (var child in node.Children)
                    queue.Enqueue(child);
            }
        }
    }

    public class Node<T>
    {
        public Node(T value)
        {
            Value = value;
            Children = new List<Node<T>>();
        }

        public Node(T value, IEnumerable<Node<T>> children)
        {
            Value = value;
            Children = children;
        }

        public T Value { get; private set; }

        public IEnumerable<Node<T>> Children { get; private set; }
    }
}