#Задание 1

def bsearch(subarray, element, wholearray)

  midpoint = subarray[subarray.length/2]
  if element==midpoint
    return midpoint.to_s + " at position "+ wholearray.index(midpoint).to_s
  elsif element < midpoint
    subarray = subarray[0..subarray.index(midpoint)]
    bsearch(subarray, element, wholearray)
  elsif element > midpoint
    subarray = subarray[subarray.index(midpoint)..subarray.length-1]
    bsearch(subarray, element, wholearray)
  else 
    return "not found"
  end
  
end

arr = [1,3,4,6,8,9,25,23,44,45,46,67,89,99,120]

puts bsearch(arr,44,arr)

=begin
Задание 2. Покажите, что при выполнении проверки на равенство текущей средней точки искомому элементу, 
в среднем минимум в половине случаев нам все равно придется дойти до последней итерации алгоритма. 
При каких условиях это число будет равно половине, а при каких больше?

Імовірність того, що ми попадем на потрібний елемент в першій же ітерації - 1/n, в другій - 2/n, в третій - 4/n ітд. 
Імовірність попасти на потрібну точку в останній ітерації - (n/2)/n = 1/2

=end
