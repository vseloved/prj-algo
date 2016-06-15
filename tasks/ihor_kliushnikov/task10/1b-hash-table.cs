using System;

namespace ConsoleApplication1.DataStructures
{
    public class HashTableB
    {
        private int _size = 16;
        private int _oldSize = 16;

        private int _counter;
        private int _oldCounter;

        private string[] _keys;
        private string[] _oldKeys;

        private object[] _values;
        private object[] _oldValues;

        private bool IsOldEmpty => _oldKeys == null;

        public HashTableB()
        {
            _keys = new string[_size];
            _values = new object[_size];
        }

        public void Add(string key, object value)
        {
            InternalAdd(key, value);

            if (IsOldEmpty) 
                return;

            // looking for first not null
            for (var code = 0; code < _oldSize; code++)
            {
                if (_oldValues[code] == null) 
                    continue;

                MoveOldValue(code);
                return;
            }
        }
        
        public void Delete(string key)
        {
            var hash = GetHashCode(key);
            
            if (!IsOldEmpty && InternalDelete(key, hash, _oldKeys, _oldValues))
            {
                CheckOldArrays();
                return;
            }

            if (!InternalDelete(key, hash, _keys, _values))
                throw new InvalidOperationException("There is no value for given Key in the table");
        }

        public object Get(string key)
        {
            var hash = GetHashCode(key);
            int code;

            if (!IsOldEmpty)
            {
                var oldValue = InternalGet(key, hash, _oldKeys, _oldValues, out code);
                if (oldValue != null)
                {
                    MoveOldValue(code);
                    return oldValue;
                }
            }

            return InternalGet(key, hash, _keys, _values, out code);
        }

        private object InternalGet(string key, int hash, string[] keys, object[] values, out int code)
        {
            code = hash % keys.Length;

            for (var i = 1; i <= keys.Length; i++)
            {
                if (keys[code] == key)
                    return values[code];

                if (++code == keys.Length)
                    code = 0;
            }

            return null;
        }

        private bool InternalDelete(string key, int hash, string[] keys, object[] values)
        {
            int code;
            var val = InternalGet(key, hash, keys, values, out code);
            if (val != null)
            {
                keys[code] = default(string);
                values[code] = null;
            }
            
            return val != null;
        }

        private void InternalAdd(string key, object value)
        {
            var code = GetHashCode(key) % _size;

            for (var i = 1; i <= _size; i++)
            {
                if (_keys[code] == default(string))
                {
                    _keys[code] = key;
                    _values[code] = value;

                    if (++_counter == _size)
                        Resize();

                    return;
                }

                if (_keys[code] == key)
                    throw new InvalidOperationException("Unique key violation");

                if (++code == _size)
                    code = 0;
            }
        }

        private int GetHashCode(string str)
        {
            int hash = 7;
            for (var i = 0; i < str.Length; i++)
                hash = hash*31 + str[i];

            return Math.Abs(hash);
        }

        private void Resize()
        {
            _oldSize = _size;
            _size *= 2;
            _oldCounter = _counter;

            _oldKeys = new string[_oldSize];
            _oldValues = new object[_oldSize];
            _keys.CopyTo(_oldKeys, 0);
            _values.CopyTo(_oldValues, 0);

            _keys = new string[_size];
            _values = new object[_size];
            _counter = 0;
        }

        private void MoveOldValue(int code)
        {
            InternalAdd(_oldKeys[code], _oldValues[code]);
            _oldKeys[code] = default(string);
            _oldValues[code] = null;

            CheckOldArrays();
        }

        private void CheckOldArrays()
        {
            if (--_oldCounter > 0)
                return;

            _oldKeys = null;
            _oldValues = null;
        }
    }
}