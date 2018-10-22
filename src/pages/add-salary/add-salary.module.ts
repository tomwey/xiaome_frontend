import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddSalaryPage } from './add-salary';

@NgModule({
  declarations: [
    AddSalaryPage,
  ],
  imports: [
    IonicPageModule.forChild(AddSalaryPage),
  ],
})
export class AddSalaryPageModule {}
