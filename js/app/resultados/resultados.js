(function() {
  var template = './js/app/resultados/resultados.html';
  var storage = window.localStorage,
    mesaActual = 'm'+storage.getItem('mesaActual'),
    lista,
    votos = {'totales': {'diputados': 0, 'legisladores': 0}},
    resultados = JSON.parse(storage.getItem('resultados'));
  var fuerzas = {
    "l502": {"color": "fedb00", "nombre": "Vamos Juntos"},
    "l501": {"color": "0a96d3", "nombre": "Unidad Porteña"},
    "l503": {"color": "ee008c", "nombre": "Evolucion"},
    "l507": {"color": "013773", "nombre": "1 Pais"}
  };
  $("#view").load(template, setResultados);
  function setResultados() {
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
        var listaNum = lista.substr(1);
        //Nombre de fuerza
        var fuerza = $('<span class="fuerza col-xs-4"></span>');
        fuerza.html(listaNum + '<br>' + fuerzas[lista].nombre );
        var fuerzaLeg = $('<span class="fuerza col-xs-4"></span>');
        fuerzaLeg.html(listaNum + '<br>' + fuerzas[lista].nombre );
        //Diputados
        var dips = $('<div class="col-xs-8"></div>');
        var dipsVotos = $('<span class="col-xs-12"></span>');
        var dipsBarra = $('<div class="barra"></div>');
        dipsBarra.html(votos[lista].porcentajes.diputados .toFixed(2) + '%');
        dipsBarra.css('width', votos[lista].porcentajes.diputados+'%');
        dipsBarra.css('backgroundColor', '#'+fuerzas[lista].color);
        dipsVotos.appendTo(dips);
        dipsBarra.appendTo(dips);
        //Legisladores
        var legs = $('<div class="col-xs-8"></div>');
        var legsVotos = $('<span class="col-xs-12"></span>');
        var legsBarra = $('<div class="barra"></div>');
        legsBarra.html(votos[lista].porcentajes.legisladores.toFixed(2) + '%');
        legsBarra.css('width', votos[lista].porcentajes.legisladores+'%');
        legsBarra.css('backgroundColor', '#'+fuerzas[lista].color);
        legsVotos.appendTo(legs);
        legsBarra.appendTo(legs);
        //legs.html(votos[lista].legisladores);
        //detalle diputados
        var detalle = $('<div class="row detalle"> </div>');
        fuerza.appendTo(detalle);
        dips.appendTo(detalle);
        detalle.appendTo('.por-dip');
        //detalle legisladores
        var detalleLeg = $('<div class="row detalle"> </div>');
        fuerzaLeg.appendTo(detalleLeg);
        legs.appendTo(detalleLeg);
        detalleLeg.appendTo('.por-leg');
      }
    });
  }
})();
