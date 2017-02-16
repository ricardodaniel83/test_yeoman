'use strict';

angular
  .module('Urbamapp.main', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'Urbamapp.helpers',
    'Urbamapp.service',
    'Urbamapp.modelos',
    'ui.router',
    'lbServices',
    'ui.bootstrap'
  ])
  .config(function ($stateProvider, $urlRouterProvider,  LoopBackResourceProvider) {

    $stateProvider
      .state('main', {
        url: '/cliente',
        abstract: true,
        templateUrl: '../scripts/pages/layout/layout.html',
        controller: 'LayoutCtrl',
        controllerAs: 'layout'
        })

       .state('main.dashboard', {
          url: '/dashboard',
            views: {
                "main": {
                    templateUrl: '../scripts/pages/main/main.html',
                    controller: 'MainCtrl',
                    controllerAs: 'main'
                }
             }
        })

        .state('main.misNegocios', {
          url: '/negocios',
            views: {
                "main": {
                    templateUrl: '../scripts/pages/negocios/misNegocios/misNegocios.html',
                    controller: 'misNegociosCtrl',
                    controllerAs: 'misNegocios'
                }
             }
        })


        .state('main.detallesNegocio', {
          url: '/negocio',
          params: {
            idNegocio: null
            },
            views: {
                "main": {
                    templateUrl: '../scripts/pages/negocios/detallesNegocio/detallesNegocio.html',
                    controller: 'detallesNegocioCtrl',
                    controllerAs: 'detallesNegocio'
                }
             }
        })

        .state('main.editarNegocio', {
          url: '/editar',
          params: {
            data: null
            },
            views: {
                "main": {
                    templateUrl: '../scripts/pages/negocios/editarNegocio/editarNegocio.html',
                    controller: 'editarNegocioCtrl',
                    controllerAs: 'editarNegocio'
                }
             }
        })


        .state('main.editarGaleria', {
          url: '/galeria',
          params: {
            fotos: null
            },
            views: {
                "main": {
                    templateUrl: '../scripts/pages/negocios/editarNegocio/editarGaleria.html',
                    controller: 'editarGaleriaCtrl',
                    controllerAs: 'editarGaleria'
                }
             }
        })

        .state('main.eventos', {
          url: '/eventos',
            views: {
                "main": {
                    templateUrl: '../scripts/pages/negocios/eventos/eventos.html',
                    controller: 'EventosCtrl',
                    controllerAs: 'eventos'
                }
             }
        })
        .state('main.estadisticas', {
          url: '/estadisticas',
            views: {
                "main": {
                    templateUrl: '../scripts/pages/estadisticas/estadisticas.html',
                    controller: 'EstadisticasCtrl',
                    controllerAs: 'estadisticas'
                }
             }
        })

        /***** Start mapLocationTracking  *****/

        .state('main.listTeam', {
          url: '/listTeam',
            views: {
                "main": {
                    templateUrl: '../scripts/pages/mapLocationTracking/listTeam/listTeam.html',
                    controller: 'listTeamCtrl',
                    controllerAs: 'listTeam'
                }
             }
        })
        .state('main.listPlaceTeam', {
          url: '/listPlaceTeam',
            params: {
              idTeam: null,
              idUser:null,
              obj:[]
            },
            views: {
                "main": {
                    templateUrl: '../scripts/pages/mapLocationTracking/listPlaceTeam/listPlaceTeam.html',
                    controller: 'listPlaceTeamCtrl',
                    controllerAs: 'listPlaceTeam'
                }
             }
        })

        .state('main.listPlaceNoTeam', {
          url: '/listPlaceNoTeam',
            params: {
              idTeam: null,
              idUser:null,
              obj:[]
            },
            views: {
                "main": {
                    templateUrl: '../scripts/pages/mapLocationTracking/listPlaceNoTeam/listPlaceNoTeam.html',
                    controller: 'listNoTeamCtrl',
                    controllerAs: 'listNoTeam'
                }
             }
        })

        .state('main.listTeamCategory', {
          url: '/listTeamCategory',
            views: {
                "main": {
                    templateUrl: '../scripts/pages/mapLocationTracking/listTeamCategory/listTeamCategory.html',
                    controller: 'listTeamCategoryCtrl',
                    controllerAs: 'listTeamCategory'
                }
             }
        })

          /***** End mapLocationTracking  *****/


         .state('main.perfil', {
          url: '/perfil',
            views: {
                "main": {
                    templateUrl: '../scripts/pages/perfil/perfil.html',
                    controller: 'PerfilCtrl',
                    controllerAs: 'perfil'
                }
             }
        });


        $urlRouterProvider.otherwise("/login");

  });
