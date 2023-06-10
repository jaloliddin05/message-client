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
  meta: any;
  links: any;
  userId = '';

  constructor(
    private readonly messageService: MessageService,
    private readonly cookieService: CookieService,
    private readonly router: Router
  ) {}
  ngOnInit(): void {
    this.userId = this.cookieService.get('userId');
    this.getTaggedMessages(this.userId, {});
  }

  getTaggedMessages(id: string, query: any) {
    this.messageService.getTaggedMessages(id, query).subscribe({
      next: (res: any) => {
        this.links = res.links;
        this.meta = res.meta;
        this.taggedMessages = res.items;
        this.taggedMessages.forEach((t: any) => {
          if (t.from.id == this.userId) {
            t.isMyMessage = true;
          } else {
            t.isMyMessage = false;
          }
        });
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
        this.meta.itemCount = this.taggedMessages.length;
        this.meta.totalItems--;
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
        this.meta.itemCount = this.taggedMessages.length;
        this.meta.totalItems--;
      },
      error: (err) => {
        console.log(err.error);
      },
    });
  }

  paginate(page: any) {
    this.messageService.getTaggedMessages(this.userId, { page }).subscribe({
      next: (res: any) => {
        this.meta = res.meta;
        this.links = res.links;
        this.taggedMessages = res.items;
        this.taggedMessages.forEach((t: any) => {
          if (t.from.id == this.userId) {
            t.isMyMessage = true;
          } else {
            t.isMyMessage = false;
          }
        });
      },
      error: (err) => {
        console.log(err.error);
      },
    });
  }
}
