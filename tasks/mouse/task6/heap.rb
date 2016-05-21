class Heap

  attr_accessor :array
  
  def initialize(array)
    @array = array
  end

  def viz_heap
    height = Math.log2(array.length).round
    width = 2**height-1
    j = 0
    height.times do |i|
      n = 2**i
    
      (2**(height-i-1)).times {print " "}
      space_num = (2**(height-i))
      n.times do |n|
      
        printf "%-#{space_num}s", array[j]
        j=j+1
      end
      print "\n"
    end
  end
  
  def check_heap
    array.each_with_index do |el,i|
      if !array[hleft(i)] || !array[hright(i)]
        puts "OK"
        return true
      end
      if (el < array[hleft(i)]) || (el < array[hright(i)])
        puts "Nope"
        return false
      end
    end
  end
  
  def heapsort
    make_heap
    l = array.length
    (l-1).times do
      array[0], array[l-1] = array[l-1], array[0]
      l = l-1
      array[0..l-1] = heap_down(0, array[0..l-1])
    end
    array.to_s
  end

  def make_heap
    (0..array.length).to_a.reverse.each do |i|  
      heap_down(i, array)
    end
    array.to_s
  end
  
  private

  def heap_down(i, array)

    if hleft(i)>array.length-1
    
      return array
    else
      hleft_val = array[hleft(i)]
      hright_val = array[hright(i)] || hleft_val-1
      if (array[i]>hleft_val)&&(array[i]>hright_val)
        return array
      end
      if hleft_val >= hright_val
        array[i], array[hleft(i)] = array[hleft(i)], array[i]
        heap_down(hleft(i), array)
      else
        array[i], array[hright(i)] = array[hright(i)], array[i]
        heap_down(hright(i), array)
      end
    
    end
    array
  end


  def heap_up(array, i)
    if array[i] > array[hparent(i)]
      array[i],array[hparent(i)] = array[hparent(i)],array[i]
      heap_up(array, hparent(i))
    end
  end

  def heap_push(array, elem)
    array << elem
    heap_up(array, array.length-1) 
    array.to_s
  end

  def heap_pop(array)
    array[0], array[array.length-1] =  array[array.length-1], array[0]
    result = array.pop
    heap_down(0, array)
    result
  end

  def hparent(i)
    (i-1)/2
  end

  def hleft(i)
    (i+1)*2-1
  end

  def hright(i)
    (i+1)*2
  end

end

heap = Heap.new([10,8,5,9,3,7,4,1])

puts heap.heapsort
puts heap.make_heap
puts heap.viz_heap
puts heap.check_heap

