import { Component, inject } from '@angular/core';
import { ProfileService } from '../../../data/service/profile.service';
import { ActivatedRoute } from '@angular/router';
import { toObservable } from '@angular/core/rxjs-interop';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-input',
  standalone: true,
  imports: [],
  templateUrl: './post-input.component.html',
  styleUrl: './post-input.component.scss'
})
export class PostInputComponent {
  fb = inject(FormBuilder);
  profileService = inject(ProfileService)
  route = inject(ActivatedRoute)

  // me$ = toObservable(this.profileService.getMe)

  // form = this.fb.group({
  //   title: ['', Validators.required],
  //   content: ['', Validators.required],
  //   authorId: [ this.me$, Validators.required],
  // })

  onClickBtn () {
    return this.profileService.getMe()
  }

}
