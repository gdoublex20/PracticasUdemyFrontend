import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private showTimeout: any;
  private loadingSubject = new BehaviorSubject<boolean>(false); // BehaviorSubject para controlar el estado de carga

  loading$ = this.loadingSubject.asObservable(); // Observable público para suscribirse al estado de carga

  showLoader() {
    this.loadingSubject.next(true); // Activar el estado de carga
  }

  hideLoader(showTime?:any) {
    this.showTimeout = setTimeout(() => {
      this.loadingSubject.next(false);
    }, showTime); 
   }
  }
