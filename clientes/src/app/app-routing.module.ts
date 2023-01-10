import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'clientes', loadChildren: () => import('./pages/clients/clients.module').then(m => m.ClientesModule) },
  { path: 'analisis-clientes', loadChildren: () => import('./pages/list-clients/list-clients.module').then(m => m.ListClientsModule) },
  { path: "**", redirectTo: "home", pathMatch: "full" },
  { path: "", redirectTo: "home", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule],
})
export class AppRoutingModule {}