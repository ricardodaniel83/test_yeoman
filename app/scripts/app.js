'use strict';

angular
  .module('testAngularApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'Urbamapp.helpers',
    'Urbamapp.service',
    'Urbamapp.main',
    'Urbamapp.modelos',
    'ui.router',
    'lbServices',
    'ui.bootstrap'
  ])
  .constant("urlImg","http://191.235.91.22/")  //servidor
  //.constant("urlImg","http://191.234.185.80/") //developer
  .config(function ($stateProvider, $urlRouterProvider, LoopBackResourceProvider) {

    $stateProvider
       .state('login', {
        url: '/login',
        templateUrl: 'scripts/pages/login/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
        });

        $urlRouterProvider.otherwise("/login");

        //Poner el Token en el Header
        //LoopBackResourceProvider.setAuthHeader('accessToken');
        //Obtener Token
        //LoopBackResourceProvider.getAuthHeader()

        //Definir URL del API server
      //  LoopBackResourceProvider.setUrlBase('http://191.234.185.80/api'); //desarrollo
        LoopBackResourceProvider.setUrlBase('http://191.235.91.22/api'); //servidor
        //LoopBackResourceProvider.setUrlBase('http://192.168.1.47:3333/api'); // Hiran
        //Obtener URL del API server.
        //$rootScope.url = LoopBackResourceProvider.getUrlBase();
        //console.log(LoopBackResourceProvider.getUrlBase());



  });
