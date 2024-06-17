import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  mainMenu: {
    defaultOptions: Array<any>, accessLink: Array<any>
  } = { defaultOptions: [], accessLink: [] }

  customOptions: Array<any> = []

  constructor(private router: Router) { }

  ngOnInit(): void {

    this.customOptions = [
      {
        name: 'Ejemplo',
        icon: 'pi pi-hammer',
        router: ['/', 'working']
      },
      {
        name: 'Usuarios',
        icon: 'pi pi-users',
        router: ['/', 'usuarios']
      }
    ]

  }
  isSelected(item: any): boolean {
    return this.router.isActive(item.router.join('/'), true);
  }
}
