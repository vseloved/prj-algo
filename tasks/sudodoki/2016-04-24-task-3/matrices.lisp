(defvar input1 #2A((1 2) (3 4)))
(defvar input2 #2A((1 0) (0 1)))
;M x N * N x K => M x K
;for x = 0; M; x++
;  for y = 0; K; y++
;    rez[x][y] = (temp = 0; for (j = 0; N; j++) temp = temp + M1[x][i] * M2[i][y])

(defun mmult (m1 m2)
  (let (
    (M (first (array-dimensions m1)))
    (N (first (rest (array-dimensions m1))))
    (K (first (rest (array-dimensions m2))))
  )
    (block nil
      (assert (= N (first (array-dimensions m2)))
              (m1 m2)
              "Cannot multiply ~S by ~S." m1 m2)
      (let ((result (make-array (list M K) :initial-element 0)))
        (dotimes (x M)
          (dotimes (y K)
            (dotimes (i N)
              (incf (aref result x y) (* (aref m1 x i) (aref m2 i y)))
            )
          )
        )
        result
      )
      ;(print (list M N K))
    )))

(mmult input1 input2)
