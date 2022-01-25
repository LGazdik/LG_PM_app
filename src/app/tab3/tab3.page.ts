import { Component } from '@angular/core';
import { ApinatorService } from '../api/apinator.service';
import { Storage } from '@ionic/storage-angular';

const KEY = 'currencyStorage';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  
  exRate: number;
  exRateModif: number;
  count: number = 1;
  cur1: string;
  cur2: string;
  cur: string;

  mena1: string;
  mena2: string;

  ishidden: boolean = true;
  isHiddenF: boolean = true;
  isHiddenS: boolean = true;

  curStore: string []=[];

  constructor(private cS: ApinatorService, private s: Storage) {
    this.count = 1;
  }

  public loadCurrencyExchange(): void {
    this.cS.getExchange(this.cur1, this.cur2).subscribe((item) => {
      console.log(item);
      this.exRate = item['Realtime Currency Exchange Rate']['5. Exchange Rate'];
      this.mena1 = item['Realtime Currency Exchange Rate']['2. From_Currency Name'];
      this.mena2 = item['Realtime Currency Exchange Rate']['4. To_Currency Name'];
      this.exRateModif = this.exRate * this.count;
      this.ishidden = false;
      this.addToCurrencyHistory(this.cur1);
    },error => console.log(error));
  }

  async addToCurrencyHistory(x: string) {
    const cHistory = (await this.s.get(KEY)) || [];
    this.loader();
    if (
      this.curStore == null || 
      this.curStore.some((x) => x == this.cur1) == false || 
      this.curStore.some((x) => x == this.cur2) == false) {
      cHistory.push(x);
    }
    this.s.set(KEY, cHistory);
    this.loader();
  }

  clr() {
    this.ishidden = true;
    this.count = 1;
    this.cur1 = this.cur2 = this.cur = '';
  }

  swi() {
    this.ishidden = true;
    this.cur = this.cur1;
    this.cur1 = this.cur2;
    this.cur2 = this.cur;
  }

  async loader() {
    await this.s.get(KEY).then((x) => {
      this.curStore = x;
      console.log(this.curStore);
    });
  }

  ionViewWillEnter() {
    this.loader();
  }

  public clearS(){
    this.s.set(KEY, []);
    this.loader();
  }

  firstFo(){ this.isHiddenF = false; }
  firstBl(){ this.isHiddenF = true; }
  secondFo(){ this.isHiddenS = false; }
  secondBl(){ this.isHiddenS = true; }    
  public setF(x: string): string{ return this.cur1 = x; }
  public setS(x: string): string{ return this.cur2 = x; }
}
