import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenudenavegacionComponent } from './componetes/menudenavegacion/menudenavegacion.component';
import { InicioComponent } from './componetes/inicio/inicio.component';
import { LoginComponent } from './componetes/login/login.component';
import { PrincipalComponent } from './componetes/principal/principal.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DetallesdocumentoComponent } from './componetes/detallesdocumento/detallesdocumento.component';
import { UsuariosComponent } from './componetes/usuarios/usuarios.component';
import { LibrosComponent } from './componetes/libros/libros.component';
import { RevistasComponent } from './componetes/revistas/revistas.component';
import { MiperfilComponent } from './componetes/miperfil/miperfil.component';

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
    MiperfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
