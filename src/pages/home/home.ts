import { Component, ViewChild } from '@angular/core';
import { /*IonicPage, */NavController, NavParams, Content, ModalController } from 'ionic-angular';
// import { ApiService } from '../../provider/api-service';
import { iOSFixedScrollFreeze } from '../../provider/iOSFixedScrollFreeze';
import { Users } from '../../provider/Users';
// import { Tools } from '../../provider/Tools';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  // entryData: any = null;
  user: any = {
    unpayed_money: '--',
    payed_money: '--',
    total_money: '--',
  };

  error: any = null;
  dataType: any = '0';
  salaryData: any = [];

  // @ViewChild('slides') slides: Slides;
  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, 
    // private api: ApiService,
    // private app: App,
    private users: Users,
    // private tools: Tools,
    private modalCtrl: ModalController,
    // private alertCtrl: AlertController,
    private iosFixed: iOSFixedScrollFreeze,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad HomePage');
    this.iosFixed.fixedScrollFreeze(this.content);

    this.loadUserData();
    this.loadSalariesData();
  }

  loadUserData() {
    this.users.GetUserProfile(false, '')
      .then(data => {
        if (data && data['data']) {
          this.user = data['data'];
        }
      })
      .catch(error => {

      });
    
  }

  loadSalariesData() {
    this.error = null;
    this.salaryData = [];

    this.users.GetSalaries(this.dataType, true)
      .then(data => {
        if (data && data['data']) {
          this.salaryData = data['data'];
          this.error = this.salaryData.length == 0 ? '暂无工资数据' : null;
        } else {
          this.error = '非法错误';
        }
      })
      .catch(error => {
        this.error = error.message || '服务器出错了~';
      });
  }

  add() {
    const modal = this.modalCtrl.create('AddSalaryPage',
      { pay_name: this.user.pay_name, pay_account: this.user.pay_account });
    modal.onDidDismiss(res => {
      if (res) {
        this.loadUserData();
        this.dataType = '0';
        this.loadSalariesData();
      }
    });
    modal.present();
  }

  ColorBy(salary) {
    if (salary.state == 'pending') {
      return 'dark';
    }

    if (salary.state == 'approved') {
      return 'primary';
    }

    if (salary.state == 'rejected') {
      return 'danger';
    }

    if (salary.state == 'payed') {
      return 'secondary';
    }

    return '';
  }

  segmentChanged(ev) {
    this.loadSalariesData();
  }

}
