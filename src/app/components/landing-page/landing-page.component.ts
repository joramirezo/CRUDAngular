import { Component, OnInit } from '@angular/core';
import { RouterStateSnapshot, Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit(): void {}
  goLogin() {
    this.router.navigate(['/login']);
  }
  goRegister() {
    this.router.navigate(['/register']);
  }
}
