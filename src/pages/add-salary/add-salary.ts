import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Events } from 'ionic-angular';
import { Users } from '../../provider/Users';
import { Tools } from '../../provider/Tools';

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

  salary: any = {
    project_name: '',
    proj_id: '',
    money: '',
    pay_name: '',
    pay_account: ''
  };
  constructor(public navCtrl: NavController, 
    private viewCtrl: ViewController,
    private events: Events,
    private users: Users,
    private tools: Tools,
    public navParams: NavParams) {
      this.salary.pay_name = this.navParams.data.pay_name;
      this.salary.pay_account = this.navParams.data.pay_account;
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad AddSalaryPage');
    this.events.subscribe('project:selected', (item) => {
      this.salary.proj_id = item.id;
      this.salary.project_name = `[编号:${item.id}]${item.title}`;
    });
  }

  close() {
    this.viewCtrl.dismiss().catch();
  }

  selectProject() {
    this.navCtrl.push('SelectProjectPage');
  }

  commit() {
    this.users.AddSalary(this.salary)
      .then(data => {
        this.viewCtrl.dismiss(1).catch();
      })
      .catch(error => {
        this.tools.showToast(error.message || '服务器出错了');
      })
  }

}
