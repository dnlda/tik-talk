import { Component, inject } from '@angular/core';
import { ProfileHeaderComponent } from '../../common-ui/profile-header/profile-header.component';
import { ProfileService } from '../../data/service/profile.service';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-profile-pages',
  standalone: true,
  imports: [ProfileHeaderComponent, AsyncPipe],
  templateUrl: './profile-pages.component.html',
  styleUrl: './profile-pages.component.scss'
})
export class ProfilePagesComponent {
profileService = inject(ProfileService)
route = inject(ActivatedRoute)

me$ = toObservable(this.profileService.me)

profile$ = this.route.params
.pipe(
  switchMap(({id}) => {
    if (id === 'me') return this.me$ 

      return this.profileService.getAccount(id)
  })
)
}
