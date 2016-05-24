using System;
using System.Linq;

namespace ConsoleApplication1
{
    public class ArrayTree<T> where T : IComparable<T>
    {
        private readonly Int16 _branchFactor;
        private T[] _array;

        public ArrayTree(T[] array, Int16 branchFactor)
        {
            _branchFactor = branchFactor;
            _array = array;
        }

        public void DepthFirst(Action<T> action)
        {
            DepthFirstImpl(action, 0);
        }

        public void DepthFirstImpl(Action<T> action, int index)
        {
            if (index >= _array.Length)
                return;

            // if current root is not empty - execute action
            if (!_array[index].Equals(default(T)))
                action(_array[index]);

            index = GetFirstChild(index);
            
            // recurring for each child element
            for (var j = index; j < index + _branchFactor; j++)
                DepthFirstImpl(action, j);
        }

        public void BreadthFirst(Action<T> action)
        {
            // The array should be ordered in bfs order at any time therefore just iterate through not empty elements
            foreach (var element in _array.Where(element => !element.Equals(default(T))))
                action(element);
        }

        private int GetParent(int i)
        {
            return (i - 1)/_branchFactor;
        }

        private int GetFirstChild(int i)
        {
            return (_branchFactor*i + 1);
        }
    }
}