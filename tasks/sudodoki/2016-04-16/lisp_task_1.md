Напишите программу, которая выводит на экран числа от 1 до 100. При этом вместо чисел, кратных трем, программа должна выводить слово Fizz, а вместо чисел, кратных пяти — слово Buzz. Если число кратно пятнадцати, то программа должна выводить слово FizzBuzz. Задача может показаться очевидной, но нужно получить наиболее простое и красивое решение.

```
(defun is-fizz (n) (= (mod n 3) 0))
(defun is-buzz (n) (= (mod n 5) 0))
(dotimes (i 100) (let ((number (+ i 1)))
  (cond
    ((and (is-fizz number) (is-buzz number)) (print "FizzBuzz"))
    ((is-fizz number) (print "Fizz"))
    ((is-buzz number) (print "Buzz"))
    (t (print number))
  ))
)
```
