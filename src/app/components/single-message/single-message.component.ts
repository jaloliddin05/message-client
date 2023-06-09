import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-single-message',
  templateUrl: './single-message.component.html',
  styleUrls: ['./single-message.component.css'],
})
export class SingleMessageComponent implements OnInit {
  message!: any;
  constructor(
    private readonly messageService: MessageService,
    private readonly param: ActivatedRoute,
    private readonly location: Location
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

  goBack() {
    this.location.back();
  }
}
