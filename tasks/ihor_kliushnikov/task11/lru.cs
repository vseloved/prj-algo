namespace DataStructures.Cache
{
    public class LeastRecentlyUsedCache<TValue>
    {
        // hash table
        private readonly HashTableA<CacheItem<string, TValue>> _hashTable = new HashTableA<CacheItem<string, TValue>>(128, true);

        private readonly int _size = 64;
        private int _counter;

        // deque
        private CacheItem<string, TValue> _head;
        private CacheItem<string, TValue> _tail;

        private int _missed;
        private int _hits;
        public float GetPercentage => ((float) _hits)/(_missed + _hits)*100; // returns 30.0772629% for file without 13-th task

        public TValue Get(string key)
        {
            CacheItem<string, TValue> cacheItem;
            if (!_hashTable.TryGet(key, out cacheItem))
            {
                _missed++;
                return default(TValue);
            }
            _hits++;

            // Update - set current item to the top
            RemoveFromDeque(cacheItem);
            PushToHead(cacheItem);

            return cacheItem.Value;
        }

        public void Add(string key, TValue value)
        {
            if (_counter == _size)
                DeleteInternal(_tail);

            var cacheItem = new CacheItem<string, TValue>(key, value);

            PushToHead(cacheItem);
            _hashTable.Add(key, cacheItem);
            _counter++;
        }

        public void Delete(string key)
        {
            DeleteInternal(_hashTable.Get(key));
        }

        private void PushToHead(CacheItem<string, TValue> cacheItem)
        {
            cacheItem.Next = _head;
            cacheItem.Previous = null;

            if (_head != null)
                _head.Previous = cacheItem;

            _head = cacheItem;

            if (_tail == null) // if 1-st item in cache
                _tail = cacheItem;
            else if (_tail.Previous == null) // if 2-nd item in cache
                _tail.Previous = cacheItem;
        }

        private void DeleteInternal(CacheItem<string, TValue> item)
        {
            RemoveFromDeque(item);
            _hashTable.Delete(item.Key);
            _counter--;
        }

        private void RemoveFromDeque(CacheItem<string, TValue> item)
        {
            var next = item.Next;
            var previous = item.Previous;

            if (next != null)
                next.Previous = previous;
            else // if item is an old tail - set a new one
                _tail = previous;

            if (previous != null)
                previous.Next = next;
            else // if item is an old head - set a new one
                _head = next;
        }

        protected internal class CacheItem<TKey, TVal>
        {
            public CacheItem(TKey key, TVal value)
            {
                Key = key;
                Value = value;
            }

            protected internal TKey Key { get; }
            protected internal TVal Value { get; }

            protected internal CacheItem<TKey, TVal> Next { get; set; }
            protected internal CacheItem<TKey, TVal> Previous { get; set; }
        }
    }
}