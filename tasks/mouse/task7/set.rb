def union(a1, a2)
  res = []
  l = a1.length 
  m = a2.length 
  j = 0
  for i in 0..l
    if !a1[i]
      res << a2[j..m-1]
    elsif !a2[j]
      res << a1[i..l-1]
    elsif a1[i]<a2[j]
      res << a1[i]
    elsif a1[i]>a2[j]
      res << a2[j]
      j=j+1
      redo
    else 
      res << a1[i]
       j=j+1
    end

  end
  res.flatten.to_s
end

puts union([1,2,4,6],[2,5,6,8])

def intersection(a1, a2)
  res = []
  l = a1.length 
  m = a2.length 
  j = 0
  for i in 0..l-1
    if !a2[j]
      return
    elsif a1[i]<a2[j]
      next
    elsif a1[i]>a2[j]
      j=j+1
      redo
    else 
      res << a1[i]
      j=j+1
    end

  end
  res.flatten.to_s
end

puts intersection([1,2,4,6],[2,5,6,8])

def difference(a1, a2)
  res = []
  l = a1.length 
  m = a2.length 
  j = 0
  for i in 0..l-1
    if !a2[j]
      res << a1[i..l-1]
      return
    elsif a1[i]<a2[j]
      res << a1[i]
    elsif a1[i]>a2[j]
      j=j+1
      redo
    else 
      j=j+1
    end

  end
  res.flatten.to_s
end

puts difference([1,2,4,6],[2,5,6,8])


