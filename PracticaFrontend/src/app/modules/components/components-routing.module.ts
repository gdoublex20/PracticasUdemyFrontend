import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserPageComponent } from './user-page/user-page.component';
import { WorkingPageComponent } from './working-page/working-page.component';

const routes: Routes = [
  {
    path: 'usuarios',
    component: UserPageComponent
  },
  {
    path: 'working',
    component: WorkingPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
