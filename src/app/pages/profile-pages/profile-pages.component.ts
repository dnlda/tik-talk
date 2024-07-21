import { Component, inject } from '@angular/core';
import { ProfileHeaderComponent } from '../../common-ui/profile-header/profile-header.component';
import { ProfileService } from '../../data/service/profile.service';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { switchMap } from 'rxjs';
import { ImgUrlPipe } from '../../helpers/pipes/img-url.pipe';
import { RouterLink } from '@angular/router';
import { toObservable } from '@angular/core/rxjs-interop';
import { PostFeedComponent } from "./post-feed/post-feed.component";

@Component({
  selector: 'app-profile-pages',
  standalone: true,
  imports: [ProfileHeaderComponent, AsyncPipe, RouterLink, ImgUrlPipe, PostFeedComponent],
  templateUrl: './profile-pages.component.html',
  styleUrl: './profile-pages.component.scss'
})
export class ProfilePagesComponent {
profileService = inject(ProfileService)
route = inject(ActivatedRoute)

me$ = toObservable(this.profileService.me)
subscribers$ = this.profileService.getSubscribersShortList(5)

profile$ = this.route.params
.pipe(
  switchMap(({id}) => {
    if (id === 'me') return this.me$ 

      return this.profileService.getAccount(id)
  })
)
}
