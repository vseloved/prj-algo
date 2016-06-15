using System;
using System.Collections.Generic;
using System.Linq;

namespace ConsoleApplication1.DataStructures.Cache
{
    public class LeastFrequentlyUsedCache<TValue> : ICache<string, TValue>
    {
        // hash table
        private readonly HashTableA<CacheItem<string, TValue>> _hashTable = new HashTableA<CacheItem<string, TValue>>(128, true);

        private const int Size = 64;
        private int _counter;

        private readonly List<CacheItem<string, TValue>> _list = new List<CacheItem<string, TValue>>();

        private int _missed;
        private int _hits;
        public float GetPercentage => ((float) _hits)/(_missed + _hits)*100; // returns 25.1655636% for file without 13-th task

        public TValue Get(string key)
        {
            CacheItem<string, TValue> cacheItem;
            if (!_hashTable.TryGet(key, out cacheItem))
            {
                _missed++;
                return default(TValue);
            }

            _hits++;
            cacheItem.Counter++;
            
            return cacheItem.Value;
        }

        public void Add(string key, TValue value)
        {
            if (_counter == Size)
                DeleteInternal(_list.Min());

            var cacheItem = new CacheItem<string, TValue>(key, value);

            _hashTable.Add(key, cacheItem);
            _list.Add(cacheItem);
            _counter++;
        }

        public void Delete(string key)
        {
            DeleteInternal(_hashTable.Get(key));
        }

        private void DeleteInternal(CacheItem<string, TValue> item)
        {
            _list.Remove(item);
            _hashTable.Delete(item.Key);
            _counter--;
        }

        private class CacheItem<TKey, TVal> : IComparable<CacheItem<TKey, TVal>>
        {
            internal CacheItem(TKey key, TVal value)
            {
                Key = key;
                Value = value;
            }

            internal TKey Key { get; }
            internal TVal Value { get; }
            internal int Counter { set; get; }

            public int CompareTo(CacheItem<TKey, TVal> other)
            {
                return Counter - other.Counter;
            }
        }
    }
}