import { Component } from '@angular/core';
import { ApinatorService } from '../api/apinator.service';
import { Earnings } from '../api/Company.model';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  data: any = '';
  earnings: any;
  companyS: String;
  companyN: String;
  MovingAverage50: String;
  MovingAverage200: String;
  Currency: String;

  items: any[];
  symbol: any[];
  name: any[];

  companyEarnsYearly: Earnings[] = [];
  companyEarnsQuart: Earnings[] = [];
  disabledB: boolean = true;
  ishiddenQ: boolean = true;
  ishiddenY: boolean = true;

  constructor(private tS: ApinatorService, private s: Storage) {}

  //  (ionChange)="isSwitch = $event.target.value"

  switchYQ() {
    this.ishiddenQ = !this.ishiddenQ;
    this.ishiddenY = !this.ishiddenY;
  }

  ionViewWillEnter() {
    console.log(this.s.keys);
    this.s.get('companyS').then((x) => (this.companyS = x));
    this.s.get('companyN').then((x) => (this.companyN = x));
    this.s.get('50DayMovingAverage').then((x) => (this.MovingAverage50 = x));
    this.s.get('200DayMovingAverage').then((x) => (this.MovingAverage200 = x));
  }

  public loadTimeSeries(): void {
    this.tS.getTimeSeries(this.companyS).subscribe((overv) => {
      console.log(overv);
      this.data = overv;
    });
  }

  public loadEarnings(): void {
    this.tS.getEarnings(this.companyS).subscribe((item) => {
      for (let i = 0; i < item['annualEarnings'].length; i++) {
        this.companyEarnsYearly.push(
          new Earnings(
            item['annualEarnings'][i.toString()]['fiscalDateEnding'],
            item['annualEarnings'][i.toString()]['reportedEPS']
          )
        );
      }
      for (let i = 0; i < item['quarterlyEarnings'].length; i++) {
        this.companyEarnsQuart.push(
          new Earnings(
            item['quarterlyEarnings'][i.toString()]['fiscalDateEnding'],
            item['quarterlyEarnings'][i.toString()]['reportedEPS']
          )
        );
      }
    },error => console.log(error));
    this.disabledB = false;
    this.ishiddenY = false;
  }
}
