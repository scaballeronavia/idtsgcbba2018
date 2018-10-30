<?php

namespace Drupal\formulario750\Entity;

use Drupal\views\EntityViewsData;

/**
 * Provides Views data for Mueble entities.
 */
class MuebleViewsData extends EntityViewsData {

  /**
   * {@inheritdoc}
   */
  public function getViewsData() {
    $data = parent::getViewsData();

    // Additional information for Views integration, such as table joins, can be
    // put here.

    return $data;
  }

}
