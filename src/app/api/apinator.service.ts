import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const API_URL = environment.API_URL;
const API_KEY = environment.API_KEY;

@Injectable({
  providedIn: 'root'
})

export class ApinatorService {

  constructor(private http: HttpClient) { }

  public getCompany(company: String){
    return this.http.get(`${API_URL}query?function=SYMBOL_SEARCH&keywords=${company}&apikey=${API_KEY}`)
  }

  public getCompanyOverview(company: String) {
    return this.http.get(`${API_URL}query?function=OVERVIEW&symbol=${company}&apikey=${API_KEY}`);
  }

  public getTimeSeries(company: String) {
    return this.http.get(`${API_URL}query?function=TIME_SERIES_DAILY&symbol=${company}&apikey=${API_KEY}`);
  }
  
  public getExchange(fromC: String, toC: String){
    return this.http.get(`${API_URL}query?function=CURRENCY_EXCHANGE_RATE&from_currency=${fromC}&to_currency=${toC}&apikey=${API_KEY}`);
  }

  public getEarnings(company: String){
    return this.http.get(`${API_URL}query?function=EARNINGS&symbol=${company}&apikey=${API_KEY}`);
  }
}
