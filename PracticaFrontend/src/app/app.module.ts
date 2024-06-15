import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule, DatePipe } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { LoaderService } from './shared/services/loader/loader.service';
import { SharedModule } from "./shared/shared.module";



@NgModule({
    declarations: [
        AppComponent
    ],
    providers: [
        DialogService,
        MessageService,
        ToastModule,
        LoaderService,
        DatePipe
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ToastModule,
        SharedModule
    ]
})
export class AppModule { }
