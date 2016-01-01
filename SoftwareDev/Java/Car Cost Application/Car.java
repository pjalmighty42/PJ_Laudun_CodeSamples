package mainPackage;

public class Car 
{
	private int milesDriven, mpg, purchaseCost;
	private float gasCost, pricePerGallon, totalCost;
	
	//Constructors
	
	/*
	 * Constructor that will make Miles Driven, MPG, PPG, and Purchase Cost equal Zero.
	 */
	Car()
	{
		milesDriven = 0;
		mpg = 0;
		pricePerGallon = 0;
		purchaseCost = 0;
	}
	
	/*
	 * Constructor that will pass in the: Miles Driven, MPG, PPG, and Purchase Cost.
	 */
	Car(int md, int m, int pc, float ppg)
	{
		milesDriven = md;
		mpg = m;
		pricePerGallon = ppg;
		purchaseCost = pc;
	}
	
	
	//Accessors (Getters)
	
	/*
	 * Will get the current Miles Driven for the vehicle
	 * @return milesDriven
	 * */
	public int GetMilesDriven()
	{
		return milesDriven;
	}
	
	/*
	 * Will get the current MPG for the vehicle
	 * @return mpg
	 * */
	public int GetMPG()
	{
		return mpg;
	}
	
	/*
	 * Will get the current Price Per Gallon for the vehicle
	 * @return pricePerGallon
	 * */
	public float GetPPG()
	{
		return pricePerGallon;
	}
	
	/*
	 * Will get the current Purchase Cost for the vehicle
	 * @return purchaseCost
	 * */
	public float GetPurchaseCost()
	{
		return purchaseCost;
	}
	
	/*
	 * Will take all the variables given 
	 * Then it will do the Math needed to compute the Total Cost for the vehicle
	 * @return totalCost
	 * */
	public float TotalCost()
	{
		gasCost = (milesDriven / mpg) * pricePerGallon;
		
		totalCost = purchaseCost + gasCost;
		
		return totalCost;
	}
}
