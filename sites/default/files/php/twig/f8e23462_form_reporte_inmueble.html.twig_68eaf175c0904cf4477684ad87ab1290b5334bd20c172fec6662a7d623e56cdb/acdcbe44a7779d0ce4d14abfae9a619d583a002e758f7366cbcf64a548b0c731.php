<?php

/* modules/custom/formulario770/templates/form_reporte_inmueble.html.twig */
class __TwigTemplate_202d78ba52be524e203d3f2360a91d6f85cb5c1e6ce5c3c40c1f8a376250b874 extends Twig_Template
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
        echo "<script src=\"https://rawgithub.com/eligrey/FileSaver.js/master/FileSaver.js\" type=\"text/javascript\"></script><!--export report in pdf-->

<div id=\"form-reporte-inmueble\">
  <form ng-controller=\"inmuebleReporteController\">
    <div style=\"overflow-x:auto;\">
      <!--<label for=\"lista-inmuebles\">Lista Inmuebles</label>-->

      <div>
        <div style=\"width: 25%; float: left; padding: 10px;\">
          <label>Buscar: <input ng-model=\"search\"></label>
        </div>
        <div style=\"width: 25%; float: left; padding: 10px;\">
          <label>
            Desde <input type=\"date\" ng-model=\"desde\">
          </label>
        </div>
        <div style=\"width: 25%; float: left; padding: 10px;\">
          <label>
            hasta <input type=\"date\" ng-model=\"hasta\">
          </label>
        </div>
        <div style=\"width: 25%; float: left; padding: 10px;\">
          <button type=\"button\" ng-click=\"buscarPorFecha(desde, hasta)\">Buscar</button>
        </div>
      </div>
      <button ng-click=\"exportData()\">Exportar</button>
      <div id=\"exportable\">
        <br><p>#inmuebles: ";
        // line 28
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->renderVar("{{num_inmuebles}}"));
        echo "</p>
        <table style=\"width:100%\" class=\"table-reporte\">
          <thead>
            <tr>
              <th>#Orden</th>
              <th>Contribuyente</th>
              <th><a href=\"#\" ng-click=\"sortType = 'cedentes_name' ; sortReverse = !sortReverse\">Cedentes</th>
              <th>CI</th>
              <!--<th>Domicilio</th>-->
              <!--<th>Porcentaje</th>-->
              <th>Cesionarios</th>
              <!--<th>Domicilio</th>-->
              <!--<th>Porcentaje</th>-->
              <th>Impuesto Bs</th>
              <th>Fecha a Pagar</th>
              <th>Fecha del Deposito</th>
              <th>Pago del Deposito</th>
              <th>Multa</th>
              <th>Dias c/Mora</th>
              <th>#Depositos al Banco</th>
              <th>Estado</th>
              <th>Editado</th>
              <th>Gestionar</th>
            </tr>
          </thead>
          <tbody>
            <!--<tr ng-repeat=\"i in inmuebles | filter:filterRange | filter:search | orderBy:sortType:sortReverse\">-->
            <tr ng-repeat=\"i in inmuebles | filter:search | orderBy:sortType:sortReverse\">
              <td>";
        // line 56
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->renderVar("{{i.nro_orden}}"));
        echo "</td>
              <!--<td>";
        // line 57
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->renderVar("{{i.id}}"));
        echo "</td>-->
              <td>";
        // line 58
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->renderVar("{{i.name}}"));
        echo "</td>
              <td>";
        // line 59
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->renderVar("{{i.cedentes_name}}"));
        echo "</td>
              <td>";
        // line 60
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->renderVar("{{i.ci}}"));
        echo "</td>
              <!--<td>";
        // line 61
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->renderVar("{{i.cedentes_domicilio}}"));
        echo "</td>-->
              <!--<td>";
        // line 62
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->renderVar("{{i.cedentes_porcentaje}}"));
        echo "</td>-->
              <td>";
        // line 63
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->renderVar("{{i.cesionarios_name}}"));
        echo "</td>
              <!--<td>";
        // line 64
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->renderVar("{{i.cesionarios_domicilio}}"));
        echo "</td>-->
              <!--<td>";
        // line 65
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->renderVar("{{i.cesionarios_porcentaje}}"));
        echo "</td>-->
              <td>";
        // line 66
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->renderVar("{{i.impuesto}}"));
        echo "</td>
              <td>";
        // line 67
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->renderVar("{{i.fecha_pago}}"));
        echo "</td>
              <td>";
        // line 68
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->renderVar("{{i.deposito_fecha}}"));
        echo "<input type=\"hidden\" ng-value=\"";
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->renderVar("{{i.timestamp}}"));
        echo "\"></td>
              <td>";
        // line 69
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->renderVar("{{i.deposito_monto}}"));
        echo "</td>
              <td>";
        // line 70
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->renderVar("{{i.custom_multa}}"));
        echo "</td>
              <td ng-repeat=\"x in arrayFechaPago\" ng-if=\"i.id==x.id\">";
        // line 71
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->renderVar("{{x.dias}}"));
        echo "</td>
              <td>";
        // line 72
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->renderVar("{{i.num_depositos}}"));
        echo "</td>
              <td>";
        // line 73
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->renderVar("{{i.estado_form}}"));
        echo "</td>
              <td>";
        // line 74
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->renderVar("{{i.user_edit}}"));
        echo "</td>
              <!--<td><a href=\"inmueble/";
        // line 75
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->renderVar("{{i.id}}"));
        echo "/edit\">Editar</a></td>-->
              <td ng-repeat=\"x in usuario\" ng-if=\"i.estado_form == 'Guardado'\"><a href=\"inmueble/";
        // line 76
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->renderVar("{{i.id}}"));
        echo "/edit\">Editar</a><p ng-if=\"x.roles_target_id == 'Contribuyente'\"><a href=\"inmueble/";
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->renderVar("{{i.id}}"));
        echo "/print\">Imprimir</a></p></td>
              <td  ng-if=\"i.estado_form == 'Finalizado'\"><a href=\"inmueble/";
        // line 77
        echo $this->env->getExtension('sandbox')->ensureToStringAllowed($this->env->getExtension('drupal_core')->renderVar("{{i.id}}"));
        echo "/print\">Imprimir</a></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </form>
