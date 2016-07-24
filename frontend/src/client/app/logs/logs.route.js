(function() {
  'use strict';

  angular
    .module('app.logs')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'logs',
        config: {
          url: '/logs',
          templateUrl: 'app/logs/logs.html',
          controller: 'LogsController',
          controllerAs: 'vm',
          title: 'Logs',
          settings: {
            nav: 3,
            content: '<i class="fa fa-history"></i> Logs'
          }
        }
      }
    ];
  }
})();
