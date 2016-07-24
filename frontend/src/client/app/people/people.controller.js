(function() {
  'use strict';

  angular
    .module('app.people')
    .controller('PeopleController', PeopleController);

  PeopleController.$inject = ['logger', '$uibModal'];
  /* @ngInject */
  function PeopleController(logger, $uibModal) {
    var vm = this;
    vm.title = 'People';
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
