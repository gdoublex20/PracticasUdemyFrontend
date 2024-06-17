import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { LoaderService } from '../../shared/services/loader/loader.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private loaderService: LoaderService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(request).pipe(
          catchError((error: HttpErrorResponse) => {
              if (error.status === 401 || error.status === 403) {
                  this.handleAuthError();
              }
              return throwError(error);
          })
      );
  }

  private handleAuthError() {
      this.loaderService.hideLoader();
      localStorage.removeItem('currentUser');

    }
}