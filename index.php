<?php 
//index.php 
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>3D Virtual Grocery - by Lau Ka Pui</title>

  <link rel="apple-touch-icon" sizes="57x57" href="img/favicon/apple-icon-57x57.png">
  <link rel="apple-touch-icon" sizes="60x60" href="img/favicon/apple-icon-60x60.png">
  <link rel="apple-touch-icon" sizes="72x72" href="img/favicon/apple-icon-72x72.png">
  <link rel="apple-touch-icon" sizes="76x76" href="img/favicon/apple-icon-76x76.png">
  <link rel="apple-touch-icon" sizes="114x114" href="img/favicon/apple-icon-114x114.png">
  <link rel="apple-touch-icon" sizes="120x120" href="img/favicon/apple-icon-120x120.png">
  <link rel="apple-touch-icon" sizes="144x144" href="img/favicon/apple-icon-144x144.png">
  <link rel="apple-touch-icon" sizes="152x152" href="img/favicon/apple-icon-152x152.png">
  <link rel="apple-touch-icon" sizes="180x180" href="img/favicon/apple-icon-180x180.png">
  <link rel="icon" type="image/png" sizes="192x192" href="img/favicon/android-icon-192x192.png">
  <link rel="icon" type="image/png" sizes="32x32" href="img/favicon/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="96x96" href="img/favicon/favicon-96x96.png">
  <link rel="icon" type="image/png" sizes="16x16" href="img/favicon/favicon-16x16.png">
  <link rel="manifest" href="img/favicon/manifest.json">
  <meta name="msapplication-TileColor" content="#ffffff">
  <meta name="msapplication-TileImage" content="img/favicon/ms-icon-144x144.png">
  <meta name="theme-color" content="#ffffff">
  <link rel="shortcut icon" href="img/favicon/favicon.ico" type="image/x-icon">
  <link rel="icon" href="img/favicon/favicon.ico" type="image/x-icon">

  <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'>
  <link rel="stylesheet" href="css/bootstrap.min.css" />
  <link rel="stylesheet" href="css/style.css">

  <!-- cartSystem -->
  <style>
		.popover
		{
		    width: 100%;
		    max-width: 1000px;
		}
		</style>
  <!-- cartSystem end -->

</head>

<body>

  <!-- loader -->
  <div class='loader_logo'>
    <img src='img/logo.png'>
  </div>
  <div class='loader'>
    <div class='loader_inner'></div>
  </div>
  <!-- loader end -->

  <!-- 3d -->
  <div id='canvas'></div>
  <div class='ui'>

    <!-- menu -->
    <div class="menu-container">
      <input type="checkbox" id="openmenu" class="hamburger-checkbox">
      <div class="hamburger-icon">
      <span class="badge"></span><!-- cartSystem <span class="badge"></span> deployed-->
        <label for="openmenu" id="hamburger-label">
          <div class="hamburger-bg">
          </div>
        </label>
      </div>
      <div class="menu-pane">
          <!-- cartSystem -->
          <div class="container">
			<br/>
      <br/>
			<h3 align="right">LAU Ka Pui's PHP Ajax Shopping Cart by using Bootstrap Popover</h3>
			<br/>
			<nav class="navbar navbar-default" role="navigation">
				<div class="container-fluid">
					<div class="navbar-header">
						<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">
						<span class="sr-only">Menu</span>
						<span class="glyphicon glyphicon-menu-hamburger"></span>
						</button>
					</div>
					<div id="navbar-cart" class="navbar-collapse collapse">
						<ul class="nav navbar-nav" id="cart-popover">
							<li>
									<span class="glyphicon glyphicon-shopping-cart">[CheckOut]</span>
                  <span class="glyphicon glyphicon-refresh">[Refresh]</span>
                  <span>Total:</span>
									<span class="total_price">GEM 0.00</span>
							</li>
						</ul>
					</div>	
				</div>
			</nav>
			<div id="popover_content_wrapper" style="display: none">
				<span id="cart_details"></span>
				<div align="right">
					<a href="card.php" class="btn btn-primary" id="check_out_cart">
					<span class="glyphicon glyphicon-shopping-cart"></span> Check out
					</a>
					<a href="#" class="btn btn-default" id="clear_cart">
					<span class="glyphicon glyphicon-trash"></span> Clear
					</a>
				</div>
			</div>
			<div id="display_item">
			</div>
		</div>
          <!-- cartSystem end -->
      </div>
    </div>
    <!-- menu end -->

    <div class='noise'></div>
    <div class='vig'></div>
    <div class='bloom'></div>
    <div class='fullscreen'>
      <i class='fa fa-expand'></i>
    </div>
    <div class='logo'>
      <img src='img/logo.png'>
    </div>
    <div class='gems'>
      <img src='img/gemsBg.png'>
    </div>
    <div class='cs'>
      <img src='img/csBg.png'>
    </div>
    <div class="tdimension">
      <div class='follow'>
        <a href='https://www.behance.net/cyruslau' target='_blank'>
          <img src='img/cyrus.png'>
        </a>
      </div>
    </div>
    <div class='left button'>
      <img src='img/arrowBg.png'>
    </div>
    <div class='right button'>
      <img src='img/arrowBg.png'>
    </div>
    <!-- productDetails -->
    <div class='box'>
      <div class='box_inner' data-deep-animate-time='.7' data-deep-animate='false' data-deep-ui='true'>
        <div class='box_inner__title' data-depth='20'>
          Food Container
        </div>
        <div class='box_inner__decal'>
          <img src='img/decalBg.png'>
        </div>
        <div class='box_inner__text' data-depth='10'>
          I'm not a food container...
        </div>
        <div class='box_inner__cost' data-depth='31'>
          <div class='left'>
            <i class='fa fa-diamond'></i>
          </div>
          <div class='right'>
            20
          </div>
        </div>
        <div class='box_inner__cta' data-depth='31'>
          <span data-depth='44'>Buy with credits</span><img id="addedToCart" src="">
        </div>
      </div>
    </div>
    <!-- productDetails end -->
  </div>
  <!-- 3d end -->
  
  <!-- partial -->
  <script>
    var product3dLink = "3d/container/container.gltf"
    var product3dLink2 = "3d/leaf.gltf"
    var product3dLink3 = "3d/flower/flower.gltf"
    var product3dLink4 = "3d/cactus.glb"
    var product3dLink5 = "3d/cup.glb"
    var product3dLink6 = "3d/palm.glb"
    var product3dLink7 = "3d/plane.gltf"
    var product3dLink8 = "3d/spiked.gltf"
    var product3dLink9 = "3d/spruce.glb"
    var product3dLink10 = "3d/cube/cube.gltf"
    var wallTextureLink = "img/wall/wall.jpeg"
    var wallTextureLink2 = "img/wall/wall2.jpeg"
    var wallTextureLink3 = "img/wall/wall3.jpeg"
    var wallTextureLink4 = "img/wall/wall4.jpeg"
    var wallTextureLink5 = "img/wall/wall5.png"
    var wallTextureLink6 = "img/wall/wall6.jpeg"
    var wallTextureLink7 = "img/wall/wall7.jpeg"
    var wallTextureLink8 = "img/wall/wall8.jpeg"
    var wallTextureLink9 = "img/wall/wall9.jpeg"
    var wallTextureLink10 = "img/wall/wall10.jpeg"
    // ## Crate information array
