using UnityEngine;
using System.Collections;

public class PlayerController : MonoBehaviour {
	
	private float maxSpeed = 4.0f;		//the max speed allowed for the character
	bool facingRight = true;			//is the character facing right?
	
	//Jumping cooldown
	private float jumpTimer;
	private float jumpCoolDown; 
	
	//Creates an animatior component
	private Animator anim;						

	//All of these are for us to check if the player is grounded
	bool grounded = false;
	public Transform groundCheck;			//creates a groundCheck variable @ the player's location
	float groundRadius = 0.2f;				//creates the radius of the circle collider
	public LayerMask whatIsGrounded;		//will check layers to find what is the ground
	
	//Jump Force value, doubleJump, and wallSlide set up
	private float jumpForce = 450.0f;
	bool doubleJump = false;
	

	// Use this for initialization
	void Start () {
	
		// Assigns the Animator to the anim variable
		anim = GetComponent<Animator>();
		
		//initalizers for Jumping cooldown
		jumpTimer = 0;
		jumpCoolDown = 1.0f;

	}
	
	// Update is called once per frame
	void FixedUpdate () {
		
		Movement();

	}

	void Update(){
		
		
//		Raycasting();
		
		if (jumpTimer > 0){
			jumpTimer = jumpTimer - Time.deltaTime;
		}
		
		if (jumpTimer < 0){
			jumpTimer = 0;
		}
		
		if(Input.GetButton("Jump")){
			if (jumpTimer == 0){
				Jumping();
				jumpTimer = jumpCoolDown;
			}
		}
		
	}
	
	
	
	void Movement(){
		
		if (grounded){
			doubleJump = false;	
		}

		//Constant 2D check to see if the player is on the ground
		grounded = Physics2D.OverlapCircle(groundCheck.position, groundRadius, whatIsGrounded);
		anim.SetBool("Ground", grounded);

		//Sets up the vertical speed for the jumping up/down velocity
		anim.SetFloat("vSpeed",rigidbody2D.velocity.y);
	
		//Assigns for Horizontal movement, applied to a float value
		float move = Input.GetAxis("Horizontal");

		//Allows for smooth movement w/o need of Time.deltaTime
		anim.SetFloat ("speed", Mathf.Abs(move));

		//Creates an eaiser way to add velocity
		rigidbody2D.velocity = new Vector2 (move * maxSpeed, rigidbody2D.velocity.y);

		//World Flip checks
		//if facing right, Flip so character is facing right
		if ((move > 0.0f) && !facingRight){
			Flip();
		}
		//if facing left, Flip so character is facing left
		else if ((move < 0.0f) && facingRight){
			Flip();
		}
	}
	
	
	
	void Jumping(){
		
		//if grounded can use the Space key to jump
		if ((grounded || !doubleJump)){
			
			//If grounded, jump with a new vector2 and y = jumpForce
			anim.SetBool("Ground", false);
			rigidbody2D.AddForce(new Vector2(0, jumpForce));
		}
}
	
	

	void Flip(){

		facingRight = !facingRight;					//if facingRight =/= true

		Vector3 theScale = gameObject.transform.localScale;	//Create a new Vector3 localScaling of the World

		theScale.x *= -1;							//flips the world so it's going opposite
		gameObject.transform.localScale = theScale;			//make the reversed view the new localScale of the transform

	}
	
	
	
//	void Raycasting(){
//		
//		//use raycast to draw a line in front of the player
//		//if raycast hits a wall while jumping goto wallslide = true
//		//if wallSlide = true, ani.SetBool("wallSlide", wallSlide)
//		//call the function inside the jump fumction
//		
//		RaycastHit2D originhit = Physics2D.Raycast(transform.position, transform.right, 1.0f, 1 << LayerMask.NameToLayer("Wallh"));
//		
//		if (originhit) {
//			
//			Debug.Log(originhit.collider);
//		}
//		
//		Debug.DrawRay(transform.position, transform.right, Color.cyan);
//		
//		}
	
	
		
}