Задание 1. Упростите выражения:

```
(or (and x y)
    (and z y))
```
-> `(and (or x z) y)`

```
(or (and x y)
    (and (not x) y))
```
-> `y`

```
(and (not x)
     (or (not y)
         (not (and x y))))
```
-> `(and (not x) (not y))`
-> `(not (or x y))`

```
(and (not (and (or (and x (not y))
                   (and (not x) y))
               x))
     (or (and (xor x y)
              x)))
```
->
```
(and (or (xor x y) x)
     (or (not y)))
```
