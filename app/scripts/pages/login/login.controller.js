(function(){
    'use strict';

    angular
        .module('testAngularApp')
        .controller('LoginCtrl', LoginCtrl)

    LoginCtrl.$inject = ['$state', 'LoopBackAuth', 'User', 'helpers'];

    /** @ngInject */
    function LoginCtrl($state, LoopBackAuth, User, helpers){
        var login = this;
        login.auth = auth;
        var alert = document.getElementById('message-box-warning');
        login.showAlert = showAlert;
        login. hideAlert = hideAlert;
        login.verificarDatos = verificarDatos;

        login.data = {
          v:"1.0",
          realm: "handheld",
          email: "",
          password: ""
      }

      login.error = {
        titulo: "",
        mensaje: ""
      }

        login.remember = false;

        init();

        function init(){
            console.log("Aqui es el login");
        }


        function auth(){
            console.log("Autenticacion de usuario");
            console.log(login.data);
            if (login.verificarDatos() === true){
                User.login({rememberMe: login.remember}, login.data).$promise
                  .then(function(user){
                    console.log("Usuario");
                    console.log(user);
                    console.log(LoopBackAuth.accessTokenId);
                    $state.go('main.dashboard');
                  })
                  .catch(function(err){
                    console.log("Aqui va un error");
                    console.log(err);
                    err.status === 401 ? login.showAlert('Datos incorrectos', 'Los datos que ingresaste estan incorrectos, verifica que el correo electrónico y la contraseña esten bien escritos') : console.log("Error");
                  });
            }
            else{
              console.log("Error de Verificacion");
            }
        }


        function showAlert(titulo, mensaje){
          login.error.titulo = titulo;
          login.error.mensaje = mensaje;
          alert.className = "message-box message-box-warning animated fadeIn open";
        }

        function hideAlert(){
          alert.className = "message-box message-box-warning animated fadeIn";
        }



        function verificarDatos(){
            if (login.data.email === "" || login.data.password === ""){
                console.log('falta un dato');
                login.showAlert('Faltan datos', 'Verfica que el usuario y contraseña esten escritos.');
                return false;
            }else if(helpers.validateEmail(login.data.email) === false){
                console.log('formato de correo incorrecto');
                login.showAlert('Formato invalido', 'Verfica que el correo electronico tenga un formato valido.');
                return false;
            }
            else{
                console.log(login.data.email);
                console.log(login.data.password);
                return true;
            }
        }




  }

}());
