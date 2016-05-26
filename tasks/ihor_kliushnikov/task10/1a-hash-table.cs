using System;

namespace ConsoleApplication1.DataStructures
{
    public class HashTableA
    {
        private int _size = 16;
        private int _counter;

        private string[] _keys;
        private object[] _values;

        public HashTableA()
        {
            _keys = new string[_size];
            _values = new object[_size];
        }

        public void Add(string key, object value)
        {
            var code = GetInternalHashCode(key);

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

        public void Delete(string key)
        {
            var code = GetCodeByKey(key);

            _keys[code] = default(string);
            _values[code] = null;
        }

        public object Get(string key)
        {
            return _values[GetCodeByKey(key)];
        }

        private int GetCodeByKey(string key)
        {
            var code = GetInternalHashCode(key);

            for (var i = 1; i <= _size; i++)
            {
                if (_keys[code] == key)
                    return code;

                if (++code == _size)
                    code = 0;
            }
            throw new InvalidOperationException("There is no value for given Key in the table");
        }

        private int GetInternalHashCode(string str)
        {
            int hash = 7;
            for (var i = 0; i < str.Length; i++)
                hash = hash*31 + str[i];

            return Math.Abs(hash)%_size;
        }

        private void Resize()
        {
            var tempKeys = new string[_size];
            var tempValues = new object[_size];
            _keys.CopyTo(tempKeys, 0);
            _values.CopyTo(tempValues, 0);

            _size *= 2;

            _keys = new string[_size];
            _values = new object[_size];
            _counter = 0;

            for (var i = 0; i < tempKeys.Length; i++)
                Add(tempKeys[i], tempValues[i]);
        }
    }
}