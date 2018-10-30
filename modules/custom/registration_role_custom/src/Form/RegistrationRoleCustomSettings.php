<?php

/**
 * @file
 * Contains \Drupal\registration_role_custom\Form\RegistrationRoleSettings.
 */

namespace Drupal\registration_role_custom\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Form\ConfigFormBase;
use Drupal\user\UserStorageInterface;
use Drupal\user\Entity\User;
use Drupal\Core\Config\ConfigFactory;
use Drupal\Core\Config\Context\ContextInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Contribute form.
 */
class RegistrationRoleCustomSettings extends ConfigFormBase {

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
        $container->get('config.factory')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'registration_role_custom_admin_settings';
  }

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return ['registration_role_custom.setting'];
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $config = $this->config('registration_role_custom.setting');
    $case = $config->get('role_to_select');
    $roles = user_roles(TRUE);
    unset($roles['authenticated']);
    foreach ($roles as $key => $value) {
      $options[$key] = $value->label();
    }
    $form['role_to_select'] = array(
      '#type' => 'checkboxes',
      '#title' => t('Roles to Assign'),
      '#required' => TRUE,
      '#options' => $options,
      '#default_value' => $case,
      '#description' => 'The selected role will be assigned to users who register using the user-registration form. Be sure this role does not have any privileges you fear giving out without reviewing who receives it.',
    );
    return parent::buildForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $saved_role = $form_state->getValue('role_to_select');
    $this->config('registration_role_custom.setting')
        ->set('role_to_select', $saved_role)
        ->save();

    parent::submitForm($form, $form_state);
  }

}

?>