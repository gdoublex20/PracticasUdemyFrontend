import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FieldsetModule } from 'primeng/fieldset';
import { CardModule } from 'primeng/card';


import { ComponentsRoutingModule } from './components-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SharedModule } from 'src/app/shared/shared.module';
import { SpeedDialModule } from 'primeng/speeddial';
import { DialogModule } from 'primeng/dialog'; // Importar DialogModule desde PrimeNG
import { ModalGeneralService } from 'src/app/shared/services/modal/modal-general.service';
import { UserPageComponent } from './user-page/user-page.component';
import { DialogService } from 'primeng/dynamicdialog';
import { WorkingPageComponent } from './working-page/working-page.component';
import { ImageModule } from 'primeng/image';

@NgModule({
  declarations: [
    HomePageComponent,
    UserPageComponent,
    WorkingPageComponent
  ],
  providers: [ModalGeneralService,
    DialogService
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    FieldsetModule,
    CardModule,
    TableModule,
    ButtonModule,
    SharedModule,
    SpeedDialModule,
    DialogModule,
    ImageModule
  ]
})
export class ComponentsModule { }
