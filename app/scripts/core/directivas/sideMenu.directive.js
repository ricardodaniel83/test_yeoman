(function () {
    'use strict';


    angular.module('testAngularApp')
    .directive('sideMenu', sideMenu);


    function sideMenu(){

        function sideMenuCtrl(LoopBackAuth, User, userService){
            var sideMenu = this;
            sideMenu.data = {};
            sideMenu.mainFoto = ""
            sideMenu.token = LoopBackAuth.accessTokenId;
            sideMenu.name = "";
            sideMenu.username = "";

            init();

            function init(){
                console.log("Este es el side menu");
                userService.getData().then(function(response){
                    sideMenu.data = response;
                    sideMenu.mainFoto = armarFoto(sideMenu.data);
                    //sideMenu.name = sideMenu.data._profile.full_name;
                    sideMenu.username = sideMenu.data.username;
                })
            }

            function hola(){
                alert('hola mundo');
            }


            function armarFoto(foto){
                var api = 'http://191.234.185.80/'
                var token = '?access_token='+sideMenu.token
                var fotoUrl = api+foto.principalUrl+token;
                return fotoUrl;
            }



        }

                return {
                    bindToController: true,
                    controller: sideMenuCtrl,
                    controllerAs: 'sideMenu',
                    restrict: 'AE',
                    templateUrl: 'core/directivas/side-menu.html'
                }





        }

} ());
