(function() {
  'use strict';

  angular
    .module('app.core')
    .controller('CameraModalController', CameraModalController);

  CameraModalController.$inject = ['logger', '$uibModal'];
  /* @ngInject */
  function CameraModalController(logger, $uibModal) {
    var vm = this;

    ///////////////////////////////////////
    activate();
    //////////////////////////////////////

    function activate() {
      logger.info('Activated CameraModalController');
    }
  }
})();
