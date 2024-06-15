import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserService } from '../../services/user/user.service';
import { ToasterService } from '../../services/toaster/toaster.service';
import { LoaderService } from '../../services/loader/loader.service';
import { Usuario } from 'src/app/core/models/usuario';
import { RefrescarTablaService } from '../../services/refrescarTabla/refrescar-tabla.service';

@Component({
  selector: 'app-modal-eliminar',
  templateUrl: './modal-eliminar.component.html',
  styleUrls: ['./modal-eliminar.component.css']
})
export class ModalEliminarComponent implements OnInit{

  usuarioId!: number;
  usuario!: Usuario;
  usuarioEliminar!:Usuario;
  constructor
  (
    public ref: DynamicDialogRef, 
    public config: DynamicDialogConfig, 
    private userService: UserService, 
    private messageService: ToasterService,
    private loadingService: LoaderService,
    private refrescarTablaService: RefrescarTablaService
  ) 
  {
    this.usuarioId = config.data.usuario.id;
    this.usuarioEliminar = config.data.usuario;
  }
  ngOnInit(): void {
    this.obtenerUsuarioLogeado();
  }

  cerrarModal() {
    this.ref.close();
  }

  borrarUsuario()
  {
    this.userService.deleteUser(this.usuarioId).subscribe({next: response => {
      this.refrescarTablaService.accionador();
      this.loadingService.hideLoader();
      this.ref.close();
      this.messageService.showSuccess('Usuario borrado con exito');
    }, error: error => {
      // manejar errores de inicio de sesión
      console.error('Login error:', error);
    }});
  }

  validarUsuarioLogeado() {
    this.loadingService.showLoader();
    if(this.usuarioEliminar.id === this.usuario.id)
    {
      this.loadingService.hideLoader(500);
      setTimeout(() => {
        this.messageService.showError('No puedes borrar tu usuario si estas logeado');
      }, 500); 
      
    } 
    else 
    {
      this.borrarUsuario();
    }
  }

  obtenerUsuarioLogeado():void {
    const username = JSON.parse(localStorage.getItem('currentUser') || '{}')?.username;
    this.userService.findByUsername(username)
      .subscribe((response: Usuario) => {        
        this.usuario = response;
      });
  }
}
