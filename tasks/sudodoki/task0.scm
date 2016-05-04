; ~ чистого времени за компом заняло 2 часа, разобраться со скимой и её странными операторами
; Необходимо реализовать функцию atoi (перевести строку, в которой есть только числа, в число)
(define base 10)
; TODO: string head / tail in Gambit v4.8.4 ?
(define (string-head str) (substring str 0 1))
(define (string-tail str) (substring str 1 (string-length str)))
(define (char->digit char) (cond
  ((string=? "1" char) 1)
  ((string=? "2" char) 2)
  ((string=? "3" char) 3)
  ((string=? "4" char) 4)
  ((string=? "5" char) 5)
  ((string=? "6" char) 6)
  ((string=? "7" char) 7)
  ((string=? "8" char) 8)
  ((string=? "9" char) 9)
  ((string=? "0" char) 0)
))
; TODO: pass base as argument, default it to 10
; TODO: check passed arg type
; TODO: work with bignums, ololo?
(define (atoi_helper accumulator str)
  (if (> (string-length str) 0)
    (atoi_helper
      (+
        accumulator
        (* (expt base (- (string-length str) 1)) (char->digit (string-head str)))
      )
      (string-tail str)
    )
    accumulator))

(define (atoi str) (atoi_helper 0 str))
;13> (atoi "1234")
;1234
;13> (atoi "0")
;0
;13> (atoi "3")
;3
;13> (atoi "30000")
;30000
