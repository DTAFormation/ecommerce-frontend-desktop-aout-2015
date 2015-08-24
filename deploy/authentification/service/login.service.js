angular.module('ecDesktopApp.authentification')
.factory('loginService', ['$http', '$cookieStore', '$rootScope', '$timeout',
    function ($http, $cookieStore, $rootScope, $timeout) {

        var service = this;
        var apiUrl = "http://5.196.89.85:9080/ec-backend/api/admin/connect";

        service.Login = function (username, password) {
          var userData = { "login" : username, "password" : password };
          return $http.post(apiUrl, userData);
        };

		//setCredential permet d'initialiser les valeurs username et mdp pour la fonction test,
		//utilisaton des services CORS (cross-origin-resources-sharing) permettant d'acceder à des services
		//en dehors de leurs origines.
        service.SetCredentials = function (username, password) {
            var authdata = username + ':' + password;

            $rootScope.globals = {
                currentUser: {
                    username: username,
                    authdata: authdata
                }
            };
            //place la personne connecté en accréditation basic + authdata.
            $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;
            $cookieStore.put('globals', $rootScope.globals);
        };

		//suppression des infos du cookie
        service.ClearCredentials = function () {
            $rootScope.globals = {};
            $cookieStore.remove('globals');
            //les personnes sur le site mais non connecté on par défaut une accréditation basic.
            $http.defaults.headers.common.Authorization = 'Basic ';
        };

        return service;
    }]);