import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnDestroy{
  isLoading = false;
  private loadingSubscription: Subscription;

  constructor(private loadingService: LoaderService) {
    this.loadingSubscription = this.loadingService.loading$.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe(); // Desuscribirse para evitar fugas de memoria
  }
}
