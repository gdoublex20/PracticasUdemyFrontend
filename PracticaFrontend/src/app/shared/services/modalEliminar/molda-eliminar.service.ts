import { Injectable } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Usuario } from 'src/app/core/models/usuario';
import { ModalEliminarComponent } from '../../components/modal-eliminar/modal-eliminar.component';

@Injectable({
  providedIn: 'root'
})
export class MoldaEliminarService {

  private modalVisible: boolean = false;
  private dialogRef: DynamicDialogRef | null = null;

  constructor(private dialogService: DialogService) { }

  openModal(title: string, tipoOperacion: string, data?: Usuario) {
    if (!this.modalVisible) {
      this.dialogRef = this.dialogService.open(ModalEliminarComponent, {
        header: title,
        width: '30rem',
        height: '40%',
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
