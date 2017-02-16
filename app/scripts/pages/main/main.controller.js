(function(){
    'use strict';

    angular
        .module('Urbamapp.main')
        .controller('MainCtrl', MainCtrl)

    MainCtrl.$inject = ['LoopBackAuth', 'User', 'userService', 'mapaService', '$state'];

    function MainCtrl(LoopBackAuth, User, userService, mapaService, $state){
        var main = this;
        main.negocios = [];

        main.seguidores = 0;
        main.messages = 0;
        main.goToNegocios = goToNegocios;
        main.goToEventos = goToEventos;

        main.token = LoopBackAuth.accessTokenId;
        main.userId = LoopBackAuth.currentUserId;
        //main.email = LoopBackAuth.currentUserData.email;
        var all = mapaService.creategroup();


        var map = mapaService.cargarMapa(-0.18509355775704298, -78.48190784454347 );
        //Asignar Estilo
        Urbamapp.tileLayer.estilo('Urbamapp').addTo(map);




        init();

        function init(){
            console.log("Este es main");
            userService.getMisNegocios().then(function(response){
                angular.forEach(response.places, function(item, index){
                    if(angular.isUndefined(item.place) !== true){
                        main.negocios.push(item);
                    }
                });
                agregarMarcadores(main.negocios);
            })
            .catch(function(err){
                console.log("Maaaalll");
                console.log(err);
                return err;
            });
        }


        //Agregando marcadores
        function agregarMarcadores(places){
           angular.forEach(places, function(place,index){
                var tags = validarTags(place.place);
                // Parche temporal de categorias
                if(place.place.categories.length != 0){
                    var newMarker = mapaService.addMarker(place.place.id,place.place.coord.lat,place.place.coord.lng,place.place.name,tags,place.place.categories[0].name.toLowerCase(),place.place.description,place.place.user_address);
                    newMarker.on("click", buscarPlace).addTo(all);

                }
            });
             showMarkers('all');
        }


        function validarTags(place){
           var i = 0;
            var tempTags = [];
            for(i; i < place.tags.length; i++){
                if(angular.isUndefined(place.tags[0]) == true){
                }
                else{
                    tempTags.push(place.tags[i].name)
                }
            }
            return tempTags;
        }


        function buscarPlace(e){
            $state.go('main.detallesNegocio', {idNegocio: e.target.options.idPlace});
        }


        //Muestra capas segun categoria
        function showMarkers(categoria){
             map.addLayer(eval(categoria));
        }


        function goToNegocios(){
            $state.go('main.misNegocios');
        }

        function goToEventos(){
            $state.go('main.eventos');
        }

    }

}());