//defaultForm
var pid = "1"
var pname = "Food Container"
var pprice = "20"
//subjectToChange
crateInfoArray = [{
  pid: "1",
    pname: "Food Container", // First crate
    pdesc: "I'm not a food container...",
    pprice: "20"
}, {
  pid: "2",
    pname: "Big Leaf Plant",
    pdesc: "Hi, I'm a plant as you can see.",
    pprice: "200"
}, {
  pid: "3",
    pname: "Smile Flower",
    pdesc: "Why I'm always smiling?",
    pprice: "150"
}, {
  pid: "4",
    pname: "Cactus",
    pdesc: "Don't touch me OK?",
    pprice: "150"
}, {
  pid: "5",
    pname: "Cup",
    pdesc: "A cup without cappuccino.",
    pprice: "10"
}, {
  pid: "6",
    pname: "Palm",
    pdesc: "Don't try to bite me, I'm so hard.",
    pprice: "250"
}, {
  pid: "7",
    pname: "Plane",
    pdesc: "A toy plane but unattractive.",
    pprice: "500"
}, {
  pid: "8",
    pname: "Spiked Plant",
    pdesc: "I won't hurt you baby.",
    pprice: "100"
}, {
  pid: "9",
    pname: "Tree",
    pdesc: "A regular tree like a regular guy.",
    pprice: "25"
}, {
  pid: "10",
    pname: "Cube",
    pdesc: "I'm a playful cube with good mindset.",
    pprice: "50"
}]
    </script>
  <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js'></script>
  <script src='https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.1/TweenMax.min.js'></script>
  <script src='https://cdnjs.cloudflare.com/ajax/libs/three.js/r126/three.min.js'></script>
  <script src='https://threejs.org/examples/js/controls/OrbitControls.js'></script>
  <script src='https://threejs.org/examples/js/loaders/GLTFLoader.js'></script>
  <script src="js/bootstrap.min.js"></script>
  <script src="js/script.js"></script>

</body>

</html>

<script>  
$(document).ready(function(){

	load_product();

	load_cart_data();
    
	function load_product()
	{
		$.ajax({
			url:"fetch_item.php",
			method:"POST",
			success:function(data)
			{
				$('#display_item').html(data);
			}
		});
	}

	function load_cart_data()
	{
		$.ajax({
			url:"fetch_cart.php",
			method:"POST",
			dataType:"json",
			success:function(data)
			{
				$('#cart_details').html(data.cart_details);
				$('.total_price').text(data.total_price);
				$('.badge').text(data.total_item);
			}
		});
	}

	$('#cart-popover').popover({
		html : true,
        container: 'body',
        content:function(){
        	return $('#popover_content_wrapper').html();
        }
	});

	$(document).on('click', '.add_to_cart', function(){
		var product_id = $(this).attr("id");
		var product_name = $('#name'+product_id+'').val();
		var product_price = $('#price'+product_id+'').val();
		var product_quantity = $('#quantity'+product_id).val();
		var action = "add";
		if(product_quantity > 0)
		{
			$.ajax({
				url:"action.php",
				method:"POST",
				data:{product_id:product_id, product_name:product_name, product_price:product_price, product_quantity:product_quantity, action:action},
				success:function(data)
				{
					load_cart_data();
				}
			});
		}
		else
		{
			alert("Please Enter Number of Quantity");
		}
	});

	$(document).on('click', '.delete', function(){
		var product_id = $(this).attr("id");
		var action = 'remove';
		if(confirm("Are you sure you want to remove this product?"))
		{
			$.ajax({
				url:"action.php",
				method:"POST",
				data:{product_id:product_id, action:action},
				success:function()
				{
					load_cart_data();
					$('#cart-popover').popover('hide');
				}
			})
		}
		else
		{
			return false;
		}
	});

	$(document).on('click', '#clear_cart', function(){
		var action = 'empty';
		$.ajax({
			url:"action.php",
			method:"POST",
			data:{action:action},
			success:function()
			{
				load_cart_data();
				$('#cart-popover').popover('hide');
				alert("Your Cart has been clear");
			}
		});
	});

});
</script>