import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FotosComponent } from "./components/fotos/fotos.component";
import { SubidaComponent } from './components/subida/subida.component';


const routes: Routes = [
  { path: 'fotos', component: FotosComponent, data: { titulo: 'Galería de Fotos' } },
  { path: 'subida', component: SubidaComponent, data: { titulo: 'Subida de Fotos' } },
  { path: '**', pathMatch: 'full', redirectTo: '/fotos' },
  { path: '', pathMatch: 'full', redirectTo: '/fotos' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }