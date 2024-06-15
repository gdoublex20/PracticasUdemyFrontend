import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalGeneralService } from '../../services/modal/modal-general.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { Usuario } from 'src/app/core/models/usuario';
import { UploadImageComponent } from '../upload-image/upload-image.component';
import { Message, MessageService } from 'primeng/api';
import { ToasterService } from '../../services/toaster/toaster.service';
import { LoaderService } from '../../services/loader/loader.service';

@Component({
  selector: 'app-modal-general',
  templateUrl: './modal-general.component.html',
  styleUrls: ['./modal-general.component.css']
})
export class ModalGeneralComponent {
  imagenBase64!: string;
  usuarioForm !: FormGroup;
  messages: Message[] = [];
  activarBotonGuardar: boolean = true;
  nuevaImagen!:string;
  banderaPassword: boolean = true; 

  usuarios: Usuario[] = [];
  usuario!: Usuario;
  imagen !: string;
  tipoOp !:any;
  @ViewChild('uploadImageComponent') uploadImageComponent!: UploadImageComponent;

  passwordVisible: boolean = false;
  repasswordVisible: boolean = false;

  constructor
  (
    public ref: DynamicDialogRef, 
    public config: DynamicDialogConfig, 
    private fb: FormBuilder, 
    private userService: UserService, 
    private messageService: ToasterService,
    private loadingService: LoaderService 
  ) 
  {
    
    this.usuario = config.data.usuario;
    this.usuarioForm = this.fb.group({
      name        : [this.usuario?.name         || ''             , Validators.required],
      lastname    : [this.usuario?.lastname     || ''             , Validators.required],
      username    : [this.usuario?.username     || ''             , Validators.required],
      email       : [this.usuario?.email        || ''             , Validators.required],
      password    : [this.usuario?.password     || ''             , [Validators.required, Validators.minLength(5)]],
      repassword  : [this.usuario?.password     || ''           , Validators.required],
      avatar      : [this.usuario?.avatar       || ''],
      creationDate: [this.usuario?.creationDate || ''],
      lastDate    : [this.usuario?.lastDate     || ''], 
      role        : [this.usuario?.role         || 'RECEPCIONISTA', Validators.required]
    },
    {
      validator: this.PasswordMatcher('password', 'repassword')
    }
    );

    this.imagen = this.usuario?.avatar;
    switch(config.data.tipoOperacion) {
      case 'Ver':
        this.usuarioForm.disable();
        this.tipoOp = 1;
        this.banderaPassword = false;
        this.activarBotonGuardar = false;
        break;
      case 'Editar':
        this.tipoOp = 2;
        this.banderaPassword = false;
        this.activarBotonGuardar = true;
        break;
      case 'Agregar':
        this.tipoOp = 3;
        this.activarBotonGuardar = true;
    };
    
    
  }

  PasswordMatcher(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['passwordMismatch']) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ passwordMismatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  togglePasswordVisibility(fieldId: string) {
    if (fieldId === 'password') {
        this.passwordVisible = !this.passwordVisible;
        const passwordInput = document.getElementById('password') as HTMLInputElement;
        if (passwordInput) {
            passwordInput.type = this.passwordVisible ? 'text' : 'password';
        }
    } else if (fieldId === 'repassword') {
        this.repasswordVisible = !this.repasswordVisible;
        const repasswordInput = document.getElementById('repassword') as HTMLInputElement;
        if (repasswordInput) {
            repasswordInput.type = this.repasswordVisible ? 'text' : 'password';
        }
    }
  }


  close() {
    this.ref.close();
  }
  btnGuardar() {
    if(this.tipoOp === 2){
      this.updateUser();
    } else if (this.tipoOp === 3){
      this.createUser();
    }
  }

  createUser(){
    this.loadingService.showLoader();
    const usuario: Usuario = {
      name: this.usuarioForm.value.name,
      lastname: this.usuarioForm.value.lastname,
      username: this.usuarioForm.value.username,
      email: this.usuarioForm.value.email,
      password: this.usuarioForm.value.password,
      creationDate: new Date(),
      lastDate: null,
      avatar: this.imagenBase64,
      role: this.usuarioForm.value.role
    };

   this.userService.createUser(usuario).subscribe({next: response => {
      // manejar la respuesta del inicio de sesión según lo necesites
      this.usuarioForm.reset();
      this.uploadImageComponent.removeImage();
      this.loadingService.hideLoader(); // Ocultar el spinner de carga al recibir la respuesta
      this.messageService.showSuccess('Usuario agregado con exito');
    }, error: error => {
      // manejar errores de inicio de sesión
      console.error('Login error:', error);
    }});
  }

  updateUser(){
    this.loadingService.showLoader();
    if(this.imagenBase64) {
      this.nuevaImagen = this.imagenBase64;
      console.log(this.nuevaImagen);
    } else {
      this.nuevaImagen = this.imagen;
    }
    const usuario: Usuario = {
      name: this.usuarioForm.value.name,
      lastname: this.usuarioForm.value.lastname,
      username: this.usuarioForm.value.username,
      email: this.usuarioForm.value.email,
      password: this.usuarioForm.value.password,
      creationDate: this.usuarioForm.value.creationDate,
      lastDate: new Date(),
      avatar: this.nuevaImagen,
      role: this.usuarioForm.value.role
    };    
    this.userService.updateUser(usuario, this.usuario.id).subscribe({next: response => {
      // manejar la respuesta del inicio de sesión según lo necesites
      this.loadingService.hideLoader(); // Ocultar el spinner de carga al recibir la respuesta
      this.messageService.showSuccess('Se ha realizado la edicion con exito');
      
    }, error: error => {
      // manejar errores de inicio de sesión
      console.error('Login error:', error);
    }});

  }

  findAll(){
    this.userService.findAllUsers().subscribe((response: Usuario[]) => {
      this.usuarios = response;
      this.usuarios
    })
  }
  
  obtenerImagen64(imageUrl: string) {
    this.imagenBase64 = imageUrl;
    
  }
}


