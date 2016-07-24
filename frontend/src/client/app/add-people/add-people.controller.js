(function() {
  'use strict';

  angular
    .module('app.add-people')
    .controller('AddPeopleController', AddPeopleController);

  AddPeopleController.$inject = ['logger'];
  /* @ngInject */
  function AddPeopleController(logger) {
    var vm = this;
    vm.title = 'Train';
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

    activate();

    function activate() {
      logger.info('Activated AddPeopleController');
    }
  }
})();
