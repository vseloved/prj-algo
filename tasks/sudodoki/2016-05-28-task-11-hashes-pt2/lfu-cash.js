// Задание: реализовать LFU-кеш на основании хеш-таблицы размером 64 элемента.
// Замерить количество промахов мимо кеша (cache miss) на следующем примере: прочитать этот файл заданий,
// разбить его по пробелам и переводам строк на отдельные токены (слова, знаки препинания, специальные символы),
// проитерироваться по нему, добавляя каждый токен в кеш, если его там нет, или же выводя его на экран.
// В конце вывести процент попаданий в кеш, т.е. тех ситуаций, когда текущий токен из текста уже был в кеше.

// Least Frequently Used
const tokens = require('./get-file');

const getCache = (size = 5, onMiss = console.log.bind(console)) => {
  const backend = new Map();
  return {
    add(key) {
      if (backend.has(key)) {
        return backend.set(key, backend.get(key) + 1)
      }
      onMiss(key);
      // need to remove single entry to free up state
      if (backend.size >= size - 1) {
        // removing one with smallest amount of frequency
        const [keyToRemove, valueRemoved] = (Array.from(backend.entries()).sort(([_1, firstVal], [_2, secondVal]) => {
          return firstVal - secondVal
        })[0]);
        backend.delete(keyToRemove)
      }
      backend.set(key, 1)
    }
  }
}

let cacheMiss = 0;
const cache = getCache(64, (item) => {
  cacheMiss++;
  console.log(item);
});

for (const token of tokens) {
  cache.add(token)
}

console.log('CacheMiss = ', cacheMiss); // CacheMiss =  1941
