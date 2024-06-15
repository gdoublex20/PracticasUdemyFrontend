import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefrescarTablaService {

  private llamadaFuncionBSubject = new Subject<void>();

  // Método para emitir un evento para llamar a la función del componente B
  accionador() {
    this.llamadaFuncionBSubject.next();
  }

  // Método para suscribirse al evento desde el componente A
  comunicador() {
    return this.llamadaFuncionBSubject.asObservable();
  }}
