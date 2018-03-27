import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";

/*
  Generated class for the RobotProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RobotProvider {

  //ipAddress: number;
  url;
  

  setLogin(ip: String, password: String) {
    //debugger
   // this.ipAddress = ip;
   this.url = `http://${ip}/${password}/`;
 }

 

  constructor(public http: HttpClient) {
    console.log('Hello RobotProvider Provider');
    
  }

  getData(input: String):Observable<IResponse>{
    //let req = input;
    //debugger
    return this.http.get<IResponse>(this.url+input);
  }

}

export interface IResponse {
  status: string;
}
