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



        }


        const $z = {
            deleteUser: function () {
                console.log("Usuario eliminado");
            }
        };



        this.deleteUser = function (user) {
            // Crear función Submit para enviar el formulario de eliminación
            const Submit = async function () {
                try {
                    let Fd = new FormData();
                    Fd.append("accion", "DELETEUSER");
                    Fd.append("ID", user.ID); // Usar solo el ID del usuario

                    const res = await Post(Fd); // Llamada al servidor

                    console.log(Fd);
                    console.log(res);

                    if (res !== "OK") {
                        alert("Error al eliminar: " + res);
                    } else {
                        console.log("Usuario eliminado");
                        $z.deleteUser(); // Aquí el código de eliminación del usuario
                    }
                } catch (e) {
                    alert("Error: " + e.message);
                }
                return false;
            };

            // Limpiar la sección principal antes de mostrar el formulario
            $ds.clearSection("main");
  
            // Crear formulario 2 con el título "Eliminar Usuario"
            const z = $dc.form("¿Estás seguro de eliminar al usuario?", "Eliminar");

            // Crear un mensaje de confirmación
            const confirmationMessage = document.createElement("p");
            confirmationMessage.textContent = `¿Deseas eliminar al usuario ${user.Nombre}?`;

        

            // Añadir el mensaje y el botón al formulario
            z.appendChild(confirmationMessage);
            z.appendChild(confirmButton);
            return false;
            z.onsubmit = Submit;

        };



        const ListUsuarios = function () {
            let fd = new FormData();
            fd.append("accion", "LISTUSUARIOS");
            const res = Post(fd);
            let list;
            try {
                if (res && typeof res === "string") {
                    // Verificar si la respuesta es un JSON válido antes de intentar analizarlo
                    try {
                        list = JSON.parse(res);
                    } catch (jsonError) {
                        throw new Error("Respuesta no válida del servidor: " + res);
                    }
                } else {
                    throw new Error("Respuesta no válida del servidor");
                }
            } catch (e) {
                alert("Error al analizar JSON: " + e.message);
                return;
            }

            try {
                const listTitles = ["ID", "Nombre", "DNI", "Mail"];
                $dt.table(listTitles, list);
            } catch (e) {
                alert("Error al generar la tabla: " + e.message);
            }
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




    this.ListUsers = function () {

        const Submit = function () {
            try {

                document.querySelector("main").innerHTML = "";

//actualizar la página y continuar con el código
             

                let fd = new FormData();

                fd.append("accion", "MOSTRARUSUARIOS");

                const res = Post(fd); 
                let list;



                if (res && typeof res === "string") {
                    try {
                        list = JSON.parse(res); 
                    } catch (jsonError) {
                        throw new Error("Respuesta no válida del servidor: " + res);
                    }
                } else {
                    throw new Error("Respuesta no válida del servidor");
                }

                const listTitles = ["ID", "Nombre", "DNI", "Mail"];

                $dt.table(listTitles, list);

                // Generar la tabla con los datos obtenidos
            } catch (e) {
                alert("Error al mostrar usuarios: " + e.message);
            }
        };


        Submit(); 


    };

    this.ListCarreras = function () {

        const Submit = function () {
            try {

                document.querySelector("main").innerHTML = "";

                let fd = new FormData();

                fd.append("accion", "MOSTRARCARRERAS");

                const res = Post(fd); 
                let list;



                if (res && typeof res === "string") {
                    try {
                        list = JSON.parse(res); // Analizar la respuesta JSON
                    } catch (jsonError) {
                        throw new Error("Respuesta no válida del servidor: " + res);
                    }
                } else {
                    throw new Error("Respuesta no válida del servidor");
                }

                const listTitles = ["ID", "Nombre", "CÓDIGO", "CATEDRA","MAIL"];

                $dt.table(listTitles, list);

                // Generar la tabla con los datos obtenidos
            } catch (e) {
                alert("Error al mostrar usuarios: " + e.message);
            }
        };


        Submit(); // Llamar a la función para ejecutar la lógica


    };

};







const $f = new $$form();
f.reset();

