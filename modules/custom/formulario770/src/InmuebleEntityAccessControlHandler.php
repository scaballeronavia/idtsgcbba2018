<?php

namespace Drupal\formulario770;

use Drupal\Core\Entity\EntityAccessControlHandler;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Session\AccountInterface;
use Drupal\Core\Access\AccessResult;

/**
 * Access controller for the Inmueble entity entity.
 *
 * @see \Drupal\formulario770\Entity\InmuebleEntity.
 */
class InmuebleEntityAccessControlHandler extends EntityAccessControlHandler {

  /**
   * {@inheritdoc}
   */
  protected function checkAccess(EntityInterface $entity, $operation, AccountInterface $account) {
    /** @var \Drupal\formulario770\Entity\InmuebleEntityInterface $entity */
    switch ($operation) {
      case 'view':
        if (!$entity->isPublished()) {
          return AccessResult::allowedIfHasPermission($account, 'view unpublished inmueble entity entities');
        }
        return AccessResult::allowedIfHasPermission($account, 'view published inmueble entity entities');

      case 'update':
        return AccessResult::allowedIfHasPermission($account, 'edit inmueble entity entities');

      case 'delete':
        return AccessResult::allowedIfHasPermission($account, 'delete inmueble entity entities');
    }

    // Unknown operation, no opinion.
    return AccessResult::neutral();
  }

  /**
   * {@inheritdoc}
   */
  protected function checkCreateAccess(AccountInterface $account, array $context, $entity_bundle = NULL) {
    return AccessResult::allowedIfHasPermission($account, 'add inmueble entity entities');
  }

}
