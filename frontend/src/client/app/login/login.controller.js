(function() {
  'use strict';

  angular
  .module('app.login')
  .controller('LoginController', LoginController);

  LoginController.$inject = ['logger', '$state', 'dataservice'];
  /* @ngInject */
  function LoginController(logger, $state, dataservice) {
    var vm = this;
    vm.title = 'Login';
    vm.login = login;
    vm.password = '';
    vm.username = '';
    vm.rememberme = false;
    activate();

    function activate() {
      dataservice.getWebSocket();
      logger.info('Activated LoginController');
    }

    function login() {
      /**VALIDATE PASSWORD AND USERNAME**/
      console.log(vm.username);
      console.log(vm.password);
      console.log(vm.rememberme);
      /**Go to app-home**/
      $state.go('home');
    }

  }
})();
