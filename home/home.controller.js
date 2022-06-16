(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['UserService', '$rootScope', 'CategoryService', 'AuthenticationService'];
    function HomeController(UserService, $rootScope, CategoryService, AuthenticationService) {
        var vm = this;
        //console.log(6);
        vm.showCategory = showCategory;
        vm.logout = logout;

        vm.allCategories = [];
        vm.user = $rootScope.globals.user;
        initController();

        function initController() {
            loadAllCategories();
        }

        function loadAllCategories() {

            CategoryService.GetAllCategories(
                function (categories) {
                    vm.allCategories = categories.data;
                },
                function (){

                    vm.allCategories = [];

                });
        }

        function showCategory(categoryID){

            $rootScope.nextCategory.id = categoryID;
        }

        function logout(){
            //console.log("logout()");
            AuthenticationService.Logout();
        }

    }

})();