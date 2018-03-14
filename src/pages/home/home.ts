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
  
  sendReq(input: String) {
    let req = input;
    return this.http.get(this.url+req).
    subscribe(result => this.data = result
    )};
}

