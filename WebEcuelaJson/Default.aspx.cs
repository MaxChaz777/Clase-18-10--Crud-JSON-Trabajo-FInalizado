using System;
using System.Text.RegularExpressions;
using Crud;
using Newtonsoft.Json;



public partial class _Default : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Request["accion"] == null) return;

        switch (Request["accion"])
        {
                  /*sección usuarios*/

            case "ADDUSUARIO": AddUsuario(); break;
            case "LISTUSUARIOS": ListUsuarios(); break;
            case "MOSTRARUSUARIOS": ListUsers(); break;

            case "DELETEUSER": DeleteUser(); break;
            case "MODIFYUSER": ModifyUser(); break;
            case "FINDUSER": FindUser(); break;

                /*sección carreras*/

            case "ADDCARRERA": AddCarrera(); break;
            case "LISTCARRERAS": ListCarrera(); break;
            case "MOSTRARCARRERAS": ListCarers(); break;


            case "DELETECARRERA": DeleteCarrera(); break;
            case "MODIFYCARRERA": ModifyCarrera(); break;
            case "FINDCARRERA": FindCarrera(); break;
        }
    }

    private void AddUsuario()
    {
        Usuario u = new Usuario();

        if (!int.TryParse(Request["Dni"], out int dni) || dni <= 0 || dni > int.MaxValue)
        {
            Response.Write("Ingrese DNI válido");
            return;
        }

        u.Dni = dni;

        Regex regex = new Regex(@"\d"); // Detecta cualquier dígito del 0 al 9

        u.Nombre = Request["Nombre"];

        if (regex.IsMatch(u.Nombre))
        {
            Response.Write("El nombre no debe contener números.");
            return;
        }

        u.Mail = Request["Mail"];

        try
        {
            u.Add();
            Response.Write("OK");
        }
        catch (Exception er)
        {
            Console.WriteLine(er.Message);
        }
    }

    private void ListUsuarios()
    {
        Usuario u = new Usuario();
        string lista = u.List();
        Response.Write(lista);

    }
    private void ListUsers()
    {
        Usuario u = new Usuario();
        string lista = u.List();
        Response.Write(lista);

    }
    private void ListCarers()
    {
        Usuario u = new Usuario();
        string lista = u.List();
        Response.Write(lista);

    }

    private void DeleteUser()
    {
        Usuario u = new Usuario();
        u.ID = int.Parse(Request["id"]);
        Console.WriteLine(u.ID);

        try
        {
            u.Erase();
            Response.Write("OK");
        }
        catch (Exception er)
        {
            Response.Write(er.Message);
        }
    }

    private void ModifyUser()
    {
        Usuario U = new Usuario();
        U.ID = int.Parse(Request["ID"]);
        U.Mail = Request["Mail"];
        U.Dni = int.Parse(Request["Dni"]);
        U.Nombre = Request["Nombre"];

        try
        {
            U.Modify();
            Response.Write("OK");
        }
        catch (Exception er)
        {
            Response.Write(er.Message);
        }
    }

    private void FindUser()
    {
        Usuario u = new Usuario();
        u.ID = int.Parse(Request["ID"]);
        u.Dni = int.Parse(Request["Dni"]);

        try
        {
            string user = JsonConvert.SerializeObject(u.Find());
            Response.Write(user);
        }
        catch (Exception er)
        {
            Response.Write(er.Message);
        }
    }
    private void AddCarrera() { }

    private void ModifyCarrera() { }

    private void DeleteCarrera() { }
    private void ListCarrera() { }


    private void FindCarrera() { }




}
