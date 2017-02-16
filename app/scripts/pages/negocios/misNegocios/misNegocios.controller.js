(function(){
    'use strict';

    angular
        .module('Urbamapp.main')
        .controller('misNegociosCtrl', misNegociosCtrl)

    misNegociosCtrl.$inject = ['$state', 'userService', 'LoopBackAuth', 'placeModel', 'placeService'];

    /** @ngInject */
    function misNegociosCtrl($state, userService, LoopBackAuth, placeModel, placeService){
        var misNegocios = this;
        misNegocios.listaNegocios = [];
        misNegocios.verPlace = verPlace;
        misNegocios.token = LoopBackAuth.accessTokenId;
        misNegocios.api = 'http://191.234.185.80/';




        init();

        function init(){

            userService.getMisNegocios().then(function(response){
                console.log("Place");
                console.log(response);
                angular.forEach(response.places, function(item, index){
                    if(angular.isUndefined(item.place) !== true){
                        console.log("Places dos");
                        misNegocios.listaNegocios.push(placeModel.estandariza(item.place));
                    }
                });
                console.log(misNegocios.listaNegocios);
            })
            .catch(function(err){
                console.log("Maaaalll");
                console.log(err);
                return err;
            });
            graficos();
        }


        function verPlace(id){
            $state.go('main.detallesNegocio', {idNegocio: id});
        }






    // Pintar Graficos

    function graficos(){

        Morris.Line({
        element: 'morris-line',
        data: [
            { y: '2005', a: 100},
            { y: '2007', a: 75},
            { y: '2008', a: 50},
            { y: '2009', a: 75},
            { y: '2010', a: 50},
            { y: '2011', a: 75},
            { y: '2012', a: 100},

            { y: '2005', b: 10},
            { y: '2007', b: 7},
            { y: '2008', b: 5},
            { y: '2009', b: 7},
            { y: '2010', b: 5},
            { y: '2011', b: 7},
            { y: '2012', b: 10}
        ],
        xkey: 'y',
        ykeys: ['a', 'b'],
        labels: ['Series A', 'Series B'],
        resize: true,
        lineColors: ['#33414E', '#95B75D']
        });

        Morris.Bar({
            element: 'morris-bar',
            data: [
                { y: '2006', a: 100, b: 90 },
                { y: '2007', a: 75,  b: 65 },
                { y: '2008', a: 50,  b: 40 },
                { y: '2009', a: 75,  b: 65 },
                { y: '2010', a: 50,  b: 40 },
                { y: '2011', a: 75,  b: 65 },
                { y: '2012', a: 100, b: 90 }
            ],
            xkey: 'y',
            ykeys: ['a', 'b'],
            labels: ['Series A', 'Series B'],
            barColors: ['#314150', '#18af99']
        });


        Morris.Donut({
            element: 'morris-donut',
            data: [
                {label: "Adultos 36-49", value: 10},
                {label: "Adultos Jovenes 21-35", value: 70},
                {label: "Jovenes 16-20", value: 20}
            ],
            colors: ['#fca325', '#314150', '#18af99']
        });

    }


    }

}());
