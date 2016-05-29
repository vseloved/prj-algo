#обход для узлов

def dfs(tree)
  
  puts tree[:node]
  if !tree[:children]
    return
  end
  tree[:children].each do |ch|
    dfs(ch)
  end

end

def bfs(tree)
  
  queue = [tree]
  while queue.length > 0
    node = queue.shift
    if node[:children]
      node[:children].each do |ch|
        queue << ch
      end
    end
    puts node[:node]
  end
  
end

tree = { 
  node: 'a', children: [
    {node: 'b', children: 
      [{node: 'd'}, 
       {node: 'e', children: [{node: 'h'}]}, 
       {node: 'f'}]},
    {node: 'c', children: [{node: 'g'}]}
  ]
}

dfs(tree)

bfs(tree)


