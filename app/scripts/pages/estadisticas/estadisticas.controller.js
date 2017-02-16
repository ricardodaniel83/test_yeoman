(function(){
    'use strict';

    angular
        .module('Urbamapp.main')
        .controller('EstadisticasCtrl', EstadisticasCtrl)

    EstadisticasCtrl.$inject = [];
    
    /** @ngInject */
    function EstadisticasCtrl(){
        var estadisticas = this;
        init();

        function init(){
            console.log("Aqui van las estadisticas");
        }

    }

}());