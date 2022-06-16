(function () {
    'use strict';

    angular
        .module('app')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$location', 'RegistrationService', 'FlashService'];

    function RegisterController($location, RegistrationService, FlashService) {

        var vm = this;
        vm.register = register;

        function register() {
            vm.dataLoading = true;
            RegistrationService.Register(vm.name, vm.email, vm.password, vm.password_confirmation, function (response) {
                if (response.success) {

                    FlashService.Success(response.message);
                    $location.path('/');
                } else {
                    FlashService.Error(response.message);
                    vm.dataLoading = false;
                }
            });
        }
    }

})();
