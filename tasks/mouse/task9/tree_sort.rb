#Задание 3: Реализовать алгоритм сортировки деревом, который заключается в построение дерева бинарного поиска 
#(любого варианта из реализаций) и обходе его в порядке in-order. 
#Сколько операций нужно вашему алгоритму в среднем и худшем случае?

#в середньому - O(n log n), в найгіршому - O(n**2) (вставка в дерево log n, але якщо дерево виходить не збалансоване, то може зайняти n)

def insert_node(tree,el)
  if tree[0] > el #goes to left
    if !tree[1] 
      tree[1] = []
      tree[1][0] = [el]
    elsif !tree[1][0]
       tree[1][0] = [el]  
    else
      insert_node(tree[1][0],el)
    end
  else #goes to right
    if !tree[1] 
      tree[1] = []
      tree[1][1] = [el]
    elsif !tree[1][1]
      tree[1][1] = [el]
    else
      insert_node(tree[1][1],el)
    end    
  end
  tree
end

def inorder(tree)
  if tree[1]
    if tree[1][0]
      inorder tree[1][0]
    end
  end 
  if tree[0]
  puts tree[0]
  end
  if tree[1]
    if tree[1][1]
      inorder tree[1][1]
    end
  end 
end

def treesort(arr)
  tree = [arr[0]]
  arr[1..arr.length-1].each do |el|
    tree = insert_node(tree,el)
  end
  inorder(tree)
end

puts treesort([2,4,1,0,5,8,9,7,3])

