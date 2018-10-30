<?php

namespace Drupal\formulario750\Entity;

use Drupal\Core\Entity\EntityStorageInterface;
use Drupal\Core\Field\BaseFieldDefinition;
use Drupal\Core\Entity\ContentEntityBase;
use Drupal\Core\Entity\EntityChangedTrait;
use Drupal\Core\Entity\EntityTypeInterface;
use Drupal\user\UserInterface;

/**
 * Defines the Mueble entity.
 *
 * @ingroup formulario750
 *
 * @ContentEntityType(
 *   id = "mueble",
 *   label = @Translation("Mueble"),
 *   handlers = {
 *     "view_builder" = "Drupal\Core\Entity\EntityViewBuilder",
 *     "list_builder" = "Drupal\formulario750\MuebleListBuilder",
 *     "views_data" = "Drupal\formulario750\Entity\MuebleViewsData",
 *
 *     "form" = {
 *       "default" = "Drupal\formulario750\Form\MuebleForm",
 *       "add" = "Drupal\formulario750\Form\MuebleForm",
 *       "edit" = "Drupal\formulario750\Form\MuebleForm",
 *       "delete" = "Drupal\formulario750\Form\MuebleDeleteForm",
 *     },
 *     "access" = "Drupal\formulario750\MuebleAccessControlHandler",
 *     "route_provider" = {
 *       "html" = "Drupal\formulario750\MuebleHtmlRouteProvider",
 *     },
 *   },
 *   base_table = "mueble",
 *   admin_permission = "administer mueble entities",
 *   entity_keys = {
 *     "id" = "id",
 *     "label" = "name",
 *     "uuid" = "uuid",
 *     "uid" = "user_id",
 *     "langcode" = "langcode",
 *     "status" = "status",
 *   },
 *   links = {
 *     "canonical" = "/admin/structure/mueble/{mueble}",
 *     "add-form" = "/admin/structure/mueble/add",
 *     "edit-form" = "/admin/structure/mueble/{mueble}/edit",
 *     "delete-form" = "/admin/structure/mueble/{mueble}/delete",
 *     "collection" = "/admin/structure/mueble",
 *   },
 *   field_ui_base_route = "mueble.settings"
 * )
 */
class Mueble extends ContentEntityBase implements MuebleInterface {

  use EntityChangedTrait;

  /**
   * {@inheritdoc}
   */
  public static function preCreate(EntityStorageInterface $storage_controller, array &$values) {
    parent::preCreate($storage_controller, $values);
    $values += array(
      'user_id' => \Drupal::currentUser()->id(),
    );
  }

  /**
   * {@inheritdoc}
   */
  public function getName() {
    return $this->get('name')->value;
  }

  /**
   * {@inheritdoc}
   */
  public function setName($name) {
    $this->set('name', $name);
    return $this;
  }

  /**
   * {@inheritdoc}
   */
  public function getCreatedTime() {
    return $this->get('created')->value;
  }

  /**
   * {@inheritdoc}
   */
  public function setCreatedTime($timestamp) {
    $this->set('created', $timestamp);
    return $this;
  }

  /**
   * {@inheritdoc}
   */
  public function getOwner() {
    return $this->get('user_id')->entity;
  }

  /**
   * {@inheritdoc}
   */
  public function getOwnerId() {
    return $this->get('user_id')->target_id;
  }

  /**
   * {@inheritdoc}
   */
  public function setOwnerId($uid) {
    $this->set('user_id', $uid);
    return $this;
  }

  /**
   * {@inheritdoc}
   */
  public function setOwner(UserInterface $account) {
    $this->set('user_id', $account->id());
    return $this;
  }

  /**
   * {@inheritdoc}
   */
  public function isPublished() {
    return (bool) $this->getEntityKey('status');
  }

  /**
   * {@inheritdoc}
   */
  public function setPublished($published) {
    $this->set('status', $published ? TRUE : FALSE);
    return $this;
  }

