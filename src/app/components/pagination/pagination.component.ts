import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent {
  @Input() meta: any;
  @Input() links: any;
  @Input() page: any;
  @Output() paginateInComingPage = new EventEmitter();
  @Output() paginateTaggedPage = new EventEmitter();
  @Output() paginateSendingPage = new EventEmitter();
  @Output() paginateTwoUserPage = new EventEmitter();

  constructor() {}

  previousPage() {
    if (this.page == 'in-coming') {
      this.paginateInComingPage.emit(this.meta.currentPage - 1);
    }
    if (this.page == 'sending') {
      this.paginateSendingPage.emit(this.meta.currentPage - 1);
    }
    if (this.page == 'tagged') {
      this.paginateTaggedPage.emit(this.meta.currentPage - 1);
    }
    if (this.page == 'single-user') {
      this.paginateTwoUserPage.emit(this.meta.currentPage - 1);
    }
  }
  nextPage() {
    if (this.page == 'in-coming') {
      this.paginateInComingPage.emit(this.meta.currentPage + 1);
    }
    if (this.page == 'sending') {
      this.paginateSendingPage.emit(this.meta.currentPage + 1);
    }
    if (this.page == 'tagged') {
      this.paginateTaggedPage.emit(this.meta.currentPage + 1);
    }
    if (this.page == 'single-user') {
      this.paginateTwoUserPage.emit(this.meta.currentPage + 1);
    }
  }
}
