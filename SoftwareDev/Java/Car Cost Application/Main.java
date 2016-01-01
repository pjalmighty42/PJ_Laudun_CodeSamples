/***@author PJ Laudun*/

package mainPackage;

import java.util.Scanner;

public class Main 
{
	static Car car1;
	static Car car2;
	
	public static void main(String[] args) 
	{
		int setMIDriven, car1MPG, car1PurchaseCost, car2MPG, car2PurchaseCost;
		float totalPPG, car1TotalCost, car2TotalCost;
		
		Scanner scan = new Scanner(System.in);
		
		//Set Global vars
		do
		{
			System.out.print("Please input the Miles that will be Driven for both cars: ");
			setMIDriven = scan.nextInt();
		}
		while(setMIDriven <= 0);
		
		do
		{
			System.out.print("Please input the total Price Per Gallon of Gasoline: ");
			totalPPG = scan.nextFloat();
		}
		while(totalPPG <= 0);
		
		//Set Car-specific vars
		do
		{
			System.out.print("Please input Car 1's Miles Per Gallon: ");
			car1MPG = scan.nextInt();
		}
		while(car1MPG <= 0);
		
		do
		{
			System.out.print("Please input Car 1's Purchase Cost: ");
			car1PurchaseCost = scan.nextInt();
		}
		while(car1PurchaseCost <= 0);
		
		do
		{
			System.out.print("Please input Car 2's Miles Per Gallon: ");
			car2MPG = scan.nextInt();
		}
		while(car2MPG <= 0);
		
		do
		{
			System.out.print("Please input Car 2's Purchase Cost: ");
			car2PurchaseCost = scan.nextInt();
		}
		while(car2PurchaseCost <= 0);
		
		//Car(int md, int m, int pc, float ppg)
		car1 = new Car(setMIDriven, car1MPG, car1PurchaseCost, totalPPG);
		car2 = new Car(setMIDriven, car2MPG, car2PurchaseCost, totalPPG);
		
		//Total Car costs
		car1TotalCost = car1.TotalCost();
		car2TotalCost = car2.TotalCost();
		
		System.out.println("Car 1 cost: " + car1TotalCost);
		System.out.println("Car 2 cost: " + car2TotalCost);
		
		if (car1TotalCost < car2TotalCost)
		{
			System.out.println("Car 1 is a better deal!\nBuy Car 1!");
		}
		else
		{
			System.out.println("Car 2 is a better deal!\nBuy Car 2!");
		}
		
		scan.close();
	}
}
