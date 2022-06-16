(function () {
    'use strict';

    angular
        .module('app')
        .factory('CategoryService', CategoryService);

    CategoryService.$inject = ['$http',  '$rootScope'];
    function CategoryService($http, $rootScope) {

        var service = {};
        var apiURL = $rootScope.APIUrl;

        service.GetAllCategories = GetAllCategories;
        service.GetFilesByCategoryID = GetFilesByCategoryID

        return service;


        function GetAllCategories(goodCallback, backCallback) {
            return $http.get(apiURL+"/category").then(goodCallback, backCallback);
        }

        function GetFilesByCategoryID(id, goodCallback, backCallback){
            return $http.get(apiURL+"/category/"+id+"/files").then(goodCallback, backCallback);
        }

        // private functions

        function handleSuccess(res) {
            res.data.success = true;
            return res.data;
        }

        function handleError(res) {

            return function () {
                return { success: false, message: res.data["message"] };
            };
        }
    }

})();
