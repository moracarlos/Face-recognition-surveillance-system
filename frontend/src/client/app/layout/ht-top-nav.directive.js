(function() {
  'use strict';

  angular
    .module('app.layout')
    .directive('htTopNav', htTopNav);

  /* @ngInject */
  function htTopNav() {
    var directive = {
      bindToController: true,
      controller: TopNavController,
      controllerAs: 'vm',
      restrict: 'EA',
      scope: {},
      templateUrl: 'app/layout/ht-top-nav.html'
    };

    TopNavController.$inject = ['$scope', 'config'];

    /* @ngInject */
    function TopNavController($scope, config) {
      var vm = this;
      $scope.isCollapsed = true;
      vm.navline = {
        title: config.appTitle,
        text: 'Sistema de Seguridad con Reconocimiento Facial',
        link: 'http://cicore.ciens.ucv.ve/laboratorios-de-investigacion/icaro-info/miembros-icaro/'
      };
    }

    return directive;
  }
})();
