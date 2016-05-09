using System;

namespace ConsoleApplication1.DataStructures
{
    public class Deque<T>
    {
        private StackItem<T> _headStack;
        private StackItem<T> _tailStack;

        public void PushHead(T value)
        {
            if (_headStack == null)
                _headStack = new StackItem<T>(value);
            else
            {
                var newStack = new StackItem<T>(value, _headStack);
                _headStack = newStack;
            }
        }

        public T PopHead()
        {
            if (_headStack == null && _tailStack == null)
                throw new InvalidOperationException("Queue is empty");

            if (_headStack == null)
            {
                _headStack = _tailStack.GetInverted();
                _tailStack = null;
            }

            var popValue = _headStack.Value;
            var nextStackItem = _headStack.Next;
            _headStack = nextStackItem;

            return popValue;
        }

        public void PushTail(T value)
        {
            if (_tailStack == null)
                _tailStack = new StackItem<T>(value);
            else
            {
                var newStack = new StackItem<T>(value, _tailStack);
                _tailStack = newStack;
            }
        }

        public T PopTail()
        {
            if (_tailStack == null && _headStack == null)
                throw new InvalidOperationException("Queue is empty");

            if (_tailStack == null)
            {
                _tailStack = _headStack.GetInverted();
                _headStack = null;
            }

            var popValue = _tailStack.Value;
            var nextStackItem = _tailStack.Next;
            _tailStack = nextStackItem;

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