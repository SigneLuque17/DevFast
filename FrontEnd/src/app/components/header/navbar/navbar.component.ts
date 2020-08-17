import { Component, OnInit } from '@angular/core';
import { UsuarioService } from "../../../service/usuario.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  nombreUsuario;
  correo:any = JSON.parse(localStorage.getItem("correo"));


  user = {
    logged:true,
    nombre:'Signe Luque'
  }


  constructor(private _usuarioService: UsuarioService) {
    this._usuarioService.getUser(this.correo)
        .subscribe((res:any) => {
          console.log(res.user.nombre);
          this.nombreUsuario=res.user.nombre;
    });
   }

  ngOnInit(): void {
  }
  
  eliminarData(){
      localStorage.clear();
    }
}
