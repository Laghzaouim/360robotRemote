import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {HttpClient} from '@angular/common/http'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

data: any;
error: any
url = 'http://192.168.1.27/gpio/';

  
  constructor(public navCtrl: NavController, public http: HttpClient) {

  }
  
  goLeft() {
    
    return this.http.get(this.url+"L").
    subscribe(result => this.data = result
    )};
    
    
    goRight() {
      
      return this.http.get(this.url+"R").
      subscribe(result => this.data = result
      )}

      goForward() {
        
        return this.http.get(this.url+"F").
        subscribe(result => this.data = result
        )}

        goBackward() {
          
          return this.http.get(this.url+"B").
          subscribe(result => this.data = result
          )}
}

