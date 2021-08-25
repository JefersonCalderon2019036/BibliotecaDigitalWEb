import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './componetes/inicio/inicio.component';
import { LoginComponent } from './componetes/login/login.component';
import { MenudenavegacionComponent } from './componetes/menudenavegacion/menudenavegacion.component';
import { PrincipalComponent } from './componetes/principal/principal.component';

const routes: Routes = [
  {path: "menudenavegacion", component: MenudenavegacionComponent},
  {path: "inicio", component: InicioComponent},
  {path: "iniciarsesion", component: LoginComponent},
  {path: "principal", component: PrincipalComponent},
  {path: "**", component: InicioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
