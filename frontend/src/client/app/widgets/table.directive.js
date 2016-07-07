(function() {
  'use strict';

  angular
    .module('app.widgets')
    .directive('tableDirective', tableDirective);

  /* @ngInject */
  function tableDirective($compile) {
    //Usage:
    // <table-directive
    //     people='vm.people'
    // />

    var directive = {
      restrict: 'AE',
      replace: false,
      terminal: true,
      templateUrl: 'app/widgets/table.html',
      scope: {
        people: '=',
        logs: '='
      },
      controller: TableController,
      controllerAs: 'vm'
    };
    return directive;
  }

  /* @ngInject */
  function TableController() {
    //var vm = this;
  }
})();
