/**
 * @file
 *  Related JavaScript.
 */
// Declare an 'APP'
var mueble = angular.module('mueble', []);

/**
* Declare the controller that adds the default value to scope var.
*/
mueble.controller('muebleEditController', ['$scope', '$location', '$http', content]);

function content($scope, $location, $http) {
  console.log('santi edit js');
  // Get protocol concatenated to host
  $scope.my_location = $location.protocol() + "://" + $location.host();

  // Get token from url
  $scope.url = $scope.my_location + "/rest/session/token";
  $http.get($scope.url).success(function(respuesta){
    $scope.token = respuesta;
  });

  $scope.url = $scope.my_location + "/gradoParentescoRest/";
  $http.get($scope.url).success(function (response) {
    $scope.gradoParentesco = response;
  });

  //Get category.
  $scope.url = $scope.my_location + "/categoriaRest/";
  $http.get($scope.url).success(function (response) {
    $scope.categorias = response;
    //console.log('$scope.categorias');
    //console.log($scope.categorias);
  });

  $scope.categoriaSelected = function(get_categoria){
    $scope.get_description = $scope.get_fecha_pago = $scope.fecha_transmicion = $scope.get_fecha_pago = "";
    $scope.url = $scope.my_location + "/categoriaRestName/" + get_categoria; //name
    //console.log($scope.url);
    $http.get($scope.url).success(function(respuesta) {
      $scope.categoriaRest = respuesta;
      $scope.categoriaDays = $scope.categoriaRest[0].field_categoria_dias;
      /*//console.log('categoriaDays');
      //console.log($scope.categoriaDays);*/
      //$scope.categoria = $scope.categoriaRest[0].name;
    });
  };

  //Get Grado Parentesco Selected from field.
  $scope.gradoSelected = function(grado_parentesco){
    //console.log('grado_parentesco');
    //console.log(grado_parentesco);
    //$scope.url = $scope.my_location + "/gradoParentescoRest/" + grado_parentesco;  //grado_parentesco=numero
    $scope.url = $scope.my_location + "/gradoParentescoxNombreRest/" + grado_parentesco;  //grado_parentesco=name
    $http.get($scope.url).success(function (response) {
      $scope.gradoParentescoAlicuota = response;
      $scope.name_parentesco = $scope.gradoParentescoAlicuota[0].name; //para guardar en la BD.
      $scope.gradoParentesco_alicuota = $scope.gradoParentescoNombre[0].field_alicuota_porcentaje;

      $scope.alicuota = $scope.gradoParentesco_alicuota;
      //console.log('alicuota');
      //console.log($scope.alicuota);
      if($scope.fecha_transmicion != undefined && $scope.get_base_imponible != undefined ){
        ////console.log(' hay valor en el campo fecha transmicion y base inpinible');
        $scope.getImpuesto();
      }
    });

    if ($scope.showCuotas) {
      $scope.calculateIncome();
      //console.log("calculateIncome");
    }
  };

  //Get user rol funcionario current.
  /*$scope.urlUser = $scope.my_location + "/usuarioFuncionarioRest/";
  $http.get($scope.urlUser).success(function (response) {
    $scope.usuarioF = response;
    console.log('$scope.usuario');
    console.log($scope.usuarioF);
    $scope.uidF = $scope.usuarioF[0].uid;
    console.log('aaaaaaaa $scope.uidF');
    console.log($scope.uidF);
  });*/

  //Get date current.
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();
  today = dd+'-'+mm+'-'+yyyy;
  //console.log('today');
  //console.log(today);

  //Get ID inmueble current from url.
  var urlCurrent = window.location.pathname;
  urlCurrent = urlCurrent.split("/").slice(1);
  $scope.urlInmuebleID = urlCurrent[1];

  //Get Inmueble Entity Current:
  $scope.url = $scope.my_location + "/muebleRest/" + $scope.urlInmuebleID;
  $http.get($scope.url).success(function (response) {
    $scope.muebles = response;
    console.log($scope.muebles);
    $scope.nombrecompleto = $scope.muebles[0]['name'];
    $scope.domicilio = $scope.muebles[0]['domicilio'];
    $scope.uid = $scope.muebles[0]['uid'];
    //$scope.fechaPago = $scope.muebles[0]['fecha_pago'];
    $scope.impuestoPago = $scope.muebles[0]['impuesto'];

    $scope.idMmueble = $scope.muebles[0]['id'];

    $scope.get_categoria = $scope.muebles[0]['categoria']; // HTML
    $scope.init_categoria($scope.get_categoria);

    $scope.name_gradoParentesco = $scope.muebles[0]['grado_parentesco'];
    //$scope.init_gradoParenteso($scope.name_gradoParentesco);

    $scope.ci = $scope.muebles[0]['ci'];
    $scope.emitido = $scope.muebles[0]['emitido'];
    $scope.periodo_fecha = $scope.muebles[0]['fecha_periodo'];
    $scope.get_documento = $scope.muebles[0]['documento'];

    $scope.name_departamento = $scope.muebles[0]['departamento']; // For save in the BD.
    $scope.init_departamento($scope.name_departamento);

    $scope.name_localidad = $scope.muebles[0]['localidad']; // For save in the BD.
    $scope.init_localidad($scope.name_localidad);

    //Check and click DATOS REFERENTES for save in the DB.
    /*
    $scope.datos_referentes = $scope.inmuebles[0]['datos_referentes'];
    //console.log('xxxx datos_referentes');
    //console.log($scope.datos_referentes);
    if($scope.datos_referentes != ''){
      var array_datos_referentes = $scope.datos_referentes.split(',');
      for (var i = 0; i < array_datos_referentes.length; i++) {
        $scope.dato = array_datos_referentes[i];
        //document.getElementById('datos-referentes-' + $scope.dato).click();
      };
    }*/

    $scope.datos_referentes_str = $scope.muebles[0]['datos_referentes'];
    String.prototype.replaceAll_2 = function(search, replacement) {
      var target = this;
      return target.split(search).join(replacement);
    };

    $scope.datos_referentes_str = $scope.datos_referentes_str.replaceAll_2('&quot;','"');
    $scope.myReferente = JSON.parse($scope.datos_referentes_str);
    $scope.fillReferentes($scope.myReferente);

    $scope.resAdmin = $scope.muebles[0]['nro_res_admin'];
    $scope.formulario = $scope.muebles[0]['formulario'];
    $scope.orden = $scope.muebles[0]['nro_orden'];

    //fecha transmicion:
    var fecha_transmicion = $scope.muebles[0]['fecha_transmicion'];
    var array_fechaTra = $scope.muebles[0]['fecha_transmicion'].split("-");
    var fechaTransmicion = array_fechaTra[2] + "-" + array_fechaTra[1] + "-" + array_fechaTra[0]; //array.
    var newDateTransmicion = array_fechaTra[1]+"/"+array_fechaTra[0]+"/"+array_fechaTra[2];
    $scope.newDateTransmicion = new Date(newDateTransmicion).getTime()/1000;//date timesatmp init for save in the DB.
    //var dateTransmicion_timestamp = new Date(newDateTransmicion);
    var dateTransmicion_timestamp = new Date(newDateTransmicion);
    var dateHuman = new Date(dateTransmicion_timestamp);
    //Thu Dec 01 2016 00:00:00 GMT-0400 (BOT)
    $scope.dateTransmicionSelected(dateHuman); // init
    //console.log('----newDateTransmicion');
    //console.log($scope.newDateTransmicion);
    document.getElementById("fecha_transmicion").value = fechaTransmicion; // For HTML.

    //base imponible:
    $scope.get_base_imponible = parseFloat($scope.muebles[0]['base_imponible']); // for HTML.
    //$scope.baseImponibleSelected($scope.get_base_imponible);

    //base imponible actualizada:
    $scope.get_base_imponible_update = parseFloat($scope.muebles[0]['base_imponible_update']); //For HTML.

    //impuesto a pagar:
    $scope.get_impuesto = parseFloat($scope.muebles[0]['impuesto']); //for HTML

    //Deposito
    formarArrayDeposito($scope.muebles);

    //Descripcion:
    $scope.get_description = $scope.muebles[0]['description']; //HTML and DB.

    //FechaPago
    //AQUI ESTOY TRABAJANDOOOOOOOOOOOOOOOOOOOOOOOO*******************************
    var newDatePago = $scope.muebles[0]['fecha_pago']; //09-12-2016
    //var newDatePago = '12-14-2016';
    //$scope.newDatePago = newDatePago.replace(/blue/g, "red");
    //var myDate = $scope.fechaPago.split("/");
    var myDate = newDatePago.split("-");
    var newDatePago = myDate[1]+"/"+myDate[0]+"/"+myDate[2];
    //console.log('xxxx newDatePago');
    //console.log(newDatePago);
    $scope.newDatePago = new Date(newDatePago).getTime()/1000;  //para guardar en l BD
    //console.log('xxx $scope.newDatePago');
    //console.log($scope.newDatePago);


    //Cedentes or Cesionarios.
    formarArray($scope.muebles);

    //Get dias transcurridos desde la fecha de pago hasta la fecha actual.
    //esta bien:
    $scope.fechaPago = $scope.muebles[0]['fecha_pago'];
    $scope.fechaDeposito = $scope.muebles[0]['deposito_fecha'];
    var aFecha1 = $scope.fechaPago.split('-');
    //var aFecha2 = today.split('-'); //get el ultimo fecha deposito. ojo*****************.deposito_fecha "07/12/2016"
    var aFecha2 = $scope.fechaDeposito.split('/'); //get el ultimo fecha deposito. ojo*****************.deposito_fecha "07/12/2016"
    //console.log('aFecha1 aFecha2');
    //console.log(aFecha1 + " - " + aFecha2);
    var fFecha1 = Date.UTC(aFecha1[2],aFecha1[1]-1,aFecha1[0]);
    var fFecha2 = Date.UTC(aFecha2[2],aFecha2[1]-1,aFecha2[0]);
    var dif = fFecha2 - fFecha1;
    var diasTranscurridos = Math.floor(dif / (1000 * 60 * 60 * 24));  //dias transcurridos.
    //console.log('diasTranscurridos');
    //console.log(diasTranscurridos);

    //estado
    $scope.estado = "Guardado"; // for html

    //fecha a pagar la Multa:
    var fecha_a_pagarMulta = $scope.muebles[0]['fecha_a_pagarMulta'];  //10-12-2016
    console.log('fecha_a_pagarMulta: ' + fecha_a_pagarMulta);
    var array_fechaTra = fecha_a_pagarMulta.split("-");
    ////console.log(array_fechaTra);
    var newDateTransmicion = array_fechaTra[1]+"/"+array_fechaTra[0]+"/"+array_fechaTra[2];
    $scope.fechaPagarMulta  = new Date(newDateTransmicion).getTime()/1000;//date timesatmp init for save in the DB.
    console.log('timestamp init: ' + $scope.fechaPagarMulta );
    //for set html:
    var array_fecha_a_pagarMulta = fecha_a_pagarMulta.split("-");
    var convertArray_date_a_pagarMulta = fecha_a_pagarMulta.split("-"); //convert array
    var ordertArray_date_a_pagarMulta =  convertArray_date_a_pagarMulta[0] + "-" + convertArray_date_a_pagarMulta[1] + "-" + convertArray_date_a_pagarMulta[2]; //array: 2016-12-10 anio mes dia
    var order_fecha_a_pagarMulta = array_fecha_a_pagarMulta[2] + "-" + array_fecha_a_pagarMulta[1] + "-" + array_fecha_a_pagarMulta[0]; //array.
    console.log(order_fecha_a_pagarMulta  );
    document.getElementById("fecha_pagoMulta").value = order_fecha_a_pagarMulta; // For set HTML. ok
    $scope.show_fecha_pago_multa = true;
    /*if(diasTranscurridos > 0){ //muestra u oculta el campo "fecha a pagar la multa" si correspinde.
      //swal('Tiene Multa');
      $scope.show_fecha_pago_multa = true;
    }
    else{
      //swal('no tiene multa');
      $scope.show_fecha_pago_multa = false;
      //$scope.estado = $scope.muebles[0]['status_form_750'];
      //console.log($scope.estado);
    }*/
    if(diasTranscurridos > 0){ //muestra u oculta el campo "fecha a pagar la multa" si corresponde.
      //swal('tiene multa');
      $scope.show_fecha_pago_multa = true;
    }
    else{
      //swal('no tiene multa');
      if(!fecha_a_pagarMulta){
        //no tiene valor
        $scope.show_fecha_pago_multa = false;
      }
      else{
        //tiene valor
        $scope.show_fecha_pago_multa = true;
      }

      $scope.multaTotal = $scope.muebles[0]['multa'];
    }

    //tabla Multa (cuando existe multa)
    //console.log($scope.inmuebles[0]['m_mantenimiento_valor']);
    if($scope.muebles[0]['m_mantenimiento_valor'] != ''){ //distinto de vacio
      $scope.multa_mantenimientoAlValor = parseFloat($scope.muebles[0]['m_mantenimiento_valor']);  //for table html
      $scope.multa_tasaDeInteres = parseFloat($scope.muebles[0]['m_tasa_interes']);  //for table html
      $scope.multa_alIncumplimiento = parseFloat($scope.muebles[0]['m_multa_incumplimiento']);  //for table html
    }
    else{
      $scope.multa_mantenimientoAlValor = 0;  //for table html
      $scope.multa_tasaDeInteres = 0;  //for table html
      $scope.multa_alIncumplimiento = 0;  //for table html
    }

    //multa
    $scope.multaTotal = $scope.muebles[0]['multa'];
  });//fin

  //Get Cedentes and Cesionarios guardados anteriorment.e (edit inmueble).
  function completeArray(cedeTam, cedeDom, cedePor, cedeNom, cesioTam, cesioDom, cesioPor, cesioNom){
    $scope.totalCedentes = [];
    for (var i = 0; i < cedeTam; i++) {
      var objTotal = {
        nombre : cedeNom[i],
        domicilio : cedeDom[i],
        porcent : cedePor[i],
      };
      $scope.totalCedentes.push(objTotal);
    };

    $scope.totalCesionarios = [];
    for (var i = 0; i < cesioTam; i++) {
      var objTotal = {
        name : cesioNom[i],
        address : cesioDom[i],
        porcentaje : cesioPor[i],
      };
      $scope.totalCesionarios.push(objTotal);
    };
  };

  //Get building array Cedentes and Cesionarios (edit inmueble).
  function formarArray(inmueble){
    for (var i = 0; i < inmueble.length; i++) {
      var cedentes_name = inmueble[i].cedentes_name;
      var cecentes_domicilio = inmueble[i].cedentes_domicilio;
      var cedentes_porcentaje = inmueble[i].cedentes_porcentaje;
      var cesionarios_name = inmueble[i].cesionarios_name;
      var cesionarios_domicilio = inmueble[i].cesionarios_domicilio;
      var cesionarios_porcentaje = inmueble[i].cesionarios_porcentaje;
    };
    var arrayCedeNom = cedentes_name.split(",");
    var arrayCedeDom = cecentes_domicilio.split(",");
    var arrayCedePor = cedentes_porcentaje.split(",");
    var arrayCesioNom = cesionarios_name.split(",");
    var arrayCesioDom = cesionarios_domicilio.split(",");
    var arrayCesioPor = cesionarios_porcentaje.split(",");
    completeArray(arrayCedePor.length, arrayCedeDom, arrayCedePor, arrayCedeNom, arrayCesioPor.length, arrayCesioDom, arrayCesioPor, arrayCesioNom);
  };

  $scope.init_categoria = function (get_categoria){
    if(get_categoria == 'Transmicion entre vivos'){ // mejorar
      $scope.categoriaDays = '5';
    }
    else{  //sucesion
      $scope.categoriaDays = '90';

    }

    /*$scope.url = $scope.my_location + "/categoriaRestName/" + get_categoria; //name
    $http.get($scope.url).success(function(respuesta) {
      $scope.categoriaRest = respuesta;
      $scope.categoriaDays = $scope.categoriaRest[0].field_categoria_dias;
      //console.log('init $scope.categoriaDays');
      //console.log($scope.categoriaDays);
    });
    $scope.categoriaDays = '5';  //test seteado  WORKING SANTI*/
  };

  $scope.init_gradoParenteso = function (name_gradoParentesco){
    //console.log('name_gradoParentesco');
    //console.log(name_gradoParentesco);
    $scope.url = $scope.my_location + "/gradoParentescoxNombreRest/" + name_gradoParentesco;  //grado_parentesco=name
    $http.get($scope.url).success(function (response) {
      $scope.gradoParentescoNombre = response;
      //console.log('init gradoParentescoNombre');
      //console.log($scope.gradoParentescoNombre);
      $scope.name_parentesco = $scope.gradoParentescoNombre[0].name; //para guardar en la BD.
      $scope.gradoParentesco_alicuota = $scope.gradoParentescoNombre[0].field_alicuota_porcentaje;
      $scope.grado_parentesco = $scope.gradoParentescoNombre[0].name; //para setear el HTML

      $scope.alicuota = $scope.gradoParentesco_alicuota;
      //console.log('alicuota');
      //console.log($scope.alicuota);
      if($scope.fecha_transmicion != undefined && $scope.get_base_imponible != undefined ){
        ////console.log(' hay valor en el campo fecha transmicion y base inpinible');
        $scope.getImpuesto();
      }
    });
  };

  $scope.url = $scope.my_location + "/departamentoRest/";
  $http.get($scope.url).success(function (response) {
    $scope.departamento = response;
    ////console.log('$scope.departamento');
    ////console.log($scope.departamento);
  });

  //Get Departamento Selected from field.
  $scope.deptoSelected = function(id_departamento){
    //console.log('id_departamento');
    //console.log(id_departamento);
    $scope.url = $scope.my_location + "/localidadxDeptoRest/" + id_departamento;
    $http.get($scope.url).success(function(respuesta) {
      $scope.localidad = respuesta;
      if($scope.localidad.length > 0) {
        $scope.SelectedDepartamento = $scope.localidad[0].field_localidad_departamento_1;
        //console.log('$scope.SelectedDepartamento');
        //console.log($scope.SelectedDepartamento);
        $scope.get_alcaldia = $scope.SelectedDepartamento; // For HTML and save DB.
      }
    });
  };

  //Get Localidad Selected from field.
  $scope.localidadSelected = function(get_localidad){
    //console.log(get_localidad);
    $scope.url = $scope.my_location + "/localidadxTidRest/" + get_localidad;
    $http.get($scope.url).success(function(respuesta) {
      $scope.localidadTid = respuesta;
      $scope.alcaldia = $scope.localidadTid[0].name; //para guardar en la BD.
      $scope.get_codigo_localidad = $scope.localidadTid[0].field_localidad_codigo; // para HTML y BD.
    });
  };


  $scope.init_departamento = function(departamento){
    $scope.url = $scope.my_location + "/departamentoRest/" + departamento;
    $http.get($scope.url).success(function(respuesta) {
      $scope.departamento = respuesta;
      $scope.id_departamento = $scope.departamento[0].tid;
      $scope.get_departamento = $scope.id_departamento; //For HTML.
      $scope.deptoSelected($scope.get_departamento);
    });
    $scope.get_alcaldia = departamento; // For HTML and save DB.
  };

  $scope.init_localidad = function(localidad){
    $scope.url = $scope.my_location + "/localidadxNameRest/" + localidad;
    $http.get($scope.url).success(function(respuesta) {
      $scope.localidadName = respuesta;
      $scope.alcaldia = $scope.localidadName[0].name; //para guardar en la BD.
      $scope.get_localidad = $scope.localidadName[0].tid; //para HTML.
      $scope.get_codigo_localidad = $scope.localidadName[0].field_localidad_codigo; // para HTML y BD.
    });
  };

  //Get Date Transmicion Selected from field.
  //Fecha de la Transmision:
  $scope.dateTransmicionSelected = function(fecha_transmicion){
    //console.log('xxx fecha_transmicion');
    //console.log(fecha_transmicion); //Fri Dec 02 2016 00:00:00 GMT-0400 (BOT) //Thu Dec 01 2016 00:00:00 GMT-0400 (BOT)
    convert(fecha_transmicion);
    //scope.getImpuesto();
  };


  //Convert format date OK.
  //Fecha de la Transmision:
  function convert(fecha_transmicion) {
    var date = new Date(fecha_transmicion),
      mnth = ("0" + (date.getMonth()+1)).slice(-2),
      day  = ("0" + date.getDate()).slice(-2);
    //$scope.resultado = [date.getFullYear(), mnth].join("-");
    $scope.fechaTransmicion = [day, mnth, date.getFullYear()].join("/");
    $scope.fechaTransmicion_dia = [day];
    $scope.fechaTransmicion_mes = [mnth];
    $scope.fechaTransmicion_ano = [date.getFullYear()];
    date_transmicion_all($scope.fechaTransmicion_dia, $scope.fechaTransmicion_mes, $scope.fechaTransmicion_ano);
    //date_tramsmicion_mes_ano($scope.fechaTransmicion_mes, $scope.fechaTransmicion_ano);

    //get_timestamp($scope.fechaTransmicion); //santi
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
    //console.log('startDate');
    //console.log(startDate);
    //------validar si tiene valor $scope.categoriaDays:----------
    //console.log('convert $scope.categoriaDays');
    //console.log($scope.categoriaDays);

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
    //var dateFormatedDMA = [day, mnth, date.getFullYear()].join("-");
    //var dateFormatedAMD = [date.getFullYear(), mnth, day].join("-");
    $scope.dateFormatedDMA = [day, mnth, date.getFullYear()].join("-");
    $scope.dateFormatedAMD = [date.getFullYear(), mnth, day].join("-");
    //console.log('convert dateFormatedDMA');
    //console.log($scope.dateFormatedDMA);
    //alert("Usted tiene que pagar el IMPUESTO hasta del:" + dateFormated + ".  Caso contrario se le cargara una multa economica.");

    //get_date_feriados(dateFormatedDMA, dateFormatedAMD); //santi
    //get_date_feriados($scope.dateFormatedDMA, $scope.dateFormatedAMD); //santi
  }

  //Convert format date All OK.
  //Fecha de la Transmision:
  function date_transmicion_all(fechaTransmicion_dia, fechaTransmicion_mes, fechaTransmicion_ano) {
    $scope.url = $scope.my_location + "/ufvxDiaMesAnoRest/" + fechaTransmicion_dia + "/" + fechaTransmicion_mes + "/" + fechaTransmicion_ano;
    $http.get($scope.url).success(function(respuesta) {
      $scope.dateTransmicion = respuesta;
      //console.log('aaa dateTransmicion');
      //console.log($scope.dateTransmicion);
      if($scope.get_categoria != undefined || $scope.grado_parentesco != undefined || $scope.datoLista.length != 0 || $scope.dataList.length != 0){
        //console.log('tiene valor');
        if(!$scope.dateTransmicion[0]){
          //swal(':) La fecha Ingresada no tiene UFV. Porfavor ingresar otra fecha');
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
          get_date_feriados($scope.dateFormatedDMA, $scope.dateFormatedAMD); //puesto ahora OK
        }
      }
      else{
        //console.log('no tiene valor');
        /*swal({
          title: "Atencion",
          text: "Por favor Ingrese datos en los campos Requeridos",
          type: "info",
          closeOnConfirm: false,
        });
        $scope.fecha_transmicion = '';*/
      }
      /*borrar: if(!$scope.dateTransmicion[0]){
        //swal(':) La fecha Ingresada no tiene UFV. Porfavor ingresar otra fecha');
        //console.log('IF :)');
        $scope.fecha_transmicion = '';
        $scope.get_base_imponible = '';
        $scope.get_base_imponible_update  = '';
        $scope.get_impuesto  = '';
      }
      else{
        //console.log('ELSE :)');
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
        get_date_feriados($scope.dateFormatedDMA, $scope.dateFormatedAMD); //puesto ahora OK
      }*/
    });
  }

  //Fecha de la Transmision:
  function get_ufv_aa(convertDateAnoT2){
    //console.log('convertDateAnoT2');
    //console.log(convertDateAnoT2);
    $scope.urlUfvaa = $scope.my_location + "/ufvxDiaMesAnoRest/31/12/" + convertDateAnoT2;
    $http.get($scope.urlUfvaa).success(function(respuesta) {
      $scope.ufv_aa = respuesta;
      $scope.ufvaa_valor = $scope.ufv_aa[0].field_uc_valor;
      //console.log('get_ufv_aa desde $scope.ufvaa_valor');
      //console.log($scope.ufvaa_valor);
      //$scope.getImpuesto();
    });
  }

  //Fecha de la Transmision:
  function get_ufv_ma(convertDateDiaT, convertDateMesT, convertDateAnoT){
    var date = new Date(convertDateMesT + "/" + convertDateDiaT + "/" + convertDateAnoT);
    var ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    //console.log('ultimoDia');
    //console.log(ultimoDia);
    var ultimoDia_convert = new Date(ultimoDia),
      mnth = ("0" + (ultimoDia_convert.getMonth()+1)).slice(-2),
      day  = ("0" + ultimoDia_convert.getDate()).slice(-2);
    $scope.ultimoDia_convert_All = [day, mnth, ultimoDia_convert.getFullYear()].join("/");
    $scope.ultimoDia_convert_D = [day];
    $scope.ultimoDia_convert_M = [mnth];
    $scope.ultimoDia_convert_A = [ultimoDia_convert.getFullYear()];
    //console.log('$scope.ultimoDia_convert_A');
    //console.log($scope.ultimoDia_convert_A[0]);

    $scope.url = $scope.my_location + "/ufvxDiaMesAnoRest/" + $scope.ultimoDia_convert_D + "/" + $scope.ultimoDia_convert_M + "/" + $scope.ultimoDia_convert_A;
    $http.get($scope.url).success(function(respuesta) {
      $scope.ufv = respuesta;
      //console.log('xxx $scope.ufv');
      //console.log($scope.ufv);
      if(!$scope.ufv[0]){
        //swal(':D La fecha Ingresada no tiene UFV. Porfavor ingresar otra fecha');
        $scope.fecha_transmicion = '';
        $scope.get_base_imponible = '';
        $scope.get_base_imponible_update  = '';
        $scope.get_impuesto  = '';
      }
      else{
        //console.log('fecha el ultima dia del mes anterior');
        //console.log($scope.ufv[0].field_uc_fecha);
        //Ufv valor obtenido el ultimo dia del mes anterior de la fecha de transmicion:
        $scope.ufvma_valor = $scope.ufv[0].field_uc_valor;
        //console.log('$scope.ufvma_valor');
        //console.log($scope.ufvma_valor);
        //$scope.getImpuesto();
      }
    });
  }

  //Convert fechaTransmicion in timestamp for save in the BD:
  //Fecha de la Transmision:
  function get_timestamp(fechaTransmicion) {
    var myDate = fechaTransmicion.split("/");
    var newDateTransmicion = myDate[1]+"/"+myDate[0]+"/"+myDate[2];
    $scope.newDateTransmicion = new Date(newDateTransmicion).getTime()/1000;  //para guardar en l BD
    //console.log('get_timestamp desde $scope.fecha_transmicion');
    //console.log($scope.newDateTransmicion);
  }

  //Fecha de la Transmision:
  function get_date_feriados(dateFormatedDMA, dateFormatedAMD) {
    ////console.log('desde get feriado dateFormatedAMD');
    ////console.log(dateFormatedAMD);
    $scope.url = $scope.my_location + "/feriadosRestxAMD/" + dateFormatedAMD;
    $http.get($scope.url).success(function(respuesta) {
      $scope.feriados = respuesta;
      ////console.log('$scope.feriados');
      ////console.log($scope.feriados);
      ////console.log($scope.feriados.length);
      switch($scope.feriados.length) {
        // la fecha no es feriado
        case 0:
          $scope.dateFeriado = dateFormatedAMD
          ////console.log('$scope.dateFeriado');
          ////console.log($scope.dateFeriado); //13-01-2017 //2017-02-27
          var cadena = $scope.dateFeriado;
          var nombres = cadena.split("-");
          var myDate=nombres[2] + "-" + nombres[1] + "-" + nombres[0];
          myDate=myDate.split("-");
          var newDate=myDate[1]+"/"+myDate[0]+"/"+myDate[2];

          //formate la fecha:
          var date_convert2 = new Date(newDate),
            mnth = ("0" + (date_convert2.getMonth()+1)).slice(-2),
            day  = ("0" + date_convert2.getDate()).slice(-2);

          //console.log('newDate');
          //console.log(newDate);
          //Si es sabado o domingo
          if(date_convert2.getDay() == 0 || date_convert2.getDay() == 6){
            switch(date_convert2.getDay()) {
              case 0:
                //es Domingo
                //console.log('es domingo');
                var days = 1;  // se esta sumando un dia
                var a = new Date(date_convert2.getTime() + days*24*60*60*1000);
                var date_convert2 = new Date(a),
                  mnth = ("0" + (date_convert2.getMonth()+1)).slice(-2),
                  day  = ("0" + date_convert2.getDate()).slice(-2);
                $scope.convertDateDiaT2 = [day];
                $scope.convertDateMesT2 = [mnth];
                $scope.convertDateAnoT2 = [date_convert2.getFullYear()];
                $scope.get_description = "La fecha de pago ha caido Domingo: " + newDate + ", se tomara el dia siguiente habil." + " Usted tiene que pagar el IMPUESTO hasta de la fecha: " + $scope.convertDateDiaT2[0] + "-" + $scope.convertDateMesT2[0] + "-" + $scope.convertDateAnoT2[0] + ".  Caso contrario se le recargara una multa economica.";
                //swal("Usted tiene que pagar el IMPUESTO hasta de la fecha: " + $scope.convertDateDiaT2[0] + "-" + $scope.convertDateMesT2[0] + "-" + $scope.convertDateAnoT2[0] + ".  Caso contrario se le recargara una multa economica.");
                $scope.get_fecha_pago = date_convert2;
                break;
              case 6:
                //es Sabado
                //console.log('es sabado');
                var days = 2;  // se esta sumando 2 dia
                var a = new Date(date_convert2.getTime() + days*24*60*60*1000);
                var date_convert2 = new Date(a),
                  mnth = ("0" + (date_convert2.getMonth()+1)).slice(-2),
                  day  = ("0" + date_convert2.getDate()).slice(-2);
                $scope.convertDateDiaT2 = [day];
                $scope.convertDateMesT2 = [mnth];
                $scope.convertDateAnoT2 = [date_convert2.getFullYear()];
                //console.log('date_convert2');
                //console.log(date_convert2);
                //console.log($scope.convertDateDiaT2);
                //console.log($scope.convertDateMesT2);
                //console.log($scope.convertDateAnoT2);
                $scope.get_description = "La fecha de pago ha caido Sabado: " + newDate + ", se tomara el dia siguiente habil." + " Usted tiene que pagar el IMPUESTO hasta la fecha: " + $scope.convertDateDiaT2[0] + "-" + $scope.convertDateMesT2[0] + "-" + $scope.convertDateAnoT2[0] + ".  Caso contrario se le recargara una multa economica.";
                //swal("Usted tiene que pagar el IMPUESTO hasta la fecha: " + $scope.convertDateDiaT2[0] + "-" + $scope.convertDateMesT2[0] + "-" + $scope.convertDateAnoT2[0] + ".  Caso contrario se le recargara una multa economica.");
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
          }
          break;
        case 1: //la fecha de pago ha caido en un feriado
          //var myDate="27-02-2017";;
          //--------------------------------------------------REFACTORIZAR:
          $scope.dateFeriado = $scope.feriados[0].field_fc_fecha;
          ////console.log('$scope.dateFeriado');
          ////console.log($scope.dateFeriado);
          var cadena = $scope.dateFeriado;
          var nombres = cadena.split("-");
          var myDate=nombres[2] + "-" + nombres[1] + "-" + nombres[0];
          myDate=myDate.split("-");
          var newDate=myDate[1]+"/"+myDate[0]+"/"+myDate[2];
          var dateFeriadoOrder = myDate[0]+"/"+myDate[1]+"/"+myDate[2];
          var dateFeriadoOrder2 = myDate[2]+"-"+myDate[1]+"-"+myDate[0];
          //console.log('dateFeriadoOrder2');
          //console.log(dateFeriadoOrder2);

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
              //console.log('date_convert2');
              //console.log(date_convert2);

              $scope.get_description = "La fecha de pago ha caido en un dia feriado: " + dateFeriadoOrder + ", se tomara el dia siguiente habil." + " Usted tiene que pagar el IMPUESTO hasta de la fecha: " + $scope.convertDateDiaT2 + "-" + $scope.convertDateMesT2 + "-" + $scope.convertDateAnoT2 + ".  Caso contrario se le recargara una multa economica.";
              //swal("Usted tiene que pagar el IMPUESTO hasta la fecha: " + $scope.convertDateDiaT2 + "-" + $scope.convertDateMesT2 + "-" + $scope.convertDateAnoT2 + ".  Caso contrario se le recargara una multa economica.");
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
              //console.log('date_convert2');
              //console.log(date_convert2);

              $scope.get_description = "La fecha de pago ha caido en un dia feriado: " + dateFeriadoOrder + ", se tomara el dia siguiente." + " Usted tiene que pagar el IMPUESTO hasta de la fecha: " + $scope.convertDateDiaT2 + "-" + $scope.convertDateMesT2 + "-" + $scope.convertDateAnoT2 + ".  Caso contrario se le recargara una multa economica.";
              //swal("Usted tiene que pagar el IMPUESTO hasta la fecha: " + $scope.convertDateDiaT2 + "-" + $scope.convertDateMesT2 + "-" + $scope.convertDateAnoT2 + ".  Caso contrario se le recargara una multa economica.");
              $scope.get_fecha_pago = date_convert2;
            }
          });
          break;
      }//fin switch
      get_timestamp_Pago($scope.get_fecha_pago);
    });
  }

  //Convert fecha de Pago in timestamp for save in the BD:
  //Fecha de la Transmision:
  function get_timestamp_Pago(fechaPago) {
    var date = new Date(fechaPago),
      mnth = ("0" + (date.getMonth()+1)).slice(-2),
      day  = ("0" + date.getDate()).slice(-2);
    //$scope.resultado = [date.getFullYear(), mnth].join("-");
    $scope.fechaPago = [day, mnth, date.getFullYear()].join("/");

    var myDate = $scope.fechaPago.split("/");
    var newDatePago = myDate[1]+"/"+myDate[0]+"/"+myDate[2];
    //console.log('xxxx newDatePago');
    //console.log(newDatePago);
    $scope.newDatePago = new Date(newDatePago).getTime()/1000;  //para guardar en l BD
    //console.log('get_timestamp desde $scope.newDatePago');
    //console.log($scope.newDatePago);
  }

  //Get Fecha Deposito Selected from field.
  $scope.dateSelectedDeposito = function(get_fechaDeposito){
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
  };
  //------------------------------------multa-----------------------------------------------------

  /*$scope.dateSelected = function(get_fecha_pago_multa){
    console.log(get_fecha_pago_multa);
    if(get_fecha_pago_multa != null){ //si tiene valor: get_fecha_pago_multa
      var date = new Date(get_fecha_pago_multa),
      mnth = ("0" + (date.getMonth()+1)).slice(-2),
      day  = ("0" + date.getDate()).slice(-2);
      //$scope.resultado = [date.getFullYear(), mnth].join("-");
      $scope.fechaPagoM = [day, mnth, date.getFullYear()].join("/");
      $scope.fechaPagoM_dia = [day];
      $scope.fechaPagoM_mes = [mnth];
      $scope.fechaPagoM_ano = [date.getFullYear()];
      $scope.datePagoM = $scope.fechaPagoM_dia + "/" + $scope.fechaPagoM_mes + "/" + $scope.fechaPagoM_ano;
      $scope.datePagoM2 =  $scope.fechaPagoM_mes + "/" + $scope.fechaPagoM_dia + "/" + $scope.fechaPagoM_ano;
      //console.log('$scope.datePagoM');
      //console.log($scope.datePagoM);

      //fecha a pagar multa
      //$scope.date_a_pagarMulta = new Date($scope.datePagoM).getTime()/1000; //For save in the BD
      $scope.fechaPagarMulta = new Date($scope.datePagoM2).getTime()/1000; //For save in the BD
      console.log('dateselected: ' + $scope.fechaPagarMulta);
      //$scope.fechaPagarMulta = 1476244800; //For save in the BD

      $scope.ti_fecha_aPagar = $scope.fechaPagoM_ano + "/" + $scope.fechaPagoM_mes;

      $scope.url = $scope.my_location + "/ufvxDiaMesAnoRest/" + $scope.datePagoM;
      $http.get($scope.url).success(function(respuesta) {
        $scope.ufv = respuesta;
        if(!$scope.ufv[0]){
          //santi working :
          //swal('La fecha Ingresada para pagar la Multa no tiene UFV. Porfavor ingresar otra fecha');
          $scope.get_fecha_pago_multa = '';
        }
        else{
          //la fecha ingresada tiene ufv:
          $scope.ufv_fecha_aPagar = $scope.ufv[0].field_uc_valor;
          $scope.url = $scope.my_location + "/muebleRest/" + $scope.urlInmuebleID;
          $http.get($scope.url).success(function (response) {
            $scope.muebles = response;
            $scope.impuestoPago = $scope.muebles[0]['impuesto'];
            //
            var fechaPago = $scope.muebles[0]['fecha_pago'];
            fechaPago = fechaPago.replace(/-/g , "/");
            $scope.url = $scope.my_location + "/ufvxDiaMesAnoRest/" + fechaPago;
            $http.get($scope.url).success(function(respuesta) {
              $scope.ufv_fechaPago = respuesta;
              if(!$scope.ufv_fechaPago[0]){
                //swal('La fecha el cual se vence el Pago del Impuesto no tiene UFV.');
              }
              else{
                $scope.ufv_fechaPago = $scope.ufv_fechaPago[0].field_uc_valor;
              }
              $scope.get_mantValor($scope.ufv_fecha_aPagar, $scope.impuestoPago, $scope.ufv_fechaPago, $scope.ti_fecha_aPagar, $scope.datePagoM);
            });
          });
        }
      });
    } // fin if
  };*/

  //var arrayMulta = [];
  //Get Mantenimiento al Valor.
  $scope.get_mantValor = function(ufv_fecha_aPagar, impuestoPago, ufv_fechaPago, ti_fecha_aPagar, datePagoM){
    //console.log('get_mantValor');
    //console.log(ufv_fecha_aPagar);  // VALIDAR: tiene que ser mayor a la ufv_fechaPago
    //console.log(impuestoPago);
    //console.log(ufv_fechaPago);
    //console.log(ti_fecha_aPagar);

    //UFV_fecha_aPagar = fecha en la que va a pagar la multa, puede modificarse el valor del campo o puede ser la fecha actual.
    //UFV_fechaPago = fecha en la que tenia que pagar.

    //Formula: impuestoPago * UFV_fecha_aPagar / UFV_fechaPago;
    impuestoPago = parseFloat(impuestoPago.replace(/,/ , "."));
    ufv_fecha_aPagar = parseFloat(ufv_fecha_aPagar.replace(/,/ , "."));
    ufv_fechaPago = parseFloat(ufv_fechaPago.replace(/,/ , "."));
    //console.log('get_mantValor');
    //console.log(ufv_fecha_aPagar);  //2.16777
    //console.log(impuestoPago);      //809
    //console.log(ufv_fechaPago);     //2.16929
    $scope.multa_icumplimiento(ufv_fecha_aPagar); //function

    // (809.00 * 2,16777) / 2,16929
    $scope.resultadoMV = impuestoPago * ufv_fecha_aPagar;
    $scope.resultadoMV = $scope.resultadoMV / ufv_fechaPago;
    $scope.resultadoMV = $scope.resultadoMV - impuestoPago;
    $scope.resultadoMV = $scope.resultadoMV.toFixed(4);
    //console.log('$scope.resultadoMV');
    //console.log($scope.resultadoMV);  //ok

    //arrayMulta.push(impuestoPago, Math.round(parseFloat($scope.resultadoMV))); //santi
    //$scope.multa_impuestoAlPago = impuestoPago;
    $scope.multa_mantenimientoAlValor = Math.round(parseFloat($scope.resultadoMV));

    $scope.get_tasaInteres($scope.resultadoMV, impuestoPago, ti_fecha_aPagar, datePagoM);
  };

  //Get Tasa de Interes.
  $scope.get_tasaInteres = function(resultadoMV, impuestoPago, ti_fecha_aPagar, datePagoM){
    $scope.url = $scope.my_location + "/tasaInteresRest/" + ti_fecha_aPagar;
    $http.get($scope.url).success(function (response) {
      $scope.tasaInteres = response;
      //console.log('$scope.tasaInteres');
      //console.log($scope.tasaInteres);
      $scope.ti_fecha_aPagar_valor = $scope.tasaInteres[0].field_tic_valor;

      //Get dias transcurridos hasta la fecha.
      $scope.url = $scope.my_location + "/muebleRest/" + $scope.urlInmuebleID;
      $http.get($scope.url).success(function (response) {
        $scope.muebles = response;
        $scope.fechaPago = $scope.muebles[0]['fecha_pago'];

        var aFecha1 = $scope.fechaPago.split('-');
        var aFecha2 = datePagoM.split('/');   //7-2-2017
        var fFecha1 = Date.UTC(aFecha1[2],aFecha1[1]-1,aFecha1[0]);
        var fFecha2 = Date.UTC(aFecha2[2],aFecha2[1]-1,aFecha2[0]);
        var dif = fFecha2 - fFecha1;
        var dias = Math.floor(dif / (1000 * 60 * 60 * 24));  //dias transcurridos.
        //console.log('dias');
        //console.log(dias);

        $scope.tributoOmitido_update = resultadoMV + impuestoPago; //0.2648 + 809
        //console.log('$scope.tributoOmitido_update');
        //console.log($scope.tributoOmitido_update);
        //tasaINteres = tributoOmitido_update * (1 + (ti_fecha_aPagar_valor/360))elevado a los dias - tributoOmitido_update
        $scope.resultadoTI = Math.pow((1 + ($scope.ti_fecha_aPagar_valor / 360)), dias);
        $scope.resultadoTI = $scope.resultadoTI * $scope.tributoOmitido_update; // 5.02 * 809.2648 =
        $scope.resultadoTI = $scope.resultadoTI - $scope.tributoOmitido_update;
        //console.log('$scope.resultadoTI');
        //console.log($scope.resultadoTI);

        //arrayMulta.push(Math.round($scope.resultadoTI));  //santi
        $scope.multa_tasaDeInteres = Math.round($scope.resultadoTI);
      });
    });
    //Formular Original:
    //var tributo_omitido_update = resultadoMV + $scope.impuestoPago;
    //var resultadoTI =  tributo_omitido_update * (1 + ti_fecha_aPagar);
    //resultadoTI = (resultadoTI / 360); //todo elevado a los dias que han transcurrido -> dias.
    //resultadoTI = resultadoTI - tributo_omitido_update;
  };

  //Get multa por incumplimiento al deber formal.
  //SI ha pagado el impuesto esto seria el saldo: multa_icumplimiento
  $scope.multa_icumplimiento = function(ufv_fecha_aPagar){
    $scope.url = $scope.my_location + "/muebleRest/" + $scope.urlInmuebleID;
    $http.get($scope.url).success(function (response) {
      $scope.muebles = response;
      $scope.autorID_inmueble = $scope.muebles[0]['uid'];

      $scope.url = $scope.my_location + "/usuariosRest/" + $scope.autorID_inmueble;
      $http.get($scope.url).success(function (response) {
        $scope.usuarioInmueble = response;
        //console.log('$scope.usuarioInmueble');
        //console.log($scope.usuarioInmueble);
        $scope.autorInmueble_estado = $scope.usuarioInmueble[0].field_user_estado;
        //console.log('$scope.autorInmueble_estado');
        //console.log($scope.autorInmueble_estado);
        //Persona Natural
        if($scope.autorInmueble_estado == 'Persona Natural'){
          //console.log('iffffffff');
          //console.log('if  ufv_fecha_aPagar');
          //console.log(ufv_fecha_aPagar);
          $scope.resultadoMI = 150 * ufv_fecha_aPagar;  //150 UFV
        }
        else{ //Persona Jurídica:
          $scope.resultadoMI = 400 * ufv_fecha_aPagar;  //400 ufv
        }
        //console.log('$scope.resultadoMI');
        //console.log($scope.resultadoMI);
        $scope.multa_alIncumplimiento = Math.round(parseFloat($scope.resultadoMI));

        //console.log('zzzzz get_impuesto');
        //console.log($scope.get_impuesto);
        //console.log('multa_mantenimientoAlValor');
        //console.log($scope.multa_mantenimientoAlValor);
        //console.log('multa_tasaDeInteres');
        //console.log($scope.multa_tasaDeInteres);
        //console.log('multa_alIncumplimiento');
        //console.log($scope.multa_alIncumplimiento);
        //$scope.multaTotal = $scope.get_impuesto + $scope.multa_mantenimientoAlValor + $scope.multa_tasaDeInteres + $scope.multa_alIncumplimiento;
        $scope.multaTotal = $scope.get_impuesto + $scope.multa_mantenimientoAlValor + Math.round($scope.resultadoTI) + $scope.multa_alIncumplimiento;

        //arrayMulta.push(Math.round($scope.resultadoMI));  //santi
        ////console.log('arrayMulta');
        ////console.log(arrayMulta);

        /*//console.log('arrayMulta 0 Impuesto a pagar');
        //console.log(arrayMulta[0]);
        $scope.impuestoPago = arrayMulta[0];

        //console.log('arrayMulta 1 resultadoMV');
        //console.log(arrayMulta[1]);
        $scope.resultadoMV = arrayMulta[1];

        //console.log('arrayMulta 2 $scope.resultadoTI');
        //console.log(arrayMulta[2]);
        $scope.resultadoTI = arrayMulta[2];

        //console.log('arrayMulta 3 $scope.resultadoMI');
        //console.log(arrayMulta[3]);
        $scope.resultadoMI = arrayMulta[3];*/


        /*$scope.multaTotal = 0;
        for (var i = 0; i < arrayMulta.length; i++) {
          $scope.multaTotal += arrayMulta[i];
        };
        //console.log('multaTotal');
        //console.log(Math.round($scope.multaTotal));*/
      });
    });
  };

  /*tabla a mostrar:
  $scope.impuestoPago
  resultadoMV
  resultadoTI
  resultadoMI
  var resultadoTotalMUlta = $scope.impuestoPago + resultadoMV + resultadoTI + resultadoMI;
  */

  //------------------------------------------------fin Multa--------------------------------

  //Cedentes:
  //$scope.datoLista = [];
  $scope.add_cedentes = function(){
    var dato = {
      nombre : '',
      domicilio : '',
      porcent : '',
    };
    $scope.totalCedentes.push(dato);
  };

  $scope.remove_cedentes = function(){
    var newdatoLista=[];
    angular.forEach($scope.totalCedentes,function(v){
      if(!v.isDelete){
        newdatoLista.push(v);
      }
    });
    $scope.totalCedentes = newdatoLista;
    $scope.get_base_imponible = '';
    $scope.get_base_imponible_update  = '';
  };

  //Cesionarios:
  //$scope.dataList = [];
  $scope.add_cesionarios = function(){
    ////console.log('add Cedentes $scope.totalCedentes');
    ////console.log($scope.totalCedentes);
    $scope.sumPorcCedent = 0;
    for (var i = 0; i < $scope.totalCedentes.length; i++) {
      $scope.sumPorcCedent += parseInt($scope.totalCedentes[i].porcent);
    };
    ////console.log('$scope.sumPorcCedent');
    ////console.log($scope.sumPorcCedent);
    if($scope.sumPorcCedent <= 100){
      $scope.numHijos = $scope.totalCesionarios.length + 1;
      ////console.log('$scope.numHijos');
      ////console.log($scope.numHijos);
      //TAREA VALIDAR EL TEXT FIELD QUE SOLO INGRESE NUMEROS:
      $scope.porcentaje = ($scope.sumPorcCedent / $scope.numHijos).toFixed(4);
      //for save BD:
      var data = {};
        data.name = '' ;
        data.address = '';
        data.porcentaje = $scope.porcentaje;
      //for html:
      for (var i = 0; i < $scope.totalCesionarios.length; i++) {
        $scope.totalCesionarios[i].porcentaje = $scope.porcentaje;
        $scope.totalCesionarios[i].porcentaje = data.porcentaje;
      };

      $scope.totalCesionarios.push(data);
      if($scope.totalCesionarios.length == 1){
        $scope.totalCesionarios[0].name = $scope.nombrecompleto;
        $scope.totalCesionarios[0].address = $scope.domicilio;
      }
    }
    else{
      //swal("La suma de los porcentajes de los Cedentes tiene que ser menor o igual al 100 %.", "Porfavor elimina la fila exedente.");
      /*//console.log('$scope.totalCesionarios');
      //console.log($scope.totalCesionarios);*/
      /*for (var i = 0; i < $scope.totalCesionarios.length; i++) {
        $scope.totalCesionarios[0].porcentaje = '';
        $scope.porcentaje = '';
      };*/
      //$scope.remove_cesionarios();
    }

  };

  $scope.remove_cesionarios = function(){
    var newDataList=[];
    angular.forEach($scope.totalCesionarios,function(v){
      if(!v.isDelete){
        newDataList.push(v);
      }
    });
    $scope.totalCesionarios = newDataList;
    for (var i = 0; i < newDataList.length; i++) {
      $scope.numHijos = newDataList.length;
      newDataList[i].porcentaje = $scope.sumPorcCedent / $scope.numHijos;
      $scope.porcentaje = newDataList[i].porcentaje;
    };
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
    //console.log('$scope.datos_referentes');
    //console.log($scope.datos_referentes);
  };

  $scope.baseImponibleSelected = function(get_base_imponible) {
    //console.log('santi get_base_imponible');
    //console.log(get_base_imponible);
   //if($scope.grado_parentesco != undefined && $scope.datoLista != undefined && $scope.fecha_transmicion != undefined){
    $scope.sumPorcCedent = 0;
    //for (var i = 0; i < $scope.datoLista.length; i++) {
    for (var i = 0; i < $scope.totalCedentes.length; i++) {
      //$scope.sumPorcCedent += $scope.datoLista[i].porcent;
      $scope.sumPorcCedent += $scope.totalCedentes[i].porcent;
    };
    $scope.get_baseImponible = get_base_imponible;
    $scope.getImpuesto();
   //}
    $scope.get_fecha_pago_multa = '';
    $scope.multaTotal = $scope.multa_mantenimientoAlValor = $scope.multa_tasaDeInteres = $scope.multa_alIncumplimiento = '';
  };

  $scope.getImpuesto = function() {
    var result_porcent = $scope.sumPorcCedent / 100;
    var a = $scope.ufvma_valor;
    var b = $scope.ufvaa_valor;
    //var ufv_valor_string = a.toString();
    ////console.log('ufv_valor_string');
    ////console.log(ufv_valor_string);
    var ufvma_valor = parseFloat(a.replace(",", "."));
    var ufvaa_valor = parseFloat(b.replace(",", "."));
    //var ufv_valor = parseFloat($scope.ufv_valor.replace(/,/, '.'));
    //console.log('ufvma_valor');
    //console.log(ufvma_valor);
    //console.log('ufvaa_valor');
    //console.log(ufvaa_valor);
    var result_ufv = ufvma_valor / ufvaa_valor;
    var base_imponible_update = $scope.get_baseImponible * result_porcent * result_ufv;
    //console.log('sin redondear get_base_imponible_update');
    //console.log(base_imponible_update);
    $scope.get_base_imponible_update = Math.round(base_imponible_update);
    //console.log('$scope.get_base_imponible_update');
    //console.log($scope.get_base_imponible_update);
    $scope.get_impuesto = $scope.alicuota * $scope.get_base_imponible_update;
    //console.log('sin redondear get_impuesto');
    //console.log($scope.get_impuesto / 100);
    $scope.get_impuesto = Math.round($scope.get_impuesto / 100);
    //$scope.get_impuesto = $scope.get_impuesto.toFixed(4);
  };

  //Get Deposito guardados anteriormente (edit inmueble).
  function completeArrayDeposito(cedeTam, cedeD, montoD, nombreD, fechaD){
    /*//console.log('completeArray');
    //console.log(cedeTam);
    //console.log(cedeD);
    //console.log(montoD);
    //console.log(nombreD);
    //console.log(fechaD);*/ //20/02/2017

    $scope.totalDeposito = [];
    if(cedeTam == 1){ //solo hay un deposito
      var array_fechaD = fechaD.split("/"); //convert string to array.
      fechaD = array_fechaD[2] + "-" + array_fechaD[1] + "-" + array_fechaD[0] + "T00:00:00-0400";
      var dato = {
        codigoDeposito : cedeD,
        montoDeposito : parseFloat(montoD),
        nombreDeposito : nombreD,
        //fechaDeposito : new Date('2017-02-08T00:00:00-0400'), // ok
        fechaDeposito : new Date(fechaD), // ok
      };
      $scope.totalDeposito.push(dato);
    }
    else{
      //console.log('else');
      for (var i = 0; i < cedeTam; i++) {  //2
        var array_fechaD = fechaD[i].split("/"); //convert string to array.
        fechaD[i] = array_fechaD[2] + "-" + array_fechaD[1] + "-" + array_fechaD[0] + "T00:00:00-0400";
        var dato = {
          codigoDeposito : cedeD[i],
          montoDeposito : parseFloat(montoD[i]),
          nombreDeposito : nombreD[i],
          fechaDeposito : new Date(fechaD[i]),
        };
        $scope.totalDeposito.push(dato);
      };
    }
    //console.log('completeArray totalDeposito');
    //console.log($scope.totalDeposito);
  };

  //Get building array Cedentes and Cesionarios (edit inmueble).
  function formarArrayDeposito(inmuebles){
    var array_codigoDeposito = inmuebles[0].deposito_code.split("-"); //string convert to array.
    var array_montoDeposito = inmuebles[0].deposito_monto.split("-");
    var array_nombreDeposito = inmuebles[0].deposito_name.split("-");

    /*var date = new Date(inmuebles[0].deposito_fecha),
      mnth = ("0" + (date.getMonth()+1)).slice(-2),
      day  = ("0" + date.getDate()).slice(-2);
    var array_fechaDeposito = [day, mnth, date.getFullYear()].join("/");*/
    var array_fechaDeposito = inmuebles[0].deposito_fecha.split("-");
    //console.log('array_fechaDeposito');
    //console.log(array_fechaDeposito);

    if(array_codigoDeposito.length > 1 && array_montoDeposito.length > 1 && array_nombreDeposito.length > 1 && array_fechaDeposito.length > 1){
      //console.log('existe mas de 1 Deposito');
      completeArrayDeposito(array_codigoDeposito.length, array_codigoDeposito, array_montoDeposito, array_nombreDeposito, array_fechaDeposito);
    }
    else{
      //console.log('existe 1 deposito');
      var codigoDeposito = inmuebles[0].deposito_code;
      //var montoDeposito = parseFloat(inmuebles[0].deposito_monto);
      var montoDeposito = inmuebles[0].deposito_monto;
      var nombreDeposito = inmuebles[0].deposito_name;
      var fechaDeposito = inmuebles[0].deposito_fecha;
      //console.log(fechaDeposito);
      //console.log(codigoDeposito);
      //console.log(montoDeposito);
      //console.log(nombreDeposito);
      completeArrayDeposito(inmuebles.length, codigoDeposito, montoDeposito, nombreDeposito, fechaDeposito);
    }
  };

  $scope.actuantes = function() {
    var array_nombre = [];
    var array_domicilio = [];
    var array_porcentaje = [];
    //for (var i = 0; i < $scope.datoLista.length; i++) {
    for (var i = 0; i < $scope.totalCedentes.length; i++) {
      array_nombre.push($scope.totalCedentes[i].nombre);
      array_domicilio.push($scope.totalCedentes[i].domicilio);
      array_porcentaje.push($scope.totalCedentes[i].porcent);
    };
    var array_name = [];
    var array_address = [];
    var array_porcent = [];
    //for (var i = 0; i < $scope.dataList.length; i++) {
    for (var i = 0; i < $scope.totalCesionarios.length; i++) {
      array_name.push($scope.totalCesionarios[i].name);
      array_address.push($scope.totalCesionarios[i].address);
      array_porcent.push($scope.totalCesionarios[i].porcentaje);
    };
    $scope.cedentes_name = array_nombre.toString();
    $scope.cedentes_domicilio = array_domicilio.toString();
    $scope.cedentes_porcentaje = array_porcentaje.toString();
    $scope.cesionarios_name = array_name.toString();
    $scope.cesionarios_domicilio =  array_address.toString();
    $scope.cesionarios_porcentaje = array_porcent.toString();
  };

  //$scope.depositoList = [];
  $scope.add_deposito_bancario = function(){
    //console.log('click');
    var dato = {};
     dato.codigoDeposito= '';
     dato.montoDeposito = '';
     dato.nombreDeposito = '';
     dato.fechaDeposito = '';
     //dato.porcent = '';
     //$scope.totalDeposito.push(dato);
     $scope.totalDeposito.push(dato);
  };
  //console.log('$scope.totalDeposito');
  //console.log($scope.totalDeposito);

  $scope.remove_deposito_bancario = function(){
    var newdatoLista=[];
    angular.forEach($scope.totalDeposito,function(v){
      if(!v.isDelete){
        newdatoLista.push(v);
      }
    });
    $scope.totalDeposito = newdatoLista;
  };

  $scope.save_deposito = function(){
    //console.log('submit totalDeposito');
    //console.log($scope.totalDeposito);

    var array_depositoCodigo = [];
    var array_depositoMonto = [];
    var array_depositoName = [];
    var array_depositoFecha =[];
    for (var i = 0; i < $scope.totalDeposito.length; i++) {
      array_depositoCodigo.push($scope.totalDeposito[i].codigoDeposito);
      array_depositoMonto.push($scope.totalDeposito[i].montoDeposito);
      array_depositoName.push($scope.totalDeposito[i].nombreDeposito);

      var date = new Date($scope.totalDeposito[i].fechaDeposito),
        mnth = ("0" + (date.getMonth()+1)).slice(-2),
        day  = ("0" + date.getDate()).slice(-2);
      var fechaDeposito = [day, mnth, date.getFullYear()].join("/");
      array_depositoFecha.push(fechaDeposito);
    };
    $scope.depositoCodigo = (array_depositoCodigo.toString()).replace(/,/g, "-");
    $scope.depositoMonto = (array_depositoMonto.toString()).replace(/,/g, "-");
    $scope.depositoName = (array_depositoName.toString()).replace(/,/g, "-");
    $scope.depositoFecha = (array_depositoFecha.toString()).replace(/,/g, "-");
    //console.log($scope.depositoCodigo);
    //console.log($scope.depositoMonto);
    //console.log($scope.depositoName);
    //console.log($scope.depositoFecha);
  };

  // Muebles by Alvaro
  // Show datos referentes
  $scope.showMotonave = false;
  $scope.showAeronave = false;
  $scope.showCuotas = false;
  $scope.showVehiculos = false;
  $scope.changeReferent = function(datosReferentes) {
    switch(datosReferentes){
      case "motonave":
        $scope.showMotonave = true;
        $scope.showAeronave = false;
        $scope.showCuotas = false;
        $scope.showVehiculos = false;
        break;
      case "aeronave":
        $scope.showMotonave = false;
        $scope.showAeronave = true;
        $scope.showCuotas = false;
        $scope.showVehiculos = false;
        break;
      case "cuotas y otros":
        $scope.showMotonave = false;
        $scope.showAeronave = false;
        $scope.showCuotas = true;
        $scope.showVehiculos = false;
        break;
      case "vehiculos":
        $scope.showMotonave = false;
        $scope.showAeronave = false;
        $scope.showCuotas = false;
        $scope.showVehiculos = true;
        break;
    }
  };

  $scope.getReferente = function(){
    //console.log($scope.datosReferentes);
    switch($scope.datosReferentes){
      case "motonave":
        var motonave = {
          'referente' : $scope.datosReferentes,
          'moTipoCasco' : $scope.moTipoCasco,
          'moEslora' : $scope.moEslora,
          'moMaterial' : $scope.moMaterial,
          'moPotenciaMotor' : $scope.moPotenciaMotor,
          'moMatricula' : $scope.moMatricula,
        };

        $scope.referente = JSON.stringify(motonave);
        //console.log($scope.referente);
        break;
      case "aeronave":
        var aeronave = {
          'referente' : $scope.datosReferentes,
          'aeroMarca' : $scope.aeroMarca,
          'aeroModelo' : $scope.aeroModelo,
          'aeroAnio' : $scope.aeroAnio,
          'aeroMatricula' : $scope.aeroMatricula,
        };

        $scope.referente = JSON.stringify(aeronave);
        //console.log($scope.referente);
        break;
      case "cuotas y otros":
        var cuotas = {
          'referente' : $scope.datosReferentes,
          'cuotaRegistro' : $scope.cuotaRegistro,
          'cuotaMonto' : $scope.cuotaMonto,
        };

        $scope.referente = JSON.stringify(cuotas);
        //console.log($scope.referente);
        break;
      case "vehiculos":
        var vehiculos = {
          'referente' : $scope.datosReferentes,
          'veTipo' : $scope.veTipo,
          'veMarca' : $scope.veMarca,
          'veModelo' : $scope.veModelo,
          'veCilindrada' : $scope.veCilindrada,
          'veProceden' : $scope.veProceden,
          'vePlaca' : $scope.vePlaca,
        };

        $scope.referente = JSON.stringify(vehiculos);
        //console.log($scope.referente);
        break;
    }
  };

  $scope.fillReferentes = function(ref){
    //console.log(ref);
    switch(ref.referente){
      case "motonave":
        $scope.datosReferentes = ref.referente;
        $scope.moTipoCasco = ref.moTipoCasco;
        $scope.moEslora = ref.moEslora;
        $scope.moMaterial = ref.moMaterial;
        $scope.moPotenciaMotor = ref.moPotenciaMotor;
        $scope.moMatricula = ref.moMatricula;
        $scope.showMotonave = true;
        $scope.showAeronave = false;
        $scope.showCuotas = false;
        $scope.showVehiculos = false;
        var motonave = {
          'referente' : $scope.datosReferentes,
          'moTipoCasco' : $scope.moTipoCasco,
          'moEslora' : $scope.moEslora,
          'moMaterial' : $scope.moMaterial,
          'moPotenciaMotor' : $scope.moPotenciaMotor,
          'moMatricula' : $scope.moMatricula,
        };

        $scope.referente = JSON.stringify(motonave);
        //console.log($scope.referente);
        break;
      case "aeronave":
        $scope.datosReferentes = ref.referente;
        $scope.aeroMarca = ref.aeroMarca;
        $scope.aeroModelo = ref.aeroModelo;
        $scope.aeroAnio =  ref.aeroAnio;
        $scope.aeroMatricula = ref.aeroMatricula;
        $scope.showMotonave = false;
        $scope.showAeronave = true;
        $scope.showCuotas = false;
        $scope.showVehiculos = false;
        var aeronave = {
          'referente' : $scope.datosReferentes,
          'aeroMarca' : $scope.aeroMarca,
          'aeroModelo' : $scope.aeroModelo,
          'aeroAnio' : $scope.aeroAnio,
          'aeroMatricula' : $scope.aeroMatricula,
        };

        $scope.referente = JSON.stringify(aeronave);
        //console.log($scope.referente);
        break;
      case "cuotas y otros":
        $scope.datosReferentes = ref.referente;
        $scope.cuotaRegistro = ref.cuotaRegistro;
        $scope.cuotaMonto = ref.cuotaMonto;
        $scope.showMotonave = false;
        $scope.showAeronave = false;
        $scope.showCuotas = true;
        $scope.showVehiculos = false;
        var cuotas = {
          'referente' : $scope.datosReferentes,
          'cuotaRegistro' : $scope.cuotaRegistro,
          'cuotaMonto' : $scope.cuotaMonto,
        };

        $scope.referente = JSON.stringify(cuotas);
        //console.log($scope.referente);
        break;
      case "vehiculos":
        $scope.datosReferentes = ref.referente;
        $scope.veTipo = ref.veTipo;
        $scope.veMarca = ref.veMarca;
        $scope.veModelo = ref.veModelo;
        $scope.veCilindrada = ref.veCilindrada;
        $scope.veProceden = ref.veProceden;
        $scope.vePlaca = ref.vePlaca;
        $scope.showMotonave = false;
        $scope.showAeronave = false;
        $scope.showCuotas = false;
        $scope.showVehiculos = true;
        var vehiculos = {
          'referente' : $scope.datosReferentes,
          'veTipo' : $scope.veTipo,
          'veMarca' : $scope.veMarca,
          'veModelo' : $scope.veModelo,
          'veCilindrada' : $scope.veCilindrada,
          'veProceden' : $scope.veProceden,
          'vePlaca' : $scope.vePlaca,
        };

        $scope.referente = JSON.stringify(vehiculos);
        //console.log($scope.referente);
        break;
    }
  };

  $scope.calculateIncome = function() {
    if ($scope.cuotaMonto!= undefined && $scope.cuotaMonto>0) {
      $scope.get_impuesto = $scope.alicuota * $scope.cuotaMonto;

      $scope.get_impuesto = Math.round($scope.get_impuesto / 100);
      //console.log($scope.cuotaMonto);
      //console.log($scope.alicuota);
      //console.log($scope.get_impuesto);
    } else{
      //swal("Verifique el monto.");
    }
  };

  /*$scope.finalize = function() {
    //swal({
      title: "Seguro?",
      text: "Ya no se podrá editar!",
      type: "warning"
    });
  };*/

  setTimeout(function(){
    window.print();
  },3000);

}//fin function

/**
* We need to bootstrap the app manually to the container by id, since we have
*  more than one app on the same page.
*/
angular.element(document).ready(function() {
  //angular.bootstrap(document.getElementById('name_id_form'),['name_module']);
  angular.bootstrap(document.getElementById('form-edit-mueble'),['mueble']);
});