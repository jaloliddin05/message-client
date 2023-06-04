import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { IncomingMessageComponent } from './components/incoming-message/incoming-message.component';
import { SendingMessageComponent } from './components/sending-message/sending-message.component';
import { TaggedMessageComponent } from './components/tagged-message/tagged-message.component';
import { SearchComponent } from './components/search/search.component';
import { WriteMessageComponent } from './components/write-message/write-message.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    IncomingMessageComponent,
    SendingMessageComponent,
    TaggedMessageComponent,
    SearchComponent,
    WriteMessageComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
