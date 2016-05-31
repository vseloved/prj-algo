// Задание 1: Реализовать хеш-таблицу со следующими параметрами:
//
// - изначальный размер: 16 элементов
// - открытая адресация
// - автоматическое расширение при полном заполнении увеличением размера в 2 раза
// - ключи — строки, значиния — любого типа
// - хеш-функция (см. <http://stackoverflow.com/questions/2624192/good-hash-function-for-strings>):
//
//        ```
//        (defun hash (string size)
//          (let ((hash 7))
//            (dotimes (i (length string))
//              (setf hash (+ (* hash 31) (char-code (char string i)))))
//            (mod hash size)))
//        ```
// Реализовать следующие методы расширения:
//
// 1б. создание параллельной таблицы и постепенный перенос данных в нее при каждом обращении (при этом новые данные записываются в новую таблицу, а старые постепенно переписываются партиями по несколько элементов)

"use strict";
const gethash = (string) => {
  let hash = 7
  for (let char of string) {
    hash = hash * 31 + char.charCodeAt(0)
  }
  return hash;
}
function Hash(size = 8, cnstrctr = Array) {
  var backend = new cnstrctr;
  // TODO: clarify task
  cnstrctr.size = size; // for introspection purposes
  var backendNew, newSize;
  const resize = () => {
    backendNew = new cnstrctr;
    newSize = size * 2;
    cnstrctr.size = newSize; // for introspection purposes
  }
  const move = (n) => {
    for (let i = 0; i < n; i++) {
      let toMove = backend.find(_i => _i);
      if (!toMove) return
      setKey(toMove.key, toMove.value, false);
      deleteKey(toMove.key);
    }
  }
  const deleteKey = (key) => {
    const hasNew = !!backendNew;
    let start = gethash(key) % size;
    if (backend[start] && backend[start].key == key) {
      return backend[start] = undefined;
    }
    let i = (start + 1) % size;
    while (i !== start) {
      if (backend[i] && backend[i].key == key) {
        return backend[i] = undefined;
      }
      i = (i + 1) % size
    }
    if (hasNew) {
      if (backendNew[start] && backendNew[start].key == key) {
        return (backendNew[start] = undefined);
      }
      let i = (start + 1) % newSize;
      while (i !== start) {
        if (backendNew[i] && backendNew[i].key == key) {
          return backendNew[i] = undefined;
        }
        i = (i + 1) % newSize
      }
    }
    return "Nothing deleted, no key found"
  }
  const setKey = (key, value, initiatedByUser = true) => {
    if (backend.length && !backend.filter(i => !!i).length) {
      backend = backendNew;
      size = newSize;
      backendNew = undefined;
      newSize = undefined;
    }
    const hasNew = !!backendNew;
    let toSet = hasNew ? backendNew : backend;
    let maxSize = hasNew ? newSize : size;
    let start = gethash(key) % maxSize;
    deleteKey(key);
    if (!toSet[start] || toSet[start].key == key) {
      if (hasNew && initiatedByUser) {
        move(2);
      }
      return toSet[start] = {key, value}
    }
    let i = start + 1 % maxSize;
    while (i !== start) {
      if (!toSet[i]) {
        if (hasNew && initiatedByUser) {
          move(2);
        }
        return (toSet[i] = {key, value})
      }
      i = (i + 1) % maxSize
    }
    resize()
    setKey(key, value);
  }
  return {
    inspect() {
      return {backend, size, backendNew, newSize};
    },
    getByKey(key) {
      const hasNew = !!backendNew;
      let start = gethash(key) % size;
      if (backend[start] && backend[start].key == key) {
        return (backend[start].value)
      }
      let i = (start + 1) % size;
      while (i !== start) {
        if (backend[i] && backend[i].key == key) {
          return (backend[i].value)
        }
        i = (i + 1) % size
      }
      if (hasNew) {
        if (backendNew[start] && backendNew[start].key == key) {
          return (backendNew[start].value)
        }
        let i = (start + 1) % newSize;
        while (i !== start) {
          if (backendNew[i] && backendNew[i].key == key) {
            return (backendNew[i].value)
          }
          i = (i + 1) % newSize
        }
      }
      return null
    },
    setKey,
    deleteKey
  }
}

(module || window).exports = Hash;

// var hash = Hash(8)
// hash.setKey('John', 'boy');
// console.log(hash.getByKey('John'))
// console.log(hash.setKey('John', 2))
// console.log(hash.setKey('Lorem', 3))
// console.log(hash.setKey('ipsum', 4))
// console.log(hash.setKey('dolor2', 5))
// console.log(hash.setKey('sit', 15))
// console.log(hash.setKey('amet', 45))
// console.log(hash.setKey('consectetur', 55))
// console.log(hash.setKey('adipiscing', 58))
// console.log(hash.setKey('elit', 59))
// console.log(hash.getByKey('John'))
// console.log(hash.setKey('adipiscing', 59))
// console.log(hash.setKey('random', 14))
// console.log(hash.setKey('text', 9))
// console.log(hash.deleteKey('text'))
// console.log(hash.setKey('newish', 9))
// console.log(hash.inspect())
