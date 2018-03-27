import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { RobotProvider, IResponse } from '../../providers/robot/robot';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  rootPage:any = HomePage;
  loading: Loading;
  data: IResponse;
  


  constructor(public navCtrl: NavController, public navParams: NavParams, private robotProvider: RobotProvider, private alertCtrl: AlertController, private loadingCtrl: LoadingController, private provide: RobotProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  sendReq(input: String) {
    let req = input;
    this.showLoading()
     //debugger
     this.provide.getData(req).subscribe(result => {
       this.data = result
      if(this.data.status == "ok"){
        console.log("login")
        this.navCtrl.setRoot(HomePage);
      }else if (this.data.status == "error"){
        console.log("Access Denied");
        this.showError("Please try again your password is incorrect");
      }
      
      },error => {
        this.showError("Please check yout IP or the Robot if is connected correctly to the same network");
        console.log(error);
      }
    )
  };

  login(ipIn: String, passwordIn: string): void {
    this.robotProvider.setLogin(ipIn, passwordIn);
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }
 
  showError(text) {
    this.loading.dismiss();
 
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }
}

