// JavaScript Document
$(document).ready(function(e) 
{
	/************************* Picture Title/Description Effects */
	
	var expand = false;
	
	$('#picInfoDescr').slideUp(0.1);
	
	$('#picInfoTitle').on("click", function()
	{
		expand = !expand;
		
		if(expand)
		{
			$(this).animate({
				width:'1070px'	
			},
			700
			);
			$('#picInfoDescr').slideDown(700).css('opacity', 0.9);
		}
		else if (!expand)
		{
			$(this).animate({
				width:'750px'	
			},
			700
			);
			$('#picInfoDescr').slideUp(700);
		}
	});
	
	$('#tab1Header1').on("click", function()
	{
		$('#tab1').css("z-index", 1);
		$('#tab2').css("z-index", 0);
		$('#tab3').css("z-index", 0);
	});
	
	$('#tab2Header2').on("click", function()
	{
		$('#tab2').css("z-index", 1);
		$('#tab1').css("z-index", 0);
		$('#tab3').css("z-index", 0);
	});
	
	$('#tab3Header3').on("click", function()
	{
		$('#tab3').css("z-index", 1);
		$('#tab1').css("z-index", 0);
		$('#tab2').css("z-index", 0);
	});
	
	//For the drop down menu/switching of imgs
	$('#ClimbingGear').on("click", function()
	{
		$('.gear').css("display", inline-block);
		$('.mens').css("display", none);
		$('.womens').css("display", none);
		$('.hardware').css("display", none);
	});
	
	$('#ClothingMens').on("click", function()
	{
		$('.mens').css("display", inline-block);
		$('.gear').css("display", none);
		$('.womens').css("display", none);
		$('.hardware').css("display", none);
	});
	
	$('#ClothingWomen').on("click", function()
	{
		$('.womens').css("display", inline-block);
		$('.mens').css("display", none);
		$('.gear').css("display", none);
		$('.hardware').css("display", none);
	});
	
	$('#ClothingHardware').on("click", function()
	{
		$('.hardware').css("display", inline-block);
		$('.womens').css("display", none);
		$('.mens').css("display", none);
		$('.gear').css("display", none);
	});
});