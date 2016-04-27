<?php

function genMatrix($a,$b)
{
    $res = [];
    for ($i=0;$i<$a;$i++)
    {
        for ($j=0;$j<$b;$j++)
        {
            $res[$i][$j] = rand(-100,100);
        }
    }
    return $res;
}

function printMatrix($array)
{
    echo '<table>';
    foreach ($array as $keyI => $valI)
    {
        echo '<tr>';
        foreach ($valI as $key=>$value)
        {
            echo '<td>'.$value.'</td>';
        }
        echo '</tr>';
    }
    echo '</table>****************************';
}

function raw($array)
{
    return count($array);
}

function column($array)
{
    $row = raw($array);
    return (count($array,COUNT_RECURSIVE)-$row)/$row;
}

function multiplicationMatrix($matrixA, $matrixB)
{
    $matrixAn = column($matrixA);
    $matrixAm = raw($matrixA);
    $matrixBq = column($matrixB);
    $matrixBn = raw($matrixB);

    printMatrix($matrixA);
    printMatrix($matrixB);

    $res = [];
    if($matrixAn == $matrixBn)
    {
        for ($i = 0; $i<$matrixAm; $i++)
        {
            for ($j = 0; $j<$matrixBq; $j++)
            {
                $res[$i][$j] = 0;
                for ($k = 0; $k<$matrixBn; $k++)
                {
                    $res[$i][$j] += $matrixA[$i][$k] * $matrixB[$k][$j];
                }
            }
        }
    }

    printMatrix($res);
}

multiplicationMatrix(genMatrix(6,2), genMatrix(2,3));
