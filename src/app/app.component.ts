import { Component } from '@angular/core';
import { ElectronService } from './providers/electron.service';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from '../environments/environment';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ Title ]
})
export class AppComponent {
  constructor(public electronService: ElectronService,
              private translate: TranslateService,
              private title: Title)
  {
    this.title.setTitle('Home ― Nano Wallet');
    translate.setDefaultLang(AppConfig.defaultLang);
    translate.use(AppConfig.defaultLang);

    if (electronService.isElectron()) {
      console.log('Mode electron');
      //console.log('Electron ipcRenderer', electronService.ipcRenderer);
      //console.log('NodeJS childProcess', electronService.childProcess);
    } else {
      console.log('Mode web');
    }
  }
}
