(function() {
  'use strict';

  angular
    .module('app.home')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['logger', '$rootScope', '_', '$filter'];
  /* @ngInject */
  function HomeController(logger, $rootScope, _, $filter) {
    var vm = this;
    vm.imgSrc = 'images/default.png';
    vm.strangerCount = 5;
    vm.title = 'Home';
    vm.date = $filter('date')(new Date(), 'dd/MM/yyyy');

    vm.people = [];

    //
    $rootScope.$watch('imgSrc', function() {
      if ($rootScope.imgSrc !== undefined) {
        vm.frame = $rootScope.frame;
        vm.personDate = $rootScope.date;

        _.each(vm.frame.people, function(person, index) {
          var object = {
            name: person.name,
            date: $filter('date')(vm.personDate, 'dd/MM/yyyy - hh:mm:ss a') //formatDate(vm.personDate)
          };
          vm.people.push(object);
        });

        var peopleLength = vm.people.length;
        if (peopleLength > 10) {
          vm.people = vm.people.slice(peopleLength - 10, peopleLength);
        }

        console.log(vm.people);
      }else {
        console.log('FRAME UNDEFINED');
      }
    });
    //

    activate();

    function activate() {
      logger.info('Activated HomeController');
    }
  }
})();
