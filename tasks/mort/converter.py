strings_to_int = {
    '0': 0,
    '1': 1,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
}


def convert_string_to_int(string_int):
    numeric_int = 0
    for c in string_int:
        numeric_int = numeric_int * 10 + strings_to_int.get(c)
    return numeric_int

print(isinstance(convert_string_to_int('1234567890'), int))
print(isinstance('1234567890', int))
print(convert_string_to_int('1234567890') == 1234567890)