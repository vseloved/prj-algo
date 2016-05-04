# Реализуйте рекурсивный алгоритм поиска пика для двумерного массива.

#замість іти вліво-вправо я іду вгору-вниз, по ідеї це ж не повинно мати значення
def peakfinder_rec(array)
  midpoint_index = array.length/2
  max = 0
  max_index = []
  array[array.length/2].each_with_index do |element, i|
    if element > max
      max = element 
      max_index = [midpoint_index,i
      ]
    end
  end

  if (!array[max_index[0]+1] || !array[max_index[0]-1]) \ 
  || ((array[max_index[0]+1][max_index[1]] <= max) \
  && (array[max_index[0]][max_index[1]+1] <= max) \
  && (array[max_index[0]-1][max_index[1]] <= max) \
  && (array[max_index[0]][max_index[1]-1] <= max))
    return max_index.to_s
  elsif array[max_index[0]+1][max_index[1]] >= array[max_index[0]-1][max_index[1]]
    peakfinder_rec(array[0..max_index[0]+1])
  else
    peakfinder_rec(array[0..max_index[0]-1])
  end

end


puts peakfinder_rec([[2,3,4,6,8],[9,0,2,2,1],[6,6,6,2,2],[2,3,7,3,2]])
