(function () {
    'use strict';

    angular
        .module('app')
        .factory('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = ['$http', '$cookies', '$rootScope', 'UserService', 'FlashService'];
    function AuthenticationService($http, $cookies, $rootScope, UserService, FlashService) {
        var service = {};
        var apiURL = $rootScope.APIUrl;

        service.Login = Login;
        service.SetCredentials = SetCredentials;
        service.ClearCredentials = ClearCredentials;
        service.Logout = Logout;
        service.ChangePassword = ChangePassword;
        //console.log(service);

        return service;

        function Login(username, password, callback) {

            $http.post(apiURL+"/login", { email: username, password: password })
            .then(
                function (response) {

                // This function handles success
                    //console.log("ok authentication service");
                    callback(response.data);

                },
                function (response) {
                    response = { success: false, message: "Credenziali errate." };
                    callback(response);

            });

        }

        function SetCredentials(token, tokenType, callback) {

            //console.log("setcredentials");
            // set default auth header for http requests
            $http.defaults.headers.common['Authorization'] = tokenType + " " + token;
            //console.log("impostata autorizzazione");

            UserService.GetProfile(

            function(res){
                
                try{
                    //console.log("ok authentication service ");
                    if(res.data == null) {
                        //console.log("check data autority");
    
                        ClearCredentials();
                        
                    }
                    else {
                         //console.log("ok authentication service");
    
                        $rootScope.globals = {
                            currentUser: {
                                authdata: token,
                                authtype: tokenType
                            }
                        };
                        $rootScope.globals.user = res.data;
    
                        // store user details in globals cookie that keeps user logged in for 1 week (or until they logout)
                        var cookieExp = new Date();
                        cookieExp.setDate(cookieExp.getDate() + 7);
                        $cookies.putObject('globals', $rootScope.globals, { expires: cookieExp });
                    }
    
                    //console.log("callback funztion from authentication service 1")
                    callback(res);
                }catch (error) {
                    console.error(error);
                     
                }
            },

            function(){

                callback();

            });

        }

        function Logout(){

            //console.log("logout");
            $http.post(apiURL+"/logout")
                .then(
                    function (response) {

                        // This function handles success
                        //console.log(response);
                        FlashService.Success("Logout effettuato con successo.");
                    },
                    function (response) {

                        // this function handles error
                        response = { success: false, message: message };
                        FlashService.Error("Errore nella procedura di logout.");


                    });

        }

        function ChangePassword(oldPassword, password, password_confirmation, goodCallback, badCallback){

            $http.post(apiURL+"/changePassword", {oldPassword:oldPassword, password:password, password_confirmation:password_confirmation})
                .then(
                    function (response) {

                        goodCallback(response);
                    },
                    function (response) {

                        badCallback(response);
                        //vm.dataLoading = false;

                    });

        }

        function ClearCredentials() {
                //console.log("clear credentials");
                $rootScope.globals = {}
                $cookies.remove('globals');
                $http.defaults.headers.common.Authorization = 'Basic';
        }

    }


})();