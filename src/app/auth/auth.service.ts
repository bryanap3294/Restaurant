import {Router} from '@angular/router';
import * as firebase from 'firebase';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthService{
  token: string;
  constructor(private router: Router){

  }
   responseSignUp: boolean;
   errorSignIn: string = '';
   responseCode: number;
   mensaje: string = '';

  signupUser(email: string, password: string){
    firebase.auth().createUserWithEmailAndPassword(email, password).then(
      response => {
        this.responseSignUp = true;
        this.responseCode= 1;
        this.mensaje = 'Su usuario se generó correctamente, por favor dirigirse a la pestaña Log In y autenticarse.';
        //console.log(firebase.auth().currentUser);
        // firebase.auth().currentUser.sendEmailVerification();
      }
    )
    .catch(
      error => {console.log(error),
        this.responseSignUp = true;
        this.responseCode=2;
      this.mensaje = error.toString();
      }
    )
  }

  signinUser(email: string, password: string){
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(
      response => {
        this.router.navigate(['/']);
        firebase.auth().currentUser.getToken()
        .then(
          (token: string) => this.token = token
        );
      }
    )
    .catch(
      error => {console.log(error)
      this.errorSignIn = error.toString();}
    );
  }

  logOut(){
    firebase.auth().signOut();
    this.token = null;
  }

  getToken(){
    firebase.auth().currentUser.getToken()
    .then(
      (token: string) => this.token = token
    );
    return this.token;
  }

  isAuthenticated(){
    return this.token != null;
  }

}
