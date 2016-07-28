(function() {
  'use strict';

  angular
    .module('app.core')
    .controller('AddUserModalController', AddUserModalController);

  AddUserModalController.$inject = ['logger', '$uibModal', 'dataservice', '$uibModalInstance'];
  /* @ngInject */
  function AddUserModalController(logger, $uibModal, dataservice, $uibModalInstance) {
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

    vm.addUser = addUser;
    ///////////////////////////////////////
    activate();
    //////////////////////////////////////

    function activate() {
      logger.info('Activated AddUserModalController');
    }

    function addUser(validForm) {
      alertify.set({ labels: {
        ok: 'Aceptar',
        cancel: 'Cancelar'
      } });
      alertify.set({ buttonReverse: true });
      // confirm dialog
      if (validForm) {
        alertify.confirm('¿Seguro de que desea modificar el usuario?', function (e) {
          if (e) {
            var params = {
              email: vm.email,
              password: vm.password,
              firstName: vm.name,
              lastName: vm.lastName,
              school: vm.school.name,
              role: vm.role ? 'admin' : 'user'
            };
            return dataservice.addUser(params)
              .then(function(response) {
                console.log(response);
                if (response.status === 200) {
                  console.log(response.description);
                  alertify.alert(response.description);
                  $uibModalInstance.close();
                }else {
                  console.log(response);
                }
              })
              .catch(function(error) {
                console.log(error);
                alertify.alert(error);
                $uibModalInstance.dismiss('cancel');
              });
          } else {
            // user clicked "cancel"
            console.log('Cancel');
          }
        });
      }else {
        console.log('Form invalid');
      }
    }
  }
})();
