﻿(function () {
    'use strict';

    angular
        .module('app')
        .factory('UserService', UserService);

    UserService.$inject = ['$http',  '$rootScope'];
    function UserService($http, $rootScope) {
        var service = {};
        var apiURL = $rootScope.APIUrl;


        service.GetProfile = GetProfile;


        return service;


        function GetProfile(goodCallback, badCallback) {
            //console.log("getprofile");
            $http.get(apiURL+"/profile").then(goodCallback, badCallback);
        }

    }

})();
