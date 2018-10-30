<?php

namespace Drupal\formulario750\Controller;

use Drupal\Core\Controller\ControllerBase;

/**
 * Class MuebleController.
 *
 * @package Drupal\formulario750\Controller
 */
class MuebleController extends ControllerBase {

  /**
   * Hello.
   *
   * @return string
   *   Return Hello string.
   */
  public function hello($name) {
    return [
      '#type' => 'markup',
      '#markup' => $this->t('Implement method: hello with parameter(s): $name'),
    ];
  }

  public function content() {
    // Attach some '*.js' to Asistencia module
    $output['#attached']['library'] = 'formulario750/formulario750';  //module/nameclase_librarie
    // Theme function to attach a template to Asistencia module
    $output['#theme'] = 'formulario750'; //name-array_template
    return $output;
  }

  public function content_edit() {
    // Attach some '*.js' to Asistencia module
    $output['#attached']['library'] = 'formulario750/formularioEdit750';  //module/nameclase_librarie
    // Theme function to attach a template to Asistencia module
    $output['#theme'] = 'formularioEdit750'; //name-array_template
    return $output;
  }

  public function content_print() {
    // Attach some '*.js' to Asistencia module
    $output['#attached']['library'] = 'formulario750/formularioPrint750';  //module/nameclase_librarie
    // Theme function to attach a template to Asistencia module
    $output['#theme'] = 'formularioPrint750'; //name-array_template
    return $output;
  }

  public function content_reporte() {
    // Attach some '*.js' to Asistencia module
    $output['#attached']['library'] = 'formulario750/formularioReporte750';  //module/nameclase_librarie
    // Theme function to attach a template to Asistencia module
    $output['#theme'] = 'formularioReporte750'; //name-array_template
    return $output;
  }
}
