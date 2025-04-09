const $$DomTable = function () {
    this.row = function (parent, userId) {
        const row = $dc.createAndAppend(parent, "tr");
        row.id = `${userId}`; // Asignar un ID único por fila
        return row;
    };

    this.dataCell = function (parent) {
        return $dc.createAndAppend(parent, "td");
    };

    this.headerCell = function (parent) {
        return $dc.createAndAppend(parent, "th");
    };

    this.createTable = function () {
        const containerMain = $d.querySelector("main");
        const containerTable = $dc.div(containerMain);
        containerTable.classList.add("container__table");
        $dc.createAndAppend(containerTable, "table");
    };

    this.createThead = function () {
        const table = $d.querySelector("table");
        return $dc.createAndAppend(table, "thead");
    };

    this.createTbody = function () {
        const table = $d.querySelector("table");
        $dc.createAndAppend(table, "tbody");
    };

    let isTable = function () {
        return $d.querySelector("table") !== null;
    };

    this.table = function (listTitles, data) {
        if (isTable()) {
            this.addTbodyItem(data);
        } else {
            this.createTable();
            this.createThead();
            this.createTbody();
            this.addTheadTitle(listTitles);
            this.addTbodyItem(data);
        }
    };

    this.addTheadTitle = function (listTitles) {
        const tableHeader = $d.querySelector("thead");
        const headerRow = this.row(tableHeader);
        listTitles.forEach((title) => {
            const headerCell = this.headerCell(headerRow);
            headerCell.textContent = title;
        });
        const deleteHeaderCell = this.headerCell(headerRow);
        deleteHeaderCell.textContent = "Borrar";
        const editHeaderCell = this.headerCell(headerRow);
        editHeaderCell.textContent = "Modificar";
    };

    this.addTbodyItem = function (data) {
        const tbody = $d.querySelector("tbody");
        data.forEach((userData) => {
            const row = this.row(tbody, userData.ID); // Usar el ID del usuario para el ID de la fila

            Object.entries(userData).forEach(([key, value]) => {
                const cell = this.dataCell(row);
                cell.textContent = value;
            });
            const deleteCell = this.dataCell(row);
            this.createDeleteIcon(deleteCell, userData, row);
            const editCell = this.dataCell(row);
            this.createEditIcon(editCell, userData);
        });
    };

    this.createDeleteIcon = function (parent, userData, row) {
        const icono = $dc.icono(parent, "bi-trash3-fill");
        icono.classList.add("tr__icono--delet");
        icono.addEventListener("click", function () {
            deleteUser(userData, row); // Llamamos a la función de eliminación al hacer clic
        });
    };

    this.createEditIcon = function (parent, userData) {
        const icono = $dc.icono(parent, "bi-pencil-square");
        icono.classList.add("tr__icono--edit");
        icono.addEventListener("click", function () {
            modifyUser(userData); // Llamamos a la función de modificación al hacer clic
        });
    };
};

// Definimos el objeto $f para manejar las funciones globales
if (typeof $f === "undefined") {
    window.$f = {};
}

if (typeof $f.deleteUser === "undefined") {
    $f.deleteUser = function (user) {
        console.log("Eliminando usuario:", user);
    };
}

if (typeof $f.modifyUser === "undefined") {
    $f.modifyUser = function (user) {
        console.log("Modificando usuario:", user);
    };
}

// Función para eliminar un usuario
function deleteUser(user, row) {
    // Si $f.deleteUser no está definido, mostramos un error
    if (!$f || !$f.deleteUser) {
        console.error("Error: $f.deleteUser no está definido");
        return;
    }



    // Mostrar formulario de confirmación de eliminación
    const Submit = async function () {
        try {
            let Fd = new FormData();
            Fd.append("accion", "DELETEUSER");
            Fd.append("ID", user.ID); // Usar solo el ID del usuario

            const res = await Post(Fd); // Llamada al servidor para eliminar el usuario

            console.log(Fd);
            console.log(res);

            if (res !== "OK") {
                alert("Error al eliminar: " + res);
            } else {
                console.log("Usuario eliminado");
                alert("Usuario eliminado");
                $f.deleteUser(user); // Llamamos a la función de eliminación del usuario

                // Eliminar la fila del DOM si la eliminación fue exitosa
                if (row && row.parentNode) {
                    row.parentNode.removeChild(row);
                    z.appendChild(confirmationMessage);
                    z.appendChild(confirmButton);
                    window.history.go(-1);
                    z.onsubmit = Submit;

                }
            }
        } catch (e) {
            alert("Error: " + e.message);
        }
        return false;
    };

    // Limpiar la sección principal antes de mostrar el formulario de confirmación
    $ds.clearSection("main");

   

    // Crear formulario de confirmación con el título "Eliminar Usuario"
    const z = $dc.form("¿Estás seguro de eliminar al usuario?", "Eliminar");

    // Crear un mensaje de confirmación
    const confirmationMessage = document.createElement("p");
    confirmationMessage.textContent = `¿Deseas eliminar al usuario ${user.Nombre}?`;

    // Crear un botón de "Confirmar"
    const confirmButton = document.createElement("button");
    confirmButton.classList.add("bi-trash3-fill", "tr__icono--delet");
    confirmButton.textContent = "Confirmar eliminación";
    confirmButton.addEventListener("click", Submit); // Llamar a la función Submit al hacer clic 
    z.appendChild(confirmationMessage);
    z.appendChild(confirmButton);

    return false;

    z.onsubmit = Submit;

}

// Función para modificar un usuario (por ahora solo muestra un mensaje)
function modifyUser(user) {
    if (!$f || !$f.modifyUser) {
        console.error("Error: $f.modifyUser no está definido");
        return;
    }
    $f.modifyUser(user); // Llamamos a la función para modificar el usuario
}




//Mostrar formulario para modificar usuario
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

// Instanciamos $$DomTable
const $dt = new $$DomTable();
