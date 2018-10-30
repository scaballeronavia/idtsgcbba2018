/**
 * @file
 *  Related JavaScript.
 */
// Declare an 'APP'
var inmueble = angular.module('inmueble', []);

/**
* Declare the controller that adds the default value to scope var.
*/
inmueble.controller('inmuebleController', ['$scope', '$location', '$http', content]);

function content($scope, $location, $http) {
  console.log('santi js');
  //swal('titulo', 'text', 'info');
  // Get protocol concatenated to host
  $scope.my_location = $location.protocol() + "://" + $location.host();

  // Get token from url
  $scope.url = $scope.my_location + "/rest/session/token";
  $http.get($scope.url).success(function(respuesta){
    $scope.token = respuesta;
  });

  //$scope.urlUser = $scope.my_location + "/usuarioContribuyenteRest/";
  $scope.urlUser = $scope.my_location + "/usuariosRest/";
  $http.get($scope.urlUser).success(function (response) {
    $scope.usuario = response;
    console.log('$scope.usuario');
    console.log($scope.usuario);
    $scope.rol = $scope.usuario[0]['roles_target_id'];
    if($scope.rol == 'Funcionario'){
      $scope.disabledF = false; //disabled field
    }
    else if($scope.rol == 'Contribuyente'){
      $scope.disabledF = true;
      $scope.nombre = $scope.usuario[0]['field_user_nombre'];
      $scope.apellido_paterno = $scope.usuario[0]['field_user_apellido_paterno'];
      $scope.apellido_materno = $scope.usuario[0]['field_user_apellido_materno'];
      $scope.razon_social = $scope.usuario[0]['field_user_razon_social'];
      $scope.domicilio = $scope.usuario[0]['field_user_domicilio'];
      $scope.emitido = $scope.usuario[0]['field_user_ci_ciudad'];
      if($scope.nombre == ''){
        $scope.nombrecompleto = $scope.razon_social;
      }
      else {
        $scope.nombrecompleto = $scope.nombre + ' ' + $scope.apellido_paterno + ' ' + $scope.apellido_materno;
      }
      $scope.ci = $scope.usuario[0]['field_user_ci'];
      $scope.uid = $scope.usuario[0]['uid'];
    }
  });

  $scope.url = $scope.my_location + "/departamentoRest/";
  $http.get($scope.url).success(function (response) {
    $scope.departamento = response;
    //console.log('$scope.departamento');
    //console.log($scope.departamento);
  });

  //Get Departamento Selected from field.
  $scope.deptoSelected = function(id_departamento){
    /*console.log('id_departamento');
    console.log(id_departamento);*/
    $scope.url = $scope.my_location + "/localidadxDeptoRest/" + id_departamento;
    $http.get($scope.url).success(function(respuesta) {
      $scope.localidad = respuesta;
      $scope.SelectedDepartamento = $scope.localidad[0].field_localidad_departamento_1;
      console.log('$scope.SelectedDepartamento');
      console.log($scope.SelectedDepartamento);
      $scope.get_alcaldia = $scope.SelectedDepartamento;

    });
  };

  //Get Localidad Selected from field.
  $scope.localidadSelected = function(get_localidad){
    $scope.url = $scope.my_location + "/localidadxTidRest/" + get_localidad;
    $http.get($scope.url).success(function(respuesta) {
      $scope.localidadTid = respuesta;
      $scope.alcaldia = $scope.localidadTid[0].name;
      $scope.get_codigo_localidad = $scope.localidadTid[0].field_localidad_codigo;
    });
  };

  $scope.url = $scope.my_location + "/gradoParentescoRest/";
  $http.get($scope.url).success(function (response) {
    $scope.gradoParentesco = response;
  });

  $scope.url = $scope.my_location + "/categoriaRest/";
  $http.get($scope.url).success(function (response) {
    $scope.categorias = response;
    console.log('$scope.categorias');
    console.log($scope.categorias);
  });

  // Get Inmueble Entity
  $scope.url = $scope.my_location + "/inmuebleRest/";
  $http.get($scope.url).success(function (response) {
    $scope.inmuebles = response;
    console.log('$scope.inmuebles');
    console.log($scope.inmuebles);
  });

  //Get Grado Parentesco Selected from field.
  $scope.gradoSelected = function(grado_parentesco){
    console.log('grado_parentesco');
    console.log(grado_parentesco);
    $scope.name_parentesco = grado_parentesco;
    $scope.url = $scope.my_location + "/gradoParentescoRest/" + grado_parentesco;
    //$scope.url = $scope.my_location + "/gradoParentescoxNombreRest/" + grado_parentesco;
    $http.get($scope.url).success(function (response) {
      $scope.gradoParentescoAlicuota = response;
      $scope.alicuota = $scope.gradoParentescoAlicuota[0].field_alicuota_porcentaje;
      //console.log('5ive $scope.alicuota');
      //console.log($scope.alicuota);
      if($scope.fecha_transmicion != undefined && $scope.get_base_imponible != undefined ){
        //console.log(' hay valor en el campo fecha transmicion y base inpinible');
        $scope.getImpuesto();
      }
    });
  };

  //Get Date Transmicion Selected from field.
  $scope.dateTransmicionSelected = function(fecha_transmicion){
    convert(fecha_transmicion);
    //scope.getImpuesto();
  };

  //BORRAR: Get Fecha Deposito Selected from field.
  /*$scope.dateSelected = function(get_fechaDeposito){
    var date = new Date(get_fechaDeposito),
      mnth = ("0" + (date.getMonth()+1)).slice(-2),
      day  = ("0" + date.getDate()).slice(-2);
    $scope.fechaDeposito = [day, mnth, date.getFullYear()].join("/");
    //$scope.fechaDeposito_dia = [day];
    $scope.fechaDeposito_mes = [mnth];
    $scope.fechaDeposito_ano = [date.getFullYear()];

    switch ($scope.fechaDeposito_mes[0]) {
      case "01":
        $scope.fechaDeposito_mes[0] = "Enero";
        break;
      case "02":
        $scope.fechaDeposito_mes[0] = "Febrero";
        break;
      case "03":
        $scope.fechaDeposito_mes[0] = "Marzo";
        break;
      case "04":
        $scope.fechaDeposito_mes[0] = "Abril";
        break;
      case "05":
        $scope.fechaDeposito_mes[0] = "Mayo";
        break;
      case "06":
        $scope.fechaDeposito_mes[0] = "Junio";
        break;
      case "07":
        $scope.fechaDeposito_mes[0] = "Julio";
        break;
      case "08":
        $scope.fechaDeposito_mes[0] = "Agosto";
        break;
      case "09":
        $scope.fechaDeposito_mes[0] = "Septiembre";
        break;
      case "10":
        $scope.fechaDeposito_mes[0] = "Octubre";
        break;
      case "11":
        $scope.fechaDeposito_mes[0] = "Noviembre";
        break;
      case "12":
        $scope.fechaDeposito_mes[0] = "Diciembre";
        break;
    }

    $scope.periodo_fecha = $scope.fechaDeposito_mes[0] + " del " + $scope.fechaDeposito_ano[0];
  };*/

  $scope.categoriaSelected = function(get_categoria){
    console.log('get_categoria');
    console.log(get_categoria);
    $scope.get_description = $scope.get_fecha_pago = $scope.fecha_transmicion = $scope.get_fecha_pago = "";
    $scope.url = $scope.my_location + "/categoriaRestName/" + get_categoria; //name
    $http.get($scope.url).success(function(respuesta) {
      $scope.categoriaRest = respuesta;
      $scope.categoriaDays = $scope.categoriaRest[0].field_categoria_dias;
      console.log('categoriaDays');
      console.log($scope.categoriaDays);
      //$scope.categoria = $scope.categoriaRest[0].name;
    });
  };

  //Convert format date OK.
  function convert(fecha_transmicion) {
    var date = new Date(fecha_transmicion),
      mnth = ("0" + (date.getMonth()+1)).slice(-2),
      day  = ("0" + date.getDate()).slice(-2);
    //$scope.resultado = [date.getFullYear(), mnth].join("-");
    $scope.fechaTransmicion = [day, mnth, date.getFullYear()].join("/");
    $scope.fechaTransmicion_dia = [day];
    $scope.fechaTransmicion_mes = [mnth];
    $scope.fechaTransmicion_ano = [date.getFullYear()];
    $scope.periodo_fecha = $scope.fechaTransmicion_mes + "/" + $scope.fechaTransmicion_ano; //setear html
    console.log('drupaaalll periodo_fecha');
    console.log($scope.periodo_fecha);
    date_transmicion_all($scope.fechaTransmicion_dia, $scope.fechaTransmicion_mes, $scope.fechaTransmicion_ano);
    //date_tramsmicion_mes_ano($scope.fechaTransmicion_mes, $scope.fechaTransmicion_ano);
    //get_timestamp($scope.fechaTransmicion);
    //console.log('convert $scope.fechaTransmicion');
    //console.log($scope.fechaTransmicion);

    //var startDate = "6-JAN-2017";
    switch($scope.fechaTransmicion_mes[0]) {
      case "01":
        var fechaTransM = "JAN";
        break;
      case "02":
        var fechaTransM = "FEB";
        break;
      case "03":
        var fechaTransM = "MAR";
        break;
      case "04":
        var fechaTransM = "APR";
        break;
      case "05":
        var fechaTransM = "MAY";
        break;
      case "06":
        var fechaTransM = "JUN";
        break;
      case "07":
        var fechaTransM = "JUL";
        break;
      case "08":
        var fechaTransM = "AUG";
        break;
      case "09":
        var fechaTransM = "SEP";
        break;
      case "10":
        var fechaTransM = "OCT";
        break;
      case "11":
        var fechaTransM = "NOV";
        break;
      case "12":
        var fechaTransM = "DEC";
        break;
    }
    var startDate = $scope.fechaTransmicion_dia[0] + "-" + fechaTransM + "-" + $scope.fechaTransmicion_ano[0];
    startDate = new Date(startDate.replace(/-/g, "/"));
    console.log('startDate');
    console.log(startDate);
    //------validar si tiene valor $scope.categoriaDays:----------
    console.log('$scope.categoriaDays');
    console.log($scope.categoriaDays);
    /*if($scope.categoriaDays == 5){

    }*/
    var endDate = "", noOfDaysToAdd = $scope.categoriaDays, count = 0; //$scope.categoriaDays = num dias a sumar
    //Sumando los dias:
    while(count < noOfDaysToAdd){
      endDate = new Date(startDate.setDate(startDate.getDate() + 1));
      if($scope.categoriaDays == 5){ //suma dias habiles menos sabados ni domingos.
        if(endDate.getDay() != 0 && endDate.getDay() != 6){
          count++;
        }
      }
      else{ //suma todos los dias calendario.
        count++;
      }
    }
    var date = new Date(endDate),
      mnth = ("0" + (date.getMonth()+1)).slice(-2),
      day  = ("0" + date.getDate()).slice(-2);
    var dateFormatedDMA = [day, mnth, date.getFullYear()].join("-");
    var dateFormatedAMD = [date.getFullYear(), mnth, day].join("-");
    //alert("Usted tiene que pagar el IMPUESTO hasta del:" + dateFormated + ".  Caso contrario se le cargara una multa economica.");
    get_date_feriados(dateFormatedDMA, dateFormatedAMD);
  }

  //Convert fechaTransmicion in timestamp for save in the BD:
  function get_timestamp(fechaTransmicion) {
    var myDate = fechaTransmicion.split("/");
    var newDateTransmicion = myDate[1]+"/"+myDate[0]+"/"+myDate[2];
    $scope.newDateTransmicion = new Date(newDateTransmicion).getTime()/1000;  //para guardar en l BD
    console.log('get_timestamp desde $scope.fecha_transmicion');
    console.log($scope.newDateTransmicion);
  }

  //Convert fecha de Pago in timestamp for save in the BD:
  function get_timestamp_Pago(fechaPago) {
    var date = new Date(fechaPago),
      mnth = ("0" + (date.getMonth()+1)).slice(-2),
      day  = ("0" + date.getDate()).slice(-2);
    //$scope.resultado = [date.getFullYear(), mnth].join("-");
    $scope.fechaPago = [day, mnth, date.getFullYear()].join("/");

    var myDate = $scope.fechaPago.split("/");
    var newDatePago = myDate[1]+"/"+myDate[0]+"/"+myDate[2];
    $scope.newDatePago = new Date(newDatePago).getTime()/1000;  //para guardar en la BD
    console.log('get_timestamp desde $scope.newDatePago');
    console.log($scope.newDatePago);
  }

  //Convert format date All OK.
  function date_transmicion_all(fechaTransmicion_dia, fechaTransmicion_mes, fechaTransmicion_ano) {
    $scope.url = $scope.my_location + "/ufvxDiaMesAnoRest/" + fechaTransmicion_dia + "/" + fechaTransmicion_mes + "/" + fechaTransmicion_ano;
    $http.get($scope.url).success(function(respuesta) {
      $scope.dateTransmicion = respuesta;
      console.log('$scope.dateTransmicion');
      console.log($scope.dateTransmicion);
      console.log('$scope.get_categoria');
      console.log($scope.get_categoria);
      if($scope.get_categoria != undefined || $scope.grado_parentesco != undefined || $scope.datoLista.length != 0 || $scope.dataList.length != 0){
        console.log('tiene valor');
        if(!$scope.dateTransmicion[0]){
          //swal(':) La fecha Ingresada no tiene UFV. Porfavor ingresar otra fecha');
          swal('Oops...','La fecha Ingresada no tiene UFV. Porfavor ingrese otra fecha','error');
          $scope.fecha_transmicion = '';
          $scope.get_base_imponible = '';
          $scope.get_base_imponible_update  = '';
          $scope.get_impuesto  = '';
        }
        else{
          var dateTransmicion = $scope.dateTransmicion[0].field_uc_fecha;
          var myDate = new Date(fechaTransmicion_mes + "/" + fechaTransmicion_dia + "/" + fechaTransmicion_ano);
          myDate.setMonth(myDate.getMonth() - 1);

          var date_convert = new Date(myDate),
            mnth = ("0" + (date_convert.getMonth()+1)).slice(-2),
            day  = ("0" + date_convert.getDate()).slice(-2);
          $scope.convertDateDiaT = [day];
          $scope.convertDateMesT = [mnth];
          $scope.convertDateAnoT = [date_convert.getFullYear()];
          get_ufv_ma($scope.convertDateDiaT, $scope.convertDateMesT, $scope.convertDateAnoT);

          //
          var myDate2 = new Date(fechaTransmicion_mes + "/" + fechaTransmicion_dia + "/" + fechaTransmicion_ano);
          myDate2.setMonth(myDate2.getMonth() - 12);

          var date_convert2 = new Date(myDate2),
            mnth = ("0" + (date_convert.getMonth()+1)).slice(-2),
            day  = ("0" + date_convert.getDate()).slice(-2);
          $scope.convertDateDiaT2 = [day];
          $scope.convertDateMesT2 = [mnth];
          $scope.convertDateAnoT2 = [date_convert2.getFullYear()];
          get_ufv_aa($scope.convertDateAnoT2[0]);
          get_timestamp($scope.fechaTransmicion); // puesto ahora OK
          //get_date_feriados($scope.dateFormatedDMA, $scope.dateFormatedAMD); //puesto ahora OK
        }
      }
      else{
        console.log('no tiene valor');
        swal({
          title: "Atención",
          text: "Por favor Ingrese datos en los campos Requeridos",
          type: "info",
          closeOnConfirm: false,
        });
        $scope.fecha_transmicion = '';
      }
    });
  }

  $scope.convertMes = function(mes){
    switch(mes) {
      case '01':
        $scope.convertDateMesT2[0] = 'Enero';
        break;
      case '02':
        $scope.convertDateMesT2[0] = 'Febrero';
        break;
      case '03':
        $scope.convertDateMesT2[0] = 'Marzo';
        break;
      case '04':
        $scope.convertDateMesT2[0] = 'Abril';
        break;
      case '05':
        $scope.convertDateMesT2[0] = 'Mayo';
        break;
      case '06':
        $scope.convertDateMesT2[0] = 'Junio';
        break;
      case '07':
        $scope.convertDateMesT2[0] = 'Julio';
        break;
      case '08':
        $scope.convertDateMesT2[0] = 'Agosto';
        break;
      case '09':
        $scope.convertDateMesT2[0] = 'Septiembre';
        break;
      case '10':
        $scope.convertDateMesT2[0] = 'Octubre';
        break;
      case '11':
        $scope.convertDateMesT2[0] = 'Noviembre';
        break;
      case '12':
        $scope.convertDateMesT2[0] = 'Diciembre';
        break;
    }
    //swal('Atención', "Usted tiene que pagar el IMPUESTO hasta la fecha: " + dateFormatedDMA + ".  Caso contrario se le recargara una multa economica.", 'info');
    swal('Atención', "Usted tiene que pagar el IMPUESTO hasta la fecha: " + $scope.convertDateDiaT2[0] + "-" + $scope.convertDateMesT2[0] + "-" + $scope.convertDateAnoT2[0] + ".  Caso contrario se le recargara una multa economica.", 'info');
  };

  function get_date_feriados(dateFormatedDMA, dateFormatedAMD) {
    //console.log('desde get feriado dateFormatedAMD');
    //console.log(dateFormatedAMD);
    $scope.url = $scope.my_location + "/feriadosRestxAMD/" + dateFormatedAMD;
    $http.get($scope.url).success(function(respuesta) {
      $scope.feriados = respuesta;
      console.log('xxx $scope.feriados');
      console.log($scope.feriados);
      //console.log($scope.feriados.length);
      switch($scope.feriados.length) {
        // la fecha no es feriado
        case 0:
          $scope.dateFeriado = dateFormatedAMD
          //console.log('$scope.dateFeriado');
          //console.log($scope.dateFeriado); //13-01-2017 //2017-02-27
          var cadena = $scope.dateFeriado;
          var nombres = cadena.split("-");
          var myDate=nombres[2] + "-" + nombres[1] + "-" + nombres[0];
          myDate=myDate.split("-");
          var newDate=myDate[1]+"/"+myDate[0]+"/"+myDate[2];

          //formate la fecha:
          var date_convert2 = new Date(newDate),
            mnth = ("0" + (date_convert2.getMonth()+1)).slice(-2),
            day  = ("0" + date_convert2.getDate()).slice(-2);

          console.log('newDate');
          console.log(newDate);
          //Si es sabado o domingo
          if(date_convert2.getDay() == 0 || date_convert2.getDay() == 6){
            switch(date_convert2.getDay()) {
              case 0:
                //es Domingo
                console.log('es domingo');
                var days = 1;  // se esta sumando un dia
                var a = new Date(date_convert2.getTime() + days*24*60*60*1000);
                var date_convert2 = new Date(a),
                  mnth = ("0" + (date_convert2.getMonth()+1)).slice(-2),
                  day  = ("0" + date_convert2.getDate()).slice(-2);
                $scope.convertDateDiaT2 = [day];
                $scope.convertDateMesT2 = [mnth];
                $scope.convertDateAnoT2 = [date_convert2.getFullYear()];
                $scope.get_description = "La fecha de pago ha caido Domingo: " + newDate + ", se tomara el dia siguiente habil." + " Usted tiene que pagar el IMPUESTO hasta de la fecha: " + $scope.convertDateDiaT2[0] + "-" + $scope.convertDateMesT2[0] + "-" + $scope.convertDateAnoT2[0] + ".  Caso contrario se le recargara una multa economica.";
                $scope.convertMes($scope.convertDateMesT2[0]);
                $scope.get_fecha_pago = date_convert2;
                break;
              case 6:
                //es Sabado
                console.log('es sabado');
                var days = 2;  // se esta sumando 2 dia
                var a = new Date(date_convert2.getTime() + days*24*60*60*1000);
                var date_convert2 = new Date(a),
                  mnth = ("0" + (date_convert2.getMonth()+1)).slice(-2),
                  day  = ("0" + date_convert2.getDate()).slice(-2);
                $scope.convertDateDiaT2 = [day];
                $scope.convertDateMesT2 = [mnth];
                $scope.convertDateAnoT2 = [date_convert2.getFullYear()];
                console.log('date_convert2');
                console.log(date_convert2);
                console.log($scope.convertDateDiaT2);
                console.log($scope.convertDateMesT2);
                console.log($scope.convertDateAnoT2);
                $scope.get_description = "La fecha de pago ha caido Sabado: " + newDate + ", se tomara el dia siguiente habil." + " Usted tiene que pagar el IMPUESTO hasta la fecha: " + $scope.convertDateDiaT2[0] + "-" + $scope.convertDateMesT2[0] + "-" + $scope.convertDateAnoT2[0] + ".  Caso contrario se le recargara una multa economica.";
                $scope.convertMes($scope.convertDateMesT2[0]);
                $scope.get_fecha_pago = date_convert2;
                break;
            }
          }
          else{
            //no es ni sabado ni domingo
            $scope.convertDateDiaT2 = [day];
            $scope.convertDateMesT2 = [mnth];
            $scope.convertDateAnoT2 = [date_convert2.getFullYear()];
            $scope.get_fecha_pago = date_convert2;
            $scope.get_description = "Usted tiene que pagar el IMPUESTO hasta la fecha: " + dateFormatedDMA + ".  Caso contrario se le cargara una multa economica.";
            //swal("Usted tiene que pagar el IMPUESTO hasta la fecha: " + dateFormatedDMA + ".  Caso contrario se le cargara una multa economica.");
            $scope.convertMes($scope.convertDateMesT2[0]);
          }
          break;
        case 1: //la fecha de pago ha caido en un feriado
          //var myDate="27-02-2017";;
          //--------------------------------------------------REFACTORIZAR:
          $scope.dateFeriado = $scope.feriados[0].field_fc_fecha;
          //console.log('$scope.dateFeriado');
          //console.log($scope.dateFeriado);
          var cadena = $scope.dateFeriado;
          var nombres = cadena.split("-");
          var myDate=nombres[2] + "-" + nombres[1] + "-" + nombres[0];
          myDate=myDate.split("-");
          var newDate=myDate[1]+"/"+myDate[0]+"/"+myDate[2];
          var dateFeriadoOrder = myDate[0]+"/"+myDate[1]+"/"+myDate[2];
          var dateFeriadoOrder2 = myDate[2]+"-"+myDate[1]+"-"+myDate[0];
          console.log('dateFeriadoOrder2');
          console.log(dateFeriadoOrder2);

          $scope.url = $scope.my_location + "/feriadosRestxAMD/" + dateFeriadoOrder2;
          $http.get($scope.url).success(function(respuesta) {
            $scope.feriados = respuesta;
            if($scope.feriados.length == 0){
              var today = new Date(newDate);
              var days = 1;  // se esta sumando un dia
              var a = new Date(today.getTime() + days*24*60*60*1000);

              var date_convert2 = new Date(a),
                mnth = ("0" + (date_convert2.getMonth()+1)).slice(-2),
                day  = ("0" + date_convert2.getDate()).slice(-2);
              $scope.convertDateDiaT2 = [day];
              $scope.convertDateMesT2 = [mnth];
              $scope.convertDateAnoT2 = [date_convert2.getFullYear()];
              console.log('date_convert2');
              console.log(date_convert2);

              $scope.get_description = "La fecha de pago ha caido en un dia feriado: " + dateFeriadoOrder + ", se tomara el dia siguiente habil." + " Usted tiene que pagar el IMPUESTO hasta de la fecha: " + $scope.convertDateDiaT2 + "-" + $scope.convertDateMesT2 + "-" + $scope.convertDateAnoT2 + ".  Caso contrario se le recargara una multa economica.";
              $scope.convertMes($scope.convertDateMesT2[0]);
              $scope.get_fecha_pago = date_convert2;
            }
            else if ($scope.feriados.length > 0){ // ha caido un feriado pero el siguiente dia tb es feriado, entonces se la suma 2 dias.
              var today = new Date(newDate);
              var days = 2;  // se esta sumando un dia
              var a = new Date(today.getTime() + days*24*60*60*1000);

              var date_convert2 = new Date(a),
                mnth = ("0" + (date_convert2.getMonth()+1)).slice(-2),
                day  = ("0" + date_convert2.getDate()).slice(-2);
              $scope.convertDateDiaT2 = [day];
              $scope.convertDateMesT2 = [mnth];
              $scope.convertDateAnoT2 = [date_convert2.getFullYear()];
              console.log('date_convert2');
              console.log(date_convert2);

              $scope.get_description = "La fecha de pago ha caido en un dia feriado: " + dateFeriadoOrder + ", se tomara el dia siguiente." + " Usted tiene que pagar el IMPUESTO hasta de la fecha: " + $scope.convertDateDiaT2 + "-" + $scope.convertDateMesT2 + "-" + $scope.convertDateAnoT2 + ".  Caso contrario se le recargara una multa economica.";
              $scope.convertMes($scope.convertDateMesT2[0]);
              $scope.get_fecha_pago = date_convert2;
            }
          });
          break;
      }//fin switch
      get_timestamp_Pago($scope.get_fecha_pago);
    });
  }

  function get_ufv_aa(convertDateAnoT2){
    console.log('convertDateAnoT2');
    console.log(convertDateAnoT2);
    $scope.urlUfvaa = $scope.my_location + "/ufvxDiaMesAnoRest/31/12/" + convertDateAnoT2;
    $http.get($scope.urlUfvaa).success(function(respuesta) {
      $scope.ufv_aa = respuesta;
      $scope.ufvaa_valor = $scope.ufv_aa[0].field_uc_valor;
      console.log('get_ufv_aa desde $scope.ufvaa_valor');
      console.log($scope.ufvaa_valor);
      //$scope.getImpuesto();
    });
  }

  function get_ufv_ma(convertDateDiaT, convertDateMesT, convertDateAnoT){
    var date = new Date(convertDateMesT + "/" + convertDateDiaT + "/" + convertDateAnoT);
    var ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    console.log('ultimoDia');
    console.log(ultimoDia);
    var ultimoDia_convert = new Date(ultimoDia),
      mnth = ("0" + (ultimoDia_convert.getMonth()+1)).slice(-2),
      day  = ("0" + ultimoDia_convert.getDate()).slice(-2);
    $scope.ultimoDia_convert_All = [day, mnth, ultimoDia_convert.getFullYear()].join("/");
    $scope.ultimoDia_convert_D = [day];
    $scope.ultimoDia_convert_M = [mnth];
    $scope.ultimoDia_convert_A = [ultimoDia_convert.getFullYear()];
    console.log('$scope.ultimoDia_convert_A');
    console.log($scope.ultimoDia_convert_A[0]);

    $scope.url = $scope.my_location + "/ufvxDiaMesAnoRest/" + $scope.ultimoDia_convert_D + "/" + $scope.ultimoDia_convert_M + "/" + $scope.ultimoDia_convert_A;
    $http.get($scope.url).success(function(respuesta) {
      $scope.ufv = respuesta;
      if(!$scope.ufv[0]){
        //alert('La fecha Ingresada no tiene UFV. Porfavor ingresar otra fecha');
        swal('Oops...','La fecha Ingresada no tiene UFV. Porfavor ingrese otra fecha','error');
        $scope.fecha_transmicion = '';
        $scope.get_base_imponible = '';
        $scope.get_base_imponible_update  = '';
        $scope.get_impuesto  = '';
      }
      else{
        console.log('fecha el ultima dia del mes anterior');
        console.log($scope.ufv[0].field_uc_fecha);
        //Ufv valor obtenido el ultimo dia del mes anterior de la fecha de transmicion:
        $scope.ufvma_valor = $scope.ufv[0].field_uc_valor;
        console.log('$scope.ufvma_valor');
        console.log($scope.ufvma_valor);
        //$scope.getImpuesto();
      }
    });
  }

  //Cedentes:
  $scope.datoLista = [];
  $scope.add_cedentes = function(){
    console.log('add cendentes');
    var dato = {};
    dato.name = '' ;
    dato.address = '';
    //dato.porcent = '';
    $scope.datoLista.push(dato);

  };

  $scope.remove_cedentes = function(){
    var newdatoLista=[];
    angular.forEach($scope.datoLista,function(v){
      if(!v.isDelete){
        newdatoLista.push(v);
      }
    });
    $scope.datoLista = newdatoLista;
    $scope.get_base_imponible = '';
    $scope.get_base_imponible_update  = '';
    //console.log('$scope.datoLista desde remove');
    //console.log($scope.datoLista);
  };

  //Cesionarios:
  $scope.dataList = [];
  $scope.add_cesionarios = function(){
    console.log('add Cedentes $scope.datoLista');
    console.log($scope.datoLista);
    $scope.sumPorcCedent = 0;
    for (var i = 0; i < $scope.datoLista.length; i++) {
      $scope.sumPorcCedent += $scope.datoLista[i].porcent;
    };
    console.log('$scope.sumPorcCedent');
    console.log($scope.sumPorcCedent);
    if($scope.sumPorcCedent <= 100){
      var data = {};
      data.name = '' ;
      data.address = '';
      //data.porcentaje = '';
      $scope.numHijos = $scope.dataList.length + 1;
      //TAREA VALIDAR EL TEXT FIELD QUE SOLO INGRESE NUMEROS:
      $scope.porcentaje = ($scope.sumPorcCedent / $scope.numHijos).toFixed(4);
      console.log($scope.porcentaje);
      console.log($scope.porcentaje);
      data.porcentaje = $scope.porcentaje;
      console.log('data.porcentaje');
      console.log(data.porcentaje);
      for (var i = 0; i < $scope.dataList.length; i++) {
        $scope.dataList[i].porcentaje = data.porcentaje;
      };
      $scope.dataList.push(data);
      if($scope.dataList.length == 1){
        $scope.dataList[0].name = $scope.nombrecompleto;
        $scope.dataList[0].address = $scope.domicilio;
      }
      //console.log('$scope.dataList desde add');
      //console.log($scope.dataList);
    }
    else{
      //swal("La suma de los porcentajes de los Cedentes tiene que ser menor o igual al 100 %.", "Porfavor elimina la fila exedente.");
      swal({
        title: "Disculpe",
        text: "La suma de los porcentajes de los Cedentes tiene que ser menor o igual al 100 % , Porfavor elimina la fila exedente.",
        type: "info",
        showLoaderOnConfirm: true,
      });
      /*console.log('$scope.dataList desde remove');
      console.log($scope.dataList);
      for (var i = 0; i < $scope.dataList.length; i++) {
        $scope.dataList[0].porcentaje = '';
        $scope.porcentaje = '';
      };*/
    }

  };

  $scope.remove_cesionarios = function(){
    var newDataList=[];
    angular.forEach($scope.dataList,function(v){
      if(!v.isDelete){
        newDataList.push(v);
      }
    });
    $scope.dataList = newDataList;
    for (var i = 0; i < newDataList.length; i++) {
      $scope.numHijos = newDataList.length;
      newDataList[i].porcentaje = $scope.sumPorcCedent / $scope.numHijos;
      $scope.porcentaje = newDataList[i].porcentaje;
    };
    //console.log('$scope.dataList desde remove');
    //console.log($scope.dataList);
  };

  $scope.selectedDR = function(getDR_urbano, getDR_rural, getDR_terreno, getDR_casa, getDR_departamento, getDR_fundo){
    var array_datosR = [];
    var array_datosR2 = [];
    array_datosR.push(getDR_urbano, getDR_rural, getDR_terreno, getDR_casa, getDR_departamento, getDR_fundo);

    for (var i = 0; i < array_datosR.length; i++) {
      var checked_dr = array_datosR[i];
      if(checked_dr != false && checked_dr != undefined){
        if(array_datosR.length > 0){
          array_datosR2.push(checked_dr);
        }
      }
    };
    $scope.datos_referentes = array_datosR2.toString();
  };


  $scope.baseImponibleSelected = function(get_base_imponible) {
   //if($scope.grado_parentesco != undefined && $scope.datoLista != undefined && $scope.fecha_transmicion != undefined){
    $scope.sumPorcCedent = 0;
    for (var i = 0; i < $scope.datoLista.length; i++) {
      $scope.sumPorcCedent += $scope.datoLista[i].porcent;
    };
    $scope.get_baseImponible = get_base_imponible;
    $scope.getImpuesto();
   //}
  };

  $scope.getImpuesto = function() {
    var result_porcent = $scope.sumPorcCedent / 100;
    var a = $scope.ufvma_valor;
    var b = $scope.ufvaa_valor;
    //var ufv_valor_string = a.toString();
    //console.log('ufv_valor_string');
    //console.log(ufv_valor_string);
    var ufvma_valor = parseFloat(a.replace(",", "."));
    var ufvaa_valor = parseFloat(b.replace(",", "."));
    //var ufv_valor = parseFloat($scope.ufv_valor.replace(/,/, '.'));
    console.log('ufvma_valor');
    console.log(ufvma_valor);
    console.log('ufvaa_valor');
    console.log(ufvaa_valor);
    var result_ufv = ufvma_valor / ufvaa_valor;

    var base_imponible_update = $scope.get_baseImponible * result_porcent * result_ufv;
    console.log('sin redondear get_base_imponible_update');
    console.log(base_imponible_update);
    $scope.get_base_imponible_update = Math.round(base_imponible_update);
    console.log('$scope.get_base_imponible_update');
    console.log($scope.get_base_imponible_update);

    console.log('bsb $scope.alicuota');
    console.log($scope.alicuota);
    $scope.get_impuesto = $scope.alicuota * $scope.get_base_imponible_update;
    $scope.get_impuesto = Math.round($scope.get_impuesto / 1000); //new santi, copi a 750
    console.log('drupal get_impuesto');
    console.log($scope.get_impuesto);

    //field Saldo definitivo a favor del Gobierno Autónomo Departamental de Cochabamba (S900 - S620 : Si > 0)
    $scope.get_impuestoSumaT = $scope.get_impuesto + $scope.get_pagos_a_cuenta + $scope.get_saldo;
    $scope.get_saldoDefinitivo = $scope.get_impuestoSumaT;
    //$scope.get_impuesto = $scope.get_impuesto.toFixed(4);
  };

  //get date current
  var d = new Date,
    dformat = [d.getMonth()+1,
    d.getDate(),
    d.getFullYear()].join('/')+' '+
    [d.getHours(),
    d.getMinutes()].join(':');
  $scope.get_fecha_actual = new Date(dformat);
  console.log('$scope.get_fecha_actual');
  console.log($scope.get_fecha_actual);

  /*$scope.cedentes = function(){
    $scope.get_cedentes_name = [];
    $scope.get_cedentes_domicilio = [];
    $scope.get_cedentes_porcentaje = [];

    if($scope.cedentes_name_1 != null && $scope.cedentes_address_1 != null && $scope.cedentes_porcent_1 != null){
      $scope.get_cedentes_name.push($scope.cedentes_name_1);
      $scope.get_cedentes_domicilio.push($scope.cedentes_address_1);
      $scope.get_cedentes_porcentaje.push($scope.cedentes_porcent_1);
    }
    if($scope.cedentes_name_2 != null && $scope.cedentes_address_2 != null && $scope.cedentes_porcent_2 != null){
      $scope.get_cedentes_name.push($scope.cedentes_name_2);
      $scope.get_cedentes_domicilio.push($scope.cedentes_address_2);
      $scope.get_cedentes_porcentaje.push($scope.cedentes_porcent_2);
    }
    if($scope.cedentes_name_3 != null && $scope.cedentes_address_3 != null && $scope.cedentes_porcent_3 != null){
      $scope.get_cedentes_name.push($scope.cedentes_name_3);
      $scope.get_cedentes_domicilio.push($scope.cedentes_address_3);
      $scope.get_cedentes_porcentaje.push($scope.cedentes_porcent_3);
    }
    if($scope.cedentes_name_4 != null && $scope.cedentes_address_4 != null && $scope.cedentes_porcent_4 != null){
      $scope.get_cedentes_name.push($scope.cedentes_name_4);
      $scope.get_cedentes_domicilio.push($scope.cedentes_address_4);
      $scope.get_cedentes_porcentaje.push($scope.cedentes_porcent_4);
    }
    $scope.cedentes_name = $scope.get_cedentes_name.toString();
    $scope.cedentes_domicilio = $scope.get_cedentes_domicilio.toString();
    $scope.cedentes_porcentaje = $scope.get_cedentes_porcentaje.toString();
  };
  $scope.cesionarios = function(){
    $scope.get_cesionarios_name = [];
    $scope.get_cesionarios_domicilio = [];
    $scope.get_cesionarios_porcentaje = [];

    if($scope.cesionarios_name_1 != null && $scope.cesionarios_address_1 != null && $scope.cesionarios_porcent_1 != null){
      $scope.get_cesionarios_name.push($scope.cesionarios_name_1);
      $scope.get_cesionarios_domicilio.push($scope.cesionarios_address_1);
      $scope.get_cesionarios_porcentaje.push($scope.cesionarios_porcent_1);
    }
    if($scope.cesionarios_name_2 != null && $scope.cesionarios_address_2 != null && $scope.cesionarios_porcent_2 != null){
      $scope.get_cesionarios_name.push($scope.cesionarios_name_2);
      $scope.get_cesionarios_domicilio.push($scope.cesionarios_address_2);
      $scope.get_cesionarios_porcentaje.push($scope.cesionarios_porcent_2);
    }
    if($scope.cesionarios_name_3 != null && $scope.cesionarios_address_3 != null && $scope.cesionarios_porcent_3 != null){
      $scope.get_cesionarios_name.push($scope.cesionarios_name_3);
      $scope.get_cesionarios_domicilio.push($scope.cesionarios_address_3);
      $scope.get_cesionarios_porcentaje.push($scope.cesionarios_porcent_3);
    }
    if($scope.cesionarios_name_4 != null && $scope.cesionarios_address_4 != null && $scope.cesionarios_porcent_4 != null){
      $scope.get_cesionarios_name.push($scope.cesionarios_name_4);
      $scope.get_cesionarios_domicilio.push($scope.cesionarios_address_4);
      $scope.get_cesionarios_porcentaje.push($scope.cesionarios_porcent_4);
    }
    $scope.cesionarios_name = $scope.get_cesionarios_name.toString();
    $scope.cesionarios_domicilio = $scope.get_cesionarios_domicilio.toString();
    $scope.cesionarios_porcentaje = $scope.get_cesionarios_porcentaje.toString();
  };*/

  //campo: DATOS BÁSICOS DE LA DECLARACIÓN JURADA QUE RECTIFICA
  $scope.disabled_rectificacion = true;
  $scope.get_pagos_a_cuenta = 0;
  $scope.get_saldo = 0;
  $scope.rectificacion = function(valor){
    if(!$scope.get_resAdmin && !$scope.get_formulario){
      //console.log('vacio: 1 campo , 2 campo');
      $scope.disabled_rectificacion = true;
      $scope.get_pagos_a_cuenta = 0;
      $scope.get_saldo = 0;
      $scope.getImpuesto();
    }
    if($scope.get_resAdmin && $scope.get_formulario){
      //console.log('lleno: 1 campo , 2 campo');
      $scope.disabled_rectificacion = false;
    }
    if($scope.get_resAdmin && !$scope.get_formulario){
      //console.log('lleno 1 campo y vacio 2 campo');
      $scope.disabled_rectificacion = false;
    }
    if(!$scope.get_resAdmin && $scope.get_formulario){
      //console.log('vacio 1 campo y lleno 2 campo');
      $scope.disabled_rectificacion = false;
    }
  };

  $scope.pagosCuenta_saldoC = function(){
    $scope.getImpuesto();
  }

  $scope.actuantes = function() {
    var array_nombre = [];
    var array_domicilio = [];
    var array_porcentaje = [];
    for (var i = 0; i < $scope.datoLista.length; i++) {
      array_nombre.push($scope.datoLista[i].name);
      array_domicilio.push($scope.datoLista[i].address);
      array_porcentaje.push($scope.datoLista[i].porcent);
    };
    var array_name = [];
    var array_address = [];
    var array_porcent = [];
    for (var i = 0; i < $scope.dataList.length; i++) {
      array_name.push($scope.dataList[i].name);
      array_address.push($scope.dataList[i].address);
      array_porcent.push($scope.dataList[i].porcentaje);
    };
    $scope.cedentes_name = array_nombre.toString();
    $scope.cedentes_domicilio = array_domicilio.toString();
    $scope.cedentes_porcentaje = array_porcentaje.toString();
    $scope.cesionarios_name = array_name.toString();
    $scope.cesionarios_domicilio =  array_address.toString();
    $scope.cesionarios_porcentaje = array_porcent.toString();
  };

  $scope.submit = function() {
    //$scope.cedentes();
    //$scope.cesionarios();
    $scope.actuantes();
    console.log('get_superficie_impuesto_municipal');
    console.log($scope.get_superficie_impuesto_municipal);
    console.log('codigo_catastral_dr');
    console.log($scope.codigo_catastral_dr);

    /*console.log('$scope.get_categoria');
    console.log($scope.get_categoria);
    console.log('$scope.datoLista cedentes');
    console.log($scope.datoLista);
    console.log('$scope.dataList cesionarios');
    console.log($scope.dataList);
    console.log('$scope.get_base_imponible');
    console.log($scope.get_base_imponible);*/
    if ($scope.get_categoria != undefined && $scope.get_base_imponible != undefined && $scope.name_parentesco != undefined) {
      var inmueble = {
        'user_id' : [{"target_id": parseInt($scope.uid)}],
        'name' : { 'value': $scope.nombrecompleto },
        'domicilio' : { 'value': $scope.domicilio },
        'categoria' : { 'value': $scope.get_categoria },
        'ci' : { 'value': $scope.ci },
        'emitido' : { 'value': $scope.emitido },
        'fecha_periodo' : { 'value': $scope.periodo_fecha },
        'documento' : { 'value': $scope.get_documento },
        'grado_parentesco' : { 'value': $scope.name_parentesco },
        'cedentes_name' : { 'value': $scope.cedentes_name },
        'cedentes_domicilio' : { 'value': $scope.cedentes_domicilio },
        'cedentes_porcentaje' : { 'value': $scope.cedentes_porcentaje },
        'cesionarios_name' : { 'value': $scope.cesionarios_name },
        'cesionarios_domicilio' : { 'value': $scope.cesionarios_domicilio },
        'cesionarios_porcentaje' : { 'value': $scope.cesionarios_porcentaje },
        'datos_referentes' : { 'value': $scope.datos_referentes },
        'code_catastral' : { 'value': $scope.codigo_catastral },
        'code_catastral_dr' : { 'value': $scope.codigo_catastral_dr }, //newDate
        'departamento' : { 'value': $scope.SelectedDepartamento },
        'localidad' : { 'value': $scope.alcaldia },
        'code_localidad' : { 'value': $scope.get_codigo_localidad },
        'direccion_inmueble' : { 'value': $scope.direcccion },
        'superficie_total' : { 'value': $scope.get_superficie_total },
        'superficie_transferida' : { 'value': $scope.get_superficie_transferida },
        'superficie_impuesto_municipal' : { 'value': $scope.get_superficie_impuesto_municipal }, //new
        'alcaldia' : { 'value': $scope.SelectedDepartamento },
        'fecha_transmicion' : { 'value': $scope.newDateTransmicion },
        'base_imponible' : { 'value': $scope.get_base_imponible },
        'base_imponible_update' : { 'value': $scope.get_base_imponible_update },
        'alicuota' : { 'value': $scope.alicuota },
        'impuesto' : { 'value': $scope.get_impuesto },
        //'deposito_code' : { 'value': $scope.get_codigoDeposito }, // por defecto Null
        //'deposito_monto' : { 'value': $scope.get_montoDepositado }  // por defecto Null
        //'deposito_name' : { 'value': $scope.get_nombreDeposito },   // por defecto Null
        //'deposito_fecha' : { 'value': $scope.fechaDeposito },     // por defecto Null
        'fecha_pago' : { 'value': $scope.newDatePago },
        'description' : { 'value': $scope.get_description },
        'estado_form' :{ 'value': 'Guardado'},
        //'fecha_a_pagarMulta' :{ 'value': ''}, // por defecto NULL
        //'m_impuesto_pago' : { 'value': $scope.get_impuesto },  // por defecto NULL
        //'m_mantenimiento_valor' : { 'value': $scope.get_impuesto },  // por defecto NULL
        //'m_tasa_interes' : { 'value': $scope.get_impuesto },  // por defecto NULL
        //'m_multa_incumplimiento' : { 'value': $scope.get_impuesto },  // por defecto NULL
        'multa' :{ 'value': 'Sin Multa'},
        'nro_res_admin' :{ 'value': $scope.resAdmin},
        'formulario' :{ 'value': $scope.formulario},
        'nro_orden' :{ 'value': $scope.orden},
        //'uid_edit' :{ 'value': ''},  NULL = nadie ha editado. // por defecto NULL

        //'fecha_transmicion' : { 'value': '1480190603' }, //Example

        '_links': { 'type': { 'href': $scope.my_location + '/rest/type/inmueble_entity/inmueble_entity' }}
      };
      $scope.addInmueble(inmueble);
    }
    else {
      //swal("Disculpe, Todos los campos son Requeridos");
      swal({
        title: "Disculpe",
        text: "Todos los campos son Requeridos",
        type: "info",
        //showCancelButton: true,
        //closeOnConfirm: false,
        showLoaderOnConfirm: true,
      });
    }
  };//fin submit

  $scope.addInmueble = function(inmueble) {
    return $http({
      url: $scope.my_location + '/entity/inmueble_entity',  //path
      method: 'POST',  //method post insertion a the bd
      data: inmueble, // pass the data object as defined above
      headers: {
        "Authorization": "Basic YWRtaW46YWRtaW4=",
        "Content-Type": "application/hal+json",
        "X-CSRF-Token": $scope.token // url/rest/session/token
      },
    }).then(function(data){    //AQUI ES LA CLAVE  ->  la funcion then recibe como  parametros  2 funciones....  la primera se ejecuta si tu elemento se guardó bien, la 2da se ejecuta si tu elemento se guardó mal
      //esto pasa si se guarda bien
      swal({
        title: "OK!",
        text: "Inmueble Registrado con Exito",
        type: "success",
        //timer: 2000,
        showConfirmButton: true
      });
      //redirect to home:
      setTimeout(function(){
        window.location = "/";
      }, 2100);
      console.log(data);  // SI IMPRIMIMOS EN CONSOLA ESE data  VEMOS QUE ES LO QUE DEVUELVE DRUPAL CUANDO SE HA GUARDADO BIEN EL CONTENIDO

    }, function(data){
      //esto pasa si no se guarda bien
      alert("Error, el objeto no se ha guardado");
      console.log(data);  // SI IMPRIMIMOS EN CONSOLA ESE data  VEMOS QUE ES LO QUE DEVUELVE DRUPAL CUANDO SE HA GUARDADO """MAL""" EL CONTENIDO (es decir NO se ha guardado)
    });
  }; //fin function addInmueble  //hay otras formas pero esta es una de las más fáciles. OK!

}//fin function

/**
* We need to bootstrap the app manually to the container by id, since we have
*  more than one app on the same page.
*/
angular.element(document).ready(function() {
  //angular.bootstrap(document.getElementById('name_id_form'),['name_module']);
  angular.bootstrap(document.getElementById('form-inmueble'),['inmueble']);
});