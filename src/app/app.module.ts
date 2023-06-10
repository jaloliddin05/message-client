import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { IncomingMessageComponent } from './components/incoming-message/incoming-message.component';
import { SendingMessageComponent } from './components/sending-message/sending-message.component';
import { TaggedMessageComponent } from './components/tagged-message/tagged-message.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { WriteMessageComponent } from './components/write-message/write-message.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SingleUserMessageComponent } from './components/single-user-message/single-user-message.component';
import { TimeParsingPipe } from './pipes/time-parsing.pipe';
import { SingleMessageComponent } from './components/single-message/single-message.component';
import { MessageBodyParserPipe } from './pipes/message-body-parser.pipe';
import { PaginationComponent } from './components/pagination/pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    IncomingMessageComponent,
    SendingMessageComponent,
    TaggedMessageComponent,
    NavbarComponent,
    WriteMessageComponent,
    SidebarComponent,
    SingleUserMessageComponent,
    TimeParsingPipe,
    SingleMessageComponent,
    MessageBodyParserPipe,
    PaginationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
