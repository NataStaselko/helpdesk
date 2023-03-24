import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menubar/menu/menu.component';
import { MenuViewComponent } from './menubar/menu-view/menu-view.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginModule } from './login/login.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NoPageComponent } from './no-page/no-page.component';
import { AuthInterceptorService } from './core/service/auth-interceptor.service';
import { ErrorComponent } from './Error/error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MenuViewComponent,
    NoPageComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    LoginModule,
    HttpClientModule,
    
  ], 
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
