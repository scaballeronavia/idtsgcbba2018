/**
 * @file
 *  Related JavaScript.
 */
// Declare an 'APP'
var mueble = angular.module('mueble', []);

/**
* Declare the controller that adds the default value to scope var.
*/
mueble.controller('muebleReporteController', ['$scope', '$location', '$http', content]);

function content($scope, $location, $http) {
  console.log('santi reporte js');
	// Get protocol concatenated to host
  $scope.my_location = $location.protocol() + "://" + $location.host();

  // Get token from url
  $scope.url = $scope.my_location + "/rest/session/token";
  $http.get($scope.url).success(function(respuesta){
    $scope.token = respuesta;
  });

  //Get date current.
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();
  today = dd+'-'+mm+'-'+yyyy;
  console.log('today');
  console.log(today);

  // Get Inmueble Entity Current
  $scope.url = $scope.my_location + "/muebleRest/";
  $http.get($scope.url).success(function (response) {
    $scope.muebles = response;
    console.log('$scope.muebles');
    console.log($scope.muebles);
    $scope.user_edit =

    //Get dias transcurridos desde la fecha de pago hasta la fecha actual.
    $scope.arrayFechaPago = [];
    for (var i = 0; i < $scope.muebles.length; i++) {
      $scope.fechaPago = $scope.muebles[i].fecha_pago;
      $scope.inmuebleID = $scope.muebles[i].id;
      //Get dias transcurridos desde la fecha de pago hasta la fecha actual.
      var aFecha1 = $scope.fechaPago.split('-');
      //var aFecha2 = today.split('-');
      var aFecha2 = ($scope.muebles[i].deposito_fecha).split('/'); //falta trabajar con multiples deposiyos fechas.
      var fFecha1 = Date.UTC(aFecha1[2],aFecha1[1]-1,aFecha1[0]);
      var fFecha2 = Date.UTC(aFecha2[2],aFecha2[1]-1,aFecha2[0]);
      var dif = fFecha2 - fFecha1;
      $scope.diasTranscurridos = Math.floor(dif / (1000 * 60 * 60 * 24));  //dias transcurridos.
      if($scope.fechaPago != ''){
        if($scope.diasTranscurridos > 0){
          var dato = {
            id : $scope.inmuebleID,
            fechaPago : $scope.fechaPago,
            dias : $scope.diasTranscurridos,
          };
          $scope.arrayFechaPago.push(dato);
          $scope.muebles[i].custom_multa = "Si";
        }
        else {
          var dato = {
            id : $scope.inmuebleID,
            dias : 'Sin Multa',
          };
          $scope.arrayFechaPago.push(dato);
          $scope.muebles[i].custom_multa = "No";
        }
      }
      else {
        var dato = {
          id : $scope.inmuebleID,
          dias : 0,  // no tiene fechaPago.
        }
        $scope.arrayFechaPago.push(dato);
      }
    };

    //# Depositos
    for (var i = 0; i < $scope.muebles.length; i++) {
      if($scope.muebles[i].deposito_code != '' && $scope.muebles[i].deposito_fecha != '' && $scope.muebles[i].deposito_monto != '' && $scope.muebles[i].deposito_name != ''){
        var array_deposito_code = $scope.muebles[i].deposito_code.split("-");
        if(array_deposito_code.length > 1){ //existe + 1 deposito
          $scope.muebles[i].num_depositos = array_deposito_code.length;
        }
        else{ //existe 1 deposito
          $scope.muebles[i].num_depositos = array_deposito_code.length;
        }
      }
      else{
        $scope.muebles[i].num_depositos = 'No existe';
      }
    };// fin reporte.
  });

  //EXPORT TO EXCEL
  //get date current for export
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();
  if(dd<10) {
      dd='0'+dd
  }
  if(mm<10) {
      mm='0'+mm
  }
  $scope.today = dd+'-'+mm+'-'+yyyy;

  $scope.exportData = function () {
    var blob = new Blob([document.getElementById('exportable').innerHTML], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
    });
    saveAs(blob, "Reporte Cesion de Bienes Mueble (750) " + $scope.today + ".xls");
  };


}//fin function

/**
* We need to bootstrap the app manually to the container by id, since we have
*  more than one app on the same page.
*/
angular.element(document).ready(function() {
	//angular.bootstrap(document.getElementById('name_id_form'),['name_module']);
	angular.bootstrap(document.getElementById('form-reporte-mueble'),['mueble']);
});