  /**
   * {@inheritdoc}
   */
  public static function baseFieldDefinitions(EntityTypeInterface $entity_type) {
    $fields = parent::baseFieldDefinitions($entity_type);

    $fields['user_id'] = BaseFieldDefinition::create('entity_reference')
      ->setLabel(t('Authored by'))
      ->setDescription(t('The user ID of author of the Mueble entity.'))
      ->setRevisionable(TRUE)
      ->setSetting('target_type', 'user')
      ->setSetting('handler', 'default')
      ->setTranslatable(TRUE)
      ->setDisplayOptions('view', array(
        'label' => 'hidden',
        'type' => 'author',
        'weight' => 0,
      ))
      ->setDisplayOptions('form', array(
        'type' => 'entity_reference_autocomplete',
        'weight' => 5,
        'settings' => array(
          'match_operator' => 'CONTAINS',
          'size' => '60',
          'autocomplete_type' => 'tags',
          'placeholder' => '',
        ),
      ))
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE);

    $fields['name'] = BaseFieldDefinition::create('string')
      ->setLabel(t('Name'))
      ->setDescription(t('The name of the Mueble entity.'))
      ->setSettings(array(
        'max_length' => 50,
        'text_processing' => 0,
      ))
      ->setDefaultValue('')
      ->setDisplayOptions('view', array(
        'label' => 'above',
        'type' => 'string',
        'weight' => -4,
      ))
      ->setDisplayOptions('form', array(
        'type' => 'string_textfield',
        'weight' => -4,
      ))
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE);

    $fields['domicilio'] = BaseFieldDefinition::create('string')
      ->setLabel(t('Domicilio'))
      ->setDescription(t('The Domicilio of the Mueble entity.'))
      ->setSettings(array(
        'max_length' => 70,
        'text_processing' => 0,
      ))
      ->setDefaultValue('')
      ->setDisplayOptions('view', array(
        'label' => 'above',
        'type' => 'string',
        'weight' => -4,
      ))
      ->setDisplayOptions('form', array(
        'type' => 'string_textfield',
        'weight' => -4,
      ))
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE);

    $fields['categoria'] = BaseFieldDefinition::create('string')
      ->setLabel(t('Categoria'))
      ->setDescription(t('The Categoria of the Mueble entity.'))
      ->setSettings(array(
        'max_length' => 50,
        'text_processing' => 0,
      ))
      ->setDefaultValue('')
      ->setDisplayOptions('view', array(
        'label' => 'above',
        'type' => 'string',
        'weight' => -4,
      ))
      ->setDisplayOptions('form', array(
        'type' => 'string_textfield',
        'weight' => -4,
      ))
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE);

    $fields['ci'] = BaseFieldDefinition::create('integer')
      ->setLabel(t('Cedula de Entidad'))
      ->setDescription(t('CI'))
      ->setDisplayOptions('view', array(
          'label' => 'above',
          'type' => 'integer',
          'weight' => 0,
      ))
      ->setDisplayOptions('form', array(
          'type' => 'number',
          'weight' => 0,
      ))
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE);

    $fields['emitido'] = BaseFieldDefinition::create('string')
      ->setLabel(t('Emitido'))
      ->setDescription(t('The Emitido of the Mueble entity.'))
      ->setSettings(array(
        'max_length' => 50,
        'text_processing' => 0,
      ))
      ->setDefaultValue('')
      ->setDisplayOptions('view', array(
        'label' => 'above',
        'type' => 'string',
        'weight' => -4,
      ))
      ->setDisplayOptions('form', array(
        'type' => 'string_textfield',
        'weight' => -4,
      ))
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE);

    $fields['fecha_periodo'] = BaseFieldDefinition::create('string')
      ->setLabel(t('Fecha del Periodo'))
      ->setDescription(t('The Fecha Periodo of the Mueble entity.'))
      ->setSettings(array(
        'max_length' => 50,
        'text_processing' => 0,
      ))
      ->setDefaultValue('')
      ->setDisplayOptions('view', array(
        'label' => 'above',
        'type' => 'string',
        'weight' => -4,
      ))
      ->setDisplayOptions('form', array(
        'type' => 'string_textfield',
        'weight' => -4,
      ))
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE);

    $fields['documento'] = BaseFieldDefinition::create('string')
      ->setLabel(t('Documento'))
      ->setDescription(t('The Document of the Mueble entity.'))
      ->setSettings(array(
        'max_length' => 50,
        'text_processing' => 0,
      ))
      ->setDefaultValue('')
      ->setDisplayOptions('view', array(
        'label' => 'above',
        'type' => 'string',
        'weight' => -4,
      ))
      ->setDisplayOptions('form', array(
        'type' => 'string_textfield',
        'weight' => -4,
      ))
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE);

    $fields['nro_res_admin'] = BaseFieldDefinition::create('string')
      ->setLabel(t('Nro. de resolucion administrativa'))
      ->setDescription(t('Nro. de resolucion administrativa of the Mueble entity.'))
      ->setSettings(array(
        'max_length' => 120,
        'text_processing' => 0,
      ))
      ->setDefaultValue('')
      ->setDisplayOptions('view', array(
        'label' => 'above',
        'type' => 'string',
        'weight' => -4,
      ))
      ->setDisplayOptions('form', array(
        'type' => 'string_textfield',
        'weight' => -4,
      ))
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE);

    $fields['formulario'] = BaseFieldDefinition::create('string')
      ->setLabel(t('Formulario'))
      ->setDescription(t('Formulario of the Mueble entity.'))
      ->setSettings(array(
        'max_length' => 120,
        'text_processing' => 0,
      ))
      ->setDefaultValue('')
      ->setDisplayOptions('view', array(
        'label' => 'above',
        'type' => 'string',
        'weight' => -4,
      ))
      ->setDisplayOptions('form', array(
        'type' => 'string_textfield',
        'weight' => -4,
      ))
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE);

    $fields['nro_orden'] = BaseFieldDefinition::create('string')
      ->setLabel(t('Nro de orden'))
      ->setDescription(t('Nro de orden of the Mueble entity.'))
      ->setSettings(array(
        'max_length' => 120,
        'text_processing' => 0,
      ))
      ->setDefaultValue('')
      ->setDisplayOptions('view', array(
        'label' => 'above',
        'type' => 'string',
        'weight' => -4,
      ))
      ->setDisplayOptions('form', array(
        'type' => 'string_textfield',
        'weight' => -4,
      ))
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE);

    $fields['grado_parentesco'] = BaseFieldDefinition::create('string')
      ->setLabel(t('Grado de Parentesco'))
      ->setDescription(t('The Grade of Parent of the Mueble entity.'))
      ->setSettings(array(
        'max_length' => 50,
        'text_processing' => 0,
      ))
      ->setDefaultValue('')
      ->setDisplayOptions('view', array(
        'label' => 'above',
        'type' => 'string',
        'weight' => -4,
      ))
      ->setDisplayOptions('form', array(
        'type' => 'string_textfield',
        'weight' => -4,
      ))
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE);

    $fields['cedentes_name'] = BaseFieldDefinition::create('string_long')
      ->setLabel(t('Cedentes Name'))
      ->setDescription(t('The Cedentes Name of the entity'))
      ->setTranslatable(TRUE)
      ->setSettings(array(
          'default_value' => '',
      ))
      ->setDisplayOptions('view', array(
          'label' => 'above',
          'type' => 'string',
          'weight' => 4,
      ))
      ->setDisplayOptions('form', array(
          'type' => 'string',
          'weight' => 4,
      ))
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE);

    $fields['cedentes_domicilio'] = BaseFieldDefinition::create('string_long')
      ->setLabel(t('Cedentes Domicilio'))
      ->setDescription(t('The Cedentes Domicilio of the entity'))
      ->setTranslatable(TRUE)
      ->setSettings(array(
          'default_value' => '',
      ))
      ->setDisplayOptions('view', array(
          'label' => 'above',
          'type' => 'string',
          'weight' => 4,
      ))
      ->setDisplayOptions('form', array(
          'type' => 'string',
          'weight' => 4,
      ))
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE);

    $fields['cedentes_porcentaje'] = BaseFieldDefinition::create('string_long')
      ->setLabel(t('Cedentes Porcentaje'))
      ->setDescription(t('The Cedentes porcentaje of the entity'))
      ->setTranslatable(TRUE)
      ->setSettings(array(
          'default_value' => '',
      ))
      ->setDisplayOptions('view', array(
          'label' => 'above',
          'type' => 'string',
          'weight' => 4,
      ))
      ->setDisplayOptions('form', array(
          'type' => 'string',
          'weight' => 4,
      ))
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE);

    $fields['cesionarios_name'] = BaseFieldDefinition::create('string_long')
      ->setLabel(t('Cesionarios Name'))
      ->setDescription(t('The Cesionarios Name of the entity'))
      ->setTranslatable(TRUE)
      ->setSettings(array(
          'default_value' => '',
      ))
      ->setDisplayOptions('view', array(
          'label' => 'above',
          'type' => 'string',
          'weight' => 4,
      ))
      ->setDisplayOptions('form', array(
          'type' => 'string',
          'weight' => 4,
      ))
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE);

    $fields['cesionarios_domicilio'] = BaseFieldDefinition::create('string_long')
      ->setLabel(t('Cesionarios Domicilio'))
      ->setDescription(t('The Cesionarios Domicilio of the entity'))
      ->setTranslatable(TRUE)
      ->setSettings(array(
          'default_value' => '',
      ))
      ->setDisplayOptions('view', array(
          'label' => 'above',
          'type' => 'string',
          'weight' => 4,
      ))
      ->setDisplayOptions('form', array(
          'type' => 'string',
          'weight' => 4,
      ))
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE);

    $fields['cesionarios_porcentaje'] = BaseFieldDefinition::create('string_long')
      ->setLabel(t('Cesionarios Porcentaje'))
      ->setDescription(t('The Cesionarios porcentaje of the entity'))
      ->setTranslatable(TRUE)
      ->setSettings(array(
          'default_value' => '',
      ))
      ->setDisplayOptions('view', array(
          'label' => 'above',
          'type' => 'string',
          'weight' => 4,
      ))
      ->setDisplayOptions('form', array(
          'type' => 'string',
          'weight' => 4,
      ))
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE);

    $fields['datos_referentes'] = BaseFieldDefinition::create('string_long')
      ->setLabel(t('Datos Referentes'))
      ->setDescription(t('The Datos Referentes of the Mueble entity.'))
      ->setTranslatable(TRUE)
      ->setSettings(array(
        'default_value' => '',
      ))
      ->setDisplayOptions('view', array(
        'label' => 'above',
        'type' => 'string',
        'weight' => 4,
      ))
      ->setDisplayOptions('form', array(
        'type' => 'string',
        'weight' => 4,
      ))
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE);

    $fields['departamento'] = BaseFieldDefinition::create('string')
      ->setLabel(t('Departamento Mueble'))
      ->setDescription(t('The Departamento of the ueble entity.'))
      ->setSettings(array(
        'max_length' => 50,
        'text_processing' => 0,
      ))
      ->setDefaultValue('')
      ->setDisplayOptions('view', array(
        'label' => 'above',
        'type' => 'string',
        'weight' => -4,
      ))
      ->setDisplayOptions('form', array(
        'type' => 'string_textfield',
        'weight' => -4,
      ))
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE);

    $fields['localidad'] = BaseFieldDefinition::create('string')
      ->setLabel(t('Localidad Mueble'))
      ->setDescription(t('The Localidad of the Mueble entity.'))
      ->setSettings(array(
        'max_length' => 50,
        'text_processing' => 0,
      ))
      ->setDefaultValue('')
      ->setDisplayOptions('view', array(
        'label' => 'above',
        'type' => 'string',
        'weight' => -4,
      ))
      ->setDisplayOptions('form', array(
        'type' => 'string_textfield',
        'weight' => -4,
      ))
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE);

    $fields['code_localidad'] = BaseFieldDefinition::create('integer')
      ->setLabel(t('Codigo Localidad'))
      ->setDescription(t('Codigo Localidad Mueble Entity'))
      ->setDisplayOptions('view', array(
          'label' => 'above',
          'type' => 'integer',
          'weight' => 0,
      ))
      ->setDisplayOptions('form', array(
          'type' => 'number',
          'weight' => 0,
      ))
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE);

    $fields['alcaldia'] = BaseFieldDefinition::create('string')
      ->setLabel(t('Alcaldia Mueble'))
      ->setDescription(t('The Alcaldia of the Mueble entity.'))
      ->setSettings(array(
        'max_length' => 50,
        'text_processing' => 0,
      ))
      ->setDefaultValue('')
      ->setDisplayOptions('view', array(
        'label' => 'above',
        'type' => 'string',
        'weight' => -4,
      ))
      ->setDisplayOptions('form', array(
        'type' => 'string_textfield',
        'weight' => -4,
      ))
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE);

    $fields['deposito_code'] = BaseFieldDefinition::create('string_long')
      ->setLabel(t('Codigo Deposito Mueble'))
      ->setDescription(t('The Codigo Deposito of the Mueble entity.'))
      ->setTranslatable(TRUE)
      ->setSettings(array(
          'default_value' => '',
      ))
      ->setDisplayOptions('view', array(
          'label' => 'above',
          'type' => 'string',
          'weight' => 4,
      ))
      ->setDisplayOptions('form', array(
          'type' => 'string',
          'weight' => 4,
      ))
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE);

    $fields['deposito_monto'] = BaseFieldDefinition::create('string_long')
      ->setLabel(t('Monto Deposito Mueble'))
      ->setDescription(t('El Monto Deposito de la entidad Mueble'))
      ->setTranslatable(TRUE)
      ->setSettings(array(
          'default_value' => '',
      ))
      ->setDisplayOptions('view', array(
          'label' => 'above',
          'type' => 'string',
          'weight' => 4,
      ))
      ->setDisplayOptions('form', array(
          'type' => 'string',
          'weight' => 4,
      ))
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE);

    $fields['deposito_name'] = BaseFieldDefinition::create('string_long')
      ->setLabel(t('Nombre Completo Deposito Mueble'))
      ->setDescription(t('The Full Name of the Mueble entity.'))
      ->setTranslatable(TRUE)
      ->setSettings(array(
          'default_value' => '',
      ))
      ->setDisplayOptions('view', array(
          'label' => 'above',
          'type' => 'string',
          'weight' => 4,
      ))
      ->setDisplayOptions('form', array(
          'type' => 'string',
          'weight' => 4,
      ))
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE);

    $fields['deposito_fecha'] = BaseFieldDefinition::create('string_long')
      ->setLabel(t('Fecha del Deposito Mueble'))
      ->setDescription(t('Fecha del Deposito de la entidad Mueble'))
      ->setTranslatable(TRUE)
      ->setSettings(array(
          'default_value' => '',
      ))
      ->setDisplayOptions('view', array(
          'label' => 'above',
          'type' => 'string',
          'weight' => 4,
      ))
      ->setDisplayOptions('form', array(
          'type' => 'string',
          'weight' => 4,
      ))
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE);

    $fields['fecha_transmicion'] = BaseFieldDefinition::create('timestamp')
      ->setLabel(t('Fecha de Transmicion'))
      ->setDescription(t('Fecha de Transmicion Mueble'))
      ->setDisplayOptions('view', array(
          'label' => 'adobe',
          'type' => 'timestamp',
          'weight' => 2,
      ))
      ->setDisplayOptions('form', array(
          'type' => 'datetime_timestamp',
          'weight' => 2,
      ))
      ->setDisplayConfigurable('form', TRUE);

    $fields['base_imponible'] = BaseFieldDefinition::create('decimal')
        ->setLabel(t('Base Imponible Mueble'))
        ->setDescription(t('El Base Imponible de la entidad Mueble'))
        ->setDisplayOptions('view', array(
            'label' => 'above',
            'type' => 'decimal',
            'weight' => -3,
        ))
        ->setDisplayOptions('form', array(
            'type' => 'number',
            'weight' => -3,
        ))
        ->setDisplayConfigurable('form', TRUE)
        ->setDisplayConfigurable('view', TRUE);

    $fields['base_imponible_update'] = BaseFieldDefinition::create('decimal')
        ->setLabel(t('Base Imponible Update Mueble'))
        ->setDescription(t('El Base Imponible  Actualizada de la entidad Mueble'))
        ->setDisplayOptions('view', array(
            'label' => 'above',
            'type' => 'decimal',
            'weight' => -3,
        ))
        ->setDisplayOptions('form', array(
            'type' => 'number',
            'weight' => -3,
        ))
        ->setDisplayConfigurable('form', TRUE)
        ->setDisplayConfigurable('view', TRUE);

    $fields['alicuota'] = BaseFieldDefinition::create('integer')
      ->setLabel(t('Alicuota Mueble'))
      ->setDescription(t('Alicuota en % de la entidad Mueble'))
      ->setDisplayOptions('view', array(
          'label' => 'above',
          'type' => 'integer',
          'weight' => 0,
      ))
      ->setDisplayOptions('form', array(
          'type' => 'number',
          'weight' => 0,
      ))
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE);

    $fields['description'] = BaseFieldDefinition::create('string_long')
      ->setLabel(t('Description'))
      ->setDescription(t('The description of the entity'))
      ->setTranslatable(TRUE)
      ->setSettings(array(
          'default_value' => '',
      ))
      ->setDisplayOptions('view', array(
          'label' => 'above',
          'type' => 'string',
          'weight' => 4,
      ))
      ->setDisplayOptions('form', array(
          'type' => 'string',
          'weight' => 4,
      ))
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE);

    $fields['impuesto'] = BaseFieldDefinition::create('decimal')
        ->setLabel(t('Impuesto a Pagar'))
        ->setDescription(t('El impuesto a pagar el bien Mueble'))
        ->setDisplayOptions('view', array(
            'label' => 'above',
            'type' => 'decimal',
            'weight' => -3,
        ))
        ->setDisplayOptions('form', array(
            'type' => 'number',
            'weight' => -3,
        ))
        ->setDisplayConfigurable('form', TRUE)
        ->setDisplayConfigurable('view', TRUE);

    $fields['fecha_pago'] = BaseFieldDefinition::create('timestamp')
      ->setLabel(t('Fecha de Pago'))
      ->setDescription(t('Fecha Limite del Pago del Impuesto'))
      ->setDisplayOptions('view', array(
          'label' => 'adobe',
          'type' => 'timestamp',
          'weight' => 2,
      ))
      ->setDisplayOptions('form', array(
          'type' => 'datetime_timestamp',
          'weight' => 2,
      ))
      ->setDisplayConfigurable('form', TRUE);

    $fields['user_edit'] = BaseFieldDefinition::create('string')
      ->setLabel(t('User Current Edit Inmueble'))
      ->setDescription(t('El Usuario que edita of the Inmueble entity.'))
      ->setSettings(array(
        'max_length' => 50,
        'text_processing' => 0,
      ))
      ->setDefaultValue('')
      ->setDisplayOptions('view', array(
        'label' => 'above',
        'type' => 'string',
        'weight' => -4,
      ))
      ->setDisplayOptions('form', array(
        'type' => 'string_textfield',
        'weight' => -4,
      ))
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE);

    $fields['status_form_750'] = BaseFieldDefinition::create('string')
      ->setLabel(t('Estado Form 750'))
      ->setDescription(t('The Estado Form 750 of the Mueble entity.'))
      ->setSettings(array(
        'max_length' => 50,
        'text_processing' => 0,
      ))
      ->setDefaultValue('')
      ->setDisplayOptions('view', array(
        'label' => 'above',
        'type' => 'string',
        'weight' => -4,
      ))
      ->setDisplayOptions('form', array(
        'type' => 'string_textfield',
        'weight' => -4,
      ))
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE);

    //working santi
    $fields['fecha_a_pagarMulta'] = BaseFieldDefinition::create('timestamp')
      ->setLabel(t('Fecha a Pagar la Multa'))
      ->setDescription(t('Fecha a Pagar la Multa Mueble'))
      ->setDisplayOptions('view', array(
          'label' => 'adobe',
          'type' => 'timestamp',
          'weight' => 2,
      ))
      ->setDisplayOptions('form', array(
          'type' => 'datetime_timestamp',
          'weight' => 2,
      ))
      ->setDisplayConfigurable('form', TRUE);

    $fields['m_impuesto_pago'] = BaseFieldDefinition::create('decimal')
      ->setLabel(t('Impuesto al Pago   para Multa, Mueble'))
      ->setDescription(t('Impuesto al Pago   para Multa, Mueble'))
      ->setDisplayOptions('view', array(
          'label' => 'above',
          'type' => 'decimal',
          'weight' => -3,
      ))
      ->setDisplayOptions('form', array(
          'type' => 'number',
          'weight' => -3,
      ))
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE);

    $fields['m_mantenimiento_valor'] = BaseFieldDefinition::create('decimal')
        ->setLabel(t('Mantenimiento al Valor para Multa, Mueble'))
        ->setDescription(t('Mantenimiento al Valor para Multa, Mueble'))
        ->setDisplayOptions('view', array(
            'label' => 'above',
            'type' => 'decimal',
            'weight' => -3,
        ))
        ->setDisplayOptions('form', array(
            'type' => 'number',
            'weight' => -3,
        ))
        ->setDisplayConfigurable('form', TRUE)
        ->setDisplayConfigurable('view', TRUE);

    $fields['m_tasa_interes'] = BaseFieldDefinition::create('decimal')
        ->setLabel(t('Tasa de Interes  para Multa, Mueble'))
        ->setDescription(t('Tasa de Interes  para Multa, Mueble'))
        ->setDisplayOptions('view', array(
            'label' => 'above',
            'type' => 'decimal',
            'weight' => -3,
        ))
        ->setDisplayOptions('form', array(
            'type' => 'number',
            'weight' => -3,
        ))
        ->setDisplayConfigurable('form', TRUE)
        ->setDisplayConfigurable('view', TRUE);

    $fields['m_multa_incumplimiento'] = BaseFieldDefinition::create('decimal')
      ->setLabel(t('Multa al Incumplimiento, Mueble'))
      ->setDescription(t('Multa al Incumplimiento, Mueble'))
      ->setDisplayOptions('view', array(
          'label' => 'above',
          'type' => 'decimal',
          'weight' => -3,
      ))
      ->setDisplayOptions('form', array(
          'type' => 'number',
          'weight' => -3,
      ))
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE);

    $fields['multa'] = BaseFieldDefinition::create('string')
      ->setLabel(t('Total Multa Mueble'))
      ->setDescription(t('El monto total de la Multa of the Mueble entity.'))
      ->setSettings(array(
        'max_length' => 50,
        'text_processing' => 0,
      ))
      ->setDefaultValue('')
      ->setDisplayOptions('view', array(
        'label' => 'above',
        'type' => 'string',
        'weight' => -4,
      ))
      ->setDisplayOptions('form', array(
        'type' => 'string_textfield',
        'weight' => -4,
      ))
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE);

    $fields['status'] = BaseFieldDefinition::create('boolean')
      ->setLabel(t('Publishing status'))
      ->setDescription(t('A boolean indicating whether the Mueble is published.'))
      ->setDefaultValue(TRUE);

    $fields['created'] = BaseFieldDefinition::create('created')
      ->setLabel(t('Created'))
      ->setDescription(t('The time that the entity was created.'));

    $fields['changed'] = BaseFieldDefinition::create('changed')
      ->setLabel(t('Changed'))
      ->setDescription(t('The time that the entity was last edited.'));

    return $fields;
  }

}
