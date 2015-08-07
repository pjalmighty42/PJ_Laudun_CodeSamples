using UnityEngine;
using System.Collections;

public class AI_Attack : MonoBehaviour {

	public enum AIState
	{
		Idle,
		Chase,
		Attack,
		Dead
	}

	//Current AI State
	public AIState curState;

	//AI Speed
	public float curSpeed;

	//AI Rotation
	public bool flipAI;

	//AI Stats
	private static int health;
	private int armorLvl;
	public int pwrLvl;
	private float attackRate;
	private float distChk;
	private float attackDist;

	//Time
	private float elapsedTime;

	//Enemy (Player)
	public GameObject player;
	public Transform playerTrans;

	//AI
	public GameObject myGO;
	public Transform myTrans;


	private void AIIdleState()
	{
		//Shhhh...The AI is sleeping...
		curSpeed = 0.0f;

		//move towards the Player
		myTrans.position -= myTrans.right * curSpeed * Time.deltaTime;

		//if the Player gets too close, CHASE!!
		if (distChk < 220.0f)
		{
			Debug.Log("Player TOO CLOSE!! Chase him!!!");
			curState = AIState.Chase;
		}
		//else the AI is still passed out
		else if (distChk > 220.0f)
		{
			Debug.Log("Player too far...Yawn, me too tired...");
			curState = AIState.Idle;
		}

		//death check
		if (health <= 0)
		{
			curState = AIState.Dead;
		}
	}
	

	private void AIChaseState()
	{
		//distance variable check for Attack mode!
		curSpeed = 7.0f;
		float idleDist = 221.0f;

		Vector3 theScale = transform.localScale;
		theScale.x *= 1;
		transform.localScale = theScale;

		//the Vector3 translation of Vector3.right
		Vector3 leftMove = new Vector3 (1, 0, 0);

		//move towards the Player
		myTrans.position -= leftMove * curSpeed * Time.deltaTime;

		//if the AI is close to the player, ATTACK!!
		if (distChk <= attackDist)
		{
			Debug.Log("On the player!! Time to kill him!!");
			curState = AIState.Attack;
		}
		//else, still chasing the player!
		else if (distChk > attackDist)
		{
			Debug.Log("Bugger is quick! Still chasing him!");
			curState = AIState.Chase;

			//checks to see if the ai should flip horizontally
			if (myTrans.position.x < playerTrans.position.x)
			{
				Debug.Log("The player is behind me!! Turning around!!");
				flipAI = true;
			}

			if (flipAI)
			{
				FlipAI();
			}
		}

		//death check
		if (health <= 0)
		{
			curState = AIState.Dead;
		}
	}

	void FlipAI()
	{
		curSpeed = 0;

		//rotates towards the player/locks the x & z axis from turning while turning
		//myTrans.Rotate(new Vector3(0, 180, 0));
		Vector3 theScale = transform.localScale;
		theScale.x *= -1;
		transform.localScale = theScale;
		
		//the AI now uses rightMove to move towards the p0layer
		//the Vector3 translation of Vector3.left
		Vector3 rightMove = new Vector3(-1, 0, 0);
		
		myTrans.position -= rightMove * curSpeed * Time.deltaTime;

		//checks to see if the ai should flip horizontally
		if (myTrans.position.x > playerTrans.position.x)
		{
			flipAI = false;

			theScale.x *= 1;
			transform.localScale = theScale;

			AIChaseState();
		}

	}

	private void AIAttackState()
	{
		//distance variable check for Attack mode!
		float attackDist = 45.0f;
		curSpeed = 0.0f;
		float attackRate = 2000.0f;

		//Float check between the AI and the Player (non-raycast)
		float distChk = Vector3.Distance(transform.position, player.transform.position);

		//move towards the Player
		myTrans.position -= myTrans.right * curSpeed * Time.deltaTime;

		//If the AI is still in attack range, well...attack.
		if (distChk <= attackDist)
		{
			//attack power modifier
			if (attackRate >= elapsedTime)
			{
				if (pwrLvl == 1)
				{
					PlayerController.playerHealth -= 25;
				}
				else if (pwrLvl == 2)
				{
					PlayerController.playerHealth -= 50;
				}
				else if (pwrLvl == 3)
				{
					PlayerController.playerHealth -= 75;
				}
			}

			//player health check, if still alive, attack some more!
			if (PlayerController.playerHealth >= 1)
			{
				curState = AIState.Attack;
			}
			//else, player ded, goto sleep
			else if (PlayerController.playerHealth <= 0)
			{
				curState = AIState.Idle;
			}

		}
		//If the player runs away, Chase him!!!
		else if (distChk >= attackDist)
		{
			curState = AIState.Chase;
		}

		//death check
		if (health <= 0)
		{
			curState = AIState.Dead;
		}
	}


	private void AIDeadState()
	{
		//AI health check, if still alive, fight to the death!!
		if (health >= 1)
		{
			curState = AIState.Attack;
		}
		//else, AI ded! Destroy off the screen!
		else if (health <= 0)
		{
			GameObject.Destroy(gameObject);
		}
	}


	void Awake()
	{
		curSpeed = 20.0f;
		flipAI = false;
		
		health = 100;
		pwrLvl = 1;
		attackRate = 2.0f;
		attackDist = 10.0f;
		
		elapsedTime = 0.0f;
		
		player = GameObject.FindGameObjectWithTag("Player");
		playerTrans = player.transform;

		myGO = GameObject.FindGameObjectWithTag("Enemy");
		myTrans = myGO.transform;

	}


	void Start ()
	{
		distChk = Vector3.Distance(myTrans.position, playerTrans.position);

		Debug.Log("Distance Check = " + distChk);

		curState = AIState.Idle;
		
		switch (curState)
		{
		case AIState.Idle: AIIdleState();
			return;
		case AIState.Chase: AIChaseState();
			return;
		case AIState.Attack: AIAttackState();
			return;
		case AIState.Dead: AIDeadState();
			return;
		}
	}

	// Update is called once per frame
	void Update () 
	{

		distChk = Vector3.Distance(myTrans.position, playerTrans.position);
		//Update the time (for the AI Attacking)
		elapsedTime += Time.deltaTime;

//		Debug.Log("Distance Check = " + distChk);
//		Debug.Log("Attack Dist = " + attackDist);

		switch (curState)
		{
		case AIState.Idle: AIIdleState();
			return;
		case AIState.Chase: AIChaseState();
			return;
		case AIState.Attack: AIAttackState();
			return;
		case AIState.Dead: AIDeadState();
			return;
		}

		//No health == Dead
		if (health <= 0)
		{
			curState = AIState.Dead;
		}
	}

}
