const $$Nav=function(){

    this.init = () => {
        $ds.nav("body");
        $dn.makeButton("Inicio",$ds.home);
        $dn.makeButton("Carrera",$f.addUser);
        $dn.makeButtonLogin("Ingresar")
        $dn.makeDropDown("Funciones",["Agregar usuario","Buscar Usuario"],[$f.addUser,$f.findUser]);

    }

}

const $nav=new $$Nav