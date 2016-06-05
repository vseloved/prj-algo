(load "~/quicklisp/setup.lisp")
(ql:quickload :bordeaux-threads)

; Tested on 5000000 random integers.
; Example output:
;"---Running simple mergesort---"
;"Evaluation took:
;  8.633 seconds of real time
;  8.527842 seconds of total run time (7.325436 user, 1.202406 system)
;  [ Run times consist of 3.198 seconds GC time, and 5.330 seconds non-GC time. ]
;  98.78% CPU
;  22,446,353,058 processor cycles
;  2,025,809,856 bytes consed
;
;"---Running threaded mergesort---"
;"Evaluation took:
;  6.001 seconds of real time
;  8.426548 seconds of total run time (7.247348 user, 1.179200 system)
;  [ Run times consist of 3.121 seconds GC time, and 5.306 seconds non-GC time. ]
;  140.43% CPU
;  15,601,527,901 processor cycles
;  2,025,850,656 bytes consed

(defun get-randlist (n)
  (let ((lst ()))
    (dotimes (i n)
       (setf lst (cons (random 101) lst)))
   lst))

(defun merge-sort (sequence)
   (let ((middle-idx (floor (length sequence) 2)))
     (if (zerop middle-idx) (return-from merge-sort (copy-seq sequence)))
     (merge 'list (merge-sort (subseq sequence 0 middle-idx)) (merge-sort (subseq sequence middle-idx)) #'<)))

(defun merge-sort-threaded (sequence)
   (let ((middle-idx (floor (length sequence) 2)))
     (if (zerop middle-idx) (return-from merge-sort-threaded (copy-seq sequence)))
     (let ((merged-left nil)
	   (merged-right nil))
       (let ((left-thread (bordeaux-threads:make-thread (lambda () (setf merged-left (merge-sort (subseq sequence 0 middle-idx))))))
             (right-thread (bordeaux-threads:make-thread (lambda () (setf merged-right (merge-sort (subseq sequence middle-idx)))))))
         (bordeaux-threads:join-thread left-thread)
         (bordeaux-threads:join-thread right-thread)
         (merge 'list merged-left merged-right #'<)))))

(defvar *randlist* (get-randlist 5000000))

(print "---Running simple mergesort---")
(print (with-output-to-string (*trace-output*)
  (time (merge-sort *randlist*))))

(print "---Running threaded mergesort---")
(print (with-output-to-string (*trace-output*)
  (time (merge-sort-threaded *randlist*))))
