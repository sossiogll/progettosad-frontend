(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', 'AuthenticationService', 'UserService', 'FlashService', '$rootScope'];
    function LoginController($location, AuthenticationService, UserService, FlashService, $rootScope) {

        var vm = this;

        vm.login = login;

        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        function login() {
            vm.dataLoading = true;
            AuthenticationService.Login(vm.username, vm.password, function (response) {

                console.log(response);
                if (response.success) {

                    AuthenticationService.SetCredentials(response.access_token, response.token_type, function(){
                        console.log("callback funztion from setcredentials 1")

                        if($rootScope.globals == null ) {
                            FlashService.Error("Non autorizzato.");
                            AuthenticationService.ClearCredentials();
                            $location.path('/login');

                        }else {
                            $location.path('/');
                        }
                        vm.dataLoading = false;

                    });


                } else {

                    FlashService.Error(response.message);
                    vm.dataLoading = false;

                }
            });


        };
    }

})();
