import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServerMonitorComponent } from './components/server-monitor/server-monitor.component';

const routes: Routes = [
  { path: 'monitoring', component: ServerMonitorComponent },
  { path: '',   redirectTo: '/monitoring', pathMatch: 'full' }, // redirect to `first-component`
  { path: '**', component:  ServerMonitorComponent},  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
