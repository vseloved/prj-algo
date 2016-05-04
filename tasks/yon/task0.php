<?php
function task0($str)
{
    if (preg_match('/[^\d,\+,\-]+/',$str))
    {
        echo 'This string has not math chars';
    }
    $count = strlen($str);
    $sign = '';
    $res = 0;
    $params = [
        48 => 0,
        49 => 1,
        50 => 2,
        51 => 3,
        52 => 4,
        53 => 5,
        54 => 6,
        55 => 7,
        56 => 8,
        57 => 9,
        43 => '+',
        45 => '-',
    ];
    for($i=0; $i<strlen($str);$i++)
    {
        $charOrd = ord($str[$i]);
        if($i==0 && $charOrd == 43 || $charOrd==45)
        {
            $sign = $charOrd;
            $count--;
            continue;
        }
        elseif($i!=0 && $charOrd == 43 || $charOrd==45 && !in_array($charOrd, array_flip($params))){
            echo 'The string has error format . Change format and try again';
            exit;
        }
        $factor = pow(10,--$count);
        if($count == 0)
        {
            $factor = 1;
        }
        if($sign == 45){
            $res -= $params[$charOrd]*$factor;
        }
        else{
            $res += $params[$charOrd]*$factor;
        }
    }
    echo  $res;
}

task0('-123');
