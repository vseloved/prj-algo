# Логика

### Задание 1. 
Упростите выражения:
```
(or (and x y)
    (and z y))
----------------
(and (or x z) y)
```

```
(or (and x y)
    (and (not x) y)) =
(and y (or x (not x)))
---------------------
y 
```

```
(and (not x)
     (or (not y)
         (not (and x y)))) =
(and (not x)
     (or (not y) (not x) (not y)))
--------------------------
(not x)
```

```
(and (not (and (or (and x (not y))
                   (and (not x) y))
               x))
     (not (and (not (or (and x (not y))
                        (and (not x) y)))
               x))) = 
# зробимо заміну
a = (not (and (or (and x (not y))
                  (and (not x) y))
              x)) = 
(or (not (and x (not y)))
    (not (and (not x) y))
    not (x)) =
(or ((or (not x) y)
     (or x (not y)))
    (not x)) = 
(or V (not x))
(not x)

b = (not (and (not (or (and x (not y))
                       (and (not x) y)))
               x))) =
(not (and (and (not (and x (not y)))
               (not (and (not x) y)))
          x)) =
(not (and (and (or (not x) y)
               (or x (not y)))
          x)) =
(not (and V x)) =
(or (not V) (not x)) =
(not x)
-------------------------------------------
(and a b) = (and (not x) (not x)) = (not x)
```

### Задание 2
```
(or (and (not x) (not y))
    (and x z))
----------------------------
= if not(x) not(y) (x and z)
= if x y not(x and z)
= if x y not(z)
```

### Задание 3. 
Напишите программу, которая печатает таблицу истинности для всех булевых функций и по ходу придумайте названия для каждой из них. Результат работы должен выглядеть примерно так:

```
 X | Y | True | False | AND | ...
---+---+------+-------+-----+----
 T | T |   T  |   F   |  T  | ...
 T | F |   T  |   F   |  F  | ...
...
```
[код](logic_task_3.js)
[Перевірочна таблиця](http://computationstructures.org/notes/images/2-input-functions.png),
[jsfiddle.net](https://jsfiddle.net/MiKolka/xhu07too)
