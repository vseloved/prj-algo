#Задание 2: реализовать алгоритм Рабина Карпа для одновременного поиска нескольких подстрок в строке.

def rollhash(oldhash, new_char, first_char, l)

  base = 101
  a = first_char.ord
  b = new_char.ord 
  base * (oldhash - (a*base**(l-1))) + b
end

def hash(string)
  base = 101
  res = 0
  l = string.length-1
  string.each_byte.with_index do |b,i|
    res = res+ b*base**(l-i)
  end
  res
end

def rk_multi(string, patterns)
  hpattern = []
  l = patterns[0].length
  patterns.each do |p|
    hpattern << hash(p)
  end

  hstring = hash(string[0...l])
  for i in 0..(string.length-l-1)
    if hpattern.include?(hstring)
      puts i
    end
    hstring = rollhash(hstring, string[i+l],string[i],l)
  end
end


rk_multi("Quick brown fox jumps over lazy dog", ["row","laz","bow"])


