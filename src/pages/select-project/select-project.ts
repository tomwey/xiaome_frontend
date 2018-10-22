import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, Events } from 'ionic-angular';
import { Users } from '../../provider/Users';
import { iOSFixedScrollFreeze } from '../../provider/iOSFixedScrollFreeze';

/**
 * Generated class for the SelectProjectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-select-project',
  templateUrl: 'select-project.html',
})
export class SelectProjectPage {

  error: any = null;
  data: any = [];

  keyword: any = '';
  originData: any = [];

  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, 
    private users: Users,
    private events: Events,
    private iosFixed: iOSFixedScrollFreeze,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad SelectProjectPage');
    this.iosFixed.fixedScrollFreeze(this.content);

    setTimeout(() => {
      this.loadData();
    }, 200);
  }

  loadData() {
    this.users.GetProjects()
      .then(data => {
        if (data && data['data']) {
          this.data = data['data'];
          this.originData = this.data;

          this.error = this.data.length == 0 ? '暂无兼职项目数据' : null;
        } else {
          this.error = '非法错误';
        }
      })
      .catch(error => {
        this.error = error.message || '服务器出错了~';
      });
  }

  startSearch(kw) {
    if (kw.trim() == '') {
      this.data = this.originData;
      return;
    }

    this.data = this.originData.filter(item => {
      const val = `[编号:${item.id}]${item.title}`;
      return val.indexOf(kw.trim().toLowerCase()) > -1;
    });
  }

  selectItem(item) {
    this.events.publish('project:selected', item);
    this.navCtrl.pop();
  }

}
