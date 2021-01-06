import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';

import { ExchangeRatesService } from '../services/exchange-rates.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {

  amount = 1;
  from = 'USD';
  to = 'CAD';
  rates: {[key: string] : number};

  convert(): number{
    return this.amount * this.rates[this.to];
  }

  loadRates(){
    this.service.getRates(this.from).subscribe(res => {
      console.log(res)
      this.rates = res.rates;
    });
  }

  constructor(private service: ExchangeRatesService) { 
    
  }

  ngOnInit(): void {
    this.loadRates();
  }

}
