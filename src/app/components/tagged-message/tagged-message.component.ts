import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tagged-message',
  templateUrl: './tagged-message.component.html',
  styleUrls: ['./tagged-message.component.css'],
})
export class TaggedMessageComponent implements OnInit {
  taggedMessages: any[] = [];
  constructor(
    private readonly messageService: MessageService,
    private readonly cookieService: CookieService,
    private readonly router: Router
  ) {}
  ngOnInit(): void {
    const userId = this.cookieService.get('userId');
    this.getTaggedMessages({ from: userId, isFromTagged: true });
    this.getTaggedMessages({ to: userId, isToTagged: true });
  }

  getTaggedMessages(query: any) {
    this.messageService.getMessages(query).subscribe({
      next: (res: any) => {
        if (query.from) {
          let data = res.items;
          data?.forEach((d: any) => {
            d.isMyMessage = true;
          });
          this.taggedMessages = [...this.taggedMessages, ...data].sort(
            (a: any, b: any) => b.date - a.date
          );
        }
        if (query.to) {
          let data = res.items;
          data?.forEach((d: any) => {
            d.isMyMessage = false;
          });
          this.taggedMessages = [...this.taggedMessages, ...data].sort(
            (a: any, b: any) => b.date - a.date
          );
        }
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
        const index = this.taggedMessages.findIndex((m: any) => m.id == id);
        this.taggedMessages.splice(index, 1);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  tagMessage(id: string, bool: boolean, isMyMessage: boolean) {
    const data = isMyMessage ? { isFromTagged: bool } : { isToTagged: bool };
    this.messageService.changeOne(id, data).subscribe({
      next: (res) => {
        const index = this.taggedMessages.findIndex((m: any) => m.id == id);
        this.taggedMessages.splice(index, 1);
      },
      error: (err) => {
        console.log(err.error);
      },
    });
  }
}
