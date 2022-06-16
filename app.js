(function () {
    'use strict';

    angular
        .module('app', ['ngRoute', 'ngCookies'])
        .config(config)
        .run(run);

    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {


        $routeProvider
            .when('/', {
                controller: 'HomeController',
                templateUrl: 'home/home.view.html',
                controllerAs: 'vm'
            })

            .when('/:showName?/files', {
                controller: 'Controller',
                templateUrl: 'files/files.view.html',
                controllerAs: 'vm'
            })

            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'login/login.view.html',
                controllerAs: 'vm'
            })

            .when('/register', {
                controller: 'RegisterController',
                templateUrl: 'register/register.view.html',
                controllerAs: 'vm'
            })

            .when('/changePassword', {
                controller: 'ChangePasswordController',
                templateUrl: 'change-password/change-password.view.html',
                controllerAs: 'vm'
            })

            .when('/passwordReset', {
                controller: 'PasswordResetController',
                templateUrl: 'password-reset/password-reset.view.html',
                controllerAs: 'vm'
            })

            .otherwise({ redirectTo: '/login' });
    }

    run.$inject = ['$rootScope', '$location', '$cookies', '$http'];
    function run($rootScope, $location, $cookies, $http) {

        // keep user logged in after page refresh
        $rootScope.globals = $cookies.getObject('globals') || {};

        $rootScope.APIUrl = "http://localhost/php/progettosad/public/v1"
        $rootScope.nextCategory = {};

        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = $rootScope.globals.currentUser.authtype + " " + $rootScope.globals.currentUser.authdata;
        }


        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register', '/passwordReset', '/privacyPolicy']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });

    }



})();