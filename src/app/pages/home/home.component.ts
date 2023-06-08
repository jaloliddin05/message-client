import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user: any;
  isWriteModalOpen: boolean = false;
  constructor(
    private readonly cookieService: CookieService,
    private readonly userService: UserService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    const userId = this.cookieService.get('userId');
    if (!userId) {
      this.router.navigate(['login']);
      return;
    }
    this.userService.getUserById(userId).subscribe({
      next: (res) => {
        this.user = res;
      },
      error: (err) => {
        console.log(err.error);
      },
    });
  }

  changeModalVisibility(bool: boolean) {
    this.isWriteModalOpen = bool;
  }
}
