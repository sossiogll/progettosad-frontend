(function () {
    'use strict';

    angular
        .module('app')
        .factory('FileService', FileService);

    FileService.$inject = ['$http',  '$rootScope', 'CategoryService'];
    function FileService($http, $rootScope, CategoryService) {
        var service = {};
        var apiURL = $rootScope.APIUrl;

        service.DownloadFile = DownloadFile;

        return service;

        function DownloadFile(categoryID,uuid, fileName, fileExtension, goodCallback, badCallback) {

            $http.get(apiURL+"/category/"+categoryID+"/files/download/"+uuid, {responseType:'blob'}).then(goodCallback, badCallback);

        }

    }

})();
