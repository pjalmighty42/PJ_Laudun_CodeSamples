using UnityEngine;
using System.Collections;

[RequireComponent(typeof(Rigidbody))]
public class PlayerController : uLink.MonoBehaviour
{
    //Gameplay constants
    private static readonly float speed = 1500;
    private static readonly float airSpeed = 300;
    private static readonly float jumpSpeed = 3.75f;

    //public Animator animator;
    public Transform cameraController;
    public CharacterBouyancyController bouyancy;
    private Vector2 input; //This saves space on the stack so we don't have to allocate space each update

    //Movement
	public bool useInput = true;

	private bool wasGrounded;
    private bool requestJump;
    private bool jump;
    private bool swimming;
    private float airTime;
    public Vector3 velocity; //used for maintaining player motion
    private Vector3 bouyantForce; //gravity velocity
    private bool isGrounded;

    public float maxAngleY;
    public float minAngleY;
    private float yAngle;
	private int updateCounter = 0; 

    void Start()
    {

    }

    void Update()
    {
		if (useInput)
		{
			input.x += Input.GetAxis("Horizontal");
			input.y += Input.GetAxis("Vertical");
		}
    }

    void FixedUpdate()
    {
        //Rotation/Look
        yAngle -= Input.GetAxis("Mouse Y") * 5f;
        if (yAngle < minAngleY) yAngle = minAngleY;
        else if (yAngle > maxAngleY) yAngle = maxAngleY;
        if (cameraController != null) cameraController.localRotation = Quaternion.Euler(yAngle, 0, 0);
        transform.Rotate(Vector3.up, Input.GetAxis("Mouse X") * 5);

        requestJump != Input.GetButtonDown("Jump"); //if request jump or jump already requested

        //Mecanim parts
        jump = requestJump && isGrounded; //jump on jump press and grounded
        requestJump = false; //reset jump request
        if (bouyancy != null) swimming = bouyancy.Floating;

        float angle = -Mathf.Rad2Deg * Mathf.Atan2(input.y, input.x) + 90;
        if (angle > 180) angle -= 360;
        //animator.SetFloat("Velocity", Mathf.Clamp01(input.magnitude));
        //animator.SetFloat("Direction", angle);

        //Pass action params to mecanim
        //animator.SetBool("Grounded", isGrounded);
        //animator.SetBool("Swimming", this.swimming);
        //animator.SetBool("Jump", this.jump);
        //animator.SetFloat("AirTime", this.airTime);

        if (swimming)
            ApplyBouyancy();

        ApplyCharacterMotion();

        if (isGrounded)
            airTime = 0.0f;
        else airTime += Time.fixedDeltaTime;

        wasGrounded = isGrounded && !jump;
        if (rigidbody != null) rigidbody.AddForce(velocity);//DISABLE BOUYANCY + bouyantForce * Time.fixedDeltaTime); //Move velocity + gravelocity
		
		//Update Rate, dependant on network step
		updateCounter++;
		if(updateCounter > 1)
		{
			updateCounter = 0;
			if (networkView != null) networkView.RPC("UpdateMovement", uLink.RPCMode.Others, transform.position, transform.rotation,velocity); //TODO improve perfomance, for example float for rotation
		}

        input.x = 0;
        input.y = 0;
    }

    private void ApplyBouyancy()
    {
        bouyantForce = Vector3.Lerp(bouyantForce, -Physics.gravity, Time.fixedDeltaTime);
    }

    private void ApplyCharacterMotion()
    {
        input.Normalize(); //Normalize controller input, disables chording
        velocity = Vector3.zero;
        velocity += this.transform.right * input.x * Time.fixedDeltaTime * (isGrounded ? speed : airSpeed);
        velocity += this.transform.forward * input.y * Time.fixedDeltaTime * (isGrounded ? speed : airSpeed);

        if (jump)
        {
            bouyantForce = this.transform.up * jumpSpeed;
        }
    }

    //swimming

    void OnCollisionStay(Collision collision)
    {
        isGrounded = true;
    }

#if UNITY_EDITOR
    //Debugging UI
    void OnGUI()
    {
        //GUI.Label(new Rect(0, 0, 100, 32), "Grnd " + animator.GetBool("Grounded"));
        //GUI.Label(new Rect(100, 0, 100, 32), "Vel " + animator.GetFloat("Velocity"));
        //GUI.Label(new Rect(200, 0, 100, 32), "Dir " + animator.GetFloat("Direction"));
    }
#endif
}