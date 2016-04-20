using System;

namespace ConsoleApplication1
{
    public class Parser
    {

        static void Main() 
        {
			RunDummyTests();
		
			Console.ReadKey();
		}

        public static Int32 ParseString(string number)
        {
            if (String.IsNullOrEmpty(number))
                throw new ArgumentNullException("number");

            Int32 result = 0;
            Int32 multiplier = 1;

            for (var i = number.Length - 1; i >= 0; i--)
            {
                if (number[i] == '-')
                    if (i == 0)
                        return result*-1;
                    else
                        throw new Exception("Incorrect number format");

                var b = GetByte(number[i]);
                result += b*multiplier;
                multiplier *= 10;
            }
            return result;
        }

        private static byte GetByte(char number)
        {
            switch (number)
            {
                case '0':
                    return 0;
                case '1':
                    return 1;
                case '2':
                    return 2;
                case '3':
                    return 3;
                case '4':
                    return 4;
                case '5':
                    return 5;
                case '6':
                    return 6;
                case '7':
                    return 7;
                case '8':
                    return 8;
                case '9':
                    return 9;
                default:
                    throw new NotSupportedException("Char is not number");
            }
        }

        public static void RunDummyTests()
        {
            ExecuteTest("0");
            ExecuteTest("-1000");
            ExecuteTest("1000");
            ExecuteTest(new Random().Next().ToString());
            ExecuteTest(Int32.MinValue.ToString());
            ExecuteTest(Int32.MaxValue.ToString());
            ExecuteTest("");
            ExecuteTest("not a number");
            ExecuteTest("11-22");
        }

        private static void ExecuteTest(string number)
        {
            try
            {
                var actual = Parser.ParseString(number);

                Console.WriteLine("Parse \"{0}\" retuns {1}", number, actual);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Parse \"{0}\" throws exception {1}", number, ex.Message);
            }
            Console.WriteLine("****************");
        }
    }
}