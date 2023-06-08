import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sending-message',
  templateUrl: './sending-message.component.html',
  styleUrls: ['./sending-message.component.css'],
})
export class SendingMessageComponent {
  sendingMessages: any;
  constructor(
    private readonly messageService: MessageService,
    private readonly cookieService: CookieService,
    private readonly router: Router
  ) {}
  ngOnInit(): void {
    const userId = this.cookieService.get('userId');
    this.messageService.getMessages({ from: userId }).subscribe({
      next: (res: any) => {
        this.sendingMessages = res.items;
      },
      error: (err) => {
        console.log(err.error);
      },
    });
  }

  clickMessage(id: string, $event: any) {
    if ($event.target.className.includes('not-click')) {
      return;
    }
    this.router.navigate(['home', 'single-message', id]);
  }

  deleteMessage(id: string) {
    this.messageService.deleteOne(id).subscribe({
      next: (res) => {
        const index = this.sendingMessages.findIndex((m: any) => m.id == id);
        this.sendingMessages.splice(index, 1);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  tagMessage(id: string, bool: boolean) {
    this.messageService.changeOne(id, { isFromTagged: bool }).subscribe({
      next: (res) => {
        const message = this.sendingMessages.find((m: any) => m.id == id);
        message.isToTagged = true;
      },
      error: (err) => {
        console.log(err.error);
      },
    });
  }
}
