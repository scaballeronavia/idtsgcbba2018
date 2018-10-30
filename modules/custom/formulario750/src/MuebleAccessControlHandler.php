<?php

namespace Drupal\formulario750;

use Drupal\Core\Entity\EntityAccessControlHandler;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Session\AccountInterface;
use Drupal\Core\Access\AccessResult;

/**
 * Access controller for the Mueble entity.
 *
 * @see \Drupal\formulario750\Entity\Mueble.
 */
class MuebleAccessControlHandler extends EntityAccessControlHandler {

  /**
   * {@inheritdoc}
   */
  protected function checkAccess(EntityInterface $entity, $operation, AccountInterface $account) {
    /** @var \Drupal\formulario750\Entity\MuebleInterface $entity */
    switch ($operation) {
      case 'view':
        if (!$entity->isPublished()) {
          return AccessResult::allowedIfHasPermission($account, 'view unpublished mueble entities');
        }
        return AccessResult::allowedIfHasPermission($account, 'view published mueble entities');

      case 'update':
        return AccessResult::allowedIfHasPermission($account, 'edit mueble entities');

      case 'delete':
        return AccessResult::allowedIfHasPermission($account, 'delete mueble entities');
    }

    // Unknown operation, no opinion.
    return AccessResult::neutral();
  }

  /**
   * {@inheritdoc}
   */
  protected function checkCreateAccess(AccountInterface $account, array $context, $entity_bundle = NULL) {
    return AccessResult::allowedIfHasPermission($account, 'add mueble entities');
  }

}
