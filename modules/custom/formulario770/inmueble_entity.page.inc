<?php

/**
 * @file
 * Contains inmueble_entity.page.inc.
 *
 * Page callback for Inmueble entity entities.
 */

use Drupal\Core\Render\Element;
use Drupal\Core\Link;
use Drupal\Core\Url;

/**
 * Prepares variables for Inmueble entity templates.
 *
 * Default template: inmueble_entity.html.twig.
 *
 * @param array $variables
 *   An associative array containing:
 *   - elements: An associative array containing the user information and any
 *   - attributes: HTML attributes for the containing element.
 */
function template_preprocess_inmueble_entity(array &$variables) {
  // Fetch InmuebleEntity Entity Object.
  $inmueble_entity = $variables['elements']['#inmueble_entity'];

  // Helpful $content variable for templates.
  foreach (Element::children($variables['elements']) as $key) {
    $variables['content'][$key] = $variables['elements'][$key];
  }
}
