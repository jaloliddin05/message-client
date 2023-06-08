import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { SendingMessageComponent } from './components/sending-message/sending-message.component';
import { IncomingMessageComponent } from './components/incoming-message/incoming-message.component';
import { TaggedMessageComponent } from './components/tagged-message/tagged-message.component';
import { SingleUserMessageComponent } from './components/single-user-message/single-user-message.component';
import { SingleMessageComponent } from './components/single-message/single-message.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'send', component: SendingMessageComponent },
      { path: 'in-coming', component: IncomingMessageComponent },
      { path: 'tagged', component: TaggedMessageComponent },
      { path: 'single-user/:name', component: SingleUserMessageComponent },
      { path: 'single-message/:id', component: SingleMessageComponent },
    ],
  },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
