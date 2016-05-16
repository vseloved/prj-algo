'use strict';
// Задание 1: Реализовать одно- и двунаправленную очередь с помощью двух стопок
const newStack = () => {
  const backend = [];
  return {
    push: backend.push.bind(backend),
    pop: backend.pop.bind(backend),
    get length() {
      return backend.length;
    }
  }
}

// queue
const queue = () => {
  const left = newStack();
  const right = newStack();
  const push = (el) => {
    return left.push(el);
  }
  const pop = (el) => {
    if (!right.length) {
      while (left.length) {
        right.push(left.pop())
      }
    }
    return right.pop();
  }
  return { push, pop }
}

const q = queue();
console.group('Queue')
q.push(5);
q.push(4);
console.log(q.pop())
console.log(q.pop())
console.log(q.pop())
q.push(3);
q.push(2);
console.log(q.pop())
q.push(1);
console.log(q.pop())
console.log(q.pop())
console.log(q.pop())
console.groupEnd();
// deque
const deque = () => {
  const left = newStack();
  const right = newStack();
  const push = (el) => {
    return left.push(el);
  }
  const unshift = (el) => {
    return right.push(el);
  }
  const pop = (el) => {
    if (!right.length) {
      while (left.length) {
        right.push(left.pop())
      }
    }
    return right.pop();
  }
  const shift = (el) => {
    if (!left.length) {
      while (right.length) {
        left.push(right.pop())
      }
    }
    return left.pop();
  }
  return { push, pop, unshift, shift }
}

const dq = deque();
console.group('Deque')
dq.push(1);
console.log(dq.pop());
dq.push(1);
dq.push(2);
console.log(dq.pop());
console.log(dq.shift());
dq.push(1);
dq.unshift(2);
console.log(dq.pop());
console.log(dq.pop());
console.groupEnd();
