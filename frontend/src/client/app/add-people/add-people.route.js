(function() {
  'use strict';

  angular
    .module('app.add-people')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'add-people',
        config: {
          url: '/add-people',
          templateUrl: 'app/add-people/add-people.html',
          controller: 'AddPeopleController',
          controllerAs: 'vm',
          title: 'Add People',
          settings: {
            nav: 5,
            content: '<i class="fa fa-plus-circle"></i> Agregar Personas'
          }
        }
      }
    ];
  }
})();
