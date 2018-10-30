<?php

/* {# inline_template_start #}{{ field_user_nombre }} {{ field_user_apellido_paterno }} {{ field_user_apellido_materno }}, {{ roles_target_id }} */
class __TwigTemplate_e9a5ab6cf02bd8b2b810ff917c0ca6edeaa9d530c88442a2d753a8f6c678b59c extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $tags = array();
        $filters = array();
        $functions = array();

        try {
            $this->env->getExtension('sandbox')->checkSecurity(
                array(),
                array(),
                array()
            );
        } catch (Twig_Sandbox_SecurityError $e) {
            $e->setTemplateFile($this->getTemplateName());

            if ($e instanceof Twig_Sandbox_SecurityNotAllowedTagError && isset($tags[$e->getTagName()])) {
                $e->setTemplateLine($tags[$e->getTagName()]);
            } elseif ($e instanceof Twig_Sandbox_SecurityNotAllowedFilterError && isset($filters[$e->getFilterName()])) {
                $e->setTemplateLine($filters[$e->getFilterName()]);
            } elseif ($e instanceof Twig_Sandbox_SecurityNotAllowedFunctionError && isset($functions[$e->getFunctionName()])) {
                $e->setTemplateLine($functions[$e->getFunctionName()]);
            }

            throw $e;
        }

        // line 1
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, (isset($context["field_user_nombre"]) ? $context["field_user_nombre"] : null), "html", null, true));
        echo " ";
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, (isset($context["field_user_apellido_paterno"]) ? $context["field_user_apellido_paterno"] : null), "html", null, true));
        echo " ";
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, (isset($context["field_user_apellido_materno"]) ? $context["field_user_apellido_materno"] : null), "html", null, true));
        echo ", ";
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->escapeFilter($this->env, (isset($context["roles_target_id"]) ? $context["roles_target_id"] : null), "html", null, true));
    }

    public function getTemplateName()
    {
        return "{# inline_template_start #}{{ field_user_nombre }} {{ field_user_apellido_paterno }} {{ field_user_apellido_materno }}, {{ roles_target_id }}";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  43 => 1,);
    }
}
/* {# inline_template_start #}{{ field_user_nombre }} {{ field_user_apellido_paterno }} {{ field_user_apellido_materno }}, {{ roles_target_id }}*/
