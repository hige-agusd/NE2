(function() {
  var template = './js/app/carga/carga.html';
  var storage = window.localStorage,
    mesaActual = 'm'+storage.getItem('mesaActual'),
    lista;
  var fuerzas = [
    {"lista": "502", "color": "fe0", "nombre": "Vamos Juntos", "logo": "logo-img-pro"},
    {"lista": "501", "color": "008fc3", "nombre": "Unidad Porteña", "logo": "logo-img-up"},
    {"lista": "503", "color": "008fc3", "nombre": "Evolución Ciudadana", "logo": "logo-img-ec"},
    {"lista": "507", "color": "bb98d6", "nombre": "1 Pais", "logo": "logo-img-1p"}
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
    $('.num-mesa').html(storage.getItem('mesaActual'));
    $('.numero-lista').html('Lista ' + fuerza.lista);
    //$('body').css('backgroundColor', '#'+fuerza.color);
    $(".logo-lista").removeClass (function (index, className) {
      return (className.match (/(^|\s)logo-img-\S+/g) || []).join(' ');
    });
    $(".logo-lista").addClass(fuerza.logo);
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
