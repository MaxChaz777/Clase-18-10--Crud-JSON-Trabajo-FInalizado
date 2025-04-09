const $$Nav=function(){

    this.init = () => {
        $ds.nav("body");
        $dn.makeButton("Inicio", $ds.home);
        $dn.makeButtonLogin("Ingresar");
        $dn.makeDropDown("Carreras", ["Agregar carrera", "Buscar Carrera"], [$f.addCarrera, $f.findCarrera]);
        $dn.makeDropDown("Usuarios",["Agregar usuario","Buscar Usuario"],[$f.addUser,$f.findUser]);

        $dn.makeDropDown("Listas",["Listas de usuarios","Listas de carreras"],[$f.ListUsers, $f.ListCarreras]);

    }

}

const $nav=new $$Nav
