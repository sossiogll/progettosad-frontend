(function () {
    'use strict';

    angular
        .module('app')
        .controller('ChangePasswordController', ChangePasswordController);

    ChangePasswordController.$inject = ['$location', 'AuthenticationService', 'FlashService'];

    function ChangePasswordController($location, AuthenticationService, FlashService) {

        var vm = this;
        vm.changePassword = changePassword;

        function changePassword() {
            vm.dataLoading = true;
            AuthenticationService.ChangePassword(vm.oldPassword, vm.password, vm.password_confirmation,
            
            function (response) {
                
                    FlashService.Success(response.data.message);
                    //$location.path('/');
                    vm.dataLoading = false;

            },
            function (response) {
                    FlashService.Error("Verificare che la vecchia password sia corretta o che la nuova password e la conferma siano corrispondenti.");
                    //$location.path('/');
                    vm.dataLoading = false;
            }
            
            );
        }
    }

})();
