import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-single-user-message',
  templateUrl: './single-user-message.component.html',
  styleUrls: ['./single-user-message.component.css'],
})
export class SingleUserMessageComponent implements OnInit {
  twoUserMessages: any[] = [];
  meta: any;
  links: any;
  userId: string = '';
  username: string = '';
  isWriteModalOpen: boolean = false;

  constructor(
    private readonly messageService: MessageService,
    private readonly cookieService: CookieService,
    private readonly router: Router,
    private readonly param: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.userId = this.cookieService.get('userId');
    this.param.params.subscribe((params) => {
      const secondName = params['name'];
      this.username = secondName;
      this.getTwoUserMessages(this.userId, secondName);
    });
  }

  getTwoUserMessages(firstId: string, secondName: string) {
    this.messageService.getTwoUserMessages(firstId, secondName).subscribe({
      next: (res: any) => {
        this.meta = res.meta;
        this.links = res.links;
        this.twoUserMessages = res.items;
        this.twoUserMessages.forEach((u: any) => {
          if (u.from.id == this.userId) {
            u.isMyMessage = true;
          } else {
            u.isMyMessage = false;
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
        const index = this.twoUserMessages.findIndex((m: any) => m.id == id);
        this.twoUserMessages.splice(index, 1);
        this.meta.itemCount = this.twoUserMessages.length;
        this.meta.totalItems--
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
        const message = this.twoUserMessages.find((m: any) => m.id == id);
        if (isMyMessage) {
          message.isFromTagged = bool;
        } else {
          message.isToTagged = bool;
        }
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
        this.twoUserMessages = res.items;
        this.twoUserMessages.forEach((t: any) => {
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

  openWriteModal(bool: boolean) {
    this.isWriteModalOpen = bool;
  }
}
