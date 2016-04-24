def mmult(m1, m2)
  height = m1[0].length
  width = m2.length
  if height!=width
    return "Can't compute"
  end
  height_res = m1.length
  width_res = m2[0].length  
  res = []
  m1.each do |row|
    newrow = []
    width_res.times do |i|
      temp = []
      m2.each { |elem| temp << elem[i] }
      newrow << (0...row.count).inject(0) {|r, j| r + row[j]*temp[j]}
    end
    res<<newrow
  end
  
  puts res
end

m1 = [[1,2,3],[4,5,6]]
m2 = [[7,8],[9,10],[11,12]]

puts mmult(m1,m2)
