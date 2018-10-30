<?php

namespace Drupal\formulario770\Controller;

use Drupal\Core\Controller\ControllerBase;

/**
 * Class InmuebleController.
 *
 * @package Drupal\formulario770\Controller
 */
class InmuebleController extends ControllerBase {

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
    $output['#attached']['library'] = 'formulario770/formulario770';  //module/nameclase_librarie
    // Theme function to attach a template to Asistencia module
    $output['#theme'] = 'formulario770'; //name-array_template
    return $output;
  }

  public function content_edit() {
    // Attach some '*.js' to Asistencia module
    $output['#attached']['library'] = 'formulario770/formularioEdit770';  //module/nameclase_librarie
    // Theme function to attach a template to Asistencia module
    $output['#theme'] = 'formularioEdit770'; //name-array_template
    return $output;
  }

  public function content_print() {
    // Attach some '*.js' to Asistencia module
    $output['#attached']['library'] = 'formulario770/formularioPrint770';  //module/nameclase_librarie
    // Theme function to attach a template to Asistencia module
    $output['#theme'] = 'formularioPrint770'; //name-array_template
    return $output;
  }

  public function content_reporte() {
    // Attach some '*.js' to Asistencia module
    $output['#attached']['library'] = 'formulario770/formularioReporte770';  //module/nameclase_librarie
    // Theme function to attach a template to Asistencia module
    $output['#theme'] = 'formularioReporte770'; //name-array_template
    return $output;
  }
}
