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
            //const f = $dc.form("Modificar Usuario", "Modificar");

            // Crear un mensaje de confirmación
            const confirmationMessage = document.createElement("p");
            confirmationMessage.textContent = `¿Deseas eliminar al usuario ${user.Nombre}?`;

            // Crear un botón de "Confirmar"
            const confirmButton = document.createElement("button");
            confirmButton.classList.add("bi-trash3-fill", "tr__icono--delet");
            confirmButton.textContent = "Confirmar eliminación";
            confirmButton.addEventListener("click", Submit); // Llamar a la función Submit al hacer clic

            // Añadir el mensaje y el botón al formulario
            z.appendChild(confirmationMessage);
            z.appendChild(confirmButton);
            f.appendChild(confirmationMessage);
            f.appendChild(confirmButton);
            return false;
            z.onsubmit = Submit;

        };





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
