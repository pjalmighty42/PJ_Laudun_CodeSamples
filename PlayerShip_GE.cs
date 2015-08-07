using UnityEngine;
using System.Collections;

public class PlayerShip : MonoBehaviour
{
    /*
     * Created by: PJ
     * Copyright @ 2014
     * Modified by: PJ & Chane
     */

	private float speed, nextFire, moveHorz, moveVert, moveHorzJP, moveVertJP;
	private float xMin, xMax, yMin, yMax;
	public float fireRate;
	private Vector3 move;
	private int switchModeCounter;

	public bool bUsingKeyBoard, bIsNonLethal;

	private FireLaser laserFire;

	//Vars for the Lethal Lasers
	public Transform lShotSpawn1;
	public Rigidbody laserL1;
	public Transform lShotSpawn2;
	public Rigidbody laserL2;

	//Vars for the Non-Lethal Lasers
	public Transform nlShotSpawn1;
	public Rigidbody laserNL1;
	public Transform nlShotSpawn2;
	public Rigidbody laserNL2;

	[HideInInspector]
	public static int weaponPower, maxWeaponPower, playerHealth, maxPlayerHealth, playerShield, maxPlayerShield;
	public static bool isSpeed;


	void Start()
	{

		bUsingKeyBoard = true;
		bIsNonLethal = false;

		speed = 12.0f;
		xMin = -17.0f;
		xMax = 9.0f;
		yMin = -9.0f;
		yMax = 9.0f;

		nextFire = 0.0f;
		fireRate = 1.0f;

		maxPlayerHealth = 100;
		playerHealth = maxPlayerHealth;

		maxWeaponPower = 25;
		weaponPower = maxWeaponPower;

		maxPlayerShield = 100;
		playerShield = maxPlayerShield;

		isSpeed = true;
	}


	void Update()
	{

		//Weapon switch if the player is using KeyBoard Controls
		if (bUsingKeyBoard == true) 
		{
			//Laser type conditionals amd firers
			if(Input.GetButton("LaserChoiceLKB"))
			{
				bIsNonLethal = false;
				PlayerHUD.isLethal = true;
			}
			else if(Input.GetButton("LaserChoiceNLKB"))
			{
				bIsNonLethal = true;
				PlayerHUD.isLethal = false;
			}
		}
		
		
		//Weapon switch if the player is using JoyPad Controls
		if (bUsingKeyBoard == false) 
		{
			//Laser type conditionals amd firers
			if(Input.GetButtonDown("LaserChoiceJP"))
			{
				bIsNonLethal = true;
				PlayerHUD.isLethal = true;
			}
			else if(Input.GetButtonDown("LaserChoiceJP"))
			{
				bIsNonLethal = false;
				PlayerHUD.isLethal = false;
			}
		}

		//Lethal Shooting - Keyboard
		if ((bUsingKeyBoard == true) && (bIsNonLethal == false))
		{
			if (Input.GetButton("LeathalFireKB") && (Time.time > nextFire))
			    { 
				  	nextFire = Time.time + fireRate;

					Instantiate (laserL1, lShotSpawn1.position, lShotSpawn1.rotation);
					Instantiate (laserL2, lShotSpawn2.position, lShotSpawn2.rotation);
				}
		}
		//Lethal Shooting - JoyPad
		if ((bUsingKeyBoard == false) && (bIsNonLethal == false))
		{
			if (Input.GetButton("LeathalFireJP") && (Time.time > nextFire))
				{
					nextFire = Time.time + fireRate;

					Instantiate (laserL1, lShotSpawn1.position, lShotSpawn1.rotation);
					Instantiate (laserL2, lShotSpawn2.position, lShotSpawn2.rotation);
				}
		}



		//Non-Lethal Shooting - Keyboard
		if ((bUsingKeyBoard == true) && (bIsNonLethal == true))
		{
			if (Input.GetButton("NLeathalFireKB") && (Time.time > nextFire))
			{
				nextFire = Time.time + fireRate;

				Instantiate (laserNL1, nlShotSpawn1.position, nlShotSpawn1.rotation);
				Instantiate (laserNL2, nlShotSpawn2.position, nlShotSpawn2.rotation);
			}
		}
		//Non-Lethal Shooting - JoyPad
		if ((bUsingKeyBoard == false) && (bIsNonLethal == true))
		{
			if (Input.GetButton("NLeathalFireJP") && (Time.time > nextFire))
			{
				nextFire = Time.time + fireRate;

				Instantiate (laserNL1, nlShotSpawn1.position, nlShotSpawn1.rotation);
				Instantiate (laserNL2, nlShotSpawn2.position, nlShotSpawn2.rotation);
			}
		}
	}
	
	//Used only for the movement of the ship
	void FixedUpdate()
	{
		//Code for bot the KeyBoard and JoyPad Movements
		if (bUsingKeyBoard) 
		{
			KBMovement ();
		} 
		else 
		{
			JPMovement();
		}

	}

	//for movement using the Keyboard
	void KBMovement()
	{
		if (isSpeed)
		{
			SpeedMode();

			if (Input.GetButtonDown("FreeModeKB"))
			{
				isSpeed = false;
			}
		}

		if (!isSpeed)
		{
			FreeMode();

			if (Input.GetButtonDown("SpeedModeKB"))
			{
				isSpeed = true;
		}
	}
	}

	//for movement using the Joy Pad
	void JPMovement()
	{
		if (isSpeed)
		{
			SpeedMode();
		}
	}

	void SpeedMode()
	{
		Debug.Log("In Speed Mode");

		if (bUsingKeyBoard)
		{
			moveHorz = Input.GetAxis ("Horizontal");
			moveVert = Input.GetAxis ("Vertical");
		
			move = new Vector3(moveHorz, moveVert, 0.0f);
			rigidbody.velocity = move * speed;
		
			rigidbody.position = new Vector3((Mathf.Clamp(rigidbody.position.x, xMin, xMax)), 
		                                 (Mathf.Clamp(rigidbody.position.y, yMin, yMax)),
		                                 0.0f);
		}


	}

	void FreeMode()
	{
		Debug.Log("In Free Mode");

		if (bUsingKeyBoard)
		{
			move = new Vector3(moveHorz, 0.0f, moveVert);
			rigidbody.velocity = move * speed;
			
			rigidbody.position = new Vector3((Mathf.Clamp(rigidbody.position.x, xMin, xMax)), 
			                                 (Mathf.Clamp(rigidbody.position.y, yMin, yMax)),
			                                 0.0f);

			if(Input.GetButton("Vertical") && moveVert >0)
			{
				this.transform.Rotate(0,0,2f);
			}
			if(Input.GetButton("Horizontal")&& moveHorz >0)
			{
				transform.Translate(Vector3.right * speed * Time.deltaTime);
			}
			if(Input.GetButton("Vertical") && moveVert <0)
			{
				this.transform.Rotate(0,0,-2f);
			}
			if(Input.GetButton("Horizontal")&& moveHorz <0)
			{
				transform.Translate(Vector3.left * speed * Time.deltaTime);
			}
		}

	
	}
}