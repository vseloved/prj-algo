#Обход для массива

def first_child(i, b_factor)
  1+b_factor*i
end

def parent(i, b_factor)
  (i-1)/b_factor
end

def dfs(tree, ind, b_factor)

    if ind>=tree.length
      return
    end
    puts tree[ind]
    ch = first_child(ind, b_factor) 
    if tree[ch]=="-"
      ind = ind+1
      dfs(tree, ind, b_factor)
    elsif !tree[ch]
      par = parent(ind, b_factor)
      if !tree[par+1] || tree[par+1]=="-"
        return
      end
      dfs(tree, par+1, b_factor)
    else
      dfs(tree, ch, b_factor)
    end

end

def bfs(tree)
  tree.each do |t|
    puts t unless t=="-"
  end
end

tree = ["a","b","c","-","d","e","f","g","-","-","-","-","-","-","-","-","h"]

dfs(tree, 0, 3)

bfs(tree)
