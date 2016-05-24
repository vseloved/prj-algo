using System;
using System.Collections;

namespace ConsoleApplication1
{
    public class ListTree<T> where T : IComparable<T>
    {
        private readonly ArrayList _list;

        public ListTree(ArrayList list)
        {
            _list = list;
        }

        public void DepthFirst(Action<T> action)
        {
            DepthFirstImpl(action, _list);
        }

        private void DepthFirstImpl(Action<T> action, ArrayList list)
        {
            if (list == null)
                return;

            action((T)list[0]);

            // recurring for each child element
            for (var i = 1; i < list.Count; i++)
                DepthFirstImpl(action, (ArrayList)list[i]);
        }

        public void BreadthFirst(Action<T> action)
        {
            var queue = new System.Collections.Generic.Queue<ArrayList>();
            queue.Enqueue(_list);

            while (queue.Count > 0)
            {
                var list = queue.Dequeue();
                action((T)list[0]);

                for (var i = 1; i < list.Count; i++)
                    queue.Enqueue((ArrayList)list[i]);
            }
        }
    }
}