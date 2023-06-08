import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-message',
  templateUrl: './single-message.component.html',
  styleUrls: ['./single-message.component.css'],
})
export class SingleMessageComponent implements OnInit {
  message!: any;
  constructor(
    private readonly messageService: MessageService,
    private readonly param: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.param.params.subscribe((params) => {
      const messageId = params['id'];
      this.messageService.getOne(messageId).subscribe({
        next: (res: any) => {
          this.message = res;
        },
        error: (err) => {
          console.log(err.error);
        },
      });
    });
  }
}
