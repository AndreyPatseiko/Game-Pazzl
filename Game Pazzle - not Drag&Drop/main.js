var log 	= 0;
var visible = true;
var posObjStartX,posObjStartY;


var posCelX 	;
var posCelY 	;
var posCelXright;
var posCelYbot 	;


var image 		= document.getElementById('image');
var pis 		= document.getElementById('pis');
var information = document.getElementById('info');	

// Функция для создания блоков в которые надо закидывать
createDiv();
function createDiv(){
	var i=1;	
		for(var y = 1; y<6 ; y++){
				for(var x = 1; x<9; x++){
					image.innerHTML += '<div class="newdiv" id="hideBlok-'+ i +'" data-info="'+ i++ +'" style="top:'+(y-1)*80+'px;left:'+(x-1)*80+'px;">'+(i-1)+'</div>';
				}
		};
};
//Функция что нужно закидывать
wathDiv();
function wathDiv(){
	var i=1;	
		for(var y = 0; y<5 ; y++){
			for(var x = 0; x<8; x++){
				pis.innerHTML +='<div class="litle" data-num="'+ i++ +'" style="top:'+Math.round(100+Math.random()*350)+'px;left:'+Math.round(10+Math.random()*350)+'px"><img src="2.jpg" style="top:'+(-y*80)+'px; left:'+(-x*80)+'px"></div>'
			};
		};

		var element = document.querySelectorAll('.litle img');
		for(var i=0; i<element.length; i++){
			element[i].addEventListener('dragstart',function(e){e.preventDefault()});//теперь не тянутся
			element[i].addEventListener('mousedown',mousedown);			
		};
	
};

// Timer
var target = image;
var cel    = document.getElementById('hideBlok-1');
var sec = 0;
var min = 0;  
var timerDiv = document.getElementById('timer');
var timerID = setInterval( function(){
	sec++ ;
	if(sec<10){sec='0'+sec};
	if (sec>59) {
			min++;
			sec = 0;
		};
timerDiv.innerHTML = 'Затрачено времени '+min+':'+sec; 
},1000);

function mousedown(e){
	target = this.parentNode ;
	log = 1;
	posObjStartX = this.parentNode.offsetLeft;//первоночальное положение обьекта
	posObjStartY = this.parentNode.offsetTop;//первоночальное положение обьекта

	atrTar = target.getAttribute('data-num');
	cel = document.getElementById('hideBlok-'+atrTar);
	atrCel = cel.getAttribute('data-info');
	
	posCelX 	= Math.round(cel.getBoundingClientRect().x);
	posCelY 	= Math.round(cel.getBoundingClientRect().y);
	posCelXright= Math.round(cel.getBoundingClientRect().right);
	posCelYbot 	= Math.round(cel.getBoundingClientRect().bottom);
	

};

function mouseup(e){
	log = 0;
	
};

var disableDrag = document.addEventListener('mouseup',mouseup);
//Tdtn Move mouse
var add = function(){
document.addEventListener('mousemove',function(event){	

	var posTarX = target.getBoundingClientRect().x+40;//полжение нашего перетаскиваемого обьекта
	var posTarY = target.getBoundingClientRect().y+40;//полжение нашего перетаскиваемого обьекта

	
			var posX = event.pageX;//определяем положение мыши
			var posY = event.pageY;//определяем положение мыши
			
			info.innerHTML = /*'<p>posX='+posX+'; posY='+ posY+'; log='+log+'||| posObjStartX='+posObjStartX
			+';posObjStartY='+posObjStartY+';*/'cel='+cel.getAttribute('data-info')+'</p>'; 

			if(log){			
			target.style='top:'+(posY-40)+'px;left:'+(posX-50)+'px;z-index:1';

			};
			// имитация hover
			// if(((posTarX>posCelX)&&(posCelXright>posTarX)) && ((posCelYbot>posTarY)&&(posTarY>posCelY))){
			// 	cel.classList.add('backgrRed');
			// }else if(visible){				
			// 	cel.classList.add('backgrGray');
			// };
			//проверка что сделали бросок

			if(((posTarX>posCelX)&&(posCelXright>posTarX)) && ((posCelYbot>posTarY)&&(posTarY>posCelY))&&(log == 0)){
				info.innerHTML='<h1>Dropped!!</h1>';
				cel.classList.add('displayNone');
				target.classList.add('displayNone');
				visible = false;
			}else if (((700<posTarX)||(posTarY<50)||(posTarY>500))&&(log == 0)) {
				target.style='top:'+(posObjStartY+5)+'px;left:'+posObjStartX+'px;';
			};
});
};
add();