<?php
/**
 * @param $array
 * @return int
 * @throws Exception
 */
function findPeak($array)
{
    $length = count($array);
    $peak = 0;

    if (!$length) {
        throw new Exception('Empty array');
    }

    for ($i = 1; $i < $length-1; $i++)
    {
        if (is_array($array[$i])) {
            $innerLength = count($array[$i]);

            for ($j = 1; $j < $innerLength-1; $j++) {
                if ($array[$i-1][$j] < $array[$i][$j] &&
                    $array[$i][$j-1] < $array[$i][$j] &&
                    $array[$i+1][$j] < $array[$i][$j] &&
                    $array[$i][$j+1] < $array[$i][$j]
                ) {
                    $peak = $array[$i][$j];
                }
            }
        } elseif ($array[$i-1] < $array[$i] && $array[$i+1] < $array[$i]) {
            $peak = $array[$i];
        }
    }

    return $peak;
}


$array = [
    [1, 55, 22, 2, 21, 23],
    [7, 29, 11, 9, 6, 54],
    [99, 155, 33, 9, 6, 54],
    [3, 5, 44, 11, 9, 6],
    [9, 6, 54, 3, 5, 44],
    [6, 32, 1, 7, 29, 11],
    [2, 21, 23, 1, 55, 22]
];

//$array = [321, 32, 1, 243, 20, 28, 44, 223, 21, 45, 66, 7];

echo findPeak($array);
