# -*- coding: utf-8 -*-
"""
Created on Sun Apr 17 17:15:14 2016

@author: Polka
"""
from __future__ import division

def string_to_int(input_string):
    """
    Converts string to ingeger number.
    This function treats your string, for example, '1337' as
    '1337' -> 1 * 10**3 + 3 * 10**2 + 3 * 10**1 + 7 * 10**0 = 1337
    """
    if type(input_string) != str:
        print "ERROR: Input is not a string"
        return
    table = {'1':1,
             '2':2,
             '3':3,
             '4':4,
             '5':5,
             '6':6,
             '7':7,
             '8':8,
             '9':9,
             '0':0}
    length = len(input_string) 
    output_number = 0        
    for symbol, position in zip(input_string, xrange(length)):
        try:
            output_number += table[symbol]*(10**(length - (position+1))) 
        except KeyError:
            print 'Function argument contain not only numbers in range 0-9. \n \
Can not convert to integer'               
    return output_number