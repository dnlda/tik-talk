import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-pages',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-pages.component.html',
  styleUrl: './login-pages.component.scss',
})
export class LoginPagesComponent {
  authService = inject(AuthService);
  router = inject(Router)

  isPasswordVisible = signal<boolean>(false)

  form = new FormGroup({
    username: new FormControl<string | null>(null, Validators.required),
    password: new FormControl<string | null>(null, Validators.required),
  });

 

  onSubmit() {
    if (this.form.valid) {

      console.log(this.form.value);

      //@ts-ignore
      this.authService.login(this.form.value).subscribe((res) => {
        this.router.navigate([""])
        console.log(res);
      });
    }
  }
}
