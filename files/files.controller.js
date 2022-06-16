(function () {
    'use strict';

    angular
        .module('app')
        .controller('FilesController', FilesController);

    FilesController.$inject = ['UserService', '$rootScope', 'CategoryService', 'FileService', '$routeParams', 'FlashService', '$location', '$scope'];
    function FilesController(UserService, $rootScope, CategoryService, FileService, $routeParams, FlashService, $location) {

        var vm = this;
        vm.files = [];
        vm.downloadFile = downloadFile;
        vm.category = {};

        initController();

        function initController()
        {
            vm.category.name = $routeParams.showName;

           CategoryService.GetFilesByCategoryID($rootScope.nextCategory.id,
                function(response){
                    FlashService.Success("Categorie aggiornate");
                    vm.files = response.data;
                },
                function(response){
                    FlashService.Error("Errore nella richiesta delle categorie.");
                    $location.path('/');
                })
        }

        function downloadFile($uuid, fileName, fileExtension) {
            FileService.DownloadFile($rootScope.nextCategory.id, $uuid, fileName, fileExtension,

                function(response){
                    try {
                        var fileType = response.headers['content-type'] + ';charset=utf-8';
                        var blob = new Blob([response.data], { type: fileType });
                        var objectUrl = window.URL || window.webkitURL;
                        var link = angular.element('<a/>');

                        link.css({ display: 'none' });
                        link.attr({
                            href : objectUrl.createObjectURL(blob),
                            target: '_blank',
                            download : fileName+"."+fileExtension
                        })
                        link[0].click();
                        // clean up
                        link.remove();
                        objectUrl.revokeObjectURL(blob);
                    } catch (error) {
                        console.error(error);
                    }
                },

                function(response){

                    FlashService.Error("Impossibile scaricare il file selezionato.");

                })
                ;
        }


    }



})();