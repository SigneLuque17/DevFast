import { Component, OnInit } from '@angular/core';
import { UsuarioService } from "../../../service/usuario.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  nombreUsuario;
  correo:any = JSON.parse(sessionStorage.getItem("correo"));


  user = {
    logged:true
  }


  constructor(private _usuarioService: UsuarioService) {
    this._usuarioService.getUser(this.correo)
        .subscribe((res:any) => {
          console.log(res.user.nombre);
          this.nombreUsuario=res.user.nombre;
    });

    if (sessionStorage.length == 0) {
      this.user.logged=false;
    }

   }

  ngOnInit(): void {
  }
  
  eliminarData(){
      sessionStorage.clear();
    }
}
