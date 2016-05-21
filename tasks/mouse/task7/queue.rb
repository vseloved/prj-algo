class Stack
  def initialize
    @stack = []
  end

  def push(elem) 
    @stack.push(elem)
  end

  def pop 
    @stack.pop
  end

  def length
    @stack.length
  end
  
  def print
    @stack.to_s
  end
end

class Queue

  def initialize(stack1, stack2)
    @stack1 = stack1
    @stack2 = stack2
  end
  
  def enqueue(elem)
    @stack1.push(elem)
  end
  
  def dequeue
    if @stack1.length==0
      return
    end
    @stack1.length.times do |i|
      @stack2.push(@stack1.pop)
    end
    pop = @stack2.pop
    @stack2.length.times do |i|
      @stack1.push(@stack2.pop)
    end
  end
  
  def print
    @stack1.print.to_s
  end
end

class Deque < Queue
  
  def enqueue_front(elem)
    @stack1.length.times do |i|
      @stack2.push(@stack1.pop)
    end
    @stack1.push(elem)
    @stack2.length.times do |i|
      @stack1.push(@stack2.pop)
    end    
  end
  
  def dequeue_back
    @stack1.pop
  end

  
end

stack1 = Stack.new()
stack2 = Stack.new()
queue = Queue.new(stack1, stack2)
queue.enqueue(2)
queue.enqueue(4)
queue.enqueue(7)
puts queue.print
puts queue.dequeue

stack3 = Stack.new()
stack4 = Stack.new()
deque = Deque.new(stack3, stack4)
deque.enqueue_front(2)
deque.enqueue_front(4)
deque.enqueue_front(7)
puts deque.print
puts deque.dequeue_back
