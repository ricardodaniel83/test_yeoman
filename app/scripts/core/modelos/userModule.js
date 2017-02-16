(function(){
    'use strict';

    angular
        .module('Urbamapp.modelos')
        .factory('userModel', userModel);
    
    userModel.$inject = [];

    /** @ngInject */
    function userModel(){

        return {
            registro: registro,
            login: login,
            update: update
        }

        function registro(data){

            var userData =  {
                realm: 'handheld',
                username: data.nombre,
                email: data.correo,
                password: data.pass
            };

            return userData;

        }

        function login(data){

            var userData = {
                v:'1.0',
                email: data.correo,
                password: data.pass,
                realm: 'handheld'
            };

            return userData;
        }

        function update(data){
            console.log("Data");
            
           var actualizarUsuario = {
               _profile: {
                    first_name: data.nombre,
                    last_name: data.apellido,
                    full_name: data.nombre + " " + data.apellido,
                    cell_number: data.telefono,
                    birthday: data.nacimiento,
                    gender: data.genero
            }};
            console.log(data);
            return actualizarUsuario;
        }
    }

}());