import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {
  markets: String[];
  balance: String;
  selectedMarket: String;

  sortOrders: string[] = ["Year", "Title", "Author"];
  selectedSortOrder: string = "Sort by...";

  ChangeSortOrder(newSortOrder: string) { 
    this.selectedSortOrder = newSortOrder;
  }

  constructor() { 
    this.markets = ['aa', 'bb', 'cc', 'dd'];
    this.balance = '0.000000';
    this.selectedMarket = 'xem';
  }

  ngOnInit() {
  }

   /**
   * Update balance value according to a market key
   *
   * @param {string} marketKey - A market key
   */
    updateBalance(marketKey) {
        if (!marketKey) marketKey = this.selectedMarket;
        setTimeout(() => {
            //this.market.selected = marketKey;
            this.selectedMarket = marketKey;
            //this.computeBalance();
            //$("#balanceDropdown.open").removeClass("open");
        });
    }

}
