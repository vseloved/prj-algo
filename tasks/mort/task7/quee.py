class Queue(object):
    def __init__(self):
        self.inbox = []
        self.outbox = []

    def queue(self, item):
        self.inbox.append(item)
        # self.print_inbox()

    def deque(self):
        if not self.outbox:
            while self.inbox:
                self.outbox.append(self.inbox.pop())

        return self.outbox.pop()

    def print_inbox(self):
        print(self.inbox)

    def print_outbox(self):
        print(self.outbox)


q = Queue()
q.queue(4)
q.queue(3)
q.queue(10)
print(q.deque())
q.queue(23)
q.queue(120)
q.queue(110)

print(q.deque())
print(q.deque())
print(q.deque())
print(q.deque())
print(q.deque())
