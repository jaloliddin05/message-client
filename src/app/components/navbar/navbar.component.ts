import { Component, Input } from '@angular/core';
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
  @Input() user: any;
  filterIndex = 0;

  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) {}

  filterResults() {
    if (this.searchTerm.trim() !== '') {
      this.userService.getUserByName(this.searchTerm.trim()).subscribe({
        next: (res: any) => {
          this.results = res;
          this.filteredResults = this.results.filter((result) =>
            result.name
              .toLowerCase()
              .includes(this.searchTerm.trim().toLowerCase())
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

  handleKey(event: any) {
    if (event.keyCode == 38) {
      this.keyPgUp();
    } else if (event.keyCode == 40) {
      this.keyPgDn();
    } else if (event.keyCode == 13) {
      this.keyEnter();
    } else {
      this.filterIndex = 0;
    }
  }
  keyPgUp() {
    if (this.filterIndex > 0) {
      this.filterIndex--;
    }
  }
  keyPgDn() {
    if (this.filterIndex < this.filteredResults.length - 1) {
      this.filterIndex++;
    }
  }

  keyEnter() {
    const user = this.filteredResults[this.filterIndex];
    this.router.navigate(['home', 'single-user', user.name]);
    this.onInputBlur();
    this.searchTerm = user.name;
  }

  clickDropDown(index: number) {
    const user = this.filteredResults[index];
    this.router.navigate(['home', 'single-user', user.name]);
    this.onInputBlur();
    this.searchTerm = user.name;
  }
}
