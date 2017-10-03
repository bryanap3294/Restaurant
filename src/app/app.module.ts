import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
<<<<<<< HEAD
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
=======
import {AuthModule} from './auth/auth.module';
>>>>>>> 1d7f9b4a2a84e62629804463697883726f5e3c3f

@NgModule({
  declarations: [
    AppComponent,
<<<<<<< HEAD
    SignupComponent,
    SigninComponent
=======
>>>>>>> 1d7f9b4a2a84e62629804463697883726f5e3c3f
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    AuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
