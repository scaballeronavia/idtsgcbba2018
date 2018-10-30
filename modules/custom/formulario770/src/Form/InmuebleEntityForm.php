<?php

namespace Drupal\formulario770\Form;

use Drupal\Core\Entity\ContentEntityForm;
use Drupal\Core\Form\FormStateInterface;

/**
 * Form controller for Inmueble entity edit forms.
 *
 * @ingroup formulario770
 */
class InmuebleEntityForm extends ContentEntityForm {

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    /* @var $entity \Drupal\formulario770\Entity\InmuebleEntity */
    $form = parent::buildForm($form, $form_state);
    $entity = $this->entity;

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function save(array $form, FormStateInterface $form_state) {
    $entity = $this->entity;
    $status = parent::save($form, $form_state);

    switch ($status) {
      case SAVED_NEW:
        drupal_set_message($this->t('Created the %label Inmueble entity.', [
          '%label' => $entity->label(),
        ]));
        break;

      default:
        drupal_set_message($this->t('Saved the %label Inmueble entity.', [
          '%label' => $entity->label(),
        ]));
    }
    $form_state->setRedirect('entity.inmueble_entity.canonical', ['inmueble_entity' => $entity->id()]);
  }

}
