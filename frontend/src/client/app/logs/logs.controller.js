(function() {
  'use strict';

  angular
    .module('app.home')
    .controller('LogsController', LogsController);

  LogsController.$inject = ['logger', 'dataservice', '$q', '$filter', '$rootScope', '_'];
  /* @ngInject */
  function LogsController(logger, dataservice, $q, $filter, $rootScope, _) {
    var vm = this;
    vm.title = 'Logs';
    vm.strangerCount = 5;
    vm.date = $filter('date')(new Date(), 'dd/MM/yyyy');
    vm.people = [];

    //
    $rootScope.$watch('imgSrc', function() {
      if ($rootScope.imgSrc !== undefined) {
        vm.frame = $rootScope.frame;
        vm.personDate = $rootScope.date;

        _.each(vm.frame.people, function(person, index) {
          var object = {
            picture: $rootScope.imgSrc,
            person: person,
            date: $filter('date')(vm.personDate, 'dd/MM/yyyy - hh:mm:ss a'),
            confidence: person.confidence
          };
          vm.people.push(object);
        });

        var peopleLength = vm.people.length;
        if (peopleLength > 20) {
          vm.people = vm.people.slice(peopleLength - 20, peopleLength);
        }
      }else {
        console.log('FRAME UNDEFINED');
      }
    });
    //

    activate();

    function activate() {
      logger.info('Activated Logs View');
    }
  }
})();
