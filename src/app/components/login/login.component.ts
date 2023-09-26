import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {}

  async iniciarSesion(datos: NgForm) {
    const login = await this.authService.getLogin(datos);
    if (login) {
      this.router.navigateByUrl('/dashboard');
    }
  }
  goLogin() {
    this.router.navigate(['/login']);
  }
  goRegister() {
    this.router.navigate(['/register']);
  }
}
