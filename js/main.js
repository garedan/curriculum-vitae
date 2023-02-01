$(function() {

//Viewport
let windowHeight = $(window).height();

function adjustViewport() {
  $('.viewport').css('min-height', windowHeight);
  return false;
}
adjustViewport();

$(document).on('click', '#btnExpand', function(){
	if ($('.openBtn').hasClass('open')) {
		$('.openBtn').removeClass('open').removeClass('fa-minus').addClass('fa-plus');
		$('.openBtn').closest('.job').find('p').animate({
		  'opacity':'0'
		},200).slideUp();
	  } else {
		$('.openBtn').addClass('open').removeClass('fa-plus').addClass('fa-minus');
		$('.openBtn').closest('.job').find('p').slideDown().animate({
		  'opacity':'1'
		},400);
	  }
})

$('.contOut').animate({
	'opacity':'1'
},1200);

setTimeout(function(){
	$('.fa-plus').closest('.job').find('p').slideDown();
    $( ".fa-minus" ).trigger( "click" );

}, 150)

$(document).on('click', '#btnOtro', function() {
	/* doc.deletePage(1) */
	doc.setPage(2) 
	
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

let datosForPDF = []
let objForPDF = {}

let doc = new jsPDF({
	format: 'legal'
	
});
function getStudiesForPDF() {

	
	$.getJSON("./studies.json", (data) => {
		let keys = Object.keys(data.studies);
		//let randomKey = keys[Math.floor(Math.random()*keys.length)];
		let i= 0
		for(k= 0; k < data.studies[randomKey].length; k++) {
				console.log(data.studies[randomKey][k].titulo);
				console.log(data.studies[randomKey][k].periodo);
				console.log(data.studies[randomKey][k].institucion);
				
				doc.text(20, 125+i, "Titulo: " + data.studies[randomKey][k].titulo);
				doc.text(20, 135+i, "Periodo: " + data.studies[randomKey][k].periodo);
				doc.text(20, 145+i, "Institucion: " + data.studies[randomKey][k].institucion);  

				i += 35
		}
	
	});
	
}

function getJobsForPDF() {
	
	$.getJSON("./jobs.json", (data) => {
		let keys = Object.keys(data.jobs);
		//let randomKey = keys[Math.floor(Math.random()*keys.length)];
		let i= 0
		for(k= 0; k < data.jobs[randomJob].length; k++) {
				console.log(data.jobs[randomJob][k].puesto);
				console.log(data.jobs[randomJob][k].lugar);
				console.log(data.jobs[randomJob][k].periodo);
				
				doc.text(20, 210+i, data.jobs[randomJob][k].puesto);
				doc.text(20, 220+i, data.jobs[randomJob][k].lugar);
				doc.text(20, 230+i, data.jobs[randomJob][k].periodo);    
	
		
				i += 35
		}
		
	})

}
let randomKey
let randomJob
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
		randomKey = keys[Math.floor(Math.random()*keys.length)];
		
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
		randomJob = keys[Math.floor(Math.random()*keys.length)];

		obj['job'] =  data.jobs[randomJob];
		datos2.push(obj.job[0].puesto);
		//console.log("puesto", datos2);
		let selector = document.getElementById("job1");
		selector.innerHTML = datos2[0];
		
		const markup2 = data.jobs[randomJob]
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
//   dataToPDF()
  	
  $(document).on('click', '#saveToPDF', function() {
	dataToPDF()
		setTimeout(function(){
			doc.save('Test.pdf');
		}, 3000)
	})

	let datos = [];
	let obj = {};
  function getDataFromAPI() {


		$.ajax({
			url: 'https://randomuser.me/api/',
			dataType: 'jsonp',
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
			//console.log("datos2: ", JSON.stringify(datos))
			let selector = document.getElementById(selectorID);

			selector.innerHTML = datos[0].number + " " + datos[0].nameStreet + " - " + datos[0].city + " - " + datos[0].country;

			return selector
		}
		
	}
	
	function dataToPDF() {
		let img = new Image();
		img.crossOrigin = "anonymous"; 
	
		function getImageData(data_gen, data_img) {
	
			//let imageURL = image
			img.src = "https://api.allorigins.win/raw?url=https://randomuser.me/api/portraits/" + data_gen + "/" + data_img
			
			return img.src
		}
	
		setTimeout(function(){
	
			let splitURL = obj.image.toString().split("/")	
			getImageData(splitURL[5], splitURL[6])
			
		}, 1000 )
	
		setTimeout(function(){
			doc.setPage(1)
			doc.addImage(img, 'JPG', 20, 10);
			doc.text(20, 60, "Nombre: " + obj.namePerson);
			doc.text(20, 70, "Edad: " + obj.edad);
			doc.text(20, 80, "Dirección: " + obj.number + " " + obj.nameStreet + " " + obj.city + " " + obj.country);
			doc.text(20, 90, "Email: " + obj.email);
			doc.text(20, 100, "Telefono: " + obj.telefono);
			doc.text(20, 115, "EDUCACION:");
			getStudiesForPDF() 
			doc.text(20, 200, "EXPERIENCIA");
			
			getJobsForPDF()
		}, 2000 )

		
	}
	/* $(document).on('click', '#btnOtro', function() {
		//alert('deleted')
		doc.deletePage(1)
		dataToPDF()
	}) */

//console.log("name", datos[0]["number"]); */	
//{"image":"https://randomuser.me/api/portraits/women/33.jpg","namePerson":"Milla Klingenberg","number":287,"nameStreet":"Tors gate","city":"Rossnes","country":"Norway","edad":"62 años","email":"milla.klingenberg@example.com","telefono":"60276045"}

/*
var newURL="https://randomuser.me/api/portraits/women/33.jpg";
console.log(newURL);
var splitURL=newURL.toString().split("/");
console.log(splitURL);
*/