import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Events, Content } from 'ionic-angular';
import { Users } from '../../provider/Users';
import { Tools } from '../../provider/Tools';
import { iOSFixedScrollFreeze } from '../../provider/iOSFixedScrollFreeze';

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
  currentProject: any = null;
  selectedTimes: any = [];

  @ViewChild(Content) content: Content;
  constructor(public navCtrl: NavController, 
    private viewCtrl: ViewController,
    private events: Events,
    private users: Users,
    private iosFixed: iOSFixedScrollFreeze,
    private tools: Tools,
    public navParams: NavParams) {
      this.salary.pay_name = this.navParams.data.pay_name;
      this.salary.pay_account = this.navParams.data.pay_account;
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad AddSalaryPage');
    this.iosFixed.fixedScrollFreeze(this.content);

    this.events.subscribe('project:selected', (item) => {
      this.salary.proj_id = item.id;
      this.salary.project_name = `[编号:${item.id}]${item.title}`;
      if (item.days && item.days.length > 0) {
        this.currentProject = item;
      } else {
        this.currentProject = null;
      }

      this.selectedTimes = [];
      
    });
    this.events.subscribe('times:select', (items) => {
      this.selectedTimes = items;
    });
  }

  close() {
    this.viewCtrl.dismiss().catch();
  }

  selectProject() {
    this.navCtrl.push('SelectProjectPage');
  }

  selectSettleTimes() {
    this.navCtrl.push('SelectTimesPage', { times: this.currentProject.days, selectedItems: this.selectedTimes });
  }

  removeMe(time, ev:Event) {
    ev.stopPropagation();
    this.selectedTimes.splice(this.selectedTimes.indexOf(time), 1);
  }

  commit() {
    const reg = /^([1-9]\d{0,9}|0)([.]?|(\.\d{1,2})?)$/;
    if (!reg.test(this.salary.money)) {
      this.tools.showToast('金额不正确');
      return;
    }

    if (this.currentProject && this.currentProject.days.length > 0) {
      if (this.selectedTimes.length == 0) {
        this.tools.showToast('必须选择结算日期');
        return;
      }
    }

    this.salary.selected_days = this.selectedTimes.join(',');

    this.users.AddSalary(this.salary)
      .then(data => {
        this.viewCtrl.dismiss(1).catch();
      })
      .catch(error => {
        this.tools.showToast(error.message || '服务器出错了');
      })
  }

}
