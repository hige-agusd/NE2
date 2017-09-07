(function() {
  var template = './js/app/carga/carga.html';
  var storage = window.localStorage,
    mesaActual = 'm'+storage.getItem('mesaActual'),
    lista;
  var fuerzas = [
    {"lista": "603", "color": "fe0", "nombre": "Vamos Juntos"},
    {"lista": "501", "color": "008fc3", "nombre": "Unidad Porteña"},
    {"lista": "333", "color": "bb98d6", "nombre": "1 Pais"}
  ];
  $("#view").load(template, setCarga);
  function setCarga() {
    $('.siguiente').on('click', function() {
      siguiente();
    });
    setFuerza();
  }
  function setFuerza() {
    var fuerza = fuerzas.shift();
    lista = 'l'+fuerza.lista;
    $('.header h1').html(fuerza.nombre);
    $('.header h2').html('Lista ' + fuerza.lista);
    $('body').css('backgroundColor', '#'+fuerza.color);
    $('#diputados').val(0);
    $('#legisladores').val(0);
  }
  function siguiente() {
    cargarDatos();
    if(fuerzas.length) {
      setFuerza();
    } else {
      window.location.href = '#/confirmacion';
    }
  }
  function cargarDatos() {
    var resultados = JSON.parse(storage.getItem('resultados'));
    if(!resultados[mesaActual].hasOwnProperty(lista)) {
      resultados[mesaActual][lista] = {};
    }
    resultados[mesaActual][lista].diputados = $('#diputados').val();
    resultados[mesaActual][lista].legisladores = $('#legisladores').val();
    storage.setItem('resultados', JSON.stringify(resultados));
  }
})()
