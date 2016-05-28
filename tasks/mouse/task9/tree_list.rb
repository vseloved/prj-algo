#Обход для списка списков

def dfs(tree) 
  puts tree[0]
  tree[1..tree.length-1].each do |t|
    if !t
      return
    end
    dfs(t)
  end
   
end


def bfs(tree)
  
  queue = [tree]
  while queue.length > 0
    node = queue.shift
    node[1..node.length-1].each do |t|
      queue << t
    end
    puts node[0]
  end
  
end

tree = ['a', ['b',['d'],['e',['h']], ['f'] ],['c',['g']]]

dfs(tree)

bfs(tree)

