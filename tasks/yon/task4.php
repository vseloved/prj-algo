<?php
function findPosition($array, $find)
{
    if(count($array)>0)
    {
        $center = (int)ceil(count($array)/2);
        if($array[$center] == $find)
        {
            echo $center;
        }
        else{
            if($array[$center] > $find)
            {
                $newArray = array_slice($array, 0 , $center, true);
            }
            else{
                $newArray = array_slice($array, $center, count($array), true);
            }
            if(count($newArray) != 1)
                return findPosition($newArray, $find);
            else return 'not found';
        }
    }
    else
    {
        return 'rong format';
    }

}

$array = [1,2,4,5,6,7,8,9];


findPosition($array,2);
