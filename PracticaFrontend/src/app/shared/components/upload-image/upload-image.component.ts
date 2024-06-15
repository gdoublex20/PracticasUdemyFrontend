import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToasterService } from '../../services/toaster/toaster.service';
import { LoaderService } from '../../services/loader/loader.service';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {
  @Output() imagen64: EventEmitter<string> = new EventEmitter();
  @Output() borrarImagen: EventEmitter<void> = new EventEmitter<void>();
  @Input() verImagen!: string;
  @Input() tipoOperacion!:any;

  imageUrl!: string;
  bandera: boolean = true;
  

  constructor(private messageService: ToasterService, private loadingService: LoaderService) {
  }
  ngOnInit(): void {
    this.imageUrl = this.verImagen;
    if(this.imageUrl && this.tipoOperacion === 1) {
      this.bandera = false;
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
        this.imagen64.emit(this.imageUrl);
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage() {    
    this.imageUrl = ''; 
    this.imagen64.emit(this.imageUrl);
  }

}
