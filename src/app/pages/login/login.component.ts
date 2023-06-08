import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private readonly userService: UserService,
    private readonly cookieService: CookieService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      name: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.userService.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        this.cookieService.set('userId', res.id);
        this.router.navigate(['home/in-coming']);
      },
      error: (err) => {
        console.log(err?.error);
      },
    });
  }
}
