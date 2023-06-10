import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { WebSocketService } from '../../services/web-socket.service';

@Component({
  selector: 'app-write-message',
  templateUrl: './write-message.component.html',
  styleUrls: ['./write-message.component.css'],
})
export class WriteMessageComponent implements OnInit {
  messageForm!: FormGroup;
  isFullScreen: boolean = false;
  filteredUsersList: any[] = [];

  @Input() receiverName: any;
  @Output() isWriteModalOpen = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private readonly messageService: MessageService,
    private readonly userService: UserService,
    private readonly cookieService: CookieService,
    private readonly webSocketService: WebSocketService
  ) {}

  ngOnInit(): void {
    this.messageForm = this.formBuilder.group({
      to: [this.receiverName ? this.receiverName : '', Validators.required],
      title: ['', [Validators.required, Validators.email]],
      body: ['', [Validators.required]],
    });
    this.messageForm.value.to = this.receiverName ? this.receiverName : '';
  }

  userInputChange() {
    if (this.messageForm.value.to.trim() !== '') {
      this.userService
        .getUserByName(this.messageForm.value.to.trim())
        .subscribe({
          next: (res: any) => {
            this.filteredUsersList = res?.filter((result: any) =>
              result.name
                .toLowerCase()
                .includes(this.messageForm.value.to.trim().toLowerCase())
            );
          },
          error: (err) => {
            console.log(err.error);
          },
        });
    }
  }

  onSubmit() {
    const from = this.cookieService.get('userId');
    this.messageService.create({ ...this.messageForm.value, from }).subscribe({
      next: (res: any) => {
        const messageId = res.raw[0].id;
        this.webSocketService.sendMessage(messageId);
        this.messageForm.reset();
        this.closeWriteModal();
      },
      error: (err) => {
        console.log(err.error);
      },
    });
  }

  closeWriteModal() {
    this.isWriteModalOpen.emit(false);
    this.isFullScreen = false;
  }

  changeScreen(bool: boolean) {
    this.isFullScreen = bool;
  }
}
