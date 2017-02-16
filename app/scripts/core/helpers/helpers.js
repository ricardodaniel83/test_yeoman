(function(){
    'use strict';

    angular
        .module('Urbamapp.helpers')
        .service('helpers', helpers);

         helpers.$inject = [];

    
    /** @ngInject */
    function helpers(){

        return {
            validateEmail: validateEmail,
            crearNombreUnico: crearNombreUnico,
            getCurentTime: getCurentTime
        }

        function validateEmail(email) {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            console.log('evaluacion: '+re.test(email));
            return re.test(email);
        }

        function crearNombreUnico(cadena){

            var date = getCurentTime();
            console.log(date); 

            var tempName = cadena + date + Math.random();;
            console.log(tempName); 

            var hash = 5381;
            var i = 0;
            for (i; i < tempName.length; i++) {
                var char = tempName.charCodeAt(i);
                hash = ((hash << 5) + hash) + char; /* hash * 33 + c */
            }

            var hashName = Math.abs(hash);
            console.log('Nombre creado:');
            console.log(hashName);

            return hashName;
        }

        function getCurentTime(){
            var currentdate = new Date(); 
            var datetime = currentdate.getDate() + "/"
            + (currentdate.getMonth()+1)  + "/" 
            + currentdate.getFullYear() + " @ "  
            + currentdate.getHours() + ":"  
            + currentdate.getMinutes() + ":" 
            + currentdate.getSeconds();
            + currentdate.getMilliseconds();
            return datetime.toString();
        }

    }

}());