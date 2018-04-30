import { Component } from '@angular/core';
import { NavController, Loading, AlertController, LoadingController, NavParams } from 'ionic-angular';
import { RobotProvider, IResponse } from '../../providers/robot/robot';
import {Paho} from 'ng2-mqtt/mqttws31';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  client;

data: IResponse;
loading: Loading;

status: String
 
  constructor(public navCtrl: NavController, public provider: RobotProvider, public navParams: NavParams, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
    this.client = new Paho.MQTT.Client('broker.hivemq.com', 8000, 'qwerty12345rgdgfr65564dgf');
    
    this.client.connect({onSuccess: this.onConnected.bind(this)});
    this.onMessage();
    this.onConnectionLost();
  }

  onConnected() {
  
    console.log("Connected");
    this.client.subscribe("outTopicMoIoT");
    this.sendReq('1');
    //debugger
  }

  public sendReq(message: string) {
    //debugger
    let packet = new Paho.MQTT.Message(message);
    packet.destinationName = "inTopicMoIoT";
    this.client.send(packet);
  }

  onMessage() {
    this.client.onMessageArrived = (message: Paho.MQTT.Message) => {
      console.log('Message arrived : ' + message.payloadString);
    };
  }

  onConnectionLost() {
    //debugger
    this.client.onConnectionLost = (responseObject: Object) => {
      console.log('Connection lost : ' + JSON.stringify(responseObject));
    };
  }

  // sendReq(input: String) {
  //   let req = input;
     
  //    this.provider.getData(req).subscribe(result => {
  //      this.data = result
  //      if(this.data.status == "ok"){
  //        console.log(this.data.status); 
  //      }else if  (this.data.status == "error"){
  //       this.showError("Wrong request");
  //      }
  //      else{
  //       //this.showError("Somthing is not working correctly")
  //       this.showLoading();
  //      }
  //   })
  // }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }
 
  showError(text) {
    //this.loading.dismiss();
 
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }

      
}



