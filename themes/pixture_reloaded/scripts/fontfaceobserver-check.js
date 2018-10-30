// Eliminate FOIT (Flash of Invisible Text) caused by web fonts loading slowly
// using font events with Font Face Observer.
(function ($) {

	"use strict";

	Drupal.behaviors.atFFOI = {
		attach: function (context) {

			$('html').addClass('fa-loading');

			var fontawesome = new FontFaceObserver('FontAwesome', {});
			//santiago
			console.log('santi');
			//CREATE USER (controlar que solo funcione en el id de este formulario: id = edit-account)
			var formid = $('form').attr('id');
			if(formid == 'user-register-form'){
				$('.form-item-field-user-razon-social-0-value').hide();
				$('#edit-field-user-nombre-0-value').prop('required',true);
				$('#edit-field-user-apellido-paterno-0-value').prop('required',true);
				$('#edit-field-user-apellido-materno-0-value').prop('required',true);
				$('input[type=radio][name=field_user_estado]').change(function() {
					//1 = pNatural   ,  2 = pJuridica
					if($(this).val() == 2 ){
						$('#edit-field-user-nombre-0-value').prop('required',false);
						$('#edit-field-user-apellido-paterno-0-value').prop('required',false);
						$('#edit-field-user-apellido-materno-0-value').prop('required',false);

						$('.form-item-field-user-nombre-0-value').hide();
						$('.form-item-field-user-apellido-paterno-0-value').hide();
						$('.form-item-field-user-apellido-materno-0-value').hide();

						$('#edit-field-user-nombre-0-value').val('');
						$('#edit-field-user-apellido-paterno-0-value').val('');
						$('#edit-field-user-apellido-materno-0-value').val('');

						$('.form-item-field-user-razon-social-0-value').show('3000');
						$('#edit-field-user-razon-social-0-value').prop('required',true); //input
					}
					else{
						$('#edit-field-user-razon-social-0-value').prop('required',false); //input required
						$('.form-item-field-user-razon-social-0-value').hide();
						$('#edit-field-user-razon-social-0-value').val('');

						$('.form-item-field-user-nombre-0-value').show('3000');
						$('.form-item-field-user-apellido-paterno-0-value').show('3000');
						$('.form-item-field-user-apellido-materno-0-value').show('3000');

						$('#edit-field-user-nombre-0-value').prop('required',true);
						$('#edit-field-user-apellido-paterno-0-value').prop('required',true);
						$('#edit-field-user-apellido-materno-0-value').prop('required',true);
					}
				});
			}//fin if
			//---fin CREATE USER

			//mis-reportes
			/*var pathname = window.location.pathname;
			console.log(pathname);
			if(pathname == '/mis-reportes'){
				$( "div.demo-container" ).html();

			}*/
			//-- fin santiago

			// Because we are checking an icon font we need a unicode code point to check,
			// SEE https://github.com/bramstein/fontfaceobserver/issues/34
			fontawesome.check('\uf22d').then(function () {
				$('html').removeClass('fa-loading').addClass('fa-loaded');
			}, function() {
				$('html').removeClass('fa-loading').addClass('fa-unavailable');
			});

		}
	};
}(jQuery));
