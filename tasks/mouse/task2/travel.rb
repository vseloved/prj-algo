=begin
каждый раз выбирать самый коротое ребро, если оно не создает циклов, 
а когда у точки появляется и входящий и исходящий путь, удалять эту точку из дальнейшего рассмотрения
=end

=begin
  функція повертає масив ребер і загальну дистанцію
=end

def get_dist(p1, p2)
  Math.sqrt((p1.first - p2.first)**2 + (p1.last - p2.last)**2 )
end


def road_trip(points)

  metapoints = Hash.new
  points.each do |point|
    metapoints[point] = 0  # тут буде зберігатись інформація про те шо з точки виходить ребро, якщо к-сть ребер 2, точка видаляється
  end

  combination = points.combination(2).to_a
  
  array_of_edges = []
  
  loop do
    shortest_dist = 0
    shortest_edge = []
    combination.each do |combo|
      ones = metapoints.map{ |key,value| value==1 ? key : nil }.compact
      if ones.sort! == combo.sort!
        next
      else
        dist = get_dist(combo[0], combo[1])
        if (shortest_dist == 0) || (shortest_dist > dist)
          shortest_dist = dist
          shortest_edge = [combo[0], combo[1]]
        end
      end
    end
    combination.delete(shortest_edge)
    array_of_edges << [shortest_edge, shortest_dist]
    metapoints[shortest_edge[0]] = metapoints[shortest_edge[0]]+1
    if metapoints[shortest_edge[0]] == 2
      metapoints.delete(shortest_edge[0])
    end
    metapoints[shortest_edge[1]] = metapoints[shortest_edge[1]]+1
    if metapoints[shortest_edge[1]] == 2
      metapoints.delete(shortest_edge[1])
    end    
    if metapoints.count==1
      break
    end
  end
  
  total_dist = 0
  array_of_edges.each do |edge|
    total_dist = total_dist+edge[1]
  end
  puts array_of_edges.to_s
  puts total_dist
end


road_trip([[2,3],[4,6],[1,9],[1,7],[4,9]])
