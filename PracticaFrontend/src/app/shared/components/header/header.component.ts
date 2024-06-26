import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from 'src/app/core/models/usuario';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { LoaderService } from '../../services/loader/loader.service';
import { ModalGeneralService } from '../../services/modal/modal-general.service';
import { RefrescarTablaService } from '../../services/refrescarTabla/refrescar-tabla.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  usuario!: Usuario;
  showTimeout !: any;
  items: MenuItem[] = [
    { label: 'Perfil', icon: 'pi pi-user', command: () => this.verPerfil() },
    { label: 'Salir', icon: 'pi pi-sign-out', command: () => this.logout()}
  ];
  @ViewChild('menu') menu: any; // Referencia al menú desplegable
  constructor
  (
    private userService: UserService,
    private router: Router, 
    private loaderService: LoaderService,
    private modalService: ModalGeneralService,
    private refrescarTabla: RefrescarTablaService
     ) { }

  toggleMenu(event: any) {
    this.menu.toggle(event);
  }
  ngOnInit(): void {
    this.refrescarTabla.comunicador().subscribe(() => {
      this.findUser();
    })
    this.findUser();
  }

  logout(): void {
    this.loaderService.showLoader();
    this.loaderService.hideLoader(2000);
      localStorage.removeItem('currentUser');  
      this.router.navigate(['/auth'])
  }
  findUser(): void {
    const username = JSON.parse(localStorage.getItem('currentUser') || '{}')?.username;
    this.userService.findByUsername(username)
      .subscribe((response: Usuario) => {
        this.usuario = response;
        localStorage.setItem('userRole', this.usuario.role);
      });
  }
  verPerfil(){
    const tipoOperacion: string = 'Ver';
    const title: string = 'Ver Perfil'
    this.modalService.openModal(title, tipoOperacion, this.usuario);
  }
  }

