import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { Users } from '../../provider/Users';
import { Tools } from '../../provider/Tools';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the UserProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {

  profile: any = {
    name: '',
    sex: '',
    idcard: '',
    phone: '',
    birth: '',
    is_student: '',
    is_stu: false,
    college: '',
    specialty: ''
  };

  constructor(public navCtrl: NavController, 
    private users: Users,
    private tools: Tools,
    private app: App,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad UserProfilePage');
  }

  save() {
    const params = JSON.parse(JSON.stringify(this.profile));
    params.is_student = params.is_stu ? 1 : 0;
    this.users.SaveProfile(params)
      .then(data => {
        // this.tools.showToast('保存成功')
        this.app.getRootNavs()[0].setRoot(TabsPage);
      })
      .catch(error => {
        this.tools.showToast(error.message || '服务器出错了');
      });
  }

}
