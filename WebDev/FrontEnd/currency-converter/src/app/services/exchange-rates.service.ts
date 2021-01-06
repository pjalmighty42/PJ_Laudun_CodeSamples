import { ExchangeRatesResponse } from './payloads/exchange-rates-response';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRatesService {

  constructor(private http:HttpClient) { }

  getRates(baseCurrency: string): Observable<ExchangeRatesResponse>{
    return this.http.get<ExchangeRatesResponse>(`https://api.exchangeratesapi.io/latest?base=${baseCurrency}`)
  }
}
