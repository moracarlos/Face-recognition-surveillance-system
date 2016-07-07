(function() {
  'use strict';

  angular
    .module('app.train')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'train',
        config: {
          url: '/train',
          templateUrl: 'app/train/train.html',
          controller: 'TrainController',
          controllerAs: 'vm',
          title: 'Train',
          settings: {
            nav: 2,
            content: '<i class="fa fa-lock"></i> Entrenamiento'
          }
        }
      }
    ];
  }
})();
