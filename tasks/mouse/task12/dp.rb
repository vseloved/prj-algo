str = <<-FOO
The land returns to how it has always been,
the scent of Thyme carried on the wind.
Jagged mountains, jutting out,
crags like teeth in a rotten mouth.
On battleship hill I hear the wind,
say cruel nature has won again
FOO

class Divider

  MAX_WIDTH = 80

  def initialize(string)
    @string = string
  end
  
  def ugliness(line)
    (MAX_WIDTH - length(line))**3
  end
  
  def arr
    @string.split(" ")
  end
  
  def length(line)
    l = 0
    line.each do |w|
      l = l + w.length
    end
    l+line.length-1 # + пробіли
  end
  
  def divide
    ugs = {} 
    ugs[0] = 0 
    ks = {}
    ks[0] = 0 
    length = arr.length-1
    
    for i in 1..length
      k_ugs = {}
      k = i
      while k > 0
        line = []
        for j in k-1..i
          line << arr[j]
        end
        if length(line)>=MAX_WIDTH
          break
        end
        u = ugliness(line)+ugs[k-1]
        k_ugs[u] = k-1
        k = k-1
      end
      min_ugl = k_ugs.keys.min
      ugs[i] = min_ugl
      ks[i] = k_ugs[min_ugl]
    end
    
    res = []
    while length >=1
        row = ""
        arow = []
        for i in ks[length]..length
          row = row+arr[i] 
          arow << arr[i]
        end
        s = MAX_WIDTH-row.length
        l = arow.length-1
        m = s%l
        sp = " "*((s-m)/l)
        aa = arow.each_with_index.map do |a,i|
          if i<=m
            a+sp+" "
          elsif i==arow.length-1
            a
          else
            a+sp
          end
        end
        res << aa.join()
        length = ks[length] - 1
    end

    res.reverse.each do |r|
      puts r
    end
  end
end

div = Divider.new(str)
div.divide


=begin
Output
The  land  returns  to  how  it  has  always  been,  the  scent  of Thyme carried
on  the  wind.  Jagged  mountains,  jutting  out,  crags  like  teeth in a rotten
mouth.  On  Battleship  Hill  I  hear  the  wind,  say cruel nature has won again
=end
