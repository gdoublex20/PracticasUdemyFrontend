import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Usuario } from 'src/app/core/models/usuario';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { ModalGeneralService } from 'src/app/shared/services/modal/modal-general.service';
import { MoldaEliminarService } from 'src/app/shared/services/modalEliminar/molda-eliminar.service';
import { RefrescarTablaService } from 'src/app/shared/services/refrescarTabla/refrescar-tabla.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent {
  usuarios: Usuario[] = [];
  items: MenuItem[] = [];
  creationDateFormateada!:Date;
  lastDateFormateada!: Date;
  userRole: any;

  constructor(
    private usuariosService: UserService, 
    private modalService: ModalGeneralService, 
    private modalEliminar: MoldaEliminarService,
    private loaderService: LoaderService,
    private refrescarTabla: RefrescarTablaService
    ){}

  ngOnInit(): void {
    this.refrescarTabla.comunicador().subscribe(() => {
      this.findAll();
    })
    this.findAll();
    this.userRole = localStorage.getItem('userRole');
    console.log(this.userRole);
    
  }



  findAll(){
    this.loaderService.showLoader();
    this.usuariosService.findAllUsers().subscribe((response: Usuario[]) => {
      this.usuarios = response;
      this.loaderService.hideLoader();
    })
  }

  openModal() {
    const tipoOperacion: string = 'Agregar';
    const title: string = 'Agregar Usuario'
    this.modalService.openModal(title, tipoOperacion); 
  }

  abrirModalVerDetalle(usuario: Usuario) 
  {
    const tipoOperacion: string = 'Ver';
    const title: string = 'Perfil Del Usuario';
    this.modalService.openModal(title, tipoOperacion, usuario);
  }

  abrirModalEditarUsuario(usuario: Usuario) 
  {
    const tipoOperacion: string = 'Editar';
    const title: string = 'Editar Perfil Del Usuario';
    this.modalService.openModal(title, tipoOperacion, usuario);
  }

  EliminarUsuarioDialog(usuario: Usuario) 
  {
    const tipoOperacion: string = 'Eliminar';
    const title: string = 'Eliminar Usuario';
    this.modalEliminar.openModal(title, tipoOperacion, usuario);
  }
}
