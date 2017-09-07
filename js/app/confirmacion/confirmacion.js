(function() {
  var template = './js/app/confirmacion/confirmacion.html';
  var storage = window.localStorage,
    mesaActual = 'm'+storage.getItem('mesaActual'),
    lista,
    par = false,
    resultados = JSON.parse(storage.getItem('resultados'));
  var fuerzas = {
    "l603": {"color": "fe0", "nombre": "Vamos Juntos"},
    "l501": {"color": "008fc3", "nombre": "Unidad Porteña"},
    "l333": {"color": "bb98d6", "nombre": "1 Pais"}
  };
  $("#view").load(template, setConfirmacion);
  function setConfirmacion() {
    $('.enviar').on('click', function() {
      enviar();
    });
    setFuerzas();
  }
  function setFuerzas() {
    resultados = resultados[mesaActual];
    $.each(resultados, function(lista, resultado) {
      var listaNum = lista.substr(1);
      console.log(lista, resultado)
      var fuerza = $('<span class="col-xs-6"></span>');
      var dips = $('<span class="col-xs-3"></span>');
      var legs = $('<span class="col-xs-3"></span>');
      fuerza.html(fuerzas[lista].nombre + ' (' + listaNum + ')' );
      dips.html(resultado.diputados);
      legs.html(resultado.legisladores);
      var detalle = $('<div class="row detalle"> </div>');
      if (par) {
        detalle.addClass('par');
      }
      par = !par;
      fuerza.appendTo(detalle);
      dips.appendTo(detalle);
      legs.appendTo(detalle);
      detalle.appendTo('.recuento');
    })
  }
  function enviar() {
    window.location.href = '#/resultados';
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
