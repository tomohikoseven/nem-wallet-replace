import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { WalletService } from '../providers/wallet.service';

@Directive({
  selector: '[ShowAuthed]'
})
export class ShowAuthedDirective implements OnInit {
  @Input('ShowAuthed') showAuthed: string = 'false';

  constructor(
    private el: ElementRef,
    private _Wallet: WalletService,
    ) { }

  ngOnInit() {
    //console.log('1:'+this.showAuthed);
    if(this.showAuthed == 'true') {
      //console.log('4:'+this._Wallet.current);
      if(this._Wallet.current) {
        //console.log('5:'+'inline-block');
        this.el.nativeElement.style.display = 'inline-block';
      } else {
        //console.log('5:'+'none');
        this.el.nativeElement.style.display = 'none';
      }
    } else {
      //console.log('2:'+this._Wallet.current);
      if(this._Wallet.current) {
        //console.log('3:'+'none');
        this.el.nativeElement.style.display = 'none';
      } else {
        //console.log('3:'+'inline-block');
        this.el.nativeElement.style.display = 'inline-block';
      }
    }
  }
}
