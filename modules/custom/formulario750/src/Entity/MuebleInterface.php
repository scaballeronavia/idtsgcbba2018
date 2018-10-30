<?php

namespace Drupal\formulario750\Entity;

use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\Core\Entity\EntityChangedInterface;
use Drupal\user\EntityOwnerInterface;

/**
 * Provides an interface for defining Mueble entities.
 *
 * @ingroup formulario750
 */
interface MuebleInterface extends  ContentEntityInterface, EntityChangedInterface, EntityOwnerInterface {

  // Add get/set methods for your configuration properties here.

  /**
   * Gets the Mueble name.
   *
   * @return string
   *   Name of the Mueble.
   */
  public function getName();

  /**
   * Sets the Mueble name.
   *
   * @param string $name
   *   The Mueble name.
   *
   * @return \Drupal\formulario750\Entity\MuebleInterface
   *   The called Mueble entity.
   */
  public function setName($name);

  /**
   * Gets the Mueble creation timestamp.
   *
   * @return int
   *   Creation timestamp of the Mueble.
   */
  public function getCreatedTime();

  /**
   * Sets the Mueble creation timestamp.
   *
   * @param int $timestamp
   *   The Mueble creation timestamp.
   *
   * @return \Drupal\formulario750\Entity\MuebleInterface
   *   The called Mueble entity.
   */
  public function setCreatedTime($timestamp);

  /**
   * Returns the Mueble published status indicator.
   *
   * Unpublished Mueble are only visible to restricted users.
   *
   * @return bool
   *   TRUE if the Mueble is published.
   */
  public function isPublished();

  /**
   * Sets the published status of a Mueble.
   *
   * @param bool $published
   *   TRUE to set this Mueble to published, FALSE to set it to unpublished.
   *
   * @return \Drupal\formulario750\Entity\MuebleInterface
   *   The called Mueble entity.
   */
  public function setPublished($published);

}
