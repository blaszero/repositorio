$(document).ready(function(){
//Animacion que Cambia color del titulo intermitente entre 2 colores
function colorBlink(selector){
  $(selector).animate({
    opacity: '1',
  }, {
    step: function(){
      $(this).css('color', 'white');
    },
    queue: true
  })
  .animate({
    opacity: '1'
  }, {
    step: function(){
      $(this).css('color', 'yellow');
    },
    queue: true
  }, 600)
  .delay(1000)
  .animate({
    opacity: '1'
  }, {
    step: function(){
      $(this).css('color', 'white');
    },
    queue: true
  })
  .animate({
    opacity: '1'
  }, {
    step: function(){
      $(this).css('color', 'yellow');
      colorBlink('h1.main-titulo');
    },
    queue: true
  });
}

//Funcion que genera numeros aleatorios
function getRandomInt(min, max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

//Funcion para obtener filas o colunmnas
function arrayDulces(arrayType, index) {

  var dulceCol1 = $('.col-1').children();
  var dulceCol2 = $('.col-2').children();
  var dulceCol3 = $('.col-3').children();
  var dulceCol4 = $('.col-4').children();
  var dulceCol5 = $('.col-5').children();
  var dulceCol6 = $('.col-6').children();
  var dulceCol7 = $('.col-7').children();

  var dulceColumnas = $([dulceCol1, dulceCol2, dulceCol3, dulceCol4,
    dulceCol5, dulceCol6, dulceCol7
  ]);

  if (typeof index === 'number'){
    var dulceFila = $([dulceCol1.eq(index), dulceCol2.eq(index),
      dulceCol3.eq(index), dulceCol4.eq(index), dulceCol5.eq(index),
      dulceCol6.eq(index), dulceCol7.eq(index)
    ]);
  }else{
    index = '';
  }

  if(arrayType === 'columns'){
    return dulceColumnas;
  }else if(arrayType === 'rows' && index !== ''){
    return dulceFila;
  }
}

// arreglos de filas
function dulceFilas(index){
  var dulceFila = arrayDulces('rows', index);
  return dulceFila;
}

// arreglos de colunmnas
function dulceColumnas(index){
  var dulceColumna = arrayDulces('columns');
  return dulceColumna[index];
}

//Validar si hay dulces que se eliminaran en una columna
function validacionColumna(){
  for (var j = 0; j < 7; j++){
    var contador = 0;
    var dulcePosicion = [];
    var extraDulcePosicion = [];
    var dulceColumna = dulceColumnas(j);
    var comparisonValue = dulceColumna.eq(0);
    var gap = false;
    for (var i = 1; i < dulceColumna.length; i++){
      var srcComparison = comparisonValue.attr('src');
      var srcDulce = dulceColumna.eq(i).attr('src');

      if(srcComparison != srcDulce){
        if (dulcePosicion.length >= 3){
          gap = true;
        }else{
          dulcePosicion = [];
        }
        contador = 0;
      }else{
        if(contador == 0){
          if(!gap){
            dulcePosicion.push(i -1);
          }else{
            extraDulcePosicion.push(i - 1);
          }
        }
        if(!gap){
          dulcePosicion.push(i);
        }else{
          extraDulcePosicion.push(i);
        }
        contador += 1;
      }
      comparisonValue = dulceColumna.eq(i);
    }
    if(extraDulcePosicion.length > 2){
      dulcePosicion = $.merge(dulcePosicion, extraDulcePosicion);
    }
    if(dulcePosicion.length <= 2){
      dulcePosicion = [];
    }
    dulceContador = dulcePosicion.length;
    if(dulceContador >= 3){
      borrarColumnaDulce(dulcePosicion, dulceColumna);
      setPuntuacion(dulceContador);
    }
  }
}
function borrarColumnaDulce(dulcePosicion, dulceColumna){
  for (var i = 0; i < dulcePosicion.length; i++){
    dulceColumna.eq(dulcePosicion[i]).addClass('delete');
  }
}

//Validar si hay dulces a eliminar en una fila
function validacionFila(){
  for (var j = 0; j < 7; j++){
    var contador = 0;
    var dulcePosicion = [];
    var extraDulcePosicion = [];
    var dulceFila = dulceFilas(j);
    var comparisonValue = dulceFila[0];
    var gap = false;
    for (var i = 1; i < dulceFila.length; i++){
      var srcComparison = comparisonValue.attr('src');
      var srcDulce = dulceFila[i].attr('src');

      if (srcComparison != srcDulce){
        if (dulcePosicion.length >= 3){
          gap = true;
        } else{
          dulcePosicion = [];
        }
        contador = 0;
      } else{
        if (contador == 0){
          if (!gap){
            dulcePosicion.push(i - 1);
          }else {
            extraDulcePosicion.push(i - 1);
          }
        }
        if (!gap){
          dulcePosicion.push(i);
        }else{
          extraDulcePosicion.push(i);
        }
        contador += 1;
      }
      comparisonValue = dulceFila[i];
    }
    if (extraDulcePosicion.length > 2){
      dulcePosicion = $.merge(dulcePosicion, extraDulcePosicion);
    }
    if (dulcePosicion.length <= 2){
      dulcePosicion = [];
    }
    dulceContador = dulcePosicion.length;
    if (dulceContador >= 3){
      borrarHorizontal(dulcePosicion, dulceFila);
      setPuntuacion(dulceContador);
    }
  }
}
function borrarHorizontal(dulcePosicion, dulceFila){
  for (var i = 0; i < dulcePosicion.length; i++){
    dulceFila[dulcePosicion[i]].addClass('delete');
  }
}

//Puntuacion
function setPuntuacion(dulceContador){
  var score = Number($('#score-text').text());
  switch (dulceContador){
    case 3:
     score += 25;
     break;
    case 4:
     score += 50;
     break;
    case 5:
     score += 75;
     break;
    case 6:
     score += 100;
     break;
    case 7:
     score += 200;
  }
  $('#score-text').text(score);
}

//Poner dulces en el tablero
function checkBoard(){
  fillBoard();
}

function fillBoard(){
  var top = 7;
  var column = $('[class^="col-"]');

  column.each(function(){
    var dulces = $(this).children().length;
    var agrega = top - dulces;
    for (var i = 0; i < agrega; i++){
      var dulceTipo = getRandomInt(1, 5);
      if (i === 0 && dulces < 1){
        $(this).append('<img src="image/' + dulceTipo + '.png" class="element"></img>');
      }else{
        $(this).find('img:eq(0)').before('<img src="image/' + dulceTipo + '.png" class="element"></img>');
      }
    }
  });
  addCandyEvents();
  setValidations();
}

//Si hay dulces que borrar
function setValidations(){
  validacionColumna();
  validacionFila();
  //Si hay dulces que borrar
  if ($('img.delete').length !== 0){
    borrarDulcesAnimacion();
  }
}


//Efecto de movimiento entre los dulces

function addCandyEvents(){
  $('img').draggable({
    containment: '.panel-tablero',
    droppable: 'img',
    revert: true,
    revertDuration: 500,
    grid: [100, 100],
    zIndex: 10,
    drag: constrainCandyMovement
  });
  $('img').droppable({
    drop: swapCandy
  });
  habilitaEventosDulces();
}

function deshabilitaEventosDulces(){
  $('img').draggable('disable');
  $('img').droppable('disable');
}

function habilitaEventosDulces(){
  $('img').draggable('enable');
  $('img').droppable('enable');
}

//Hace que el dulce sea solido al moverse
function constrainCandyMovement(event, dulceDrag){
  dulceDrag.position.top = Math.min(100, dulceDrag.position.top);
  dulceDrag.position.bottom = Math.min(100, dulceDrag.position.bottom);
  dulceDrag.position.left = Math.min(100, dulceDrag.position.left);
  dulceDrag.position.right = Math.min(100, dulceDrag.position.right);
}

//Reemplaza los dulces anteriores
function swapCandy(event, dulceDrag){
  var dulceDrag = $(dulceDrag.draggable);
  var dragSrc = dulceDrag.attr('src');
  var dulceDrop = $(this);
  var dropSrc = dulceDrop.attr('src');
  dulceDrag.attr('src', dropSrc);
  dulceDrop.attr('src', dragSrc);

  setTimeout(function(){
    checkBoard();
    if($('img.delete').length === 0){
      dulceDrag.attr('src', dragSrc);
      dulceDrop.attr('src', dropSrc);
    }else{
      updateMoves();
    }
  }, 600);

}

function checkBoardPromise(result){
  if(result){
    checkBoard();
  }
}

//Valida la puntuacion por cantidad de elementos en linea
function updateMoves(){
  var actualValue = Number($('#movimientos-text').text());
  var result = actualValue += 1;
  $('#movimientos-text').text(result);
}

//Eliminacion automatica de los elementos
function borrarDulcesAnimacion(){
  deshabilitaEventosDulces();
  $('img.delete').effect('pulsate', 600);
  $('img.delete').animate({
    opacity: '0'
  }, {
    duration: 600
  })
  .animate({
    opacity: '0'
  }, {
    duration: 600,
    complete: function (){
      borrarDulces()
      .then(checkBoardPromise)
      .catch(showPromiseError);
    },
    queue: true
  });
}

//Llenado automatico de los espacions con elementos
function showPromiseError(error){
  console.log(error);
}

function borrarDulces(){
  return new Promise(function (resolve, reject){
    if ($('img.delete').remove()){
      resolve(true);
    } else{
      reject('No se pudo eliminar Dulce...');
    }
  })
}



//Temporizador y reinicio
function finJuego(){
  $('div.panel-tablero, div.time').effect('fold');
  $('h1.main-titulo').addClass('title-over')
    .text('Gracias por jugar');
    $('div.score, div.moves, div.panel-score').width('100%');

}

//Funcion que inicia el juego
function iniciaJuego(){

  colorBlink('h1.main-titulo');

  $('.btn-reinicio').click(function(){
    if($(this).text() === 'Reiniciar'){
      location.reload(true);
    }
    checkBoard();
    $(this).text('Reiniciar');
    startTimer($("#timer"));
  });
};
//detener cronometro
var cronometro;
function stop(){
  clearInterval(cronometro);
};

//cronometro del juego
  function startTimer(display){
  var s = 0;
  var m = 2;
  var llevar;
  cronometro=setInterval(function(){
    if (s == 0) {
      s = 60;
      m--;
      if (m < 0) {
        finJuego();
        stop();
      }
    }
    display.text(llevar);
    llevar = m+":"+s;
    s--;
  },1000);
};


$(function(){
  iniciaJuego();
});
});
