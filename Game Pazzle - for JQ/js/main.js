var x=3,
    y=3;
function init(x, y){

// создаем поле для игры
var x = x,
    y = y,
    fieldX = $('.field').width(),
    fieldY = $('.field').height(),
    imgSizeX  = fieldX/x,
    imgSizeY  = fieldY/y,
    finish = 0;

// Расчерчиваем поле
for(var i = 1; i <= x*y; i++){
    $('.field').append('<div class="img-hidden-' + i + '" data-number='+ i +'></div>');
    var puzzle = '.puzzle-'+i;
    $('.img-hidden-'+i).css({'width': imgSizeX,'height': imgSizeY }).droppable({
        drop: drop,
        over: function(){
            $(this).css({'background':'#353333'})
        },
        out: function(){
            $(this).css({'background':'gray'})
        }
    })
}
function drop( event, ui ){
    var slotNumber = $(this).data( 'number' );
    var puzzleNumber = ui.draggable.data( 'numberpuzzle' );
    if (slotNumber == puzzleNumber){
        finish++;
        var slotNumber = $(this).data( 'number' );
        $('.puzzle-'+slotNumber).css({'display':'none'});
        $(this).css({'opacity':'0'});
        if (finish == x*y){
            $('[class^="img-hidden-"]').hide();
            clearInterval(timerID);
            var showWin = setInterval(function(){
                $('.win').slideDown('slow');
                clearInterval(showWin);
                },5000)
        }
    }
}

$('.pis').css({'min-height': $('.play-field').height()});

// создаем сами пазлы
for(var i = 1; i <= x*y; i++) {
    $('.pis').append('<div class="puzzle-' + i + '" data-numberpuzzle='+ i +'></div>');
    $('.puzzle-' + i).css({'width': imgSizeX, 'height': imgSizeY}).draggable({
        containment: '.game-wrapper',
        cursor: 'pointer',
        zIndex: 100,
        start:function(){
            $(this).css({'box-shadow':'0 0 13px rgba(0,0,0,1)'});
        },
        stop:function(){
            $(this).css({'box-shadow':'none'});
        }
    } );
}
// изменение background-position
var count = 0,
    target = $('.pis').offset(),
    maxX = target.left + $('.pis').width() - imgSizeX,
    minX = target.left,
    maxY = $('.pis').height() - imgSizeY/2 ,
    minY = 0;

for (var j=1; j <=y; j++){
    for (var i = 1; i <= x; i++ ){
        var randX = minX + Math.random() * (maxX - minX),
            randY = minY + Math.random() * (maxY - minY),
        count = count +1;
        $('.puzzle-'+count).css({'backgroundPositionX': imgSizeX -(imgSizeX*i),'backgroundPositionY': imgSizeY - (imgSizeY*j),'top': randY, 'left': randX});
    }
}
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
}

init(x,y);
$('#reset').on('click', function(){
    x++;
    y++;
    $('.win').hide();
    init(x,y);
});