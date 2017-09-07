(function() {
  var template = './js/app/mesas/mesas.html';
  $("#view").load(template, muestraMesas);
  function muestraMesas() {
     var mesas = [5857, 5858];
     $.each(mesas, function(index,mesa) {
       var button = $('<button></button>');
       button[0].id = mesa;
       button[0].innerText = mesa;
       button.addClass('mesa-btn primary-btn btn');
       button.on('click', function(e,mesa) {
         console.log(this.id);
         setMesa(this.id);
         window.location.href = '#/carga';
       });
       $('.contenedor-mesas').append(button);
     });
  }
  function setMesa(mesa) {
    var storage = window.localStorage;
    storage.setItem('mesaActual', mesa);
    addMesa(mesa);
  }
  function addMesa(mesa) {
    mesa = 'm'+mesa;
    var storage = window.localStorage;
    var resultados = storage.getItem('resultados');
    if (resultados) {
      resultados = JSON.parse(resultados);
      if(!resultados.hasOwnProperty(mesa)) {
        resultados[mesa] = {};
      }
    } else {
      resultados = {};
      resultados[mesa] = {};
    }
    storage.setItem('resultados', JSON.stringify(resultados));
  }
})()
