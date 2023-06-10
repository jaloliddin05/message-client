import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { WebSocketService } from '../../services/web-socket.service';

@Component({
  selector: 'app-incoming-message',
  templateUrl: './incoming-message.component.html',
  styleUrls: ['./incoming-message.component.css'],
})
export class IncomingMessageComponent implements OnInit {
  incomingMessages: any[] = [];
  meta: any;
  links: any;
  constructor(
    private readonly messageService: MessageService,
    private readonly cookieService: CookieService,
    private readonly router: Router,
    private readonly webSocketService: WebSocketService
  ) {}
  ngOnInit(): void {
    const userId = this.cookieService.get('userId');
    this.messageService.getMessages({ to: userId }).subscribe({
      next: (res: any) => {
        this.meta = res.meta;
        this.links = res.links;
        this.incomingMessages = res.items;
      },
      error: (err) => {
        console.log(err.error);
      },
    });
    this.getIncomingMessageFromSocket();
  }

  clickMessage(id: string, isViewed: boolean, $event: any) {
    if ($event.target.className.includes('not-click')) {
      return;
    }

    if (!isViewed) {
      this.messageService.changeOne(id, { isViewed: true }).subscribe({
        next: (res) => {
          const message = this.incomingMessages.find((m: any) => m.id == id);
          message.isViewed = true;
          this.router.navigate(['home', 'single-message', id]);
          this.updateIncomingCount();
        },
        error: (err) => {
          console.log(err.error);
        },
      });
    } else {
      this.router.navigate(['home', 'single-message', id]);
    }
  }

  deleteMessage(id: string) {
    this.messageService.deleteOne(id).subscribe({
      next: (res) => {
        const index = this.incomingMessages.findIndex((m: any) => m.id == id);
        this.incomingMessages.splice(index, 1);
        this.meta.itemCount = this.incomingMessages.length;
        this.meta.totalItems--;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  tagMessage(id: string, bool: boolean) {
    this.messageService.changeOne(id, { isToTagged: bool }).subscribe({
      next: (res) => {
        const message = this.incomingMessages.find((m: any) => m.id == id);
        message.isToTagged = true;
      },
      error: (err) => {
        console.log(err.error);
      },
    });
  }

  updateIncomingCount() {
    const userId = this.cookieService.get('userId');
    this.webSocketService.updateInComingCount(userId);
  }

  getIncomingMessageFromSocket() {
    this.webSocketService.getInComingMessages().subscribe((data) => {
      if (this.meta.currentPage == 1) {
        this.incomingMessages.unshift(data);
        if (this.incomingMessages.length > 10) {
          this.incomingMessages.pop();
        }
        this.meta.itemCount = this.incomingMessages.length;
      }
      this.meta.totalItems++;
    });
  }

  paginate(page: any) {
    const userId = this.cookieService.get('userId');
    this.messageService.getMessages({ to: userId, page }).subscribe({
      next: (res: any) => {
        this.meta = res.meta;
        this.links = res.links;
        this.incomingMessages = res.items;
      },
      error: (err) => {
        console.log(err.error);
      },
    });
  }
}
