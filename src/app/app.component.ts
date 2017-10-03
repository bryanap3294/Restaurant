import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  ngOnInit(){
    firebase.initializeApp({
      apiKey: "AIzaSyBN7jfpfAwhc5Q9pSCAfbangn6ee9iS_Bo",
      authDomain: "restaurant-9ea70.firebaseapp.com"
    });
  }

}
