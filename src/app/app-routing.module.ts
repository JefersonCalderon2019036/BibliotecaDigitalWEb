import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CargasComponent } from './componetes/cargas/cargas.component';
import { DetallesdocumentoComponent } from './componetes/detallesdocumento/detallesdocumento.component';
import { DetallesprestamosComponent } from './componetes/detallesprestamos/detallesprestamos.component';
import { InicioComponent } from './componetes/inicio/inicio.component';
import { LibrosComponent } from './componetes/libros/libros.component';
import { LoginComponent } from './componetes/login/login.component';
import { MenudenavegacionComponent } from './componetes/menudenavegacion/menudenavegacion.component';
import { MiperfilComponent } from './componetes/miperfil/miperfil.component';
import { NavegacionAdminComponent } from './componetes/navegacion-admin/navegacion-admin.component';
import { PrestamosComponent } from './componetes/prestamos/prestamos.component';
import { PrincipalComponent } from './componetes/principal/principal.component';
import { RevistasComponent } from './componetes/revistas/revistas.component';
import { UsuariosComponent } from './componetes/usuarios/usuarios.component';

const routes: Routes = [
  {path: "menudenavegacion", component: MenudenavegacionComponent},
  {path: "inicio", component: InicioComponent},
  {path: "iniciarsesion", component: LoginComponent},
  {path: "principal", component: PrincipalComponent},
  {path: "detallesdocumento/:iddocumento", component: DetallesdocumentoComponent},
  {path: "Usuarios", component: UsuariosComponent},
  {path: "Libros", component: LibrosComponent},
  {path: "Revistas", component: RevistasComponent},
  {path: "MiPerfil", component: MiperfilComponent},
  {path: "detallesprestamos/:idprestamo/:carnet", component: DetallesprestamosComponent},
  {path: "cargas", component: CargasComponent},
  {path: "Prestamos", component: PrestamosComponent},
  {path: "navegacion-admin", component: NavegacionAdminComponent},
  {path: "**", component: InicioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
