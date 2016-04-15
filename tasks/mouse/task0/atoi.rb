def atoi(string)

  array = []

  string.reverse.each_byte do |s|
    if s < 48 || s > 57
      next
      #альтернативний варіант:
      #raise "Can't convert"
      #break
    else     
      array << s-48
    end
  end
  
  array_muliplied = array.map.with_index{ |a, i| a*(10**i) }
  
  array_muliplied.inject(0){|sum,x| sum + x }
  
end

puts "Enter string"
string = gets.chomp
puts "You entered #{string} and its class is #{string.class}"
result = atoi(string)
puts "Result of conversion is #{result} and its class is #{result.class}" 
