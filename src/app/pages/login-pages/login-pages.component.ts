import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-login-pages',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-pages.component.html',
  styleUrl: './login-pages.component.scss',
})
export class LoginPagesComponent {
  authService = inject(AuthService);

  form = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });

  constructor () {
    from ([1,2,3,4,5,6,7,8,9]).pipe().subscribe( val => {
      console.log(val)
    })
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);

      //@ts-ignore
      this.authService.login(this.form.value).subscribe((res) => {
        console.log(res);
      });
    }
  }
}
