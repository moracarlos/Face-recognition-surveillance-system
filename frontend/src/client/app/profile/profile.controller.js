(function() {
  'use strict';

  angular
    .module('app.profile')
    .controller('ProfileController', ProfileController);

  ProfileController.$inject = ['logger', '$uibModal', '$sessionStorage', '_', 'dataservice'];
  /* @ngInject */
  function ProfileController(logger, $uibModal, $sessionStorage, _, dataservice) {
    var vm = this;
    vm.title = 'Profile';
    vm.edit = false;
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

    vm.save = save;
    vm.takePicture = takePicture;

    activate();

    function activate() {
      logger.info('Activated ProfileController');
      vm.user = $sessionStorage.user;
      console.log(vm.user);
      /********************/
      dataservice.getPerson($sessionStorage.username)
        .then(function(response) {
          if (response.status === 200) {
            vm.person = response.data;
            vm.showPerson = true;
            vm.name = vm.user.firstName;
            vm.lastName = vm.user.lastName;
            vm.username = vm.user.email;
            vm.school = _.find(vm.schools, function(school) {
              return school.name === vm.user.school;
            });
            vm.role = vm.user.role === 'admin';
          }else {
            vm.showPerson = false;
          }
        })
        .catch(function(error) {
          console.log(error);
          vm.showPerson = false;
        });
    }

    function save(validForm) {
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
              email: vm.username,
              password: vm.password,
              firstName: vm.name,
              lastName: vm.lastName,
              school: vm.school.name,
              role: vm.role ? 'admin' : 'user'
            };
            return dataservice.updateUser($sessionStorage.username, params)
              .then(function(response) {
                console.log(response);
                if (response.status === 200) {
                  vm.edit = false;
                  $sessionStorage.user = response.data;
                  $sessionStorage.username = vm.username;
                  $sessionStorage.password = vm.password;
                  $sessionStorage.Authorization = btoa(vm.username + ':' + vm.password);
                  vm.user = $sessionStorage.user;
                  console.log(response.description);
                }
              })
              .catch(function(error) {
                console.log(error);
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

    function takePicture() {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'app/core/modal/camera-modal.html',
        controller: 'CameraModalController',
        controllerAs: 'vm'
      });

      modalInstance.result.then(function (selectedItem) {
        vm.selected = selectedItem;
      }, function () {
        logger.info('Modal dismissed at: ' + new Date());
      });
    }
  }
})();
