using System;

namespace ConsoleApplication1.DataStructures
{
    public class Queue<T>
    {
        private StackItem<T> _writeStack;
        private StackItem<T> _readStack;

        public void Push(T value)
        {
            if (_writeStack == null)
                _writeStack = new StackItem<T>(value);
            else
            {
                var newStack = new StackItem<T>(value, _writeStack);
                _writeStack = newStack;
            }
        }

        public T Pop()
        {
            if (_readStack == null && _writeStack == null)
                throw new InvalidOperationException("Queue is empty");

            if (_readStack == null)
            {
                _readStack = _writeStack.GetInverted();
                _writeStack = null;
            }

            var popValue = _readStack.Value;
            var nextStackItem = _readStack.Next;
            _readStack = nextStackItem;

            return popValue;
        }
		
		class StackItem<T>
		{
			public StackItem(T value, StackItem<T> next = null)
			{
				Value = value;
				Next = next;
			}

			public T Value { get; private set; }
	
			public StackItem<T> Next { get; private set; }
	
			public StackItem<T> GetInverted()
			{
				var head = this;
				var invertedStack = new StackItem<T>(Value);

				while (head.Next != null)
				{
					var nextStackItem = new StackItem<T>(head.Next.Value, invertedStack);
					invertedStack = nextStackItem;
	
					head = head.Next;
				}

				return invertedStack;
			}
		}
    }
}