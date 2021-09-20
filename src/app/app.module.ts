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
import { CommonModule } from '@angular/common';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from 'src/environments/environment.prod';
import { DetallesprestamosComponent } from './componetes/detallesprestamos/detallesprestamos.component';
import { PrestamosComponent } from './componetes/prestamos/prestamos.component';
import { CargasComponent } from './componetes/cargas/cargas.component';
import { NavegacionAdminComponent } from './componetes/navegacion-admin/navegacion-admin.component';

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
    NavegacionAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
