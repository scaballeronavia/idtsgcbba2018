<?php

namespace Drupal\formulario770\Entity;

use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\Core\Entity\EntityChangedInterface;
use Drupal\user\EntityOwnerInterface;

/**
 * Provides an interface for defining Inmueble entity entities.
 *
 * @ingroup formulario770
 */
interface InmuebleEntityInterface extends ContentEntityInterface, EntityChangedInterface, EntityOwnerInterface {

  // Add get/set methods for your configuration properties here.

  /**
   * Gets the Inmueble entity name.
   *
   * @return string
   *   Name of the Inmueble entity.
   */
  public function getName();

  /**
   * Sets the Inmueble entity name.
   *
   * @param string $name
   *   The Inmueble entity name.
   *
   * @return \Drupal\formulario770\Entity\InmuebleEntityInterface
   *   The called Inmueble entity entity.
   */
  public function setName($name);

  /**
   * Gets the Inmueble entity creation timestamp.
   *
   * @return int
   *   Creation timestamp of the Inmueble entity.
   */
  public function getCreatedTime();

  /**
   * Sets the Inmueble entity creation timestamp.
   *
   * @param int $timestamp
   *   The Inmueble entity creation timestamp.
   *
   * @return \Drupal\formulario770\Entity\InmuebleEntityInterface
   *   The called Inmueble entity entity.
   */
  public function setCreatedTime($timestamp);

  /**
   * Returns the Inmueble entity published status indicator.
   *
   * Unpublished Inmueble entity are only visible to restricted users.
   *
   * @return bool
   *   TRUE if the Inmueble entity is published.
   */
  public function isPublished();

  /**
   * Sets the published status of a Inmueble entity.
   *
   * @param bool $published
   *   TRUE to set this Inmueble entity to published, FALSE to set it to unpublished.
   *
   * @return \Drupal\formulario770\Entity\InmuebleEntityInterface
   *   The called Inmueble entity entity.
   */
  public function setPublished($published);

}
