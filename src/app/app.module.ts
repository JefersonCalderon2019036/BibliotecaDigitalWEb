import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from '@rinminase/ng-charts';

import { MenudenavegacionComponent } from './componetes/menudenavegacion/menudenavegacion.component';
import { InicioComponent } from './componetes/inicio/inicio.component';
import { LoginComponent } from './componetes/login/login.component';
import { PrincipalComponent } from './componetes/principal/principal.component';
import { DetallesdocumentoComponent } from './componetes/detallesdocumento/detallesdocumento.component';
import { UsuariosComponent } from './componetes/usuarios/usuarios.component';
import { LibrosComponent } from './componetes/libros/libros.component';
import { RevistasComponent } from './componetes/revistas/revistas.component';
import { MiperfilComponent } from './componetes/miperfil/miperfil.component';
import { DetallesprestamosComponent } from './componetes/detallesprestamos/detallesprestamos.component';
import { PrestamosComponent } from './componetes/prestamos/prestamos.component';
import { CargasComponent } from './componetes/cargas/cargas.component';
import { NavegacionAdminComponent } from './componetes/navegacion-admin/navegacion-admin.component';
import { GraficasComponent } from './componetes/graficas/graficas.component';

@NgModule({
  declarations: [
    AppComponent,
    MenudenavegacionComponent,
    InicioComponent,
    LoginComponent,
    PrincipalComponent,
    DetallesdocumentoComponent,
    UsuariosComponent,
    LibrosComponent,
    RevistasComponent,
    MiperfilComponent,
    DetallesprestamosComponent,
    PrestamosComponent,
    CargasComponent,
    NavegacionAdminComponent,
    GraficasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
