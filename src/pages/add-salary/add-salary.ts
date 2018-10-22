import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the AddSalaryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-salary',
  templateUrl: 'add-salary.html',
})
export class AddSalaryPage {

  constructor(public navCtrl: NavController, 
    private viewCtrl: ViewController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad AddSalaryPage');
  }

  close() {
    this.viewCtrl.dismiss().catch();
  }

}
