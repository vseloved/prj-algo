#TODO: не делал для всех операций, потому что всех незнаю
true_false = [(True, True), (True, False), (False, True), (False, False)]
result = dict()
operations = {
    'or': lambda params: params[0] or params[1],
    'and': lambda params: params[0] and params[1],
    'F': lambda params: False,
    'T': lambda params: True,
}
head = '  X |  Y | ' + '| '.join(['{:3}'.format(key) for key in operations.keys()])

for cs in true_false:
    result[cs] = '|'.join(['{:4}'.format(param) for param in cs])
    for key, operation in operations.items():
        result[cs] += '|{:4}'.format(operation(cs))

print(head)
for line in result.values():
    print(line)
