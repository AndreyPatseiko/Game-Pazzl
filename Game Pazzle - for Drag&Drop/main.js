addEventListener('load',initiate);
function initiate(){
//Start coding
createDiv();
wathDiv();
};

// Функция для создания блоков в которые надо закидывать
function createDiv(){
	var i=1;	
	for(var y = 1; y<6 ; y++){
			for(var x = 1; x<9; x++){
		image.innerHTML += '<div class="newdiv" data-info="'+ i++ +'"></div>';}

	};
};
//Функция что нужно закидывать
function wathDiv(){
	var i=1;	
	var coordPis = document.getElementById('pis').getBoundingClientRect();
	var xPisMin = 10;//Math.floor(coordPis.left);
	console.log(xPisMin);
	var yPisMin = 20;//coordPis.top;
	var xPisMax = Math.floor(coordPis.right)-140;
	var yPisMax = 600;//coordPis.bottom;
	var posObjxMax = 200;
	var posObjxMin = 950;
	
	for(var y = 0; y<5 ; y++){
			for(var x = 0; x<8; x++){
				pis.innerHTML +='<div class="litle"><img src="img/2.jpg" data-num="'+ i++ +'" style="top:'+(-y*80)+'px; left:'+(-x*80)+'px"></div>'
					
	};

};
};
document.addEventListener('mousemove',function(event){
var	posX = event.pageX-40;
var	posY = event.pageY-40;	

var info = document.getElementById('info');		//в него будем отображать что происходит
var element = document.querySelectorAll('.litle img');	//элемент который тянем
var cel = document.querySelectorAll('#image div');		//элемент куда тянем( в который будем ложить)
var image = document.getElementById('image');
var pis = document.getElementById('pis');

	for(var i=0; i<element.length; i++){
	
		element[i].addEventListener('dragstart',dragstart);
		element[i].addEventListener('dragend',dragend);
		
		cel[i+1].addEventListener('dragenter',dragenter);
		cel[i+1].addEventListener('dragover',function(e){e.preventDefault()});
		cel[i+1].addEventListener('dragleave',leave);
		cel[i+1].addEventListener('drop',drop1);

 }
  function dragstart(e){	

//теперь просто берем позицию х.у мыши и и к ней привязываем нашу мартиноску которую надо тянуть
 	var num = this.getAttribute('data-num');
	
 	e.dataTransfer.setData('Text',num);	

};

function dragend(e){
	
};
//Функции для целевого обекта
function leave (e){
	e.preventDefault();
	this.style ='background:gray';};

function dragenter(e){
	 e.preventDefault();
	this.style ='background:lightgreen';};


function drop1( e ){	
	e.preventDefault();
	var num = e.dataTransfer.getData('Text');
	var info = this.getAttribute('data-info');
	if (num == info) 
		{
			this.style ='visibility :hidden';
			var element = document.querySelectorAll('#pis>.litle');				
			element[num-1].style='display:none';
		}else{
			this.style ='background:gray';
		};		
};
});