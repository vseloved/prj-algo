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
// 1a. перехеширование всех данных
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
  cnstrctr.size = size; // for introspection purposes
  const setKey = (key, value) => {
    let start = gethash(key) % size;
    if (!backend[start] || backend[start].key == key) {
      return backend[start] = {key, value}
    }
    let i = start + 1 % size;
    while (i !== start) {
      if (!backend[i]) {
        return (backend[i] = {key, value})
      }
      i = (i + 1) % size
    }
    resize(size * 2);
    return setKey(key, value);
  }
  const resize = (newSize) => {
    let oldEntries = backend.splice(0,backend.length)
    size = size * 2;
    cnstrctr.size = size; // for introspection purposes
    for (let {key, value} of oldEntries) {
      setKey(key, value)
    }
  }
  return {
    inspect() {
      return {backend, size};
    },
    getByKey(key) {
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
      return null
    },
    setKey,
    deleteKey(key) {
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
      return "Nothing deleted, no key found"
    }
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
// // console.log(hash.getByKey('John1'))
// console.log(hash.deleteKey('sit'))
// // console.log(hash.getByKey('John1'))
// console.log(hash.inspect());
