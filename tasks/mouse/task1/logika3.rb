class Boolie

  attr_reader :x, :y
  
  def initialize(x,y)
    @x=x
    @y=y
  end
  
  def fls
    "f"
  end

  def tru
    "t"
  end
 
  def xnory
    x+y=="ff" ? "t" : "f"
  end
  
  def xnoty
    x+y=="tf" ?  "t" : "f"
  end
  
  def noty
    y=="f" ? "t" : "f" 
  end

  def notx
    x=="f" ? "t" : "f" 
  end
  
  def ynotx
    x+y=="ft" ?  "t" : "f"
  end
 
  def xor
    if (x+y=="ft") || (x+y=="tf")
      "t"
    else
      "f"
    end
  end
  
  def nand
    x+y=="ff" ? "t" : "f"
  end
  
  def xandy
    x+y=="tt" ? "t" : "f"
  end
  
  def eqv
    x==y ? "t" : "f"
  end
  
  def ifx
    x=="t" ? "t" : "f"
  end
  
  def ify
    y=="t" ? "t" : "f"
  end
  
  def xtoy
    x+y=="tf" ?  "f" : "t"
  end
  
  def ytox
    x+y=="ft" ?  "f" : "t"
  end
  
  def xory
    x+y=="ff" ?  "f" : "t"
  end

end

methods = Boolie.instance_methods(false)

boolie0 = Boolie.new("f","f")
boolie1 = Boolie.new("t","f")
boolie2 = Boolie.new("f","t")
boolie3 = Boolie.new("t","t")

rows = ["","","",""]

methods.each { |method| print method.to_s+" | " }
print "\n"

rows.map.with_index do |row,i|
  methods.each do |method|
    row=row+eval("boolie"+i.to_s+"."+method.to_s)+" | "
  end
  row = row+"\n"
  puts row
end





