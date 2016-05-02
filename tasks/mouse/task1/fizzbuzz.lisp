(defun fizz(i) (when(eql (mod i 3) 0)(return-from fizz "fizz")))
(defun buzz(i) (when(eql (mod i 5) 0)(return-from buzz "buzz")))
(defun fizzbuzz(i) (when(eql (mod i 15) 0)(return-from fizzbuzz "fizzbuzz")))
(loop for i from 1 to 100 do (print (or (fizz i) (buzz i) (fizzbuzz i) i )))
