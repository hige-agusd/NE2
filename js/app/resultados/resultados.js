(function() {
  var template = './js/app/resultados/resultados.html';
  var storage = window.localStorage,
    mesaActual = 'm'+storage.getItem('mesaActual'),
    lista,
    votos = {'totales': {'diputados': 0, 'legisladores': 0}},
    resultados = JSON.parse(storage.getItem('resultados'));
  var fuerzas = {
    "l603": {"color": "fe0", "nombre": "Vamos Juntos"},
    "l501": {"color": "008fc3", "nombre": "Unidad Porteña"},
    "l333": {"color": "bb98d6", "nombre": "1 Pais"}
  };
  $("#view").load(template, setResultados);
  function setResultados() {
    $('body').css('backgroundColor', '#00e');
    $.each(resultados, function(mesa, listas) {
      $.each(listas, function(lista, categorias) {
        if(!votos.hasOwnProperty(lista)) {
          votos[lista] = {'diputados': 0, 'legisladores': 0};
        }
        $.each(categorias, function(categoria, sufragios) {
          votos[lista][categoria] += Number(sufragios);
          votos['totales'][categoria] += Number(sufragios);
        });
      });
    });
    $.each(votos, function(lista, categorias) {
      if(lista != 'totales') {
        votos[lista]['porcentajes'] = {'diputados': 0, 'legisladores': 0};
      }
      $.each(categorias, function(categoria, sufragios){
        if(lista != 'totales' && categoria != 'porcentajes' ) {
          votos[lista]['porcentajes'][categoria] = 100 / votos.totales[categoria] * votos[lista][categoria];
        }
      });
      if(lista != 'totales') {
        var listaNum = lista.substr(0);
        var fuerza = $('<span class="col-xs-4"></span>');
        fuerza.html(fuerzas[lista].nombre + ' (' + listaNum + ')' );
        var dips = $('<div class="col-xs-4"></div>');
        var dipsVotos = $('<span class="col-xs-12"></span>');
        dipsVotos.html(votos[lista].porcentajes.diputados .toFixed(2) + '% (' + votos[lista].diputados + ')');
        var dipsBarra = $('<div class="barra"></div>');
        dipsBarra.css('width', votos[lista].porcentajes.diputados+'%');
        dipsBarra.css('backgroundColor', '#'+fuerzas[listaNum].color);
        dipsVotos.appendTo(dips);
        dipsBarra.appendTo(dips);
        var legs = $('<div class="col-xs-4"></div>');
        var legsVotos = $('<span class="col-xs-12"></span>');
        legsVotos.html(votos[lista].porcentajes.legisladores.toFixed(2) + '% (' + votos[lista].legisladores + ')');
        var legsBarra = $('<div class="barra"></div>');
        legsBarra.css('width', votos[lista].porcentajes.legisladores+'%');
        legsBarra.css('backgroundColor', '#'+fuerzas[listaNum].color);
        legsVotos.appendTo(legs);
        legsBarra.appendTo(legs);
        //legs.html(votos[lista].legisladores);
        var detalle = $('<div class="row detalle"> </div>');
        fuerza.appendTo(detalle);
        dips.appendTo(detalle);
        legs.appendTo(detalle);
        detalle.appendTo('.resultados');
      }
    });
  }
})()
