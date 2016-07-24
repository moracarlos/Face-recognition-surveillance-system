(function() {
  'use strict';

  angular
    .module('app.core')
    .controller('AddUserModalController', AddUserModalController);

  AddUserModalController.$inject = ['logger', '$uibModal'];
  /* @ngInject */
  function AddUserModalController(logger, $uibModal) {
    var vm = this;

    vm.school = {
      'id': 1,
      'name': 'Computación'
    };
    vm.schools = [
      {
        'id': 1,
        'name': 'Computación'
      },
      {
        'id': 2,
        'name': 'Física'
      },
      {
        'id': 3,
        'name': 'Matemática'
      },
      {
        'id': 4,
        'name': 'Geoquímica'
      },
      {
        'id': 5,
        'name': 'Biología'
      }
    ];

    ///////////////////////////////////////
    activate();
    //////////////////////////////////////

    function activate() {
      logger.info('Activated AddUserModalController');
    }
  }
})();
