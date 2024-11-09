const $$form = function () {
  this.addUser = function () {
      const Submit = function () {

          try {
              let Fd = new FormData();
              Fd.append("accion", "ADDUSUARIO");
              Fd.append("Nombre", nombre.value);
              Fd.append("Mail", mail.value);
              Fd.append("Dni", dni.value);

              const res = Post(Fd);
              if (res !== "OK") alert(res);
              $f.addUser();
          }
        
          catch (e) { alert(e); }
          return false;


        //const res = Post(Fd);
        //try {
        //    MainUser = JSON.parse(res);       
        //}
        //catch (e) { alert(res); }
        //return false;
        //f.reset();
        
      
      }


      const ListUsuarios = function () {
          let fd = new FormData();
          fd.append("accion", "LISTUSUARIOS");
          const res = Post(fd);
          let list
          try {
              list = JSON.parse(res);

          }
          catch (e) { alert(e); }

          listTitles = ["ID", "Nombre", "DNI", "Mail"];
          $dt.table(listTitles, list);
          return;
      };




      this.modifyUser = function (user) {

          const Submit = function () {
              try {
                  let Fd = new FormData();
                  Fd.append("accion", "MODIFYUSER");
                  Fd.append("ID", user.ID);
                  Fd.append("Nombre", nombre.value);
                  Fd.append("Mail", mail.value);
                  Fd.append("Dni", dni.value);
                  let res = Post(Fd);
                  if (res !== "OK") alert(res);
                  $f.addUser();
              } catch (e) {
                  alert(e);
              }
              return false;
          }

      $ds.clearSection("main");

      // Crea un formulario con el título "Modificar Usuario" y un botón con el texto "Modificar"
      const f = $dc.form("Modificar Usuario", "Modificar");

      // Crea campos de entrada para nombre, DNI y correo electrónico
      const nombre = $dc.addInputForm("text", "Nombre", "name-user");
      const dni = $dc.addInputForm("number", "DNI", "dni-user");
      const mail = $dc.addInputForm("email", "Mail", "mail-user");

      // Asigna los valores del objeto 'user' a los campos del formulario
      nombre.value = user.Nombre;
      dni.value = user.Dni;
      mail.value = user.Mail;

      // Asigna la función 'Submit' como manejador del evento 'onsubmit' del formulario
      f.onsubmit = Submit;
    };







    $ds.clearSection("main");
    const f = $dc.form("Agregar Usuario", "Agregar");
    const nombre = $dc.addInputForm("text", "Nombre", "name-user");
    const dni = $dc.addInputForm("number", "DNI", "dni-user");
    const mail = $dc.addInputForm("email", "Mail", "mail-user");
   
      f.onsubmit = Submit;

    ListUsuarios();
    
  };
};

const $f = new $$form();


f.reset();



/*Configura la petición HTTP:
"POST": Indica que se trata de una petición de tipo POST (para enviar datos al servidor).
"Default.aspx": Especifica la URL del recurso al que se enviarán los datos.
false: Indica que la petición es síncrona, lo que significa que el código se detendrá hasta que se reciba la respuesta del servidor. */

/*La petición ha terminado: El valor readyState === 4 nos confirma que la operación de la petición ha finalizado, ya sea con éxito o con un error.
La petición fue exitosa: El valor status === 200 nos indica específicamente que la petición fue exitosa y el servidor respondió con el recurso solicitado. */
