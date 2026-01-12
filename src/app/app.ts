import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './app.html',
})
export class App {
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.loadPermissions().subscribe();
  }
}
