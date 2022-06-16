(function () {
    'use strict';

    angular
        .module('app')
        .controller('FooterController', FooterController);

    FooterController.$inject = ['$http', '$rootScope'];
    function FooterController($http, $rootScope){

        var apiURL = $rootScope.APIUrl;

        initController();

        function initController() {

            loadBackendVersion();
            loadFrontendVersion();
        }

        function loadBackendVersion(){
            if($rootScope.frontendVersion === undefined)
                $http.get(apiURL)
                    .then(
                        function (response) {
                            // This function handles success
                            $rootScope.backendVersion = response.data.APIVersion.FullNumber;

                            if(response.data.Debug)
                                $rootScope.debugMessage = "Backend in debug";
                            else
                                $rootScope.debugMessage = "";
                        },
                        function (response) {
                            $rootScope.backendVersion = "N.D.";
                            $rootScope.debugMessage = "Backend in debug: N.D."
                        });
        }

        function loadFrontendVersion(){
            if($rootScope.frontendVersion === undefined)
                $rootScope.frontendVersion = "1.0.54";
        }

    }





})();