import { Component } from '@angular/core';
import { ApinatorService } from '../api/apinator.service';
import { Company } from '../api/Company.model';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  data: any = '';
  public companyNam: String;
  public companySym: String;
  public actualHistory: String[] | Promise<any>;

  xc: string;
  compArray: Company[] = [];
  ishidden: boolean = true;

  constructor(private cO: ApinatorService, private s: Storage) {}

  initializeItems() {
    this.compArray = [];
  }

  getItems(x: any) {
    this.initializeItems();
    const val = x.target.value;
    if (val && val.trim() != '') {
      this.loadCompany();
    }
  }

  public loadOverview() {
    this.cO.getCompanyOverview(this.companySym).subscribe((searchResult) => {
      this.data = searchResult;
      console.log(this.data);
      this.s.set('companyS', this.data.Symbol);
      this.s.set('companyN', this.data.Name);
      this.s.set('50DayMovingAverage', this.data['50DayMovingAverage']);
      this.s.set('200DayMovingAverage', this.data['200DayMovingAverage']);
      this.ishidden = false;
      console.log(this.ishidden);
    },error => console.log(error));
  }

  public loadCompany() {
    this.initializeItems();
    this.cO.getCompany(this.companyNam).subscribe((item) => {
      console.log(item);
      for (let i = 0; i < item['bestMatches'].length; i++) {
        if (item['bestMatches'][i.toString()]['1. symbol'].length <= 4) {
          this.compArray.push(
            new Company(
              item['bestMatches'][i.toString()]['2. name'],
              item['bestMatches'][i.toString()]['1. symbol']
            )
          );
        }
      }
      console.log(this.compArray);
    },error => console.log(error));
  }

  public clr(){
    this.data = '';
    this.ishidden = true;
  }

  public returnSymbol(x: any) {
    this.companySym = x;
    this.companyNam = '';
  }
}
