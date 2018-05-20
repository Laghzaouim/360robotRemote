import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { Paho } from 'ng2-mqtt/mqttws31';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  client;
  topicBatteryState = "360robot/battery/state";
  topicRobotState = "360robot/robot/state";
  topicMotorDrive = "360robot/motors/drive";

  batteryState

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {
  }

  ngOnInit(): void {
    this.client = new Paho.MQTT.Client('broker.hivemq.com', 8000, 'qwegdfgrty12345rgdgfr65564dgf');

    this.client.connect({ onSuccess: this.onConnected.bind(this) });
    this.onMessage();
    this.onConnectionLost();
  }

  onConnected() {
    console.log("Connected");
    this.client.subscribe(this.topicBatteryState);
    this.client.subscribe(this.topicRobotState);
  }

  public sliderEventToString(event: number) {
    let message: string = String(event)
    this.sendMessage(message)
  }

  public sendMessage(message: string) {
    //debugger
    let packet = new Paho.MQTT.Message(message);
    packet.destinationName = this.topicMotorDrive;
    this.client.send(packet);
  }

  onMessage() {
    this.client.onMessageArrived = (message: Paho.MQTT.Message) => {

      if (message.destinationName == this.topicBatteryState) {
        console.log('Battery state: ' + message.payloadString);
        switch (message.payloadString){
          case '0':
          this.batteryState = 0;
          break
          case '1':
          this.batteryState = 20;
          break
          case '2':
          this.batteryState = 40;
          break
          case '3':
          this.batteryState = 60;
          break
          case '4':
          this.batteryState = 80;
          break
          case '5':
          this.batteryState = 100;
          break

        }

      }else if(message.destinationName == this.topicRobotState){
        console.log('Robot state: ' + message.payloadString);
      }

      //message.
    };
  }

  onConnectionLost() {
    //debugger
    this.client.onConnectionLost = (responseObject: Object) => {
      console.log('Connection lost : ' + JSON.stringify(responseObject));
      this.showError("Unable to connect to the Internet")
      //this.onReconnection()
    };
  }

  onReconnection() {
    this.client.connect({ onSuccess: this.onConnected.bind(this) });
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

  // showLoading() {
  //   this.loading = this.loadingCtrl.create({
  //     content: 'Please wait...',
  //     dismissOnPageChange: true
  //   });
  //   this.loading.present();
  // }

}



