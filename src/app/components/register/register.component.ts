import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private db: DbService, private router: Router) {}
  ngOnInit(): void {}
  guardar(datos: NgForm) {
    this.db.table('usuarios').add({ ...datos.value, sesion: false });
    console.log(datos.value);
  }
  goLogin() {
    this.router.navigate(['/login']);
  }
  goRegister() {
    this.router.navigate(['/register']);
  }
  goLogout() {
    this.router.navigate(['/logout']);
  }
}
