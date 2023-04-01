import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'explorer', loadChildren: () => import('./pages/explorer/explorer.module').then(m => m.ExplorerModule) },
  { path: '**', pathMatch: 'full', loadChildren: () => import('./pages/page-not-found/page-not-found.module').then(m => m.PageNotFoundModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
