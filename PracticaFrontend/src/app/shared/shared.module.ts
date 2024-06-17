import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { ModalGeneralComponent } from './components/modal-general/modal-general.component';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { SpeedDialModule } from 'primeng/speeddial';
import { ModalGeneralService } from './services/modal/modal-general.service';
import { DividerModule } from 'primeng/divider';
import { ReactiveFormsModule } from '@angular/forms';
import { UploadImageComponent } from './components/upload-image/upload-image.component';
import { FileUploadModule } from 'primeng/fileupload';
import { CardModule } from 'primeng/card';
import { MessageService } from 'primeng/api';
import { ImageModule } from 'primeng/image';
import { LoaderComponent } from './components/loader/loader/loader.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { PasswordModule } from 'primeng/password';
import { ModalEliminarComponent } from './components/modal-eliminar/modal-eliminar.component';
import { MoldaEliminarService } from './services/modalEliminar/molda-eliminar.service';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SidebarModule } from 'primeng/sidebar';

@NgModule({
  declarations: [
    HeaderComponent,
    ModalGeneralComponent,
    UploadImageComponent,
    LoaderComponent,
    ModalEliminarComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    AvatarModule,
    AvatarGroupModule,
    MenuModule,
    ButtonModule,
    SpeedDialModule,
    DialogModule,
    DividerModule,
    ReactiveFormsModule,
    FileUploadModule,
    CardModule,
    ImageModule,
    ProgressSpinnerModule,
    PasswordModule,
    SidebarModule

  ],
  providers: [
    ModalGeneralService,
    MoldaEliminarService
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    ModalGeneralComponent,
    ModalEliminarComponent,
    LoaderComponent
  ]
})
export class SharedModule { }
