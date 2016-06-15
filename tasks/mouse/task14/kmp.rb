#Задание 1: реализовать алгоритм Кнута-Морриса-Пратта для поиска подстроки в строке.

def kmp(string, pattern)
  table = failure_f(pattern)
  i = 0
  j = 0
  while i < string.length
    if string[i]==pattern[j]
      i=i+1
      j=j+1
      if j==pattern.length
        puts i-j
      end
    else 
      if j != 0
        j = table[j-1]
      else
        i = i+1
      end
    end
  end

end

def failure_f(pattern)
  table = [0]
  l = table[0]
  i = 1
  while i < pattern.length
    if pattern[i]==pattern[l]
      l=l+1
      table[i] = l
      i=i+1
    else 
      if l!=0
        l = table[l-1]
      else
        table[i] = 0
        i=i+1
      end
    end
  end
  puts table.to_s
  table
end

kmp("AABABACABCDABAABCABC","ABCABC" )

