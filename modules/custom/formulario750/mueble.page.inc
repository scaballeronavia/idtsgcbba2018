<?php

/**
 * @file
 * Contains mueble.page.inc.
 *
 * Page callback for Mueble entities.
 */

use Drupal\Core\Render\Element;

/**
 * Prepares variables for Mueble templates.
 *
 * Default template: mueble.html.twig.
 *
 * @param array $variables
 *   An associative array containing:
 *   - elements: An associative array containing the user information and any
 *   - attributes: HTML attributes for the containing element.
 */
function template_preprocess_mueble(array &$variables) {
  // Fetch Mueble Entity Object.
  $mueble = $variables['elements']['#mueble'];

  // Helpful $content variable for templates.
  foreach (Element::children($variables['elements']) as $key) {
    $variables['content'][$key] = $variables['elements'][$key];
  }
}
