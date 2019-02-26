import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountInputComponent } from './components/account-input/account-input.component';
import { LoginComponent } from './components/login/login.component';
import { OfflineTransactionCreateComponent } from './components/offlineTransaction/create/create.component';
import { OfflineTransactionBroadcastComponent } from './components/offlineTransaction/broadcast/broadcast.component';
import { FaqComponent } from './components/faq/faq.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
    {
        path: 'faq',
        component: FaqComponent
    },
    {
        path: 'account-input',
        component: AccountInputComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'signup',
        component: SignupComponent
    },
    {
        path: 'create-offline-transaction',
        component: OfflineTransactionCreateComponent
    },
    {
        path: 'broadcast-offline-transaction',
        component: OfflineTransactionBroadcastComponent
    },
    {
        path: '',
        component: HomeComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
