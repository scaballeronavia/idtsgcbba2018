/**
 * @file
 *  Related JavaScript.
 */
// Declare an 'APP'
var inmueble = angular.module('inmueble', []);

/**
* Declare the controller that adds the default value to scope var.
*/
inmueble.controller('inmuebleReporteController', ['$scope', '$location', '$http', content]);

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

  //get user current.
  $scope.urlUser = $scope.my_location + "/usuariosRest/";
  $http.get($scope.urlUser).success(function (response) {
    $scope.usuario = response;
    console.log('$scope.usuario');
    console.log($scope.usuario);
    $scope.user_rol = $scope.usuario[0]['roles_target_id'];
    $scope.user_ci = $scope.usuario[0]['field_user_ci'];
    console.log($scope.user_ci);
    $scope.init($scope.user_rol, $scope.user_ci);
  });

  $scope.init = function(user_rol, user_ci){
    console.log("init");
    console.log(user_ci);

    if(user_rol == "Contribuyente"){
      console.log("if rol");
      // Get Inmueble Entity Current
      $scope.url = $scope.my_location + "/inmuebleRestUser/" + user_ci;
      $http.get($scope.url).success(function (response) {
        $scope.inmuebles = response;

        var rolUserEdit = $scope.inmuebles[0]['user_edit'].includes("Contribuyente");//buscar si existe la palabra
        if(rolUserEdit == true){
          $scope.rolUserEdit = "Contribuyente";
        }
        $scope.num_inmuebles = $scope.inmuebles.length;
        console.log('$scope.inmueblesUser');
        console.log($scope.inmuebles);
        if($scope.inmuebles.length > 0){ //existe inmueble creados
          if($scope.inmuebles[0]['nro_orden'] != undefined){
            $scope.orden = $scope.inmuebles[0]['nro_orden'];
          }

          //Get dias transcurridos desde la fecha de pago hasta la fecha actual.
          $scope.arrayFechaPago = [];
          for (var i = 0; i < $scope.inmuebles.length; i++) {
            $scope.fechaPago = $scope.inmuebles[i].fecha_pago;
            $scope.inmuebleID = $scope.inmuebles[i].id;
            //Get dias transcurridos desde la fecha de pago hasta la fecha actual.
            var aFecha1 = $scope.fechaPago.split('-');
            //var aFecha2 = today.split('-');
            var aFecha2 = ($scope.inmuebles[i].deposito_fecha).split('/'); //falta trabajar con multiples deposiyos fechas.
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
                $scope.inmuebles[i].custom_multa = "Si";
              }
              else {
                var dato = {
                  id : $scope.inmuebleID,
                  dias : 'Sin Multa',
                };
                $scope.arrayFechaPago.push(dato);
                $scope.inmuebles[i].custom_multa = "No";
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
          for (var i = 0; i < $scope.inmuebles.length; i++) {
            if($scope.inmuebles[i].deposito_code != '' && $scope.inmuebles[i].deposito_fecha != '' && $scope.inmuebles[i].deposito_monto != '' && $scope.inmuebles[i].deposito_name != ''){
              var array_deposito_code = $scope.inmuebles[i].deposito_code.split("-");
              if(array_deposito_code.length > 1){ //existe + 1 deposito
                $scope.inmuebles[i].num_depositos = array_deposito_code.length;
              }
              else{ //existe 1 deposito
                $scope.inmuebles[i].num_depositos = array_deposito_code.length;
              }
            }
            else{
              $scope.inmuebles[i].num_depositos = 'No existe';
            }

            // Convert date to timestamp, filtro fechas(Alvaro)
            if ($scope.inmuebles[i].deposito_fecha != '') {
            //if ($scope.inmuebles[i].fecha_pago != '') {
              $scope.cocoven = moment($scope.inmuebles[i].deposito_fecha, "DD/MM/YYYY");  //cambiar esto si se quiere otro columna para fecha y cambiar el formato si es con '-'
              //$scope.cocoven = moment($scope.inmuebles[i].fecha_pago, "DD-MM-YYYY");  //cambiar esto si se quiere otro columna para fecha y cambiar el formato si es con '-'
              $scope.inmuebles[i]['timestamp'] = $scope.cocoven.unix();
            } else {
              $scope.today = moment().unix();
              $scope.inmuebles[i]['timestamp'] = $scope.today;
            }
          };
        }
      });// fin Get Inmueble Entity Current //reporte inmuebles por usuario current
    }
    else if(user_rol == "Funcionario"){ //reporte todos los inmuebles
      // Get Inmueble Entity Current
      $scope.url = $scope.my_location + "/inmuebleRest/";
      $http.get($scope.url).success(function (response) {
        $scope.inmuebles = response;
        console.log('$scope.inmueblessssss');
        console.log($scope.inmuebles);
        $scope.num_inmuebles = $scope.inmuebles.length;

        if($scope.inmuebles[0]['nro_orden'] != undefined){
          $scope.orden = $scope.inmuebles[0]['nro_orden'];
        }

        //Get dias transcurridos desde la fecha de pago hasta la fecha actual.
        $scope.arrayFechaPago = [];
        for (var i = 0; i < $scope.inmuebles.length; i++) {
          $scope.fechaPago = $scope.inmuebles[i].fecha_pago;
          $scope.inmuebleID = $scope.inmuebles[i].id;
          //Get dias transcurridos desde la fecha de pago hasta la fecha actual.
          var aFecha1 = $scope.fechaPago.split('-');
          //var aFecha2 = today.split('-');
          var aFecha2 = ($scope.inmuebles[i].deposito_fecha).split('/'); //falta trabajar con multiples deposiyos fechas.
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
              $scope.inmuebles[i].custom_multa = "Si";
            }
            else {
              var dato = {
                id : $scope.inmuebleID,
                dias : 'Sin Multa',
              };
              $scope.arrayFechaPago.push(dato);
              $scope.inmuebles[i].custom_multa = "No";
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
        for (var i = 0; i < $scope.inmuebles.length; i++) {
          if($scope.inmuebles[i].deposito_code != '' && $scope.inmuebles[i].deposito_fecha != '' && $scope.inmuebles[i].deposito_monto != '' && $scope.inmuebles[i].deposito_name != ''){
            var array_deposito_code = $scope.inmuebles[i].deposito_code.split("-");
            if(array_deposito_code.length > 1){ //existe + 1 deposito
              $scope.inmuebles[i].num_depositos = array_deposito_code.length;
            }
            else{ //existe 1 deposito
              $scope.inmuebles[i].num_depositos = array_deposito_code.length;
            }
          }
          else{
            $scope.inmuebles[i].num_depositos = 'No existe';
          }

          // Convert date to timestamp, filtro fechas(Alvaro)
          if ($scope.inmuebles[i].deposito_fecha != '') {
          //if ($scope.inmuebles[i].fecha_pago != '') {
            $scope.cocoven = moment($scope.inmuebles[i].deposito_fecha, "DD/MM/YYYY");  //cambiar esto si se quiere otro columna para fecha y cambiar el formato si es con '-'
            //$scope.cocoven = moment($scope.inmuebles[i].fecha_pago, "DD-MM-YYYY");  //cambiar esto si se quiere otro columna para fecha y cambiar el formato si es con '-'
            $scope.inmuebles[i]['timestamp'] = $scope.cocoven.unix();
          } else {
            $scope.today = moment().unix();
            $scope.inmuebles[i]['timestamp'] = $scope.today;
          }
        };
      });// fin Get Inmueble Entity Current
    }
  };

  //alvaro
  // Funcion para filtar entre dos fechas
  $scope.buscarPorFecha = function(d, h){
    $scope.desde1 = moment(d).unix();
    var fromInt = parseInt($scope.desde1);
    $scope.from = (fromInt - 86400);

    $scope.hasta1 = moment(h).unix();
    $scope.to = $scope.hasta1;
  };

  // Esto establece los campos de fechas, desde(1 mes antes) y hasta (fecha actual) filtro por defecto todos
  $scope.from = moment('1968-01-01 00:00:00').unix();
  $scope.from1 = moment().subtract(1, 'months').unix();
  $scope.from1 = parseInt($scope.from1) - 86400;

  $scope.desde = new Date($scope.from1*1000);
  $scope.to = moment().unix();
  $scope.hasta = new Date($scope.to*1000);

  $scope.filterRange = function(i) {
    return i.timestamp > $scope.from && i.timestamp <= $scope.to; //retorna todos los que cumpla el filtro
  };

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
    saveAs(blob, "Reporte Cesion de Bienes Inmueble (770) " + $scope.today + ".xls");
  };
}//fin function

/**
* We need to bootstrap the app manually to the container by id, since we have
*  more than one app on the same page.
*/
angular.element(document).ready(function() {
	//angular.bootstrap(document.getElementById('name_id_form'),['name_module']);
	angular.bootstrap(document.getElementById('form-reporte-inmueble'),['inmueble']);
});
