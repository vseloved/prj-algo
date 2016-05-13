1. Сортировка вставкой
	
(defun insort(list)
    (dolist (i (subseq list 1 (length list))) 
        (dolist (j (nreverse(subseq list 0 (position i list)))) 
            (print i)(print j)
            (when (> j i)
                (progn (rotatef (nth (position i list) list ) (nth (position j list) list ))
                    (print list)))))list)

