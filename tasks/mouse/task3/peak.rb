=begin
Уточним определение: пик — это элемент массива, все соседи которого не больше его. 
Для вектора — это элемент, у которого есть правый и левый сосед и они не меньше его. 
Для матрицы это элемент, у которого сосеби справа, слева, снизу и сверху не меньше его. 
Крайние элементы мы не рассматриваем в качестве кандидатов на пик.

Реализуйте наивный алогритм, который находит хотя бы один пик в одномерном и двухмерном массиве.
=end

def peakfinder_one(array)
  
  array.each_cons(3) do |con|
    if con[0]<con[1] && con[2]<con[1]
      puts "the first peak is "+con[1].to_s+" and its position is "+array.index(con[1]).to_s
      return {value: con[1], ind: array.index(con[1])}
      break
    end
  end
  
  puts "No peaks"
  
  return nil
  
end

peakfinder_one([1,1,3,1])
peakfinder_one([1,1,1,1])

def peakfinder_multi(array)
  
  array.each_cons(3) do |con_of_rows|
    
    protopeak = peakfinder_one(con_of_rows[1])
    if protopeak
      if con_of_rows[0][protopeak[:ind]] < protopeak[:value] && con_of_rows[2][protopeak[:ind]] < protopeak[:value]
        puts "the first peak is "+protopeak[:value].to_s
      end
    end
  end

end

peakfinder_multi([[2,3,4],[0,9,3],[6,6,6]])
peakfinder_multi([[1,1,1],[1,1,1],[1,1,1]])
