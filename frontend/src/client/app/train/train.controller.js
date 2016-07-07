(function() {
  'use strict';

  angular
    .module('app.train')
    .controller('TrainController', TrainController);

  TrainController.$inject = ['logger'];
  /* @ngInject */
  function TrainController(logger) {
    var vm = this;
    vm.title = 'Train';

    activate();

    function activate() {
      logger.info('Activated TrainController');
    }
  }
})();
