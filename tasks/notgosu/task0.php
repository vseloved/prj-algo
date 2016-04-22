<?php
/**
 * Author: Pavel Naumenko
 */

class task0 {

    /**
     * @param $string
     * @return int
     */
    public function atoi($string) {
        $result = 0;

        if (is_string($string)) {
            $strLen = strlen($string);

            for ($i = 0; $i < $strLen; $i++) {
                if ($string[$i] >= '0' && $string[$i] <= '9') {
                    $result = $result * 10 + $string[$i] * 1;
                }
            }
        }

        return $result;
    }

    public function runTest() {
        $task = new task0();

        $noString = assert($task->atoi(31231) === 0);
        $partString = assert($task->atoi('ewqewq123') === 123);
        $partStringMirror = assert($task->atoi('312qewewq') === 312);
        $longString = assert($task->atoi('321321327813') === 321321327813);
        $usualString = assert($task->atoi('32312312') === 32312312);
        $zeroString = assert($task->atoi('0') === 0);
        $emptyString = assert($task->atoi('') === 0);

        var_dump($noString, $partString, $partStringMirror, $longString, $usualString, $zeroString, $emptyString);
    }
}

$task = new task0();
$task->runTest();
