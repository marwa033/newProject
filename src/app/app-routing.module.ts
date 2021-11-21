import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent }   from './main/main.component';
import { AuthGuard } from './core/guards/auth.guard';
import { config } from 'rxjs';

const appRoutes: Routes = [
   {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
   },
   {	
      path: 'session',
      loadChildren: () => import('./session/session.module').then(m => m.SessionModule)
   },
   {
      path: '',
      component: MainComponent,
      canActivate: [AuthGuard],
      runGuardsAndResolvers: 'always',
      children: [
         {  path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)}
      ]
   },
   {
      path: '**',
      redirectTo: 'session/login'
   }
]

@NgModule({
  	imports: [RouterModule.forRoot(appRoutes , {onSameUrlNavigation: 'reload'})],
 	exports: [RouterModule],
  	providers: []
})
export class RoutingModule { }
