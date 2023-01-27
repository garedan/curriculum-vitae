$(function() {

//Loader
/* $('#loader-name').addClass('loader-up');
$('#loader-job').addClass('loader-up');
$('#loader-animation').addClass('loader-up');
setTimeout(function(){
  $('#page-loader').addClass('loader-out');
  return false;
}, 400);  
$('#page-loader').delay(1000).fadeOut(10); */

// Portfolio Filter
/* var catActive = '';

$('#filter-header .category-item').on('click', function(event){    
  var catActive = $(this).attr('data-filter');  
  $('#filter-header .category-item').removeClass('category-item-active'); 
  $(this).addClass('category-item-active');
  $("#filter-container .filter-item").removeClass('project-item-disabled');  
  $("#filter-container .filter-item:not(." + catActive + ")").addClass('project-item-disabled');
  event.preventDefault();
}); */

//Viewport
let windowHeight = $(window).height();

function adjustViewport() {
  $('.viewport').css('min-height', windowHeight);
  return false;
}
adjustViewport();


$('.contOut').animate({
	'opacity':'1'
},1200);

setTimeout(function(){
	$('.fa-plus').closest('.job').find('p').slideDown();
    $( ".fa-minus" ).trigger( "click" );

}, 50)

$(document).on('click', '#btnOtro', function() {
	setTimeout(function(){
		$('.fa-plus').closest('.job').find('p').slideDown();
		$( ".fa-minus" ).trigger( "click" );
	
	}, 100)
})
$(document).on('click', '.openBtn', function() {
    
    if ($(this).hasClass('open')) {
      $(this).removeClass('open').removeClass('fa-minus').addClass('fa-plus');
      $(this).closest('.job').find('p').animate({
        'opacity':'0'
      },200).slideUp();
    } else {
      $(this).addClass('open').removeClass('fa-plus').addClass('fa-minus');
      $(this).closest('.job').find('p').slideDown().animate({
        'opacity':'1'
      },400);
    }
  });


// Maps iframe Overlay
/* var map = $('#map');
map.on('click', function () {
    $('#map iframe').css("pointer-events", "auto");
    return false;
});

map.on('mouseleave', function () {
    $('#map iframe').css("pointer-events", "none");
    return false;
}); */

//Forms

//Modal for Forms
/* function hideModal() {
  $('.modal-wrap').fadeOut(300);
  return false;
}

$('.modal-wrap').on('click', function () {
  hideModal();
});   

$('.modal-bg').on('click', function () {
  hideModal();
});  */

//Anchor Smooth Scroll
   $('a[href*=#]:not([href=#])').on('click', function () {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        let target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top
          }, 1000);
          return false;
        }
      }
    });
		
});	

function getDataFromJSON() {

	const $showData = $("#show-data");
	const $showData2 = $("#propertydiv");
	const $showData3 = $("#valuediv");
	const $raw = $("pre");
	let datos;

	let datos2 = [];
	let obj = {};
	
	$.getJSON("./studies.json", (data) => {
		let keys = Object.keys(data.studies);
		let randomKey = keys[Math.floor(Math.random()*keys.length)];
		
		const markup3 = data.studies[randomKey]
		  .map((item) => `
			  <div class='contOut clearfix'>
				  <div class='contIn'>
					<div class='section middle clearfix'>
						<div class='job'>
							<h2>
								${item.titulo}
								<i class='fa fa-minus openBtn open'>
								</i><span>${item.periodo}</span>
							</h2>
							<p>
								<span>${item.institucion}</span>
							<br/>
							</p>
						</div>
					</div>
				  </div>
			</div>			
		  `
		  )
		  .join("");
		  
		  const list2 = $("<ul  />").append(markup3);

		  $showData3.html(list2);

		  $raw.text(JSON.stringify(data, undefined, 2));
	
	});
	
	$.getJSON("./jobs.json", (data) => {
		datos = data
		
		let keys = Object.keys(data.jobs);
		let randomKey = keys[Math.floor(Math.random()*keys.length)];

		obj['job'] =  data.jobs[randomKey];
		datos2.push(obj.job[0].puesto);
		//console.log("puesto", datos2);
		let selector = document.getElementById("job1");
		selector.innerHTML = datos2[0];
		
		const markup2 = data.jobs[randomKey]
		  .map((item) => `
			  <div class='contOut clearfix'>
				  <div class='contIn'>
					<div class='section middle clearfix'>
						<div class='job'>

								<h2 id='interact'>
									${item.lugar}
									<i class='fa fa-minus openBtn open'></i>
									<span>${item.periodo}</span>
								</h2>

								<p>  
								<span>${item.puesto}</span>
								<br>
									<span class="brag">
										<span>- ${item.desc1}</span>
										<br>
										<span>- ${item.desc2}</span>
										<br>
										<span>- ${item.desc3}</span>														
									</span>
								</p>
						</div>
					</div>
				
				  </div>
			</div>
		  `
		  )
		  .join("");
		
		const list2 = $("<ul />").append(markup2);

		$showData2.html(list2);

		$raw.text(JSON.stringify(data, undefined, 2));
		
		//console.log("data.items", datos2)
		//console.log(randomKey)
	  });
}
  getDataFromAPI()
  getDataFromJSON()

  function getDataFromAPI() {

	let datos = [];
	let obj = {};

	$.ajax({
		url: 'https://randomuser.me/api/',
		dataType: 'json',
		success: function(data) {
			obj['image'] =  data.results[0].picture.large;
			obj['namePerson'] =  data.results[0].name.first + " " + data.results[0].name.last;
			obj['number'] =  data.results[0].location.street.number;
			obj['nameStreet'] = data.results[0].location.street.name
			obj['city'] =  data.results[0].location.city;
			obj['country'] = data.results[0].location.country;
			obj['edad'] =  data.results[0].dob.age + " años";
			obj['email'] =  data.results[0].email;
			obj['telefono'] =  data.results[0].phone;
			datos.push(obj);

			/* console.log(data);					
			console.log("datos: ", JSON.stringify(datos)) */

			getDirection("direccion")
			getDirection("direccionForm")

			getData("image2", "image")
			getData("name2", "namePerson")
			getData("edad", "edad")
			getData("email2", "email")
			getData("emailForm", "email")
			getData("telefono", "telefono")
			getData("phoneForm", "telefono")

			getData("test", "namePerson")
		}
	});
	
	function getData(selectorID, datas= '') {
		let selector = document.getElementById(selectorID);
		selector.innerHTML = datos[0][datas];
		if(datas === "image") {
			selector.src = datos[0][datas]
		}

		return selector
	}

	function getDirection(selectorID) {
		console.log("datos2: ", JSON.stringify(datos))
		let selector = document.getElementById(selectorID);

		selector.innerHTML = datos[0].number + " " + datos[0].nameStreet + " - " + datos[0].city + " - " + datos[0].country;

		return selector
	}
  }
