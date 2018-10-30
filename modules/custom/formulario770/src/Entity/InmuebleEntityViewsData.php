<?php

namespace Drupal\formulario770\Entity;

use Drupal\views\EntityViewsData;
use Drupal\views\EntityViewsDataInterface;

/**
 * Provides Views data for Inmueble entity entities.
 */
class InmuebleEntityViewsData extends EntityViewsData implements EntityViewsDataInterface {

  /**
   * {@inheritdoc}
   */
  public function getViewsData() {
    $data = parent::getViewsData();

    $data['inmueble_entity']['table']['base'] = array(
      'field' => 'id',
      'title' => $this->t('Inmueble entity'),
      'help' => $this->t('The Inmueble entity ID.'),
    );

    return $data;
  }

}
