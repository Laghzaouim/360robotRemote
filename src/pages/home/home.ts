import { Component } from '@angular/core';
import { NavController, Loading, AlertController, LoadingController, NavParams } from 'ionic-angular';
import { RobotProvider, IResponse } from '../../providers/robot/robot';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


data: IResponse;
loading: Loading;

status: String
 
  constructor(public navCtrl: NavController, public provider: RobotProvider, public navParams: NavParams, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {

  }

  sendReq(input: String) {
    let req = input;
     
     this.provider.getData(req).subscribe(result => {
       this.data = result
       if(this.data.status == "ok"){
         console.log(this.data.status); 
       }else if  (this.data.status == "error"){
        this.showError("Wrong request");
       }
       else{
        //this.showError("Somthing is not working correctly")
        this.showLoading();
       }
    },error => {
      this.showError("Please check your Robot");
     // console.log(error);
    })
  };

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



