(function(){
    'use strict';

    angular
        .module('Urbamapp.service')
        .factory('mapaService', mapaService)

     mapaService.$inject = ['$q'];

 function mapaService($q){


        var icono = Urbamapp.Icon.extend({
            options: {
                shadowUrl: 'core/img/iconosMapa/marker-shadow.png',
                idPlace: 'ID del Place',
                nombrePlace: 'Nombre Place',
                tagsPlace: 'Estos son los tags',
                categoriaPlace: 'Esta es una categoria',
                fotoPlace: 'Esta es una categoria',
                urlPrincipal: '',
                iconSize:     [30, 30],
                shadowSize:   [30, 30],
                iconAnchor:   [15, 20],
                shadowAnchor: [5, 20],
                popupAnchor:  [-3, -76]
             }
        });
        var map;
        var minimap;
        var newPlaceicono = new icono({iconUrl: 'core/img/iconosMapa/nuevolugar.svg'});
        var myPositionicono = new icono({iconUrl: 'core/img/iconosMapa/myPosition.svg'});
        var serviciosicono = new icono({iconUrl: 'core/img/iconosMapa/servicios.png'});
        var comidaicono = new icono({iconUrl: 'core/img/iconosMapa/comidas.png'});
        var comercioicono = new icono({iconUrl: 'core/img/iconosMapa/tiendas.png'});
        var espiritualesicono = new icono({iconUrl: 'core/img/iconosMapa/religion.png'});
        var culturalicono = new icono({iconUrl: 'core/img/iconosMapa/cultura.png'});
        var públicosicono = new icono({iconUrl: 'core/img/iconosMapa/publico.png'});
        var transporteicono = new icono({iconUrl: 'core/img/iconosMapa/transporte.png'});
        var otrosicono = new icono({iconUrl: 'core/img/iconosMapa/otros-icono.png'});
        var educacionicono = new icono({iconUrl: 'core/img/iconosMapa/educacion.png'});
        var entretenimientoicono = new icono({iconUrl: 'core/img/iconosMapa/entretenimiento.png'});
        var institucionespublicasicono = new icono({iconUrl: 'core/img/iconosMapa/institucion.png'});

        return {
            getDireccion : getDireccion,
            cargarMapa: cargarMapa,
            addMarker: addMarker,
            creategroup: creategroup,
            newPlaceicono: newPlaceicono,
            myPositionicono: myPositionicono,
            miniMapa: miniMapa,
            modalMap: modalMap,
            searchIcon : searchIcon,

          /*cargarMapaAll: cargarMapaAll,
            cargarMapaCategorias: cargarMapaCategorias,
            showMiniMap: showMiniMap*/
        };


        function creategroup(){
            return Urbamapp.markerClusterGroup();
        }

         function getDireccion(lat,lng) {
             return new Promise(function(resolve, reject) {
                var req = new XMLHttpRequest();
                var api_key = '737a6aee6272bc8f6219c7a0a882651d';
                req.open('GET', "https://api.opencagedata.com/geocode/v1/json?q="+lat+"%2C"+lng+"&pretty=1&key="+api_key);
                req.onload = function() {
                    if (req.status == 200) {
                        var data = JSON.parse(req.response);
                        resolve(data.results[0]);
                    }
                    else {
                            reject(Error(req.statusText));
                    }
                };
                req.onerror = function() {
                reject(Error("Network Error"));
                };
                req.send();
            });
        }

        function cargarMapa(lat,lng){
            //Iniciar Mapa
            var map = Urbamapp.map('map',{
                zoom: 12,
                minZoom: 3,
                maxZoom: 18
            }).setView([lat,lng]);
            return map;
            }

        function modalMap(lat,lng){
            //Iniciar Mapa
            var map = Urbamapp.map('modalmap').setView([lat,lng], 16);
            return map;
            }

        function miniMapa(lat,lng){
            //Iniciar Mapa
            var map = Urbamapp.map('minimap').setView([lat,lng], 16);
            return map;
            }

        function searchIcon(categoria){
          var defered = $q.defer();
          var promise = defered.promise;
          var select  = categoria.toLowerCase();
          switch (select){
              case 'servicios':
                  defered.resolve(serviciosicono);
              break;
              case 'comida':
                  defered.resolve(comidaicono);
              break;
              case 'comercio':
                  defered.resolve(comercioicono);
              break;
              case 'espirituales':
                  defered.resolve(espiritualesicono);
              break;
              case 'cultura y arte':
                  defered.resolve(culturalicono);
              break;
              case 'espacios públicos':
                  defered.resolve(públicosicono);
              break;
              case 'transporte':
                  defered.resolve(transporteicono);
              break;
              case 'educación':
                  defered.resolve(educacionicono);
              break;
              case 'entretenimiento':
                  defered.resolve(entretenimientoicono);
              break;
              case 'instituciones públicas':
                  defered.resolve(institucionespublicasicono);
              break;
              default:
                  defered.resolve(otrosicono);
          }

          return promise;

        }


        function addMarker(id,lat,lng,nombre,tags,categoria,description,user_address, urlPortada){
            var icono;
            switch (categoria){
                case 'servicios':
                    icono = serviciosicono;
                break;
                case 'comida':
                    icono = comidaicono;
                break;
                case 'comercio':
                    icono = comercioicono;
                break;
                case 'espirituales':
                    icono = espiritualesicono;
                break;
                case 'cultura y arte':
                    icono = culturalicono;
                break;
                case 'espacios públicos':
                    icono = públicosicono;
                break;
                case 'transporte':
                    icono = transporteicono;
                break;
                case 'educación':
                    icono = educacionicono;
                break;
                case 'entretenimiento':
                    icono = entretenimientoicono;
                break;
                case 'instituciones públicas':
                    icono = institucionespublicasicono;
                break;
                default:
                    icono = otrosicono;
            }
            var marker = Urbamapp.marker([lat, lng], {idPlace: id ,icon: icono, nombrePlace: nombre, tagsPlace: tags , categoriaPlace: categoria, description: description, user_address:user_address, urlPortada: urlPortada });
            return marker;
     }



    }
    }
());


/* ------- Ejemplo de uso del servicio --------- */
/*
    Uso: mapaService.cargarMapa(lat,lng,"id del mapa");
    Ejemplo: mapaService.cargarMapa(-0.1978993,-78.4670888,'map');


    Uso:  mapaService.getDireccion(lat,lng).then(function(response) {
            $scope.data = response.components;
            console.log($scope.data);
        }, function(error) {
            console.error("Error:", error);
        });

    Ejemplo:  mapaService.getDireccion(-0.1978993,-78.4670888).then(function(response) {
            $scope.data = response.components;
            console.log($scope.data);
        }, function(error) {
            console.error("Error:", error);
        });

    Uso: mapaService.addMarker(lat,lng,nombre,descripcion,categoria)
    Ejemplo: mapaService.addMarker(-0.1978993,-78.4670888,'Urbamapp','Esto es una descripcion','comida');

    Uso: mapaService.showMarkers(categoria);
    Ejemplo: mapaService.showMarkers('all');

    Uso: mapaService.hideMarkers(categoria);
    Ejemplo: mapaService.hideMarkers('tiendas');
*/
