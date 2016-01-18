/**
 * This is a 1-Dimensional array school project where I manipulate the array and allow for me to do many different things with it.
 * In this example, I have developed 
 * 
 **/


using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _1DArrays
{
    class Program
    {
        static void Main(string[] args)
        {
            int[] nums = { 1, 4, 13, 43, -25, 17, 22, -37, 29 };
            int[] data = new int[20];

            data = RandomArrayFiller(data);
            int numsLargest = FindLargest(nums);
            int dataLargest = FindLargest(data);
            int sumOfBoth = numsLargest + dataLargest;

            Console.WriteLine("Largest number for the 1st array is: " + numsLargest);
            Console.WriteLine("Largest number for the 2nd array is: " + dataLargest);
            Console.WriteLine("The sum of the Largest numbers from both arrays are: " + sumOfBoth);
            PrintArray(data);
            Console.WriteLine();
            QuickSortArray(data, 0, data.Length - 1);
            PrintArray(data);
            Console.WriteLine();
            Console.WriteLine("The amount of positive numbers in the data array is: " + PositiveLength(data));

            Console.ReadLine();
        }


        /**
         * This function will find the largest number algorithm with an array
         * to find the largest number in the array
         * 
         * @param array is the array that we will use to find the largest number
         * @return the largest number
         **/
        public static int FindLargest(int[] array)
        {
            int largest = 0;

            for (int i = 0; i < array.Length; i++)
            {
                if (array[i] > largest)
                {
                    largest = array[i];
                }
            }

            return largest;
        }

        /**
         * This array will occupy an array with random integers between -100, and 100
         * 
         * @param is the array that will be filled
         * @return the array with newly filled in numbers
         **/
        public static int[] RandomArrayFiller(int[] array)
        {
            int[] newArray = new int[20];
            Random r = new Random();

            for (int i = 0; i < array.Length; i++)
            {
                newArray[i] = r.Next(-100, 100);
            }

            return newArray;
        }


        /**
         * This function will simply just print out the contents of any array
         * 
         * @param is the array that will be printed out
         **/
        public static void PrintArray(int[] array)
        {
            Console.Write("The contents of this array is: ");
            for (int i = 0; i < array.Length; i++)
            {
                Console.Write(array[i] + " ");
            }
        }

        /**
         * My first recursive function, that is actually my first QuickSort algorithm
         * This function will allow to input an array, and compare between a; pivot (middle), left (0), and right (max array length)
         * to sort out the array
         * 
         * @param array is the array that we want to sort
         * @param left the far left of the array
         * @param right is the length of the array
         **/
        public static void QuickSortArray(int[] array, int left, int right)
        {
            int i = left;
            int j = right;
            int tempInt;
            int pivot = array[(i + j) / 2];

            //Partition portion of the sorting method
            while (i <= j)
            {
                while (array[i] < pivot)
                {
                    i++;
                }
                while (array[j] > pivot)
                {
                    j--;
                }
                if (i <= j)
                {
                    //Save and switch
                    tempInt = array[i];
                    array[i] = array[j];
                    array[j] = tempInt;
                    i++;
                    j--;
                }
            }

            //Recursion
            if (left < j)
            {
                QuickSortArray(array, left, j);
            }
            if (i < right)
            {
                QuickSortArray(array, i, right);
            }
        }

        /**
         * This function will return the amount of times a number is positive (0 not included)
         * within an array
         * 
         * @param array is the array to pass that will be checked
         * @return the amount of times a positive number is in an array
         **/
        public static int PositiveLength(int[] array)
        {
            int count = 0;

            for (int i = 0; i < array.Length; i++)
            {
                if (array[i] > 0)
                {
                    count++;
                }
            }

            return count;
        }
    }
}
