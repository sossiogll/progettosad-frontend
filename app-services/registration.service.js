(function () {
    'use strict';

    angular
        .module('app')
        .factory('RegistrationService', RegistrationService);

    RegistrationService.$inject = ['$http', '$rootScope'];
    function RegistrationService($http, $rootScope) {
        var service = {};
        var apiURL = $rootScope.APIUrl;

        service.Register = Register;
        service.Reset = Reset

        return service;

        function Register(name, email, password, password_confirmation, callback) {

            //console.log(name+" "+email+" "+password+" "+password_confirmation);
            $http.post(apiURL+"/register", { name: name, email: email, password: password, password_confirmation: password_confirmation })
                .then(
                    function (response) {

                        // This function handles success
                        callback(response.data);

                    },
                    function (response) {

                        // this function handles error
                        var message;
                        //console.log(response);
                        switch (response.data.message.email[0]) {

                            case 'validation.email':
                                message = "Formato email non valido.";
                                break;

                            default:
                                message = "Non autorizzato.";

                        }
                        response = { success: false, message: message };
                        callback(response);

                    });

        }
        
        function Reset(email, callback){
            
            $http.post(apiURL+"/resetPassword", {email: email})
                .then(
                    function (response) {

                        // This function handles success
                        callback(response.data);

                    },
                    function (response) {

                        // this function handles error
                        var message = "Formato email non valido.";

                        
                        console.log(response);
                        response = { success: false, message: message };
                        callback(response);

                    });
            
        }


    }


})();