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


@NgModule({
  declarations: [
    HomePageComponent
  ],
  providers: [ModalGeneralService],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    FieldsetModule,
    CardModule,
    TableModule,
    ButtonModule,
    SharedModule,
    SpeedDialModule,
    DialogModule
  ]
})
export class ComponentsModule { }
