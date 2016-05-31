def _ugliness_cost(token_len):
    return token_len**3


def justify(string_line, width=80):
    tokens = string_line.split(" ")
    costs = [
        [None] * len(tokens) for i in range(len(tokens))
    ]
    # Calculating the number of extra spaces
    # that will be needed to fill each line.
    for i in xrange(len(tokens)):
        costs[i][i] = width - len(tokens[i])
        for j in xrange(i + 1, len(tokens)):
            costs[i][j] = costs[i][j - 1] - len(tokens[j]) - 1
    # Then calculating costs of putting words in resulting line.
    for i in xrange(len(tokens)):
        for j in xrange(len(tokens)):
            costs[i][j] = (float("inf") if costs[i][j] < 0
                           else _ugliness_cost(costs[i][j]))
    # Next we're going to use calculated table
    # to find the way to justify text.
    minumum_cost = [None] * len(tokens)
    final_result = [None] * len(tokens)
    for i in xrange(len(tokens) - 1, -1, -1):
        minumum_cost[i] = costs[i][len(tokens) - 1]
        final_result[i] = len(tokens)
        for j in xrange(len(tokens) - 1, i, -1):
            if costs[i][j - 1] == float("inf"):
                continue
            if minumum_cost[i] > (minumum_cost[j] + costs[i][j - 1]):
                minumum_cost[i] = minumum_cost[j] + costs[i][j - 1]
                final_result[i] = j
    # Actual text justification.
    i = j = 0
    justified_string = ""
    while j < len(tokens):
        j = final_result[i]
        for x in xrange(i, j):
            justified_string += "%s " % tokens[x]
        justified_string += "\n"
        i = j
    return justified_string


s = "They lean unsteadily on canes and walkers, or roll along the sidewalks of Skid Row here in beat-up wheelchairs, past soiled sleeping bags, swaying tents and piles of garbage. They wander the streets in tattered winter coats, even in the warmth of spring. They worry about the illnesses of age and how they will approach death without the help of children who long ago drifted from their lives."

print justify(s, 80)
