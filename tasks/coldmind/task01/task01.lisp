;; Open SLIME REPL and type:
;; > (ql:quickload :lisp-unit)
;; > (load (compile-file "task0.lisp"))

(in-package :lisp-unit)

(defun atoi (string)
    (let ((n 0))
        (loop for c across string do
         (if (or (char< c #\0)
                 (char> c #\9))
            (return 0))
         (setq n (* n 10))
         (setq n (+ n (- (char-code c) (char-code #\0)))))
        (return-from atoi n)
    ))

(define-test successful-string-to-integer-conversion
    (assert-equal (atoi "02452600998234234") 2452600998234234))

(define-test non-integer-string-returns-zero
    (assert-equal (atoi "testsrting") 0))

(define-test mixed-char-with-integers
    (assert-equal (atoi "0123teststing") 123)
    (assert-equal (atoi "teststring123") 0))

(run-tests :all)
