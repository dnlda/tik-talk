import { Component, effect, inject, ViewChild } from '@angular/core';
import { ProfileHeaderComponent } from '../../common-ui/profile-header/profile-header.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfileService } from '../../data/service/profile.service';
import { firstValueFrom } from 'rxjs';
import { AvatarUploadComponent } from "./avatar-upload/avatar-upload.component";
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [ProfileHeaderComponent, ReactiveFormsModule, AvatarUploadComponent],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss',
})
export class SettingsPageComponent {
  fb = inject(FormBuilder);
  profileService = inject(ProfileService);
  authService = inject(AuthService)

  @ViewChild(AvatarUploadComponent) avatarUploader!: AvatarUploadComponent

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: [{ value: '', disabled: true }, Validators.required],
    description: [''],
    stack: [''],
  });

  constructor() {
    effect(() => {
      //@ts-ignore
      this.form.patchValue({
        ...this.profileService.me(),
        //@ts-ignore
        stack: this.mergeStack(this.profileService.me()?.stack)
      });
    });
  }

  ngAfterViewInit( ) {
    this.avatarUploader.avatar
  }

  onSave() {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.invalid) return;

    if (this.avatarUploader.avatar) {
      firstValueFrom(this.profileService.uploadAvatar(this.avatarUploader.avatar))
    }

    //@ts-ignore
    firstValueFrom(this.profileService.patchProfile({
    ...this.form.value,
    stack: this.splitStack(this.form.value.stack)
  })) 
  }

  splitStack(stack: string | null| string[] | undefined) {
    if (!stack) return []
    if (Array.isArray(stack)) return stack;

    return stack.split(',')
  }

  mergeStack(stack: string | null| string[] | undefined) {
    if (!stack) return ''
    if (Array.isArray(stack)) return stack.join(',');

    return stack
  }

  onLogoutAccount () {
    console.log('Вы вышли из аккаунта')
    this.authService.logout()
  }

  onDeleteAccount () {
    console.log('Вы DELETED YOUR ACCOUNT')
    this.authService.delete()
  }
}
