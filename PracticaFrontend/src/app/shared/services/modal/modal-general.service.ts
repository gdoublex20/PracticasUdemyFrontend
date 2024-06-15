import { Injectable } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ModalGeneralComponent } from '../../components/modal-general/modal-general.component';
import { Usuario } from 'src/app/core/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class ModalGeneralService {
  private modalVisible: boolean = false;
  private dialogRef: DynamicDialogRef | null = null;

  constructor(private dialogService: DialogService) { }

  openModal(title: string, tipoOperacion: string, data?: Usuario) {
    if (!this.modalVisible) {
      this.dialogRef = this.dialogService.open(ModalGeneralComponent, {
        header: title,
        width: '35rem',
        height: '100%',
        data: {
          tipoOperacion: tipoOperacion,
          usuario: data,
          visible: true // Propiedad para controlar la visibilidad del modal en ModalGeneralComponent
        }
      });

      this.dialogRef.onClose.subscribe(() => {
        console.log('Modal cerrado');
        this.modalVisible = false; // Actualizar estado al cerrar el modal
      });

      this.modalVisible = true; // Actualizar estado al abrir el modal
    }
  }

  isModalOpen(): boolean {
    return this.modalVisible;
  }

}
