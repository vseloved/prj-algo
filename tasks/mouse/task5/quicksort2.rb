def partition(array, left, right)
  i = left
  pivot = array[i]
  array[i], array[right] = array[right], array[i] 
  for j in (left..right-1) 
    if array[j] < pivot
      array[j], array[i] = array[i], array[j]
      i = i + 1
    end
  end

  array[i], array[right] = array[right], array[i]
  return i
end

def partition_median3(array, left, right)
  middle = ((right - left) / 2).to_i
  list = [array[left],array[middle],array[right]]
  list.sort!
  pivot = list[1]
  pivot_i = array.index(list[1])
  array[pivot_i], array[left] = array[left], array[pivot_i]
  i = left
  array[i], array[right] = array[right], array[i] 
  for j in (left..right-1) 
    if array[j] < pivot
      array[j], array[i] = array[i], array[j]
      i = i + 1
    end
  end

  array[i], array[right] = array[right], array[i]
  return i
end

def partition_median9(array, left, right)
  if array[left..right].length>9
    sample = array.sample(9)
    sample_divided = sample.each_slice(3).to_a
    medians = []
    sample_divided.each do |s|
      s.sort!
      medians << s[1]
    end
    medians.sort!
    pivot = medians[1]
  else
    pivot = array[left]
  end
  puts pivot
  pivot_i = array.index(pivot)
  array[pivot_i], array[left] = array[left], array[pivot_i]
  i = left
  array[i], array[right] = array[right], array[i] 
  for j in (left..right-1) 
    if array[j] < pivot
      array[j], array[i] = array[i], array[j]
      i = i + 1
    end
  end

  array[i], array[right] = array[right], array[i]
  return i
end

def quicksort(array, left, right)
  
  if left < right
    pivot_index = partition_median9(array, left, right)
    quicksort(array, left, pivot_index - 1)
    quicksort(array, pivot_index + 1, right)
  end

  return array.to_s
end

arr = [12,7,14,9,10,11,18,6,8,15]

puts quicksort(arr,0,arr.length-1)


