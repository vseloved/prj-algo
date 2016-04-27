(defun is-fizz (i)
    (and (= (mod i 3) 0) "Fizz"))

(defun is-buzz (i)
    (and (= (mod i 5) 0) "Buzz"))

(defun is-fizz-buzz (i)
    (and (= (mod i 15) 0) "FizzBuzz"))

(loop for i from 1 to 100
      do (format t "~a " (or (is-fizz-buzz i) (is-fizz i) (is-buzz i) i)))