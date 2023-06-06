import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  searchTerm: string = '';
  showDropdown: boolean = false;
  results: any[] = [];
  filteredResults: any[] = [];
  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) {}

  filterResults() {
    if (this.searchTerm.trim() !== '') {
      this.userService.getUserByName(this.searchTerm).subscribe({
        next: (res: any) => {
          this.results = res;
          this.filteredResults = this.results.filter((result) =>
            result.name.toLowerCase().includes(this.searchTerm.toLowerCase())
          );
          if (this.filteredResults.length == 0) {
            this.filteredResults.push({
              name: `${this.searchTerm}`,
              id: this.searchTerm.trim(),
              isNew: true,
            });
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
      this.showDropdown = true;
    } else {
      this.filteredResults = [];
      this.showDropdown = false;
    }
  }

  onInputBlur() {
    setTimeout(() => {
      this.showDropdown = false;
    }, 400);
  }
}
