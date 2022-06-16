(function () {
    'use strict';

    angular
        .module('app')
        .controller('PasswordResetController', PasswordResetController);

    PasswordResetController.$inject = ['$location', 'RegistrationService', 'FlashService'];

    function PasswordResetController($location, RegistrationService, FlashService) {

        var vm = this;
        vm.reset = reset;

        function reset() {
            vm.dataLoading = true;
            RegistrationService.Reset(vm.emailToReset, function (response) {
                if (response.success) {
                    FlashService.Success(response.message);
                    vm.dataLoading = false;
                } else {
                    FlashService.Error(response.message);
                    vm.dataLoading = false;
                }
            });
        }
    }

})();
