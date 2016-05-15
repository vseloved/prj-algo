<?php

/**
 * @param array $matrix1
 * @param array $matrix2
 * @return array
 */
function matrix(array $matrix1, array $matrix2)
{
    $m1Len = count($matrix1);
    $innerMatrix1Len = count($matrix1[0]);
    $innerMatrix2Len = count($matrix2[0]);
    $resultMatrix = [];

    for ($i = 0; $i < $m1Len; $i++) {

        for ($j = 0; $j < $innerMatrix2Len; $j++) {
            $innerResult = 0;

            for ($k = 0; $k < $innerMatrix1Len; $k++) {
                if (!$matrix1[$i][$k]) {
                    $innerResult += $matrix2[$k][$j];
                } elseif (!$matrix2[$k][$j]) {
                    $innerResult += $matrix1[$i][$k];
                } else {
                    $innerResult += $matrix1[$i][$k] * $matrix2[$k][$j];
                }
            }

            $resultMatrix[$i][$j] = $innerResult;
        }

    }

    return $resultMatrix;
}


$matrix1 = [
    [2, 7],
    [1, 9],
    [8, 4]
];

$matrix2 = [
    [2, 7, 1],
    [3, 4, 5],
];

var_dump(matrix($matrix1, $matrix2));exit;