</div>";
    }

    public function getTemplateName()
    {
        return "modules/custom/formulario770/templates/form_reporte_inmueble.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  191 => 77,  185 => 76,  181 => 75,  177 => 74,  173 => 73,  169 => 72,  165 => 71,  161 => 70,  157 => 69,  151 => 68,  147 => 67,  143 => 66,  139 => 65,  135 => 64,  131 => 63,  127 => 62,  123 => 61,  119 => 60,  115 => 59,  111 => 58,  107 => 57,  103 => 56,  72 => 28,  43 => 1,);
    }
}
/* <script src="https://rawgithub.com/eligrey/FileSaver.js/master/FileSaver.js" type="text/javascript"></script><!--export report in pdf-->*/
/* */
/* <div id="form-reporte-inmueble">*/
/*   <form ng-controller="inmuebleReporteController">*/
/*     <div style="overflow-x:auto;">*/
/*       <!--<label for="lista-inmuebles">Lista Inmuebles</label>-->*/
/* */
/*       <div>*/
/*         <div style="width: 25%; float: left; padding: 10px;">*/
/*           <label>Buscar: <input ng-model="search"></label>*/
/*         </div>*/
/*         <div style="width: 25%; float: left; padding: 10px;">*/
/*           <label>*/
/*             Desde <input type="date" ng-model="desde">*/
/*           </label>*/
/*         </div>*/
/*         <div style="width: 25%; float: left; padding: 10px;">*/
/*           <label>*/
/*             hasta <input type="date" ng-model="hasta">*/
/*           </label>*/
/*         </div>*/
/*         <div style="width: 25%; float: left; padding: 10px;">*/
/*           <button type="button" ng-click="buscarPorFecha(desde, hasta)">Buscar</button>*/
/*         </div>*/
/*       </div>*/
/*       <button ng-click="exportData()">Exportar</button>*/
/*       <div id="exportable">*/
/*         <br><p>#inmuebles: {{'{{num_inmuebles}}'}}</p>*/
/*         <table style="width:100%" class="table-reporte">*/
/*           <thead>*/
/*             <tr>*/
/*               <th>#Orden</th>*/
/*               <th>Contribuyente</th>*/
/*               <th><a href="#" ng-click="sortType = 'cedentes_name' ; sortReverse = !sortReverse">Cedentes</th>*/
/*               <th>CI</th>*/
/*               <!--<th>Domicilio</th>-->*/
/*               <!--<th>Porcentaje</th>-->*/
/*               <th>Cesionarios</th>*/
/*               <!--<th>Domicilio</th>-->*/
/*               <!--<th>Porcentaje</th>-->*/
/*               <th>Impuesto Bs</th>*/
/*               <th>Fecha a Pagar</th>*/
/*               <th>Fecha del Deposito</th>*/
/*               <th>Pago del Deposito</th>*/
/*               <th>Multa</th>*/
/*               <th>Dias c/Mora</th>*/
/*               <th>#Depositos al Banco</th>*/
/*               <th>Estado</th>*/
/*               <th>Editado</th>*/
/*               <th>Gestionar</th>*/
/*             </tr>*/
/*           </thead>*/
/*           <tbody>*/
/*             <!--<tr ng-repeat="i in inmuebles | filter:filterRange | filter:search | orderBy:sortType:sortReverse">-->*/
/*             <tr ng-repeat="i in inmuebles | filter:search | orderBy:sortType:sortReverse">*/
/*               <td>{{'{{i.nro_orden}}'}}</td>*/
/*               <!--<td>{{'{{i.id}}'}}</td>-->*/
/*               <td>{{'{{i.name}}'}}</td>*/
/*               <td>{{'{{i.cedentes_name}}'}}</td>*/
/*               <td>{{'{{i.ci}}'}}</td>*/
/*               <!--<td>{{'{{i.cedentes_domicilio}}'}}</td>-->*/
/*               <!--<td>{{'{{i.cedentes_porcentaje}}'}}</td>-->*/
/*               <td>{{'{{i.cesionarios_name}}'}}</td>*/
/*               <!--<td>{{'{{i.cesionarios_domicilio}}'}}</td>-->*/
/*               <!--<td>{{'{{i.cesionarios_porcentaje}}'}}</td>-->*/
/*               <td>{{'{{i.impuesto}}'}}</td>*/
/*               <td>{{'{{i.fecha_pago}}'}}</td>*/
/*               <td>{{'{{i.deposito_fecha}}'}}<input type="hidden" ng-value="{{'{{i.timestamp}}'}}"></td>*/
/*               <td>{{'{{i.deposito_monto}}'}}</td>*/
/*               <td>{{'{{i.custom_multa}}'}}</td>*/
/*               <td ng-repeat="x in arrayFechaPago" ng-if="i.id==x.id">{{'{{x.dias}}'}}</td>*/
/*               <td>{{'{{i.num_depositos}}'}}</td>*/
/*               <td>{{'{{i.estado_form}}'}}</td>*/
/*               <td>{{'{{i.user_edit}}'}}</td>*/
/*               <!--<td><a href="inmueble/{{'{{i.id}}'}}/edit">Editar</a></td>-->*/
/*               <td ng-repeat="x in usuario" ng-if="i.estado_form == 'Guardado'"><a href="inmueble/{{'{{i.id}}'}}/edit">Editar</a><p ng-if="x.roles_target_id == 'Contribuyente'"><a href="inmueble/{{'{{i.id}}'}}/print">Imprimir</a></p></td>*/
/*               <td  ng-if="i.estado_form == 'Finalizado'"><a href="inmueble/{{'{{i.id}}'}}/print">Imprimir</a></td>*/
/*             </tr>*/
/*           </tbody>*/
/*         </table>*/
/*       </div>*/
/*     </div>*/
/*   </form>*/
/* </div>*/
