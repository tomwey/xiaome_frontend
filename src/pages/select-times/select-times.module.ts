import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectTimesPage } from './select-times';

@NgModule({
  declarations: [
    SelectTimesPage,
  ],
  imports: [
    IonicPageModule.forChild(SelectTimesPage),
  ],
})
export class SelectTimesPageModule {}
