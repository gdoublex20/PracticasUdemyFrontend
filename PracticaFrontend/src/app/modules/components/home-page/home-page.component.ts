import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/core/models/usuario';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { ModalGeneralComponent } from 'src/app/shared/components/modal-general/modal-general.component';
import { ModalGeneralService } from 'src/app/shared/services/modal/modal-general.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  providers: [DialogService] 
})
export class HomePageComponent implements OnInit{

  usuarios: Usuario[] = [];
  items: MenuItem[] = [];
  creationDateFormateada!:Date;
  lastDateFormateada!: Date;

  constructor(
    private usuariosService: UserService, 
    private modalService: ModalGeneralService, 
    private loaderService: LoaderService){}

  ngOnInit(): void {
    this.findAll();
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
    this.modalService.openModal(title, tipoOperacion); // Llama al método openModal del servicio para abrir el modal
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
    const tipoOperacion: string = 'Editar';
    const title: string = 'Editar Perfil Del Usuario';
    this.modalService.openModal(title, tipoOperacion, usuario);
  }
}