(function() {
  'use strict';

  angular
  .module('app.login')
  .controller('LoginController', LoginController);

  LoginController.$inject = ['logger', '$state', 'dataservice', '$sessionStorage'];
  /* @ngInject */
  function LoginController(logger, $state, dataservice, $sessionStorage) {
    var vm = this;
    vm.title = 'Sistema de Seguridad';
    vm.login = login;
    vm.submitted = false;
    //vm.rememberme = false;
    vm.password = '';
    vm.username = '';
    vm.rememberme = false;
    activate();

    function activate() {
      dataservice.getWebSocket();
      logger.info('Activated LoginController');
    }

    function login(validForm) {
      console.log(validForm);
      /**VALIDATE PASSWORD AND USERNAME**/
      if (validForm) {
        $sessionStorage.Authorization = btoa(vm.username + ':' + vm.password);

        return dataservice.getUser(vm.username)
          .then(function(response) {
            console.log(response);
            if (response.status === 200) {
              $sessionStorage.username = vm.username;
              $sessionStorage.password = vm.password;
              $sessionStorage.user = response.data;

              /**Go to app-home**/
              $state.go('home');
            }else {
              alertify.set({ labels: {
                ok: 'Aceptar',
              } });
              //alertify.set({ buttonReverse: true });
              alertify.alert('Usuario o contraseña incorrecta');
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }else {
        //Handle error message
        console.log('Not valid form');
      }
    }
  }
})();
