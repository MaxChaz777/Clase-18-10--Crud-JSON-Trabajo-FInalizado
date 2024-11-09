using Microsoft.SqlServer.Server;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Crud
{
    internal interface IUsuario
    {
        string Nombre { get; set; }
        int Dni { get; set; } 
        String Mail { get; set; }

        bool DniExist(int dni);
        bool MailExist(string mail);
        Usuario FindMail(string mail);
        Usuario FindDni(int dni);

       string List();
    }
}
