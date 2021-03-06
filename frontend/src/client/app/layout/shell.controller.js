(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('ShellController', ShellController);

  ShellController.$inject = ['$rootScope', '$timeout', 'config', 'logger', '$state'];
  /* @ngInject */
  function ShellController($rootScope, $timeout, config, logger, $state) {
    var vm = this;
    vm.busyMessage = 'Por favor, espere ...';
    vm.isBusy = true;
    $rootScope.showSplash = true;
    vm.navline = {
      title: config.appTitle,
      text: 'Sistema de Seguridad con Reconocimiento Facial',
      link: 'http://cicore.ciens.ucv.ve/laboratorios-de-investigacion/icaro-info/miembros-icaro/'
    };

    activate();

    function activate() {
      logger.success(config.appTitle + ' loaded!', null);
      hideSplash();
    }

    function hideSplash() {
      //Force a 1 second delay so we can see the splash.
      $timeout(function() {
        $rootScope.showSplash = false;
      }, 1000);
    }
  }
})();
