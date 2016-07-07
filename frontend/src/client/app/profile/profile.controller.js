(function() {
  'use strict';

  angular
    .module('app.profile')
    .controller('ProfileController', ProfileController);

  ProfileController.$inject = ['logger', '$uibModal'];
  /* @ngInject */
  function ProfileController(logger, $uibModal) {
    var vm = this;
    vm.title = 'Profile';
    vm.edit = false;
    vm.save = save;
    vm.takePicture = takePicture;

    activate();

    function activate() {
      logger.info('Activated ProfileController');
    }

    function save() {
      vm.edit = false;
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
