class DoubleQueue(object):
    def __init__(self):
        self.inbox = []
        self.outbox = []

    def push_back(self, item):
        while self.outbox:
            self.inbox.append(self.outbox.pop())

        self.outbox.append(item)
        self.print_outbox()
        self.print_inbox()
        print()

    def push_front(self, item):
        while self.inbox:
            self.outbox.append(self.inbox.pop())

        self.inbox.append(item)
        self.print_outbox()
        self.print_inbox()
        print()

    def pop_back(self):
        while self.outbox:
            self.inbox.append(self.outbox.pop())
        self.print_outbox()
        self.print_inbox()
        return self.inbox.pop()

    def pop_front(self):
        while self.inbox:
            self.outbox.append(self.inbox.pop())
        self.print_outbox()
        self.print_inbox()
        return self.outbox.pop()

    def print_inbox(self):
        print(self.inbox)

    def print_outbox(self):
        print(self.outbox)


q = DoubleQueue()
q.push_back(3)
q.push_back(4)
q.push_back(5)
q.push_front(2)
q.push_front(1)
print(q.pop_back())
print(q.pop_front())
print(q.pop_back())
print(q.pop_front())
