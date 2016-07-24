(function() {
  'use strict';

  angular
    .module('app.home')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['logger', '$rootScope', '_', '$filter', '$uibModal'];
  /* @ngInject */
  function HomeController(logger, $rootScope, _, $filter, $uibModal) {
    var vm = this;
    vm.title = 'Home';
    vm.date = $filter('date')(new Date(), 'dd/MM/yyyy');
    vm.people = [];

    ///////////////////////////////////
    vm.addUser = addUser;
    //////////////////////////////////

    /*Camera Canvas*/
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    /*Face Canvas*/
    vm.imgSrc = 'images/default.png'; //default image
    vm.strangerCount = 5; //FIX ME

    //Watch for changes in the camera
    $rootScope.$watch('imgSrc', function() {
      if ($rootScope.imgSrc !== undefined) { //If the camera streaming is on
        vm.frame = $rootScope.frame; //Get frame
        vm.personDate = $rootScope.date;
        //Camera canvas image
        var imgCanvas = new Image();
        imgCanvas.src = $rootScope.imgSrc;
        //Clear camera and face context
        context.clearRect(0, 0, canvas.width, canvas.height);
        //Draw camera image
        context.drawImage(imgCanvas, 0, 0);
        //Begin camera and face processing
        context.beginPath();
        context.strokeStyle = '#08D120'; //Square color
        context.lineWidth = 5;

        _.each(vm.frame.people, function(person, index) {
          vm.top = person.y;
          vm.right = person.x + person.w + 1;
          vm.bottom = person.y + person.h + 1;
          vm.left = person.x;
          var object = {
            picture: $rootScope.imgSrc,
            person: person,
            date: $filter('date')(vm.personDate, 'dd/MM/yyyy - hh:mm:ss a')
          };

          vm.people = _.remove(vm.people, function(p) {
            return p.person.name !== object.person.name;
          });

          vm.people.push(object);
          context.rect(person.x, person.y, person.w, person.h);
        });

        //Draw camera and face frame
        context.stroke();
        //Finish
        context.closePath();

      }else { //If the camera streaming is off
        //Should display a message saying that the camera is off
        console.log('FRAME UNDEFINED'); //FIX ME
      }
    });
    //

    activate();

    function activate() {
      logger.info('Activated HomeController');
      //vm.imgSrcTest = $rootScope.imgSrc;
    }

    function addUser() {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'app/core/modal/add-user-modal.html',
        controller: 'AddUserModalController',
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
