import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import '../polyfills';
// Module
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

// Bootstrap Module
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule }    from 'ngx-bootstrap/buttons';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Service
import { ElectronService } from './providers/electron.service';
import { DataStoreService } from './providers/data-store.service';
import { RecipientService } from './providers/recipient.service';
import { AlertService } from './providers/alert.service';
import { FiltersService } from './providers/filters.service';
import { AddressBookService } from './providers/address-book.service';
import { LocalStorageService } from './providers/local-storage.service';
import { WalletService } from './providers/wallet.service';
import { DataBridgeService } from './providers/data-bridge.service';
import { WalletBuilderService } from './providers/wallet-builder.service';
import { LoginService } from './providers/login.service';
import { NodesService } from './providers/nodes.service';
import { NtyService } from './providers/nty.service';
import { VotingUtilsService } from './providers/voting-utils.service';
import { VotingService } from './providers/voting.service';

// Directive
import { WebviewDirective } from './directives/webview.directive';

// Component
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { BalanceComponent } from './components/balance/balance.component';
import { FooterComponent } from './components/footer/footer.component';
import { OfflineTransactionCreateComponent } from './components/offlineTransaction/create/create.component';
import { OfflineTransactionBroadcastComponent } from './components/offlineTransaction/broadcast/broadcast.component';
import { LoginComponent } from './components/login/login.component';
import { AccountInputComponent } from './components/account-input/account-input.component';
import { ShowAuthedDirective } from './directives/show-authed.directive';
import { FaqComponent } from './components/faq/faq.component';
import { SignupComponent } from './components/signup/signup.component';
import { ToNetworkNamePipe } from './pipes/to-network-name.pipe';
import { FmtAddressPipe } from './pipes/fmt-address.pipe';
import { HashKeyvaluePipe } from './pipes/hash-keyvalue.pipe';
import { ReadWalletFilesDirective } from './directives/read-wallet-files.directive';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WebviewDirective,
    HeaderComponent,
    BalanceComponent,
    FooterComponent,
    OfflineTransactionCreateComponent,
    OfflineTransactionBroadcastComponent,
    LoginComponent,
    AccountInputComponent,
    ShowAuthedDirective,
    FaqComponent,
    SignupComponent,
    ToNetworkNamePipe,
    FmtAddressPipe,
    HashKeyvaluePipe,
    ReadWalletFilesDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    }),
    //NgbModule.forRoot(),
    AngularFontAwesomeModule,
    HttpModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    BsDropdownModule.forRoot(),
    ButtonsModule.forRoot()
  ],
  providers: [
    ElectronService,
    DataStoreService,
    RecipientService,
    AlertService,
    FiltersService,
    LocalStorageService,
    WalletService,
    DataBridgeService,
    WalletBuilderService,
    LoginService,
    NodesService,
    VotingUtilsService,
    VotingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
