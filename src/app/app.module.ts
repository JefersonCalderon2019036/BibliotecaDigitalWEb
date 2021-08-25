import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenudenavegacionComponent } from './componetes/menudenavegacion/menudenavegacion.component';
import { InicioComponent } from './componetes/inicio/inicio.component';
import { LoginComponent } from './componetes/login/login.component';
import { PrincipalComponent } from './componetes/principal/principal.component';

@NgModule({
  declarations: [
    AppComponent,
    MenudenavegacionComponent,
    InicioComponent,
    LoginComponent,
    PrincipalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
